import { NextResponse } from "next/server"
import Stripe from "stripe"

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

    const secretKey = process.env.STRIPE_SECRET_KEY
    const staffPin = process.env.STAFF_PIN
    const priceId = process.env.STRIPE_DRIP_CLUB_PRICE_ID

    if (!secretKey || !staffPin || !priceId) {
      console.error("Missing env vars:", { secretKey: !!secretKey, staffPin: !!staffPin, priceId: !!priceId })
      return NextResponse.json(
        { error: "Staff tool not configured." },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { pin } = body

    if (pin !== staffPin) {
      return NextResponse.json({ error: "Invalid PIN." }, { status: 401 })
    }

    const stripe = new Stripe(secretKey, { apiVersion: "2024-12-18.acacia" })

    const subscriptions = await stripe.subscriptions.list({
      price: priceId,
      status: "active",
      limit: 100,
      expand: ["data.customer"],
    })

    const members = subscriptions.data
      .map((sub) => {
        const customer = sub.customer as Stripe.Customer
        return {
          id: sub.id,
          name: customer.name ?? "—",
          email: customer.email ?? "—",
          phone: customer.phone ?? "—",
          memberSince: new Date(sub.created * 1000).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          createdTimestamp: sub.created,
        }
      })
      .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
      .map((member, index) => ({
        ...member,
        memberNumber: index + 1,
        mugEligible: index < 50,
      }))

    return NextResponse.json({
      success: true,
      members,
      totalActive: members.length,
    })
  } catch (error) {
    console.error("Staff members API error:", error)
    return NextResponse.json(
      { error: "Failed to load members." },
      { status: 500 }
    )
  }
}
