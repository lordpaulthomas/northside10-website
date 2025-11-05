# SEO Setup Guide for Northside 10

## Overview
This guide will help you get Northside 10 showing up in Google search results for queries like "Northside 10 Alexandria VA", "Alexandria restaurant", etc.

**Important:** SEO takes time! Even after completing all these steps, it can take 2-4 weeks for Google to fully index your site and 3-6 months to see significant ranking improvements.

---

## ✅ What We've Already Done (On Your Website)

- ✓ Optimized title tags with location keywords
- ✓ Meta descriptions with relevant keywords
- ✓ Open Graph and Twitter card tags
- ✓ Robots.txt allowing crawlers
- ✓ XML sitemap at /sitemap.xml
- ✓ Google Analytics tracking
- ✓ Added Restaurant Schema structured data (JSON-LD)

---

## 🚨 CRITICAL ACTIONS - Do These IMMEDIATELY

### 1. Set Up Google Search Console (15 minutes)

**Why:** This tells Google your site exists and lets you monitor its indexing status.

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Start now" and sign in with a Google account
3. Add your property: `https://thenorthside10.com`
4. Choose "HTML tag" verification method
5. Copy the verification code (looks like: `google-site-verification=abc123xyz...`)
6. Add it to your `app/layout.tsx` file at line 111-112:
   ```typescript
   verification: {
     google: "YOUR_VERIFICATION_CODE_HERE", // Replace with your actual code
   },
   ```
7. Deploy your changes
8. Go back to Search Console and click "Verify"
9. Once verified, submit your sitemap:
   - In Search Console, go to "Sitemaps" in the left menu
   - Enter: `sitemap.xml`
   - Click "Submit"

**Expected Result:** Within 1-2 weeks, you should see your pages appearing in the "Pages" report.

---

### 2. Set Up Google Business Profile (30 minutes)

**Why:** This is THE MOST IMPORTANT thing for local search. When people search "Northside 10 Alexandria VA", your Google Business listing will appear.

