# Northside 10 — Agent Reference (AGENTS.md)

> Living reference doc for AI agents and developers. Read this first when picking the project back up.
> Last major update: June 2026.

## What this project is

The public website for **Northside 10**, a restaurant at 10 East Glebe Road, Alexandria, VA 22305, with a sub-brand cafe called **Sweetside Cafe**. Deployed on **Vercel** at **https://thenorthside10.com**.

- Phone: (703) 888-0032
- Online ordering / loyalty / gift cards: **Toast Tab** (`northside10`)
- Reservations: **OpenTable** (external link, no embed widget)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS **v4** (no `tailwind.config.js` — tokens live in `@theme inline` in `app/globals.css`) |
| UI kit | shadcn/ui ("new-york" style), 50+ components in `components/ui/` |
| Payments | Stripe (`stripe` server SDK + hosted Payment Links) |
| Email | Resend (contact form) |
| Forms | react-hook-form + zod; catering uses Formspree |
| Icons | lucide-react |
| Analytics | Google Analytics (`G-TPRER5ET1R`) + Vercel Analytics + inKind script (all in `app/layout.tsx`) |
| Database | **None.** No Supabase/Postgres/KV. Stripe is the only source of truth for member/payment data. |

Commands: `npm run dev`, `npm run build`, `npm run lint`. Note `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true` — type errors won't fail the build, so run lint/tsc yourself when making changes.

## Style guide (brand)

Source of truth: `style-guide.html` (visual reference) + `app/globals.css` (actual tokens).

### Colors

| Name | Hex | Usage |
|---|---|---|
| Crimson Red | `#B22222` | Primary CTAs, highlights (`--primary`, `bg-crimson-red`) |
| Charcoal | `#0B0B0B` | Headlines, text on light, dark sections |
| Dark Grey | `#2E2E2E` | Cards/accents (sparingly) |
| Soft White | `#F9F9F9` | Page background |
| Warm Gold | `#D4AF37` | Hover states, premium accents (`--accent`) |
| Light Grey | `#CCCCCC` | Dividers, borders |

### Typography

- **Headings (h1–h3):** Bodoni Moda (serif) — `--font-serif`. H1 48–56px, H2 32–40px, H3 24–28px.
- **Body/UI:** Montserrat — `--font-sans`. 16–18px body; Semi-Bold for small uppercase labels.
- Fonts loaded in `app/layout.tsx` via `next/font/google`.

### Gotchas

- Some components use `brick-red` / `warm-gray` Tailwind classes that are **not defined** in `@theme` (`coffee-club-content.tsx`, `menus-content.tsx`, giftcards/rewards pages). Prefer the defined tokens above for new work.
- `styles/globals.css` is a **legacy duplicate** — the active stylesheet is `app/globals.css` (imported by layout).
- Border radius token: `--radius: 0.625rem`.

## Routes

| Route | File | What it is |
|---|---|---|
| `/` | `app/page.tsx` | Home: hero carousel (Vercel Blob images), welcome section, Coffee Club banner |
| `/menus` | `app/menus/page.tsx` | Live menus pulled from Toast API |
| `/reservations` | `app/reservations/page.tsx` | Static; OpenTable external link + hours |
| `/catering` | `app/catering/page.tsx` | Static hero + Formspree form (`components/catering-form.tsx`) |
| `/contact` | `app/contact/page.tsx` | Contact form → `/api/contact` → Resend |
| `/coffee-club` | `app/coffee-club/page.tsx` | Sweetside VIP Coffee Club (see below) |
| `/rewards` | `app/rewards/page.tsx` | Toast rewards iframes |
| `/giftcards` | `app/giftcards/page.tsx` | Static + Toast external links |
| `/gallery` | `app/gallery/page.tsx` | Static grid, 12 images on Vercel Blob |
| `/daily-specials` | `app/daily-specials/page.tsx` | Toast specials; **orphan route** (no nav link, not in sitemap) |
| `/staff` | `app/staff/page.tsx` | PIN-protected staff dashboard (Coffee Club members); hidden from nav + sitemap |

### API routes

