import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getEventImage } from "@/data/eventImageLibrary";

const cities = [
  {
    name: "New York",
    state: "NY",
    image: getEventImage("Wedding"),
    vendorCount: 3,
  },
  {
    name: "Los Angeles",
    state: "CA",
    image: getEventImage("Summer Pool Party"),
    vendorCount: 4,
  },
  {
    name: "Houston",
    state: "TX",
    image: getEventImage("Birthday Bash"),
    vendorCount: 3,
  },
  {
    name: "Atlanta",
    state: "GA",
    image: getEventImage("Graduation Party"),
    vendorCount: 2,
  },
  {
    name: "Miami",
    state: "FL",
    image: getEventImage("Housewarming"),
    vendorCount: 2,
  },
  {
    name: "Chicago",
    state: "IL",
    image: getEventImage("Holiday Lights Event"),
    vendorCount: 3,
  },
  {
    name: "Seattle",
    state: "WA",
    image: getEventImage("Corporate Mixer"),
    vendorCount: 3,
  },
  {
    name: "Phoenix",
    state: "AZ",
    image: getEventImage("Baptism"),
    vendorCount: 2,
  },
  {
    name: "Dallas",
    state: "TX",
    image: getEventImage("Naming Ceremony"),
    vendorCount: 2,
  },
  {
    name: "San Jose",
    state: "CA",
    image: getEventImage("Festival Gathering"),
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
