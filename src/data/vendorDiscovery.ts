import { eventTypes, mockVendors, type Vendor } from "@/data/mockData";

export type BrowseTab = "vendors" | "venues" | "home-parties";

const homeServiceCategories = new Set([
  "Photographer",
  "Decorator",
  "Caterer",
  "DJ",
  "Florist",
  "Videographer",
  "Makeup Artist",
  "Cake Designer",
  "Event Planner",
  "Officiant",
]);

const temporaryVendors: Vendor[] = [
  {
    id: "201",
    name: "Skyline Grand Venue",
    category: "Venue",
    city: "New York",
    state: "NY",
    rating: 4.8,
    reviewCount: 126,
    startingPrice: 2500,
    verified: true,
    photo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=400&fit=crop",
    bio: "Skyline Grand Venue offers indoor and rooftop event spaces with custom layouts for every celebration type.",
    portfolio: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p201a", name: "Hall Rental", description: "Flexible venue rental for up to 150 guests", price: 2500, includes: ["8-hour rental", "Banquet furniture", "Basic lighting", "On-site manager"] },
      { id: "p201b", name: "Premium Venue", description: "Venue package for up to 300 guests", price: 5200, includes: ["12-hour rental", "Ceremony + reception setup", "A/V package", "Parking support", "Venue coordinator"] },
      { id: "p201c", name: "Luxury Celebration", description: "All-inclusive premium venue experience", price: 9000, includes: ["Full-day access", "Bridal suite", "Custom floorplan", "Premium lighting", "Dedicated event team"] },
    ],
    reviews: [
      { id: "r201a", author: "Melissa R.", rating: 5, text: "Beautiful venue with amazing skyline views. Our wedding looked incredible here.", date: "2025-12-02" },
      { id: "r201b", author: "Arjun P.", rating: 5, text: "Booked this for an anniversary celebration. Team was very organized and responsive.", date: "2025-10-16" },
      { id: "r201c", author: "Nora T.", rating: 4, text: "Great location and setup options. Parking filled up quickly but overall excellent.", date: "2025-09-11" },
    ],
  },
  {
    id: "202",
    name: "Willow Banquet Gardens",
    category: "Venue",
    city: "Houston",
    state: "TX",
    rating: 4.7,
    reviewCount: 94,
    startingPrice: 2200,
    verified: true,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=400&fit=crop",
    bio: "Willow Banquet Gardens specializes in culturally diverse celebrations with indoor and outdoor venue options.",
    portfolio: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p202a", name: "Classic Banquet", description: "Elegant banquet hall setup", price: 2200, includes: ["6-hour rental", "Standard seating", "Lighting", "Setup team"] },
      { id: "p202b", name: "Garden + Hall", description: "Dual-space celebration package", price: 4600, includes: ["Indoor + outdoor access", "Decor-ready staging", "A/V support", "Coordinator"] },
      { id: "p202c", name: "Festival Package", description: "Large-scale venue package", price: 7800, includes: ["All-day access", "Grand stage", "Vendor loading support", "Guest management desk"] },
    ],
    reviews: [
      { id: "r202a", author: "Neha V.", rating: 5, text: "Perfect for our holiday lights celebration. Spacious and beautifully maintained.", date: "2025-11-29" },
      { id: "r202b", author: "Fatima K.", rating: 4, text: "Hosted a large family community gathering. Staff was friendly and setup was smooth.", date: "2025-10-02" },
      { id: "r202c", author: "Oscar D.", rating: 5, text: "Great venue for a large graduation party, very flexible with layout.", date: "2025-08-23" },
    ],
  },
  {
    id: "203",
    name: "Seaside Celebration Hall",
    category: "Venue",
    city: "Miami",
    state: "FL",
    rating: 4.9,
    reviewCount: 138,
    startingPrice: 2800,
    verified: true,
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=400&fit=crop",
    bio: "Seaside Celebration Hall delivers coastal elegance for weddings, birthdays, and all milestone events.",
    portfolio: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p203a", name: "Coastal Classic", description: "Venue package for up to 120 guests", price: 2800, includes: ["8-hour venue", "Ocean-view backdrop", "Tables and chairs", "Venue assistant"] },
      { id: "p203b", name: "Sunset Premium", description: "Premium venue with decor-ready spaces", price: 5400, includes: ["10-hour venue", "Indoor + terrace setup", "A/V and stage", "Coordination support"] },
      { id: "p203c", name: "Signature Destination", description: "Full-day destination style package", price: 9800, includes: ["Full property access", "VIP suite", "Custom floor plan", "Premium hosting support"] },
    ],
    reviews: [
      { id: "r203a", author: "Carla M.", rating: 5, text: "Our anniversary party felt like a destination event. Stunning venue.", date: "2025-12-18" },
      { id: "r203b", author: "Riya S.", rating: 5, text: "Amazing wedding experience. The staff and ambiance were top class.", date: "2025-09-26" },
      { id: "r203c", author: "Jayden H.", rating: 4, text: "Very polished operation and beautiful location. Highly recommend.", date: "2025-07-13" },
    ],
  },
  {
    id: "301",
    name: "AtHome Celebration Crew",
    category: "Event Planner",
    city: "New York",
    state: "NY",
    rating: 4.8,
    reviewCount: 117,
    startingPrice: 450,
    verified: true,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=400&fit=crop",
    bio: "AtHome Celebration Crew brings full event setup to your home, including decor, planning, and on-site coordination.",
    portfolio: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p301a", name: "Home Party Starter", description: "Small home event setup", price: 450, includes: ["Theme planning", "Basic decor", "Setup and teardown", "2 staff members"] },
      { id: "p301b", name: "Home Party Plus", description: "Mid-size home celebration package", price: 1200, includes: ["Full decor styling", "Vendor coordination", "Event timeline", "On-site host support"] },
      { id: "p301c", name: "Home Party Luxe", description: "Premium home event execution", price: 2600, includes: ["Concept design", "Premium decor props", "Guest flow plan", "Dedicated manager", "Post-event cleanup"] },
    ],
    reviews: [
      { id: "r301a", author: "Sana Q.", rating: 5, text: "They transformed our living room for a baby shower in just a few hours.", date: "2025-11-20" },
      { id: "r301b", author: "Leo J.", rating: 4, text: "Great home setup and communication, very professional team.", date: "2025-09-09" },
      { id: "r301c", author: "Anu K.", rating: 5, text: "Our birthday party looked amazing and everything was handled smoothly.", date: "2025-08-15" },
    ],
    serviceStates: ["NY", "NJ", "CT", "PA"],
  },
  {
    id: "302",
    name: "Doorstep Decor & Events",
    category: "Decorator",
    city: "Dallas",
    state: "TX",
    rating: 4.7,
    reviewCount: 88,
    startingPrice: 380,
    verified: true,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&h=400&fit=crop",
    bio: "Doorstep Decor & Events specializes in in-home event styling with fast setup for birthdays, naming ceremonies, and seasonal events.",
    portfolio: [
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p302a", name: "Home Decor Basic", description: "Balloon and backdrop setup", price: 380, includes: ["Theme colors", "Backdrop", "Balloon arrangement", "2-hour setup"] },
      { id: "p302b", name: "Home Decor Premium", description: "Full in-home theme transformation", price: 980, includes: ["Custom props", "Photo corner", "Table styling", "Setup and cleanup"] },
      { id: "p302c", name: "Home Decor Signature", description: "Luxury decor for milestone events", price: 1800, includes: ["Concept design", "Premium florals", "Lounge styling", "On-site decor lead"] },
    ],
    reviews: [
      { id: "r302a", author: "Kim L.", rating: 5, text: "Our housewarming looked beautiful. They nailed the exact theme we wanted.", date: "2025-12-06" },
      { id: "r302b", author: "Vandana R.", rating: 4, text: "Fast setup and good quality props for our naming ceremony.", date: "2025-10-19" },
      { id: "r302c", author: "Marc A.", rating: 5, text: "Perfect birthday setup at home, kids loved it.", date: "2025-07-22" },
    ],
    serviceStates: ["TX", "OK", "LA", "AR"],
  },
  {
    id: "303",
    name: "Home Feast Catering On Wheels",
    category: "Caterer",
    city: "Los Angeles",
    state: "CA",
    rating: 4.9,
    reviewCount: 161,
    startingPrice: 300,
    verified: true,
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop",
    bio: "Home Feast Catering On Wheels provides in-home live counters and full catering support for private celebrations.",
    portfolio: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    ],
    packages: [
      { id: "p303a", name: "Home Buffet", description: "Buffet-style catering for home events", price: 300, includes: ["Starter + mains", "Service staff", "Serving setup", "Basic cleanup"] },
      { id: "p303b", name: "Live Counter Package", description: "Live food counters at home", price: 760, includes: ["2 live counters", "Chef team", "Menu customization", "Serving staff"] },
      { id: "p303c", name: "Chef-at-Home Premium", description: "Curated private dining celebration", price: 1450, includes: ["Chef-curated menu", "Table service", "Dessert spread", "Full cleanup"] },
    ],
    reviews: [
      { id: "r303a", author: "Priyesh M.", rating: 5, text: "Excellent in-home catering for our anniversary dinner party.", date: "2025-11-03" },
      { id: "r303b", author: "Tina E.", rating: 5, text: "The live counters were a hit at our graduation party.", date: "2025-09-27" },
      { id: "r303c", author: "Rafael C.", rating: 4, text: "Good food and very professional home service team.", date: "2025-08-02" },
    ],
    serviceStates: ["CA", "NV", "AZ"],
  },
];

const venueVendorIds = new Set(["201", "202", "203"]);
const homePartyVendorIds = new Set(["301", "302", "303"]);

export const allVendors: Vendor[] = [...mockVendors, ...temporaryVendors];

export const isVenueVendor = (vendor: Vendor): boolean => venueVendorIds.has(vendor.id) || vendor.category === "Venue";

export const isHomePartyVendor = (vendor: Vendor): boolean =>
  homePartyVendorIds.has(vendor.id) || homeServiceCategories.has(vendor.category);

export const vendorMatchesBrowseTab = (vendor: Vendor, tab: BrowseTab): boolean => {
  if (tab === "venues") return isVenueVendor(vendor);
  if (tab === "home-parties") return isHomePartyVendor(vendor);
  return !isVenueVendor(vendor);
};

export const temporaryVendorIds = new Set(["201", "202", "203", "301", "302", "303"]);

export const vendorSupportsAllCelebrations = (vendorId: string): boolean => temporaryVendorIds.has(vendorId);

export const allEventTypes = [...eventTypes];
