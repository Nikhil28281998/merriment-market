import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="hero-gradient text-primary-foreground">
    <div className="container py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <span className="font-heading text-2xl font-bold">Eventz<span className="text-accent">Hubz</span></span>
          <p className="text-primary-foreground/70 text-sm mt-3 leading-relaxed">
            The marketplace for families to find and book the best event service vendors across the USA.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">For Customers</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/browse" className="hover:text-accent transition-colors">Browse Vendors</Link></li>
            <li><Link to="/how-it-works" className="hover:text-accent transition-colors">How It Works</Link></li>
            <li><Link to="/signup" className="hover:text-accent transition-colors">Sign Up</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">For Vendors</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/signup" className="hover:text-accent transition-colors">List Your Services</Link></li>
            <li><Link to="/login" className="hover:text-accent transition-colors">Vendor Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><span className="opacity-60">Help Center</span></li>
            <li><span className="opacity-60">Privacy Policy</span></li>
            <li><span className="opacity-60">Terms of Service</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} EventzHubz. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
