// Payment API service - handles communication with backend

import { BookingData, PaymentIntentResponse, PaymentResult, Booking } from "@/lib/payment-types";

// Set your backend API URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * Create a payment intent on the backend
 * Returns client secret to use with Stripe.js
 */
export async function createPaymentIntent(
  bookingData: BookingData,
  customerId: string
): Promise<PaymentIntentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
      body: JSON.stringify({
        bookingData,
        customerId,
        amount: bookingData.total,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment intent: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Payment intent creation error:", error);
    throw error;
  }
}

/**
 * Confirm payment on backend and create booking
 */
export async function confirmPayment(
  paymentIntentId: string,
  bookingData: BookingData,
  customerId: string
): Promise<PaymentResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/confirm-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
      body: JSON.stringify({
        paymentIntentId,
        bookingData,
        customerId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Payment confirmation failed",
      };
    }

    const data = await response.json();
    return {
      success: true,
      bookingId: data.bookingId,
      paymentIntentId,
    };
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get booking details
 */
export async function getBooking(bookingId: string): Promise<Booking | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching booking:", error);
    return null;
  }
}

/**
 * Get customer's bookings
 */
export async function getCustomerBookings(
  customerId: string
): Promise<Booking[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookings/customer/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return [];
  }
}

/**
 * Request refund for a booking
 */
export async function requestRefund(
  bookingId: string,
  reason: string
): Promise<PaymentResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error requesting refund:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Refund request failed",
    };
  }
}

/**
 * Get vendor earnings summary
 */
export async function getVendorEarnings(vendorId: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/vendors/${vendorId}/earnings`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching vendor earnings:", error);
    return null;
  }
}
