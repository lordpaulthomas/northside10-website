import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CoffeeClubContent } from "@/components/coffee-club-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VIP Coffee Club | Sweetside Cafe",
  description:
    "Join the Sweetside Cafe VIP Coffee Club — $20/month for unlimited drip coffee, 10% off all menu items, free birthday ice cream, and more.",
}

export default function CoffeeClubPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        <CoffeeClubContent />
      </div>
      <Footer />
    </main>
  )
}
