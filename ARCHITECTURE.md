# EventzHub Payment System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│                     EVENTZUB PAYMENT SYSTEM                          │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  FRONTEND (React + TypeScript)              BACKEND (Node.js)        │
│  ├─ Cart.tsx (payment UI)      ────HTTP───► ├─ Express server       │
│  ├─ BookingConfirmation.tsx                 ├─ 6 API endpoints      │
│  ├─ Dashboard.tsx                           ├─ Stripe integration   │
│  └─ VendorDashboard.tsx                     └─ Supabase connection  │
│                                                                       │
│  payment-api.ts (service layer)                                      │
│  ├─ createPaymentIntent()     ──POST─────► /api/payments/...        │
│  ├─ confirmPayment()          ──POST─────► /api/bookings/...        │
│  ├─ getBooking()              ──GET──────► /api/bookings/:id        │
│  ├─ getCustomerBookings()     ──GET──────► /api/bookings/customer   │
│  ├─ requestRefund()           ──POST─────► /api/bookings/:id/...    │
│  └─ getVendorEarnings()       ──GET──────► /api/vendors/:id/...     │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  PAYMENT PROCESSOR                  DATABASE                         │
│  ┌──────────────────┐               ┌───────────────────┐           │
│  │    Stripe.js     │               │   Supabase/       │           │
│  │  (Client-side)   │               │  PostgreSQL       │           │
│  ├──────────────────┤               ├───────────────────┤           │
│  │ - Confirm card   │               │ - bookings        │           │
│  │   payment        │               │ - pay_txns        │           │
│  │ - Create token   │               │ - vendor_earnings │           │
│  └──────────────────┘               │ - booking_drafts  │           │
│           △                         │                   │           │
│           │                         └───────────────────┘           │
│           │ clientSecret                     △                      │
│           │ token                            │                      │
│           │                           INSERT/UPDATE/SELECT          │
│           └──────────────────────────────────┴─────────┘            │
│                                                         │            │
│  ┌──────────────────────────────────────────────────────┴──┐         │
│  │              Stripe Webhooks (Events)                   │         │
│  ├────────────────────────────────────────────────────────┤         │
│  │ - payment_intent.succeeded                             │         │
│  │ - payment_intent.payment_failed                        │         │
│  │ - charge.refunded                                      │         │
│  └────────────────────────────────────────────────────────┘         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow: Complete Payment

```
1. CUSTOMER INITIATES PAYMENT
   Customer → Cart.tsx
   ├─ Add items to cart
   ├─ Enter email
   └─ Click "Confirm and Pay"

2. CREATE PAYMENT INTENT
   Frontend → POST /api/payments/create-intent
   ├─ Send: bookingData (vendor, package, price, etc.)
   └─ Receive: clientSecret, paymentIntentId

3. PROCESS PAYMENT
   Stripe API (client-side)
   ├─ Confirm card details
   ├─ Verify 3D Secure (if needed)
   └─ Return paymentIntentId

4. CONFIRM PAYMENT
   Frontend → POST /api/bookings/confirm-payment
   ├─ Send: paymentIntentId, bookingData, customerId
   └─ Backend receives and:
       ├─ Verify payment succeeded in Stripe
       ├─ Create booking record
       ├─ Log payment transaction
       ├─ Track vendor earnings
       └─ Return bookingId

5. SHOW CONFIRMATION
   Frontend → BookingConfirmation.tsx
   ├─ Fetch booking from GET /api/bookings/:bookingId
   ├─ Display payment breakdown
   ├─ Show confirmation ID
   └─ List next steps

6. ASYNC CONFIRMATION (Webhook)
   Stripe → POST /api/webhooks/stripe
   ├─ Event: payment_intent.succeeded
   ├─ Backend verifies signature
   └─ Update booking status if needed
```

## Component Interaction

