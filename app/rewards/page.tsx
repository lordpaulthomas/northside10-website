import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export const metadata = {
  title: "Rewards Program",
  description:
    "Join the Northside 10 Rewards Program and earn points with every visit. Enjoy exclusive perks, special offers, and delicious rewards.",
}

export default function RewardsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        {/* Benefits Section */}
        <section className="py-16 bg-soft-white">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-4">Northside 10 Rewards</h2>
            <p className="text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
              Join our loyalty program and start earning points with every dollar you spend
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-warm-gray rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-3">Earn Points on Every Purchase</h3>
                <p className="text-charcoal/70">
                  Earn points for every dollar you spend when dining in, ordering online, or using our mobile app. Points are earned on pre-tax amounts and accumulate with every visit.
                </p>
              </div>
              <div className="p-6 bg-warm-gray rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-3">Automatic Point Tracking</h3>
                <p className="text-charcoal/70">
                  Link your credit card or use your phone number at checkout to automatically earn points. No need to remember a card or app every time you visit.
                </p>
              </div>
              <div className="p-6 bg-warm-gray rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-charcoal mb-3">Redeem for Rewards</h3>
                <p className="text-charcoal/70">
                  Use your accumulated points to redeem rewards on future orders. Access your rewards through our POS, online ordering, mobile app, or kiosk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Signup Section */}
        <section className="py-16 bg-soft-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-8">Sign Up for Rewards</h2>
              <p className="text-center text-charcoal/70 mb-8">
                Create your free account and start earning points with every purchase
              </p>

              {/* Toast Tab Rewards Form */}
              <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 border-2 border-charcoal/10">
                <iframe
                  src="https://www.toasttab.com/northside10/rewardsSignup"
                  className="w-full border-0 rounded"
                  title="Rewards Signup"
                  style={{ minHeight: "600px", height: "600px" }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* Check Balance Section */}
        <section className="py-16 bg-warm-gray">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-8">
                Check Your Rewards Balance
              </h2>
              <p className="text-center text-charcoal/70 mb-8">
                Already a member? View your points balance and available rewards
              </p>

              {/* Toast Tab Rewards Lookup Form */}
              <div className="bg-soft-white rounded-lg shadow-xl p-4 md:p-8 border-2 border-charcoal/10">
                <iframe
                  src="https://www.toasttab.com/northside10/rewards"
                  className="w-full border-0 rounded"
                  title="Rewards Lookup"
                  style={{ minHeight: "500px", height: "500px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-warm-gray">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center text-charcoal mb-12">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  1
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Sign Up</h3>
                <p className="text-charcoal/70 text-sm">Create your free rewards account and link your payment card</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  2
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Dine & Earn</h3>
                <p className="text-charcoal/70 text-sm">Pay with your linked card or provide your phone number to earn points automatically</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  3
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Track Points</h3>
                <p className="text-charcoal/70 text-sm">Points accumulate with every dollar spent across all ordering methods</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-red text-soft-white rounded-full font-serif text-2xl mb-4">
                  4
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-2">Redeem Rewards</h3>
                <p className="text-charcoal/70 text-sm">Use accumulated points for rewards on your next visit</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}

