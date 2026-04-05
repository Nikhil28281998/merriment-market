export const categories = [
  "Photographer", "Decorator", "Caterer", "DJ", "Florist",
  "Videographer", "Priest/Pandit", "Makeup Artist", "Cake Designer", "Event Planner",
] as const;

export const eventTypes = [
  "Wedding", "Baby Shower", "Birthday Party", "Gender Reveal", "Naming Ceremony",
  "Housewarming", "Car Pooja", "Halloween Party", "Christmas Party", "Graduation",
  "Anniversary", "Quinceañera", "Baptism", "Bar Mitzvah", "Maternity Shoot",
  "Baby Photoshoot", "Other",
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
    reviews: [
      { id: "r1a", author: "Meera P.", rating: 5, text: "Anand Studio made our wedding day unforgettable. The candid shots were absolutely breathtaking and every single photo looked like it belonged in a magazine. Highly recommend!", date: "2025-11-20" },
      { id: "r1b", author: "Raj & Sunita T.", rating: 5, text: "We booked the Premium package for our daughter's wedding and were blown away. The team was professional, punctual, and incredibly creative. The album is stunning.", date: "2025-10-08" },
      { id: "r1c", author: "Kevin L.", rating: 4, text: "Great quality photos and very responsive communication. Delivered everything on time. Would have loved a few more candid family shots, but overall a wonderful experience.", date: "2025-09-15" },
    ],
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
  },
];

export const mockBookings: Booking[] = [
  { id: "b1", vendorName: "Anand Studio Photography", eventType: "Wedding", eventDate: "2026-05-15", status: "upcoming", price: 1380, packageName: "Premium" },
  { id: "b2", vendorName: "Saffron Bites Catering", eventType: "Birthday Party", eventDate: "2026-04-20", status: "upcoming", price: 517, packageName: "Grand Feast" },
  { id: "b3", vendorName: "DJ Vikram Entertainment", eventType: "Wedding", eventDate: "2025-12-10", status: "completed", price: 1035, packageName: "Sangeet Special" },
  { id: "b4", vendorName: "Pushpa's Floral Creations", eventType: "Baby Shower", eventDate: "2025-11-05", status: "completed", price: 920, packageName: "Garden Romance" },
  { id: "b5", vendorName: "Royal Mandap Decorators", eventType: "Anniversary", eventDate: "2025-10-01", status: "cancelled", price: 690, packageName: "Classic Setup" },
];
