import CelebrationCarousel from "./CelebrationCarousel";

const CelebrationShowcase = () => {
  const weddingSlides = [
    {
      id: 1,
      title: "Grand Wedding Ceremonies",
      description: "Elegant and timeless wedding celebrations with stunning decorations and professional services",
      image: "wedding-1",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 2,
      title: "Intimate Wedding Receptions",
      description: "Beautiful intimate gatherings with personalized touches and exquisite catering",
      image: "wedding-2",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      id: 3,
      title: "Wedding Photography",
      description: "Professional photographers capturing your most precious moments",
      image: "wedding-3",
      color: "from-rose-400 to-pink-600",
    },
    {
      id: 4,
      title: "Bridal Styling",
      description: "Expert makeup and styling services for the perfect wedding look",
      image: "wedding-4",
      color: "from-pink-400 to-rose-500",
    },
  ];

  const birthdaySlides = [
    {
      id: 1,
      title: "Children's Birthday Magic",
      description: "Fun-filled celebrations with entertainment and colorful decorations for kids",
      image: "birthday-1",
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: 2,
      title: "Teen Birthday Parties",
      description: "Trendy venues and DJs for unforgettable teen birthday celebrations",
      image: "birthday-2",
      color: "from-purple-400 to-blue-500",
    },
    {
      id: 3,
      title: "Adult Birthday Bashes",
      description: "Sophisticated celebrations with premium catering and entertainment",
      image: "birthday-3",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 4,
      title: "Birthday Cake Designs",
      description: "Custom designed cakes that are as beautiful as they are delicious",
      image: "birthday-4",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const decorationSlides = [
    {
      id: 1,
      title: "Floral Decorations",
      description: "Stunning floral arrangements and decorative setups for any celebration",
      image: "decor-1",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 2,
      title: "Balloon Art & Themes",
      description: "Creative balloon arrangements and themed decorations to set the mood",
      image: "decor-2",
      color: "from-yellow-400 to-red-500",
    },
    {
      id: 3,
      title: "Light & Lighting Effects",
      description: "Professional lighting setups for ambiance and visual impact",
      image: "decor-3",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: 4,
      title: "Venue Transformation",
      description: "Complete venue makeovers with customized themes and designs",
      image: "decor-4",
      color: "from-green-400 to-emerald-500",
    },
  ];

  const cateringSlides = [
    {
      id: 1,
      title: "Multi-Cuisine Catering",
      description: "Diverse international and local cuisines prepared by expert chefs",
      image: "catering-1",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: "Dessert & Beverage Selection",
      description: "Premium desserts, cakes, and refreshing beverages for all occasions",
      image: "catering-2",
      color: "from-pink-500 to-orange-400",
    },
    {
      id: 3,
      title: "Live Cooking Stations",
      description: "Interactive cooking stations with live food preparation",
      image: "catering-3",
      color: "from-green-600 to-emerald-500",
    },
    {
      id: 4,
      title: "Bar & Mocktail Service",
      description: "Professional bartenders serving signature cocktails and mocktails",
      image: "catering-4",
      color: "from-amber-500 to-yellow-400",
    },
  ];

  const entertainmentSlides = [
    {
      id: 1,
      title: "DJ & Music Services",
      description: "Professional DJs with latest music and state-of-the-art sound systems",
      image: "dj-1",
      color: "from-purple-600 to-indigo-500",
    },
    {
      id: 2,
      title: "Live Bands & Musicians",
      description: "Talented musicians and bands for live performances",
      image: "dj-2",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: 3,
      title: "Dance Performances",
      description: "Energetic dance performances and entertainment acts",
      image: "dj-3",
      color: "from-red-500 to-pink-500",
    },
    {
      id: 4,
      title: "Photography & Videography",
      description: "Professional documentation of your special moments",
      image: "dj-4",
      color: "from-slate-700 to-gray-600",
    },
  ];

  const genderRevealSlides = [
    {
      id: 1,
      title: "Gender Reveal Magic",
      description: "Creative and memorable gender reveal celebration setups",
      image: "reveal-1",
      color: "from-blue-500 to-pink-500",
    },
    {
      id: 2,
      title: "Themed Reveal Concepts",
      description: "Unique and personalized gender reveal themes and decorations",
      image: "reveal-2",
      color: "from-purple-500 to-pink-400",
    },
    {
      id: 3,
      title: "Reveal Cake & Surprises",
      description: "Custom reveal cakes and creative surprise elements",
      image: "reveal-3",
      color: "from-yellow-400 to-pink-500",
    },
    {
      id: 4,
      title: "Photography Sessions",
      description: "Professional photo shoots to capture the special moment",
      image: "reveal-4",
      color: "from-indigo-500 to-cyan-400",
    },
  ];

  const housewarmingSlides = [
    {
      id: 1,
      title: "Housewarming Parties",
      description: "Cozy and welcoming celebration setups for new homes",
      image: "housewarming-1",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 2,
      title: "Interior Styling",
      description: "Professional decoration and styling for your new space",
      image: "housewarming-2",
      color: "from-green-500 to-teal-500",
    },
    {
      id: 3,
      title: "Catering & Refreshments",
      description: "Delicious food and drinks for your housewarming guests",
      image: "housewarming-3",
      color: "from-red-500 to-orange-400",
    },
    {
      id: 4,
      title: "Entertainment & Games",
      description: "Fun activities and entertainment for housewarming celebrations",
      image: "housewarming-4",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-slate-50 to-white">
      <CelebrationCarousel 
        title="💍 Weddings" 
        slides={weddingSlides}
        interval={6000}
      />
      
      <CelebrationCarousel 
        title="🎂 Birthday Parties" 
        slides={birthdaySlides}
        interval={5500}
      />
      
      <CelebrationCarousel 
        title="🎨 Decorations & Themes" 
        slides={decorationSlides}
        interval={6000}
      />
      
      <CelebrationCarousel 
        title="🍽️ Catering & Food" 
        slides={cateringSlides}
        interval={5500}
      />
      
      <CelebrationCarousel 
        title="🎵 DJ & Entertainment" 
        slides={entertainmentSlides}
        interval={6000}
      />
      
      <CelebrationCarousel 
        title="👶 Gender Reveals" 
        slides={genderRevealSlides}
        interval={5500}
      />
      
      <CelebrationCarousel 
        title="🏠 Housewarmings" 
        slides={housewarmingSlides}
        interval={6000}
      />
    </div>
  );
};

export default CelebrationShowcase;
