import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenusContent } from "@/components/menus-content"

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
