import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    console.log("🔔 [API] Newsletter signup request received for:", email)

    // Validate email
    if (!email || !email.includes("@")) {
      console.error("❌ [API] Invalid email format")
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const clientId = process.env.TOAST_CLIENT_ID
    const clientSecret = process.env.TOAST_CLIENT_SECRET
    const restaurantGuid = process.env.TOAST_RESTAURANT_GUID

    console.log("🔑 [API] Checking Toast credentials...")
    console.log("  - Client ID:", clientId ? "✓ Present" : "✗ Missing")
    console.log("  - Client Secret:", clientSecret ? "✓ Present" : "✗ Missing")
    console.log("  - Restaurant GUID:", restaurantGuid ? `✓ ${restaurantGuid}` : "✗ Missing")

    if (!clientId || !clientSecret || !restaurantGuid) {
      console.error("❌ [API] Toast API credentials not configured")
      return NextResponse.json({ error: "Service configuration error" }, { status: 500 })
    }

    // Get Toast API access token
    console.log("🔐 [API] Authenticating with Toast Tab...")
    const tokenResponse = await fetch("https://ws-api.toasttab.com/authentication/v1/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        userAccessType: "TOAST_MACHINE_CLIENT",
      }),
    })

    console.log("🔐 [API] Toast auth response status:", tokenResponse.status)

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("❌ [API] Toast authentication failed:", errorText)
      return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
    }

    const { token } = await tokenResponse.json()
    console.log("✅ [API] Toast authentication successful!")

    // Subscribe to Toast Tab email marketing
    // Note: Toast Tab's marketing API endpoint - you may need to adjust this based on their actual API
    console.log("📬 [API] Attempting to subscribe email to Toast marketing...")
    const subscribeResponse = await fetch(
      `https://ws-api.toasttab.com/customers/v1/customers/marketing/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
          "Toast-Restaurant-External-ID": restaurantGuid,
        },
        body: JSON.stringify({
          email,
          emailMarketingOptIn: true,
          source: "WEBSITE",
        }),
      }
    )

    console.log("📬 [API] Marketing subscribe response status:", subscribeResponse.status)

    if (!subscribeResponse.ok) {
      const errorText = await subscribeResponse.text()
      console.error("⚠️ [API] Toast marketing subscription failed:", errorText)
      console.log("🔄 [API] Trying alternative method: Creating customer with marketing opt-in...")
      
      // If the specific marketing endpoint doesn't exist, try creating a customer with marketing opt-in
      console.log("👤 [API] Creating customer with email:", email)
      const customerResponse = await fetch(`https://ws-api.toasttab.com/customers/v1/${restaurantGuid}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
          "Toast-Restaurant-External-ID": restaurantGuid,
        },
        body: JSON.stringify({
          email,
          optInToMarketingEmails: true,
          source: "WEBSITE",
        }),
      })

      console.log("👤 [API] Customer creation response status:", customerResponse.status)

      if (!customerResponse.ok) {
        const customerError = await customerResponse.text()
        console.error("❌ [API] Toast customer creation failed:", customerError)
        
        // Check if it's a duplicate email error
        if (customerError.includes("already exists") || customerError.includes("duplicate")) {
          console.log("ℹ️ [API] Email already exists in system")
          return NextResponse.json({
            success: true,
            message: "You're already subscribed!",
          })
        }
        
        console.error("❌ [API] All subscription attempts failed")
        return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
      }

      const customerData = await customerResponse.json()
      console.log("✅ [API] Customer created successfully:", customerData)
      return NextResponse.json({
        success: true,
        message: "Successfully subscribed!",
        data: customerData,
      })
    }

    const subscribeData = await subscribeResponse.json()
    console.log("✅ [API] Marketing subscription successful:", subscribeData)
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
      data: subscribeData,
    })
  } catch (error) {
    console.error("❌ [API] Newsletter signup error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

