"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import { Search, Shield, Ticket, Users, DollarSign, CheckCircle2, Loader2 } from "lucide-react"
import { EVENTS } from "@/lib/events"

interface Order {
  sessionId: string | null
  paymentIntentId: string | null
  name: string
  email: string
  phone: string
  ticketQty: number
  addOnQty: number
  amountTotal: number
  paid: boolean
  checkedInAt: string | null
  createdTimestamp: number
}

interface Stats {
  sold: number
  capacity: number
  remaining: number
  orderCount: number
  checkedInTickets: number
  revenue: number
}

const PIN_KEY = "ns10_staff_pin"
const EVENT_SLUG = EVENTS[0]?.slug ?? ""
const EVENT_TITLE = EVENTS[0]?.title ?? "Event"

export default function StaffEventsPage() {
  const [pin, setPin] = useState("")
  const [activePin, setActivePin] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [checkingIn, setCheckingIn] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem(PIN_KEY)
    if (stored) setActivePin(stored)
    setReady(true)
  }, [])

  const loadOrders = useCallback(async (usePin: string) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/staff/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: usePin, action: "orders", slug: EVENT_SLUG }),
      })
      const data = await res.json()
      if (res.status === 401) {
        sessionStorage.removeItem(PIN_KEY)
        setActivePin(null)
        setError("Invalid PIN.")
        return
      }
      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        return
      }
      sessionStorage.setItem(PIN_KEY, usePin)
      setActivePin(usePin)
      setOrders(data.orders)
      setStats(data.stats)
    } catch {
      setError("Could not connect. Try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (ready && activePin && orders.length === 0) {
      loadOrders(activePin)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  async function checkInOrder(order: Order) {
    if (!activePin) return
    const key = order.sessionId ?? order.paymentIntentId
    if (!key) return
    setCheckingIn(key)
    try {
      const res = await fetch("/api/staff/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: activePin,
          action: "checkin",
          sessionId: order.sessionId ?? undefined,
          paymentIntentId: order.sessionId ? undefined : order.paymentIntentId,
        }),
      })
      const data = await res.json()
      if (data.order) {
        setOrders((prev) =>
          prev.map((o) =>
            (o.sessionId ?? o.paymentIntentId) === key
              ? { ...o, checkedInAt: data.order.checkedInAt }
              : o
          )
        )
        setStats((prev) =>
          prev && data.order.checkedInAt
            ? { ...prev, checkedInTickets: prev.checkedInTickets + order.ticketQty }
            : prev
        )
      }
    } catch {
      // refresh will reconcile
    } finally {
      setCheckingIn(null)
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return orders
    const q = search.toLowerCase()
    return orders.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.includes(q)
    )
  }, [orders, search])

  if (!ready) return <div className="min-h-screen bg-charcoal" />

  if (!activePin) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-soft-white/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-warm-gold" />
            </div>
            <h1 className="font-serif text-3xl text-soft-white mb-2">Event Orders</h1>
            <p className="font-sans text-soft-white/50 text-sm">{EVENT_TITLE} Staff Access</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter staff PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && pin.trim() && loadOrders(pin)}
              className="w-full px-4 py-4 bg-soft-white/10 border-2 border-soft-white/20 text-soft-white font-sans text-center text-2xl tracking-[0.5em] rounded-lg placeholder:text-soft-white/30 placeholder:tracking-normal placeholder:text-base focus:outline-none focus:border-warm-gold transition-colors"
              autoFocus
            />
            <button
              onClick={() => loadOrders(pin)}
              disabled={loading || !pin.trim()}
              className="w-full py-4 bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans font-semibold uppercase tracking-wide rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "View Orders"}
            </button>
            {error && <p className="text-crimson-red font-sans text-sm text-center">{error}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <div className="border-b border-soft-white/10 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="w-6 h-6 text-warm-gold" />
            <h1 className="font-serif text-xl text-soft-white">{EVENT_TITLE} Orders</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/staff"
              className="font-sans text-sm text-soft-white/40 hover:text-warm-gold transition-colors"
            >
              Coffee Club
            </Link>
            <button
              onClick={() => activePin && loadOrders(activePin)}
              disabled={loading}
              className="font-sans text-sm text-warm-gold hover:text-soft-white transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-soft-white/5 rounded-lg p-4 border border-soft-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Ticket className="w-4 h-4 text-warm-gold" />
                <span className="font-sans text-xs text-soft-white/50 uppercase tracking-wide">
                  Tickets Sold
                </span>
              </div>
              <p className="font-serif text-3xl text-soft-white">
                {stats.sold}
                <span className="text-soft-white/40 text-lg"> / {stats.capacity}</span>
              </p>
            </div>
            <div className="bg-soft-white/5 rounded-lg p-4 border border-soft-white/10">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-warm-gold" />
                <span className="font-sans text-xs text-soft-white/50 uppercase tracking-wide">
                  Checked In
                </span>
              </div>
              <p className="font-serif text-3xl text-soft-white">
                {stats.checkedInTickets}
                <span className="text-soft-white/40 text-lg"> / {stats.sold}</span>
              </p>
            </div>
            <div className="bg-soft-white/5 rounded-lg p-4 border border-soft-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-warm-gold" />
                <span className="font-sans text-xs text-soft-white/50 uppercase tracking-wide">
                  Orders
                </span>
              </div>
              <p className="font-serif text-3xl text-soft-white">{stats.orderCount}</p>
            </div>
            <div className="bg-soft-white/5 rounded-lg p-4 border border-soft-white/10">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-warm-gold" />
                <span className="font-sans text-xs text-soft-white/50 uppercase tracking-wide">
                  Revenue
                </span>
              </div>
              <p className="font-serif text-3xl text-soft-white">
                ${(stats.revenue / 100).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-white/30" />
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-soft-white/5 border border-soft-white/10 text-soft-white font-sans rounded-lg placeholder:text-soft-white/30 focus:outline-none focus:border-warm-gold transition-colors"
          />
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="text-soft-white/40 font-sans text-center py-8">
              {search ? "No orders match that search." : "No ticket orders yet."}
            </p>
          )}
          {filtered.map((order) => {
            const key = order.sessionId ?? order.paymentIntentId ?? order.email
            return (
              <div
                key={key}
                className="bg-soft-white/5 border border-soft-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-soft-white/10 flex items-center justify-center font-sans font-bold text-soft-white shrink-0">
                  ×{order.ticketQty}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-soft-white truncate">{order.name}</p>
                  <p className="font-sans text-sm text-soft-white/50 truncate">{order.email}</p>
                  {order.addOnQty > 0 && (
                    <p className="font-sans text-xs text-warm-gold">
                      +{order.addOnQty} crab cluster{order.addOnQty === 1 ? "" : "s"}
                    </p>
                  )}
                </div>
                <p className="font-sans text-sm text-soft-white/40 shrink-0">
                  ${(order.amountTotal / 100).toFixed(2)}
                </p>
                <div className="shrink-0">
                  {order.checkedInAt ? (
                    <span className="inline-flex items-center gap-1.5 font-sans text-xs bg-green-700/30 text-green-400 px-3 py-1.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Checked in
                    </span>
                  ) : (
                    <button
                      onClick={() => checkInOrder(order)}
                      disabled={checkingIn === (order.sessionId ?? order.paymentIntentId)}
                      className="font-sans text-xs font-semibold uppercase tracking-wide bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {checkingIn === (order.sessionId ?? order.paymentIntentId) ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : null}
                      Check In
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="font-sans text-xs text-soft-white/30 text-center mt-8">
          New orders can take up to a minute to appear. Hit refresh before doubting a guest&apos;s
          ticket, or just scan their QR code, which is always instant.
        </p>
      </div>
    </div>
  )
}
