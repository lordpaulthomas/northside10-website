"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function CoffeeClubBanner() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <div
      className={`bg-charcoal text-soft-white overflow-hidden transition-all duration-300 ease-in-out ${
        dismissed ? "max-h-0" : "max-h-20"
      }`}
    >
      <div className="py-2.5 px-4 relative">
        <div className="container mx-auto flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm pr-8">
          <span className="font-sans text-warm-gold font-semibold shrink-0">NEW</span>
          <span className="font-sans text-soft-white/80">
            Sweetside VIP Coffee Club &mdash; $20/mo, unlimited drip coffee.
          </span>
          <Link
            href="/coffee-club"
            className="font-sans font-semibold text-warm-gold hover:text-soft-white transition-colors underline underline-offset-2 shrink-0"
          >
            Check it out
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-soft-white/50 hover:text-soft-white transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
