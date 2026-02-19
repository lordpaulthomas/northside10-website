# Sanity CMS Integration Plan – Northside 10

This document outlines a plan to use **Sanity** as the content source for menus and news so the restaurant and marketing team can add, edit, and remove content without code changes.

---

## 1. Current state (what we have today)

| Area | Current source | Notes |
|------|----------------|--------|
| **Menus page** | Toast API (live menus) + hardcoded Sweetheart tab | Tabs from Toast; one hardcoded “Sweetheart Menu”; filtering (exclude BAR, Cafe, (GH), etc.) in API. |
| **Daily specials** | Toast API | Lunch/dinner/brunch/raw bar/taco specials from Toast. |
| **Home page** | Hardcoded | Hero carousel (images + alt), “Welcome to The Northside” copy, single image. No news. |
| **Footer** | Hardcoded | Address, hours, phone, email, social links. |
| **Header** | Hardcoded | Logo, Order Now / Reservations URLs, nav links. |

---

## 2. Goals

- **Menus**: Fully controlled in Sanity – add/remove/edit menus, groups, and items (no more hardcoded Sweetheart; optional later: keep or drop Toast).
- **News**: New “News” section on the home page – latest posts from Sanity (title, date, excerpt, optional link/image).
- **Future**: Option to move hero, footer hours, or other copy to Sanity for full marketing control.

---

## 3. Sanity schema design

### 3.1 Menus (primary change)

**Option A – Sanity as sole menu source (recommended)**  
- One place for all website menus.  
- Marketing can create seasonal menus (Sweetheart, etc.) and regular ones (All Day, Brunch, etc.) without code.  
- No dependency on Toast for *website* display (Toast can stay for POS/online ordering).

**Option B – Hybrid**  
- Sanity: “Custom” or “promotional” menus (e.g. Sweetheart, Restaurant Week).  
- Toast: “Live” operational menus (All Day, Lunch Specials, etc.) as today.  
- More complexity (two sources, merge logic).

**Recommendation:** Start with **Option A**. If they later want “live” Toast menus on the site again, we can add a “Sync from Toast” import or a hybrid mode.

**Schema sketch – Sanity:**

- **`menu`** (document)
  - `title` (string) – e.g. “Sweetheart Menu”, “All Day”, “Brunch”
  - `slug` (slug) – for optional deep links, e.g. `sweetheart-menu`
  - `description` (optional text)
  - `order` (number) – sort order of tabs
  - `groups` (array of object)
    - `name` (string) – e.g. “Appetizers”, “Entrees”
    - `description` (optional text)
    - `items` (array of object)
      - `name` (string)
      - `description` (optional text)
      - `price` (number)
      - `outOfStock` (boolean, optional)

- **Promo/deal block (optional)**  
  - For menus like Sweetheart: optional “deal” object (e.g. “Two Hearts, One Bottle”, price, description).  
  - Or a simple “custom block” field (portable text) for one-off content.

### 3.2 News (new)

- **`newsItem`** (document)
  - `title` (string)
  - `slug` (slug) – e.g. for `/news/valentines-special`
  - `date` (date)
  - `excerpt` (text) – short summary for cards
  - `body` (optional portable text) – if you add a news detail page later
  - `link` (optional URL) – “Read more” external or internal
  - `image` (optional image) – card image
  - `published` (boolean) – draft vs live

Home page will show the **latest N news items** (e.g. 3–5) as a new “News” or “Latest News” section.

---

## 4. Technical implementation plan

### Phase 1 – Sanity project and schemas

1. **Create Sanity project** (or use existing)
   - `npx create-next-app` with Sanity or separate Sanity repo; or add `@sanity/client` / `next-sanity` to this repo.
2. **Define schemas** in Sanity Studio:
   - `menu` (with groups and items as above)
   - `newsItem`
   - (Optional) singleton “Site settings” for hero, footer, etc. later.
