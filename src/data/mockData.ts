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
}

export interface VendorPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  includes: string[];
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
    id: "1", name: "Sarah Mitchell Photography", category: "Photographer", city: "Los Angeles", state: "CA",
    rating: 4.9, reviewCount: 127, startingPrice: 500,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=400&fit=crop",
    bio: "Award-winning photographer with 10+ years of experience capturing life's most precious moments. Specializing in weddings, family portraits, and cultural celebrations.",
    portfolio: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p1", name: "Essential", description: "Perfect for intimate events", price: 500, includes: ["4 hours coverage", "100 edited photos", "Online gallery"] },
      { id: "p2", name: "Premium", description: "Our most popular package", price: 1200, includes: ["8 hours coverage", "300 edited photos", "Online gallery", "Engagement shoot", "Photo album"] },
      { id: "p3", name: "Luxury", description: "The complete experience", price: 2500, includes: ["Full day coverage", "500+ edited photos", "Online gallery", "Engagement shoot", "Premium album", "Second photographer"] },
    ],
  },
  {
    id: "2", name: "Royal Decorations", category: "Decorator", city: "Houston", state: "TX",
    rating: 4.7, reviewCount: 89, startingPrice: 800,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1200&h=400&fit=crop",
    bio: "Transforming spaces into magical venues for over 8 years. We specialize in South Asian weddings, baby showers, and milestone celebrations.",
    portfolio: [
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p4", name: "Basic Setup", description: "Essential decoration package", price: 800, includes: ["Backdrop", "Table centerpieces", "Basic lighting"] },
      { id: "p5", name: "Grand Package", description: "Full venue transformation", price: 2500, includes: ["Full venue decor", "Stage setup", "Lighting design", "Floral arrangements", "Table settings"] },
    ],
  },
  {
    id: "3", name: "Spice Kitchen Catering", category: "Caterer", city: "Chicago", state: "IL",
    rating: 4.8, reviewCount: 203, startingPrice: 25,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=400&fit=crop",
    bio: "Authentic multi-cuisine catering for all events. From intimate dinners to grand celebrations with 500+ guests.",
    portfolio: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p6", name: "Per Plate", description: "Price per guest", price: 25, includes: ["Appetizers", "Main course", "Dessert", "Beverages"] },
      { id: "p7", name: "Premium Buffet", description: "Lavish spread for your guests", price: 45, includes: ["Live stations", "Multi-cuisine menu", "Dessert bar", "Drinks", "Service staff"] },
    ],
  },
  {
    id: "4", name: "DJ Beats Entertainment", category: "DJ", city: "Miami", state: "FL",
    rating: 4.6, reviewCount: 64, startingPrice: 600,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop",
    bio: "High-energy DJ bringing the perfect soundtrack to your celebration. Bollywood, Top 40, Latin, and everything in between.",
    portfolio: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p8", name: "Standard", description: "DJ + Sound system", price: 600, includes: ["4 hours", "Professional sound system", "Basic lighting"] },
      { id: "p9", name: "Party Pack", description: "The ultimate party experience", price: 1500, includes: ["6 hours", "Premium sound", "Dance floor lighting", "MC services", "Fog machine"] },
    ],
  },
  {
    id: "5", name: "Bloom & Petal Florist", category: "Florist", city: "San Francisco", state: "CA",
    rating: 4.9, reviewCount: 156, startingPrice: 300,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&h=400&fit=crop",
    bio: "Creating stunning floral designs for weddings and events. Fresh, seasonal arrangements tailored to your vision.",
    portfolio: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p10", name: "Petite", description: "Small event florals", price: 300, includes: ["Bridal bouquet", "2 centerpieces", "Boutonniere"] },
      { id: "p11", name: "Grand Flora", description: "Full event floral design", price: 1800, includes: ["All bouquets", "10 centerpieces", "Arch arrangement", "Aisle decor", "Corsages"] },
    ],
  },
  {
    id: "6", name: "CinemaVows Films", category: "Videographer", city: "New York", state: "NY",
    rating: 4.8, reviewCount: 91, startingPrice: 1000,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=400&fit=crop",
    bio: "Cinematic wedding and event films that tell your unique story. Drone footage, same-day edits, and documentary-style storytelling.",
    portfolio: [],
    packages: [
      { id: "p12", name: "Highlight Film", description: "3-5 min cinematic edit", price: 1000, includes: ["6 hours coverage", "3-5 min highlight", "Online delivery"] },
      { id: "p13", name: "Full Feature", description: "Complete event film", price: 3000, includes: ["Full day coverage", "Highlight film", "Full ceremony edit", "Reception edit", "Drone footage"] },
    ],
  },
];

export const mockBookings: Booking[] = [
  { id: "b1", vendorName: "Sarah Mitchell Photography", eventType: "Wedding", eventDate: "2026-05-15", status: "upcoming", price: 1380, packageName: "Premium" },
  { id: "b2", vendorName: "Spice Kitchen Catering", eventType: "Birthday Party", eventDate: "2026-04-20", status: "upcoming", price: 1725, packageName: "Premium Buffet" },
  { id: "b3", vendorName: "DJ Beats Entertainment", eventType: "Wedding", eventDate: "2025-12-10", status: "completed", price: 690, packageName: "Standard" },
  { id: "b4", vendorName: "Bloom & Petal Florist", eventType: "Baby Shower", eventDate: "2025-11-05", status: "completed", price: 345, packageName: "Petite" },
  { id: "b5", vendorName: "Royal Decorations", eventType: "Anniversary", eventDate: "2025-10-01", status: "cancelled", price: 920, packageName: "Basic Setup" },
];

export const mockReviews = [
  { id: "r1", author: "Priya S.", rating: 5, text: "Absolutely stunning photos! Sarah captured every moment beautifully. Highly recommend!", date: "2025-11-20" },
  { id: "r2", author: "Marcus J.", rating: 5, text: "Professional, creative, and so easy to work with. Our wedding album is a treasure.", date: "2025-10-15" },
  { id: "r3", author: "Anita K.", rating: 4, text: "Great photographer. Delivered on time and the quality was excellent. Only wish we had more candid shots.", date: "2025-09-28" },
];
