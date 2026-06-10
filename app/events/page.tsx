import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EVENTS, isEventOver, formatPrice } from "@/lib/events"

export const metadata: Metadata = {
  title: "Events | Northside 10",
  description:
    "Upcoming events at Northside 10 in Alexandria, VA. Seafood boils, live music, beer features and more. Get your tickets online.",
}

export default function EventsPage() {
  const upcoming = EVENTS.filter((e) => !isEventOver(e))
  const past = EVENTS.filter((e) => isEventOver(e))

  return (
    <main className="min-h-screen bg-soft-white">
      <Header />
      <div className="pt-[108px] md:pt-[122px]">
        <section className="bg-charcoal text-center px-4 py-12 md:py-16">
          <h1 className="font-serif text-5xl md:text-6xl text-soft-white mb-3">Events</h1>
          <p className="font-sans text-light-grey text-lg max-w-xl mx-auto">
            Good people. Cold drinks. Big moments. Grab your tickets before they&apos;re gone.
          </p>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          {upcoming.length === 0 && (
            <p className="font-sans text-dark-grey text-center py-12">
              No upcoming events right now. Follow us on social or join the newsletter to hear
              about the next one first.
            </p>
          )}

          <div className="max-w-4xl mx-auto space-y-10">
            {upcoming.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group grid md:grid-cols-5 bg-charcoal rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="md:col-span-2">
                  <Image
                    src={event.flyerImage}
                    alt={event.flyerAlt}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-3 p-7 md:p-9 flex flex-col justify-center">
                  <p className="font-sans text-warm-gold text-xs font-semibold uppercase tracking-[3px] mb-2">
                    Upcoming Event
                  </p>
                  <h2 className="font-serif text-4xl text-soft-white mb-2">{event.title}</h2>
                  <p className="font-sans text-light-grey mb-4">{event.subtitle}</p>
                  <div className="space-y-1.5 mb-6">
                    <p className="flex items-center gap-2 font-sans text-sm text-soft-white">
                      <CalendarDays className="w-4 h-4 text-warm-gold" /> {event.dateLabel}
                    </p>
                    <p className="flex items-center gap-2 font-sans text-sm text-soft-white">
                      <Clock className="w-4 h-4 text-warm-gold" /> {event.timeLabel}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-sans font-semibold uppercase tracking-wide text-sm bg-crimson-red group-hover:bg-warm-gold group-hover:text-charcoal text-soft-white px-6 py-3.5 rounded-lg transition-colors self-start">
                    Get Tickets &middot; {formatPrice(event.priceCents)}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {past.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h3 className="font-serif text-2xl text-charcoal mb-6">Past Events</h3>
              <div className="space-y-3">
                {past.map((event) => (
                  <div
                    key={event.slug}
                    className="flex items-center justify-between bg-white border border-light-grey rounded-lg px-5 py-4"
                  >
                    <div>
                      <p className="font-sans font-semibold text-charcoal">{event.title}</p>
                      <p className="font-sans text-sm text-dark-grey">{event.dateLabel}</p>
                    </div>
                    <span className="font-sans text-xs uppercase tracking-wide text-dark-grey">
                      Ended
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  )
}
