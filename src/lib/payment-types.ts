// Payment and booking type definitions

export interface CartItem {
  vendorId: string;
  vendorName: string;
  category: string;
  packageId: string;
  packageName: string;
  price: number;
  eventDate: string;
  eventType: string;
}

export interface BookingData {
  customerId: string;
  vendorId: string;
  vendorName: string;
  category: string;
  packageName: string;
  eventDate: string;
  eventType: string;
  subtotal: number;
  bundleDiscount: number;
  promoDiscount: number;
  serviceFee: number;
  total: number;
  vendorPayoutAmount: number;
  notes?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  bookingData: BookingData;
}

export interface PaymentResult {
  success: boolean;
  bookingId?: string;
  paymentIntentId?: string;
  error?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  vendorId: string;
  vendorName: string;
  category: string;
  packageName: string;
  eventDate: string;
  eventType: string;
  subtotal: number;
  bundleDiscount: number;
  promoDiscount: number;
  serviceFee: number;
  totalAmount: number;
  vendorPayoutAmount: number;
  paymentStatus: "pending" | "charged" | "failed" | "refunded";
  bookingStatus: "confirmed" | "in_progress" | "completed" | "cancelled";
  paymentIntentId: string;
  transferId?: string;
  createdAt: string;
  completedAt?: string;
  paidOutAt?: string;
  notes?: string;
}

export interface StripeConfig {
  publishableKey: string;
  secretKey?: string; // Backend only
  webhookSecret?: string; // Backend only
}
