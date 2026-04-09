import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ArrowRight, CalendarIcon, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { eventTypes } from "@/data/mockData";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import { Card, CardContent } from "@/components/ui/card";

type HeroSlide = {
  badge: string;
  headline: string;
  subtitle: string;
  image: string;
  accent: string;
};

type EventCard = {
  title: string;
  image: string;
};

type EventRow = {
  title: string;
  cards: EventCard[];
};

const SLIDES: HeroSlide[] = [
  {
    badge: "BABY SHOWER",
    headline: "Celebrate Every Precious Moment",
    subtitle: "Find photographers, decorators and priests for your baby shower",
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=1920&q=80",
    accent: "#f26d7d",
  },
  {
    badge: "WEDDINGS",
    headline: "Your Perfect Day Deserves the Best",
    subtitle: "Book top photographers, decorators, caterers and more",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80",
    accent: "#e8472a",
  },
  {
    badge: "BIRTHDAYS",
    headline: "Make Every Birthday Unforgettable",
    subtitle: "From kids to 100th birthdays — we have the perfect vendors",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&q=80",
    accent: "#ff8a00",
  },
  {
    badge: "HALLOWEEN",
    headline: "Hauntingly Good Celebrations",
    subtitle: "Book decorators, DJs and photographers for your Halloween party",
    image: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=1920&q=80",
    accent: "#f97316",
  },
  {
    badge: "CHRISTMAS",
    headline: "Spread the Holiday Magic",
    subtitle: "Find decorators, caterers and photographers for Christmas events",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1920&q=80",
    accent: "#22c55e",
  },
  {
    badge: "GRADUATION",
    headline: "Honor Every Achievement",
    subtitle: "Celebrate their success with the perfect event vendors",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80",
    accent: "#3b82f6",
  },
  {
    badge: "GENDER REVEAL",
    headline: "The Big Moment Deserves Big Style",
    subtitle: "Book photographers, decorators and cake designers for your reveal",
    image: "https://images.unsplash.com/photo-1587545759985-a759d28abe4a?w=1920&q=80",
    accent: "#a855f7",
  },
  {
    badge: "HOUSEWARMING",
    headline: "Welcome Home in Style",
    subtitle: "Find priests, decorators and caterers for your housewarming puja",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
    accent: "#14b8a6",
  },
];

