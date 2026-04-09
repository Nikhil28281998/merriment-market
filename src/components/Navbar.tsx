import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const vendorCategories = [
  "Photographer", "Videographer", "Decorator", "Caterer",
  "DJ", "Florist", "Cake Designer", "Makeup Artist",
  "Priest/Pandit", "Event Planner", "Venue",
];

const eventTypes = [
  "Wedding", "Birthday Party", "Baby Shower", "Quinceañera",
  "Graduation", "Anniversary", "Diwali Event", "Eid Celebration",
  "Christmas Party", "Halloween Party", "Baptism", "Bar / Bat Mitzvah",
  "Housewarming / Griha Pravesh", "Gender Reveal", "Naming Ceremony / Namkaran",
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [vendorDropdown, setVendorDropdown] = useState(false);
  const [eventDropdown, setEventDropdown] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated, role, signOut } = useAuth();

  const closeDropdowns = () => {
    setVendorDropdown(false);
    setEventDropdown(false);
  };

  const dashboardPath = role === "vendor" ? "/vendor-dashboard" : "/dashboard";

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been signed out.",
    });
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-[hsl(38,20%,86%)] shadow-sm">
      {/* Top bar */}
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" onClick={closeDropdowns}>
          <span className="font-heading text-2xl font-bold tracking-tight">
            <span className="text-[hsl(222,60%,14%)] font-extrabold">Eventz</span><span className="text-gradient-gold font-extrabold">Hubz</span>
          </span>
        </Link>

        {/* Desktop secondary nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* VENDORS dropdown */}
          <div className="relative" onMouseEnter={() => { setVendorDropdown(true); setEventDropdown(false); }} onMouseLeave={() => setVendorDropdown(false)}>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted">
              Vendors <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {vendorDropdown && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-background border rounded-xl shadow-xl p-2 grid grid-cols-1 gap-0.5">
                {vendorCategories.map(cat => (
                  <Link
                    key={cat}
                    to={`/browse?category=${encodeURIComponent(cat)}`}
                    className="px-3 py-2 text-sm rounded-lg hover:bg-muted hover:text-accent transition-colors"
                    onClick={closeDropdowns}
                  >
                    {cat}
                  </Link>
                ))}
                <div className="border-t mt-1 pt-1">
                  <Link to="/browse" className="px-3 py-2 text-sm font-semibold text-accent rounded-lg hover:bg-muted block" onClick={closeDropdowns}>
                    Browse All Vendors →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* EVENTS dropdown */}
          <div className="relative" onMouseEnter={() => { setEventDropdown(true); setVendorDropdown(false); }} onMouseLeave={() => setEventDropdown(false)}>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted">
              Events <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {eventDropdown && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-background border rounded-xl shadow-xl p-2 grid grid-cols-1 gap-0.5">
                {eventTypes.map(evt => (
                  <Link
                    key={evt}
                    to={`/browse?event=${encodeURIComponent(evt)}`}
                    className="px-3 py-2 text-sm rounded-lg hover:bg-muted hover:text-accent transition-colors"
                    onClick={closeDropdowns}
                  >
                    {evt}
                  </Link>
                ))}
                <div className="border-t mt-1 pt-1">
                  <Link to="/browse" className="px-3 py-2 text-sm font-semibold text-accent rounded-lg hover:bg-muted block" onClick={closeDropdowns}>
                    Browse All Events →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/browse?tab=venues"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted"
            onClick={closeDropdowns}
          >
            Venues
          </Link>
          <Link
            to="/browse?tab=home-parties"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted"
            onClick={closeDropdowns}
          >
            Home Parties
          </Link>

          <Link
            to="/style-studio"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted"
            onClick={closeDropdowns}
          >
            Style Studio
          </Link>
          <Link
            to="/vendor-onboarding"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted"
            onClick={closeDropdowns}
          >
            List Services
          </Link>

          <Link
            to="/success-stories"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted"
            onClick={closeDropdowns}
          >
            Success Stories
          </Link>

          <Link
            to="/event-academy"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted"
            onClick={closeDropdowns}
          >
            Event Academy
          </Link>

          <Link
            to="/trending"
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors rounded-md hover:bg-muted"
            onClick={closeDropdowns}
          >
            Trending
          </Link>
        </div>

        {/* Auth + Cart */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link to={dashboardPath}>Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut}>Log Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild><Link to="/login">Log In</Link></Button>
              <Button variant="accent" asChild className="shadow-md font-semibold tracking-wide"><Link to="/signup">Get Started</Link></Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background/98 backdrop-blur-xl p-4 space-y-1 max-h-[80vh] overflow-y-auto">
          <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Browse Vendors</p>
          {vendorCategories.map(cat => (
            <Link key={cat} to={`/browse?category=${encodeURIComponent(cat)}`} className="block px-3 py-2 text-sm rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>{cat}</Link>
          ))}
          <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Browse By Event</p>
          {eventTypes.map(evt => (
            <Link key={evt} to={`/browse?event=${encodeURIComponent(evt)}`} className="block px-3 py-2 text-sm rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>{evt}</Link>
          ))}
          <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">More</p>
          <Link to="/browse?tab=venues" className="block px-3 py-2 text-sm rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Venues</Link>
          <Link to="/browse?tab=home-parties" className="block px-3 py-2 text-sm rounded-lg hover:bg-muted" onClick={() => setMobileOpen(false)}>Home Parties</Link>
          <div className="border-t pt-3 mt-2 space-y-2">
            <Link to="/style-studio" className="block px-3 py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Style Studio</Link>
            <Link to="/vendor-onboarding" className="block px-3 py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>List Your Services</Link>
            <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">Resources</p>
            <Link to="/success-stories" className="block px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>Success Stories</Link>
            <Link to="/event-academy" className="block px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>Event Academy</Link>
            <Link to="/performance-stars" className="block px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>Performance Stars</Link>
            <Link to="/venue-spaces" className="block px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>Venue & Spaces</Link>
            <Link to="/budget-planner" className="block px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>Budget Planner</Link>
            <Link to="/trending" className="block px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>Trending</Link>
          </div>
          <div className="flex gap-3 pt-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild className="flex-1"><Link to={dashboardPath} onClick={() => setMobileOpen(false)}>Dashboard</Link></Button>
                <Button variant="outline" className="flex-1" onClick={handleSignOut}>Log Out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="flex-1"><Link to="/login">Log In</Link></Button>
                <Button variant="accent" asChild className="flex-1"><Link to="/signup">Sign Up</Link></Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