| Endpoint | File | Purpose |
|---|---|---|
| `POST /api/contact` | `app/api/contact/route.ts` | Contact form → Resend email |
| `POST /api/newsletter` | `app/api/newsletter/route.ts` | Toast marketing subscribe (**no frontend caller** — popup uses Toast iframe instead) |
| `GET /api/toast/menus` | `app/api/toast/menus/route.ts` | Live menus from Toast |
| `GET /api/toast/specials` | `app/api/toast/specials/route.ts` | Daily specials from Toast |
| `POST /api/staff/members` | `app/api/staff/members/route.ts` | PIN auth → list active Coffee Club Stripe subscriptions |

`app/actions/contact.ts` is a **legacy/unused** server action (console.log only).

## Coffee Club (the pattern to learn from)

The Sweetside VIP Coffee Club is a **$20/mo Stripe subscription** sold via a hardcoded **Stripe Payment Link**:

- CTA lives in `components/coffee-club-content.tsx` (`SIGNUP_URL = https://buy.stripe.com/14A8wIbcLenQ9eP4xb0ZW00`)
- **No webhooks, no database, no automated email.** Stripe hosts checkout; members show their receipt in person.
- Staff verification: `/staff` page → enter PIN → `POST /api/staff/members` validates `STAFF_PIN`, calls `stripe.subscriptions.list()` filtered by `STRIPE_DRIP_CLUB_PRICE_ID`, returns member list with `memberNumber` and `mugEligible` (first 50). In-memory rate limiting via a `Map`.
- Stripe API version pinned: `"2024-12-18.acacia"`.
- Homepage promo: `components/coffee-club-banner.tsx` (dismissible).

## Environment variables (names only — values in Vercel + `.env.local`)

| Var | Used by |
|---|---|
| `STRIPE_SECRET_KEY` | `app/api/staff/members/route.ts` |
| `STRIPE_DRIP_CLUB_PRICE_ID` | staff members route |
| `STAFF_PIN` | staff members route |
| `RESEND_API_KEY` | `app/api/contact/route.ts` |
| `CONTACT_EMAIL` | contact route |
| `TOAST_CLIENT_ID` / `TOAST_CLIENT_SECRET` / `TOAST_RESTAURANT_GUID` | Toast API routes |

## Key components (non-shadcn)

- `components/header.tsx` — fixed nav, Order Now (Toast), OpenTable link, mobile menu
- `components/footer.tsx` — location, hours, socials, CTAs
- `components/hero-section.tsx` — rotating hero images
- `components/menus-content.tsx` — tabbed menu UI fed by `/api/toast/menus`
- `components/newsletter-popup.tsx` — Toast marketing iframe popup
- `lib/toast-api.ts` — Toast types + fetch helpers
- `lib/utils.ts` — `cn()` helper
- `hooks/use-mobile.ts`, `hooks/use-toast.ts`

## SEO / deployment

- Sitemap: `app/sitemap.ts` (base `https://thenorthside10.com`; intentionally excludes `/staff` and `/daily-specials`)
- Root metadata + JSON-LD Restaurant schema: `app/layout.tsx`
- `public/robots.txt` allows all
- Most pages export per-page `metadata`
- No `vercel.json`; no README

## Other docs in repo

- `FORMS_SETUP.md` — Resend setup
- `TOASTTAB_SETUP.md` — Toast API credentials
- `DOMAIN_SETUP.md`, `SEO_SETUP_GUIDE.md`, `SEO_CHECKLIST.md`
- `docs/SANITY_INTEGRATION_PLAN.md` — future CMS idea (not implemented)
- `docs/toast-email-marketing-guide.md`
- `style-guide.html` — visual brand reference

## Conventions for new work

1. Server pages export `metadata`; interactive UI goes in a client component under `components/`.
2. Use shadcn/ui primitives + Tailwind utilities; use brand tokens (`crimson-red`, `charcoal`, `warm-gold`, etc.) from `app/globals.css`.
3. API routes follow the existing pattern: zod-ish validation inline, return `NextResponse.json`, read secrets from `process.env`.
4. Keep staff/admin routes out of nav and `app/sitemap.ts`; protect with `STAFF_PIN` pattern until real auth exists.
5. Stripe: secret key server-side only; pin the API version; prefer Checkout Sessions + webhooks for anything that needs fulfillment (see Events plan below).

