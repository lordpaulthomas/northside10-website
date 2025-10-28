import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReservationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-soft-white pt-24 md:pt-28 lg:pt-32 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl w-full">
          {/* Reservation Card */}
          <div className="bg-soft-white border-2 border-light-grey rounded-lg shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-soft-white border-b border-light-grey px-4 sm:px-6 md:px-8 py-6 md:py-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal uppercase tracking-wide leading-tight">
                Make a Reservation
              </h1>
            </div>

            {/* Content Section */}
            <div className="bg-crimson-red px-4 sm:px-6 md:px-8 py-8 md:py-12 text-center">
              <div className="max-w-xl mx-auto space-y-6 md:space-y-8">
                <div className="h-px bg-soft-white/30 w-20 md:w-24 mx-auto" />

                <p className="text-base sm:text-lg md:text-xl text-soft-white font-sans leading-relaxed px-2">
                  We're currently taking reservations by phone only. Give us a call and we'll be happy to reserve a
                  table for you!
                </p>

                <Button
                  asChild
                  className="bg-soft-white/10 hover:bg-soft-white hover:text-crimson-red text-soft-white border-2 border-soft-white font-sans uppercase tracking-wide px-6 sm:px-8 py-5 md:py-6 text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  <a href="tel:7038880032" className="inline-flex items-center justify-center gap-2 md:gap-3">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-sm sm:text-base md:text-lg">Call (703) 888-0032</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-soft-white px-4 sm:px-6 md:px-8 py-6 md:py-8 text-center border-t border-light-grey">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-serif text-charcoal">Hours</h2>
                <div className="space-y-2 text-charcoal/80 font-sans text-sm md:text-base">
                  <div className="flex justify-center gap-3 md:gap-4">
                    <span className="font-semibold min-w-[80px] md:min-w-[100px] text-right">Mon-Thu</span>
                    <span>11:30 am - 10:30 pm</span>
                  </div>
                  <div className="flex justify-center gap-3 md:gap-4">
                    <span className="font-semibold min-w-[80px] md:min-w-[100px] text-right">Friday</span>
                    <span>11:30 am - 11:30 pm</span>
                  </div>
                  <div className="flex justify-center gap-3 md:gap-4">
                    <span className="font-semibold min-w-[80px] md:min-w-[100px] text-right">Saturday</span>
                    <span>10:00 am - 11:30 pm</span>
                  </div>
                  <div className="flex justify-center gap-3 md:gap-4">
                    <span className="font-semibold min-w-[80px] md:min-w-[100px] text-right">Sunday</span>
                    <span>10:00 am - 10:30 pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-6 md:mt-8 text-center px-4">
            <p className="text-charcoal/60 font-sans text-sm md:text-base">
              Questions? Email us at{" "}
              <a
                href="mailto:northside10va@gmail.com"
                className="text-crimson-red hover:text-warm-gold transition-colors uppercase font-semibold break-all"
              >
                northside10va@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
