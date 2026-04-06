import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Tag, ShieldCheck, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  EVENTZHUB20: 20,
  SAVE15: 15,
};

const Cart = () => {
  const { items, removeItem, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = items.reduce((sum, item) => sum + item.package.price, 0);
  const bundleDiscount = items.length >= 2 ? Math.round(subtotal * 0.1) : 0;
  const afterBundle = subtotal - bundleDiscount;
  const promoDiscount = appliedPromo ? Math.round(afterBundle * (appliedPromo.percent / 100)) : 0;
  const afterPromo = afterBundle - promoDiscount;
  const serviceFee = Math.round(afterPromo * 0.15);
  const total = afterPromo + serviceFee;

  const applyPromo = () => {
    const discount = PROMO_CODES[promoCode.toUpperCase()];
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), percent: discount });
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
            <Button variant="accent" asChild>
              <Link to="/browse">Browse Vendors</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.vendor.id}-${item.package.id}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={item.vendor.photo} alt={item.vendor.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold truncate">{item.vendor.name}</p>
                      <p className="text-sm text-muted-foreground">{item.package.name}</p>
                      <p className="text-xs text-muted-foreground">{item.vendor.category}</p>
                    </div>
                    <p className="font-bold text-lg shrink-0">${item.package.price}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.vendor.id, item.package.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {items.length >= 2 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Bundle discount applied! 10% off for booking 2+ vendors.
                </div>
              )}

              {/* Promo Code */}
              <Card>
                <CardContent className="p-4">
                  <Label className="text-sm font-semibold mb-2 block">Promo Code</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={applyPromo}>Apply</Button>
                  </div>
                  {promoError && <p className="text-destructive text-xs mt-1">{promoError}</p>}
                  {appliedPromo && <p className="text-green-600 text-xs mt-1">{appliedPromo.code} applied — {appliedPromo.percent}% off!</p>}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader><CardTitle className="text-lg">Payment Method</CardTitle></CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">Credit / Debit Card</Label>
                    </div>
                    <div className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="apple" id="apple" />
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="apple" className="cursor-pointer flex-1">Apple Pay</Label>
                    </div>
                    <div className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="google" id="google" />
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="google" className="cursor-pointer flex-1">Google Pay</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({items.length} vendor{items.length > 1 ? "s" : ""})</span>
                    <span>${subtotal}</span>
                  </div>
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Bundle Discount (10%)</span>
                      <span>-${bundleDiscount}</span>
                    </div>
                  )}
                  {promoDiscount > 0 && appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Promo ({appliedPromo.code})</span>
                      <span>-${promoDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>EventzHub Service Fee (15%)</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  <Button variant="hero" className="w-full min-h-[44px]" asChild>
                    <Link to="/booking-confirmation">Confirm and Pay</Link>
                  </Button>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
                    Payment held safely in escrow until your event is complete.
                  </div>
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
