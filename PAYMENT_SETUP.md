# EventzHub Payment System Setup Guide

Complete guide to set up the payment system for EventzHub with Stripe and Supabase.

## Table of Contents

1. [Stripe Setup](#stripe-setup)
2. [Supabase Setup](#supabase-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Configuration](#frontend-configuration)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

## Stripe Setup

### 1. Create Stripe Account

1. Go to https://stripe.com
2. Click "Sign up" → Enter email and password
3. Verify your email
4. Choose "Business Type: On-demand software or platform"
5. Complete your business information

### 2. Get API Keys

1. Go to https://dashboard.stripe.com/
2. Click your account icon → Switch to test mode (toggle in top right)
3. Go to **Developers** → **API Keys**
4. You'll see:
   - **Publishable Key** (starts with `pk_test_`) - goes in frontend
   - **Secret Key** (starts with `sk_test_`) - goes in backend `.env`

Copy both and save somewhere safe.

### 3. Set Up Stripe Webhook

1. In Stripe Dashboard: **Developers** → **Webhooks**
2. Click **Add an endpoint**
3. **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
   - For local testing: Use ngrok tunnel (see Testing section)
4. **Events to send**: Select these:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click **Add endpoint**
6. Click the endpoint you just created
7. Under "Signing secret" click **Reveal** to show the secret
8. Copy this to `STRIPE_WEBHOOK_SECRET` in backend `.env`

### 4. Enable Stripe Connect (Optional, for Vendor Payouts)

For paying vendors directly:

1. In Stripe Dashboard: **Settings** → **Stripe Billing**
2. Enable **Stripe Connect**
3. Follow onboarding steps
4. This enables Connect accounts for vendors to receive payouts

---

## Supabase Setup

### 1. Create Supabase Project

1. Go to https://supabase.com/
2. Click **Start your project**
3. Sign in with GitHub / Email
4. Click **New project**
5. **Project name**: `eventzHub`
6. **Database password**: Create strong password (save it!)
7. **Region**: Choose closest to your users
8. Click **Create new project** and wait 2-3 minutes

### 2. Get API Credentials

1. Project dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** → `SUPABASE_URL` in backend `.env`
   - **Service Role Key** (under "Project API Keys") → `SUPABASE_SERVICE_ROLE_KEY` in backend `.env`

### 3. Run Database Migrations

1. In Supabase project → **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open `server/migrations.sql` in your text editor
4. Copy **entire** contents
5. Paste into SQL Editor
6. Click **Run** (blue play button)

Wait for all migrations to complete. You should see these new tables:
- `bookings`
- `payment_transactions`
- `vendor_earnings`
- `booking_drafts`

### 4. Enable Row Level Security (RLS)

RLS policies should be created by migrations. To verify:

1. **Authentication** → **Policies**
2. Check that policies exist for `bookings` and `booking_drafts`

---

## Backend Setup

### 1. Install Node.js

If you don't have Node.js:
1. Go to https://nodejs.org/
2. Download LTS version
3. Follow installation steps

Verify: `node --version` should show v18+

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:

```env
PORT=3001

# From Supabase setup
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# From Stripe setup
STRIPE_SECRET_KEY=sk_test_4eC39HqLyjWDarhtT657G80...
STRIPE_PUBLISHABLE_KEY=pk_test_51234567...
STRIPE_WEBHOOK_SECRET=whsec_test_1234567...

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

NODE_ENV=development
```

### 4. Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 EventzHub Server running on http://localhost:3001
📊 API endpoints ready
🔔 Webhook listener ready at /api/webhooks/stripe
```

✅ Backend is running!

---

## Frontend Configuration

### 1. Update Frontend Environment Variables

Edit `.env` in frontend root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51234567...

VITE_API_BASE_URL=http://localhost:3001/api

VITE_MAPBOX_TOKEN=YOUR_MAPBOX_PUBLIC_TOKEN
```

### 2. Start Frontend Dev Server

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

### 3. Verify Connection

In browser:
1. Go to http://localhost:5173
2. Open DevTools (F12) → **Network** tab
3. Add item to cart
4. Click "Confirm and Pay"
5. Should see request to `http://localhost:3001/api/payments/create-intent`

If you see the request, connection is working! ✅

---

## Testing

### 1. Test Payment Locally (Without Webhook)

1. Frontend at http://localhost:5173
2. Backend at http://localhost:3001
3. Browse vendors → Add to cart
4. Click "Confirm and Pay"
5. Fill in email
6. Click payment button
7. Enter Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25` (any future date)
   - CVC: `123` (any 3 digits)
8. Click "Pay"

You should see confirmation page with booking details! ✅

### Stripe Test Cards

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires 3D Secure**: `4000 0025 0000 3155`
- **Insufficient funds**: `4000 0000 0000 9995`

### 2. Test Webhooks Locally (Optional)

To test webhook delivery locally:

```bash
# Install Stripe CLI from: https://stripe.com/docs/stripe-cli
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

This outputs:
```
Ready! Your webhook signing secret is: whsec_test_1234567...
```

Update your `.env` with this webhook secret.

Now when you process a payment, you'll see webhook events logged in your terminal.

### 3. Test Complete Flow

1. **Create booking**: Browser → Cart → Pay → See confirmation
2. **Check database**: Supabase → bookings table → New row added
3. **Check Stripe**: Stripe Dashboard → Customers → See transaction
4. **Check email**: Backend sends email confirmation (if configured)

---

## Deployment

### Deploy Backend

Options: Vercel, Railway, Fly.io, Heroku, AWS, Google Cloud

#### Example: Railway.app

1. Push code to GitHub (if not already)
2. Go to https://railway.app
3. Connect GitHub account
4. Click **New Project** → **Deploy from GitHub repo**
5. Select your repo
6. Click **Deploy**
7. Go to **Variables** and add `.env` variables
8. App will auto-deploy to `https://your-app.railway.app`

#### Update URLs After Deployment

Once backend is deployed:

1. Update `.env` in frontend:
   ```env
   VITE_API_BASE_URL=https://your-backend.railway.app/api
   ```

2. Update Stripe Webhook:
   - Stripe Dashboard → Webhooks → Edit existing
   - Change URL to: `https://your-backend.railway.app/api/webhooks/stripe`

3. Deploy frontend (Vercel, Netlify, etc.)

### Switch to Production Stripe Keys

1. Get production keys from Stripe:
   - Stripe Dashboard → Top right: Switch from Test Mode to Live Mode
   - Developers → API Keys → Copy `sk_live_...` and `pk_live_...`

2. Update backend `.env`:
   ```env
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

3. Create new live webhook in Stripe Dashboard
4. Update `STRIPE_WEBHOOK_SECRET` to live webhook secret

5. Update frontend `.env`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

⚠️ **IMPORTANT**: Never commit `.env` files with real secrets!

---

## Troubleshooting

### "Cannot find module" errors

```bash
rm -rf node_modules
npm install
```

### "Connection refused" on backend

- Is backend running? Check: `npm run dev`
- Check port 3001 is not blocked by firewall
- Check `FRONTEND_URL` in backend `.env` includes `http://localhost:5173`

### "Invalid Supabase URL"

- Check URL format: `https://PROJECT-ID.supabase.co`
- Verify in Supabase Settings → API
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is not truncated

### "Payment processing failed"

- Check Stripe keys are correct (test vs live)
- Check `STRIPE_WEBHOOK_SECRET` if webhook event failed
- Check Stripe error logs: Stripe Dashboard → Developers → Logs

### "Webhook not received"

- If local testing: Use `stripe listen` command (see Testing section)
- If deployed: Verify webhook URL is correct in Stripe Dashboard
- Check server logs for errors
- Verify `STRIPE_WEBHOOK_SECRET` is correct

### "Booking not found after payment"

- Check database migrations ran successfully
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check server logs for database errors
- Verify table exists: Supabase → SQL Editor → `SELECT * FROM bookings;`

---

## Quick Checklist

- [ ] Stripe account created
- [ ] Stripe API keys obtained
- [ ] Stripe webhook configured
- [ ] Supabase project created
- [ ] Supabase API credentials obtained
- [ ] Database migrations run
- [ ] Backend `.env` configured
- [ ] Backend server running (`npm run dev`)
- [ ] Frontend `.env` configured
- [ ] Frontend dev server running (`npm run dev`)
- [ ] Test payment processed successfully
- [ ] Booking appears in Supabase database
- [ ] Payment appears in Stripe Dashboard

---

## Next Steps

Once everything is working:

1. **Email Confirmations**: Set up SendGrid for booking confirmation emails
2. **Vendor Payouts**: Enable Stripe Connect for automatic vendor payouts
3. **Admin Dashboard**: Create admin interface for payments, disputes, refunds
4. **Notifications**: Add real-time notifications for new bookings
5. **Reviews & Ratings**: Implement customer review system
6. **Tax Reporting**: Automate 1099-K generation for vendors

Good luck! 🚀
