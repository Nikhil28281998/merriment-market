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
    "Birthday Party", "Bachelorette", "Anniversary", "Housewarming", "Quinceañera",
    "Bar / Bat Mitzvah", "Graduation", "Naming Ceremony",
    "Community Celebration", "Holiday Lights Event", "Christmas Party",
  ],
  Videographer: [
    "Wedding", "Baby Shower", "Baby Photoshoot", "Maternity Photoshoot", "Gender Reveal",
    "Birthday Party", "Bachelorette", "Anniversary", "Housewarming", "Quinceañera",
    "Bar / Bat Mitzvah", "Graduation", "Naming Ceremony",
    "Community Celebration", "Holiday Lights Event", "Christmas Party",
  ],
  Decorator: [
    "Wedding", "Birthday Party", "Baby Shower", "Bachelorette", "Anniversary", "Housewarming",
    "Quinceañera", "Graduation", "Bar / Bat Mitzvah", "Gender Reveal",
    "Christmas Party", "Halloween Party", "Holiday Lights Event", "Community Celebration", "Baptism",
  ],
  Caterer: [
    "Wedding", "Birthday Party", "Baby Shower", "Bachelorette", "Anniversary", "Graduation",
    "Quinceañera", "Bar / Bat Mitzvah", "Christmas Party", "Community Celebration",
    "Holiday Lights Event", "Housewarming",
  ],
  DJ: [
    "Wedding", "Birthday Party", "Quinceañera", "Bachelorette", "Bar / Bat Mitzvah",
    "Graduation", "Halloween Party", "Christmas Party", "Anniversary",
  ],
  Florist: [
    "Wedding", "Baby Shower", "Anniversary", "Birthday Party", "Bachelorette", "Housewarming",
    "Baptism", "Quinceañera", "Community Celebration", "Holiday Lights Event", "Naming Ceremony",
  ],
  "Makeup Artist": [
    "Wedding", "Quinceañera", "Bar / Bat Mitzvah", "Maternity Photoshoot",
    "Baby Shower", "Bachelorette", "Anniversary", "Birthday Party", "Graduation", "Holiday Lights Event", "Community Celebration",
  ],
  "Cake Designer": [
    "Wedding", "Birthday Party", "Baby Shower", "Bachelorette", "Gender Reveal", "Graduation",
    "Quinceañera", "Bar / Bat Mitzvah", "Baptism", "Anniversary", "Christmas Party",
  ],
  "Event Planner": [...eventTypes],
  "Officiant": [
    "Wedding", "Baptism", "Housewarming", "Naming Ceremony",
    "Car Blessing", "Bachelorette", "Holiday Lights Event", "Community Celebration",
  ],
  Venue: [...eventTypes],
};

const vendorEventSpecialties: Record<string, string[]> = {
  "1": ["Wedding", "Anniversary", "Naming Ceremony", "Baby Shower", "Bachelorette"],
  "2": ["Wedding", "Birthday Party", "Baby Shower", "Bachelorette", "Anniversary", "Holiday Lights Event", "Christmas Party", "Quinceañera", "Halloween Party"],
  "3": ["Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Bachelorette", "Graduation", "Community Celebration", "Christmas Party"],
  "4": ["Wedding", "Birthday Party", "Bachelorette", "Halloween Party", "Christmas Party", "Quinceañera", "Bar / Bat Mitzvah", "Anniversary", "Graduation"],
  "5": ["Wedding", "Baby Shower", "Bachelorette", "Anniversary", "Housewarming", "Community Celebration", "Holiday Lights Event", "Naming Ceremony"],
  "6": ["Wedding", "Naming Ceremony", "Housewarming", "Car Blessing", "Bachelorette"],
  "7": ["Wedding", "Quinceañera", "Bar / Bat Mitzvah", "Anniversary", "Birthday Party", "Bachelorette", "Graduation"],
  "8": ["Wedding", "Quinceañera", "Maternity Photoshoot", "Baby Shower", "Bachelorette", "Community Celebration", "Holiday Lights Event", "Anniversary"],
  "9": ["Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Quinceanera", "Baptism", "Christmas Party", "Gender Reveal", "Bachelorette"],
  "10": ["Wedding", "Quinceanera", "Birthday Party", "Anniversary", "Graduation", "Bar / Bat Mitzvah", "Holiday Lights Event", "Community Celebration", "Christmas Party"],
  "11": ["Wedding", "Baby Shower", "Baby Photoshoot", "Maternity Photoshoot", "Birthday Party", "Bachelorette", "Naming Ceremony", "Gender Reveal"],
  "12": ["Wedding", "Birthday Party", "Quinceañera", "Bar / Bat Mitzvah", "Halloween Party", "Christmas Party", "Graduation", "Bachelorette"],
  "13": ["Wedding", "Baby Shower", "Bachelorette", "Anniversary", "Community Celebration", "Naming Ceremony"],
  "14": ["Wedding", "Quinceañera", "Anniversary", "Holiday Lights Event", "Halloween Party", "Christmas Party", "Birthday Party", "Bachelorette"],
  "15": ["Wedding", "Graduation", "Birthday Party", "Anniversary", "Community Celebration", "Christmas Party", "Baby Shower", "Bachelorette"],
  "16": ["Wedding", "Baptism", "Bar / Bat Mitzvah", "Quinceañera", "Anniversary", "Bachelorette"],
  "17": ["Wedding", "Birthday Party", "Baby Shower", "Anniversary", "Quinceañera", "Baptism", "Christmas Party", "Gender Reveal", "Bachelorette"],
  "18": ["Wedding", "Quinceañera", "Birthday Party", "Anniversary", "Graduation", "Bar / Bat Mitzvah", "Holiday Lights Event", "Community Celebration", "Christmas Party", "Bachelorette"],
};

const eventThemes: Record<string, string[]> = {
  Wedding: ["Classic Romance", "Modern Minimal", "Royal Heritage", "Garden Luxe"],
  "Baby Shower": ["Pastel Cloud", "Teddy Bear", "Little Star", "Floral Bloom"],
  "Baby Photoshoot": ["Soft Neutrals", "Storybook", "Minimal White", "Seasonal Props"],
  "Maternity Photoshoot": ["Golden Hour", "Flowy Fabric", "Studio Editorial", "Nature Silhouette"],
  "Birthday Party": ["Balloon Burst", "Elegant Black & Gold", "Retro Pop", "Custom Character Theme"],
  Quinceanera: ["Princess Glam", "Rose Gold", "Enchanted Garden", "Royal Ballroom"],
  Anniversary: ["Intimate Candlelight", "Vintage Chic", "Modern Luxe", "Floral Romance"],
  Bachelorette: ["Glitter Brunch", "Boho Night Out", "Chic Cocktail", "Garden Tea Party"],
  "Gender Reveal": ["Confetti Reveal", "Balloon Pop", "Pastel Picnic", "Neutral Chic"],
};

const eventPhotoOverrides: Record<string, Record<string, string[]>> = {
  "11": {
    "Baby Photoshoot": [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "1": {
    Wedding: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
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
