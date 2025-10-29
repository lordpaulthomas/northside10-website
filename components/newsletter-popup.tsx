"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

type PopupState = "hidden" | "full" | "minimized" | "dismissed"

export function NewsletterPopup() {
  const [popupState, setPopupState] = useState<PopupState>("hidden")

  useEffect(() => {
    // Show popup after 5 seconds on the page
    const timer = setTimeout(() => {
      setPopupState("full")
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleMinimize = () => {
    setPopupState("minimized")
  }

  const handleDismiss = () => {
    setPopupState("dismissed")
  }

  const handleReopen = () => {
    setPopupState("full")
  }

  if (popupState === "dismissed") return null

  // Minimized banner at bottom
  if (popupState === "minimized") {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="bg-soft-white rounded-lg shadow-xl border-2 border-charcoal/10 p-4 max-w-sm flex items-center gap-3">
          <Image
            src="/images/northside-logo-red.png"
            alt="Northside 10"
            width={40}
            height={40}
            className="w-10 h-10 shrink-0"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-charcoal">Stay Updated!</p>
            <button
              onClick={handleReopen}
              className="text-xs text-crimson-red hover:underline"
            >
              Subscribe to our newsletter
            </button>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-charcoal/60 hover:text-charcoal transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  // Full popup
  if (popupState === "full") {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
          onClick={handleMinimize}
        />

        {/* Popup */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div
            className="bg-soft-white rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleMinimize}
              className="absolute top-4 right-4 p-2 text-charcoal/60 hover:text-charcoal transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/northside-logo-red.png"
                  alt="Northside 10"
                  width={200}
                  height={200}
                  className="w-40 h-40 transform scale-110"
                />
              </div>

              {/* Toast Tab Email Marketing Form */}
              <div>
                {/* Toast Tab Embedded Form */}
                <div className="mb-4">
                  <iframe
                    src="https://www.toasttab.com/northside10/marketing-signup"
                    className="w-full border-0 rounded"
                    title="Newsletter Signup"
                    style={{ minHeight: "400px", height: "400px" }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleMinimize}
                  className="w-full text-charcoal/60 text-sm hover:text-charcoal transition-colors"
                >
                  No thanks, maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return null
}

