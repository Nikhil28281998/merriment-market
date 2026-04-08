export const categories = [
  "Photographer", "Decorator", "Caterer", "DJ", "Florist",
  "Videographer", "Priest/Pandit", "Makeup Artist", "Cake Designer", "Event Planner", "Venue",
] as const;

export const eventTypes = [
  "Wedding", "Baby Shower", "Birthday Party", "Gender Reveal",
  "Naming Ceremony / Namkaran", "Housewarming / Griha Pravesh", "Car Pooja",
  "Halloween Party", "Christmas Party", "Graduation", "Anniversary",
  "Quinceañera", "Baptism", "Bar / Bat Mitzvah", "Maternity Photoshoot",
  "Baby Photoshoot", "Eid Celebration", "Diwali Event", "Other",
] as const;

export interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  photo: string;
  coverPhoto: string;
  bio: string;
  portfolio: string[];
  packages: VendorPackage[];
  reviews: Review[];
  mediaVideos?: VendorMediaVideo[];
  verified?: boolean;
  /**
   * States (abbreviations) this vendor is willing to travel to and serve,
   * in addition to their home state. Use ["Nationwide"] to indicate USA-wide service.
   */
  serviceStates?: string[];
}

export interface VendorMediaVideo {
  id: string;
  title: string;
  sourceType: "embed" | "upload";
  sourceUrl: string;
  thumbnailUrl?: string;
}

export interface VendorPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  includes: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Booking {
  id: string;
  vendorName: string;
  eventType: string;
  eventDate: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
  packageName: string;
}

