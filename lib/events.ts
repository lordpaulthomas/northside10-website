export interface EventAddOn {
  id: string
  name: string
  description: string
  priceCents: number
  /** Max add-on units per ticket in a single order */
  maxPerTicket: number
}

export interface SiteEvent {
  slug: string
  title: string
  subtitle: string
  description: string
  /** Display strings */
  dateLabel: string
  timeLabel: string
  /** ISO timestamps (America/New_York offsets baked in) */
  startsAt: string
  endsAt: string
  ticketName: string
  ticketDescription: string
  priceCents: number
  capacity: number
  maxPerOrder: number
  addOn?: EventAddOn
  flyerImage: string
  flyerAlt: string
  highlights: string[]
  includes: string[]
}

export const EVENTS: SiteEvent[] = [
  {
    slug: "kegs-and-legs",
    title: "Kegs & Legs",
    subtitle: "Featuring Bell's Two Hearted & Bell's Oberon",
    description:
      "Your neighborhood spot. Good people, cold drinks, big moments. Join us for a $45 all-in seafood boil featuring Bell's Two Hearted Ale and Bell's Oberon on draft, with live music from Rook Richards. Limited seating — get your tickets before they're gone.",
    dateLabel: "Saturday, June 20th",
    timeLabel: "1:00 PM – 5:00 PM",
    startsAt: "2026-06-20T13:00:00-04:00",
    endsAt: "2026-06-20T17:00:00-04:00",
    ticketName: "Kegs & Legs — Seafood Boil Ticket",
    ticketDescription:
      "Admits one. Includes the full seafood boil: shrimp, corn, sausage, potatoes & crab legs. Sat June 20, 1–5 PM at Northside 10.",
    priceCents: 4500,
    capacity: 50,
    maxPerOrder: 8,
    addOn: {
      id: "crab-cluster",
      name: "Extra Crab Leg Cluster",
      description: "Add an extra crab leg cluster to your boil.",
      priceCents: 1000,
      maxPerTicket: 3,
    },
    flyerImage: "/images/events/kegs-and-legs-flyer.png",
    flyerAlt:
      "Kegs and Legs event flyer — $45 seafood boil featuring Bell's Two Hearted and Bell's Oberon, Saturday June 20th, 1–5 PM at Northside 10",
    highlights: [
      "Live music with Rook Richards, 12–3 PM",
      "Bell's Two Hearted & Bell's Oberon on draft",
      "Limited seating — ticket required",
    ],
    includes: ["Shrimp", "Corn", "Sausage", "Potatoes", "Crab Legs"],
  },
]

export function getEvent(slug: string): SiteEvent | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

export function isEventOver(event: SiteEvent): boolean {
  return Date.now() > new Date(event.endsAt).getTime()
}

export function formatPrice(cents: number): string {
  return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`
}
