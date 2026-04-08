import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const cities = [
  {
    name: "New York",
    state: "NY",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
    vendorCount: 3,
  },
  {
    name: "Los Angeles",
    state: "CA",
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&h=400&fit=crop",
    vendorCount: 4,
  },
  {
    name: "Houston",
    state: "TX",
    image: "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?w=600&h=400&fit=crop",
    vendorCount: 3,
  },
  {
    name: "Atlanta",
    state: "GA",
    image: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=600&h=400&fit=crop",
    vendorCount: 2,
  },
  {
    name: "Miami",
    state: "FL",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    vendorCount: 2,
  },
  {
    name: "Chicago",
    state: "IL",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
    vendorCount: 3,
  },
  {
    name: "Seattle",
    state: "WA",
    image: "https://images.unsplash.com/photo-1438401171849-74ac270044ee?w=600&h=400&fit=crop",
    vendorCount: 3,
  },
  {
    name: "Phoenix",
    state: "AZ",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    vendorCount: 2,
  },
  {
    name: "Dallas",
    state: "TX",
    image: "https://images.unsplash.com/photo-1545087012-bc7b12c98723?w=600&h=400&fit=crop",
    vendorCount: 2,
  },
  {
    name: "San Jose",
    state: "CA",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop",
    vendorCount: 2,
  },
];

const CityBrowse = () => (
  <section className="py-16 md:py-24 section-alt">
    <div className="container">
      <div className="text-center mb-12">
        <span className="section-eyebrow block mb-2">Near You</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Find Vendors Near You</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Browse top-rated event professionals in cities across the country
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cities.map(city => (
          <Link
            key={city.name}
            to={`/browse?location=${encodeURIComponent(city.name)}`}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-32 sm:h-40 overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-center gap-1 mb-0.5">
                <MapPin className="h-3 w-3 text-white/80 flex-shrink-0" />
                <span className="text-white/80 text-xs">{city.state}</span>
              </div>
              <p className="text-white font-heading font-bold text-sm sm:text-base leading-tight">
                {city.name}
              </p>
              <span className="inline-block mt-1 text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
                {city.vendorCount}+ vendors
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CityBrowse;
