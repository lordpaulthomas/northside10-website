import { NextResponse } from "next/server"
import { getEvent, isEventOver } from "@/lib/events"
import { getStripe, countRemainingTickets, SITE_URL } from "@/lib/stripe"

export const dynamic = "force-dynamic"

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
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

    const body = await request.json()
    const slug = typeof body.slug === "string" ? body.slug : ""
    const tickets = Number(body.tickets)
    const addOns = Number(body.addOns ?? 0)

    const event = getEvent(slug)
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 })
    }
    if (isEventOver(event)) {
      return NextResponse.json({ error: "This event has ended." }, { status: 410 })
    }
    if (!Number.isInteger(tickets) || tickets < 1 || tickets > event.maxPerOrder) {
      return NextResponse.json(
        { error: `Tickets must be between 1 and ${event.maxPerOrder}.` },
        { status: 400 }
      )
    }
    const maxAddOns = event.addOn ? tickets * event.addOn.maxPerTicket : 0
    if (!Number.isInteger(addOns) || addOns < 0 || addOns > maxAddOns) {
      return NextResponse.json({ error: "Invalid add-on quantity." }, { status: 400 })
    }

    const stripe = getStripe()

    const { remaining } = await countRemainingTickets(stripe, event.slug, event.capacity)
    if (remaining <= 0) {
      return NextResponse.json(
        { error: "Sorry, this event is sold out.", soldOut: true },
        { status: 409 }
      )
    }
    if (tickets > remaining) {
      return NextResponse.json(
        {
          error: `Only ${remaining} ticket${remaining === 1 ? "" : "s"} left. Please adjust your quantity.`,
          remaining,
        },
        { status: 409 }
      )
    }

    const metadata = {
      event_slug: event.slug,
      ticket_qty: String(tickets),
      addon_qty: String(addOns),
    }

    const lineItems: Array<{
      quantity: number
      price_data: {
        currency: string
        unit_amount: number
        product_data: { name: string; description: string; images?: string[] }
      }
    }> = [
      {
        quantity: tickets,
        price_data: {
          currency: "usd",
          unit_amount: event.priceCents,
          product_data: {
            name: event.ticketName,
            description: event.ticketDescription,
            images: [`${SITE_URL}${event.flyerImage}`],
          },
        },
      },
    ]
    if (event.addOn && addOns > 0) {
      lineItems.push({
        quantity: addOns,
        price_data: {
          currency: "usd",
          unit_amount: event.addOn.priceCents,
          product_data: {
            name: `${event.title} — ${event.addOn.name}`,
            description: event.addOn.description,
          },
        },
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata,
      payment_intent_data: { metadata },
      phone_number_collection: { enabled: true },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${SITE_URL}/tickets/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/events/${event.slug}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Event checkout error:", error)
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    )
  }
}
