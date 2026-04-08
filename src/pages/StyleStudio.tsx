import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Wand2, Palette, Filter, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { eventTypes } from "@/data/mockData";
import { eventBundles } from "@/data/eventBundles";
import { allVendors } from "@/data/vendorDiscovery";
import { vendorSupportsEvent } from "@/data/vendorEventInsights";

interface ColorOption {
  name: string;
  hex: string;
}

interface IdeaCard {
  title: string;
  eventType: string;
  color: string;
  style: string;
  theme: string;
  image: string;
}

interface AiImageCard {
  title: string;
  prompt: string;
  image: string;
}

const colorOptions: ColorOption[] = [
  { name: "Red", hex: "#dc2626" },
  { name: "Rose", hex: "#e11d48" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Purple", hex: "#7c3aed" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Sky", hex: "#0ea5e9" },
  { name: "Teal", hex: "#0d9488" },
  { name: "Green", hex: "#16a34a" },
  { name: "Lime", hex: "#65a30d" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Orange", hex: "#ea580c" },
  { name: "Peach", hex: "#fb7185" },
  { name: "Gold", hex: "#d4af37" },
  { name: "Silver", hex: "#94a3b8" },
  { name: "White", hex: "#f8fafc" },
  { name: "Ivory", hex: "#fff7e6" },
  { name: "Beige", hex: "#d6c2a1" },
  { name: "Black", hex: "#111827" },
];

const styleOptions = [
  "Classic",
  "Modern",
  "Minimal",
  "Luxury",
  "Rustic",
  "Boho",
  "Glam",
  "Traditional",
  "Contemporary",
  "Elegant",
  "Playful",
  "Vintage",
];

const themeOptions = [
  "Garden Party",
  "Royal Celebration",
  "Beach Vibes",
  "Fairy Lights",
  "Floral Romance",
  "Pastel Dream",
  "Bold & Vibrant",
  "Monochrome Chic",
  "Cultural Heritage",
  "Disco Night",
  "Minimal Luxe",
  "Festival Glow",
];

const ideaCards: IdeaCard[] = [
  { title: "Rose Gold Wedding Night", eventType: "Wedding", color: "Rose", style: "Luxury", theme: "Floral Romance", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=500&fit=crop" },
  { title: "Pastel Baby Shower Picnic", eventType: "Baby Shower", color: "Pink", style: "Minimal", theme: "Pastel Dream", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=700&h=500&fit=crop" },
  { title: "Neon Birthday Bash", eventType: "Birthday Party", color: "Violet", style: "Playful", theme: "Disco Night", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&h=500&fit=crop" },
  { title: "Elegant Quinceanera Hall", eventType: "Quinceañera", color: "Gold", style: "Elegant", theme: "Royal Celebration", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=500&fit=crop" },
  { title: "Classic Graduation Dinner", eventType: "Graduation", color: "Blue", style: "Classic", theme: "Minimal Luxe", image: "https://images.unsplash.com/photo-1658236417551-8f2e4ad77f4c?w=700&h=500&fit=crop" },
  { title: "Anniversary Candle Garden", eventType: "Anniversary", color: "Ivory", style: "Vintage", theme: "Garden Party", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&h=500&fit=crop" },
  { title: "Diwali Lantern Courtyard", eventType: "Diwali Event", color: "Amber", style: "Traditional", theme: "Festival Glow", image: "https://images.unsplash.com/photo-1599982890962-4d8ebb5e7d72?w=700&h=500&fit=crop" },
  { title: "Eid Family Banquet", eventType: "Eid Celebration", color: "Teal", style: "Contemporary", theme: "Cultural Heritage", image: "https://images.unsplash.com/photo-1584547853994-07e41a57574e?w=700&h=500&fit=crop" },
  { title: "Christmas Home Glam", eventType: "Christmas Party", color: "Green", style: "Glam", theme: "Fairy Lights", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=700&h=500&fit=crop" },
  { title: "Halloween Bold Setup", eventType: "Halloween Party", color: "Orange", style: "Modern", theme: "Bold & Vibrant", image: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=700&h=500&fit=crop" },
  { title: "Baptism White & Gold", eventType: "Baptism", color: "White", style: "Classic", theme: "Minimal Luxe", image: "https://images.unsplash.com/photo-1504892262-8ea3ddbf35a5?w=700&h=500&fit=crop" },
  { title: "Mitzvah Stage Lighting", eventType: "Bar / Bat Mitzvah", color: "Blue", style: "Modern", theme: "Disco Night", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=500&fit=crop" },
  { title: "Housewarming Floral Entry", eventType: "Housewarming / Griha Pravesh", color: "Peach", style: "Traditional", theme: "Floral Romance", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&h=500&fit=crop" },
  { title: "Gender Reveal Balloon Wall", eventType: "Gender Reveal", color: "Sky", style: "Playful", theme: "Pastel Dream", image: "https://images.unsplash.com/photo-1604912153786-cfc7c9b69210?w=700&h=500&fit=crop" },
  { title: "Naming Ceremony Decor", eventType: "Naming Ceremony / Namkaran", color: "Yellow", style: "Traditional", theme: "Cultural Heritage", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&h=500&fit=crop" },
  { title: "Maternity Outdoor Glow", eventType: "Maternity Photoshoot", color: "Rose", style: "Boho", theme: "Garden Party", image: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=700&h=500&fit=crop" },
  { title: "Baby Photoshoot Studio", eventType: "Baby Photoshoot", color: "Beige", style: "Minimal", theme: "Pastel Dream", image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=700&h=500&fit=crop" },
  { title: "Car Pooja Flower Setup", eventType: "Car Pooja", color: "Red", style: "Traditional", theme: "Festival Glow", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&h=500&fit=crop" },
  { title: "Custom Celebration Mix", eventType: "Other", color: "Silver", style: "Contemporary", theme: "Monochrome Chic", image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700&h=500&fit=crop" },
];

const toggleValue = (list: string[], value: string) =>
  list.includes(value) ? list.filter(item => item !== value) : [...list, value];

const aiImageUrl = (prompt: string) =>
  `https://image.pollinations.ai/prompt/${encodeURIComponent(`${prompt}, highly detailed event decor, professional photography`)}`;

const firstOr = (values: string[], fallback: string) => (values.length > 0 ? values[0] : fallback);

const buildAiConceptCards = (
  selectedEvents: string[],
  selectedColors: string[],
  selectedStyles: string[],
  selectedThemes: string[],
): AiImageCard[] => {
  const event = firstOr(selectedEvents, "celebration event");
  const color = firstOr(selectedColors, "gold");
  const style = firstOr(selectedStyles, "modern");
  const theme = firstOr(selectedThemes, "floral romance");

  const prompts = [
    `${event} with ${color} color palette in ${style} style and ${theme} theme`,
    `${event} stage setup with ${theme} atmosphere and ${color} accents`,
    `${event} table decor concept, ${style} style, ${color} tones, ${theme}`,
  ];

  return prompts.map((prompt, index) => ({
    title: `AI Concept ${index + 1}`,
    prompt,
    image: aiImageUrl(prompt),
  }));
};

const generateAiSuggestion = (
  prompt: string,
  selectedEvents: string[],
  selectedColors: string[],
  selectedStyles: string[],
  selectedThemes: string[],
) => {
  const normalized = prompt.toLowerCase();

  const inferredEvent = eventTypes.find(type => normalized.includes(type.toLowerCase())) || firstOr(selectedEvents, "Birthday Party");
  const inferredColor = colorOptions.find(color => normalized.includes(color.name.toLowerCase()))?.name || firstOr(selectedColors, "Gold");
  const inferredStyle = styleOptions.find(style => normalized.includes(style.toLowerCase())) || firstOr(selectedStyles, "Modern");
  const inferredTheme = themeOptions.find(theme => normalized.includes(theme.toLowerCase()))?.toString() || firstOr(selectedThemes, "Floral Romance");

  const bundle = eventBundles.find(item => item.eventType === inferredEvent);
  const mustHave = bundle?.mustHave.join(", ") || "Photographer, Decorator";
  const recommended = bundle?.recommended.join(", ") || "Caterer, DJ, Florist";

  return [
    `Great brief. For your ${inferredEvent}, I suggest a ${inferredStyle.toLowerCase()} setup with a ${inferredTheme.toLowerCase()} direction.`,
    `Color story: ${inferredColor} as the anchor color, with neutrals and one contrast accent for depth.`,
    `Book these must-have vendors first: ${mustHave}.`,
    `Then add these to complete the experience: ${recommended}.`,
    `Next step: open matching vendors here -> /browse?event=${encodeURIComponent(inferredEvent)}`,
  ].join("\n");
};

const StyleStudio = () => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [assistantInput, setAssistantInput] = useState("");
  const [plannerImages, setPlannerImages] = useState<string[]>([]);
  const [assistantOutput, setAssistantOutput] = useState<string>(
    "Describe your event in plain language and I will suggest colors, style direction, theme, and vendor priorities.",
  );

  const filteredIdeas = useMemo(() => {
    return ideaCards.filter(card => {
      const eventMatch = selectedEvents.length > 0 ? selectedEvents.includes(card.eventType) : true;
      const colorMatch = selectedColors.length > 0 ? selectedColors.includes(card.color) : true;
      const styleMatch = selectedStyles.length > 0 ? selectedStyles.includes(card.style) : true;
      const themeMatch = selectedThemes.length > 0 ? selectedThemes.includes(card.theme) : true;
      return eventMatch && colorMatch && styleMatch && themeMatch;
    });
  }, [selectedEvents, selectedColors, selectedStyles, selectedThemes]);

  const aiConcepts = useMemo(
    () => buildAiConceptCards(selectedEvents, selectedColors, selectedStyles, selectedThemes),
    [selectedEvents, selectedColors, selectedStyles, selectedThemes],
  );

  const recommendedVendors = useMemo(() => {
    const targetEvents = selectedEvents.length > 0 ? selectedEvents : filteredIdeas.slice(0, 3).map(item => item.eventType);
    const requiredCategories = Array.from(
      new Set(
        targetEvents.flatMap(eventName => {
          const bundle = eventBundles.find(item => item.eventType === eventName);
          return bundle ? [...bundle.mustHave, ...bundle.recommended] : [];
        }),
      ),
    );

    const scored = allVendors
      .filter(vendor => {
        const eventMatch = targetEvents.length === 0 ? true : targetEvents.some(eventName => vendorSupportsEvent(vendor.id, eventName, vendor.category));
        const categoryMatch = requiredCategories.length === 0 ? true : requiredCategories.includes(vendor.category);
        return eventMatch && categoryMatch;
      })
      .sort((a, b) => {
        const verifiedBoost = Number(Boolean(b.verified)) - Number(Boolean(a.verified));
        if (verifiedBoost !== 0) return verifiedBoost;
        return b.rating - a.rating;
      });

    return scored.slice(0, 8);
  }, [selectedEvents, filteredIdeas]);

  const briefQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (selectedEvents[0]) params.set("event", selectedEvents[0]);
    if (selectedColors.length > 0) params.set("colors", selectedColors.join(","));
    if (selectedStyles.length > 0) params.set("styles", selectedStyles.join(","));
    if (selectedThemes.length > 0) params.set("themes", selectedThemes.join(","));
    return params.toString();
  }, [selectedEvents, selectedColors, selectedStyles, selectedThemes]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 container py-10 md:py-14">
        <div className="mb-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            <Palette className="h-4 w-4" /> Style Studio
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight">Plan Your Celebration By Style</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Choose event type, colors, style, and theme to instantly explore matching inspiration. Then use EventzHubz AI Planner to get tailored suggestions.
          </p>
        </div>

        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl"><Filter className="h-5 w-5" /> Inspiration Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-semibold mb-2">Event Type</p>
              <div className="flex flex-wrap gap-2">
                <Button variant={selectedEvents.length === 0 ? "accent" : "outline"} size="sm" onClick={() => setSelectedEvents([])}>All Event Types</Button>
                {eventTypes.map(type => (
                  <Button key={type} variant={selectedEvents.includes(type) ? "accent" : "outline"} size="sm" onClick={() => setSelectedEvents(prev => toggleValue(prev, type))}>
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Event Colors</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
                <Button variant={selectedColors.length === 0 ? "accent" : "outline"} size="sm" onClick={() => setSelectedColors([])}>All Colors</Button>
                {colorOptions.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColors(prev => toggleValue(prev, color.name))}
                    className={`rounded-md border px-3 py-2 text-sm text-left transition-colors ${
                      selectedColors.includes(color.name) ? "border-accent ring-2 ring-accent/40" : "hover:bg-muted"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Event Styles</p>
              <div className="flex flex-wrap gap-2">
                <Button variant={selectedStyles.length === 0 ? "accent" : "outline"} size="sm" onClick={() => setSelectedStyles([])}>All Styles</Button>
                {styleOptions.map(style => (
                  <Button key={style} variant={selectedStyles.includes(style) ? "accent" : "outline"} size="sm" onClick={() => setSelectedStyles(prev => toggleValue(prev, style))}>
                    {style}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Event Themes</p>
              <div className="flex flex-wrap gap-2">
                <Button variant={selectedThemes.length === 0 ? "accent" : "outline"} size="sm" onClick={() => setSelectedThemes([])}>All Themes</Button>
                {themeOptions.map(theme => (
                  <Button key={theme} variant={selectedThemes.includes(theme) ? "accent" : "outline"} size="sm" onClick={() => setSelectedThemes(prev => toggleValue(prev, theme))}>
                    {theme}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-2xl font-bold">Matching Ideas</h2>
              <Badge variant="secondary">{filteredIdeas.length > 0 ? `${filteredIdeas.length} results` : "AI fallback mode"}</Badge>
            </div>
            {filteredIdeas.length === 0 ? (
              <div>
                <Card className="mb-4">
                  <CardContent className="p-5 text-sm text-muted-foreground">
                    No exact matches found. Showing AI-generated concept images based on your selected event/colors/styles/themes.
                  </CardContent>
                </Card>
                <div className="grid sm:grid-cols-2 gap-4">
                  {aiConcepts.map(concept => (
                    <Card key={concept.title} className="overflow-hidden">
                      <img
                        src={concept.image}
                        alt={concept.title}
                        className="h-44 w-full object-cover bg-muted"
                        onError={e => { e.currentTarget.src = "https://placehold.co/700x440/e2e8f0/64748b?text=Preview+unavailable"; e.currentTarget.onerror = null; }}
                      />
                      <CardContent className="p-4">
                        <h3 className="font-heading font-bold text-lg mb-2">{concept.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{concept.prompt}</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={selectedEvents[0] ? `/browse?event=${encodeURIComponent(selectedEvents[0])}` : "/browse"}>Find Vendors For This Look</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredIdeas.map(idea => (
                  <Card key={idea.title} className="overflow-hidden">
                    <img src={idea.image} alt={idea.title} className="h-44 w-full object-cover" />
                    <CardContent className="p-4">
                      <h3 className="font-heading font-bold text-lg mb-2">{idea.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="outline">{idea.eventType}</Badge>
                        <Badge variant="outline">{idea.color}</Badge>
                        <Badge variant="outline">{idea.style}</Badge>
                        <Badge variant="outline">{idea.theme}</Badge>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/browse?event=${encodeURIComponent(idea.eventType)}`}>Find Vendors</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <Card className="border-2 border-accent/20 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5 text-accent" /> EventzHubz AI Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={assistantInput}
                  onChange={e => setAssistantInput(e.target.value)}
                  placeholder="Example: I am planning a baby shower in Houston for 50 guests. I want modern pastel decor and cozy home setup."
                  className="min-h-[120px]"
                />
                <Button
                  className="w-full"
                  variant="accent"
                  onClick={() => {
                    const response = generateAiSuggestion(
                      assistantInput,
                      selectedEvents,
                      selectedColors,
                      selectedStyles,
                      selectedThemes,
                    );
                    const imagePrompts = [
                      `${assistantInput || firstOr(selectedEvents, "event")} decor mood board`,
                      `${assistantInput || firstOr(selectedThemes, "theme")} stage and table setup`,
                      `${assistantInput || firstOr(selectedStyles, "style")} event lighting and floral arrangement`,
                    ];

                    setAssistantOutput(response);
                    setPlannerImages(imagePrompts.map(prompt => aiImageUrl(prompt)));
                  }}
                >
                  <Wand2 className="h-4 w-4 mr-2" /> Generate AI Suggestions
                </Button>
                <div className="rounded-xl bg-muted p-3 whitespace-pre-line text-sm leading-relaxed">
                  {assistantOutput}
                </div>
                {plannerImages.length > 0 && (
                  <div className="grid grid-cols-1 gap-3">
                    {plannerImages.map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`AI planner concept ${index + 1}`}
                        className="h-40 w-full rounded-lg object-cover bg-muted"
                        onError={e => { e.currentTarget.src = "https://placehold.co/700x320/e2e8f0/64748b?text=Preview+unavailable"; e.currentTarget.onerror = null; }}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl font-bold">Vendors Who Can Execute This Style</h2>
            <Badge variant="secondary">{recommendedVendors.length} vendors</Badge>
          </div>

          {recommendedVendors.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                No matching vendors found yet. Try selecting an event type first.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedVendors.map(vendor => (
                <Card key={vendor.id} className="overflow-hidden">
                  <img src={vendor.photo} alt={vendor.name} className="w-full h-40 object-cover" />
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">{vendor.category}</p>
                    <h3 className="font-heading font-bold mb-2 line-clamp-1">{vendor.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" /> {vendor.city}, {vendor.state}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {vendor.rating} ({vendor.reviewCount})
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={briefQuery ? `/vendor/${vendor.id}?${briefQuery}` : `/vendor/${vendor.id}`}>
                        Share Style Brief
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StyleStudio;
