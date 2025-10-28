import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import CateringForm from "@/components/catering-form"
import Image from "next/image"

export default function CateringPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-charcoal text-soft-white pt-24 md:pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/design-mode/northside_logo(1).png"
                alt="Northside 10 Logo"
                width={150}
                height={150}
                className="w-24 h-24 md:w-32 md:h-32 invert"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-soft-white mb-6 md:mb-8">
              Catering & Events
            </h1>
            <div className="w-24 h-1 bg-crimson-red mx-auto mb-8"></div>
            <p className="text-lg md:text-xl lg:text-2xl font-sans text-soft-white/90 leading-relaxed max-w-3xl mx-auto">
              Looking to host a party or cater an event? Tell us about your event and we'd be happy to help make it
              memorable with our delicious Southern comfort food.
            </p>
          </div>

          {/* Form Section */}
          <div className="max-w-4xl mx-auto">
            <CateringForm />
          </div>

          {/* Additional Info */}
          <div className="max-w-4xl mx-auto mt-12 md:mt-16 text-center">
            <p className="text-base md:text-lg font-sans text-soft-white/80">
              For immediate assistance, call us at{" "}
              <a
                href="tel:+17038880032"
                className="text-warm-gold hover:text-warm-gold/80 transition-colors font-semibold"
              >
                (703) 888-0032
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
