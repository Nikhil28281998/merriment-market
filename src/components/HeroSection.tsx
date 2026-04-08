import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { eventTypes } from "@/data/mockData";
import LocationAutocomplete from "@/components/LocationAutocomplete";

const STATS = [
  { value: "500+", label: "Vendors" },
  { value: "50", label: "Cities" },
  { value: "19", label: "Event Types" },
  { value: "4.9★", label: "Avg Rating" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (eventType) params.set("event", eventType);
    if (location) params.set("location", location);
    if (date) params.set("date", date.toISOString());
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <section className="hero-gradient relative overflow-hidden min-h-[700px] flex items-center">
      {/* Fine grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Subtle gold radial glow at top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-[hsl(43,75%,50%)] opacity-[0.07] blur-3xl pointer-events-none" />

      {/* Floating orbs in deep jewel tones */}
      <div className="absolute top-16 left-[7%] w-64 h-64 rounded-full bg-[hsl(158,50%,28%)] opacity-[0.12] blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-[8%] w-80 h-80 rounded-full bg-[hsl(348,50%,30%)] opacity-[0.13] blur-3xl pointer-events-none" style={{ animation: "float 5s ease-in-out 2s infinite" }} />

      {/* Thin gold border lines (decorative) */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[hsl(43,80%,55%)] to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(43,80%,55%)] to-transparent opacity-20" />

      <div className="container relative py-24 md:py-40 text-center">
        {/* Ornamental eyebrow */}
        <div className="gold-divider justify-center mb-7 max-w-[320px] mx-auto">
          <span className="section-eyebrow text-[hsl(43,82%,62%)]">Premium Event Marketplace</span>
        </div>

        {/* Main display headline */}
        <h1 className="font-display italic text-6xl md:text-8xl font-bold text-white mb-4 leading-[1.04] tracking-tight">
          Make Every
        </h1>
        <h1 className="font-heading text-5xl md:text-7xl font-extrabold mb-4 leading-[1.06] tracking-tight">
          <span className="animate-gold-shimmer">Celebration</span>
        </h1>
        <h1 className="font-display italic text-6xl md:text-8xl font-bold text-white/90 mb-8 leading-[1.04] tracking-tight">
          Unforgettable
        </h1>

        <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
          Discover and book the finest photographers, decorators, caterers, DJs and more — curated for every celebration.
        </p>

        {/* Gold-trimmed search card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[hsl(43,70%,40%)] via-[hsl(43,85%,60%)] to-[hsl(43,70%,40%)] opacity-60 blur-sm" />
          <div className="relative bg-[hsl(38,30%,98%)] rounded-2xl shadow-2xl p-5 ring-1 ring-[hsl(43,60%,55%)/0.3]">
            <div className="flex flex-col gap-3 md:flex-row">
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="flex-1 h-12 border-border">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <LocationAutocomplete
                value={location}
                onChange={setLocation}
                placeholder="Location (city or state)"
                className="h-12"
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("flex-1 h-12 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Event Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>

              <Button variant="hero" size="lg" className="h-12 px-8 min-h-[44px] glow-gold" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Find Vendors
              </Button>
            </div>
          </div>
        </div>

        {/* Stats row with gold dividers */}
        <div className="flex items-center justify-center gap-6 md:gap-12 mt-14">
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-6 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-gradient-gold leading-none">{value}</div>
                <div className="text-[10px] text-white/45 mt-1.5 tracking-[0.15em] uppercase">{label}</div>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-[hsl(43,70%,55%,0.4)] to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
