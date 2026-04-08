import { Link } from "react-router-dom";

const celebrations = [
  {
    type: "Wedding",
    color: "from-rose-50 to-pink-50",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Birthday Party",
    color: "from-violet-50 to-purple-50",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Baby Shower",
    color: "from-sky-50 to-blue-50",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Quinceañera",
    color: "from-fuchsia-50 to-pink-50",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Graduation",
    color: "from-amber-50 to-yellow-50",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Anniversary",
    color: "from-red-50 to-rose-50",
    image: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Gender Reveal",
    color: "from-pink-50 to-purple-50",
    image: "https://images.unsplash.com/photo-1604912153786-cfc7c9b69210?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Diwali Event",
    color: "from-orange-50 to-amber-50",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Eid Celebration",
    color: "from-teal-50 to-emerald-50",
    image: "https://images.unsplash.com/photo-1614107151491-6876eecbff89?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Halloween Party",
    color: "from-orange-50 to-yellow-50",
    image: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Christmas Party",
    color: "from-green-50 to-emerald-50",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Baptism",
    color: "from-blue-50 to-indigo-50",
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Bar / Bat Mitzvah",
    color: "from-indigo-50 to-blue-50",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a433980?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Housewarming / Griha Pravesh",
    color: "from-lime-50 to-green-50",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Naming Ceremony / Namkaran",
    color: "from-cyan-50 to-sky-50",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Maternity Photoshoot",
    color: "from-rose-50 to-pink-50",
    image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Baby Photoshoot",
    color: "from-yellow-50 to-amber-50",
    image: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Car Pooja",
    color: "from-violet-50 to-indigo-50",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=280&fit=crop&q=80",
  },
  {
    type: "Other",
    color: "from-slate-50 to-gray-50",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=280&fit=crop&q=80",
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
