import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getEventImage } from "@/data/eventImageLibrary";

const ideas = [
  {
    title: "Boho Garden Wedding",
    tag: "Wedding",
    image: getEventImage("Wedding"),
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "Pastel Baby Shower Setup",
    tag: "Baby Shower",
    image: getEventImage("Baby Shower"),
    color: "bg-sky-100 text-sky-700",
  },
  {
    title: "Vibrant Quinceañera Décor",
    tag: "Quinceañera",
    image: getEventImage("Quinceañera"),
    color: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    title: "Magical Holiday Lights",
    tag: "Holiday Lights Event",
    image: getEventImage("Holiday Lights Event"),
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Spooky Halloween Vibes",
    tag: "Halloween Party",
    image: getEventImage("Halloween Party"),
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Elegant Anniversary Dinner",
    tag: "Anniversary",
    image: getEventImage("Anniversary"),
    color: "bg-red-100 text-red-700",
  },
  {
    title: "Grand Graduation Party",
    tag: "Graduation",
    image: getEventImage("Graduation"),
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Festive Community Banquet",
    tag: "Community Celebration",
    image: getEventImage("Community Celebration"),
    color: "bg-teal-100 text-teal-700",
  },
];

const InspirationSection = () => (
  <section id="inspiration" className="py-16 md:py-24 section-alt">
    <div className="container">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="section-eyebrow block mb-2">Get Inspired</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Style Studio Preview</h2>
          <p className="text-muted-foreground max-w-lg">
            Explore curated concepts, then open Style Studio for full color, style, and theme planning
          </p>
        </div>
        <Link to="/style-studio" className="hidden md:flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
          Open Style Studio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ideas.map(idea => (
          <Link
            key={idea.title}
            to={`/browse?event=${encodeURIComponent(idea.tag)}`}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative h-52 sm:h-60 overflow-hidden">
              <img
                src={idea.image}
                alt={idea.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${idea.color}`}>
                {idea.tag}
              </span>
              <h3 className="text-white font-heading font-bold text-base leading-tight group-hover:underline">
                {idea.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link to="/style-studio" className="text-sm font-semibold text-accent hover:underline flex items-center justify-center gap-1">
          Open Style Studio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default InspirationSection;
