// Toast API types and utilities

export interface ToastMenuItem {
  guid: string
  name: string
  description?: string
  price?: number
  imageUrl?: string
  visibility?: string
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
  groups: ToastMenuGroup[]
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
