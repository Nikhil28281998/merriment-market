-- EventzHub Database Migrations
-- Copy and paste these into Supabase SQL Editor to set up the database

-- ============================================================================
-- BOOKINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  vendor_id TEXT NOT NULL,
  package_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  package_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date TIMESTAMP NOT NULL,
  location TEXT,
  special_requests TEXT,
  
  total INTEGER NOT NULL COMMENT 'Amount in cents',
  platform_fee INTEGER NOT NULL COMMENT 'Amount in cents',
  vendor_payout INTEGER NOT NULL COMMENT 'Amount in cents',
  
  payment_intent_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT bookings_status_check CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'refunded'))
);

CREATE INDEX idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX idx_bookings_vendor_id ON public.bookings(vendor_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_payment_intent_id ON public.bookings(payment_intent_id);

-- Set up RLS (Row Level Security)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (customer_id = auth.uid()::text);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (customer_id = auth.uid()::text);

-- ============================================================================
-- PAYMENT TRANSACTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  payment_intent_id TEXT NOT NULL,
  customer_id TEXT NOT NULL,
  vendor_id TEXT NOT NULL,
  amount INTEGER NOT NULL COMMENT 'Amount in cents',
  fee INTEGER NOT NULL COMMENT 'Amount in cents',
  vendor_amount INTEGER NOT NULL COMMENT 'Amount in cents',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT payment_transactions_status_check CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
);

CREATE INDEX idx_payment_transactions_booking_id ON public.payment_transactions(booking_id);
CREATE INDEX idx_payment_transactions_customer_id ON public.payment_transactions(customer_id);
CREATE INDEX idx_payment_transactions_vendor_id ON public.payment_transactions(vendor_id);
CREATE INDEX idx_payment_transactions_payment_intent_id ON public.payment_transactions(payment_intent_id);

-- ============================================================================
-- VENDOR EARNINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.vendor_earnings (
  id TEXT PRIMARY KEY,
  vendor_id TEXT NOT NULL,
  booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  month TEXT NOT NULL COMMENT 'Format: YYYY-MM',
  amount INTEGER NOT NULL COMMENT 'Amount in cents (vendor payout)',
  status TEXT DEFAULT 'pending',
  payout_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT vendor_earnings_status_check CHECK (status IN ('pending', 'paid', 'failed'))
);

CREATE INDEX idx_vendor_earnings_vendor_id ON public.vendor_earnings(vendor_id);
CREATE INDEX idx_vendor_earnings_month ON public.vendor_earnings(month);
CREATE INDEX idx_vendor_earnings_status ON public.vendor_earnings(status);

-- Set up RLS (Row Level Security)
ALTER TABLE public.vendor_earnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view their own earnings" ON public.vendor_earnings
  FOR SELECT USING (vendor_id = auth.uid()::text);

-- ============================================================================
-- BOOKING DRAFTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.booking_drafts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  vendor_id TEXT NOT NULL,
  package_id TEXT,
  draft_payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_booking_drafts_user_id ON public.booking_drafts(user_id);
CREATE INDEX idx_booking_drafts_vendor_id ON public.booking_drafts(vendor_id);

-- Set up RLS (Row Level Security)
ALTER TABLE public.booking_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own drafts" ON public.booking_drafts
  FOR ALL USING (user_id = auth.uid()::text);

-- ============================================================================
-- USEFUL VIEWS & FUNCTIONS
-- ============================================================================

-- View: Monthly vendor earnings summary
CREATE OR REPLACE VIEW public.vendor_monthly_earnings AS
SELECT
  vendor_id,
  month,
  COUNT(*) as booking_count,
  SUM(amount) as total_earnings,
  SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as paid_earnings,
  SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_earnings
FROM public.vendor_earnings
GROUP BY vendor_id, month
ORDER BY vendor_id, month DESC;

-- Function: Get customer total spent
CREATE OR REPLACE FUNCTION public.get_customer_total_spent(customer_uuid TEXT)
RETURNS INTEGER
LANGUAGE SQL
AS $$
  SELECT COALESCE(SUM(total), 0)::INTEGER
  FROM public.bookings
  WHERE customer_id = customer_uuid AND status IN ('confirmed', 'completed');
$$;

-- Function: Get vendor total earnings
CREATE OR REPLACE FUNCTION public.get_vendor_total_earnings(vendor_uuid TEXT)
RETURNS INTEGER
LANGUAGE SQL
AS $$
  SELECT COALESCE(SUM(amount), 0)::INTEGER
  FROM public.vendor_earnings
  WHERE vendor_id = vendor_uuid AND status = 'paid';
$$;

-- ============================================================================
-- DONE!
-- ============================================================================
-- All tables are now ready for the payment system
-- Next: Configure Stripe webhook to point to your server's /api/webhooks/stripe
