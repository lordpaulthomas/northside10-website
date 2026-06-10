import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, MapPin, Music, Beer, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TicketPurchase } from "@/components/ticket-purchase"
import { getEvent, isEventOver, formatPrice } from "@/lib/events"
import { getStripe, countRemainingTickets } from "@/lib/stripe"

export const dynamic = "force-dynamic"

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getEvent(params.slug)
  if (!event) return {}
  return {
    title: `${event.title} | ${event.dateLabel} | Northside 10`,
    description: event.description,
    openGraph: {
      title: `${event.title} at Northside 10`,
      description: event.description,
      images: [event.flyerImage],
    },
  }
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug)
  if (!event) notFound()

  const over = isEventOver(event)
  let remaining = 0
  if (!over) {
    try {
      const counts = await countRemainingTickets(getStripe(), event.slug, event.capacity)
      remaining = counts.remaining
    } catch (err) {
      console.error("Could not count remaining tickets:", err)
      // Fail open so a transient Stripe error doesn't show "Sold Out";
      // the checkout API re-verifies capacity before charging anyone.
      remaining = event.capacity
    }
  }

  return (
    <main className="min-h-screen bg-soft-white">
      <Header />
      <div className="pt-[108px] md:pt-[122px]">
        {/* Hero */}
        <section className="bg-charcoal text-center px-4 py-12 md:py-16">
          <p className="font-sans text-warm-gold text-sm font-semibold uppercase tracking-[3px] mb-3">
            Northside 10 Presents
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-soft-white mb-3">{event.title}</h1>
          <p className="font-sans text-light-grey text-lg mb-6">{event.subtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-soft-white">
            <span className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-warm-gold" /> {event.dateLabel}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warm-gold" /> {event.timeLabel}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-warm-gold" /> 10 East Glebe Road, Alexandria
            </span>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
            {/* Flyer */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={event.flyerImage}
                alt={event.flyerAlt}
                width={768}
                height={1024}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Details + purchase */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-charcoal mb-4">
                  {formatPrice(event.priceCents)} Seafood Boil
                </h2>
                <p className="font-sans text-dark-grey leading-relaxed mb-6">{event.description}</p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {event.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 font-sans text-dark-grey">
                      <Check className="w-4 h-4 text-crimson-red shrink-0" /> {item}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {event.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3 font-sans text-dark-grey">
                      {h.toLowerCase().includes("music") ? (
                        <Music className="w-5 h-5 text-warm-gold shrink-0 mt-0.5" />
                      ) : (
                        <Beer className="w-5 h-5 text-warm-gold shrink-0 mt-0.5" />
                      )}
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {over ? (
                <div className="bg-charcoal rounded-2xl p-8 text-center">
                  <p className="font-serif text-3xl text-soft-white mb-2">This Event Has Ended</p>
                  <p className="font-sans text-light-grey text-sm">
                    Thanks to everyone who came out. See you at the next one!
                  </p>
                </div>
              ) : (
                <TicketPurchase
                  slug={event.slug}
                  priceCents={event.priceCents}
                  maxPerOrder={event.maxPerOrder}
                  remaining={remaining}
                  addOn={event.addOn}
                />
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
