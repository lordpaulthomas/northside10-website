"use client"

import { useEffect, useState } from "react"
import type { ToastMenuItem } from "@/lib/toast-api"

// Shared data store to prevent multiple API calls
// Clear cache after 2 minutes to match server-side cache
let sharedData: any = null
let sharedDataPromise: Promise<any> | null = null
let sharedDataTimestamp: number = 0
const CLIENT_CACHE_DURATION = 2 * 60 * 1000 // 2 minutes

interface DailySpecialsDisplayProps {
  type: "lunch" | "dinner" | "brunch" | "rawbar" | "tacothursday"
}

export function DailySpecialsDisplay({ type }: DailySpecialsDisplayProps) {
  const [specials, setSpecials] = useState<ToastMenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSpecials() {
      try {
        // Clear cache if it's expired
        const now = Date.now()
        if (sharedData && now - sharedDataTimestamp > CLIENT_CACHE_DURATION) {
          console.log("Client cache expired, clearing...")
          sharedData = null
          sharedDataTimestamp = 0
        }

        // Use shared data if available, otherwise fetch
        let data
        if (sharedData) {
          data = sharedData
        } else if (sharedDataPromise) {
          data = await sharedDataPromise
        } else {
          sharedDataPromise = fetch("/api/toast/specials").then(res => res.json())
          data = await sharedDataPromise
          sharedData = data
          sharedDataTimestamp = now
          sharedDataPromise = null
        }

        if (!data.success) {
          throw new Error(data.error || "Failed to load specials")
        }

        // Extract the appropriate special based on type
        let special
        if (type === "lunch") {
          special = data.lunchSpecial
        } else if (type === "dinner") {
          special = data.dinnerSpecial
        } else if (type === "brunch") {
          special = data.brunchSpecial
        } else if (type === "rawbar") {
          special = data.rawBarSpecial
        } else if (type === "tacothursday") {
          special = data.tacoThursdaySpecial
        }
        
        // Get the items array from the special
        const items = special?.items || []
        setSpecials(items)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    loadSpecials()
  }, [type])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crimson-red mx-auto mb-4"></div>
        <p className="text-charcoal/70">Loading {type} specials...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-brick-red">Unable to load specials. Please check back later.</p>
        <p className="text-charcoal/50 text-sm mt-2">
          {error.includes("429") ? "Rate limited - will retry automatically" : "Please try refreshing the page"}
        </p>
      </div>
    )
  }

  if (specials.length === 0) {
    let message = "Today's special will be updated soon!"
    
    if (type === "lunch") {
      message = "Today's lunch special will be updated soon!"
    } else if (type === "dinner") {
      message = "Tonight's dinner special will be updated soon!"
    } else if (type === "brunch") {
      message = "Today's brunch special will be updated soon!"
    } else if (type === "rawbar") {
      message = "Today's Raw Bar Special will be updated soon!"
    } else if (type === "tacothursday") {
      message = "Today's Taco Thursday Special will be updated soon!"
    }
    
    return (
      <div className="text-center py-12 bg-light-grey/20 rounded-lg border-2 border-dashed border-light-grey">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-charcoal/70 text-lg">{message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {specials.map((item) => (
        <div key={item.guid} className="group">
          {item.outOfStock && (
            <div className="bg-brick-red text-soft-white px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block uppercase tracking-wide">
              Out of Stock
            </div>
          )}
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-sans font-semibold text-base md:text-lg text-charcoal uppercase tracking-wide flex-1">
              {item.name}
            </h3>
            {item.price > 0 && (
              <span className="font-sans font-bold text-base md:text-lg text-charcoal whitespace-nowrap">
                {Math.floor(item.price) === item.price ? item.price : item.price.toFixed(2)}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}