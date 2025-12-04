import { Button } from "@/components/ui/button"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-charcoal text-soft-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Location Column */}
          <div>
            <h3 className="font-serif text-2xl mb-4 uppercase tracking-wide">Location</h3>
            <p className="text-lg leading-relaxed mb-4">
              10 East Glebe Road
              <br />
              Alexandria, VA 22305
            </p>
            <a
              href="https://maps.google.com/?q=10+East+Glebe+Road+Alexandria+VA+22305"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-gold hover:underline inline-flex items-center gap-2 font-sans"
            >
              Get Directions →
            </a>
          </div>

          {/* Hours Column */}
          <div>
            <h3 className="font-serif text-2xl mb-4 uppercase tracking-wide">Hours</h3>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Mon-Thu</span>
                <span>11:30 am - 10:30 pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Friday</span>
                <span>11:30 am - 11:30 pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Saturday</span>
                <span>10:00 am - 11:30 pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Sunday</span>
                <span>10:00 am - 10:30 pm</span>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-serif text-2xl mb-4 uppercase tracking-wide">Contact</h3>
            <div className="space-y-3 text-lg">
              <a href="tel:7038880032" className="block hover:text-warm-gold transition-colors">
                (703) 888-0032
              </a>
              <a
                href="mailto:northside10va@gmail.com"
                className="block hover:text-warm-gold transition-colors uppercase"
              >
                northside10va@gmail.com
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.facebook.com/northside10delray"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-crimson-red hover:bg-warm-gold transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/northside10va/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-crimson-red hover:bg-warm-gold transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-dark-grey">
          <Button
            asChild
            variant="default"
            className="bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans uppercase tracking-wide px-8 py-6 text-base transition-colors"
          >
            <a href="https://order.toasttab.com/online/northside10" target="_blank" rel="noopener noreferrer">
              Order Now →
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-soft-white text-soft-white hover:bg-warm-gold hover:text-charcoal font-sans uppercase tracking-wide px-8 py-6 text-base bg-transparent transition-colors"
          >
            <a
              href="https://www.opentable.com/r/northside-10-alexandria"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reservations →
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
