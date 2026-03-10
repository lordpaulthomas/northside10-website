"use client"

import Image from "next/image"
import { Coffee, Percent, IceCream, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

const SIGNUP_URL = "https://buy.stripe.com/14A8wIbcLenQ9eP4xb0ZW00"

const PERKS = [
  {
    icon: Coffee,
    title: "Unlimited Drip Coffee",
    description: "Hot, iced, whatever you're feeling. Every single day.",
  },
  {
    icon: Percent,
    title: "10% Off Menu Items",
    description: "Everything on the Sweetside menu. No exceptions.",
  },
  {
    icon: IceCream,
    title: "Free Birthday Ice Cream",
    description: "Your birthday, your scoop. On us.",
  },
  {
    icon: Gift,
    title: "Limited Edition Mug",
    description: "Only for the first 50 members. Once they're gone, they're gone.",
  },
]

export function CoffeeClubContent() {
  return (
    <div className="bg-soft-white">
      {/* Hero */}
      <div className="relative bg-charcoal text-soft-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <Coffee className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]" strokeWidth={0.5} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Image
            src="/sweetside-logo.svg"
            alt="Sweetside Cafe"
            width={200}
            height={80}
            className="mx-auto mb-6 h-24 md:h-32 w-auto transform scale-125"
          />
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.25em] text-warm-gold mb-4">
            Sweetside Cafe Presents
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4">VIP Coffee Club</h1>
          <div className="h-1 w-24 bg-brick-red mx-auto my-6" />
          <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto text-soft-white/80">
            Twenty bucks a month. Unlimited drip coffee. Plus some extras we think you&apos;ll really like.
          </p>
        </div>
      </div>

      {/* Price Callout */}
      <div className="bg-warm-gray py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-soft-white border-2 border-brick-red rounded-2xl px-10 py-8 shadow-lg">
            <p className="font-sans text-sm uppercase tracking-widest text-charcoal/60 mb-2">Monthly Membership</p>
            <p className="font-serif text-6xl md:text-7xl text-brick-red font-bold">$20</p>
            <p className="font-sans text-charcoal/70 mt-2">per month &middot; cancel anytime</p>
          </div>
        </div>
      </div>

      {/* Perks */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
          Here&apos;s the Deal
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="text-center p-6 rounded-xl border-2 border-light-grey bg-soft-white hover:border-brick-red transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-brick-red/10 flex items-center justify-center mx-auto mb-4">
                <perk.icon className="w-7 h-7 text-brick-red" />
              </div>
              <h3 className="font-sans font-bold text-lg text-charcoal mb-2">{perk.title}</h3>
              <p className="font-sans text-sm text-charcoal/70">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="bg-charcoal py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-soft-white mb-4">
              Sound Good?
            </h2>
            <p className="font-sans text-soft-white/70 mb-10">
              Sign up online right here, or scan the QR code next time you&apos;re at the cafe. Takes about a minute.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans uppercase tracking-wide px-12 py-6 text-lg transition-colors font-semibold"
            >
              <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Join the Coffee Club &rarr;
              </a>
            </Button>

            <p className="font-sans text-soft-white/50 text-xs mt-6">
              Secure checkout powered by Stripe. Cancel anytime from your account.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="w-12 h-12 rounded-full bg-brick-red text-soft-white font-sans font-bold text-xl flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="font-sans font-bold text-lg text-charcoal mb-2">Sign Up</h3>
            <p className="font-sans text-sm text-charcoal/70">
              Hit the join button above or scan the QR code at the cafe. Payment is handled securely through Stripe.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-brick-red text-soft-white font-sans font-bold text-xl flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="font-sans font-bold text-lg text-charcoal mb-2">Pick Up Your Card</h3>
            <p className="font-sans text-sm text-charcoal/70">
              Show your receipt at the register and we&apos;ll hand you a membership card on the spot.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-brick-red text-soft-white font-sans font-bold text-xl flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="font-sans font-bold text-lg text-charcoal mb-2">That&apos;s It</h3>
            <p className="font-sans text-sm text-charcoal/70">
              Flash your card when you come in. Unlimited drip coffee, 10% off the menu, and free ice cream on your birthday. Every month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
