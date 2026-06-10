import { NextResponse } from "next/server"
import { getEvent } from "@/lib/events"
import {
  getStripe,
  getOrderBySession,
  orderFromPaymentIntent,
  listPaidOrders,
  TicketOrder,
} from "@/lib/stripe"

export const dynamic = "force-dynamic"

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 30
const RATE_WINDOW = 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again in a minute." },
        { status: 429 }
      )
    }

    const staffPin = process.env.STAFF_PIN
    if (!staffPin || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Staff tool not configured." }, { status: 500 })
    }

    const body = await request.json()
    const { pin, action } = body

    if (pin !== staffPin) {
      return NextResponse.json({ error: "Invalid PIN." }, { status: 401 })
    }

    const stripe = getStripe()

    if (action === "orders") {
      const event = getEvent(body.slug)
      if (!event) {
        return NextResponse.json({ error: "Event not found." }, { status: 404 })
      }
      const orders = await listPaidOrders(stripe, event.slug)
      const sold = orders.reduce((sum, o) => sum + o.ticketQty, 0)
      const checkedInTickets = orders
        .filter((o) => o.checkedInAt)
        .reduce((sum, o) => sum + o.ticketQty, 0)
      const revenue = orders.reduce((sum, o) => sum + o.amountTotal, 0)
      return NextResponse.json({
        success: true,
        orders,
        stats: {
          sold,
          capacity: event.capacity,
          remaining: Math.max(0, event.capacity - sold),
          orderCount: orders.length,
          checkedInTickets,
          revenue,
        },
      })
    }

    if (action === "lookup" || action === "checkin") {
      const { sessionId, paymentIntentId } = body
      let order: TicketOrder | null = null

      if (typeof sessionId === "string" && sessionId.startsWith("cs_")) {
        order = await getOrderBySession(stripe, sessionId)
      } else if (typeof paymentIntentId === "string" && paymentIntentId.startsWith("pi_")) {
        try {
          const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
            expand: ["latest_charge"],
          })
          if (pi.metadata.event_slug) order = orderFromPaymentIntent(pi)
        } catch {
          order = null
        }
      }

      if (!order) {
        return NextResponse.json({ error: "Ticket not found." }, { status: 404 })
      }

      const event = getEvent(order.eventSlug)

      if (action === "checkin") {
        if (!order.paid) {
          return NextResponse.json(
            { error: "This order was never paid.", order },
            { status: 409 }
          )
        }
        if (order.checkedInAt) {
          return NextResponse.json(
            { error: "Already checked in.", alreadyCheckedIn: true, order },
            { status: 409 }
          )
        }
        if (!order.paymentIntentId) {
          return NextResponse.json(
            { error: "Order has no payment record.", order },
            { status: 409 }
          )
        }
        const checkedInAt = new Date().toISOString()
        await stripe.paymentIntents.update(order.paymentIntentId, {
          metadata: { checked_in_at: checkedInAt },
        })
        order = { ...order, checkedInAt }
      }

      return NextResponse.json({
        success: true,
        order,
        eventTitle: event?.title ?? order.eventSlug,
      })
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 })
  } catch (error) {
    console.error("Staff events API error:", error)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
