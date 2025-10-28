import { NextResponse } from "next/server"

const TOAST_API_BASE = "https://ws-api.toasttab.com"
const TOAST_CLIENT_ID = process.env.TOAST_CLIENT_ID
const TOAST_CLIENT_SECRET = process.env.TOAST_CLIENT_SECRET
const TOAST_RESTAURANT_GUID = process.env.TOAST_RESTAURANT_GUID

// Cache the access token
let cachedToken: { token: string; expiresAt: number } | null = null

// Cache the menu data to prevent rate limiting
let cachedMenuData: { data: any; expiresAt: number } | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes cache

async function getAccessToken() {
  // Return cached token if still valid
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token
  }

  // Get new access token
  const response = await fetch(`${TOAST_API_BASE}/authentication/v1/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientId: TOAST_CLIENT_ID,
      clientSecret: TOAST_CLIENT_SECRET,
      userAccessType: "TOAST_MACHINE_CLIENT",
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Authentication failed:", response.status, errorText)
    throw new Error(`Failed to authenticate with Toast API: ${response.status} - ${errorText}`)
  }

  const data = await response.json()

  // Cache token (expires in 1 hour, we'll refresh after 55 minutes)
  cachedToken = {
    token: data.token.accessToken,
    expiresAt: Date.now() + 55 * 60 * 1000,
  }

  return cachedToken.token
}

export async function GET() {
  try {
    // Check if we have cached data that's still valid
    if (cachedMenuData && cachedMenuData.expiresAt > Date.now()) {
      console.log("Returning cached menu data")
      return NextResponse.json(cachedMenuData.data)
    }

    // Get access token
    const accessToken = await getAccessToken()

    // Try v2 menus endpoint first (more commonly accessible)
    const response = await fetch(`${TOAST_API_BASE}/menus/v2/menus?restaurantGuid=${TOAST_RESTAURANT_GUID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Toast-Restaurant-External-ID": TOAST_RESTAURANT_GUID!,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Menu fetch failed:", response.status, errorText)
      
      // If we get a 429 error, return cached data if available
      if (response.status === 429 && cachedMenuData) {
        console.log("Rate limited, returning stale cached data")
        return NextResponse.json(cachedMenuData.data)
      }
      
      throw new Error(`Failed to fetch menus from Toast API: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    // The ToastTab API v2 returns menus as an array with embedded groups and items
    const menus = data.menus || []
    
    console.log("Found", menus.length, "menus")
    
    // Find the "Lunch Specials" and "Dinner Specials" menus
    const lunchMenu = menus.find((menu: any) => 
      menu.name?.toLowerCase() === 'lunch specials'
    )
    const dinnerMenu = menus.find((menu: any) => 
      menu.name?.toLowerCase() === 'dinner specials'
    )
    
    console.log("Lunch menu found:", lunchMenu?.name, "with", lunchMenu?.menuGroups?.length || 0, "groups")
    console.log("Dinner menu found:", dinnerMenu?.name, "with", dinnerMenu?.menuGroups?.length || 0, "groups")
    
    // Get items from the Lunch Specials menu
    const lunchItems: any[] = []
    if (lunchMenu?.menuGroups) {
      lunchMenu.menuGroups.forEach((group: any) => {
        if (group?.menuItems) {
          group.menuItems.forEach((item: any) => {
            lunchItems.push({
              id: item.multiLocationId || item.guid,
              name: item.name,
              description: item.description || '',
              price: item.price || 0,
              guid: item.guid,
              visibility: item.visibility || [],
              salesCategory: item.salesCategory?.name || 'Food',
              image: item.image,
              outOfStock: item.outOfStock || false
            })
          })
        }
      })
    }
    
    // Get items from the Dinner Specials menu
    const dinnerItems: any[] = []
    if (dinnerMenu?.menuGroups) {
      dinnerMenu.menuGroups.forEach((group: any) => {
        if (group?.menuItems) {
          group.menuItems.forEach((item: any) => {
            dinnerItems.push({
              id: item.multiLocationId || item.guid,
              name: item.name,
              description: item.description || '',
              price: item.price || 0,
              guid: item.guid,
              visibility: item.visibility || [],
              salesCategory: item.salesCategory?.name || 'Food',
              image: item.image,
              outOfStock: item.outOfStock || false
            })
          })
        }
      })
    }
    
    console.log("Lunch items found:", lunchItems.length)
    console.log("Dinner items found:", dinnerItems.length)
    
    const lunchSpecial = {
      name: 'Lunch Specials',
      description: lunchMenu?.description || '',
      items: lunchItems,
      guid: lunchMenu?.guid || ''
    }
    
    const dinnerSpecial = {
      name: 'Dinner Specials',
      description: dinnerMenu?.description || '',
      items: dinnerItems,
      guid: dinnerMenu?.guid || ''
    }

    const result = {
      success: true,
      lunchSpecial: lunchSpecial || null,
      dinnerSpecial: dinnerSpecial || null,
      totalItems: lunchItems.length + dinnerItems.length,
      message: `Successfully loaded daily specials from ToastTab`,
      cachedAt: new Date().toISOString()
    }

    // Cache the result
    cachedMenuData = {
      data: result,
      expiresAt: Date.now() + CACHE_DURATION
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Toast API error:", error)
    
    // If we have cached data, return it even if stale
    if (cachedMenuData) {
      console.log("Error occurred, returning stale cached data")
      return NextResponse.json({
        ...cachedMenuData.data,
        message: "Using cached data due to API error"
      })
    }
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
