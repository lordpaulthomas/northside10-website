import type React from "react"
import type { Metadata } from "next"
import { Bodoni_Moda, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Northside 10 - Restaurant | Southern Comfort Food & Drinks",
  description:
    "Your laid-back local spot serving bold, Southern-inspired comfort food with cold drinks and warm hospitality. Join us for brunch, lunch, and dinner in a relaxed atmosphere.",
  keywords: [
    "restaurant",
    "Southern food",
    "comfort food",
    "brunch",
    "lunch",
    "dinner",
    "local restaurant",
    "Northside 10",
    "Virginia restaurant",
    "American cuisine",
  ],
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/northside_logo-q7D9Tes6yyOKDZwoDzIVvgqTIXQ2In.png",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${bodoniModa.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
