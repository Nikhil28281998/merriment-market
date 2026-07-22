import { Link } from "react-router-dom";
import { getEventImage } from "@/data/eventImageLibrary";

const celebrations = [
  {
    type: "Wedding",
    color: "from-rose-50 to-pink-50",
    image: getEventImage("Wedding"),
  },
  {
    type: "Birthday Party",
    color: "from-violet-50 to-purple-50",
    image: getEventImage("Birthday Party"),
  },
  {
    type: "Bachelorette",
    color: "from-pink-50 to-rose-50",
    image: getEventImage("Bachelorette"),
  },
  {
    type: "Baby Shower",
    color: "from-sky-50 to-blue-50",
    image: getEventImage("Baby Shower"),
  },
  {
    type: "Quinceañera",
    color: "from-fuchsia-50 to-pink-50",
    image: getEventImage("Quinceañera"),
  },
  {
    type: "Graduation",
    color: "from-amber-50 to-yellow-50",
    image: getEventImage("Graduation"),
  },
  {
    type: "Anniversary",
    color: "from-red-50 to-rose-50",
    image: getEventImage("Anniversary"),
  },
  {
    type: "Gender Reveal",
    color: "from-pink-50 to-purple-50",
    image: getEventImage("Gender Reveal"),
  },
  {
    type: "Holiday Lights Event",
    color: "from-orange-50 to-amber-50",
    image: getEventImage("Holiday Lights Event"),
  },
  {
    type: "Community Celebration",
    color: "from-teal-50 to-emerald-50",
    image: getEventImage("Community Celebration"),
  },
  {
    type: "Halloween Party",
    color: "from-orange-50 to-yellow-50",
    image: getEventImage("Halloween Party"),
  },
  {
    type: "Christmas Party",
    color: "from-green-50 to-emerald-50",
    image: getEventImage("Christmas Party"),
  },
  {
    type: "Baptism",
    color: "from-blue-50 to-indigo-50",
    image: getEventImage("Baptism"),
  },
  {
    type: "Bar / Bat Mitzvah",
    color: "from-indigo-50 to-blue-50",
    image: getEventImage("Bar / Bat Mitzvah"),
  },
  {
    type: "Housewarming",
    color: "from-lime-50 to-green-50",
    image: getEventImage("Housewarming"),
  },
  {
    type: "Naming Ceremony",
    color: "from-cyan-50 to-sky-50",
    image: getEventImage("Naming Ceremony"),
  },
  {
    type: "Maternity Photoshoot",
    color: "from-rose-50 to-pink-50",
    image: getEventImage("Maternity Photoshoot"),
  },
  {
    type: "Baby Photoshoot",
    color: "from-yellow-50 to-amber-50",
    image: getEventImage("Baby Photoshoot"),
  },
  {
    type: "Car Blessing",
    color: "from-violet-50 to-indigo-50",
    image: getEventImage("Car Blessing"),
  },
  {
    type: "Other",
    color: "from-slate-50 to-gray-50",
    image: getEventImage("Other"),
  },
];

const BrowseByCelebration = () => (
  <section className="py-16 md:py-24">
    <div className="container">
      <div className="text-center mb-12">
        <span className="section-eyebrow block mb-2">Every Occasion</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Browse by Celebration</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          Whatever you're celebrating, we have the perfect vendors to make it extraordinary
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {celebrations.map(cel => (
          <Link
            key={cel.type}
            to={`/browse?event=${encodeURIComponent(cel.type)}`}
            className="group relative flex flex-col items-center rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative w-full h-32 overflow-hidden">
              <img
                src={cel.image}
                alt={cel.type}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            </div>
            <div className={`w-full px-3 py-3 bg-gradient-to-b ${cel.color} text-center`}>
              <p className="text-xs sm:text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                {cel.type}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default BrowseByCelebration;