**Steps:**
1. Go to [Google Business Profile](https://www.google.com/business/)
2. Click "Manage now" and sign in
3. Search for "Northside 10" - if a listing exists, claim it. If not, create a new one.
4. Fill out ALL information completely:
   - **Business name:** Northside 10
   - **Category:** Restaurant, Bar, American Restaurant
   - **Address:** Your exact street address in Alexandria, VA
   - **Phone number:** Your main business phone
   - **Website:** https://thenorthside10.com
   - **Hours:** Your exact operating hours
5. Add your business description (750 characters max) - emphasize location:
   ```
   Northside 10 is Alexandria, VA's premier destination for Southern-inspired comfort food and craft cocktails. Located in the heart of Alexandria, we serve bold, flavorful dishes in a laid-back atmosphere. Join us for daily specials, weekend brunch, and warm hospitality. Reservations and catering available.
   ```
6. **Upload photos:** At least 10 high-quality photos of your:
   - Exterior (with visible signage)
   - Interior
   - Food dishes
   - Bar/drinks
   - Team members
7. **Verify your business:** Google will mail you a postcard with a verification code (takes 5-14 days)

**Expected Result:** Once verified, you'll appear in Google Maps and local search results within days.

---

### 3. Complete Restaurant Schema Data (10 minutes)

**Action Required:** Update the structured data I added to `app/layout.tsx` (lines 138-183) with your REAL information:

Replace these placeholders:
- `"telephone": "+1-XXX-XXX-XXXX"` → Your real phone number
- `"streetAddress": "YOUR STREET ADDRESS"` → Your real address
- `"postalCode": "YOUR ZIP"` → Your real ZIP code
- `"latitude": "YOUR_LATITUDE"` → Get from Google Maps (right-click your location)
- `"longitude": "YOUR_LONGITUDE"` → Get from Google Maps
- Update the opening hours to match your real hours
- `"sameAs"` → Add your actual social media URLs (Facebook, Instagram, etc.)

**To get coordinates:**
1. Go to Google Maps
2. Right-click on your restaurant location
3. Click the coordinates at the top to copy them
4. First number is latitude, second is longitude

---

### 4. Build Local Citations (1-2 hours)

**Why:** Consistent business information across the web builds trust and authority.

**Action:** List your business on these platforms with IDENTICAL information (NAP - Name, Address, Phone):

**Free Directories:**
- ✓ Google Business Profile (already done above)
- [ ] Yelp - https://www.yelp.com/signup
- [ ] TripAdvisor - https://www.tripadvisor.com/Owners
- [ ] Facebook Business Page - https://www.facebook.com/business
- [ ] Apple Maps - https://mapsconnect.apple.com/
- [ ] Bing Places - https://www.bingplaces.com/

**Local Directories:**
- [ ] Visit Alexandria (tourism board)
- [ ] Alexandria Chamber of Commerce
- [ ] Northern Virginia restaurants directories
- [ ] OpenTable (if you use it)

**CRITICAL:** Use the EXACT same business name, address, and phone number everywhere.

---

## 📈 MEDIUM PRIORITY ACTIONS

### 5. Get Customer Reviews (Ongoing)

**Why:** Reviews are a major ranking factor for local SEO.

**Action:**
- Set up a system to ask happy customers for Google reviews
- Respond to ALL reviews (positive and negative)
- Aim for 50+ reviews in the first 6 months

**How to get your Google review link:**
1. Go to your Google Business Profile
2. Click "Get more reviews"
3. Copy the short link and share it with customers

---

### 6. Build Backlinks (Ongoing)

**Why:** Other websites linking to you signals authority to Google.

**Ideas:**
- Get featured in local food blogs/newspapers (Alexandria Gazette, DCist, etc.)
- Partner with local businesses and link to each other
- Sponsor local events (gets you a link on event pages)
- Join local business associations
- Create shareable content (e.g., "Best Brunch Spots in Alexandria" lists often include you)

---

### 7. Social Media Integration

**Action:** Make sure your social media profiles:
- Link to your website
- Have consistent NAP information
- Post regularly with location tags
- Use Alexandria, VA in your bio/description

---

### 8. Content Strategy (Optional but Helpful)

Consider adding a blog section for local SEO content:
- "Best Dishes at Northside 10"
- "Brunch in Alexandria: What to Order at Northside 10"
- "Behind the Scenes at Alexandria's Northside 10"
- Monthly specials announcements

Each post should:
- Include "Alexandria, VA" naturally
- Be 500+ words
- Include images
- Link internally to your menu/reservations pages

---

## 🔍 MONITORING YOUR PROGRESS

### Google Search Console (Check Weekly)
- Pages indexed
- Search queries bringing traffic
- Average position in search results
- Click-through rate

### Google Business Profile Insights
- How many people found you
- What search queries they used
- How many clicked to your website
- How many called or got directions

### Google Analytics
- Organic search traffic
- Top landing pages from search
- Bounce rate
- Time on site

---

## ⏰ EXPECTED TIMELINE

- **Week 1-2:** Google starts indexing your pages
- **Week 2-4:** You appear in search results for brand searches ("Northside 10")
- **Month 2-3:** You start appearing for "Northside 10 Alexandria" variations
- **Month 3-6:** You begin ranking for "Alexandria restaurant", "Southern food Alexandria", etc.
- **Month 6-12:** Steady improvement in rankings for competitive terms

---

## 🚫 COMMON MISTAKES TO AVOID

1. **Inconsistent NAP** - Use the exact same name, address, phone everywhere
2. **Not responding to reviews** - Always respond within 24-48 hours
3. **Ignoring Google Business Profile** - Post updates weekly
4. **Expecting instant results** - SEO takes 3-6 months minimum
5. **Buying backlinks** - This can get you penalized; only build natural links
6. **Keyword stuffing** - Write naturally for humans, not robots
7. **Not having a mobile-friendly site** - Your Next.js site is already responsive ✓

---

## 📞 QUICK CHECKLIST

Copy this checklist and track your progress:

- [ ] Google Search Console set up and verified
- [ ] Sitemap submitted to Search Console
- [ ] Google Business Profile created and claimed
- [ ] Google Business Profile verified (wait for postcard)
- [ ] All Google Business info completed (description, hours, photos)
- [ ] Restaurant schema data updated with real info in layout.tsx
- [ ] Yelp listing created
- [ ] TripAdvisor listing created
- [ ] Facebook Business Page created
- [ ] All listings have consistent NAP information
- [ ] First 10 Google reviews collected
- [ ] Monitoring set up in Search Console and Analytics

---

## 🆘 TROUBLESHOOTING

**Q: It's been 2 weeks and I'm still not showing up for "Northside 10 Alexandria VA"**

A: 
1. Check Google Search Console - Is your site indexed?
2. Try searching with quotes: "Northside 10" - This forces exact match
3. Clear your browser cache and try incognito mode
4. Try from a different device/network
5. Have you verified your Google Business Profile? This is critical for local search

**Q: I show up on page 5, not page 1**

A: This is normal for new sites. Keep building reviews, citations, and backlinks. It takes 3-6 months to improve.

**Q: My competitors rank higher**

A: They likely have:
- More/better reviews
- Longer domain age
- More backlinks
- More citations
- More content

Focus on controllable factors: get more reviews, complete all listings, post regularly.

---

## 📚 USEFUL TOOLS

- [Google Search Console](https://search.google.com/search-console/) - Monitor indexing
- [Google Business Profile](https://business.google.com/) - Manage local listing
- [Schema Markup Validator](https://validator.schema.org/) - Test your structured data
- [PageSpeed Insights](https://pagespeed.web.dev/) - Check site speed
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Test mobile compatibility
- [Rich Results Test](https://search.google.com/test/rich-results) - Test your schema markup

---

## 💡 FINAL TIPS

1. **Be patient** - SEO is a marathon, not a sprint
2. **Focus on Google Business Profile first** - This gives the fastest local results
3. **Get reviews** - They're the #1 ranking factor for local search
4. **Be consistent** - Same NAP everywhere
5. **Create value** - Good content attracts natural links
6. **Monitor weekly** - Track progress in Search Console
7. **Don't pay for SEO until you've done all the free stuff first**

---

**Questions?** Feel free to ask! Good luck with your SEO journey! 🚀

