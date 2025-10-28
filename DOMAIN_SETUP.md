# 🌐 Custom Domain Setup Guide

## Setting up **thenorthside10.com** with Vercel

Your SEO is now optimized! Follow these steps to connect your custom domain.

---

## 📋 **Prerequisites Checklist**

✅ SEO metadata with Open Graph cards  
✅ Favicon configured  
✅ Sitemap.xml generated  
✅ Robots.txt configured  
✅ Site fully deployed on Vercel  

---

## 🚀 **Step 1: Add Domain to Vercel**

### In Vercel Dashboard:

1. Go to: **https://vercel.com/dashboard**
2. Click on your project: `v0-restaurant-website-design`
3. Go to **Settings** → **Domains**
4. Click **"Add Domain"**
5. Enter: `thenorthside10.com`
6. Click **"Add"**

Vercel will show you DNS records that need to be configured.

---

## 🔧 **Step 2: Configure DNS in Squarespace**

Since your domain is on Squarespace, you'll need to update DNS records there:

### Option A: Point Domain to Vercel (Recommended)

1. **In Squarespace:**
   - Go to **Settings** → **Domains** → **thenorthside10.com**
   - Click **DNS Settings** or **Advanced DNS**

2. **Add these DNS records** (Vercel will show you the exact values):

   **For Root Domain (thenorthside10.com):**
   ```
   Type: A
   Host: @
   Value: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   ```

3. **Remove conflicting records:**
   - Delete any existing A or CNAME records for `@` and `www`
   - Keep your email (MX) records if you have email on this domain

### Option B: Use Vercel Nameservers (Alternative)

If Option A doesn't work, you can transfer DNS management to Vercel:

1. In Vercel, when adding the domain, select **"Use Vercel Nameservers"**
2. Vercel will give you nameserver addresses like:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. In Squarespace, update the nameservers to Vercel's
4. **Warning:** This will move ALL DNS records to Vercel (email, etc.)

---

## ⏱️ **Step 3: Wait for DNS Propagation**

- DNS changes can take **5 minutes to 48 hours**
- Usually happens within **1-2 hours**
- Check status in Vercel dashboard (it will show "Valid Configuration" when ready)

---

## ✅ **Step 4: Enable HTTPS & Set as Primary**

Once DNS is verified in Vercel:

1. Vercel will automatically issue an SSL certificate
2. In **Settings** → **Domains**:
   - Set `thenorthside10.com` as **Primary Domain**
   - Enable **Redirect www to root** (or vice versa)
   - Ensure **"Redirect to HTTPS"** is enabled

---

## 🧪 **Testing Your Domain**

After DNS propagates, test:

1. ✅ `https://thenorthside10.com` - Should load your site
2. ✅ `https://www.thenorthside10.com` - Should redirect to primary
3. ✅ `http://thenorthside10.com` - Should redirect to HTTPS
4. ✅ Check Open Graph preview: https://www.opengraph.xyz/

---

## 🎯 **Post-Launch Checklist**

After domain is live:

### Analytics & SEO:
- [ ] Submit sitemap to Google Search Console
  - Go to: https://search.google.com/search-console
  - Add property: `thenorthside10.com`
  - Submit sitemap: `https://thenorthside10.com/sitemap.xml`

- [ ] Add to Google Business Profile
  - Link your website: `thenorthside10.com`

- [ ] Test with SEO tools:
  - Google PageSpeed Insights: https://pagespeed.web.dev/
  - Meta Tags: https://metatags.io/
  - SEO Checker: https://www.seobility.net/

### Social Media:
- [ ] Update website URL on:
  - Facebook
  - Instagram  
  - Google Maps
  - Yelp
  - Other review sites

### Update References:
- [ ] Update email signatures
- [ ] Update business cards
- [ ] Update printed menus
- [ ] Update third-party ordering platforms

---

## 🆘 **Troubleshooting**

**Domain not working after 24 hours?**
- Check Vercel dashboard for DNS status
- Use DNS checker: https://dnschecker.org/
- Verify A record points to `76.76.21.21`
- Contact Squarespace support if DNS won't save

**SSL Certificate not issued?**
- Wait up to 24 hours for auto-issuance
- Check that CAA records allow Let's Encrypt
- Try removing and re-adding the domain in Vercel

**www not redirecting?**
- Ensure CNAME record for `www` is set correctly
- Enable redirect in Vercel domain settings

---

## 📞 **Need Help?**

- **Vercel Support**: https://vercel.com/help
- **Squarespace DNS**: https://support.squarespace.com/hc/en-us/articles/205812378

---

## 🎉 **You're All Set!**

Once the domain is live, your site will be at:
- **Primary**: https://thenorthside10.com
- **With ToastTab Integration** for daily specials
- **With Form Submissions** going to Northside's email
- **Fully SEO optimized** with meta tags and sitemap

Congratulations on your new website! 🚀

