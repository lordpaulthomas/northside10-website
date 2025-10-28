"use client"

import { DailySpecialsDisplay } from "@/components/daily-specials-display"

export default function DailySpecialsPage() {
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="bg-charcoal text-soft-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-soft-white mb-4">
            Daily Specials
          </h1>
          <p className="text-lg md:text-xl text-soft-white/80 max-w-2xl mx-auto">
            Check back daily for our latest lunch and dinner specials, 
            updated fresh by our chef each morning and afternoon.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Lunch Specials Section */}
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
                  Today's Lunch Special
                </h2>
                <div className="w-24 h-1 bg-crimson-red mx-auto"></div>
              </div>
              <DailySpecialsDisplay type="lunch" />
            </section>

            {/* Dinner Specials Section */}
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
                  Tonight's Dinner Special
                </h2>
                <div className="w-24 h-1 bg-crimson-red mx-auto"></div>
              </div>
              <DailySpecialsDisplay type="dinner" />
            </section>

            {/* Info Section */}
            <section className="bg-light-grey/30 rounded-lg p-8 text-center">
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                About Our Daily Specials
              </h3>
              <p className="text-charcoal/70 leading-relaxed max-w-2xl mx-auto mb-6">
                Our chef creates fresh specials daily using seasonal ingredients and local favorites. 
                Lunch specials are updated each morning, and dinner specials are refreshed each afternoon. 
                Follow us on social media for the latest updates!
              </p>
              
              {/* API Status */}
              <div className="bg-soft-white rounded-lg p-4 border border-light-grey">
                <h4 className="font-semibold text-charcoal mb-2">Live Data Status</h4>
                <p className="text-sm text-charcoal/60 mb-3">
                  Specials are automatically updated from our ToastTab system
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="/api/toast/specials" 
                    target="_blank" 
                    className="text-crimson-red hover:underline text-sm"
                  >
                    View Raw Data
                  </a>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="text-crimson-red hover:underline text-sm"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