export const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Anand Studio Photography",
    category: "Photographer",
    city: "Edison",
    state: "NJ",
    rating: 4.9,
    reviewCount: 243,
    startingPrice: 450,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=400&fit=crop",
    bio: "Anand Studio has been capturing life's most cherished moments across New Jersey for over 12 years. Specializing in South Asian weddings, engagement sessions, and family milestones, we combine candid storytelling with stunning cinematic portraits. Every frame we deliver is color-graded and hand-edited to perfection.",
    portfolio: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p1a", name: "Essentials", description: "Ideal for intimate ceremonies and small gatherings", price: 450, includes: ["4 hours of coverage", "150 edited digital photos", "Private online gallery", "1 photographer"] },
      { id: "p1b", name: "Premium", description: "Our most popular package for full-day events", price: 1200, includes: ["8 hours of coverage", "400 edited digital photos", "Private online gallery", "Engagement session", "Custom photo album", "2 photographers"] },
      { id: "p1c", name: "Grand Celebration", description: "Multi-day coverage for elaborate celebrations", price: 2800, includes: ["2-day coverage (up to 16 hrs)", "800+ edited photos", "Engagement + pre-wedding shoot", "Premium leather album", "Canvas prints (3)", "2 photographers + assistant"] },
    ],
    mediaVideos: [
      { id: "mv1a", title: "Wedding Story Reel", sourceType: "embed", sourceUrl: "https://www.youtube.com/embed/EI3U0w7d7fI" },
      { id: "mv1b", title: "Behind The Shoot", sourceType: "upload", sourceUrl: "https://cdn.coverr.co/videos/coverr-wedding-photographer-5767/1080p.mp4", thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=640&h=360&fit=crop" },
    ],
    reviews: [
      { id: "r1a", author: "Meera P.", rating: 5, text: "Anand Studio made our wedding day unforgettable. The candid shots were absolutely breathtaking and every single photo looked like it belonged in a magazine. Highly recommend!", date: "2025-11-20" },
      { id: "r1b", author: "Raj & Sunita T.", rating: 5, text: "We booked the Premium package for our daughter's wedding and were blown away. The team was professional, punctual, and incredibly creative. The album is stunning.", date: "2025-10-08" },
      { id: "r1c", author: "Kevin L.", rating: 4, text: "Great quality photos and very responsive communication. Delivered everything on time. Would have loved a few more candid family shots, but overall a wonderful experience.", date: "2025-09-15" },
    ],
    serviceStates: ["NJ", "NY", "CT", "PA"],
  },
  {
    id: "2",
    name: "Royal Mandap Decorators",
    category: "Decorator",
    city: "Houston",
    state: "TX",
    rating: 4.8,
    reviewCount: 189,
    startingPrice: 600,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&h=400&fit=crop",
    bio: "Royal Mandap Decorators transforms ordinary venues into extraordinary celebrations. With 9 years of experience in Houston's vibrant event scene, we specialize in traditional Indian mandaps, modern reception décor, baby shower themes, and milestone birthday setups. We source premium florals, custom drapery, and bespoke lighting to match your vision and color palette.",
    portfolio: [
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p2a", name: "Classic Setup", description: "Essential decoration for smaller events", price: 600, includes: ["Backdrop with draping", "6 table centerpieces", "Basic uplighting", "Setup & teardown"] },
      { id: "p2b", name: "Elegant Package", description: "Elevated décor for mid-size celebrations", price: 1800, includes: ["Custom backdrop", "12 table centerpieces", "Full venue uplighting", "Stage décor", "Aisle runner & petals", "Setup & teardown"] },
      { id: "p2c", name: "Royal Experience", description: "Full-scale luxury venue transformation", price: 4500, includes: ["Custom mandap or stage", "Complete venue décor", "Premium floral arrangements", "Crystal & candle accents", "LED wall or projection", "Lounge furniture", "Dedicated décor coordinator"] },
    ],
    reviews: [
      { id: "r2a", author: "Priya & Arjun M.", rating: 5, text: "The mandap they built for our wedding was absolutely jaw-dropping. Every guest was complimenting the décor all night. Worth every penny!", date: "2025-12-01" },
      { id: "r2b", author: "Fatima H.", rating: 5, text: "Used them for my daughter's sweet sixteen. The pink and gold theme was executed flawlessly. The team was courteous and cleaned up everything after.", date: "2025-11-10" },
      { id: "r2c", author: "David R.", rating: 4, text: "Beautiful work on our anniversary party. The lighting really set the mood. Slight delay on setup but the end result was fantastic.", date: "2025-08-22" },
    ],
    serviceStates: ["TX", "OK", "LA", "AR", "NM"],
  },
  {
    id: "3",
    name: "Saffron Bites Catering",
    category: "Caterer",
    city: "Dallas",
    state: "TX",
    rating: 4.7,
    reviewCount: 276,
    startingPrice: 200,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=400&fit=crop",
    bio: "Saffron Bites brings authentic multi-cuisine flavors to your celebrations. Based in Dallas, we cater everything from intimate baby showers of 25 guests to grand weddings of 800+. Our chefs specialize in North Indian, South Indian, Indo-Chinese, and continental menus. We pride ourselves on fresh ingredients, beautiful presentation, and impeccable service.",
    portfolio: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p3a", name: "Simple Spread", description: "Buffet-style for casual events (per plate)", price: 200, includes: ["3 appetizers", "2 entrées", "Rice & naan", "1 dessert", "Soft drinks", "Disposable servingware"] },
      { id: "p3b", name: "Grand Feast", description: "Premium buffet for weddings & receptions (per plate)", price: 450, includes: ["Live chaat station", "5 appetizers", "4 entrées", "Biryani station", "Dessert bar (3 items)", "Full bar package", "China plates & linens", "Service staff"] },
      { id: "p3c", name: "Maharaja Experience", description: "Ultra-premium plated dinner (per plate)", price: 750, includes: ["Passed hors d'oeuvres", "5-course plated dinner", "Chef's table station", "Premium dessert display", "Custom cocktail menu", "Full service staff", "Tasting session included"] },
    ],
    reviews: [
      { id: "r3a", author: "Anitha K.", rating: 5, text: "The food was the highlight of our wedding! Guests are still talking about the biryani and the live chaat counter. Saffron Bites exceeded every expectation.", date: "2025-11-28" },
      { id: "r3b", author: "James & Tara W.", rating: 5, text: "We hired them for a 200-person reception and the service was seamless. Every dish was fresh, flavorful, and beautifully presented.", date: "2025-10-14" },
      { id: "r3c", author: "Neha S.", rating: 4, text: "Delicious food and great variety. The paneer tikka was outstanding. Only feedback is the dessert could have had more options, but overall fantastic.", date: "2025-09-03" },
    ],
    serviceStates: ["Nationwide"],
  },
  {
    id: "4",
    name: "DJ Vikram Entertainment",
    category: "DJ",
    city: "San Jose",
    state: "CA",
    rating: 4.8,
    reviewCount: 134,
    startingPrice: 400,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop",
    bio: "DJ Vikram has been the Bay Area's go-to event DJ for over 7 years, bringing high-energy soundtracks to weddings, sangeets, birthday parties, and corporate events. From Bollywood and Bhangra to Top 40, Latin, and EDM, we read the crowd and keep the dance floor packed all night. Full sound, lighting, and MC services included.",
    portfolio: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571266028243-3716f02d2d5e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p4a", name: "Party Starter", description: "Perfect for birthdays & small gatherings", price: 400, includes: ["3 hours of DJ", "Professional sound system", "Basic LED lights", "Wireless mic for speeches"] },
      { id: "p4b", name: "Sangeet Special", description: "Designed for sangeet nights & receptions", price: 900, includes: ["5 hours of DJ", "Premium sound system", "Dance floor lighting package", "MC/hosting services", "Wireless mics (2)", "Custom playlist consultation"] },
      { id: "p4c", name: "All Night Affair", description: "The ultimate full-event DJ experience", price: 1800, includes: ["8 hours of DJ", "Concert-grade sound", "Intelligent lighting rig", "Fog & haze machines", "MC services all night", "Dhol player (1 hr)", "LED dance floor", "Custom song edits"] },
    ],
    reviews: [
      { id: "r4a", author: "Simran & Amit J.", rating: 5, text: "DJ Vikram absolutely killed it at our sangeet! The Bollywood-Bhangra mix had everyone on the dance floor. Even our grandparents were dancing!", date: "2025-12-05" },
      { id: "r4b", author: "Carlos M.", rating: 5, text: "Hired him for my 30th birthday and the energy was incredible. Great mix of genres, read the room perfectly, and the lighting was amazing.", date: "2025-10-20" },
      { id: "r4c", author: "Lisa T.", rating: 4, text: "Very professional and talented. Music selection was on point. Just wish the sound check had started a bit earlier, but once we got going it was non-stop fun.", date: "2025-09-10" },
    ],
    serviceStates: ["CA", "NV", "AZ", "OR", "WA"],
  },
  {
    id: "5",
    name: "Pushpa's Floral Creations",
    category: "Florist",
    city: "Edison",
    state: "NJ",
    rating: 4.9,
    reviewCount: 167,
    startingPrice: 250,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=400&fit=crop",
    bio: "Pushpa's Floral Creations designs breathtaking floral arrangements for every occasion. Located in Edison, NJ, we serve the entire tri-state area with fresh, seasonal flowers sourced from local farms and premium importers. Whether it's an intimate baby shower or a grand 500-guest wedding, we bring your floral vision to life with meticulous attention to detail.",
    portfolio: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p5a", name: "Bloom Basics", description: "Simple yet elegant floral accents", price: 250, includes: ["Bridal bouquet", "Groom's boutonniere", "4 table centerpieces", "Free delivery within 20 miles"] },
      { id: "p5b", name: "Garden Romance", description: "Lush florals for a full event", price: 800, includes: ["Bridal bouquet + toss bouquet", "Bridesmaid bouquets (4)", "Boutonnieres (6)", "10 table centerpieces", "Welcome sign arrangement", "Cake flowers", "Free delivery & setup"] },
      { id: "p5c", name: "Floral Fantasy", description: "Over-the-top luxury floral experience", price: 2200, includes: ["All Garden Romance inclusions", "Mandap or arch floral installation", "Aisle arrangements (20)", "Hanging floral chandeliers", "Lounge area florals", "Petal toss baskets", "On-site florist coordinator"] },
    ],
    reviews: [
      { id: "r5a", author: "Deepa & Vikash R.", rating: 5, text: "Pushpa's team created the most stunning mandap flowers we've ever seen. Fresh roses and marigolds everywhere — the photos came out gorgeous!", date: "2025-11-15" },
      { id: "r5b", author: "Amanda C.", rating: 5, text: "I used them for my baby shower and the centerpieces were absolutely beautiful. Soft pastels with peonies and eucalyptus — exactly what I wanted.", date: "2025-10-02" },
      { id: "r5c", author: "Rachel S.", rating: 5, text: "Incredible attention to detail. They matched the flowers perfectly to our wedding color palette. The arch installation took my breath away.", date: "2025-08-30" },
    ],
    serviceStates: ["NJ", "NY", "CT", "PA", "DE"],
  },
  {
    id: "6",
    name: "Pandit Raghunath Ji",
    category: "Priest/Pandit",
    city: "New York",
    state: "NY",
    rating: 5.0,
    reviewCount: 98,
    startingPrice: 300,
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&h=400&fit=crop",
    bio: "Pandit Raghunath Ji has been conducting Hindu religious ceremonies across the New York tri-state area for over 20 years. Fluent in Sanskrit, Hindi, and English, he ensures that every ritual is performed authentically while explaining each step to families in a way everyone can understand. From weddings and naming ceremonies to housewarmings and car poojas, every ceremony is conducted with warmth, devotion, and precision.",
    portfolio: [
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p6a", name: "Simple Ceremony", description: "For small poojas and prayers", price: 300, includes: ["1-hour ceremony", "All prayer materials (samagri)", "English explanation of rituals", "Travel within NYC metro"] },
      { id: "p6b", name: "Traditional Wedding", description: "Complete Hindu wedding ceremony", price: 700, includes: ["3-hour ceremony", "All samagri & sacred items", "Ganesh pooja + main ceremony", "Step-by-step English narration", "Pre-ceremony consultation", "Travel within tri-state area"] },
      { id: "p6c", name: "Multi-Event Package", description: "For families with multiple ceremonies", price: 1500, includes: ["Mehendi pooja", "Haldi ceremony", "Full wedding ceremony", "All samagri for all events", "Personalized mantras", "Unlimited consultation calls", "Travel included"] },
    ],
    reviews: [
      { id: "r6a", author: "Sunita & Ramesh G.", rating: 5, text: "Pandit Ji conducted our son's wedding beautifully. He explained every ritual in English so all our American-born guests could follow along. Truly a special experience.", date: "2025-12-10" },
      { id: "r6b", author: "Pooja D.", rating: 5, text: "He performed our baby's naming ceremony with so much warmth and care. Very patient, very knowledgeable, and arrived right on time. Highly recommended!", date: "2025-11-01" },
      { id: "r6c", author: "Anil & Kavita S.", rating: 5, text: "We've used Pandit Raghunath Ji for our housewarming and car pooja. Both times he was wonderful — thorough, respectful, and genuinely kind.", date: "2025-09-18" },
    ],
    serviceStates: ["NY", "NJ", "CT", "PA", "MA"],
  },
  {
    id: "7",
    name: "CineStory Films",
    category: "Videographer",
    city: "Chicago",
    state: "IL",
    rating: 4.8,
    reviewCount: 112,
    startingPrice: 500,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=400&fit=crop",
    bio: "CineStory Films creates cinematic wedding and event films that you'll watch over and over. Based in Chicago, our team uses professional cinema cameras, drone footage, and creative editing to tell your story in the most beautiful way. We believe every celebration has a unique narrative — let us capture yours.",
    portfolio: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p7a", name: "Highlight Reel", description: "A beautiful 3-5 minute film of your event", price: 500, includes: ["5 hours of coverage", "3-5 min cinematic highlight", "Licensed music", "Online delivery", "1 videographer"] },
      { id: "p7b", name: "Feature Film", description: "Full-length cinematic coverage", price: 1500, includes: ["8 hours of coverage", "Highlight reel (5 min)", "Full ceremony edit", "Full reception edit", "Drone footage", "2 videographers", "Online delivery"] },
      { id: "p7c", name: "Epic Story", description: "Multi-day documentary-style coverage", price: 3500, includes: ["2-day coverage", "Cinematic highlight (8 min)", "Full ceremony + reception edits", "Same-day edit for reception", "Drone footage", "3 videographers", "Raw footage included", "USB delivery"] },
    ],
    reviews: [
      { id: "r7a", author: "Nina & Rohit B.", rating: 5, text: "Our wedding film made us cry happy tears! CineStory captured moments we didn't even know happened. The drone shots of the venue were stunning.", date: "2025-11-22" },
      { id: "r7b", author: "Jennifer P.", rating: 5, text: "The same-day edit they played at our reception blew everyone away. Professional, creative, and so easy to work with throughout the entire process.", date: "2025-10-05" },
      { id: "r7c", author: "Sameer A.", rating: 4, text: "Really high-quality work. The highlight reel was beautifully edited. Delivery took about 6 weeks which felt long, but the result was well worth the wait.", date: "2025-08-14" },
    ],
    serviceStates: ["Nationwide"],
  },
  {
    id: "17",
    name: "Sweet Memories Cake Studio",
    category: "Cake Designer",
    city: "Atlanta",
    state: "GA",
    rating: 4.9,
    reviewCount: 142,
    startingPrice: 180,
    photo: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1200&h=400&fit=crop",
    bio: "Sweet Memories Cake Studio creates breathtaking custom cakes for every celebration. Based in Atlanta, we hand-craft multi-tiered wedding cakes, novelty birthday cakes, and elegant celebration desserts using fresh, premium ingredients tailored to any theme or color palette.",
    portfolio: [
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p9a", name: "Classic Cake", description: "Elegant 2-tier cake for up to 50 guests", price: 180, includes: ["2-tier fondant cake", "Custom design consultation", "Delivery within 30 miles", "Cake cutting set"] },
      { id: "p9b", name: "Celebration Cake", description: "3-tier showstopper for 50–100 guests", price: 380, includes: ["3-tier cake", "Edible flowers & decorations", "Flavor of choice (3 layers)", "Delivery & setup", "Dessert table options"] },
      { id: "p9c", name: "Grand Wedding Cake", description: "Luxury multi-tier for 100+ guests", price: 750, includes: ["4–5-tier cake", "Custom sugar flowers", "Multiple cake flavors", "Dessert table (cupcakes, macarons)", "Delivery & on-site setup", "Tasting session included"] },
    ],
    reviews: [
      { id: "r9a", author: "Kavya B.", rating: 5, text: "The wedding cake was absolutely stunning and delicious! Every single guest complimented it. Sweet Memories nailed our floral design theme perfectly.", date: "2025-11-18" },
      { id: "r9b", author: "Tracy M.", rating: 5, text: "Ordered the Celebration Cake for my daughter's quinceañera. It was a masterpiece — beautiful and tasted incredible. Highly recommend!", date: "2025-10-04" },
      { id: "r9c", author: "Arun K.", rating: 4, text: "Fantastic cake for our baby shower. Loved the pastel design. Delivery was on time and the team was very friendly.", date: "2025-09-12" },
    ],
    serviceStates: ["GA", "FL", "SC", "NC", "TN", "AL"],
  },
  {
    id: "18",
    name: "Evoke Events Planning",
    category: "Event Planner",
    city: "Miami",
    state: "FL",
    rating: 4.8,
    reviewCount: 198,
    startingPrice: 500,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=400&fit=crop",
    bio: "Evoke Events Planning brings your vision to life with flawless execution. Based in Miami, our certified event planners specialize in full-service wedding coordination, corporate galas, quinceañeras, and milestone celebrations. We handle every detail so you can be fully present on your special day.",
    portfolio: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p10a", name: "Day-Of Coordination", description: "Full coordination on your event day", price: 500, includes: ["Event-day coordinator (10 hrs)", "Vendor communication day-of", "Timeline management", "Ceremony & reception direction", "Emergency kit"] },
      { id: "p10b", name: "Partial Planning", description: "Support for the last 3 months", price: 1500, includes: ["3-month planning support", "Vendor recommendations & booking", "Budget tracking", "Timeline creation", "Rehearsal coordination", "Day-of coordination (10 hrs)"] },
      { id: "p10c", name: "Full Service Planning", description: "Complete planning from start to finish", price: 3500, includes: ["12-month full planning", "Venue scouting & booking", "All vendor sourcing & management", "Budget management", "Design concept & mood board", "Unlimited consultations", "Day-of coordination team", "Post-event follow-up"] },
    ],
    reviews: [
      { id: "r10a", author: "Sofia & Diego R.", rating: 5, text: "Evoke made our wedding absolutely perfect. Every vendor they recommended was top-notch. Our planner was calm, organized, and made the day run flawlessly.", date: "2025-12-07" },
      { id: "r10b", author: "Angela T.", rating: 5, text: "Used them for my quinceañera and it was a dream come true. They coordinated every detail from the court choreography to the cake reveal. Flawless!", date: "2025-11-03" },
      { id: "r10c", author: "Marcus J.", rating: 4, text: "Great team for our corporate gala. Very professional. A few minor communication delays early on, but the event itself was executed perfectly.", date: "2025-09-20" },
    ],
    serviceStates: ["FL", "GA", "SC", "NC", "AL"],
  },
  {
    id: "11",
    name: "Lens & Light Photography",
    category: "Photographer",
    city: "Los Angeles",
    state: "CA",
    rating: 4.8,
    reviewCount: 312,
    startingPrice: 600,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=400&fit=crop",
    bio: "Lens & Light Photography captures life's milestone moments with cinematic artistry. Based in Los Angeles, we serve couples, families, and brands with our signature blend of editorial and natural-light photography. Over 1,200 sessions photographed across California and beyond.",
    portfolio: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p11a", name: "Mini Session", description: "Quick portrait session for small events", price: 600, includes: ["2 hours of coverage", "100 edited photos", "Online gallery", "1 photographer"] },
      { id: "p11b", name: "Standard Package", description: "Full-day photography for weddings", price: 2200, includes: ["8 hours coverage", "500 edited photos", "Two photographers", "Online gallery", "Engagement session"] },
      { id: "p11c", name: "Luxury Package", description: "Ultimate premium photography experience", price: 4500, includes: ["Full weekend coverage", "800+ photos", "Two photographers + assistant", "Premium photo album", "Canvas prints", "Drone photos"] },
    ],
    reviews: [
      { id: "r11a", author: "Jessica & Omar K.", rating: 5, text: "Absolutely loved working with Lens & Light! The photos from our wedding were beyond anything we imagined. Every moment captured perfectly.", date: "2025-12-02" },
      { id: "r11b", author: "Priscilla N.", rating: 5, text: "They photographed my baby shower and the results were magical. So much care and creative direction in every shot.", date: "2025-10-15" },
      { id: "r11c", author: "Kyle A.", rating: 4, text: "Very professional and talented team. Delivered our gallery earlier than expected. A few shots were overexposed but overall amazing work.", date: "2025-08-28" },
    ],
    serviceStates: ["CA", "NV", "AZ", "OR"],
  },
  {
    id: "12",
    name: "Metro DJ Collective",
    category: "DJ",
    city: "Chicago",
    state: "IL",
    rating: 4.7,
    reviewCount: 178,
    startingPrice: 350,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&h=400&fit=crop",
    bio: "Metro DJ Collective is Chicago's premier DJ and entertainment company, serving events of all sizes and cultures. From intimate birthday gatherings to large wedding receptions and corporate galas, we deliver premium sound, lighting, and an unforgettable atmosphere every time.",
    portfolio: [
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571266028243-3716f02d2d5e?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p12a", name: "Basic Party", description: "Great for intimate events up to 80 guests", price: 350, includes: ["3 hours DJ", "Basic sound system", "Party lighting", "MC services"] },
      { id: "p12b", name: "Premium Reception", description: "Full reception experience", price: 850, includes: ["6 hours DJ", "Premium sound system", "Full lighting package", "MC services", "Custom playlist", "Wireless mics (2)"] },
      { id: "p12c", name: "Grand Celebration", description: "Top-tier experience for large events", price: 1600, includes: ["8 hours DJ", "Concert sound system", "LED lighting rig", "Up-lighting", "Photo booth integration", "MC services", "Custom monogram"] },
    ],
    reviews: [
      { id: "r12a", author: "Tiffany W.", rating: 5, text: "Metro DJ had everyone on the dance floor all night at our quinceañera! Amazing music selection and the lighting made the venue look incredible.", date: "2025-11-25" },
      { id: "r12b", author: "Daniel & Rosa P.", rating: 5, text: "Perfect for our wedding reception. They kept the energy up from first dance to last song. Guests are still talking about it!", date: "2025-10-11" },
      { id: "r12c", author: "Brandon G.", rating: 4, text: "Great DJ for our corporate holiday party. Very professional. Would love a bit more variety in genre selection but overall fantastic.", date: "2025-09-05" },
    ],
  },
  {
    id: "13",
    name: "Garden & Bloom Florals",
    category: "Florist",
    city: "Seattle",
    state: "WA",
    rating: 4.9,
    reviewCount: 134,
    startingPrice: 300,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=400&fit=crop",
    bio: "Garden & Bloom Florals creates lush, garden-inspired floral arrangements for weddings, baby showers, and all life's celebrations in the Seattle area. We source from local Pacific Northwest farms and European importers to craft fresh, seasonal designs that feel both romantic and timeless.",
    portfolio: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p13a", name: "Simple Garden", description: "Fresh florals for small celebrations", price: 300, includes: ["Bridal bouquet", "4 table centerpieces", "Boutonniere", "Free local delivery"] },
      { id: "p13b", name: "Lush Ceremony", description: "Full floral package for ceremonies", price: 900, includes: ["Bridal + bridesmaid bouquets (3)", "Ceremony arch florals", "10 centerpieces", "Aisle arrangements", "Setup & breakdown"] },
      { id: "p13c", name: "Garden Paradise", description: "Luxury full-event floral experience", price: 2500, includes: ["Complete bridal party florals", "Ceremony arch installation", "20 centerpieces", "Hanging floral chandeliers", "Lounge florals", "Flower wall backdrop", "Dedicated on-site florist"] },
    ],
    reviews: [
      { id: "r13a", author: "Emma & Liam H.", rating: 5, text: "Garden & Bloom turned our wedding into a literal garden. The arch was jaw-dropping and the bridal bouquet was even more beautiful in person than in the mock-up.", date: "2025-11-30" },
      { id: "r13b", author: "Claire F.", rating: 5, text: "Used them for my baby shower and the arrangements were dreamy — blush peonies and eucalyptus exactly as I envisioned. Will definitely book again.", date: "2025-10-08" },
      { id: "r13c", author: "Yasmin N.", rating: 4, text: "Lovely florals for our Eid celebration. Very accommodating of our color palette request. Setup was smooth and professional.", date: "2025-09-28" },
    ],
  },
  {
    id: "14",
    name: "Phoenix Grand Décor",
    category: "Decorator",
    city: "Phoenix",
    state: "AZ",
    rating: 4.7,
    reviewCount: 155,
    startingPrice: 500,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=400&fit=crop",
    bio: "Phoenix Grand Décor specializes in turning venues into extraordinary visual experiences. From desert-chic wedding backdrops to vibrant quinceañera setups and elegant corporate installations, our team brings professional-grade décor to every celebration across the Phoenix metro area.",
    portfolio: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p14a", name: "Starter Setup", description: "Basic décor for 50–75 guests", price: 500, includes: ["Backdrop with draping", "5 table centerpieces", "Uplighting (4 fixtures)", "Setup & teardown"] },
      { id: "p14b", name: "Premium Event", description: "Mid-range décor for 75–150 guests", price: 1600, includes: ["Custom backdrop", "10 centerpieces", "Full venue uplighting", "Balloon installations", "Stage décor", "Setup & teardown"] },
      { id: "p14c", name: "Luxury Transformation", description: "Full venue takeover for 150+ guests", price: 3800, includes: ["Complete venue design", "Custom stage & mandap/arch", "Premium floral wall", "LED wall or projection", "Lounge furniture", "Balloon ceiling art", "Décor coordinator on site"] },
    ],
    reviews: [
      { id: "r14a", author: "Maria & Carlos V.", rating: 5, text: "Phoenix Grand Décor transformed our venue into a magical space for our quinceañera. The balloon installation was absolutely stunning!", date: "2025-11-14" },
      { id: "r14b", author: "Sunita R.", rating: 5, text: "Hired them for our Diwali celebration and the diyas and lights they created were breathtaking. Very creative team!", date: "2025-10-24" },
      { id: "r14c", author: "Brad T.", rating: 4, text: "Good quality décor for our anniversary dinner. Setup was quick and the team was professional. Would use again.", date: "2025-08-18" },
    ],
  },
  {
    id: "15",
    name: "Harvest Table Catering",
    category: "Caterer",
    city: "Seattle",
    state: "WA",
    rating: 4.8,
    reviewCount: 221,
    startingPrice: 220,
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop",
    bio: "Harvest Table Catering brings farm-to-table excellence to Seattle's event scene. We specialize in seasonal American and fusion menus for weddings, corporate events, graduation parties, and intimate gatherings. Our chefs partner with local farms to ensure the freshest ingredients in every dish.",
    portfolio: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p15a", name: "Simple Spread", description: "Buffet for up to 80 guests (per plate)", price: 220, includes: ["3 appetizers", "2 entrées", "Seasonal sides", "Dessert bar", "Service staff"] },
      { id: "p15b", name: "Harvest Feast", description: "Elevated farm-to-table experience (per plate)", price: 480, includes: ["5 passed appetizers", "Salad station", "4 entrées (carving station)", "3 desserts", "Full service", "China & linens"] },
      { id: "p15c", name: "Chef's Table", description: "Premium plated dinner (per plate)", price: 780, includes: ["Custom 5-course menu", "Sommelier-curated wine pairings", "Live cooking stations", "Premium dessert table", "Full wait staff", "Menu tasting included"] },
    ],
    reviews: [
      { id: "r15a", author: "Sarah & John D.", rating: 5, text: "Harvest Table catered our wedding and it was hands-down the best food I've ever had at a wedding. Every guest raved about the salmon and the dessert table!", date: "2025-12-03" },
      { id: "r15b", author: "Linda C.", rating: 5, text: "Used them for our daughter's graduation party. The buffet was fresh, delicious, and beautifully presented. Staff was attentive and friendly.", date: "2025-06-20" },
      { id: "r15c", author: "Ryan P.", rating: 4, text: "Great food for our corporate retreat. Very accommodating of dietary restrictions. Slight delay on setup but the quality made up for it.", date: "2025-10-01" },
    ],
  },
  {
    id: "16",
    name: "Cinematic Dreams Films",
    category: "Videographer",
    city: "Los Angeles",
    state: "CA",
    rating: 4.9,
    reviewCount: 187,
    startingPrice: 700,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=400&fit=crop",
    bio: "Cinematic Dreams Films crafts breathtaking event films with a Hollywood touch. Our LA-based team uses RED cinema cameras, aerial drone cinematography, and world-class editing to create films that feel like feature movies — not home videos. From an intimate Baptism to a grand 1,000-person wedding, we capture every frame with intention.",
    portfolio: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p16a", name: "Story Reel", description: "Cinematic 3-minute highlight film", price: 700, includes: ["6 hours coverage", "3-min cinematic film", "Licensed music", "2 videographers", "Online delivery"] },
      { id: "p16b", name: "Feature Film", description: "Full ceremony and reception edit", price: 2200, includes: ["10 hours coverage", "Cinematic highlight reel", "Full ceremony + reception edit", "Drone footage", "3 videographers", "Online + USB"] },
      { id: "p16c", name: "Cinema Package", description: "Multi-day documentary-style film", price: 4800, includes: ["Multi-day coverage", "10+ min highlight film", "All-day raw footage", "Same-day preview edit", "Aerial drone", "4 videographers", "Color-graded master copy"] },
    ],
    reviews: [
      { id: "r16a", author: "Ava & Noah T.", rating: 5, text: "Cinematic Dreams made a film that brought our entire family to tears — in the best way. It felt like a movie trailer for our love story. Absolutely worth every penny.", date: "2025-12-09" },
      { id: "r16b", author: "Pastor Emmanuel K.", rating: 5, text: "They filmed our church's Baptism ceremony with such reverence and beauty. The edit was spiritual and heartfelt. Thank you!", date: "2025-11-05" },
      { id: "r16c", author: "Nadia S.", rating: 5, text: "Hired them for our Bar Mitzvah and the video was incredible — they captured all the key moments and the drone shot of the venue was spectacular.", date: "2025-10-19" },
    ],
  },
  {
    id: "8",
    name: "Glamour by Nisha",
    category: "Makeup Artist",
    city: "Houston",
    state: "TX",
    rating: 4.9,
    reviewCount: 221,
    startingPrice: 150,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=400&fit=crop",
    bio: "Glamour by Nisha is Houston's premier bridal and event makeup studio. With expertise in South Asian bridal looks, HD airbrush makeup, and natural glam styles, Nisha and her team make every client feel like a star. We travel to your venue and bring everything needed to keep you flawless from ceremony to last dance. Over 500 brides served and counting!",
    portfolio: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p8a", name: "Party Ready", description: "Glam look for any occasion", price: 150, includes: ["Full face makeup", "Lashes included", "Setting spray", "Travel within Houston"] },
      { id: "p8b", name: "Bridal Glow", description: "Complete bridal makeup experience", price: 400, includes: ["Bridal trial session", "Wedding day makeup", "HD airbrush foundation", "Lashes & touch-up kit", "Draping assistance", "Travel included"] },
      { id: "p8c", name: "Bridal Party Package", description: "Makeup for the bride + bridesmaids", price: 800, includes: ["Bridal trial + wedding day makeup", "Bridesmaids makeup (up to 4)", "Mother of bride/groom makeup (2)", "Lashes for all", "On-site touch-ups", "Travel included", "Early morning availability"] },
    ],
    reviews: [
      { id: "r8a", author: "Shreya M.", rating: 5, text: "Nisha did my bridal makeup and I have never felt more beautiful in my life! The airbrush foundation lasted through 14 hours of celebrations without a single touch-up.", date: "2025-12-08" },
      { id: "r8b", author: "Aisha R.", rating: 5, text: "Booked the bridal party package for my wedding. Nisha and her assistant were amazing — everyone looked gorgeous and we had so much fun getting ready together.", date: "2025-11-12" },
      { id: "r8c", author: "Maria G.", rating: 5, text: "Used Glamour by Nisha for my quinceañera and I loved my look! She listened to exactly what I wanted and made it even better. So talented!", date: "2025-09-25" },
    ],
    verified: true,
  },
  {
    id: "9",
    name: "Sweet Layers Cake Studio",
    category: "Cake Designer",
    city: "Los Angeles",
    state: "CA",
    rating: 4.9,
    reviewCount: 143,
    startingPrice: 180,
    verified: true,
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1200&h=400&fit=crop",
    bio: "Sweet Layers Cake Studio crafts artisan custom cakes for weddings, quinceañeras, birthdays, baby showers, and every celebration in between. Based in Los Angeles, we specialize in multi-tiered fondant designs, floral cakes, and culturally-inspired creations that taste as spectacular as they look. Each cake is made to order with premium ingredients.",
    portfolio: [
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b19c?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p9a", name: "Celebration Cake", description: "Single-tier custom cake for smaller gatherings", price: 180, includes: ["Up to 30 servings", "Custom flavor & filling", "Fondant or buttercream finish", "Free local delivery"] },
      { id: "p9b", name: "Signature Tiered", description: "2–3 tier showstopper for mid-size events", price: 450, includes: ["Up to 100 servings", "Custom design consultation", "Fresh floral or fondant décor", "Cake stand rental", "Delivery & setup"] },
      { id: "p9c", name: "Grand Wedding Cake", description: "Luxury multi-tier masterpiece", price: 1200, includes: ["4–6 tiers, 200+ servings", "Detailed design session", "Tasting consultation", "Premium flavor combinations", "Floral & gold leaf décor", "Delivery, setup & cutting guide"] },
    ],
    reviews: [
      { id: "r9a", author: "Pooja & Rahul N.", rating: 5, text: "Our wedding cake was a 5-tier masterpiece with rose gold detailing. Every guest wanted to know who made it. Absolutely stunning and delicious!", date: "2025-12-15" },
      { id: "r9b", author: "Carmen L.", rating: 5, text: "Ordered a quinceañera cake with a floral cascade — it was the centerpiece of the whole event. Tasted as incredible as it looked.", date: "2025-11-08" },
      { id: "r9c", author: "Tanya B.", rating: 4, text: "Beautiful baby shower cake and great flavor. Lead time was 3 weeks but well worth the wait.", date: "2025-09-20" },
    ],
  },
  {
    id: "10",
    name: "Milestone Events Co.",
    category: "Event Planner",
    city: "Atlanta",
    state: "GA",
    rating: 4.8,
    reviewCount: 97,
    startingPrice: 500,
    verified: true,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=400&fit=crop",
    bio: "Milestone Events Co. is Atlanta's go-to full-service event planning firm. From intimate 20-person dinner parties to grand 500-guest weddings and cultural celebrations, our team handles every detail — venue sourcing, vendor coordination, decor design, budget management, and day-of logistics. We specialize in South Asian, African-American, Latino, and multicultural events.",
    portfolio: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p10a", name: "Day-Of Coordination", description: "We manage your event day so you enjoy it", price: 500, includes: ["8-hour coordination", "Vendor liaison on the day", "Timeline management", "Setup & breakdown oversight", "Emergency kit provided"] },
      { id: "p10b", name: "Partial Planning", description: "Design & coordination from 3 months out", price: 1500, includes: ["3-month planning support", "Vendor recommendations & booking", "Budget tracker", "Design mood board", "Day-of full coordination", "2 planning meetings"] },
      { id: "p10c", name: "Full-Service Planning", description: "End-to-end management from day one", price: 4000, includes: ["Unlimited planning calls", "Full vendor sourcing & negotiation", "Venue selection assistance", "Custom design & decor plan", "Guest management", "Day-of coordination team", "Post-event wrap-up"] },
    ],
    reviews: [
      { id: "r10a", author: "Priya & James A.", rating: 5, text: "Milestone handled our multicultural wedding flawlessly. They understood both our traditions and executed every detail perfectly. Worth every penny!", date: "2025-12-20" },
      { id: "r10b", author: "Yolanda T.", rating: 5, text: "From my first call to the last dance, they were on top of everything. My daughter's quinceañera was magazine-worthy thanks to this team.", date: "2025-10-30" },
      { id: "r10c", author: "Sameer V.", rating: 4, text: "Great planning, good communication. The day-of coordination package alone saved us so much stress. Would book again for any future event.", date: "2025-09-05" },
    ],
  },
];

export const mockBookings: Booking[] = [
  { id: "b1", vendorName: "Anand Studio Photography", eventType: "Wedding", eventDate: "2026-05-15", status: "upcoming", price: 1380, packageName: "Premium" },
  { id: "b2", vendorName: "Saffron Bites Catering", eventType: "Birthday Party", eventDate: "2026-04-20", status: "upcoming", price: 517, packageName: "Grand Feast" },
  { id: "b3", vendorName: "DJ Vikram Entertainment", eventType: "Wedding", eventDate: "2025-12-10", status: "completed", price: 1035, packageName: "Sangeet Special" },
  { id: "b4", vendorName: "Pushpa's Floral Creations", eventType: "Baby Shower", eventDate: "2025-11-05", status: "completed", price: 920, packageName: "Garden Romance" },
  { id: "b5", vendorName: "Royal Mandap Decorators", eventType: "Anniversary", eventDate: "2025-10-01", status: "cancelled", price: 690, packageName: "Classic Setup" },
];
