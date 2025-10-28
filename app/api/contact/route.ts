import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured")
      return NextResponse.json(
        { error: "Email service not configured. Please contact us at (703) 888-0032." },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get recipient emails (supports comma-separated list)
    const recipientEmails = process.env.CONTACT_EMAIL 
      ? process.env.CONTACT_EMAIL.split(',').map(e => e.trim())
      : ["your-email@example.com"]

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Northside 10 Website <onboarding@resend.dev>", // You'll change this to your domain later
      to: recipientEmails, // Sends to all emails in the list
      replyTo: email, // Customer's email for easy reply
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}

