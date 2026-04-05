import { Search, CalendarCheck, ShieldCheck, MessageSquare } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Search & Compare", description: "Browse hundreds of vendors by category, location, and event type" },
  { icon: CalendarCheck, title: "Book Instantly", description: "Select a package, pick your date, and book in minutes" },
  { icon: ShieldCheck, title: "Pay Securely", description: "Your payment is held safely and released only after your event" },
  { icon: MessageSquare, title: "Leave a Review", description: "Share your experience and help other families find great vendors" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-16 md:py-24">
    <div className="container">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Why EventzHub?</h2>
      <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
        We make it easy to plan your perfect event in four simple steps
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map(({ icon: Icon, title, description }, i) => (
          <div key={title} className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-5 rounded-2xl hero-gradient flex items-center justify-center shadow-lg">
              <Icon className="h-7 w-7 text-primary-foreground" />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full accent-gradient flex items-center justify-center text-xs font-bold text-accent-foreground shadow">{i + 1}</span>
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
