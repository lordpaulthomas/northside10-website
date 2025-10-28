"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const heroImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/risotto-vvOqYdXaSER6kY4TW0E3b1y2fNUOnO.jpg",
    alt: "Shrimp and risotto with crispy onions",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pastrami-LPXBF5PubJ5xHMdPLcQYRrVpDyQpKi.jpg",
    alt: "Classic pastrami sandwich",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bread_pudding-dsaouX7mPU1E9BLnsezuMEPDbTPBAZ.jpg",
    alt: "Bread pudding with vanilla ice cream",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fritters-QjfFVcUCtkhxX6KfosbCCSY0daGoDG.jpg",
    alt: "Fried cheese fritters with marinara",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grilled_chicken_sandwich-Ycehx9SMgEuXesvuV3czUA7FatJlHB.jpg",
    alt: "Grilled chicken sandwich",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fried_chicken_sandwich-36myjIvfz9cRFe1WTy1lCUIRQmh79e.jpg",
    alt: "Fried chicken sandwich with fries",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cobb_salad-mJDijC6rLwpag6qVusktR3lNCAuOtM.jpg",
    alt: "Cobb salad with fried chicken",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/encrusted_fish_veggies_1-ULejLwN44BHPQz3gsxsqiPcMvIuDcg.jpg",
    alt: "Pecan-crusted fish with vegetables",
  },
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] mt-[73px]">
      {heroImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage ? "bg-soft-white w-8" : "bg-soft-white/50 hover:bg-soft-white/75"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
