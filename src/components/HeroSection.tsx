import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { eventTypes } from "@/data/mockData";

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
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-40" />
      <div className="container relative py-20 md:py-32 text-center">
        <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
          Make Every Celebration<br />
          <span className="text-accent">Unforgettable</span>
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Find and book photographers, decorators, caterers, DJs and more for any event
        </p>

        {/* Search bar */}
        <div className="bg-background rounded-2xl shadow-2xl p-3 md:p-4 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
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

            <Input
              placeholder="Location (city or zip)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 h-12"
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

            <Button variant="hero" size="lg" className="h-12 px-8" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search Vendors
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
