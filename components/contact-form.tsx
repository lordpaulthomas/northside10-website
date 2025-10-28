"use client"

import { useState } from "react"
import { submitContactForm } from "@/app/actions/contact"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus("success")
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-soft-white p-8 md:p-12 rounded-lg">
      <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-8 text-center" style={{ fontFamily: "cursive" }}>
        contact us!
      </h2>

      <form id="contact-form" action={handleSubmit} className="space-y-6">
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
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors"
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
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors"
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
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-charcoal font-sans font-semibold mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors"
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-charcoal font-sans font-semibold mb-2">
            Details/Message <span className="text-crimson-red">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Message"
            className="w-full px-4 py-3 border-2 border-charcoal bg-soft-white text-charcoal font-sans placeholder:text-charcoal/50 focus:outline-none focus:border-warm-gold transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-12 py-4 bg-charcoal text-soft-white font-sans font-semibold text-lg uppercase tracking-wide hover:bg-charcoal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <p className="text-green-600 font-sans text-center">Thank you! Your message has been sent successfully.</p>
        )}
        {submitStatus === "error" && (
          <p className="text-crimson-red font-sans text-center">
            Sorry, there was an error sending your message. Please try again or call us directly.
          </p>
        )}
      </form>
    </div>
  )
}
