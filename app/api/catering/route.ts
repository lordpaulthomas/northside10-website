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
    const { name, email, phone, eventDate, guestCount, eventType, message } = body

    // Validate required fields
    if (!name || !email || !phone || !eventDate || !guestCount) {
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
      from: "Northside 10 Catering <onboarding@resend.dev>",
      to: recipientEmails, // Sends to all emails in the list
      replyTo: email,
      subject: `New Catering Request from ${name} - ${eventDate}`,
      html: `
        <h2>New Catering Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Number of Guests:</strong> ${guestCount}</p>
        ${eventType ? `<p><strong>Event Type:</strong> ${eventType}</p>` : ""}
        ${message ? `<p><strong>Additional Details:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Catering form error:", error)
    return NextResponse.json(
      { error: "Failed to send catering request" },
      { status: 500 }
    )
  }
}

