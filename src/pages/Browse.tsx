import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star, MapPin, SlidersHorizontal, X, ShoppingCart, Check, Sparkles, ArrowRight, Heart, Scale, Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import VendorActionButtons from "@/components/VendorActionButtons";
import { categories, eventTypes } from "@/data/mockData";
import { eventBundles } from "@/data/eventBundles";
import { vendorSupportsEvent } from "@/data/vendorEventInsights";
import { allVendors, type BrowseTab, vendorMatchesBrowseTab } from "@/data/vendorDiscovery";
import { isVendorAvailableOnDate } from "@/data/vendorAvailability";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const CITY_COORDS: Record<string, [number, number]> = {
  "New York, NY": [-74.006, 40.7128],
  "Los Angeles, CA": [-118.2437, 34.0522],
  "San Jose, CA": [-121.8863, 37.3382],
  "Seattle, WA": [-122.3321, 47.6062],
  "Phoenix, AZ": [-112.074, 33.4484],
  "Dallas, TX": [-96.797, 32.7767],
  "Houston, TX": [-95.3698, 29.7604],
  "Chicago, IL": [-87.6298, 41.8781],
  "Atlanta, GA": [-84.388, 33.749],
  "Miami, FL": [-80.1918, 25.7617],
};

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const eventFromUrl = searchParams.get("event") || "";
  const locationFromUrl = searchParams.get("location") || "";
  const dateFromUrl = searchParams.get("date") || "";
  const categoryFromUrl = searchParams.get("category") || "";
  const rawTabFromUrl = searchParams.get("tab");
  const tabFromUrl: BrowseTab = rawTabFromUrl === "venues" || rawTabFromUrl === "home-parties" ? rawTabFromUrl : "vendors";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFromUrl ? [categoryFromUrl] : []);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState("0");
  const [location, setLocation] = useState(locationFromUrl);
  const [sortBy, setSortBy] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(eventFromUrl);
  const [browseTab, setBrowseTab] = useState<BrowseTab>(tabFromUrl);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isFiltering, setIsFiltering] = useState(false);
  const [mapboxLib, setMapboxLib] = useState<any>(null);
  const [selectedMapCity, setSelectedMapCity] = useState<string>("");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRefs = useRef<any[]>([]);
  const [shortlistIds, setShortlistIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("eventzhubz.shortlist") || "[]") as string[];
    } catch {
      return [];
    }
  });
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("eventzhubz.compare") || "[]") as string[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setSelectedEvent(eventFromUrl);
  }, [eventFromUrl]);

  useEffect(() => {
    setSelectedCategories(categoryFromUrl ? [categoryFromUrl] : []);
  }, [categoryFromUrl]);

  useEffect(() => {
    setBrowseTab(tabFromUrl);
  }, [tabFromUrl]);

  useEffect(() => {
    localStorage.setItem("eventzhubz.shortlist", JSON.stringify(shortlistIds));
  }, [shortlistIds]);

  useEffect(() => {
    localStorage.setItem("eventzhubz.compare", JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 280);
    return () => clearTimeout(timer);
  }, [selectedCategories, priceRange, minRating, location, sortBy, verifiedOnly, selectedEvent, browseTab, dateFromUrl]);

  const { addItem, items } = useCart();

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const activeFilterCount = [
    selectedCategories.length > 0,
    priceRange[0] > 0 || priceRange[1] < 5000,
    Number(minRating) > 0,
    location.length > 0,
    verifiedOnly,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setMinRating("0");
    setLocation("");
    setVerifiedOnly(false);
  };

  const bundle = eventBundles.find(b => b.eventType === selectedEvent);

  const activeChips = useMemo(() => {
    const chips: Array<{ key: string; label: string }> = [];
    selectedCategories.forEach(cat => chips.push({ key: `category:${cat}`, label: cat }));
    if (location) chips.push({ key: "location", label: `Location: ${location}` });
    if (Number(minRating) > 0) chips.push({ key: "rating", label: `${minRating}+ stars` });
    if (verifiedOnly) chips.push({ key: "verified", label: "Verified only" });
    if (priceRange[0] > 0 || priceRange[1] < 5000) chips.push({ key: "price", label: `$${priceRange[0]} - $${priceRange[1]}` });
    if (selectedEvent) chips.push({ key: "event", label: selectedEvent });
    if (dateFromUrl) chips.push({ key: "date", label: new Date(dateFromUrl).toLocaleDateString() });
    return chips;
  }, [selectedCategories, location, minRating, verifiedOnly, priceRange, selectedEvent, dateFromUrl]);

  const removeChip = (chipKey: string) => {
    if (chipKey.startsWith("category:")) {
      const category = chipKey.replace("category:", "");
      setSelectedCategories(prev => prev.filter(c => c !== category));
      return;
    }
    if (chipKey === "location") {
      setLocation("");
      return;
    }
    if (chipKey === "rating") {
      setMinRating("0");
      return;
    }
    if (chipKey === "verified") {
      setVerifiedOnly(false);
      return;
    }
    if (chipKey === "price") {
      setPriceRange([0, 5000]);
      return;
    }
    if (chipKey === "event") {
      updateSelectedEvent("all-events");
      return;
    }
    if (chipKey === "date") {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("date");
      setSearchParams(nextParams);
    }
  };

  const updateSelectedEvent = (value: string) => {
    const nextEvent = value === "all-events" ? "" : value;
    setSelectedEvent(nextEvent);

    if (nextEvent) {
      const relatedBundle = eventBundles.find(b => b.eventType === nextEvent);
      if (relatedBundle?.mustHave.length) {
        setSelectedCategories([]);
      }
    }

    const nextParams = new URLSearchParams(searchParams);
    if (nextEvent) nextParams.set("event", nextEvent);
    else nextParams.delete("event");
    if (browseTab !== "vendors") nextParams.set("tab", browseTab);
    setSearchParams(nextParams);
  };

  const updateBrowseTab = (nextTab: BrowseTab) => {
    setBrowseTab(nextTab);
    const nextParams = new URLSearchParams(searchParams);
    if (nextTab === "vendors") nextParams.delete("tab");
    else nextParams.set("tab", nextTab);
    setSearchParams(nextParams);
  };

  const toggleShortlist = (vendorId: string) => {
    setShortlistIds(prev => (prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]));
  };

  const toggleCompare = (vendorId: string) => {
    setCompareIds(prev => {
      if (prev.includes(vendorId)) return prev.filter(id => id !== vendorId);
      if (prev.length >= 4) return prev;
      return [...prev, vendorId];
    });
  };

  const filtered = useMemo(() => {
    let vendors = [...allVendors];

    vendors = vendors.filter(v => vendorMatchesBrowseTab(v, browseTab));

    if (selectedEvent) {
      vendors = vendors.filter(v => vendorSupportsEvent(v.id, selectedEvent, v.category));

      if (browseTab === "vendors" && selectedCategories.length === 0 && bundle?.mustHave.length) {
        vendors = vendors.filter(v => bundle.mustHave.includes(v.category));
      }
    }

    if (selectedCategories.length > 0) vendors = vendors.filter(v => selectedCategories.includes(v.category));
    if (location) vendors = vendors.filter(v => {
      const loc = location.toLowerCase();
      const homeMatch = v.city.toLowerCase().includes(loc) || v.state.toLowerCase().includes(loc);
      if (homeMatch) return true;
      if (!v.serviceStates) return false;
      if (v.serviceStates.includes("Nationwide")) return true;
      return v.serviceStates.some(s => s.toLowerCase() === loc || s.toLowerCase().includes(loc));
    });
    if (dateFromUrl) vendors = vendors.filter(v => isVendorAvailableOnDate(v.id, dateFromUrl));
    if (verifiedOnly) vendors = vendors.filter(v => v.verified);
    vendors = vendors.filter(v => v.startingPrice >= priceRange[0] && v.startingPrice <= priceRange[1]);
    vendors = vendors.filter(v => v.rating >= Number(minRating));
    if (sortBy === "rating") vendors.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-low") vendors.sort((a, b) => a.startingPrice - b.startingPrice);
    else if (sortBy === "price-high") vendors.sort((a, b) => b.startingPrice - a.startingPrice);
    else if (sortBy === "reviews") vendors.sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sortBy === "newest") vendors.sort((a, b) => Number(b.id) - Number(a.id));
    return vendors;
  }, [selectedCategories, priceRange, minRating, location, sortBy, verifiedOnly, selectedEvent, bundle, browseTab, dateFromUrl]);

  const cityGroups = useMemo(() => {
    const grouped = filtered.reduce<Record<string, { city: string; state: string; count: number; lng: number; lat: number }>>((acc, vendor) => {
      const cityKey = `${vendor.city}, ${vendor.state}`;
      const point = CITY_COORDS[cityKey] ?? [-98.5795, 39.8283];

      if (!acc[cityKey]) {
        acc[cityKey] = { city: vendor.city, state: vendor.state, count: 0, lng: point[0], lat: point[1] };
      }
      acc[cityKey].count += 1;
      return acc;
    }, {});

    return Object.values(grouped);
  }, [filtered]);

  useEffect(() => {
    if (viewMode !== "map") return;
    if (!import.meta.env.VITE_MAPBOX_TOKEN) return;
    if (mapboxLib) return;

    let cancelled = false;
    Promise.all([import("mapbox-gl"), import("mapbox-gl/dist/mapbox-gl.css")]).then(([mapboxModule]) => {
      if (!cancelled) setMapboxLib(mapboxModule.default);
    });

    return () => {
      cancelled = true;
    };
  }, [viewMode, mapboxLib]);

  useEffect(() => {
    if (viewMode !== "map") return;
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;
    if (!import.meta.env.VITE_MAPBOX_TOKEN) return;
    if (!mapboxLib) return;

    mapboxLib.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapRef.current = new mapboxLib.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.5795, 39.8283],
      zoom: 3,
    });

    mapRef.current.addControl(new mapboxLib.NavigationControl(), "top-right");
  }, [viewMode, mapboxLib]);

  useEffect(() => {
    if (!mapRef.current || viewMode !== "map") return;

    markerRefs.current.forEach(marker => marker.remove());
    markerRefs.current = [];

    cityGroups.forEach(city => {
      const markerElement = document.createElement("button");
      const cityLabel = `${city.city}, ${city.state}`;
      const isActiveCity = selectedMapCity === cityLabel;
      markerElement.className = `h-8 min-w-8 px-2 rounded-full text-xs font-bold shadow-md transition-transform hover:scale-105 ${
        isActiveCity
          ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
          : "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
      }`;
      markerElement.textContent = `${city.count}`;
      markerElement.title = cityLabel;
      markerElement.addEventListener("click", () => {
        setSelectedMapCity(cityLabel);
        setLocation(city.city);
      });

      const marker = new mapboxLib.Marker({ element: markerElement })
        .setLngLat([city.lng, city.lat])
        .setPopup(new mapboxLib.Popup({ offset: 24 }).setHTML(`<strong>${city.city}, ${city.state}</strong><br/>${city.count} vendors`))
        .addTo(mapRef.current!);

      markerRefs.current.push(marker);
    });

    if (cityGroups.length > 0) {
      const bounds = new mapboxLib.LngLatBounds();
      cityGroups.forEach(city => bounds.extend([city.lng, city.lat]));
      mapRef.current.fitBounds(bounds, { padding: 80, maxZoom: 9, duration: 500 });
    }
  }, [cityGroups, viewMode, mapboxLib, selectedMapCity]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" className="text-destructive w-full" onClick={clearAllFilters}>
          <X className="h-3 w-3 mr-1" /> Clear all filters
        </Button>
      )}
      <div>
        <Label className="text-sm font-semibold mb-3 block">Category</Label>
        <div className="space-y-2">
          {categories.map(cat => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} id={cat} />
              <Label htmlFor={cat} className="text-sm cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-semibold mb-3 block">Price Range: ${priceRange[0]} – ${priceRange[1]}</Label>
        <Slider min={0} max={5000} step={50} value={priceRange} onValueChange={setPriceRange} className="mt-2" />
      </div>
      <div>
        <Label className="text-sm font-semibold mb-3 block">Minimum Rating</Label>
        <Select value={minRating} onValueChange={setMinRating}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-semibold mb-3 block">Location</Label>
        <LocationAutocomplete value={location} onChange={setLocation} placeholder="City or state" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked={verifiedOnly} onCheckedChange={(v) => setVerifiedOnly(v === true)} id="verified" />
        <Label htmlFor="verified" className="text-sm cursor-pointer">Verified vendors only</Label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        {/* Bundle Recommendation Banner */}
        {bundle && (
          <div className="mb-8 rounded-2xl border-2 border-accent/20 bg-accent/5 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="font-heading text-lg font-bold">
                Planning a {bundle.eventType}? Here's what most families book:
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Must-Have</p>
                <div className="flex flex-wrap gap-2">
                  {bundle.mustHave.map(cat => (
                    <Link
                      key={cat}
                      to={`/browse?event=${selectedEvent}&location=${location}`}
                      onClick={() => {
                        setSelectedCategories([cat]);
                      }}
                    >
                      <Badge variant="default" className="cursor-pointer gap-1 py-1.5 px-3">
                        {cat} <ArrowRight className="h-3 w-3" />
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Recommended</p>
                <div className="flex flex-wrap gap-2">
                  {bundle.recommended.map(cat => (
                    <Badge
                      key={cat}
                      variant="outline"
                      className="cursor-pointer gap-1 py-1.5 px-3 hover:bg-accent/10"
                      onClick={() => setSelectedCategories([cat])}
                    >
                      {cat} <ArrowRight className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {dateFromUrl && (
          <div className="mb-6 rounded-xl border bg-muted/40 p-4 text-sm">
            Showing vendors available on <span className="font-semibold">{new Date(dateFromUrl).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold">
              {browseTab === "venues" ? "Browse Nearby Venues" : browseTab === "home-parties" ? "Browse Home Party Services" : "Browse Vendors"}
            </h1>
            {selectedEvent && (
              <p className="text-sm text-muted-foreground mt-1">
                Showing {browseTab === "venues" ? "venues" : browseTab === "home-parties" ? "at-home services" : "vendors"} for <span className="font-semibold text-foreground">{selectedEvent}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedEvent || "all-events"} onValueChange={updateSelectedEvent}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-events">All Events</SelectItem>
                {eventTypes.map(eventType => (
                  <SelectItem key={eventType} value={eventType}>{eventType}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="md:hidden relative" onClick={() => setFiltersOpen(!filtersOpen)}>
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <div className="hidden md:flex items-center rounded-lg border p-1">
              <Button
                size="sm"
                variant={viewMode === "list" ? "accent" : "ghost"}
                className="h-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" /> List
              </Button>
              <Button
                size="sm"
                variant={viewMode === "map" ? "accent" : "ghost"}
                className="h-8"
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4 mr-1" /> Map
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button variant={browseTab === "vendors" ? "accent" : "outline"} onClick={() => updateBrowseTab("vendors")}>Vendors</Button>
          <Button variant={browseTab === "venues" ? "accent" : "outline"} onClick={() => updateBrowseTab("venues")}>Venues</Button>
          <Button variant={browseTab === "home-parties" ? "accent" : "outline"} onClick={() => updateBrowseTab("home-parties")}>Home Parties</Button>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-6 rounded-xl border bg-background p-3">
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map(chip => (
                <button
                  key={chip.key}
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
                  onClick={() => removeChip(chip.key)}
                >
                  {chip.label}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <Button size="sm" variant="ghost" className="ml-auto text-xs" onClick={clearAllFilters}>Clear all</Button>
            </div>
          </div>
        )}

        {compareIds.length > 0 && (
          <div className="mb-6 rounded-xl border p-3 flex flex-wrap items-center gap-3 bg-background">
            <p className="text-sm">Compare list: <span className="font-semibold">{compareIds.length}/4</span></p>
            <Button size="sm" variant="outline" asChild>
              <Link to={`/compare?ids=${compareIds.join(",")}`}>Open Compare</Link>
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setCompareIds([])}>Clear</Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <FilterSidebar />
          </aside>

          {/* Mobile filter drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
              <div className="absolute right-0 top-0 h-full w-80 bg-background border-l p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-heading text-lg font-bold">Filters</h2>
                  <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5" /></button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Vendor grid */}
          <div className="flex-1">
            {isFiltering ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-48 w-full bg-muted animate-pulse" />
                    <CardContent className="p-4 space-y-3">
                      <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                      <div className="h-5 w-40 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                      <div className="h-9 w-full bg-muted animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-muted p-5 mb-5">
                  <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">No vendors found</h3>
                <p className="text-sm text-muted-foreground max-w-xs mb-6">
                  Try widening your budget range, removing a category filter, or exploring a different city.
                </p>
                <Button variant="outline" onClick={clearAllFilters} className="gap-2">
                  <X className="h-4 w-4" /> Reset all filters
                </Button>
              </div>
            ) : viewMode === "map" ? (
              <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                <Card className="relative min-h-[520px] overflow-hidden border">
                  {import.meta.env.VITE_MAPBOX_TOKEN ? (
                    <div ref={mapContainerRef} className="h-[520px] w-full" />
                  ) : (
                    <div className="h-[520px] grid place-items-center px-6 text-center">
                      <div>
                        <p className="font-semibold mb-2">Mapbox token missing</p>
                        <p className="text-sm text-muted-foreground">Set VITE_MAPBOX_TOKEN to enable interactive map mode with pan and zoom.</p>
                      </div>
                    </div>
                  )}
                </Card>

                <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
                  {selectedMapCity && (
                    <div className="rounded-lg border bg-background px-3 py-2 text-xs flex items-center justify-between">
                      <span>Map filter: <strong>{selectedMapCity}</strong></span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => {
                          setSelectedMapCity("");
                          setLocation("");
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                  {filtered.map(vendor => (
                    <Card key={vendor.id} className="p-3">
                      <div className="flex gap-3">
                        <img src={vendor.photo} alt={vendor.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-accent">{vendor.category}</p>
                          <h3 className="font-semibold truncate">{vendor.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" /> {vendor.city}, {vendor.state}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-semibold">From ${vendor.startingPrice}</span>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/vendor/${vendor.id}`}>Open</Link>
                            </Button>
                          </div>
                          <div className="mt-2 pt-2 border-t">
                            <VendorActionButtons vendorId={vendor.id} size="sm" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(vendor => {
                  const firstPkg = vendor.packages[0];
                  const inCart = items.some(i => i.vendor.id === vendor.id);
                  const shortlisted = shortlistIds.includes(vendor.id);
                  const inCompare = compareIds.includes(vendor.id);
                  return (
                    <Card key={vendor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <img src={vendor.photo} alt={vendor.name} className="w-full h-48 object-cover" />
                      <CardContent className="p-4">
                        <p className="text-xs font-medium text-accent mb-1">{vendor.category}</p>
                        <h3 className="font-heading font-bold text-lg mb-1">{vendor.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" /> {vendor.city}, {vendor.state}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{vendor.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({vendor.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">From ${vendor.startingPrice}</span>
                          <div className="flex gap-1.5">
                            <Button
                              variant={shortlisted ? "accent" : "outline"}
                              size="sm"
                              className="min-h-[44px]"
                              onClick={() => toggleShortlist(vendor.id)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={inCompare ? "accent" : "outline"}
                              size="sm"
                              className="min-h-[44px]"
                              onClick={() => toggleCompare(vendor.id)}
                              disabled={!inCompare && compareIds.length >= 4}
                            >
                              <Scale className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={inCart ? "outline" : "accent"}
                              size="sm"
                              className="min-h-[44px]"
                              disabled={inCart}
                              onClick={() => {
                                addItem(vendor, firstPkg);
                                toast.success(`${vendor.name} added to cart!`);
                              }}
                            >
                              {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                            </Button>
                            <Button variant="accent" size="sm" className="min-h-[44px]" asChild>
                              <Link
                                to={(() => {
                                  const params = new URLSearchParams();
                                  if (selectedEvent) params.set("event", selectedEvent);
                                  if (browseTab !== "vendors") params.set("tab", browseTab);
                                  const query = params.toString();
                                  return query ? `/vendor/${vendor.id}?${query}` : `/vendor/${vendor.id}`;
                                })()}
                              >
                                View Profile
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <VendorActionButtons vendorId={vendor.id} vendor={vendor} size="sm" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop sticky compare bar */}
        {compareIds.length > 0 && (
          <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur shadow-lg">
            <div className="container py-3 flex items-center gap-4">
              <Scale className="h-5 w-5 text-accent shrink-0" />
              <p className="text-sm font-semibold flex-1">
                {compareIds.length} vendor{compareIds.length > 1 ? "s" : ""} selected for comparison
                <span className="text-muted-foreground font-normal ml-1">(max 4)</span>
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setCompareIds([])} className="text-destructive hover:text-destructive">
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
                <Button size="sm" variant="accent" asChild>
                  <Link to={`/compare?ids=${compareIds.join(",")}`}>
                    <Scale className="h-4 w-4 mr-1" /> Compare Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
          <div className="rounded-full border bg-background/95 backdrop-blur px-4 py-3 shadow-lg flex items-center justify-between">
            <button className="text-sm font-semibold" onClick={() => setFiltersOpen(true)}>
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <button className="text-xs text-muted-foreground" onClick={() => setViewMode(prev => (prev === "list" ? "map" : "list"))}>
              {viewMode === "list" ? "Map" : "List"}
            </button>
            <Button size="sm" variant="outline" asChild>
              <Link to={compareIds.length ? `/compare?ids=${compareIds.join(",")}` : "/compare"}>Compare ({compareIds.length})</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
