import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomeDinnersSection } from "@/components/home-dinners-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HomeDinnersSection />
      <Footer />
    </main>
  )
}
