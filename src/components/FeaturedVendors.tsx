import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const VENDORS = [
  { id: "1", name: "Studio Elegance", category: "Photographer", rating: 4.9, reviews: 128, price: 299, city: "Dallas, TX", photo: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop" },
  { id: "2", name: "Blossom Events", category: "Decorator", rating: 4.8, reviews: 95, price: 499, city: "Houston, TX", photo: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop" },
  { id: "3", name: "Spice Route Catering", category: "Caterer", rating: 4.7, reviews: 210, price: 799, city: "New York, NY", photo: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop" },
  { id: "4", name: "DJ Beats Pro", category: "DJ", rating: 4.9, reviews: 156, price: 399, city: "Los Angeles, CA", photo: "https://images.unsplash.com/photo-1571266028243-3716f02d2d55?w=400&h=300&fit=crop" },
];

const FeaturedVendors = () => (
  <section className="py-16 md:py-24 section-alt">
    <div className="container">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Featured Vendors</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
        Top-rated professionals trusted by thousands of families
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {VENDORS.map(v => (
          <div key={v.id} className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow duration-300">
            <img src={v.photo} alt={v.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">{v.category}</span>
              <h3 className="font-heading font-bold text-lg mt-1">{v.name}</h3>
              <p className="text-sm text-muted-foreground">{v.city}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="text-sm font-semibold">{v.rating}</span>
                <span className="text-xs text-muted-foreground">({v.reviews} reviews)</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold">From <span className="text-accent">${v.price}</span></span>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/vendor/${v.id}`}>View Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedVendors;
