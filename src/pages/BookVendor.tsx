import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockVendors } from "@/data/mockData";

const BookVendor = () => {
  const { vendorId } = useParams();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("package");
  const vendor = mockVendors.find(v => v.id === vendorId);
  const pkg = vendor?.packages.find(p => p.id === packageId) ?? vendor?.packages[0];

  const [eventDate, setEventDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [requests, setRequests] = useState("");

  if (!vendor || !pkg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Vendor or package not found.</p></main>
        <Footer />
      </div>
    );
  }

  const serviceFee = Math.round(pkg.price * 0.15);
  const total = pkg.price + serviceFee;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">Complete Your Booking</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start mt-1", !eventDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={eventDate} onSelect={setEventDate} className="pointer-events-auto" disabled={d => d < new Date()} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Event Location / Address</Label>
                  <Input className="mt-1" placeholder="123 Main St, City, State" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div>
                  <Label>Number of Guests</Label>
                  <Input className="mt-1" type="number" placeholder="50" value={guests} onChange={e => setGuests(e.target.value)} />
                </div>
                <div>
                  <Label>Special Requests</Label>
                  <Textarea className="mt-1" placeholder="Any specific requirements..." value={requests} onChange={e => setRequests(e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={vendor.photo} alt={vendor.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{pkg.name}</p>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Package Price</span><span>${pkg.price}</span></div>
                  <div className="flex justify-between"><span>Service Fee (15%)</span><span>${serviceFee}</span></div>
                  <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>${total}</span></div>
                </div>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/booking-confirmation">Confirm and Pay</Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">Your payment is held securely. Released to vendor only after your event.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookVendor;
