// Backend API skeleton - Payment endpoints
// This file serves as reference for what backend needs to implement
// Firebase Cloud Functions / Node.js / Supabase Functions pattern

/**
 * POST /api/payments/create-intent
 * Creates a Stripe PaymentIntent and returns clientSecret
 */
export const createPaymentIntent = async (req, res) => {
  const { bookingData, customerId, amount } = req.body;

  try {
    // Initialize Stripe
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      customer: customerId,
      metadata: {
        vendorId: bookingData.vendorId,
        eventDate: bookingData.eventDate,
        eventType: bookingData.eventType,
      },
      description: `EventzHub Booking - ${bookingData.vendorName}`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      bookingData,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/bookings/confirm-payment
 * Confirms payment and creates booking record
 */
export const confirmPayment = async (req, res) => {
  const { paymentIntentId, bookingData, customerId } = req.body;

  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Verify payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ error: "Payment not successful" });
    }

    // Create booking record in database
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        customer_id: customerId,
        vendor_id: bookingData.vendorId,
        vendor_name: bookingData.vendorName,
        category: bookingData.category,
        package_name: bookingData.packageName,
        event_date: bookingData.eventDate,
        event_type: bookingData.eventType,
        subtotal: bookingData.subtotal,
        bundle_discount: bookingData.bundleDiscount,
        promo_discount: bookingData.promoDiscount,
        event_hub_fee: bookingData.serviceFee,
        total_amount: bookingData.total,
        vendor_payout_amount: bookingData.vendorPayoutAmount,
        payment_status: "charged",
        booking_status: "confirmed",
        payment_intent_id: paymentIntentId,
        created_at: new Date(),
      })
      .select()
      .single();

    if (error) throw error;

    // Log transaction
    await supabase.from("payment_transactions").insert({
      booking_id: booking.id,
      type: "charge",
      amount: bookingData.total * 100,
      stripe_id: paymentIntentId,
      status: "succeeded",
      description: `Booking confirmed - ${bookingData.vendorName}`,
    });

    // TODO: Send confirmation emails to customer & vendor

    res.json({ bookingId: booking.id, success: true });
  } catch (error) {
    console.error("Confirm payment error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/bookings/:bookingId
 * Get booking details
 */
export const getBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (error) throw error;

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /webhooks/stripe
 * Handle Stripe webhook events
 */
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const { createClient } = require("@supabase/supabase-js");
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const { id, amount, metadata } = event.data.object;
        console.log(`✅ Payment succeeded: ${id}`);

        // Update booking
        await supabase
          .from("bookings")
          .update({ payment_status: "charged" })
          .eq("payment_intent_id", id);
        break;

      case "payment_intent.payment_failed":
        console.log(`❌ Payment failed: ${event.data.object.id}`);

        // Update booking
        await supabase
          .from("bookings")
          .update({ payment_status: "failed" })
          .eq("payment_intent_id", event.data.object.id);
        break;

      case "charge.refunded":
        console.log(`🔄 Refund processed: ${event.data.object.id}`);

        // Update booking & create refund transaction
        const booking = await supabase
          .from("bookings")
          .select("*")
          .eq("payment_intent_id", event.data.object.id)
          .single();

        if (booking.data) {
          await supabase
            .from("bookings")
            .update({ payment_status: "refunded" })
            .eq("id", booking.data.id);

          await supabase.from("payment_transactions").insert({
            booking_id: booking.data.id,
            type: "refund",
            amount: event.data.object.amount_refunded,
            stripe_id: event.data.object.id,
            status: "succeeded",
          });
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /api/bookings/:bookingId/refund
 * Request refund for booking
 */
export const requestRefund = async (req, res) => {
  const { bookingId } = req.params;
  const { reason } = req.body;

  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Get booking
    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Calculate refund amount based on event date
    const eventDate = new Date(booking.event_date);
    const today = new Date();
    const daysUntilEvent = Math.floor(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    let refundAmount;
    if (daysUntilEvent > 7) {
      // Full refund if > 7 days before
      refundAmount = booking.total_amount;
    } else {
      // 50% refund if < 7 days before (EventzHub keeps platform fee)
      refundAmount = booking.vendor_payout_amount;
    }

    // Process refund via Stripe
    const refund = await stripe.refunds.create({
      payment_intent: booking.payment_intent_id,
      amount: refundAmount * 100,
    });

    // Update booking
    await supabase
      .from("bookings")
      .update({
        payment_status: "refunded",
        booking_status: "cancelled",
        notes: reason,
      })
      .eq("id", bookingId);

    res.json({ success: true, refundAmount });
  } catch (error) {
    console.error("Refund request error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /api/vendors/:vendorId/earnings
 * Get vendor earnings summary
 */
export const getVendorEarnings = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Get earnings by month
    const { data: earnings } = await supabase
      .from("vendor_earnings")
      .select("*")
      .eq("vendor_id", vendorId)
      .order("month", { ascending: false });

    // Get this month's bookings
    const thisMonth = new Date().toISOString().slice(0, 7);
    const { data: thisMonthBookings } = await supabase
      .from("bookings")
      .select("*")
      .eq("vendor_id", vendorId)
      .eq("payment_status", "charged")
      .gte("created_at", `${thisMonth}-01`);

    const thisMonthTotal = thisMonthBookings?.reduce(
      (sum, b) => sum + b.vendor_payout_amount,
      0
    ) || 0;

    res.json({
      historical: earnings,
      thisMonth: thisMonthTotal,
      totalEarnings: earnings.reduce((sum, e) => sum + e.total_payout, 0),
    });
  } catch (error) {
    console.error("Get earnings error:", error);
    res.status(500).json({ error: error.message });
  }
};
