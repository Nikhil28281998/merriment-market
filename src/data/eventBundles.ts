export interface EventBundle {
  eventType: string;
  mustHave: string[];
  recommended: string[];
}

export const eventBundles: EventBundle[] = [
  {
    eventType: "Gender Reveal",
    mustHave: ["Photographer", "Decorator", "Cake Designer"],
    recommended: ["Videographer", "Caterer", "DJ", "Florist"],
  },
  {
    eventType: "Baby Shower",
    mustHave: ["Photographer", "Decorator", "Caterer", "Priest/Pandit"],
    recommended: ["Videographer", "Florist", "Cake Designer"],
  },
  {
    eventType: "Birthday Party",
    mustHave: ["Photographer", "Decorator", "Cake Designer"],
    recommended: ["DJ", "Caterer", "Videographer"],
  },
  {
    eventType: "Halloween Party",
    mustHave: ["Decorator", "DJ"],
    recommended: ["Photographer", "Caterer", "Makeup Artist"],
  },
  {
    eventType: "Wedding",
    mustHave: ["Photographer", "Videographer", "Decorator", "Caterer", "Makeup Artist", "Priest/Pandit"],
    recommended: ["DJ", "Florist", "Cake Designer"],
  },
  {
    eventType: "Housewarming / Griha Pravesh",
    mustHave: ["Priest/Pandit", "Florist", "Caterer"],
    recommended: ["Photographer", "Decorator"],
  },
];
