"use client"

import { Coffee, Percent, IceCream, Gift } from "lucide-react"

const PERKS = [
  {
    icon: Coffee,
    title: "Unlimited Drip Coffee",
    description: "Hot or cold — every single day.",
  },
  {
    icon: Percent,
    title: "10% Off Menu Items",
    description: "Save on everything at Sweetside Cafe.",
  },
  {
    icon: IceCream,
    title: "Free Birthday Ice Cream",
    description: "Celebrate your birthday with a scoop on us.",
  },
  {
    icon: Gift,
    title: "Limited Edition Mug",
    description: "First 50 members receive a Sweetside Coffee Mug.",
  },
]

export function CoffeeClubContent() {
  return (
    <div className="bg-soft-white">
      {/* Hero */}
      <div className="relative bg-charcoal text-soft-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <Coffee className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]" strokeWidth={0.5} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.25em] text-warm-gold mb-4">
            Sweetside Cafe Presents
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4">VIP Coffee Club</h1>
          <div className="h-1 w-24 bg-brick-red mx-auto my-6" />
          <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto text-soft-white/80 mb-8">
            Unlimited coffee, exclusive perks, and a whole lot of love — all for one simple monthly price.
          </p>
          <div className="inline-block bg-warm-gold/20 border-2 border-warm-gold rounded-full px-8 py-3">
            <p className="font-sans text-warm-gold text-lg md:text-xl font-semibold uppercase tracking-widest">
              Coming Soon
            </p>
          </div>
        </div>
      </div>

      {/* Perks Preview */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-center mb-4">
          What You&apos;ll Get
        </h2>
        <p className="font-sans text-charcoal/60 text-center mb-12 max-w-lg mx-auto">
          We&apos;re putting the finishing touches on something special. Here&apos;s a sneak peek at your future perks.
        </p>
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

      {/* Coming Soon CTA */}
      <div className="bg-charcoal py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <div className="inline-block bg-soft-white border-2 border-brick-red rounded-2xl px-10 py-8 shadow-lg mb-8">
            <p className="font-sans text-sm uppercase tracking-widest text-charcoal/60 mb-2">Monthly Membership</p>
            <p className="font-serif text-6xl md:text-7xl text-brick-red font-bold">$20</p>
            <p className="font-sans text-charcoal/70 mt-2">per month &middot; cancel anytime</p>
          </div>
          <p className="font-sans text-soft-white/70 text-lg">
            Stay tuned — we&apos;ll announce the launch date soon. Ask your barista for details!
          </p>
        </div>
      </div>
    </div>
  )
}
