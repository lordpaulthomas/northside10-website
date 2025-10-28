# ToastTab API Setup Guide

## Issue Identified
Your ToastTab API integration is failing because the required environment variables are not configured.

## Required Environment Variables
You need to create a `.env.local` file in your project root with these variables:

```
TOAST_CLIENT_ID=your_toast_client_id_here
TOAST_CLIENT_SECRET=your_toast_client_secret_here
TOAST_RESTAURANT_GUID=your_restaurant_guid_here
```

## How to Get These Values

### 1. ToastTab Developer Portal
- Go to https://ws-api.toasttab.com/ (ToastTab Developer Portal)
- Sign in with your ToastTab account
- Create a new application or use an existing one

### 2. Get Client ID and Client Secret
- In your ToastTab application settings, you'll find:
  - **Client ID**: A unique identifier for your app
  - **Client Secret**: A secret key for authentication

### 3. Get Restaurant GUID
- In your ToastTab restaurant settings, find your Restaurant GUID
- This is usually a UUID format string

## Steps to Fix

1. Create a file named `.env.local` in your project root
2. Add the three environment variables with your actual values
3. Restart your development server: `npm run dev`
4. Test the API endpoint: `curl http://localhost:3000/api/toast/specials`

## Current API Endpoint
Your app has a working API endpoint at `/api/toast/specials` that:
- Authenticates with ToastTab API
- Fetches menu data
- Returns lunch specials (you may need to adjust the menu filtering logic)

## Next Steps After Setup
1. Test the API endpoint to ensure it returns data
2. Adjust the menu filtering logic in `app/api/toast/specials/route.ts` if needed
3. Update the `DailySpecialsDisplay` component to handle your specific menu structure
