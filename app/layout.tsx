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
  metadataBase: new URL("https://thenorthside10.com"),
  title: {
    default: "Northside 10 - Southern Comfort Food & Craft Cocktails",
    template: "%s | Northside 10",
  },
  description:
    "Experience bold Southern-inspired comfort food in a laid-back atmosphere. Daily specials, weekend brunch, craft cocktails, and warm hospitality. Dine-in or catering available.",
  keywords: [
    "Northside 10",
    "restaurant",
    "Southern food",
    "comfort food",
    "brunch",
    "daily specials",
    "craft cocktails",
    "catering",
    "Virginia restaurant",
    "American cuisine",
    "local restaurant",
    "weekend brunch",
  ],
  authors: [{ name: "Northside 10" }],
  creator: "Northside 10",
  publisher: "Northside 10",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/design-mode/northside_logo.png" },
      { url: "/images/northside-logo-red.png", type: "image/png" },
    ],
    apple: [{ url: "/images/design-mode/northside_logo.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thenorthside10.com",
    siteName: "Northside 10",
    title: "Northside 10 - Southern Comfort Food & Craft Cocktails",
    description:
      "Experience bold Southern-inspired comfort food in a laid-back atmosphere. Daily specials, weekend brunch, craft cocktails, and warm hospitality.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Northside 10 - Southern Comfort Food & Craft Cocktails",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northside 10 - Southern Comfort Food & Craft Cocktails",
    description:
      "Experience bold Southern-inspired comfort food in a laid-back atmosphere. Daily specials, weekend brunch, and craft cocktails.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification here later
    // google: "your-verification-code",
  },
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
