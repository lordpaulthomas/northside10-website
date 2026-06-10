"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Shield, CheckCircle2, XCircle, AlertTriangle, Loader2, Users } from "lucide-react"

interface Order {
  sessionId: string | null
  name: string
  email: string
  phone: string
  ticketQty: number
  addOnQty: number
  amountTotal: number
  paid: boolean
  checkedInAt: string | null
}

const PIN_KEY = "ns10_staff_pin"

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}

export default function CheckinPage() {
  const params = useParams<{ sessionId: string }>()
  const sessionId = params.sessionId

  const [pin, setPin] = useState("")
  const [storedPin, setStoredPin] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)
  const [eventTitle, setEventTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingIn, setCheckingIn] = useState(false)
  const [justCheckedIn, setJustCheckedIn] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setStoredPin(sessionStorage.getItem(PIN_KEY))
    setReady(true)
  }, [])

  const lookup = useCallback(
    async (usePin: string) => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("/api/staff/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin: usePin, action: "lookup", sessionId }),
        })
        const data = await res.json()
        if (res.status === 401) {
          sessionStorage.removeItem(PIN_KEY)
          setStoredPin(null)
          setError("Invalid PIN.")
          return
        }
        if (!res.ok) {
          setError(data.error || "Ticket not found.")
          return
        }
        sessionStorage.setItem(PIN_KEY, usePin)
        setStoredPin(usePin)
        setOrder(data.order)
        setEventTitle(data.eventTitle)
      } catch {
        setError("Could not connect. Try again.")
      } finally {
        setLoading(false)
      }
    },
    [sessionId]
  )

  useEffect(() => {
    if (ready && storedPin && !order) {
      lookup(storedPin)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  async function handleCheckin() {
    if (!storedPin) return
    setCheckingIn(true)
    setError("")
    try {
      const res = await fetch("/api/staff/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: storedPin, action: "checkin", sessionId }),
      })
      const data = await res.json()
      if (data.order) {
        setOrder(data.order)
      }
      if (!res.ok) {
        setError(data.error || "Check-in failed.")
        return
      }
      setJustCheckedIn(true)
    } catch {
      setError("Could not connect. Try again.")
    } finally {
      setCheckingIn(false)
    }
  }

  if (!ready) return <div className="min-h-screen bg-charcoal" />

  // PIN gate
  if (!storedPin || (!order && !loading && !error)) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-soft-white/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-warm-gold" />
            </div>
            <h1 className="font-serif text-3xl text-soft-white mb-2">Ticket Check-In</h1>
            <p className="font-sans text-soft-white/50 text-sm">Staff PIN required</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter staff PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && pin.trim() && lookup(pin)}
              className="w-full px-4 py-4 bg-soft-white/10 border-2 border-soft-white/20 text-soft-white font-sans text-center text-2xl tracking-[0.5em] rounded-lg placeholder:text-soft-white/30 placeholder:tracking-normal placeholder:text-base focus:outline-none focus:border-warm-gold transition-colors"
              autoFocus
            />
            <button
              onClick={() => lookup(pin)}
              disabled={loading || !pin.trim()}
              className="w-full py-4 bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans font-semibold uppercase tracking-wide rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Look Up Ticket"}
            </button>
            {error && <p className="text-crimson-red font-sans text-sm text-center">{error}</p>}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-warm-gold animate-spin" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <XCircle className="w-16 h-16 text-crimson-red mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-soft-white mb-2">Ticket Not Found</h1>
          <p className="font-sans text-soft-white/60 mb-6">{error}</p>
          <Link href="/staff/events" className="font-sans text-warm-gold underline underline-offset-4">
            Open the event dashboard
          </Link>
        </div>
      </div>
    )
  }

  const alreadyCheckedIn = !!order.checkedInAt && !justCheckedIn

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Status banner */}
        {!order.paid ? (
          <div className="bg-crimson-red rounded-xl p-6 text-center mb-6">
            <XCircle className="w-14 h-14 text-soft-white mx-auto mb-2" />
            <p className="font-serif text-3xl text-soft-white">NOT PAID</p>
            <p className="font-sans text-soft-white/80 text-sm mt-1">
              This order was never completed. Do not admit.
            </p>
          </div>
        ) : justCheckedIn ? (
          <div className="bg-green-700 rounded-xl p-6 text-center mb-6">
            <CheckCircle2 className="w-14 h-14 text-soft-white mx-auto mb-2" />
            <p className="font-serif text-3xl text-soft-white">CHECKED IN</p>
            <p className="font-sans text-soft-white/80 text-sm mt-1">Welcome them in!</p>
          </div>
        ) : alreadyCheckedIn ? (
          <div className="bg-crimson-red rounded-xl p-6 text-center mb-6">
            <AlertTriangle className="w-14 h-14 text-soft-white mx-auto mb-2" />
            <p className="font-serif text-3xl text-soft-white">ALREADY USED</p>
            <p className="font-sans text-soft-white/80 text-sm mt-1">
              Checked in at {formatTime(order.checkedInAt!)}. This QR was already scanned.
            </p>
          </div>
        ) : (
          <div className="bg-soft-white/10 border border-warm-gold rounded-xl p-6 text-center mb-6">
            <p className="font-sans text-warm-gold text-xs font-semibold uppercase tracking-[3px] mb-1">
              Valid Ticket
            </p>
            <p className="font-serif text-2xl text-soft-white">{eventTitle}</p>
          </div>
        )}

        {/* Party details */}
        <div className="bg-soft-white/5 border border-soft-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="w-5 h-5 text-warm-gold" />
            <p className="font-serif text-4xl text-soft-white">
              {order.ticketQty}
              <span className="font-sans text-base text-soft-white/50 ml-2">
                {order.ticketQty === 1 ? "guest" : "guests"}
              </span>
            </p>
          </div>
          <p className="font-sans font-semibold text-soft-white text-center text-lg">{order.name}</p>
          <p className="font-sans text-soft-white/50 text-center text-sm">{order.email}</p>
          {order.addOnQty > 0 && (
            <p className="font-sans text-warm-gold text-center text-sm mt-3 font-semibold">
              + {order.addOnQty} extra crab leg cluster{order.addOnQty === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {order.paid && !alreadyCheckedIn && !justCheckedIn && (
          <button
            onClick={handleCheckin}
            disabled={checkingIn}
            className="w-full py-5 bg-green-700 hover:bg-green-600 text-soft-white font-sans font-bold uppercase tracking-wide text-lg rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {checkingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Checking In...
              </>
            ) : (
              `Check In ${order.ticketQty === 1 ? "Guest" : `Party of ${order.ticketQty}`}`
            )}
          </button>
        )}

        {error && order.paid && (
          <p className="text-crimson-red font-sans text-sm text-center mt-4">{error}</p>
        )}

        <div className="text-center mt-8">
          <Link
            href="/staff/events"
            className="font-sans text-sm text-soft-white/40 hover:text-warm-gold transition-colors"
          >
            View all orders →
          </Link>
        </div>
      </div>
    </div>
  )
}
