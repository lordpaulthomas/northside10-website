"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-soft-white/95 backdrop-blur-sm border-b border-light-grey">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/northside-logo.001.png"
              alt="Northside 10 Logo"
              width={400}
              height={200}
              className="h-20 md:h-24 w-auto transform scale-125 md:scale-150"
              priority
            />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal hover:text-crimson-red transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col h-screen">
          <div className="shrink-0 bg-soft-white/95 backdrop-blur-sm border-b border-light-grey">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/images/northside-logo.001.png"
                  alt="Northside 10 Logo"
                  width={400}
                  height={200}
                  className="h-20 md:h-24 w-auto transform scale-125 md:scale-150"
                  priority
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-charcoal hover:text-crimson-red transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto bg-charcoal">
            <div className="container mx-auto px-6 py-8 space-y-6">
              <Link
                href="/menus"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menus
              </Link>
              <a
                href="https://order.toasttab.com/online/northside10"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order Online
              </a>
              <Link
                href="/reservations"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reservations
              </Link>
              <Link
                href="/catering"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catering & Events
              </Link>
              <Link
                href="/giftcards"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gift Cards
              </Link>
              <Link
                href="/rewards"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rewards
              </Link>
              <a
                href="https://thesweetside.cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                The Sweetside Cafe
              </a>

              <Link
                href="/gallery"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
