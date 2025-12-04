"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-soft-white/95 backdrop-blur-sm border-b border-light-grey">
        <div className="container mx-auto px-4 py-4 relative flex items-center justify-between gap-4">
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

          {/* Order Now and Reservations Buttons - Desktop/Tablet - Centered on screen */}
          <div className="hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
            <Button
              asChild
              className="bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans uppercase tracking-wide px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base transition-colors font-semibold"
            >
              <a href="https://order.toasttab.com/online/northside10" target="_blank" rel="noopener noreferrer">
                Order Now →
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-crimson-red text-crimson-red hover:bg-warm-gold hover:text-charcoal bg-soft-white font-sans uppercase tracking-wide px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base transition-colors font-semibold"
            >
              <a
                href="https://www.opentable.com/r/northside-10-alexandria"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservations →
              </a>
            </Button>
          </div>

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
              {/* Order Now and Reservations Buttons - Mobile - Styled for dark background */}
              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  className="w-full bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans uppercase tracking-wide px-8 py-6 text-base transition-colors font-semibold"
                >
                  <a
                    href="https://order.toasttab.com/online/northside10"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Order Now →
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-soft-white text-soft-white hover:bg-warm-gold hover:text-charcoal bg-charcoal font-sans uppercase tracking-wide px-8 py-6 text-base transition-colors font-semibold"
                >
                  <a
                    href="https://www.opentable.com/r/northside-10-alexandria"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Reservations →
                  </a>
                </Button>
              </div>
              <Link
                href="/menus"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menus
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
