# EventzHub Payment System - Quick Start

Complete payment infrastructure is now ready! Here's how to get running in 5 minutes.

## What's Done ✅

**Frontend (React)** - COMPLETE
- ✅ Cart page with email collection
- ✅ Real payment processing
- ✅ Booking confirmation page
- ✅ Customer bookings dashboard
- ✅ Vendor earnings dashboard
- ✅ All pages fetch real data from API

**Backend (Node.js + Express)** - COMPLETE
- ✅ 6 payment API endpoints
- ✅ Stripe integration
- ✅ Supabase database connection
- ✅ Webhook handling
- ✅ Error handling & validation

**Database (PostgreSQL via Supabase)** - COMPLETE
- ✅ Schema created with migrations
- ✅ RLS policies for security
- ✅ Helper views for analytics

---

## Quick Start (5 Steps)

### Step 1: Get Credentials (10 min)

#### Stripe
1. Go to https://stripe.com → Sign up
2. Dashboard → Developers → API Keys
3. Copy `pk_test_...` and `sk_test_...`

#### Supabase
1. Go to https://supabase.com → Create project
2. Settings → API → Copy URL and Service Role Key

### Step 2: Backend Setup (2 min)

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Copy and edit environment file
cp .env.example .env
# Fill in Stripe & Supabase credentials in .env
```

### Step 3: Database Setup (2 min)

1. Open Supabase project → SQL Editor
2. Create new query
3. Copy entire contents of `server/migrations.sql`
4. Paste and click Run

### Step 4: Start Backend (1 min)

```bash
npm run dev
```

Should see:
```
🚀 EventzHub Server running on http://localhost:3001
```

### Step 5: Test Payment (2 min)

1. Frontend already running: http://localhost:5173
2. Browse vendors → Add to cart
3. Enter email → Click "Confirm and Pay"
4. Use test card: `4242 4242 4242 4242`
5. See confirmation page with booking details

✅ **You're done!** Payment system is working!

---

## Directory Structure

```
merriment-market/
├── src/                          # Frontend React app
│   ├── pages/
│   │   ├── Cart.tsx             # ✅ Payment flow
│   │   ├── BookingConfirmation  # ✅ Shows real booking
│   │   ├── Dashboard.tsx        # ✅ Customer bookings
│   │   └── VendorDashboard.tsx  # ✅ Vendor earnings
│   └── lib/
│       ├── payment-types.ts     # ✅ TypeScript interfaces
│       ├── payment-api.ts       # ✅ Frontend API service
│       └── stripe-utils.ts      # ✅ Payment calculations
│
├── server/                       # ✅ NEW Backend
│   ├── src/
│   │   └── index.js (500+ lines)
│   │       - 6 API endpoints
│   │       - Stripe integration
│   │       - Webhook handling
│   ├── migrations.sql           # Database schema
│   ├── scripts/migrate.js       # Migration runner
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── PAYMENT_SETUP.md             # Detailed setup guide
└── .env                         # Frontend env vars
```

---

## API Endpoints Ready

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/payments/create-intent` | Create Stripe PaymentIntent |
| POST | `/api/bookings/confirm-payment` | Save booking after payment |
| GET | `/api/bookings/:bookingId` | Get booking details |
| GET | `/api/bookings/customer/:customerId` | List customer bookings |
| POST | `/api/bookings/:bookingId/refund` | Request refund |
| GET | `/api/vendors/:vendorId/earnings` | Get vendor earnings |
| POST | `/api/webhooks/stripe` | Stripe webhook listener |

---

## Testing Checklist

- [ ] Backend running at http://localhost:3001
- [ ] Frontend running at http://localhost:5173
- [ ] Sign in as a customer
- [ ] Browse vendors and add to cart
- [ ] Click "Confirm and Pay"
- [ ] Enter email
- [ ] Use card: `4242 4242 4242 4242`
- [ ] Expiry: `12/25`, CVC: `123`
- [ ] See booking confirmation page
- [ ] Check Supabase: bookings table has new row
- [ ] Check Stripe Dashboard: Payment appears
- [ ] Go to Dashboard: Booking shows in "My Bookings"

---

## Key Files to Review

1. **`server/README.md`** - Full server documentation
2. **`PAYMENT_SETUP.md`** - Detailed setup guide
3. **`server/migrations.sql`** - Database schema
4. **`server/src/index.js`** - All backend logic (500+ lines)

---

## Environment Variables

### Frontend (`.env`)
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://...supabase.co
VITE_SUPABASE_ANON_KEY=...
```

### Backend (`server/.env`)
```env
STRIPE_SECRET_KEY=sk_test_...
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

---

## Common Issues & Fixes

**"Cannot find module express"**
```bash
cd server && npm install
```

**"Connection refused on localhost:3001"**
- Is backend running? Check: `npm run dev` in server folder
- Check port 3001 is not blocked

**"Invalid Supabase URL"**
- Go to Supabase dashboard → Settings → API
- Copy the exact URL shown

**"Payment processing failed"**
- Check Stripe keys are correct (test vs live)
- Check network tab in DevTools for actual error

**"Booking not found after payment"**
- Check database migrations ran in Supabase
- Run: `SELECT * FROM bookings;` in SQL Editor

---

## What's Next?

After confirming everything works:

1. **Email Confirmations** - SendGrid integration for booking emails
2. **Vendor Onboarding** - Connect Stripe to vendors for payouts
3. **Admin Dashboard** - Monitor transactions, refunds, disputes
4. **Production Deployment** - Railway/Vercel with live Stripe keys
5. **More Features**:
   - Advanced booking management
   - Dispute resolution
   - Tax reporting (1099-K)
   - Messaging system
   - Reviews & ratings

---

## Support Docs

- **Stripe Docs**: https://stripe.com/docs/payments
- **Supabase Docs**: https://supabase.com/docs
- **Express Docs**: https://expressjs.com
- **React Payment Methods**: https://react.stripe.com/docs/stripe-js

---

## Success! 🎉

The entire payment infrastructure is now in place:

✅ Frontend payment UI
✅ Backend API server  
✅ Database schema
✅ Stripe integration
✅ Webhook handling
✅ Error handling
✅ Documentation

Just need to:
1. Fill in environment variables
2. Run database migrations
3. Start the backend server
4. Test with Stripe test card

That's it! 🚀
