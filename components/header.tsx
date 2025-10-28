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
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/design-mode/northside_logo(1).png"
              alt="Northside 10 Logo"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <h1 className="text-2xl md:text-3xl font-serif text-charcoal">Northside 10</h1>
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
        <div className="fixed inset-0 z-50 bg-charcoal text-soft-white flex flex-col h-screen">
          <div className="flex-shrink-0 container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/images/design-mode/northside_logo(1).png"
                  alt="Northside 10 Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 invert"
                />
                <h2 className="text-3xl md:text-4xl font-serif text-soft-white">Northside 10</h2>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-warm-gold hover:text-warm-gold/80 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto container mx-auto px-6 pb-8">
            <div className="space-y-6 py-4">
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
              <a
                href="https://www.toasttab.com/northside10/giftcards"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl font-sans text-soft-white uppercase tracking-wide hover:text-warm-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gift Cards
              </a>
              <a
                href="https://fabulous-crisp-11e2dc.netlify.app/"
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