```
                  React Frontend
                  ──────────────
                  
    ┌─────────────────────────────┐
    │      Cart.tsx               │
    │  [Email] [Pay Button]       │
    │                             │
    │  const handlePayment = () {  │
    │    bookingData = {...}      │
    │    intent = create...()     │
    │    result = confirm...()    │
    │    navigate(confirm)        │
    │  }                          │
    └────────────┬────────────────┘
                 │
                 ├─ payment-api.ts
                 │  ├─ createPaymentIntent()
                 │  └─ confirmPayment()
                 │
                 └─ Stripe.js (client)
                    └─ confirmCardPayment()
                    
    ┌─────────────────────────────┐
    │ BookingConfirmation.tsx      │
    │  [Confirmation Details]     │
    │  [Payment Breakdown]        │
    │                             │
    │  useEffect(() => {          │
    │    booking = getBooking()   │
    │  })                         │
    └────────────┬────────────────┘
                 │
                 └─ payment-api.ts
                    └─ getBooking()

    ┌─────────────────────────────┐
    │ Dashboard.tsx               │
    │  [My Bookings List]         │
    │                             │
    │  useEffect(() => {          │
    │    bookings = getCustomer...│
    │  })                         │
    └────────────┬────────────────┘
                 │
                 └─ payment-api.ts
                    └─ getCustomerBookings()

    ┌─────────────────────────────┐
    │ VendorDashboard.tsx         │
    │  [Earnings] [Requests]      │
    │                             │
    │  useEffect(() => {          │
    │    earnings = getVendor...()│
    │  })                         │
    └────────────┬────────────────┘
                 │
                 └─ payment-api.ts
                    └─ getVendorEarnings()
```

## Backend Request Flow

```
Express Server (server/src/index.js)
───────────────────────────────────

HTTP Request
    │
    ├─► [CORS Middleware]
    │   ├─ Allow frontend origin
    │   └─ Attach headers
    │
    ├─► [JSON Parser]
    │   └─ Parse request body
    │
    ├─► Router
    │   │
    │   ├─ POST /api/payments/create-intent
    │   │   ├─ Validate bookingData
    │   │   ├─ Create Stripe PaymentIntent
    │   │   └─ Return clientSecret
    │   │
    │   ├─ POST /api/bookings/confirm-payment
    │   │   ├─ Verify payment in Stripe
    │   │   ├─ Create booking in Supabase
    │   │   ├─ Log transaction
    │   │   ├─ Track earnings
    │   │   └─ Return bookingId
    │   │
    │   ├─ GET /api/bookings/:bookingId
    │   │   ├─ Query Supabase
    │   │   └─ Return booking data
    │   │
    │   ├─ GET /api/bookings/customer/:customerId
    │   │   ├─ Query Supabase (filtered by customer)
    │   │   └─ Return array of bookings
    │   │
    │   ├─ POST /api/bookings/:bookingId/refund
    │   │   ├─ Get booking details
    │   │   ├─ Calculate refund amount (% based on date)
    │   │   ├─ Process refund in Stripe
    │   │   ├─ Update Supabase
    │   │   └─ Return refund confirmation
    │   │
    │   ├─ GET /api/vendors/:vendorId/earnings
    │   │   ├─ Query vendor_earnings table
    │   │   └─ Return by month
    │   │
    │   └─ POST /api/webhooks/stripe
    │       ├─ Verify webhook signature
    │       ├─ Handle events:
    │       │   ├─ payment_intent.succeeded
    │       │   ├─ payment_intent.payment_failed
    │       │   └─ charge.refunded
    │       └─ Update database
    │
    └─► [Error Handler]
        ├─ Catch errors
        ├─ Log to console
        └─ Return error JSON
```

## Database Schema

