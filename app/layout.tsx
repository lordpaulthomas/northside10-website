import type React from "react"
import type { Metadata } from "next"
import { Bodoni_Moda, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { NewsletterPopup } from "@/components/newsletter-popup"
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
    default: "Northside 10 - Alexandria VA Restaurant | Southern Comfort Food & Craft Cocktails",
    template: "%s | Northside 10",
  },
  description:
    "Northside 10 restaurant in Alexandria, VA - Experience bold Southern-inspired comfort food in a laid-back atmosphere. Daily specials, weekend brunch, craft cocktails, and warm hospitality. Located in the heart of Alexandria, Virginia. Dine-in or catering available.",
  keywords: [
    "Alexandria, VA",
    "Alexandria restaurant",
    "Alexandria dining",
    "Alexandria food",
    "Alexandria bars",
    "Alexandria nightlife",
    "Alexandria events",
    "Alexandria culture",
    "Northside 10",
    "Delray",
    "Virginia",
    "Virginia restaurant",
    "Virginia dining",
    "Virginia food",
    "Virginia bars",
    "Virginia nightlife",
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
      { url: "/images/northside-logo.001.png" },
      { url: "/images/northside-logo-red.png", type: "image/png" },
    ],
    apple: [{ url: "/images/northside-logo.001.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thenorthside10.com",
    siteName: "Northside 10",
    title: "Northside 10 - Alexandria VA Restaurant | Southern Comfort Food & Craft Cocktails",
    description:
      "Northside 10 restaurant in Alexandria, VA - Experience bold Southern-inspired comfort food in a laid-back atmosphere. Daily specials, weekend brunch, craft cocktails, and warm hospitality.",
    images: [
      {
        url: "/images/northside-logo-red.png",
        width: 1200,
        height: 630,
        alt: "Northside 10 - Southern Comfort Food & Craft Cocktails",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northside 10 - Alexandria VA Restaurant | Southern Comfort Food & Craft Cocktails",
    description:
      "Northside 10 restaurant in Alexandria, VA - Experience bold Southern-inspired comfort food in a laid-back atmosphere. Daily specials, weekend brunch, and craft cocktails.",
    images: ["/images/northside-logo-red.png"],
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
    google: "0_LcPR5U7xUKPSXYrUlrwom7LfyN8VWnfZIgEBjAa64",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K8GDH1WFR1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K8GDH1WFR1');
          `}
        </Script>
        
        {/* Structured Data - Restaurant Schema */}
        <Script id="restaurant-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Northside 10",
            "image": "https://thenorthside10.com/images/northside-logo-red.png",
            "url": "https://thenorthside10.com",
            "telephone": "+1-XXX-XXX-XXXX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "YOUR STREET ADDRESS",
              "addressLocality": "Alexandria",
              "addressRegion": "VA",
              "postalCode": "YOUR ZIP",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "YOUR_LATITUDE",
              "longitude": "YOUR_LONGITUDE"
            },
            "priceRange": "$$",
            "servesCuisine": ["American", "Southern", "Comfort Food"],
            "menu": "https://thenorthside10.com/menus",
            "acceptsReservations": "True",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "11:00",
                "closes": "22:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "10:00",
                "closes": "23:00"
              }
            ],
            "sameAs": [
              "YOUR_FACEBOOK_URL",
              "YOUR_INSTAGRAM_URL",
              "YOUR_TWITTER_URL"
            ]
          })}
        </Script>
      </head>
      <body className={`${montserrat.variable} ${bodoniModa.variable} font-sans antialiased`}>
        {children}
        <NewsletterPopup />
        <Analytics />
      </body>
    </html>
  )
}
