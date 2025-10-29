import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/risotto_2-cMaVwZ4qKmVdsFbXTaEKv70aiLNDAm.jpg",
    alt: "Glazed salmon with risotto and vegetables",
    title: "Glazed Salmon",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pastrami-LPXBF5PubJ5xHMdPLcQYRrVpDyQpKi.jpg",
    alt: "Classic pastrami sandwich",
    title: "Pastrami Sandwich",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bread_pudding-dsaouX7mPU1E9BLnsezuMEPDbTPBAZ.jpg",
    alt: "Bread pudding with vanilla ice cream",
    title: "Bread Pudding",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fritters-QjfFVcUCtkhxX6KfosbCCSY0daGoDG.jpg",
    alt: "Fried cheese fritters with marinara",
    title: "Cheese Fritters",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grilled_chicken_sandwich-Ycehx9SMgEuXesvuV3czUA7FatJlHB.jpg",
    alt: "Grilled chicken sandwich",
    title: "Grilled Chicken Sandwich",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fried_chicken_sandwich_2-n977bgtzCfUgnJUqHwx1uZ4yuWTRiO.jpg",
    alt: "Fried chicken sandwich with cheese",
    title: "Chicken Sandwich Deluxe",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cobb_salad-mJDijC6rLwpag6qVusktR3lNCAuOtM.jpg",
    alt: "Cobb salad with fried chicken",
    title: "Cobb Salad",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/encrusted_fish_veggies_2-cg0MrylH1PuG2VlfdjRwKg3PTBln6t.jpg",
    alt: "Pecan-crusted fish with mashed potatoes",
    title: "Fish & Vegetables",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bloodymary-dcnrvZCyKeE966Dqk3DXXLaXdY20Hj.jpg",
    alt: "Bloody Mary cocktail",
    title: "Bloody Mary",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/strawberry_salad-WX7sOz8Gq3wZX1xmNBjQc3ebmKNlun.jpg",
    alt: "Grilled salmon on mixed greens with strawberries",
    title: "Strawberry Salmon Salad",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poutine-wMwnP6jMfuwtgepTHaBj2chC2sNw2q.jpg",
    alt: "Poutine with gravy, cheese curds, and braised meat",
    title: "Southern Poutine",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pretzel_bread_dip-GsDOWVpkehuerHtVOSyToqrrMIQueV.jpg",
    alt: "Soft pretzel bread with creamy cheese dip",
    title: "Pretzel & Cheese Dip",
  },
]

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-soft-white pt-[73px]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif text-charcoal mb-4">Our Gallery</h1>
            <p className="text-lg text-charcoal/80 font-sans max-w-2xl mx-auto">
              Explore our delicious Southern comfort food, craft cocktails, and signature dishes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg bg-dark-grey shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
