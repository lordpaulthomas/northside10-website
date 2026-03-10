import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomeDinnersSection } from "@/components/home-dinners-section"
import { CoffeeClubBanner } from "@/components/coffee-club-banner"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[108px] md:pt-[122px]">
        <CoffeeClubBanner />
        <HeroSection />
      </div>
      <HomeDinnersSection />
      <Footer />
    </main>
  )
}
