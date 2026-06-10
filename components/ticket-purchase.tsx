"use client"

import { useState } from "react"
import { Minus, Plus, Ticket, Loader2 } from "lucide-react"
import { formatPrice } from "@/lib/events"

interface TicketPurchaseProps {
  slug: string
  priceCents: number
  maxPerOrder: number
  remaining: number
  addOn?: {
    name: string
    description: string
    priceCents: number
    maxPerTicket: number
  }
}

export function TicketPurchase({
  slug,
  priceCents,
  maxPerOrder,
  remaining,
  addOn,
}: TicketPurchaseProps) {
  const [tickets, setTickets] = useState(1)
  const [addOns, setAddOns] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const maxTickets = Math.min(maxPerOrder, remaining)
  const maxAddOns = addOn ? tickets * addOn.maxPerTicket : 0
  const total = tickets * priceCents + addOns * (addOn?.priceCents ?? 0)

  function changeTickets(delta: number) {
    const next = Math.min(maxTickets, Math.max(1, tickets + delta))
    setTickets(next)
    if (addOn && addOns > next * addOn.maxPerTicket) {
      setAddOns(next * addOn.maxPerTicket)
    }
  }

  async function handleCheckout() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/events/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, tickets, addOns }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError("Could not connect. Please try again.")
      setLoading(false)
    }
  }

  if (remaining <= 0) {
    return (
      <div className="bg-charcoal rounded-2xl p-8 text-center">
        <p className="font-serif text-3xl text-crimson-red mb-2">Sold Out</p>
        <p className="font-sans text-light-grey text-sm">
          All tickets are gone. Call (703) 888-0032 to ask about a waitlist.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-charcoal rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Ticket className="w-5 h-5 text-warm-gold" />
        <h3 className="font-serif text-2xl text-soft-white">Get Your Tickets</h3>
      </div>

      {remaining <= 10 && (
        <p className="font-sans text-warm-gold text-sm font-semibold mb-4">
          Only {remaining} ticket{remaining === 1 ? "" : "s"} left!
        </p>
      )}

      {/* Ticket quantity */}
      <div className="flex items-center justify-between py-4 border-b border-dark-grey">
        <div>
          <p className="font-sans font-semibold text-soft-white">Seafood Boil Ticket</p>
          <p className="font-sans text-sm text-light-grey">{formatPrice(priceCents)} per person</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => changeTickets(-1)}
            disabled={tickets <= 1 || loading}
            className="w-10 h-10 rounded-full border-2 border-soft-white/30 text-soft-white flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-colors disabled:opacity-30"
            aria-label="Fewer tickets"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-sans font-bold text-xl text-soft-white w-8 text-center">
            {tickets}
          </span>
          <button
            onClick={() => changeTickets(1)}
            disabled={tickets >= maxTickets || loading}
            className="w-10 h-10 rounded-full border-2 border-soft-white/30 text-soft-white flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-colors disabled:opacity-30"
            aria-label="More tickets"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add-on */}
      {addOn && (
        <div className="flex items-center justify-between py-4 border-b border-dark-grey">
          <div className="pr-4">
            <p className="font-sans font-semibold text-soft-white">{addOn.name}</p>
            <p className="font-sans text-sm text-light-grey">
              +{formatPrice(addOn.priceCents)} each
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAddOns(Math.max(0, addOns - 1))}
              disabled={addOns <= 0 || loading}
              className="w-10 h-10 rounded-full border-2 border-soft-white/30 text-soft-white flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-colors disabled:opacity-30"
              aria-label="Fewer add-ons"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-sans font-bold text-xl text-soft-white w-8 text-center">
              {addOns}
            </span>
            <button
              onClick={() => setAddOns(Math.min(maxAddOns, addOns + 1))}
              disabled={addOns >= maxAddOns || loading}
              className="w-10 h-10 rounded-full border-2 border-soft-white/30 text-soft-white flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-colors disabled:opacity-30"
              aria-label="More add-ons"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Total + CTA */}
      <div className="flex items-center justify-between py-5">
        <p className="font-sans text-light-grey">Total</p>
        <p className="font-serif text-3xl text-soft-white">{formatPrice(total)}</p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-4 bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans font-semibold uppercase tracking-wide rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Heading to Checkout...
          </>
        ) : (
          "Buy Tickets"
        )}
      </button>

      {error && (
        <p className="font-sans text-sm text-warm-gold text-center mt-4">{error}</p>
      )}

      <p className="font-sans text-xs text-soft-white/40 text-center mt-4">
        Secure checkout powered by Stripe. Tickets are emailed instantly and shown at the door.
      </p>
    </div>
  )
}
