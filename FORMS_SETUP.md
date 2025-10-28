# 📧 Contact & Catering Forms Setup

Your forms are now integrated with **Resend** for professional email delivery!

## 🚀 Quick Setup (5 minutes)

### Step 1: Sign up for Resend (FREE)

1. Go to: **https://resend.com/signup**
2. Sign up with your email
3. Verify your email address
4. You're in! (100 emails/day free, 3,000/month)

### Step 2: Get Your API Key

1. In your Resend dashboard, go to **API Keys**
2. Click **"Create API Key"**
3. Give it a name like "Northside 10 Production"
4. Copy the API key (starts with `re_...`)

### Step 3: Add Environment Variables to Vercel

1. Go to your Vercel project: **https://vercel.com/dashboard**
2. Click on `v0-restaurant-website-design`
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

   **Variable 1:**
   - Key: `RESEND_API_KEY`
   - Value: `re_your_api_key_here` (paste your Resend API key)
   - Environments: Production, Preview, Development

   **Variable 2:**
   - Key: `CONTACT_EMAIL`
   - Value: `your-restaurant-email@example.com` (where you want to receive form submissions)
   - Environments: Production, Preview, Development

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Wait ~2 minutes
4. Test your forms!

## ✅ What's Included

### Contact Form (`/contact`)
- Sends to your restaurant email
- Includes: Name, Email, Phone, Message
- Reply-To set to customer's email for easy responses

### Catering Form (`/catering`)
- Sends to your restaurant email
- Includes: Name, Email, Phone, Event Date, Guest Count, Event Type, Message
- Subject line includes event date for easy tracking

## 🎯 Testing

After deployment:
1. Go to your production site
2. Fill out the contact form
3. Check your email (the one you set as `CONTACT_EMAIL`)
4. You should receive the submission within seconds!

## 💡 Next Steps (Optional)

### Add Your Custom Domain to Resend

Once you're ready, you can:
1. Add your domain to Resend (e.g., `northside10.com`)
2. Update the `from` field in the API routes to use your domain
3. Change from: `onboarding@resend.dev` to `contact@northside10.com`

This makes emails look more professional!

## 🆘 Troubleshooting

**Forms not working?**
- Check that environment variables are added in Vercel
- Make sure you redeployed after adding variables
- Check your spam folder for test emails

**Need help?**
- Resend docs: https://resend.com/docs
- Vercel env vars: https://vercel.com/docs/environment-variables

---

**You're all set!** Forms will now send emails to your restaurant email address. 🎉

