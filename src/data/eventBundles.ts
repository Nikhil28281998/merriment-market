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
    mustHave: ["Photographer", "Decorator", "Caterer", "Officiant"],
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
    mustHave: ["Photographer", "Videographer", "Decorator", "Caterer", "Makeup Artist", "Officiant"],
    recommended: ["DJ", "Florist", "Cake Designer"],
  },
  {
    eventType: "Housewarming",
    mustHave: ["Officiant", "Florist", "Caterer"],
    recommended: ["Photographer", "Decorator"],
  },
  {
    eventType: "Graduation",
    mustHave: ["Photographer", "Caterer"],
    recommended: ["Videographer", "Decorator", "Cake Designer", "DJ"],
  },
  {
    eventType: "Anniversary",
    mustHave: ["Photographer", "Caterer", "Decorator"],
    recommended: ["Videographer", "Florist", "Cake Designer", "DJ"],
  },
  {
    eventType: "Christmas Party",
    mustHave: ["Decorator", "Caterer", "DJ"],
    recommended: ["Photographer", "Cake Designer", "Florist"],
  },
  {
    eventType: "Quinceañera",
    mustHave: ["Photographer", "Videographer", "Decorator", "Caterer", "Cake Designer"],
    recommended: ["DJ", "Florist", "Makeup Artist", "Event Planner"],
  },
  {
    eventType: "Baptism",
    mustHave: ["Photographer", "Caterer", "Cake Designer"],
    recommended: ["Videographer", "Decorator", "Florist"],
  },
  {
    eventType: "Bar / Bat Mitzvah",
    mustHave: ["Photographer", "Videographer", "Caterer", "DJ"],
    recommended: ["Decorator", "Florist", "Cake Designer", "Event Planner"],
  },
  {
    eventType: "Holiday Lights Event",
    mustHave: ["Decorator", "Caterer"],
    recommended: ["Photographer", "Florist", "DJ", "Makeup Artist"],
  },
  {
    eventType: "Community Celebration",
    mustHave: ["Caterer", "Decorator"],
    recommended: ["Photographer", "Videographer", "Florist", "Makeup Artist"],
  },
  {
    eventType: "Naming Ceremony",
    mustHave: ["Officiant", "Photographer", "Caterer"],
    recommended: ["Decorator", "Florist", "Videographer", "Cake Designer"],
  },
  {
    eventType: "Maternity Photoshoot",
    mustHave: ["Photographer", "Makeup Artist"],
    recommended: ["Videographer", "Decorator", "Florist"],
  },
  {
    eventType: "Baby Photoshoot",
    mustHave: ["Photographer"],
    recommended: ["Makeup Artist", "Decorator"],
  },
  {
    eventType: "Car Blessing",
    mustHave: ["Officiant"],
    recommended: ["Photographer", "Florist"],
  },
  {
    eventType: "Other",
    mustHave: ["Photographer", "Caterer"],
    recommended: ["Decorator", "DJ", "Videographer", "Florist", "Cake Designer", "Event Planner"],
  },
];
