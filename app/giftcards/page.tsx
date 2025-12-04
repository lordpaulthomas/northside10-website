import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Gift Cards",
  description:
    "Give the gift of great food! Purchase Northside 10 gift cards online and share the experience of Southern comfort food with friends and family.",
}

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        {/* Why Gift Cards Section */}
        <section className="py-16 bg-soft-white">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-4">Northside 10 Gift Cards</h2>
            <p className="text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
              Share the experience of Southern comfort food with friends and family
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-warm-gray rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-3">Perfect for Any Occasion</h3>
                <p className="text-charcoal/70">
                  Birthdays, holidays, thank you gifts, or just because. Give the gift of delicious Southern cuisine and craft cocktails.
                </p>
              </div>
              <div className="p-6 bg-warm-gray rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-3">Digital Delivery</h3>
                <p className="text-charcoal/70">
                  E-gift cards are delivered instantly via email, making them perfect for last-minute gifts or special surprises.
                </p>
              </div>
              <div className="p-6 bg-warm-gray rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-3">No Expiration</h3>
                <p className="text-charcoal/70">
                  Our gift cards never expire and can be used for dine-in, takeout, or online orders whenever the recipient is ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Purchase Gift Cards Section */}
        <section className="py-16 bg-warm-gray">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-8">
                Purchase Gift Cards
              </h2>
              <p className="text-center text-charcoal/70 mb-8">
                Buy an e-gift card and send it directly to your recipient
              </p>

              {/* Toast Tab Gift Card Purchase Link */}
              <div className="bg-soft-white rounded-lg shadow-xl p-8 md:p-12 border-2 border-charcoal/10 text-center">
                <p className="text-charcoal/70 mb-6">
                  Click the button below to purchase gift cards through our secure payment system
                </p>
                <a
                  href="https://www.toasttab.com/northside10/giftcards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-crimson-red text-soft-white font-serif text-xl px-8 py-4 rounded-lg hover:bg-warm-gold hover:text-charcoal transition-colors shadow-lg"
                >
                  Buy Gift Cards
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Check Balance Section */}
        <section className="py-16 bg-soft-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-8">
                Check Gift Card Balance
              </h2>
              <p className="text-center text-charcoal/70 mb-8">
                View your remaining gift card balance
              </p>

              {/* Toast Tab Gift Card Lookup Link */}
              <div className="bg-warm-gray rounded-lg shadow-xl p-8 md:p-12 border-2 border-charcoal/10 text-center">
                <p className="text-charcoal/70 mb-6">
                  Click the button below to check your gift card balance
                </p>
                <a
                  href="https://www.toasttab.com/northside10/findcard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-crimson-red text-soft-white font-serif text-xl px-8 py-4 rounded-lg hover:bg-warm-gold hover:text-charcoal transition-colors shadow-lg"
                >
                  Check Balance
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16 bg-warm-gray">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-12">How to Use Your Gift Card</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  1
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Receive</h3>
                <p className="text-charcoal/70 text-sm">Get your e-gift card via email or purchase a physical card</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  2
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Visit Us</h3>
                <p className="text-charcoal/70 text-sm">Come dine in, order takeout, or order online</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  3
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Redeem</h3>
                <p className="text-charcoal/70 text-sm">Present your gift card number at checkout or online</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  4
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Enjoy</h3>
                <p className="text-charcoal/70 text-sm">Savor delicious Southern cuisine on us!</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-soft-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-12">
                Gift Card Questions
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-warm-gray rounded-lg">
                  <h3 className="font-serif text-xl text-charcoal mb-2">Do gift cards expire?</h3>
                  <p className="text-charcoal/70">
                    No, Northside 10 gift cards never expire. Use them whenever you're ready to enjoy a great meal!
                  </p>
                </div>
                <div className="p-6 bg-warm-gray rounded-lg">
                  <h3 className="font-serif text-xl text-charcoal mb-2">Can I use my gift card online?</h3>
                  <p className="text-charcoal/70">
                    Yes! Gift cards can be used for dine-in, takeout, and online ordering.
                  </p>
                </div>
                <div className="p-6 bg-warm-gray rounded-lg">
                  <h3 className="font-serif text-xl text-charcoal mb-2">Can I reload my gift card?</h3>
                  <p className="text-charcoal/70">
                    Yes, you can add additional value to your existing gift card. Contact us for assistance or purchase a new card online.
                  </p>
                </div>
                <div className="p-6 bg-warm-gray rounded-lg">
                  <h3 className="font-serif text-xl text-charcoal mb-2">What if I lose my gift card?</h3>
                  <p className="text-charcoal/70">
                    If you have your gift card number, you can still use it. For e-gift cards, check your email for the original message. Contact us if you need help recovering a lost card.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

