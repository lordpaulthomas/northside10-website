import Stripe from "stripe"

/**
 * In local dev (`next dev`), prefer the test-mode key when present so we never
 * touch live payments while building. Production deployments only have
 * STRIPE_SECRET_KEY set.
 */
export function getStripeKey(): string {
  const testKey = process.env.STRIPE_TEST_SECRET_KEY
  const liveKey = process.env.STRIPE_SECRET_KEY
  const key = process.env.NODE_ENV !== "production" && testKey ? testKey : liveKey
  if (!key) throw new Error("Stripe secret key not configured")
  return key
}

export function getStripe(): Stripe {
  return new Stripe(getStripeKey())
}

// www is intentional: the apex domain has a broken DNS record (CNAME at apex,
// no A record) and does not resolve on strict resolvers like 8.8.8.8/1.1.1.1.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://www.thenorthside10.com" : "http://localhost:3000")

export interface TicketOrder {
  /** Checkout Session id (cs_...) — the public ticket id encoded in the QR */
  sessionId: string | null
  paymentIntentId: string | null
  eventSlug: string
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

function intFromMetadata(value: string | undefined | null): number {
  const n = parseInt(value ?? "0", 10)
  return Number.isFinite(n) && n > 0 ? n : 0
}

export function orderFromPaymentIntent(
  pi: Stripe.PaymentIntent,
  sessionOverrides?: Partial<TicketOrder>
): TicketOrder {
  const charge =
    pi.latest_charge && typeof pi.latest_charge !== "string" ? pi.latest_charge : null
  return {
    sessionId: pi.metadata.session_id ?? null,
    paymentIntentId: pi.id,
    eventSlug: pi.metadata.event_slug ?? "",
    name: charge?.billing_details?.name ?? "—",
    email: charge?.billing_details?.email ?? "—",
    phone: charge?.billing_details?.phone ?? "—",
    ticketQty: intFromMetadata(pi.metadata.ticket_qty),
    addOnQty: intFromMetadata(pi.metadata.addon_qty),
    amountTotal: pi.amount_received ?? pi.amount,
    paid: pi.status === "succeeded",
    checkedInAt: pi.metadata.checked_in_at ?? null,
    createdTimestamp: pi.created,
    ...sessionOverrides,
  }
}

/** Look up a ticket order by its Checkout Session id. Returns null if not found. */
export async function getOrderBySession(
  stripe: Stripe,
  sessionId: string
): Promise<TicketOrder | null> {
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge"],
    })
  } catch {
    return null
  }
  if (!session.metadata?.event_slug) return null

  const pi =
    session.payment_intent && typeof session.payment_intent !== "string"
      ? session.payment_intent
      : null

  const base: TicketOrder = {
    sessionId: session.id,
    paymentIntentId: pi?.id ?? null,
    eventSlug: session.metadata.event_slug,
    name: session.customer_details?.name ?? "—",
    email: session.customer_details?.email ?? "—",
    phone: session.customer_details?.phone ?? "—",
    ticketQty: intFromMetadata(session.metadata.ticket_qty),
    addOnQty: intFromMetadata(session.metadata.addon_qty),
    amountTotal: session.amount_total ?? 0,
    paid: session.payment_status === "paid",
    checkedInAt: pi?.metadata.checked_in_at ?? null,
    createdTimestamp: session.created,
  }
  return base
}

/**
 * All paid orders for an event, via PaymentIntent search on metadata.
 * Note: Stripe Search is eventually consistent (~1 min lag on brand-new payments).
 */
export async function listPaidOrders(stripe: Stripe, eventSlug: string): Promise<TicketOrder[]> {
  const orders: TicketOrder[] = []
  for await (const pi of stripe.paymentIntents.search({
    query: `metadata['event_slug']:'${eventSlug}' AND status:'succeeded'`,
    limit: 100,
    expand: ["data.latest_charge"],
  })) {
    orders.push(orderFromPaymentIntent(pi))
  }
  return orders.sort((a, b) => a.createdTimestamp - b.createdTimestamp)
}

/** Tickets already paid for. */
export async function countTicketsSold(stripe: Stripe, eventSlug: string): Promise<number> {
  let total = 0
  for await (const pi of stripe.paymentIntents.search({
    query: `metadata['event_slug']:'${eventSlug}' AND status:'succeeded'`,
    limit: 100,
  })) {
    total += intFromMetadata(pi.metadata.ticket_qty)
  }
  return total
}

/**
 * Tickets held by open (unexpired, unpaid) checkout sessions, so concurrent
 * buyers can't oversell the last seats. Sessions are created with a 30-minute
 * expiry; anything older is ignored.
 */
export async function countPendingHolds(stripe: Stripe, eventSlug: string): Promise<number> {
  const cutoff = Math.floor(Date.now() / 1000) - 35 * 60
  const sessions = await stripe.checkout.sessions.list({
    created: { gte: cutoff },
    limit: 100,
  })
  return sessions.data
    .filter((s) => s.status === "open" && s.metadata?.event_slug === eventSlug)
    .reduce((sum, s) => sum + intFromMetadata(s.metadata?.ticket_qty), 0)
}

export async function countRemainingTickets(
  stripe: Stripe,
  eventSlug: string,
  capacity: number
): Promise<{ remaining: number; sold: number; held: number }> {
  const [sold, held] = await Promise.all([
    countTicketsSold(stripe, eventSlug),
    countPendingHolds(stripe, eventSlug),
  ])
  return { remaining: Math.max(0, capacity - sold - held), sold, held }
}
