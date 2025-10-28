import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ContactForm from "@/components/contact-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-charcoal text-soft-white pt-24 md:pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Logo Section */}
            <div className="flex flex-col items-center lg:items-start justify-center">
              <Image
                src="/images/design-mode/northside_logo(1).png"
                alt="Northside 10 Logo"
                width={200}
                height={200}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 md:mb-6 invert"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-soft-white text-center lg:text-left">
                NORTHSIDE
                <br />
                <span className="border-b-4 border-crimson-red inline-block pb-2">10</span>
              </h1>
            </div>

            {/* Restaurant Hours Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-soft-white mb-6 md:mb-8">
                Restaurant Hours
              </h2>
              <div className="space-y-4 md:space-y-6 font-sans text-base md:text-lg">
                <div>
                  <p className="text-soft-white font-semibold mb-2">Mon - Thu:</p>
                  <p className="text-soft-white/90">11:30am to 10:30pm</p>
                </div>
                <div>
                  <p className="text-soft-white font-semibold mb-2">Friday:</p>
                  <p className="text-soft-white/90">11:30am to 11:30pm</p>
                </div>
                <div>
                  <p className="text-soft-white font-semibold mb-2">Saturday:</p>
                  <p className="text-soft-white/90">10:00am to 11:30pm</p>
                </div>
                <div>
                  <p className="text-soft-white font-semibold mb-2">Sunday:</p>
                  <p className="text-soft-white/90">10:00am to 10:30pm</p>
                </div>
              </div>

              <Link
                href="/reservations"
                className="inline-block mt-8 md:mt-10 px-6 md:px-8 py-3 md:py-4 bg-warm-gold text-charcoal font-sans font-semibold text-base md:text-lg uppercase tracking-wide hover:bg-warm-gold/90 transition-colors"
              >
                Call for Reservations
              </Link>
            </div>

            {/* Contact Info Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-soft-white mb-6 md:mb-8">
                Contact Info
              </h2>
              <div className="space-y-4 md:space-y-6 font-sans text-base md:text-lg">
                <div className="flex items-start gap-3 justify-center lg:justify-start">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-warm-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-soft-white/90">10 East Glebe Road,</p>
                    <p className="text-soft-white/90">Alexandria, VA 22305</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-warm-gold flex-shrink-0" />
                  <a href="tel:+17038880032" className="text-soft-white/90 hover:text-warm-gold transition-colors">
                    (703) 888-0032
                  </a>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-warm-gold flex-shrink-0" />
                  <a
                    href="mailto:northside10va@gmail.com"
                    className="text-soft-white/90 hover:text-warm-gold transition-colors break-all text-sm md:text-base lg:text-lg"
                  >
                    northside10va@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12 md:mt-16 lg:mt-20">
            <ContactForm />
          </div>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-6 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-soft-white/20">
            <a
              href="https://www.facebook.com/northside10va"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-white hover:text-warm-gold transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/northside10va"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-white hover:text-warm-gold transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.023-.058 1.351-.058 4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.048-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
