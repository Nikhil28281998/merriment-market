import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold text-primary">
            Eventz<span className="text-accent">Hub</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Home</Link>
          <Link to="/browse" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Browse Vendors</Link>
          <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-accent transition-colors">How It Works</Link>
          <Link to="/vendor-onboarding" className="text-sm font-medium text-foreground hover:text-accent transition-colors">List Your Services</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild><Link to="/login">Log In</Link></Button>
          <Button variant="accent" asChild><Link to="/signup">Sign Up</Link></Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/browse" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Browse Vendors</Link>
          <Link to="/how-it-works" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link to="/vendor-onboarding" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>List Your Services</Link>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" asChild className="flex-1"><Link to="/login">Log In</Link></Button>
            <Button variant="accent" asChild className="flex-1"><Link to="/signup">Sign Up</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
