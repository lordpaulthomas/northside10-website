// Toast API types and utilities

export interface ToastMenuItem {
  guid: string
  name: string
  description?: string
  price?: number
  imageUrl?: string
  visibility?: string | string[]
  outOfStock?: boolean
}

export interface ToastMenuGroup {
  guid: string
  name: string
  description?: string
  items: ToastMenuItem[]
}

export interface ToastMenu {
  guid: string
  name: string
  description?: string
  groups: ToastMenuGroup[]
}

export interface ToastMenusResponse {
  success: boolean
  menus: ToastMenu[]
  cachedAt?: string
  message?: string
}

export async function fetchMenus(): Promise<ToastMenu[] | null> {
  try {
    const response = await fetch("/api/toast/menus", { next: { revalidate: 120 } })
    if (!response.ok) return null
    const data: ToastMenusResponse = await response.json()
    if (!data.success || !Array.isArray(data.menus)) return null
    return data.menus
  } catch (error) {
    console.error("[toast-api] Error fetching menus:", error)
    return null
  }
}

export async function fetchDailySpecials(): Promise<{
  lunchSpecials: ToastMenuItem[]
  dinnerSpecials: ToastMenuItem[]
} | null> {
  try {
    const response = await fetch("/api/toast/specials", {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch specials")
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Unknown error")
    }

    // Parse the menu data to extract lunch and dinner specials
    // This will need to be adjusted based on your actual Toast menu structure
    return {
      lunchSpecials: data.lunchSpecials?.items || [],
      dinnerSpecials: [], // Add logic to extract dinner specials
    }
  } catch (error) {
    console.error("[v0] Error fetching daily specials:", error)
    return null
  }
}
