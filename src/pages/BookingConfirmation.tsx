import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingData } from "@/lib/payment-types";
import { getBooking } from "@/lib/payment-api";

interface BookingState {
  bookingId?: string;
  bookingData?: BookingData;
  paymentIntentId?: string;
}

const BookingConfirmation = () => {
  const { state } = useLocation();
  const bookingState = (state as BookingState) || {};
  const [booking, setBooking] = useState<BookingData | null>(
    bookingState.bookingData || null
  );
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(!booking && !!bookingState.bookingId);

  useEffect(() => {
    // If we have bookingId but no data, fetch from backend
    if (bookingState.bookingId && !booking) {
      getBooking(bookingState.bookingId)
        .then((data) => {
          if (data) {
            // Convert DB booking to BookingData format
            setBooking({
              customerId: data.customer_id,
              vendorId: data.vendor_id,
              vendorName: data.vendor_name,
              category: data.category,
              packageName: data.package_name,
              eventDate: data.event_date,
              eventType: data.event_type,
              subtotal: data.subtotal,
              bundleDiscount: data.bundle_discount,
              promoDiscount: data.promo_discount,
              serviceFee: data.event_hub_fee,
              total: data.total_amount,
              vendorPayoutAmount: data.vendor_payout_amount,
            });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [bookingState.bookingId, booking]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingState.paymentIntentId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-16 flex items-center justify-center">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="font-heading text-3xl font-bold">Your Booking is Confirmed!</h1>
            <p className="text-muted-foreground">We've sent a confirmation email with all the details.</p>

            {loading ? (
              <div className="border rounded-xl p-5 text-sm text-muted-foreground animate-pulse">
                Loading booking details...
              </div>
            ) : booking ? (
              <div className="space-y-4">
                <div className="border rounded-xl p-5 text-left space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vendor</span>
                    <span className="font-semibold">{booking.vendorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold text-accent">{booking.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package</span>
                    <span className="font-semibold">{booking.packageName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Date</span>
                    <span className="font-semibold">{booking.eventDate}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-muted-foreground">Total Paid</span>
                    <span className="font-bold text-lg">${(booking.total / 100).toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground bg-blue-50 rounded p-2">
                    💰 Vendor receives: ${(booking.vendorPayoutAmount / 100).toFixed(2)} after event completion<br/>
                    🏪 EventzHub fee: ${(booking.serviceFee / 100).toFixed(2)} (15% commission)
                  </div>
                </div>

                {bookingState.paymentIntentId && (
                  <div className="border rounded-xl p-3 text-left text-xs">
                    <p className="text-muted-foreground mb-2">Confirmation ID</p>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded">
                      <code className="flex-1 break-all">{bookingState.paymentIntentId}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyToClipboard}
                        className="shrink-0"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="border rounded-xl p-5 text-sm text-muted-foreground">
                Booking details could not be loaded. Please check your dashboard for confirmation.
              </div>
            )}

            <div className="border rounded-xl p-5 text-sm text-muted-foreground text-left space-y-1">
              <p className="font-semibold text-foreground mb-1">What Happens Next?</p>
              <ul className="space-y-1 text-xs">
                <li>✅ Confirmation email sent to your inbox</li>
                <li>💬 Message the vendor to confirm details</li>
                <li>📅 Event happens on the scheduled date </li>
                <li>💸 Payment released to vendor after event</li>
              </ul>
            </div>

            <Button variant="hero" size="lg" className="w-full" asChild>
              <Link to="/dashboard">View My Bookings</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};
