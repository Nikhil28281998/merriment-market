import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Stripe WebHook endpoint (needs raw body, so put before express.json)
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// ============================================================================
// PAYMENT API ENDPOINTS
// ============================================================================

/**
 * POST /api/payments/create-intent
 * Create a Stripe PaymentIntent for a booking
 */
app.post('/api/payments/create-intent', async (req, res) => {
  try {
    const { bookingData, customerId } = req.body;

    if (!bookingData || !customerId) {
      return res.status(400).json({ error: 'Missing bookingData or customerId' });
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: bookingData.total,
      currency: 'usd',
      metadata: {
        customerId,
        vendorId: bookingData.vendorId,
        packageId: bookingData.packageId,
        bookingData: JSON.stringify(bookingData),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      bookingData,
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/bookings/confirm-payment
 * Confirm payment and create booking record
 */
app.post('/api/bookings/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId, bookingData, customerId } = req.body;

    if (!paymentIntentId || !bookingData || !customerId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Retrieve the PaymentIntent to verify it succeeded
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // Create booking record in Supabase
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        id: `booking_${Date.now()}`,
        customer_id: customerId,
        vendor_id: bookingData.vendorId,
        package_id: bookingData.packageId,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        vendor_name: bookingData.vendorName,
        package_name: bookingData.packageName,
        event_type: bookingData.eventType,
        event_date: bookingData.eventDate,
        location: bookingData.location,
        special_requests: bookingData.specialRequests || '',
        
        total: bookingData.total,
        platform_fee: bookingData.platformFee,
        vendor_payout: bookingData.vendorPayout,
        
        payment_intent_id: paymentIntentId,
        status: 'confirmed',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (bookingError) {
      throw bookingError;
    }

    // Create payment transaction record
    await supabase.from('payment_transactions').insert({
      id: `txn_${Date.now()}`,
      booking_id: booking.id,
      payment_intent_id: paymentIntentId,
      customer_id: customerId,
      vendor_id: bookingData.vendorId,
      amount: bookingData.total,
      fee: bookingData.platformFee,
      vendor_amount: bookingData.vendorPayout,
      status: 'completed',
      created_at: new Date().toISOString(),
    });

    // Create vendor earnings record
    await supabase.from('vendor_earnings').insert({
      id: `earning_${Date.now()}`,
      vendor_id: bookingData.vendorId,
      booking_id: booking.id,
      month: new Date().toISOString().slice(0, 7),
      amount: bookingData.vendorPayout,
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    res.json({
      success: true,
      bookingId: booking.id,
      paymentIntentId,
      bookingData: booking,
    });
  } catch (err) {
    console.error('Error confirming payment:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/bookings/:bookingId
 * Fetch booking details
 */
app.get('/api/bookings/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;

    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/bookings/customer/:customerId
 * Fetch all bookings for a customer
 */
app.get('/api/bookings/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(bookings || []);
  } catch (err) {
    console.error('Error fetching customer bookings:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/bookings/:bookingId/refund
 * Request a refund for a booking
 */
app.post('/api/bookings/:bookingId/refund', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    // Get booking details
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (bookingError) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Determine refund amount based on event date
    const eventDate = new Date(booking.event_date);
    const today = new Date();
    const daysUntilEvent = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));

    let refundAmount = booking.total;
    if (daysUntilEvent < 7) {
      // Less than 7 days: 50% refund
      refundAmount = Math.floor(booking.total * 0.5);
    }
    // More than 7 days: Full refund

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: booking.payment_intent_id,
      amount: refundAmount,
      reason: 'requested_by_customer',
      metadata: {
        bookingId,
        reason,
        daysUntilEvent,
      },
    });

    // Update booking status
    await supabase
      .from('bookings')
      .update({ status: 'refunded' })
      .eq('id', bookingId);

    // Log refund transaction
    await supabase.from('payment_transactions').insert({
      id: `txn_refund_${Date.now()}`,
      booking_id: bookingId,
      payment_intent_id: booking.payment_intent_id,
      customer_id: booking.customer_id,
      vendor_id: booking.vendor_id,
      amount: -refundAmount,
      fee: 0,
      vendor_amount: 0,
      status: 'refunded',
      created_at: new Date().toISOString(),
    });

    res.json({
      success: true,
      refundId: refund.id,
      refundAmount,
      reason: daysUntilEvent < 7 ? '50% refund (within 7 days)' : 'Full refund',
    });
  } catch (err) {
    console.error('Error requesting refund:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/vendors/:vendorId/earnings
 * Get vendor earnings by month
 */
app.get('/api/vendors/:vendorId/earnings', async (req, res) => {
  try {
    const { vendorId } = req.params;

    const { data: earnings, error } = await supabase
      .from('vendor_earnings')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('month', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(earnings || []);
  } catch (err) {
    console.error('Error fetching vendor earnings:', err);
    res.status(500).json({ error: err.message });
  }
});

// ============================================================================
// WEBHOOK EVENT HANDLERS
// ============================================================================

async function handlePaymentSucceeded(paymentIntent) {
  console.log(`Payment succeeded: ${paymentIntent.id}`);
  
  // Booking already created in confirm-payment endpoint
  // This is for async confirmation or additional processing
}

async function handlePaymentFailed(paymentIntent) {
  console.log(`Payment failed: ${paymentIntent.id}`);
  
  // Mark any related bookings as failed
  // Send notification to customer
}

async function handleRefund(charge) {
  console.log(`Charge refunded: ${charge.id}`);
  
  // Update booking status if needed
  // Send notification to vendor
}

// ============================================================================
// HEALTH CHECK & ERROR HANDLING
// ============================================================================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`🚀 EventzHub Server running on http://localhost:${port}`);
  console.log(`📊 API endpoints ready`);
  console.log(`🔔 Webhook listener ready at /api/webhooks/stripe`);
});