const ROWS: EventRow[] = [
  {
    title: "Popular Events Near You",
    cards: [
      { title: "Wedding Reception", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
      { title: "Birthday Bash", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80" },
      { title: "Baby Shower", image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500&q=80" },
      { title: "Corporate Mixer", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80" },
      { title: "Housewarming", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80" },
      { title: "Anniversary Dinner", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&q=80" },
    ],
  },
  {
    title: "Baby & Family Celebrations",
    cards: [
      { title: "Naming Ceremony", image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500&q=80" },
      { title: "Gender Reveal", image: "https://images.unsplash.com/photo-1587545759985-a759d28abe4a?w=500&q=80" },
      { title: "Kids Birthday", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80" },
      { title: "Family Reunion", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&q=80" },
      { title: "First Birthday", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=500&q=80" },
      { title: "Milestone Party", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80" },
    ],
  },
  {
    title: "Cultural & Religious Events",
    cards: [
      { title: "Housewarming Puja", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80" },
      { title: "Engagement Ceremony", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80" },
      { title: "Temple Celebration", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=500&q=80" },
      { title: "Festival Gathering", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500&q=80" },
      { title: "Traditional Wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80" },
      { title: "Community Event", image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&q=80" },
    ],
  },
  {
    title: "Holiday & Seasonal Events",
    cards: [
      { title: "Christmas Party", image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500&q=80" },
      { title: "Halloween Night", image: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=500&q=80" },
      { title: "New Year Gala", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=500&q=80" },
      { title: "Graduation Party", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80" },
      { title: "Spring Garden Event", image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=500&q=80" },
      { title: "Summer Pool Party", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&q=80" },
    ],
  },
];

const AUTOPLAY_MS = 5000;

const ScrollRow = ({ row }: { row: EventRow }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = listRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < maxScrollLeft - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = listRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCards = (direction: "left" | "right") => {
    const el = listRef.current;
    if (!el) return;
    const cardWidth = 216;
    el.scrollBy({
      left: direction === "right" ? cardWidth * 3 : -cardWidth * 3,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-bold text-white">{row.title}</h3>
        <div className="hidden md:flex gap-2">
          {canLeft && (
            <button
              type="button"
              onClick={() => scrollByCards("left")}
              className="rounded-full border border-white/30 bg-black/35 p-2 text-white hover:bg-black/60 transition-colors"
              aria-label={`Scroll ${row.title} left`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {canRight && (
            <button
              type="button"
              onClick={() => scrollByCards("right")}
              className="rounded-full border border-white/30 bg-black/35 p-2 text-white hover:bg-black/60 transition-colors"
              aria-label={`Scroll ${row.title} right`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          ref={listRef}
          className="netflix-row flex gap-4 overflow-x-auto pb-2"
        >
          {row.cards.map((card) => (
            <Card
              key={`${row.title}-${card.title}`}
              className="netflix-card w-[200px] min-w-[200px] overflow-hidden border-white/10 bg-slate-900/60 text-white"
            >
              <div className="h-28 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-3">
                <p className="font-semibold text-sm mb-3 line-clamp-2">{card.title}</p>
                <Button
                  size="sm"
                  className="h-8 text-xs px-3 bg-[var(--hero-accent)] hover:opacity-90 text-white"
                  asChild
                >
                  <Link to={`/browse?event=${encodeURIComponent(card.title)}`}>Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {canRight && <div className="row-fade-right pointer-events-none absolute inset-y-0 right-0 w-20" />}
      </div>
    </section>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const pauseUntilRef = useRef<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);
  const pointerMovedRef = useRef(false);

  const activeSlide = SLIDES[currentSlide];

  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const first = new Image();
    first.src = SLIDES[0].image;
    first.onload = () => setFirstLoaded(true);
  }, []);

  useEffect(() => {
    const tickMs = 100;
    const step = (tickMs / AUTOPLAY_MS) * 100;
    const interval = setInterval(() => {
      const locked = isHovering || Date.now() < pauseUntilRef.current;
      if (locked) return;

      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          setCurrentSlide((s) => (s + 1) % SLIDES.length);
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => clearInterval(interval);
  }, [isHovering]);

  const jumpTo = (index: number, resumeDelayMs = 3000) => {
    setCurrentSlide(index);
    setProgress(0);
    pauseUntilRef.current = Date.now() + resumeDelayMs;
  };

  const nextSlide = () => jumpTo((currentSlide + 1) % SLIDES.length);
  const prevSlide = () => jumpTo((currentSlide - 1 + SLIDES.length) % SLIDES.length);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (eventType) params.set("event", eventType);
    if (location) params.set("location", location);
    if (date) params.set("date", date.toISOString());
    navigate(`/browse?${params.toString()}`);
  };

  const allRowCards = useMemo(() => ROWS.flatMap((r) => r.cards), []);

  return (
    <>
      <section
        className="relative h-screen overflow-hidden"
        style={{
          // Smoothly transition accent tone with each slide switch.
          ["--hero-accent" as string]: activeSlide.accent,
        }}
        onMouseMove={() => {
          pointerMovedRef.current = true;
        }}
        onMouseEnter={() => {
          if (pointerMovedRef.current) setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          pauseUntilRef.current = Date.now() + 2000;
        }}
        onTouchStart={(e) => {
          touchStartXRef.current = e.touches[0].clientX;
          touchDeltaXRef.current = 0;
        }}
        onTouchMove={(e) => {
          if (touchStartXRef.current == null) return;
          touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
        }}
        onTouchEnd={() => {
          const delta = touchDeltaXRef.current;
          if (Math.abs(delta) > 40) {
            if (delta < 0) nextSlide();
            else prevSlide();
          }
          touchStartXRef.current = null;
          touchDeltaXRef.current = 0;
        }}
      >
        {!firstLoaded && (
          <div className="absolute inset-0 shimmer-bg z-10" />
        )}

        {SLIDES.map((slide, idx) => {
          const active = idx === currentSlide;
          return (
            <div
              key={slide.badge}
              className={cn(
                "absolute inset-0 transition-opacity",
                active ? "opacity-100" : "opacity-0",
              )}
              style={{
                transitionDuration: "1500ms",
                transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-cover bg-center transition-transform ease-linear",
                  active ? "scale-[1.08]" : "scale-100",
                )}
                style={{ backgroundImage: `url(${slide.image})`, transitionDuration: "5000ms" }}
              />

              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            </div>
          );
        })}

        <div className="relative z-20 h-full container flex items-center">
          <div className="max-w-2xl pt-24 md:pt-20">
            <span className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs tracking-[0.18em] font-semibold text-white"
              style={{ borderColor: "var(--hero-accent)", color: "var(--hero-accent)", transition: "all 500ms ease" }}
            >
              {activeSlide.badge}
            </span>

            <h1 className="mt-5 text-white font-heading font-extrabold leading-[1.04] text-[32px] md:text-[56px] max-w-xl">
              {activeSlide.headline}
            </h1>

            <p className="mt-4 text-white/80 text-[15px] md:text-[18px] max-w-lg leading-relaxed">
              {activeSlide.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                className="h-12 px-6 text-white"
                style={{ backgroundColor: "var(--hero-accent)", transition: "background-color 500ms ease" }}
                onClick={handleSearch}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Book Now
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 border-white/60 bg-white/10 text-white hover:bg-white/20"
                onClick={() => navigate("/browse")}
              >
                Browse Vendors
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="hidden md:grid place-items-center absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/35 border border-white/40 text-white hover:bg-black/60 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="hidden md:grid place-items-center absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/35 border border-white/40 text-white hover:bg-black/60 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute z-30 bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.badge}
              type="button"
              onClick={() => jumpTo(idx)}
              aria-label={`Go to ${slide.badge}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === currentSlide ? "w-8" : "w-3 bg-white/35",
              )}
              style={{
                backgroundColor: idx === currentSlide ? "var(--hero-accent)" : undefined,
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/20">
          <div
            className="h-full transition-[width,background-color] duration-150 ease-linear"
            style={{ width: `${progress}%`, backgroundColor: "var(--hero-accent)" }}
          />
        </div>

        <div className="absolute z-30 left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 w-[94%] md:w-[min(1200px,95%)]">
          <div className="rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md shadow-2xl p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3">
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="h-12 bg-white/90 border-white/40">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <LocationAutocomplete
                value={location}
                onChange={setLocation}
                placeholder="Location (city or state)"
                className="h-12 bg-white/90"
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("h-12 justify-start text-left font-normal bg-white/90 border-white/40", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Event Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>

              <Button
                className="h-12 px-8 text-white"
                style={{ backgroundColor: "var(--hero-accent)", transition: "background-color 500ms ease" }}
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden">
          {allRowCards.map((card, idx) => (
            <img key={`${card.title}-${idx}`} src={card.image} alt="preload" loading={idx === 0 ? "eager" : "lazy"} />
          ))}
        </div>
      </section>

      <section className="bg-[#0b0f14] pt-10 pb-14">
        <div className="container space-y-9" style={{ ["--hero-accent" as string]: activeSlide.accent }}>
          {ROWS.map((row) => (
            <ScrollRow key={row.title} row={row} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
