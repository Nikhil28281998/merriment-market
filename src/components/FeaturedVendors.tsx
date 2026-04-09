import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ChevronRight, BadgeCheck } from "lucide-react";
import { mockVendors } from "@/data/mockData";

const categoryBadge: Record<string, string> = {
  Photographer:   "bg-[hsl(222,50%,14%)] text-[hsl(43,82%,64%)]",
  Videographer:   "bg-[hsl(215,50%,18%)] text-[hsl(43,82%,64%)]",
  Decorator:      "bg-[hsl(348,45%,22%)] text-[hsl(43,82%,70%)]",
  Caterer:        "bg-[hsl(30,50%,18%)] text-[hsl(43,82%,70%)]",
  DJ:             "bg-[hsl(200,50%,16%)] text-[hsl(43,82%,68%)]",
  Florist:        "bg-[hsl(158,45%,16%)] text-[hsl(43,82%,68%)]",
  "Cake Designer":"bg-[hsl(35,50%,16%)] text-[hsl(43,82%,70%)]",
  "Makeup Artist":"bg-[hsl(320,40%,18%)] text-[hsl(43,82%,68%)]",
  Officiant:      "bg-[hsl(43,60%,16%)] text-[hsl(43,82%,68%)]",
  "Event Planner":"bg-[hsl(190,45%,16%)] text-[hsl(43,82%,68%)]",
  Venue:          "bg-[hsl(270,40%,18%)] text-[hsl(43,82%,68%)]",
};

const FeaturedVendors = () => (
  <section className="py-16 md:py-24 section-alt">
    <div className="container">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="section-eyebrow block mb-2">Top Picks</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Top-Rated Vendors</h2>
          <p className="text-muted-foreground max-w-lg">
            Trusted professionals ready to make your celebration unforgettable
          </p>
        </div>
        <Link to="/browse" className="hidden md:flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockVendors.map(v => {
          const badgeClass = categoryBadge[v.category] ?? "bg-[hsl(222,50%,14%)] text-[hsl(43,82%,64%)]";
          return (
            <div key={v.id} className="bg-card rounded-2xl overflow-hidden card-luxury group">
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={v.photo}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Category badge (navy + gold text) */}
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase shadow-md ${badgeClass}`}>
                  {v.category}
                </span>
                {v.verified && (
                  <span className="absolute top-3 right-3 bg-white/95 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md text-[hsl(222,60%,14%)]">
                    <BadgeCheck className="h-3 w-3 text-[hsl(158,55%,38%)]" /> Verified
                  </span>
                )}

                {/* Price chip at bottom of image */}
                <span className="absolute bottom-3 right-3 gold-gradient text-[hsl(222,60%,10%)] text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  From ${v.startingPrice}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-heading font-bold text-lg truncate">{v.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 flex-shrink-0 text-accent" />
                  {v.city}, {v.state}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-[hsl(43,82%,50%)] text-[hsl(43,82%,50%)]" />
                  <span className="text-sm font-bold">{v.rating}</span>
                  <span className="text-xs text-muted-foreground">({v.reviewCount} reviews)</span>
                </div>
                <div className="mt-4">
                  <Button size="sm" variant="outline" className="w-full min-h-[40px] border-[hsl(43,50%,65%)/0.4] hover:border-accent hover:bg-[hsl(43,90%,96%)] hover:text-[hsl(222,60%,12%)] transition-colors font-semibold" asChild>
                    <Link to={`/vendor/${v.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Button variant="outline" asChild>
          <Link to="/browse">View All Vendors</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default FeaturedVendors;
