import type { Vendor } from "@/data/mockData";
import { allEventTypes, vendorSupportsAllCelebrations } from "@/data/vendorDiscovery";
import { eventTypes } from "@/data/mockData";

interface ActivityItem {
  date: string;
  title: string;
  description: string;
}

export interface VendorEventInsight {
  photos: string[];
  themes: string[];
  recentActivities: ActivityItem[];
}

/**
 * Default event types each vendor category covers.
 * Used both for onboarding pre-selection and as a browse filter fallback
 * for vendors not listed in vendorEventSpecialties.
 */
export const categoryEventDefaults: Record<string, string[]> = {
  Photographer: [
    "Wedding", "Baby Shower", "Baby Photoshoot", "Maternity Photoshoot", "Gender Reveal",
    "Birthday Party", "Anniversary", "Housewarming / Griha Pravesh", "Quinceañera",
    "Bar / Bat Mitzvah", "Graduation", "Naming Ceremony / Namkaran",
    "Eid Celebration", "Diwali Event", "Christmas Party",
  ],
  Videographer: [
    "Wedding", "Baby Shower", "Baby Photoshoot", "Maternity Photoshoot", "Gender Reveal",
    "Birthday Party", "Anniversary", "Housewarming / Griha Pravesh", "Quinceañera",
    "Bar / Bat Mitzvah", "Graduation", "Naming Ceremony / Namkaran",
    "Eid Celebration", "Diwali Event", "Christmas Party",
  ],
  Decorator: [
    "Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Housewarming / Griha Pravesh",
    "Quinceañera", "Graduation", "Bar / Bat Mitzvah", "Gender Reveal",
    "Christmas Party", "Halloween Party", "Diwali Event", "Eid Celebration", "Baptism",
  ],
  Caterer: [
    "Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Graduation",
    "Quinceañera", "Bar / Bat Mitzvah", "Christmas Party", "Eid Celebration",
    "Diwali Event", "Housewarming / Griha Pravesh",
  ],
  DJ: [
    "Wedding", "Birthday Party", "Quinceañera", "Bar / Bat Mitzvah",
    "Graduation", "Halloween Party", "Christmas Party", "Anniversary",
  ],
  Florist: [
    "Wedding", "Baby Shower", "Anniversary", "Birthday Party", "Housewarming / Griha Pravesh",
    "Baptism", "Quinceañera", "Eid Celebration", "Diwali Event", "Naming Ceremony / Namkaran",
  ],
  "Makeup Artist": [
    "Wedding", "Quinceañera", "Bar / Bat Mitzvah", "Maternity Photoshoot",
    "Baby Shower", "Anniversary", "Birthday Party", "Graduation", "Diwali Event", "Eid Celebration",
  ],
  "Cake Designer": [
    "Wedding", "Birthday Party", "Baby Shower", "Gender Reveal", "Graduation",
    "Quinceañera", "Bar / Bat Mitzvah", "Baptism", "Anniversary", "Christmas Party",
  ],
  "Event Planner": [...eventTypes],
  "Priest/Pandit": [
    "Wedding", "Baptism", "Housewarming / Griha Pravesh", "Naming Ceremony / Namkaran",
    "Car Pooja", "Diwali Event", "Eid Celebration",
  ],
  Venue: [...eventTypes],
};

const vendorEventSpecialties: Record<string, string[]> = {
  "1": ["Wedding", "Anniversary", "Naming Ceremony / Namkaran", "Baby Shower"],
  "2": ["Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Diwali Event", "Christmas Party", "Quinceanera", "Halloween Party"],
  "3": ["Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Graduation", "Eid Celebration", "Christmas Party"],
  "4": ["Wedding", "Birthday Party", "Halloween Party", "Christmas Party", "Quinceanera", "Bar / Bat Mitzvah", "Anniversary", "Graduation"],
  "5": ["Wedding", "Baby Shower", "Anniversary", "Housewarming / Griha Pravesh", "Eid Celebration", "Diwali Event", "Naming Ceremony / Namkaran"],
  "6": ["Wedding", "Naming Ceremony / Namkaran", "Housewarming / Griha Pravesh", "Car Pooja"],
  "7": ["Wedding", "Quinceanera", "Bar / Bat Mitzvah", "Anniversary", "Birthday Party", "Graduation"],
  "8": ["Wedding", "Quinceanera", "Maternity Photoshoot", "Baby Shower", "Eid Celebration", "Diwali Event", "Anniversary"],
  "9": ["Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Quinceanera", "Baptism", "Christmas Party", "Gender Reveal"],
  "10": ["Wedding", "Quinceanera", "Birthday Party", "Anniversary", "Graduation", "Bar / Bat Mitzvah", "Diwali Event", "Eid Celebration", "Christmas Party"],
  "11": ["Wedding", "Baby Shower", "Baby Photoshoot", "Maternity Photoshoot", "Birthday Party", "Naming Ceremony / Namkaran", "Gender Reveal"],
  "12": ["Wedding", "Birthday Party", "Quinceanera", "Bar / Bat Mitzvah", "Halloween Party", "Christmas Party", "Graduation"],
  "13": ["Wedding", "Baby Shower", "Anniversary", "Eid Celebration", "Naming Ceremony / Namkaran"],
  "14": ["Wedding", "Quinceanera", "Anniversary", "Diwali Event", "Halloween Party", "Christmas Party", "Birthday Party"],
  "15": ["Wedding", "Graduation", "Birthday Party", "Anniversary", "Eid Celebration", "Christmas Party", "Baby Shower"],
  "16": ["Wedding", "Baptism", "Bar / Bat Mitzvah", "Quinceanera", "Anniversary"],
  "17": ["Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Quinceanera", "Baptism", "Christmas Party", "Gender Reveal"],
  "18": ["Wedding", "Quinceanera", "Birthday Party", "Anniversary", "Graduation", "Bar / Bat Mitzvah", "Diwali Event", "Eid Celebration", "Christmas Party"],
};

