import { Search, CalendarCheck, ShieldCheck, MessageSquare } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Search & Compare", description: "Browse hundreds of vendors by category, location, and event type", bg: "from-[hsl(222,60%,12%)] to-[hsl(222,55%,22%)]" },
  { icon: CalendarCheck, title: "Book Instantly", description: "Select a package, pick your date, and book in minutes", bg: "from-[hsl(348,50%,18%)] to-[hsl(348,45%,28%)]" },
  { icon: ShieldCheck, title: "Pay Securely", description: "Your payment is held safely and released only after your event", bg: "from-[hsl(158,50%,14%)] to-[hsl(158,45%,22%)]" },
  { icon: MessageSquare, title: "Leave a Review", description: "Share your experience and help other families find great vendors", bg: "from-[hsl(43,60%,14%)] to-[hsl(43,55%,22%)]" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden">
    {/* Subtle background decoration */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

    <div className="container relative">
      <div className="text-center mb-14">
        <span className="section-eyebrow block mb-2">Simple Process</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why EventzHubz?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We make it easy to plan your perfect event in four simple steps
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line */}
        <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-200 via-rose-200 to-amber-200 pointer-events-none" />

        {STEPS.map(({ icon: Icon, title, description, bg }, i) => (
          <div key={title} className="text-center group">
            <div className="relative w-20 h-20 mx-auto mb-5">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${bg} opacity-30 group-hover:opacity-50 blur-md transition-opacity duration-300`} />
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                <Icon className="h-8 w-8 text-[hsl(43,82%,62%)]" />
              </div>
              <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full gold-gradient flex items-center justify-center text-xs font-extrabold text-[hsl(222,60%,10%)] shadow-md border-2 border-white">
                {i + 1}
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
