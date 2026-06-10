import QRCode from "qrcode"
import { SITE_URL } from "@/lib/stripe"

export const dynamic = "force-dynamic"

const SESSION_ID_PATTERN = /^cs_(test|live)_[a-zA-Z0-9]+$/

/**
 * Renders the check-in QR code for a ticket order.
 * Only encodes our own check-in URLs (keyed by Checkout Session id) so this
 * can't be abused as an open QR generator.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticketId = searchParams.get("t") ?? ""

  if (!SESSION_ID_PATTERN.test(ticketId)) {
    return new Response("Not found", { status: 404 })
  }

  const checkinUrl = `${SITE_URL}/staff/checkin/${ticketId}`
  const png = await QRCode.toBuffer(checkinUrl, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#0B0B0B", light: "#FFFFFF" },
  })

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  })
}
