# EventzHub Backend Server

Node.js + Express backend for EventzHub marketplace. Handles payment processing, booking management, and vendor earnings.

## Features

- ✅ Stripe payment integration
- ✅ Booking management (create, fetch, list)
- ✅ Refund processing
- ✅ Vendor earnings tracking
- ✅ Webhook handling for payment events
- ✅ Supabase integration for data persistence

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required environment variables:**

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (from Supabase dashboard)
- `STRIPE_SECRET_KEY` - Stripe secret API key (from Stripe dashboard)
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (from Stripe dashboard)

**How to get each:**

#### Supabase
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy `Project URL` and `Service Role Key`

#### Stripe
1. Go to https://dashboard.stripe.com/
2. Go to Developers → API Keys
3. Copy `Secret Key`
4. For Webhook Secret: Go to Developers → Webhooks
5. Create webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`
6. Copy the signing secret

### 3. Set Up Database

Run migrations to create tables:

```bash
npm run migrate
```

Or manually:
1. Open Supabase SQL Editor
2. Copy and paste contents of `migrations.sql`
3. Execute each section

### 4. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start at `http://localhost:3001`

## API Endpoints

### Payment Management

#### Create Payment Intent
```
POST /api/payments/create-intent
Content-Type: application/json

{
  "bookingData": {
    "vendorId": "vendor-123",
    "packageId": "package-456",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "vendorName": "Beautiful Florals",
    "packageName": "Premium Package",
    "eventType": "wedding",
    "eventDate": "2024-06-15",
    "location": "New York, NY",
    "specialRequests": "White and gold theme",
    "total": 50000,
    "platformFee": 7500,
    "vendorPayout": 42500
  },
  "customerId": "customer-abc-123"
}

Response:
{
  "clientSecret": "pi_test_...clientSecret...",
  "paymentIntentId": "pi_test_...",
  "bookingData": { ... }
}
```

#### Confirm Payment
```
POST /api/bookings/confirm-payment
Content-Type: application/json

{
  "paymentIntentId": "pi_test_...",
  "bookingData": { ... },
  "customerId": "customer-abc-123"
}

Response:
{
  "success": true,
  "bookingId": "booking_1234567890",
  "paymentIntentId": "pi_test_...",
  "bookingData": { ... }
}
```

### Booking Management

#### Get Booking Details
```
GET /api/bookings/:bookingId

Response:
{
  "id": "booking_123",
  "customer_id": "customer-abc",
  "vendor_id": "vendor-xyz",
  "status": "confirmed",
  "total": 50000,
  "platform_fee": 7500,
  "vendor_payout": 42500,
  ...
}
```

#### List Customer Bookings
```
GET /api/bookings/customer/:customerId

Response:
[
  { booking object 1 },
  { booking object 2 },
  ...
]
```

### Refunds

#### Request Refund
```
POST /api/bookings/:bookingId/refund
Content-Type: application/json

{
  "reason": "Changed my mind"
}

Response:
{
  "success": true,
  "refundId": "re_test_...",
  "refundAmount": 25000,
  "reason": "50% refund (within 7 days)"
}
```

Refund logic:
- **More than 7 days before event**: Full refund (100%)
- **Less than 7 days before event**: 50% refund
- **After event**: No refund

### Vendor Earnings

#### Get Vendor Monthly Earnings
```
GET /api/vendors/:vendorId/earnings

Response:
[
  {
    "id": "earning_123",
    "vendor_id": "vendor-xyz",
    "month": "2024-05",
    "amount": 125000,
    "status": "pending"
  },
  ...
]
```

### Health Check

```
GET /health

Response:
{
  "status": "ok",
  "timestamp": "2024-05-15T10:30:00Z"
}
```

## Database Schema

