// Stripe configuration and utilities

export const STRIPE_CONFIG = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_",
  apiVersion: "2023-10-16",
};

export const PAYMENT_DEFAULTS = {
  currency: "usd",
  platformFeePercentage: 15, // 15% EventzHub commission
  minimumAmount: 100, // $1.00 in cents
};

/**
 * Calculate payment breakdown
 */
export function calculatePaymentBreakdown(
  items: Array<{ price: number }>,
  bundleDiscountPercent: number = 10,
  promoDiscountPercent: number = 0
) {
  // Subtotal of all items
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  // Apply bundle discount if 2+ items
  const bundleDiscount =
    items.length >= 2 ? Math.round(subtotal * (bundleDiscountPercent / 100)) : 0;
  const afterBundle = subtotal - bundleDiscount;

  // Apply promo discount
  const promoDiscount = Math.round(afterBundle * (promoDiscountPercent / 100));
  const afterPromo = afterBundle - promoDiscount;

  // Calculate platform fee (15%)
  const platformFee = Math.round(
    afterPromo * (PAYMENT_DEFAULTS.platformFeePercentage / 100)
  );

  // Calculate vendor payout (total minus platform fee)
  const vendorPayout = afterPromo - platformFee;

  // Total customer pays
  const total = afterPromo + platformFee;

  return {
    subtotal,
    bundleDiscount,
    afterBundle,
    promoDiscount,
    afterPromo,
    platformFee,
    vendorPayout,
    total,
    breakdown: {
      customerPays: total,
      vendorReceives: vendorPayout,
      platformKeeps: platformFee,
    },
  };
}

/**
 * Format amount for display (cents to dollars)
 */
export function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Format amount for Stripe API (dollars to cents)
 */
export function toStripeAmount(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Format amount from Stripe API (cents to dollars)
 */
export function fromStripeAmount(cents: number): number {
  return cents / 100;
}