## Event ticketing system — LIVE since June 10 2026 (first event: Kegs & Legs, June 20 2026)

> ⚠️ **Apex DNS issue (pre-existing, discovered at launch):** `thenorthside10.com` has a CNAME at the zone apex and **no A record** — it does not resolve on strict resolvers (8.8.8.8, 1.1.1.1). Only `www.thenorthside10.com` reliably works. All generated ticket links/QRs therefore use **www** (see `SITE_URL` in `lib/stripe.ts`). Proper fix: Vercel → Settings → Domains → follow the apex A-record instructions and replace the CNAME in Google Cloud DNS. Sitemap/JSON-LD still reference the apex and should be revisited after the DNS fix.

Self-hosted Eventbrite replacement. **No database — Stripe is the ticket store** (PaymentIntent metadata holds ticket state). One QR per order ("Admits N"), not per attendee.

### Architecture

```
Buyer → /events/[slug] → POST /api/events/checkout (capacity check) → Stripe Checkout
  → webhook checkout.session.completed → Resend email w/ QR + owner notification
  → /tickets/[sessionId] (guest ticket page, QR always available)
Door → staff scans QR with phone camera → /staff/checkin/[sessionId] (PIN) → mark redeemed
```

### Files

| File | Role |
|---|---|
| `lib/events.ts` | **Event definitions live here** (slug, price, capacity, maxPerOrder, add-on, flyer, dates). Add new events to the `EVENTS` array. |
| `lib/stripe.ts` | Stripe client (test key in dev), `TicketOrder` type, capacity counting, order lookup |
| `app/api/events/checkout/route.ts` | Creates Checkout Session; rejects when sold out / not enough left |
| `app/api/stripe/webhook/route.ts` | Verifies signature; on `checkout.session.completed` emails QR ticket (Resend) + owner notification; idempotent via `tickets_email_sent` PI metadata |
| `app/api/qr/route.ts` | PNG QR (`?t=cs_...` only — not an open generator). QR encodes `/staff/checkin/[sessionId]` |
| `app/api/staff/events/route.ts` | PIN-gated: `action: "orders" \| "lookup" \| "checkin"` |
| `app/tickets/[sessionId]/page.tsx` | Guest ticket page (noindex, dynamic) |
| `app/events/page.tsx` + `app/events/[slug]/page.tsx` | Public listing + detail/purchase (detail is force-dynamic for live capacity — do NOT add generateStaticParams) |
| `components/ticket-purchase.tsx` | Qty steppers, add-on, checkout redirect |
| `app/staff/checkin/[sessionId]/page.tsx` | Door scan flow: green CHECK IN → red ALREADY USED on rescan |
| `app/staff/events/page.tsx` | Orders dashboard (stats, search, manual check-in); linked from `/staff` |
| `components/event-banner.tsx` | Homepage promo; auto-hides after event ends |

### How ticket state lives in Stripe (no DB)

- Checkout Sessions and their PaymentIntents both carry metadata: `event_slug`, `ticket_qty`, `addon_qty`.
- Webhook adds to the PI: `session_id`, `tickets_email_sent`. Check-in adds `checked_in_at`.
- **Sold count** = PaymentIntent **Search** on `metadata['event_slug'] AND status:'succeeded'` (eventually consistent, ~1 min lag — staff dashboard note covers this; QR scans are instant since they hit the session directly).
- **Holds** = open Checkout Sessions (30-min expiry) count against capacity to prevent overselling the last seats.
- PIN gate reuses `STAFF_PIN`; staff pages cache the PIN in `sessionStorage` (`ns10_staff_pin`).

### Known limitations (acceptable for v1, fix if events scale)

- **Refunds don't free capacity** and a refunded ticket's QR still scans as valid (PI stays `succeeded`). Workaround: after refunding in Stripe, edit the PI metadata `event_slug` to `archived` — removes it from counts and the ticket 404s.
- Search-lag oversell window of ~1 min at the capacity boundary (mitigated by holds counting).
- If events become recurring/bigger, migrate ticket state to a real DB (Vercel Postgres/Supabase).