### Bookings Table
```sql
- id (TEXT PRIMARY KEY)
- customer_id (TEXT)
- vendor_id (TEXT)
- package_id (TEXT)
- customer_name (TEXT)
- customer_email (TEXT)
- vendor_name (TEXT)
- package_name (TEXT)
- event_type (TEXT)
- event_date (TIMESTAMP)
- location (TEXT)
- special_requests (TEXT)
- total (INTEGER - in cents)
- platform_fee (INTEGER - in cents)
- vendor_payout (INTEGER - in cents)
- payment_intent_id (TEXT UNIQUE)
- status (TEXT): pending | confirmed | completed | cancelled | refunded
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Payment Transactions Table
```sql
- id (TEXT PRIMARY KEY)
- booking_id (TEXT FOREIGN KEY)
- payment_intent_id (TEXT)
- customer_id (TEXT)
- vendor_id (TEXT)
- amount (INTEGER - in cents)
- fee (INTEGER - in cents)
- vendor_amount (INTEGER - in cents)
- status (TEXT): pending | completed | failed | refunded
- created_at (TIMESTAMP)
```

### Vendor Earnings Table
```sql
- id (TEXT PRIMARY KEY)
- vendor_id (TEXT)
- booking_id (TEXT FOREIGN KEY)
- month (TEXT - format: YYYY-MM)
- amount (INTEGER - in cents)
- status (TEXT): pending | paid | failed
- payout_date (TIMESTAMP)
- created_at (TIMESTAMP)
```

## Webhook Handling

The server listens for Stripe webhook events at `/api/webhooks/stripe`

### Supported Events

1. **payment_intent.succeeded** - Payment completed
   - Confirms booking is complete

2. **payment_intent.payment_failed** - Payment failed
   - Updates booking status

3. **charge.refunded** - Refund processed
   - Updates refund status

### Setting Up Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Events to send:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click "Add endpoint"
6. Copy the signing secret to `STRIPE_WEBHOOK_SECRET` in `.env`

## Testing

### Test Payment Flow Locally

1. Start the server: `npm run dev`
2. Frontend should be running at `http://localhost:5173`
3. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
4. Use any future expiration date and CVC

### Test Webhook Locally

Use Stripe CLI to forward webhooks:
```bash
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

This will give you a webhook signing secret to use in `.env`

## Architecture

```
request: Frontend (React) 
    ↓
request: Express API Server (Node.js)
    ↓
    → Stripe API (payment processing)
    → Supabase (database)
    ↓
response: JSON
    ↓
Frontend update
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad request (missing fields, validation error)
- `404` - Not found
- `500` - Server error

## Development Tips

- Check server logs for detailed error messages
- Use Stripe Dashboard to inspect payment intents and charges
- Use Supabase dashboard to inspect database records
- Test refunds with different time margins to event date

## Production Deployment

Before deploying to production:

1. ✅ Update `STRIPE_SECRET_KEY` to live key (starts with `sk_live_`)
2. ✅ Update `STRIPE_WEBHOOK_SECRET` to production webhook secret
3. ✅ Set `NODE_ENV=production`
4. ✅ Use production Supabase project
5. ✅ Enable HTTPS on frontend and backend
6. ✅ Update `FRONTEND_URL` to production domain
7. ✅ Set up environment variables on hosting platform (Vercel, Railway, etc.)

## Troubleshooting

### "Invalid API Key" Error
- Check that `STRIPE_SECRET_KEY` is correct (should start with `sk_test_` or `sk_live_`)
- Make sure you're using the secret key, not the publishable key

### "Webhook signature verification failed"
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check that webhook is configured correctly in Stripe dashboard
- Use Stripe CLI for local testing

### "Database connection error"
- Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct
- Verify Supabase project is running
- Check firewall/network settings

### "Booking not found"
- Verify `bookingId` is correct
- Check database migrations were run successfully
- Verify RowLevelSecurity (RLS) policies allow access

## Security Considerations

- 🔒 Service Role Key should never be exposed to frontend
- 🔒 Webhook signature verification prevents replay attacks
- 🔒 RLS (Row Level Security) policies restrict data access
- 🔒 All sensitive data (keys, secrets) stored in `.env` (not committed)
- 🔒 CORS configured to only allow frontend origin

## Support

For issues or questions:
1. Check logs: `NODE_DEBUG=* npm run dev`
2. Review Stripe documentation: https://stripe.com/docs
3. Review Supabase documentation: https://supabase.com/docs
4. Check EventzHub documentation
