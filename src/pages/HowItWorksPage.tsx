import { Search, CalendarCheck, ShieldCheck, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { icon: Search, title: "Search & Compare", desc: "Browse through hundreds of verified vendors. Filter by category, location, price, and rating to find the perfect match for your event. Read reviews from real customers." },
  { icon: CalendarCheck, title: "Book Instantly", desc: "Found the right vendor? Select your package, choose your event date, and book instantly. No back-and-forth — everything is streamlined for you." },
  { icon: ShieldCheck, title: "Pay Securely", desc: "Pay through EventzHub's secure payment system. Your money is held safely and only released to the vendor after your event is complete. Full peace of mind." },
  { icon: Star, title: "Leave a Review", desc: "After your event, share your experience by leaving a review. Help other families make great choices and reward amazing vendors." },
];

const HowItWorksPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">How EventzHub Works</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">Plan your perfect event in 4 simple steps. From finding the right vendor to leaving your review — we've got you covered.</p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <Card key={i} className="relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full accent-gradient flex items-center justify-center text-accent-foreground">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-4xl font-bold text-muted-foreground/20">0{i + 1}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default HowItWorksPage;
