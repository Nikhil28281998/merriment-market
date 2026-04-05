import { Link } from "react-router-dom";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VendorOnboardingConfirmation = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 container py-16 flex items-center justify-center">
      <Card className="max-w-lg w-full text-center">
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="font-heading text-3xl font-bold">Application Submitted!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Thank you for applying to list your services on EventzHub. Our team will review your profile and get back to you shortly.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground border rounded-xl p-4">
            <Clock className="h-5 w-5 text-accent" />
            <span>Expected review time: <span className="font-semibold text-foreground">within 24 hours</span></span>
          </div>
          <p className="text-sm text-muted-foreground">
            We'll send you an email once your profile is approved. In the meantime, you can explore the platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" className="flex-1" asChild>
              <Link to="/vendor-dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default VendorOnboardingConfirmation;
