import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const migrations = [
  // Create bookings table
  `
  CREATE TABLE IF NOT EXISTS bookings (
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
    
    total INTEGER NOT NULL,
    platform_fee INTEGER NOT NULL,
    vendor_payout INTEGER NOT NULL,
    
    payment_intent_id TEXT UNIQUE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT status_check CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'refunded'))
  );
  
  CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);
  CREATE INDEX IF NOT EXISTS idx_bookings_vendor_id ON bookings(vendor_id);
  CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
  `,

  // Create payment_transactions table
  `
  CREATE TABLE IF NOT EXISTS payment_transactions (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL REFERENCES bookings(id),
    payment_intent_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    vendor_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    fee INTEGER NOT NULL,
    vendor_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT status_check CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
  );
  
  CREATE INDEX IF NOT EXISTS idx_payment_transactions_booking_id ON payment_transactions(booking_id);
  CREATE INDEX IF NOT EXISTS idx_payment_transactions_customer_id ON payment_transactions(customer_id);
  CREATE INDEX IF NOT EXISTS idx_payment_transactions_vendor_id ON payment_transactions(vendor_id);
  `,

  // Create vendor_earnings table
  `
  CREATE TABLE IF NOT EXISTS vendor_earnings (
    id TEXT PRIMARY KEY,
    vendor_id TEXT NOT NULL,
    booking_id TEXT NOT NULL REFERENCES bookings(id),
    month TEXT NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    payout_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT status_check CHECK (status IN ('pending', 'paid', 'failed'))
  );
  
  CREATE INDEX IF NOT EXISTS idx_vendor_earnings_vendor_id ON vendor_earnings(vendor_id);
  CREATE INDEX IF NOT EXISTS idx_vendor_earnings_month ON vendor_earnings(month);
  CREATE INDEX IF NOT EXISTS idx_vendor_earnings_status ON vendor_earnings(status);
  `,

  // Create booking_drafts table
  `
  CREATE TABLE IF NOT EXISTS booking_drafts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    vendor_id TEXT NOT NULL,
    package_id TEXT,
    draft_payload JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  
  CREATE INDEX IF NOT EXISTS idx_booking_drafts_user_id ON booking_drafts(user_id);
  `,
];

async function runMigrations() {
  console.log('🔄 Starting database migrations...');
  
  try {
    for (const migration of migrations) {
      console.log('📝 Running migration...');
      const { error } = await supabase.rpc('exec_sql', { sql: migration });
      
      if (error) {
        console.error('❌ Migration failed:', error);
      } else {
        console.log('✅ Migration completed');
      }
    }
    
    console.log('✨ All migrations completed successfully!');
  } catch (err) {
    console.error('❌ Migration script error:', err);
    process.exit(1);
  }
}

// Alternative: Use raw SQL execution if exec_sql RPC is not available
async function runMigrationsWithSQL() {
  console.log('🔄 Starting database migrations (SQL mode)...');
  
  try {
    // For now, log what would be executed
    console.log('📋 Generated SQL migrations:');
    migrations.forEach((migration, index) => {
      console.log(`\n--- Migration ${index + 1} ---`);
      console.log(migration);
    });
    
    console.log('\n⚠️  To run these migrations:');
    console.log('1. Go to Supabase SQL Editor');
    console.log('2. Copy and paste each migration above');
    console.log('3. Execute them one by one');
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
}

runMigrationsWithSQL();
