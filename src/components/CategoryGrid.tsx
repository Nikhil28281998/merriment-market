import { Link } from "react-router-dom";
import { Camera, Palette, UtensilsCrossed, Music, Flower2, Video, Church, Sparkles, Cake, ClipboardList } from "lucide-react";

const CATEGORIES = [
  { name: "Photographer",   icon: Camera,          bg: "from-[hsl(222,60%,12%)] to-[hsl(222,55%,22%)]" },
  { name: "Decorator",      icon: Palette,         bg: "from-[hsl(348,50%,18%)] to-[hsl(348,45%,28%)]" },
  { name: "Caterer",        icon: UtensilsCrossed, bg: "from-[hsl(30,55%,16%)] to-[hsl(30,50%,26%)]" },
  { name: "DJ",             icon: Music,           bg: "from-[hsl(200,55%,14%)] to-[hsl(200,50%,24%)]" },
  { name: "Florist",        icon: Flower2,         bg: "from-[hsl(158,50%,14%)] to-[hsl(158,45%,22%)]" },
  { name: "Videographer",   icon: Video,           bg: "from-[hsl(215,55%,14%)] to-[hsl(215,50%,24%)]" },
  { name: "Officiant",      icon: Church,          bg: "from-[hsl(43,60%,14%)] to-[hsl(43,55%,22%)]" },
  { name: "Makeup Artist",  icon: Sparkles,        bg: "from-[hsl(320,45%,16%)] to-[hsl(320,40%,26%)]" },
  { name: "Cake Designer",  icon: Cake,            bg: "from-[hsl(35,55%,16%)] to-[hsl(35,50%,24%)]" },
  { name: "Event Planner",  icon: ClipboardList,   bg: "from-[hsl(190,50%,14%)] to-[hsl(190,45%,22%)]" },
];

const CategoryGrid = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="text-center mb-12">
        <span className="section-eyebrow block mb-2">Explore</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Find the perfect vendor for every aspect of your event
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
        {CATEGORIES.map(({ name, icon: Icon, bg }) => (
          <Link
            key={name}
            to={`/browse?category=${encodeURIComponent(name)}`}
            className="group flex flex-col items-center gap-3.5 p-6 rounded-2xl border border-border/60 bg-card card-luxury text-center"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
              <Icon className="h-6 w-6 text-[hsl(43,82%,62%)]" />
            </div>
            <span className="text-sm font-semibold text-foreground leading-tight">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
