import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

const TOAST_API_BASE = "https://ws-api.toasttab.com"
const TOAST_CLIENT_ID = process.env.TOAST_CLIENT_ID
const TOAST_CLIENT_SECRET = process.env.TOAST_CLIENT_SECRET
const TOAST_RESTAURANT_GUID = process.env.TOAST_RESTAURANT_GUID

/**
 * Never show these menus (Cafe = Sweetside, (GH) = delivery-only, BAR/HH/NFL = not wanted, N/A Beverages, Wine TOGO).
 * Everything else that Toast has LIVE right now (per schedule) will show.
 */
function isMenuExcluded(name: string): boolean {
  const n = name.trim()
  if (!n) return true
  if (/cafe/i.test(n)) return true
  if (/\(gh\)/i.test(n)) return true
  if (/^bar$/i.test(n)) return true
  if (/hh\/nfl|hh\/ nfl/i.test(n)) return true
  if (/n\/a\s*beverages|n\/a beverages/i.test(n)) return true
  if (/wine\s*togo|wine togo/i.test(n)) return true
  return false
}

const DAY_NAMES = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"] as const

let cachedToken: { token: string; expiresAt: number } | null = null
let cachedMenuData: { data: unknown; expiresAt: number } | null = null
const CACHE_DURATION = 2 * 60 * 1000 // 2 minutes

/** Parse "HH:mm" to minutes since midnight. */
function parseTime(s: string): number {
  const [h, m] = (s ?? "00:00").split(":").map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}

/** True if current time (minutes since midnight) falls inside [start, end), with overnight support (end < start). */
function isInTimeRange(nowMinutes: number, startStr: string, endStr: string): boolean {
  const start = parseTime(startStr)
  const end = parseTime(endStr)
  if (start === end) return true // 00:00–00:00 = all day
  if (start < end) return nowMinutes >= start && nowMinutes < end
  return nowMinutes >= start || nowMinutes < end // overnight
}

/** True if the menu is active right now according to its availability (restaurant local time). */
function isMenuActiveNow(
  availability: { alwaysAvailable?: boolean; schedule?: Array<{ days?: string[]; timeRanges?: Array<{ start?: string; end?: string }> }> } | null | undefined,
  now: Date,
  restaurantTimeZone: string
): boolean {
  if (!availability) return true // no availability = show (legacy behavior)
  if (availability.alwaysAvailable) return true

  const schedule = availability.schedule
  if (!schedule?.length) return false

  const tzDate = new Date(now.toLocaleString("en-US", { timeZone: restaurantTimeZone }))
  const today = DAY_NAMES[tzDate.getDay()]
  const timeStr = now.toLocaleTimeString("en-US", { timeZone: restaurantTimeZone, hour12: false, hour: "2-digit", minute: "2-digit" })
  const nowMinutes = parseTime(timeStr)

  for (const block of schedule) {
    const days = block.days ?? []
    if (!days.includes(today)) continue
    const ranges = block.timeRanges ?? []
    for (const range of ranges) {
      if (isInTimeRange(nowMinutes, range.start ?? "00:00", range.end ?? "23:59")) return true
    }
  }
  return false
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token
  }
  const response = await fetch(`${TOAST_API_BASE}/authentication/v1/authentication/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: TOAST_CLIENT_ID,
      clientSecret: TOAST_CLIENT_SECRET,
      userAccessType: "TOAST_MACHINE_CLIENT",
    }),
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Toast auth failed: ${response.status} - ${errorText}`)
  }
  const data = await response.json()
  cachedToken = {
    token: data.token.accessToken,
    expiresAt: Date.now() + 55 * 60 * 1000,
  }
  return cachedToken.token
}

function normalizeItem(item: {
  guid?: string
  multiLocationId?: string
  name?: string
  description?: string
  price?: number
  visibility?: string[]
  outOfStock?: boolean
}) {
  return {
    guid: item.guid ?? "",
    name: item.name ?? "",
    description: item.description ?? "",
    price: typeof item.price === "number" ? item.price : 0,
    visibility: item.visibility ?? [],
    outOfStock: Boolean(item.outOfStock),
  }
}

function normalizeGroup(group: { guid?: string; name?: string; description?: string; menuItems?: unknown[] }) {
  const menuItems = group.menuItems ?? []
  return {
    guid: group.guid ?? "",
    name: group.name ?? "",
    description: group.description ?? "",
    items: menuItems.map((i: Record<string, unknown>) => normalizeItem(i as Parameters<typeof normalizeItem>[0])),
  }
}

export async function GET() {
  try {
    if (!TOAST_RESTAURANT_GUID || !TOAST_CLIENT_ID || !TOAST_CLIENT_SECRET) {
      return NextResponse.json(
        { success: false, error: "Toast credentials not configured" },
        { status: 500 }
      )
    }

    if (cachedMenuData && cachedMenuData.expiresAt > Date.now()) {
      const res = NextResponse.json(cachedMenuData.data)
      res.headers.set("Cache-Control", "public, s-maxage=120, stale-while-revalidate=60")
      return res
    }

    const accessToken = await getAccessToken()
    const toastResponse = await fetch(
      `${TOAST_API_BASE}/menus/v2/menus?restaurantGuid=${TOAST_RESTAURANT_GUID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Toast-Restaurant-External-ID": TOAST_RESTAURANT_GUID,
        },
      }
    )

    if (!toastResponse.ok) {
      const errorText = await toastResponse.text()
      if (toastResponse.status === 429 && cachedMenuData) {
        return NextResponse.json(cachedMenuData.data)
      }
      throw new Error(`Toast menus fetch failed: ${toastResponse.status} - ${errorText}`)
    }

    const data = await toastResponse.json()
    const rawMenus: Array<{
      guid?: string
      name?: string
      description?: string
      menuGroups?: unknown[]
      availability?: { alwaysAvailable?: boolean; schedule?: Array<{ days?: string[]; timeRanges?: Array<{ start?: string; end?: string }> }> }
    }> = data.menus ?? []
    const restaurantTimeZone = (data.restaurantTimeZone ?? "America/New_York") as string
    const now = new Date()

    const menus = rawMenus
      .filter((m) => {
        const name = (m.name ?? "").trim()
        if (!name) return false
        if (isMenuExcluded(name)) return false
        if (!isMenuActiveNow(m.availability, now, restaurantTimeZone)) return false
        return true
      })
      .map((m) => ({
        guid: m.guid ?? "",
        name: (m.name ?? "").trim(),
        description: m.description ?? "",
        groups: (m.menuGroups ?? []).map((g: Record<string, unknown>) =>
          normalizeGroup(g as Parameters<typeof normalizeGroup>[0])
        ),
      }))
      .filter((m) => m.groups.some((g) => g.items.length > 0))

    const result = {
      success: true,
      menus,
      cachedAt: new Date().toISOString(),
    }

    cachedMenuData = { data: result, expiresAt: Date.now() + CACHE_DURATION }
    const res = NextResponse.json(result)
    res.headers.set("Cache-Control", "public, s-maxage=120, stale-while-revalidate=60")
    return res
  } catch (error) {
    if (cachedMenuData) {
      return NextResponse.json({
        ...(cachedMenuData.data as object),
        message: "Using cached data due to API error",
      })
    }
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