const eventThemes: Record<string, string[]> = {
  Wedding: ["Classic Romance", "Modern Minimal", "Royal Heritage", "Garden Luxe"],
  "Baby Shower": ["Pastel Cloud", "Teddy Bear", "Little Star", "Floral Bloom"],
  "Baby Photoshoot": ["Soft Neutrals", "Storybook", "Minimal White", "Seasonal Props"],
  "Maternity Photoshoot": ["Golden Hour", "Flowy Fabric", "Studio Editorial", "Nature Silhouette"],
  "Birthday Party": ["Balloon Burst", "Elegant Black & Gold", "Retro Pop", "Custom Character Theme"],
  Quinceanera: ["Princess Glam", "Rose Gold", "Enchanted Garden", "Royal Ballroom"],
  Anniversary: ["Intimate Candlelight", "Vintage Chic", "Modern Luxe", "Floral Romance"],
  "Gender Reveal": ["Confetti Reveal", "Balloon Pop", "Pastel Picnic", "Neutral Chic"],
};

const eventPhotoOverrides: Record<string, Record<string, string[]>> = {
  "11": {
    "Baby Photoshoot": [
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=500&h=350&fit=crop",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&h=350&fit=crop",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=350&fit=crop",
    ],
  },
  "1": {
    Wedding: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=350&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&h=350&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=350&fit=crop",
    ],
  },
};

const normalizeEvent = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const findThemeSet = (eventType: string): string[] | undefined => {
  const normalized = normalizeEvent(eventType);
  return Object.entries(eventThemes).find(([key]) => normalizeEvent(key) === normalized)?.[1];
};

const findPhotoOverride = (vendorId: string, eventType: string): string[] | undefined => {
  const normalized = normalizeEvent(eventType);
  const matches = eventPhotoOverrides[vendorId];
  if (!matches) return undefined;
  return Object.entries(matches).find(([key]) => normalizeEvent(key) === normalized)?.[1];
};

export const vendorSupportsEvent = (vendorId: string, eventType: string, category?: string): boolean => {
  const normalized = normalizeEvent(eventType);
  if (!normalized) return true;

  if (vendorSupportsAllCelebrations(vendorId)) {
    return allEventTypes.some(eventName => normalizeEvent(eventName) === normalized);
  }

  const specialty = vendorEventSpecialties[vendorId];
  if (specialty) {
    return specialty.some(eventName => normalizeEvent(eventName) === normalized);
  }

  // Fallback: use category-based defaults for vendors not in the hardcoded map
  if (category) {
    const defaults = categoryEventDefaults[category] ?? [];
    return defaults.some(eventName => normalizeEvent(eventName) === normalized);
  }

  return false;
};

export const getVendorEventInsight = (vendor: Vendor, eventType: string): VendorEventInsight => {
  const photos = findPhotoOverride(vendor.id, eventType) ?? vendor.portfolio.slice(0, 3);
  const themes = findThemeSet(eventType) ?? ["Signature Style", "Custom Look", "Client Favorite", "Seasonal Theme"];

  return {
    photos,
    themes,
    recentActivities: [
      {
        date: "2 days ago",
        title: `${eventType} session delivered`,
        description: `${vendor.name} shared a completed gallery with final edits and highlight selects.`,
      },
      {
        date: "1 week ago",
        title: `New ${eventType} template launched`,
        description: `Added fresh mood-board and styling options tailored for ${eventType.toLowerCase()} bookings.`,
      },
      {
        date: "2 weeks ago",
        title: "Top-rated client feedback",
        description: `Recent clients praised communication, turnaround, and quality for ${eventType.toLowerCase()} work.`,
      },
    ],
  };
};
