"use client"

import { useEffect, useState } from "react"
import type { ToastMenuItem } from "@/lib/toast-api"

// Shared data store to prevent multiple API calls
let sharedData: any = null
let sharedDataPromise: Promise<any> | null = null

interface DailySpecialsDisplayProps {
  type: "lunch" | "dinner"
}

export function DailySpecialsDisplay({ type }: DailySpecialsDisplayProps) {
  const [specials, setSpecials] = useState<ToastMenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSpecials() {
      try {
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
          sharedDataPromise = null
        }

        if (!data.success) {
          throw new Error(data.error || "Failed to load specials")
        }

        // Extract the appropriate special based on type
        const special = type === "lunch" ? data.lunchSpecial : data.dinnerSpecial
        
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
    return (
      <div className="text-center py-12 bg-light-grey/20 rounded-lg border-2 border-dashed border-light-grey">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-charcoal/70 text-lg">
          {type === "lunch" 
            ? "Today's lunch special will be updated soon!" 
            : "Tonight's dinner special will be updated soon!"
          }
        </p>
        <p className="text-charcoal/50 text-sm mt-2">
          Check back {type === "lunch" ? "this morning" : "this afternoon"} for updates
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {specials.map((item) => (
        <div key={item.guid} className="bg-soft-white rounded-lg shadow-lg p-8 border border-light-grey">
          <div className="text-center">
            {item.outOfStock && (
              <div className="bg-brick-red text-soft-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                OUT OF STOCK
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4 mb-4">
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal">{item.name}</h3>
                {item.price > 0 && (
                  <span className="font-serif text-2xl md:text-3xl text-charcoal whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-base md:text-lg text-charcoal/70 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}