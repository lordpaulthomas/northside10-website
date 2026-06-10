import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenusContent } from "@/components/menus-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu | Southern Comfort Food in Alexandria VA",
  description:
    "Browse the Northside 10 menu featuring Southern comfort food, daily specials, weekend brunch, craft cocktails, and more. Located in Del Ray, Alexandria, Virginia.",
  openGraph: {
    title: "Menu | Northside 10 - Southern Comfort Food in Alexandria VA",
    description:
      "Browse the Northside 10 menu featuring Southern comfort food, daily specials, weekend brunch, craft cocktails, and more.",
  },
}

export default function MenusPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        <MenusContent />
      </div>
      <Footer />
    </main>
  )
}
