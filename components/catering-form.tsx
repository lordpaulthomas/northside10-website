"use client"

import { useState } from "react"

export default function CateringForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: `${formData.get("firstName")} ${formData.get("lastName") || ""}`.trim(),
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      eventDate: formData.get("eventDate") as string,
      guestCount: formData.get("guestCount") as string,
      eventType: formData.get("eventType") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        // Reset form safely
        setTimeout(() => {
          const form = e.currentTarget
          if (form) form.reset()
        }, 100)
      } else {
        console.error("API error:", result)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-soft-white p-8 md:p-12 rounded-lg shadow-xl">
      <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-2 text-center">Tell Us About Your Event</h2>
      <p className="text-center text-charcoal/70 font-sans mb-8">
        Fill out the form below and we'll get back to you shortly
      </p>

      <form id="catering-form" onSubmit={handleSubmit} className="space-y-6">
        {/* First Name and Last Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-charcoal font-sans font-semibold mb-2">
              First name <span className="text-crimson-red">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="First name"
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors rounded"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-charcoal font-sans font-semibold mb-2">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors rounded"
            />
          </div>
        </div>

        {/* Email and Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-charcoal font-sans font-semibold mb-2">
              Email <span className="text-crimson-red">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors rounded"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-charcoal font-sans font-semibold mb-2">
              Phone <span className="text-crimson-red">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Phone"
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors rounded"
            />
          </div>
        </div>

        {/* Event Date and Guest Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="eventDate" className="block text-charcoal font-sans font-semibold mb-2">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans focus:outline-none focus:border-warm-gold transition-colors rounded"
            />
          </div>
          <div>
            <label htmlFor="guestCount" className="block text-charcoal font-sans font-semibold mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              id="guestCount"
              name="guestCount"
              placeholder="Estimated guest count"
              min="1"
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors rounded"
            />
          </div>
        </div>

        {/* Event Details */}
        <div>
          <label htmlFor="message" className="block text-charcoal font-sans font-semibold mb-2">
            Event Details <span className="text-crimson-red">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Tell us about your event, preferred menu items, dietary restrictions, or any special requests..."
            className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors resize-none rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-4 bg-warm-gold text-charcoal font-sans font-bold text-lg uppercase tracking-wide hover:bg-warm-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border-2 border-green-500 rounded">
            <p className="text-green-700 font-sans font-semibold text-center">
              Thank you! We've received your catering inquiry and will contact you shortly.
            </p>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border-2 border-crimson-red rounded">
            <p className="text-crimson-red font-sans font-semibold text-center">
              Sorry, there was an error sending your inquiry. Please try again or call us directly at (703) 888-0032.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
