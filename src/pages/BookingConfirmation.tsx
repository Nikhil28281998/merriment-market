import { Link } from "react-router-dom";
import { CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BookingConfirmation = () => (
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

          <div className="border rounded-xl p-5 text-left space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Vendor</span><span className="font-semibold">Sarah Mitchell Photography</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Package</span><span className="font-semibold">Premium</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Event Date</span><span className="font-semibold">May 15, 2026</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Paid</span><span className="font-semibold">$1,380</span></div>
          </div>

          <div className="border rounded-xl p-5 text-left space-y-2 text-sm">
            <p className="font-semibold mb-2">Vendor Contact</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> (555) 123-4567</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> sarah@mitchellphoto.com</p>
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

export default BookingConfirmation;
