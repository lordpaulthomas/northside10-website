import Image from "next/image"

export function HomeDinnersSection() {
  return (
    <section className="py-16 md:py-24 bg-soft-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal text-balance">Welcome to The Northside</h2>

            <div className="space-y-4 text-charcoal leading-relaxed">
              <p>
                We're your laid-back local spot serving bold Southern comfort food made with fresh, high-quality
                ingredients. Our chef brings creativity to every plate, featuring seasonal dishes and weekly specials
                that keep things exciting.
              </p>

              <p>
                Grab a seat at the bar for craft cocktails, a great beer and wine selection, and plenty of TVs for
                catching the game. Whether you're here for brunch, lunch, or dinner, you'll always find good food, cold
                drinks, and warm hospitality.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/northside-brick-wall.png"
              alt="Northside 10 logo on brick wall"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
