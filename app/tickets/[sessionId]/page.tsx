import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle2, MapPin, CalendarDays, Clock, Phone } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getEvent, formatPrice } from "@/lib/events"
import { getStripe, getOrderBySession } from "@/lib/stripe"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Your Tickets | Northside 10",
  robots: { index: false, follow: false },
}

const SESSION_ID_PATTERN = /^cs_(test|live)_[a-zA-Z0-9]+$/

export default async function TicketPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params
  if (!SESSION_ID_PATTERN.test(sessionId)) notFound()

  const order = await getOrderBySession(getStripe(), sessionId)
  if (!order) notFound()

  const event = getEvent(order.eventSlug)
  if (!event) notFound()

  if (!order.paid) {
    return (
      <main className="min-h-screen bg-soft-white">
        <Header />
        <div className="pt-[140px] md:pt-[160px] pb-24 px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="font-serif text-3xl text-charcoal mb-4">Payment Not Completed</h1>
            <p className="font-sans text-dark-grey mb-8">
              This order hasn&apos;t been paid yet. If you canceled checkout, you can try again
              below — tickets aren&apos;t reserved until payment is complete.
            </p>
            <Link
              href={`/events/${event.slug}`}
              className="inline-block bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans font-semibold uppercase tracking-wide px-8 py-4 rounded-lg transition-colors"
            >
              Back to {event.title}
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-soft-white">
      <Header />
      <div className="pt-[140px] md:pt-[160px] pb-24 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6 text-green-700">
            <CheckCircle2 className="w-6 h-6" />
            <p className="font-sans font-semibold">You&apos;re in! Payment confirmed.</p>
          </div>

          {/* Ticket card */}
          <div className="bg-charcoal rounded-2xl overflow-hidden shadow-xl">
            <div className="px-7 pt-8 pb-5 text-center">
              <p className="font-sans text-warm-gold text-xs font-semibold uppercase tracking-[3px] mb-2">
                Northside 10 Presents
              </p>
              <h1 className="font-serif text-4xl text-soft-white mb-1">{event.title}</h1>
              <p className="font-sans text-light-grey text-sm">{event.subtitle}</p>
            </div>

            <div className="px-7 pb-5 space-y-1.5">
              <div className="flex items-center justify-center gap-2 text-soft-white font-sans text-sm">
                <CalendarDays className="w-4 h-4 text-warm-gold" />
                {event.dateLabel}
              </div>
              <div className="flex items-center justify-center gap-2 text-soft-white font-sans text-sm">
                <Clock className="w-4 h-4 text-warm-gold" />
                {event.timeLabel}
              </div>
              <div className="flex items-center justify-center gap-2 text-soft-white font-sans text-sm">
                <MapPin className="w-4 h-4 text-warm-gold" />
                10 East Glebe Road, Alexandria, VA
              </div>
            </div>

            {/* QR panel */}
            <div className="bg-soft-white mx-5 rounded-xl p-6 text-center">
              <p className="font-sans text-crimson-red text-sm font-bold uppercase tracking-[2px]">
                Admits {order.ticketQty}
              </p>
              <p className="font-sans text-charcoal font-semibold mb-4">{order.name}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/qr?t=${order.sessionId}`}
                alt="Your ticket QR code"
                width={224}
                height={224}
                className="mx-auto rounded-lg border border-light-grey"
              />
              <p className="font-sans text-dark-grey text-sm mt-4">
                Show this QR code at the door
              </p>
              {order.checkedInAt && (
                <p className="font-sans text-green-700 text-sm font-semibold mt-2">
                  ✓ Checked in
                </p>
              )}
            </div>

            {/* Order summary */}
            <div className="px-7 py-6">
              <div className="flex justify-between font-sans text-sm text-light-grey py-1">
                <span>Seafood Boil Ticket × {order.ticketQty}</span>
                <span>{formatPrice(event.priceCents * order.ticketQty)}</span>
              </div>
              {order.addOnQty > 0 && event.addOn && (
                <div className="flex justify-between font-sans text-sm text-light-grey py-1">
                  <span>
                    {event.addOn.name} × {order.addOnQty}
                  </span>
                  <span>{formatPrice(event.addOn.priceCents * order.addOnQty)}</span>
                </div>
              )}
              <div className="flex justify-between font-sans text-sm font-bold text-soft-white pt-3 mt-2 border-t border-dark-grey">
                <span>Total Paid</span>
                <span>{formatPrice(order.amountTotal)}</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 space-y-2">
            <p className="font-sans text-sm text-dark-grey">
              A copy of your ticket was emailed to <strong>{order.email}</strong>
            </p>
            <p className="font-sans text-sm text-dark-grey">
              Bookmark this page — your QR works right from here.
            </p>
            <p className="font-sans text-sm text-dark-grey flex items-center justify-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Questions? (703) 888-0032
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