### Env vars (added for ticketing)

| Var | Where | Purpose |
|---|---|---|
| `STRIPE_WEBHOOK_SECRET` | Vercel + `.env.local` | Webhook signature verification (live secret differs from `stripe listen` local secret) |
| `STRIPE_TEST_SECRET_KEY` | `.env.local` only | Used automatically by `lib/stripe.ts` when `NODE_ENV !== "production"` |
| `TICKETS_FROM_EMAIL` | `.env.local` only (optional) | Override from-address for local email tests (prod default: `Northside 10 <contact@thenorthside10.com>`) |

⚠️ The `RESEND_API_KEY` in local `.env.local` belongs to the **lachainedc.com** Resend account and cannot send from thenorthside10.com. Production must use the Northside Resend key (the one already in Vercel powering the contact form).

### Local testing recipe

```bash
npm run dev                                  # uses STRIPE_TEST_SECRET_KEY automatically
stripe listen --api-key $STRIPE_TEST_SECRET_KEY --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed --api-key $STRIPE_TEST_SECRET_KEY \
  --add checkout_session:metadata.event_slug=kegs-and-legs \
  --add checkout_session:metadata.ticket_qty=2 --add checkout_session:metadata.addon_qty=1
```

Test cards: `4242 4242 4242 4242`. Note the Stripe CLI on this machine is logged into a *different* account (lachainedc) — always pass `--api-key`.

### Launch verification (June 10 2026)

Full production dress rehearsal completed with a real purchase: live checkout, branded email from contact@thenorthside10.com, phone QR scan, check-in, double-scan rejection, then refund + archive. Notes:

- Live webhook endpoint: `we_1Tgqsr4CKdpJWVJBrVY7tCGW` → `https://www.thenorthside10.com/api/stripe/webhook` (must stay on **www**, see DNS warning above).
- Owner sale notifications go to the `CONTACT_EMAIL` list in Vercel (same list as the contact form).
- PaymentIntents get a friendly description ("Kegs & Legs: 2 tickets + 1 extra crab leg cluster") for the Stripe dashboard.
- Refund procedure: refund in Stripe dashboard, then set the PI's metadata `event_slug` to `archived-test-order` (or any non-event value) to free the seat and kill the QR.
- Stripe Checkout branding (logo + colors) configured in Stripe dashboard Settings → Branding.
- Copy style: no em dashes in user-facing text.

### Adding the next event

1. Add an entry to `EVENTS` in `lib/events.ts` (new slug, price, capacity, dates, flyer in `public/images/events/`).
2. Add the `/events/[slug]` URL to `app/sitemap.ts`.
3. That's it — banner, listing, checkout, emails, check-in all key off the config.

### Planned: self-serve event creation via Sanity CMS

Goal: let the restaurant create and publish events themselves (no developer, no code change). Builds on the existing CMS idea in `docs/SANITY_INTEGRATION_PLAN.md` (drafted for menus/news, not yet implemented).

- **Sanity schema `event`** mirroring the `SiteEvent` interface in `lib/events.ts`: slug, title, subtitle, description, start/end datetimes, ticket name + price, capacity, maxPerOrder, optional add-on (name, price, maxPerTicket), flyer image, highlights, includes list. Validation rules on price/capacity so staff can't enter bad data.
- **Swap the data source, keep everything else**: replace the hardcoded `EVENTS` array with a Sanity fetch (`getEvent(slug)` / `listEvents()` become async queries). Checkout, webhook, QR, emails, check-in, and the staff dashboard all read from event config already, so none of that logic changes. Flyer images come from Sanity's CDN instead of `public/images/events/`.
- **Watch out for**: the webhook and checkout API must fetch the event server-side by slug (no client-trusted prices — already the case); sitemap should generate event URLs dynamically from Sanity; banner auto-hide logic keys off `endsAt`; consider draft/published state so staff can stage an event before sales open (a `salesOpenAt` field would also allow scheduled on-sale times).
- **Studio access**: host Sanity Studio at `/studio` (or Sanity's hosted studio) with logins for restaurant managers.
- Rough effort: a focused session (schema + data-layer swap + studio setup + retest of checkout/webhook path in test mode).
