"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { ToastMenu, ToastMenuItem } from "@/lib/toast-api"

export function MenusContent() {
  const [menus, setMenus] = useState<ToastMenu[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("")

  useEffect(() => {
    async function loadMenus() {
      try {
        const res = await fetch("/api/toast/menus")
        const data = await res.json()
        if (!data.success || !Array.isArray(data.menus)) {
          setError("Could not load menus")
          return
        }
        setMenus(data.menus)
        if (data.menus.length > 0) {
          setActiveTab((prev) => (prev ? prev : data.menus[0].guid))
        }
      } catch {
        setError("Could not load menus")
      } finally {
        setLoading(false)
      }
    }
    loadMenus()
  }, [])

  const activeMenu = menus.find((m) => m.guid === activeTab)

  return (
    <div className="bg-soft-white">
      {/* Decorative Header Section */}
      <div className="relative bg-charcoal text-soft-white py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <Image
            src="/images/northside-logo-red.png"
            alt=""
            width={800}
            height={800}
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]"
            aria-hidden="true"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="text-center flex-1">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-2">NORTHSIDE 10</h1>
              <div className="h-1 w-24 bg-brick-red mx-auto my-4"></div>
              <p className="font-sans text-sm md:text-base uppercase tracking-widest">Restaurant Menus</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <div className="bg-warm-gray py-8 md:py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-brick-red border-t-transparent" />
            </div>
          ) : error ? (
            <p className="text-center text-brick-red font-sans">Unable to load menus. Please try again later.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
              {menus.map((menu) => (
                <button
                  key={menu.guid}
                  onClick={() => setActiveTab(menu.guid)}
                  className={`font-serif text-base md:text-lg px-4 py-3 border-2 rounded transition-all ${
                    activeTab === menu.guid
                      ? "bg-crimson-red border-crimson-red text-soft-white"
                      : "bg-transparent border-charcoal text-charcoal hover:border-crimson-red hover:text-crimson-red"
                  }`}
                >
                  {menu.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {loading && (
          <div className="max-w-6xl mx-auto text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-brick-red border-t-transparent mx-auto mb-4" />
            <p className="text-charcoal/70">Loading menus…</p>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-6xl mx-auto text-center py-16 bg-light-grey/20 rounded-lg border-2 border-dashed border-light-grey">
            <p className="text-charcoal/70 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && activeMenu && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-charcoal">{activeMenu.name}</h1>
              {activeMenu.description && (
                <p className="font-sans text-sm md:text-base text-charcoal/70 uppercase tracking-wider">
                  {activeMenu.description}
                </p>
              )}
            </div>
            <div
              className={
                activeMenu.groups.length === 1 ? "flex flex-col" : "grid md:grid-cols-2 gap-12 md:gap-16"
              }
            >
              {activeMenu.groups.map((group) => (
                <div
                  key={group.guid}
                  className={activeMenu.groups.length === 1 ? "w-full md:max-w-2xl md:mx-auto" : undefined}
                >
                  <h2 className="font-serif text-2xl md:text-3xl mb-6 pb-2 border-b-2 border-brick-red">
                    {group.name}
                  </h2>
                  {group.description && (
                    <p className="text-charcoal/70 text-sm mb-4">{group.description}</p>
                  )}
                  <div className="space-y-6">
                    {group.items.map((item) => (
                      <MenuItem key={item.guid} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const FRESH_PICK_DEAL_DESCRIPTION = "Pick any one protein and two sides for $19."

function MenuItem({ item }: { item: ToastMenuItem }) {
  const priceStr =
    item.price != null && item.price > 0
      ? Math.floor(item.price) === item.price
        ? String(item.price)
        : item.price.toFixed(2)
      : ""
  const isFreshPick = /fresh\s*pick/i.test(item.name?.trim() ?? "")
  const description = isFreshPick ? FRESH_PICK_DEAL_DESCRIPTION : (item.description ?? "")
  return (
    <div className="group">
      {item.outOfStock && (
        <div className="bg-brick-red text-soft-white px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block uppercase tracking-wide">
          Out of Stock
        </div>
      )}
      <div className="flex justify-between items-start gap-4 mb-2">
        <h3 className="font-sans font-semibold text-base md:text-lg text-charcoal uppercase tracking-wide flex-1">
          {item.name}
        </h3>
        {priceStr && (
          <span className="font-sans font-bold text-base md:text-lg text-charcoal whitespace-nowrap">{priceStr}</span>
        )}
      </div>
      {description && (
        <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
