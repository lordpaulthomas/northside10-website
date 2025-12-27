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

        {/* Popup - Scrollable container for small screens */}
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={handleMinimize}
        >
          {/* Centering wrapper with padding for safe areas */}
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
            <div
              className="bg-soft-white rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-300 relative my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Sticky at top */}
              <button
                onClick={handleMinimize}
                className="absolute top-2 right-2 p-2 text-charcoal/60 hover:text-charcoal transition-colors z-10 bg-soft-white/90 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-3 pt-12">
                {/* Toast Tab Email Marketing Form */}
                <div className="w-full">
                  <iframe
                    src="https://www.toasttab.com/northside10/marketing-signup"
                    className="w-full border-0 rounded"
                    title="Newsletter Signup"
                    style={{ 
                      height: "min(600px, calc(100vh - 180px))",
                      minHeight: "400px"
                    }}
                    scrolling="yes"
                  />
                </div>

                {/* Dismiss button */}
                <button
                  type="button"
                  onClick={handleMinimize}
                  className="w-full text-charcoal/60 text-sm hover:text-charcoal transition-colors py-3 mt-2"
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

