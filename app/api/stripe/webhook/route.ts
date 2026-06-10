import { NextResponse } from "next/server"
import Stripe from "stripe"
import QRCode from "qrcode"
import { Resend } from "resend"
import { getEvent, formatPrice } from "@/lib/events"
import { getStripe, SITE_URL } from "@/lib/stripe"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured")
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })
  }

  const stripe = getStripe()
  const signature = request.headers.get("stripe-signature")
  const payload = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature ?? "", webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // Only handle our event-ticket sessions (ignore Coffee Club / anything else)
  const eventSlug = session.metadata?.event_slug
  const siteEvent = eventSlug ? getEvent(eventSlug) : undefined
  if (!eventSlug || !siteEvent || session.payment_status !== "paid") {
    return NextResponse.json({ received: true })
  }

  try {
    const piId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id

    // Idempotency: Stripe retries webhooks — never email the same order twice.
    if (piId) {
      const pi = await stripe.paymentIntents.retrieve(piId)
      if (pi.metadata.tickets_email_sent) {
        return NextResponse.json({ received: true, duplicate: true })
      }
      // Link the PI back to its session so the staff dashboard can check people
      // in from the order list, and mirror the event metadata so the PI is the
      // complete ticket record. (Email-sent flag is set after a successful send.)
      await stripe.paymentIntents.update(piId, {
        metadata: {
          session_id: session.id,
          event_slug: eventSlug,
          ticket_qty: session.metadata?.ticket_qty ?? "1",
          addon_qty: session.metadata?.addon_qty ?? "0",
        },
      })
    }

    const name = session.customer_details?.name ?? "Guest"
    const email = session.customer_details?.email
    const ticketQty = parseInt(session.metadata?.ticket_qty ?? "1", 10) || 1
    const addOnQty = parseInt(session.metadata?.addon_qty ?? "0", 10) || 0
    const amountTotal = session.amount_total ?? 0

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured — ticket email NOT sent for", session.id)
      return NextResponse.json({ received: true, emailSkipped: true })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)
    // Overridable for local testing where the prod domain isn't verified
    const fromAddress = process.env.TICKETS_FROM_EMAIL || "Northside 10 <contact@thenorthside10.com>"

    const ticketUrl = `${SITE_URL}/tickets/${session.id}`
    const qrUrl = `${SITE_URL}/api/qr?t=${session.id}`
    const qrPng = await QRCode.toBuffer(`${SITE_URL}/staff/checkin/${session.id}`, {
      type: "png",
      width: 512,
      margin: 2,
      color: { dark: "#0B0B0B", light: "#FFFFFF" },
    })

    const guestEmail = email
      ? resend.emails.send({
          from: fromAddress,
          to: [email],
          subject: `Your tickets — ${siteEvent.title} at Northside 10`,
          attachments: [{ filename: "northside10-ticket-qr.png", content: qrPng.toString("base64") }],
          html: `
<div style="background:#F9F9F9;padding:24px 12px;font-family:Montserrat,Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#0B0B0B;border-radius:14px;overflow:hidden;">
    <div style="padding:32px 28px 20px;text-align:center;">
      <img src="${SITE_URL}/images/northside-logo-red.png" alt="Northside 10" width="96" style="display:block;margin:0 auto 16px;" />
      <p style="color:#D4AF37;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Northside 10 Presents</p>
      <h1 style="color:#F9F9F9;font-family:Georgia,'Times New Roman',serif;font-size:34px;margin:0 0 6px;">${siteEvent.title}</h1>
      <p style="color:#CCCCCC;font-size:14px;margin:0;">${siteEvent.subtitle}</p>
    </div>
    <div style="padding:0 28px 24px;text-align:center;">
      <p style="color:#F9F9F9;font-size:16px;margin:0 0 2px;font-weight:600;">${siteEvent.dateLabel} &bull; ${siteEvent.timeLabel}</p>
      <p style="color:#CCCCCC;font-size:14px;margin:0;">Northside 10 &mdash; 10 East Glebe Road, Alexandria, VA 22305</p>
    </div>
    <div style="background:#F9F9F9;margin:0 28px;border-radius:12px;padding:24px;text-align:center;">
      <p style="color:#B22222;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin:0 0 4px;">Admits ${ticketQty}</p>
      <p style="color:#0B0B0B;font-size:15px;font-weight:600;margin:0 0 14px;">${name}</p>
      <img src="${qrUrl}" alt="Your ticket QR code" width="220" height="220" style="display:block;margin:0 auto;border:1px solid #CCCCCC;border-radius:8px;" />
      <p style="color:#2E2E2E;font-size:13px;margin:14px 0 0;">Show this QR code at the door.<br/>It's also attached to this email and available anytime at the link below.</p>
    </div>
    <div style="padding:20px 28px;text-align:center;">
      <a href="${ticketUrl}" style="display:inline-block;background:#B22222;color:#F9F9F9;text-decoration:none;font-weight:700;text-transform:uppercase;letter-spacing:1px;font-size:14px;padding:14px 28px;border-radius:8px;">View My Tickets</a>
    </div>
    <div style="padding:0 28px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="color:#CCCCCC;font-size:13px;padding:4px 0;">Seafood Boil Ticket &times; ${ticketQty}</td>
          <td style="color:#CCCCCC;font-size:13px;text-align:right;">${formatPrice(siteEvent.priceCents * ticketQty)}</td>
        </tr>
        ${
          addOnQty > 0 && siteEvent.addOn
            ? `<tr>
          <td style="color:#CCCCCC;font-size:13px;padding:4px 0;">${siteEvent.addOn.name} &times; ${addOnQty}</td>
          <td style="color:#CCCCCC;font-size:13px;text-align:right;">${formatPrice(siteEvent.addOn.priceCents * addOnQty)}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="color:#F9F9F9;font-size:14px;font-weight:700;padding:10px 0 0;border-top:1px solid #2E2E2E;">Total Paid</td>
          <td style="color:#F9F9F9;font-size:14px;font-weight:700;text-align:right;padding:10px 0 0;border-top:1px solid #2E2E2E;">${formatPrice(amountTotal)}</td>
        </tr>
      </table>
      <p style="color:#666;font-size:12px;margin:18px 0 0;text-align:center;">Questions? Call (703) 888-0032 or reply to this email.</p>
    </div>
  </div>
</div>`,
        })
      : Promise.resolve(null)

    const recipientEmails = process.env.CONTACT_EMAIL
      ? process.env.CONTACT_EMAIL.split(",").map((e) => e.trim())
      : null
    const ownerEmail = recipientEmails
      ? resend.emails.send({
          from: fromAddress,
          to: recipientEmails,
          subject: `🎟️ ${siteEvent.title}: ${ticketQty} ticket${ticketQty === 1 ? "" : "s"} sold to ${name}`,
          html: `
<h2>New ticket order — ${siteEvent.title}</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email ?? "—"}</p>
<p><strong>Phone:</strong> ${session.customer_details?.phone ?? "—"}</p>
<p><strong>Tickets:</strong> ${ticketQty}</p>
${addOnQty > 0 && siteEvent.addOn ? `<p><strong>${siteEvent.addOn.name}:</strong> ${addOnQty}</p>` : ""}
<p><strong>Total:</strong> ${formatPrice(amountTotal)}</p>
<p><a href="${ticketUrl}">View order/ticket</a></p>`,
        })
      : Promise.resolve(null)

    const [guestResult, ownerResult] = await Promise.allSettled([guestEmail, ownerEmail])
    if (ownerResult.status === "rejected") {
      console.error("Owner notification email failed:", ownerResult.reason)
    }

    const guestFailed =
      guestResult.status === "rejected" ||
      (guestResult.value !== null && !!guestResult.value.error)
    if (guestFailed) {
      const reason = guestResult.status === "rejected" ? guestResult.reason : guestResult.value?.error
      console.error("Guest ticket email failed:", reason)
      // Non-2xx → Stripe retries later; flag stays unset so the email re-sends
      return NextResponse.json({ error: "Ticket email failed" }, { status: 500 })
    }

    if (piId) {
      await stripe.paymentIntents.update(piId, {
        metadata: { tickets_email_sent: new Date().toISOString() },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    // Non-2xx makes Stripe retry — desirable since we haven't emailed yet
    return NextResponse.json({ error: "Processing failed" }, { status: 500 })
  }
}
