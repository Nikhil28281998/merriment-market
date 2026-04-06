import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star, MapPin, SlidersHorizontal, X, ShoppingCart, Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockVendors, categories } from "@/data/mockData";
import { eventBundles } from "@/data/eventBundles";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const eventFromUrl = searchParams.get("event") || "";
  const locationFromUrl = searchParams.get("location") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState("0");
  const [location, setLocation] = useState(locationFromUrl);
  const [sortBy, setSortBy] = useState("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(eventFromUrl);

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

  const filtered = useMemo(() => {
    let vendors = [...mockVendors];
    if (selectedCategories.length > 0) vendors = vendors.filter(v => selectedCategories.includes(v.category));
    if (location) vendors = vendors.filter(v => v.city.toLowerCase().includes(location.toLowerCase()) || v.state.toLowerCase().includes(location.toLowerCase()));
    vendors = vendors.filter(v => v.startingPrice >= priceRange[0] && v.startingPrice <= priceRange[1]);
    vendors = vendors.filter(v => v.rating >= Number(minRating));
    if (sortBy === "rating") vendors.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-low") vendors.sort((a, b) => a.startingPrice - b.startingPrice);
    else if (sortBy === "price-high") vendors.sort((a, b) => b.startingPrice - a.startingPrice);
    else if (sortBy === "reviews") vendors.sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sortBy === "newest") vendors.sort((a, b) => Number(b.id) - Number(a.id));
    return vendors;
  }, [selectedCategories, priceRange, minRating, location, sortBy, verifiedOnly]);

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
        <Input placeholder="City or state..." value={location} onChange={e => setLocation(e.target.value)} />
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

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-3xl font-bold">Browse Vendors</h1>
          <div className="flex items-center gap-3">
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
          </div>
        </div>

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
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">No vendors found matching your criteria.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(vendor => {
                  const firstPkg = vendor.packages[0];
                  const inCart = items.some(i => i.vendor.id === vendor.id);
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
                              <Link to={`/vendor/${vendor.id}`}>View Profile</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
