import { Link } from "react-router-dom";
import { Camera, Palette, UtensilsCrossed, Music, Flower2, Video, Church, Sparkles, Cake, ClipboardList } from "lucide-react";

const CATEGORIES = [
  { name: "Photographer", icon: Camera },
  { name: "Decorator", icon: Palette },
  { name: "Caterer", icon: UtensilsCrossed },
  { name: "DJ", icon: Music },
  { name: "Florist", icon: Flower2 },
  { name: "Videographer", icon: Video },
  { name: "Priest/Pandit", icon: Church },
  { name: "Makeup Artist", icon: Sparkles },
  { name: "Cake Designer", icon: Cake },
  { name: "Event Planner", icon: ClipboardList },
];

const CategoryGrid = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">Browse by Category</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
        Find the perfect vendor for every aspect of your event
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {CATEGORIES.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            to={`/browse?category=${encodeURIComponent(name)}`}
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-accent/30 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Icon className="h-7 w-7 text-accent" />
            </div>
            <span className="text-sm font-semibold text-card-foreground text-center">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