```
Bookings (Master Table)
┌──────────────────────────────────────┐
│ id (PK)                              │
├──────────────────────────────────────┤
│ customer_id (FK) ──────────┐         │
│ vendor_id       ────────┐  │         │
│ package_id              │  │         │
│ customer_name           │  │         │
│ vendor_name             │  │         │
│ package_name            │  │         │
│ event_type              │  │         │
│ event_date              │  │         │
│ location                │  │         │
│ special_requests        │  │         │
├──────────────────────────> │         │
│ total (cents)           │  │         │
│ platform_fee (cents)    │  │         │
│ vendor_payout (cents)   │  │         │
│ payment_intent_id (UQ) ─┼──────┐    │
│ status (ENUM)           │  │   │    │
│ created_at              │  │   │    │
│ updated_at              │  │   │    │
└──────────────────────────┘  │   │    │
                               │   │    │
Payment Transactions           │   │    │
┌──────────────────────────────┼───┼─┐  │
│ id (PK)                      │   │ │  │
│ booking_id (FK) ────────────>┼───┘ │  │
│ payment_intent_id ──────────────────>┤
│ customer_id                  │     │  │
│ vendor_id                    │     │  │
│ amount, fee, vendor_amount   │     │  │
│ status                       │     │  │
│ created_at                   │     │  │
└──────────────────────────────┼─────┘  │
                               │        │
Vendor Earnings                │        │
┌──────────────────────────────┼──────┐ │
│ id (PK)                      │      │ │
│ vendor_id                    │      │ │
│ booking_id (FK) ────────────>┼──────┘ │
│ month (YYYY-MM)              │        │
│ amount (cents)               │        │
│ status (pending|paid|failed) │        │
│ payout_date                  │        │
│ created_at                   │        │
└──────────────────────────────────────┘
```

## Security Layer

```
┌─────────────────────────────────────────────────┐
│           Row Level Security (RLS)              │
│                  Supabase                       │
├─────────────────────────────────────────────────┤
│                                                 │
│ bookings:                                       │
│ ├─ Policy: Users see only their own bookings   │
│ └─ WHERE customer_id = auth.uid()              │
│                                                 │
│ vendor_earnings:                                │
│ ├─ Policy: Vendors see only their earnings     │
│ └─ WHERE vendor_id = auth.uid()                │
│                                                 │
│ booking_drafts:                                 │
│ ├─ Policy: Users manage only their drafts      │
│ └─ WHERE user_id = auth.uid()                  │
│                                                 │
├─────────────────────────────────────────────────┤
│      Stripe Webhook Signature Verification      │
│                                                 │
│ 1. Receive webhook + signature header           │
│ 2. Reconstruct event from raw body              │
│ 3. Use secret to validate signature             │
│ 4. Only process if signature valid              │
│ └─ Prevents replay attacks                      │
│                                                 │
├─────────────────────────────────────────────────┤
│        Environment Variable Protection          │
│                                                 │
│ Frontend:  VITE_STRIPE_PUBLISHABLE_KEY (safe)  │
│            (Publishable = non-sensitive)        │
│                                                 │
│ Backend:   STRIPE_SECRET_KEY (protected)       │
│            (Secret = never exposed)             │
│            STRIPE_WEBHOOK_SECRET (protected)   │
│                                                 │
├─────────────────────────────────────────────────┤
│           CORS (Cross-Origin Resource)          │
│                                                 │
│ Backend only accepts requests from:             │
│ - http://localhost:5173 (dev frontend)         │
│ - https://yourdomain.com (prod frontend)       │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend (Vercel)                  Backend (Railway)      │
│  ──────────────────                 ────────────────       │
│  https://eventzub.com      HTTPS    https://api.eventzub.com
│  ├─ Static assets          ◄────────► ├─ Express server    │
│  ├─ React app              │          ├─ Node.js           │
│  └─ TypeScript compiled    │          └─ Auto-deployed     │
│                             │                               │
│  Environment:              │          Environment:         │
│  ├─ VITE_API_BASE_URL      │          ├─ STRIPE_SECRET_KEY │
│  └─ VITE_STRIPE_...        │          ├─ SUPABASE_...     │
│                             │          └─ NODE_ENV=prod    │
│                             │                               │
│                    Supabase (PostgreSQL)                   │
│                    ────────────────────────               │
│                    Database (prod)                        │
│                    ├─ bookings                            │
│                    ├─ payment_transactions                │
│                    ├─ vendor_earnings                     │
│                    └─ Backups (automated daily)           │
│                                                             │
│                    Stripe (Payment Processor)              │
│                    ──────────────────────────             │
│                    ├─ Live Keys (sk_live_, pk_live_)     │
│                    ├─ Live Webhook                       │
│                    └─ Real Money Processing              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**EventzHub Payment Architecture v1.0**
