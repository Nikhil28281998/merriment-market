# EventzHub Payment System - Reference Card

## 🚀 Quick Commands

```bash
# Backend setup
cd server && npm install
npm run dev                    # Start backend on :3001
npm run migrate              # Run database migrations

# Frontend (in root directory)
npm run dev                    # Start frontend on :5173

# Database migrations
# Copy contents of server/migrations.sql
# Paste into Supabase SQL Editor
# Click Run
```

---

## 📋 Environment Variables

### Frontend `.root/.env`
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://...supabase.co
VITE_SUPABASE_ANON_KEY=...
VITE_MAPBOX_TOKEN=...
```

### Backend `server/.env`
```env
PORT=3001
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🔑 Where to Get Credentials

| Credential | Source | Format |
|-----------|--------|--------|
| Stripe Publishable Key | Stripe Dashboard → Developers → API Keys | `pk_test_*` |
| Stripe Secret Key | Stripe Dashboard → Developers → API Keys | `sk_test_*` |
| Stripe Webhook Secret | Stripe Dashboard → Developers → Webhooks | `whsec_test_*` |
| Supabase URL | Supabase Dashboard → Settings → API | `https://...supabase.co` |
| Supabase Key | Supabase Dashboard → Settings → API → Public/Service Role | Long JWT token |

---

## 🔗 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/payments/create-intent` | Create Stripe intent |
| POST | `/api/bookings/confirm-payment` | Save booking |
| GET | `/api/bookings/:bookingId` | Get booking details |
| GET | `/api/bookings/customer/:id` | List customer bookings |
| POST | `/api/bookings/:id/refund` | Process refund |
| GET | `/api/vendors/:id/earnings` | Get earnings |
| POST | `/api/webhooks/stripe` | Stripe webhook |

---

## 💳 Test Cards

| Card | Number | Purpose |
|------|---------|---------|
| Visa | `4242 4242 4242 4242` | Successful payment |
| Visa | `4000 0000 0000 0002` | Payment declined |
| Visa | `4000 0025 0000 3155` | Requires 3D Secure |

**Expiry**: Any future date (e.g., 12/25)  
**CVC**: Any 3 digits (e.g., 123)

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `server/src/index.js` | Backend API server (500+ lines) |
| `server/migrations.sql` | Database schema & RLS policies |
| `src/lib/payment-api.ts` | Frontend API service layer |
| `src/lib/payment-types.ts` | TypeScript interfaces |
| `src/pages/Cart.tsx` | Payment processing page |
| `src/pages/BookingConfirmation.tsx` | Confirmation page |
| `.env.example` | Frontend env template |
| `server/.env.example` | Backend env template |

---

## 📚 Documentation

| Document | Content |
|----------|---------|
| `QUICK_START.md` | 5-minute setup guide |
| `PAYMENT_SETUP.md` | Detailed setup with screenshots |
| `IMPLEMENTATION_STATUS.md` | Full completion report |
| `server/README.md` | Server API documentation |

---

## ✅ Setup Checklist

- [ ] Stripe account created
- [ ] Supabase project created
- [ ] Stripe API keys obtained
- [ ] Supabase credentials obtained
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Database migrations run
- [ ] `npm install` completed (both root and server/)
- [ ] Backend running on :3001
- [ ] Frontend running on :5173
- [ ] Test payment successful
- [ ] Booking visible in Supabase
- [ ] Payment visible in Stripe Dashboard

---

## 🔒 Security Notes

- 🔐 Service Role Key stays in backend only
- 🔐 Webhook signature verified
- 🔐 RLS policies protect user data
- 🔐 All `.env` files in `.gitignore`
- 🔐 CORS configured for frontend
- 🔐 No secrets in localStorage

---

## 🐛 Quick Troubleshooting

### "Cannot find module express"
```bash
cd server && npm install
```

### "Connection refused"
- Is backend running? `npm run dev` in server folder
- Check port 3001 not blocked

### "Invalid Supabase URL"
- Go to Supabase → Settings → API
- Copy exact URL shown

### "Payment failed"
- Check DevTools Network tab for error
- Check Stripe keys (test vs live)
- Verify email was entered

### "Booking not found"
- Check migrations ran in Supabase
- Try: `SELECT * FROM bookings;` in SQL Editor

---

## 📊 Database Tables

```
bookings
├── id, customer_id, vendor_id, package_id
├── total, platform_fee, vendor_payout
├── payment_intent_id (unique)
├── status (pending|confirmed|completed|cancelled|refunded)
└── Indexes: customer_id, vendor_id, status, payment_intent_id

payment_transactions
├── id, booking_id, payment_intent_id
├── customer_id, vendor_id
├── amount, fee, vendor_amount
└── status (pending|completed|failed|refunded)

vendor_earnings
├── id, vendor_id, booking_id
├── month (YYYY-MM format)
├── amount, status (pending|paid|failed)
└── payout_date

booking_drafts
├── id, user_id, vendor_id, package_id
└── draft_payload (JSONB)
```

---

## 🚀 Next Steps

1. Follow **QUICK_START.md** for 5-minute setup
2. Test with Stripe test card
3. Verify booking in Supabase
4. Deploy backend to production
5. Switch to live Stripe keys
6. Deploy frontend
7. Process first real payment! 🎉

---

## 💡 Key Flows

### Payment Flow
1. Customer adds items → Cart
2. Enters email → Clicks "Pay"
3. Frontend creates PaymentIntent → Gets clientSecret
4. Stripe confirms payment
5. Frontend confirms on backend
6. Backend saves booking to DB
7. Show confirmation page

### Vendor Earnings
1. Payment confirmed
2. Backend creates vendor_earnings record
3. Vendor Dashboard queries earnings table
4. Shows by month with status (pending/paid)

### Refund Flow
1. Customer requests refund
2. Backend checks days until event
3. If <7 days: 50% refund
4. If >=7 days: 100% refund
5. Stripe processes refund
6. DB updated with status

---

## 📞 Support Resources

- **Stripe**: https://stripe.com/docs
- **Supabase**: https://supabase.com/docs
- **Express**: https://expressjs.com
- **React**: https://react.dev

---

**EventzHub Payment System v1.0**  
*Everything you need to process payments in EventzHub*