3. **Deploy Sanity Studio** (e.g. studio.northside10.com or embedded path).
4. **Content**: Create initial “Sweetheart Menu” and a couple of news items for testing.

### Phase 2 – Next.js + Sanity client

1. **Install** `next-sanity`, `@sanity/image-url`, `@sanity/vision` (optional).
2. **Env**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (e.g. `production`).
3. **Lib**: `lib/sanity.ts` (or `sanity.client.ts`) – create client, optional `fetcher` with `revalidate` for ISR.
4. **GROQ queries**:
   - Menus: all menus, ordered by `order` (and optionally filter by a “published” flag if you add one).
   - News: latest N `newsItem`s where `published == true`, ordered by `date desc`.

### Phase 3 – Menus page driven by Sanity

1. **Data**: Fetch menus from Sanity (e.g. in `app/menus/page.tsx` or a server component that passes data to `MenusContent`).
2. **UI**: Update `components/menus-content.tsx`:
   - Remove (or gate behind env) Toast fetch for *tabs* and menu content.
   - Render tabs from Sanity menus; each tab content = one Sanity menu (groups + items).
   - Reuse existing styling (single-column centering, Fresh Pick copy, etc.).
3. **Sweetheart**: Becomes a normal Sanity menu (no hardcoded tab or content).
4. **Toast**: Either remove from menus page or keep only for “Order now” / daily specials links; daily specials page can stay on Toast if desired.

### Phase 4 – News section on home page

1. **Data**: Fetch latest 3–5 news items from Sanity in `app/page.tsx` (or a server component).
2. **Component**: New `components/home-news-section.tsx`:
   - Section title (e.g. “Latest News” or “What’s New”).
   - List/cards: title, date, excerpt, optional image, optional “Read more” link.
3. **Placement**: Between existing hero/dinners content and footer (or where you prefer).

### Phase 5 – (Optional) future content in Sanity

- **Hero**: Documents for “hero slides” (image, alt, optional caption/link).
- **Footer**: Hours, contact, or “site settings” singleton.
- **Daily specials**: If you ever want to override or supplement Toast with Sanity copy.

---

## 5. What stays vs what changes

| Item | After Sanity (recommended) |
|------|----------------------------|
| Menus (tabs + content) | 100% from Sanity; add/remove/edit in Studio. |
| Sweetheart Menu | Content moved into Sanity as a `menu` document. |
| Toast API | No longer used for menus page; can keep for daily specials or “Order now” only. |
| Home – hero / welcome | Unchanged initially; optional later in Sanity. |
| Home – news | New section; data from Sanity. |
| Footer / header | Unchanged initially; optional later in Sanity. |

---

## 6. Suggested order of work

1. **Sanity setup + schema** (menus + news) and initial content.
2. **Next.js client + GROQ** for menus and news.
3. **Menus page**: Switch to Sanity; remove hardcoded Sweetheart and Toast-based menu tabs.
4. **Home page**: Add news section using Sanity data.
5. **Documentation**: Update README or FORMS_SETUP-style doc with Sanity env vars and how to add a new menu or news item.

---

## 7. Environment variables (to add)

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
# Optional if you use a separate Studio URL:
# NEXT_PUBLIC_SANITY_STUDIO_URL=https://studio.thenorthside10.com
```

---

## 8. Summary

- **Menus**: Controlled entirely in Sanity; marketing can add/remove/edit menus (including Sweetheart) without code.
- **News**: New home page section fed by Sanity `newsItem` documents.
- **Toast**: Dropped from menus page; can remain for daily specials or ordering links if you want.
- Implementation order: Sanity project + schemas → Next.js client + queries → menus page → news section → optional hero/footer later.

If you want to proceed, the next concrete step is **Phase 1** (Sanity project + schema definitions) and **Phase 2** (client + GROQ) in this repo, then we swap the menus page to Sanity and add the news section.
