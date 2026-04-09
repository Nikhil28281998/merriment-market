import { useState } from "react";
import { BookOpen, Clock, Download, Award, ChevronDown, Play, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Guide {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  readTime: number;
  content: string;
  tips: string[];
  checklist: string[];
  videoUrl?: string;
  downloadUrl?: string;
}

const guides: Guide[] = [
  {
    id: "1",
    title: "The Complete Gender Reveal Planning Guide",
    category: "Gender Reveal",
    difficulty: "Beginner",
    readTime: 12,
    content: "Learn everything you need to know to plan a memorable gender reveal party that will delight your guests and create lasting memories.",
    tips: [
      "Choose a theme that represents your personality",
      "Plan the reveal moment as the centerpiece",
      "Send creative invitations 2-3 weeks in advance",
      "Consider your guest list size for venue selection",
    ],
    checklist: [
      "Decide on date and guest count",
      "Choose theme and color scheme",
      "Book venue or space (4-6 weeks prior)",
      "Send invitations", "Book photographer/videographer",
      "Plan catering or snacks",
      "Arrange decorations",
      "Prepare the reveal moment",
    ],
    videoUrl: "https://youtube.com/embed/sample-gender-reveal",
  },
  {
    id: "2",
    title: "Budget-Friendly Housewarming Success",
    category: "Housewarming",
    difficulty: "Beginner",
    readTime: 8,
    content: "Throw an amazing housewarming party without breaking the bank. Discover creative ways to celebrate your new space.",
    tips: [
      "Keep guest list reasonable for your space",
      "DIY decorations using items from your home",
      "Ask guests to bring a dish (potluck style)",
      "Use natural lighting and plants for decoration",
    ],
    checklist: [
      "Plan the date and guest list",
      "Do a walkthrough of your space",
      "Create a decoration plan",
      "Send casual invitations",
      "Plan food and drinks",
      "Arrange music playlist",
      "Clean and organize your home",
    ],
  },
  {
    id: "3",
    title: "Corporate Event Excellence: From Solo to 500 Guests",
    category: "Corporate Events",
    difficulty: "Intermediate",
    readTime: 18,
    content: "Master the art of corporate event planning. From intimate team meetings to large-scale conferences, we've got you covered.",
    tips: [
      "Start planning 3-6 months in advance",
      "Budget 40-50% for venue, 30-40% for catering",
      "Have a detailed run-of-show timeline",
      "Arrange sound check well before the event",
    ],
    checklist: [
      "Define event objectives and KPIs",
      "Set and allocate budget",
      "Select and book venue (4-6 months prior)",
      "Create attendee list and send invites",
      "Book speakers, performers, vendors",
      "Arrange transportation if needed",
      "Create detailed event timeline",
      "Conduct final walkthrough",
    ],
  },
  {
    id: "4",
    title: "Photography Tips: Getting the Best Shots",
    category: "Photography",
    difficulty: "Intermediate",
    readTime: 10,
    content: "Whether hiring a professional or going DIY, learn how to get stunning photos of your event.",
    tips: [
      "Have a photographer brief before the event",
      "Create a shot list with must-have moments",
      "Scout the venue for best photo locations",
      "Plan lighting - natural light is your friend",
    ],
    checklist: [
      "Brief photographer on event details",
      "Create detailed shot list",
      "Scout venue for photo backdrops",
      "Check lighting conditions",
      "Arrange any necessary permits for photography",
      "Plan outfit coordination",
      "Schedule touch-up moments",
    ],
  },
];

const EventAcademy = () => {
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(guides.map(g => g.category))];
  const filteredGuides = selectedCategory === "All" ? guides : guides.filter(g => g.category === selectedCategory);

  const difficultyColor = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Expert: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen className="h-10 w-10 text-accent" />
            <h1 className="font-heading text-4xl font-bold">Event Academy</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from experts. Master the art of event planning with our comprehensive guides, checklists, and tips.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3 text-slate-700">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-accent hover:bg-accent/90" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredGuides.map((guide) => (
            <Card 
              key={guide.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{guide.category}</Badge>
                  <Badge className={difficultyColor[guide.difficulty]}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{guide.content}</p>

                {/* Read Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{guide.readTime} min read</span>
                </div>

                {/* Expandable Content */}
                <Collapsible
                  open={expandedGuide === guide.id}
                  onOpenChange={() => 
                    setExpandedGuide(expandedGuide === guide.id ? null : guide.id)
                  }
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      View Guide
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedGuide === guide.id ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-4 space-y-4">
                    {/* Tips Section */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-accent" />
                        Pro Tips
                      </h4>
                      <ul className="space-y-2">
                        {guide.tips.map((tip, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-slate-700">
                            <span className="text-accent font-bold">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Checklist Section */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-accent" />
                        Planning Checklist
                      </h4>
                      <ul className="space-y-1">
                        {guide.checklist.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-slate-700">
                            <input 
                              type="checkbox" 
                              className="rounded h-4 w-4 accent-accent"
                              disabled
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Checklist
                      </Button>
                    </div>

                    {/* Video Section */}
                    {guide.videoUrl && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Play className="h-4 w-4 text-accent" />
                          Video Tutorial
                        </h4>
                        <div className="bg-slate-200 rounded-lg h-48 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white/50" />
                        </div>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips Section */}
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-accent" />
              Quick Planning Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">The 6-Week Rule</h4>
                <p className="text-sm text-muted-foreground">
                  Start planning 6 weeks before your event. This gives you time to secure vendors, decorations, and handle last-minute changes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Budget Breakdown</h4>
                <p className="text-sm text-muted-foreground">
                  Venue: 40%, Catering: 35%, Decorations: 15%, Entertainment: 10%. Adjust based on your priorities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">The "Why" Before "What"</h4>
                <p className="text-sm text-muted-foreground">
                  Define your event's purpose first. This guides all other decisions and keeps you focused.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Communication is Key</h4>
                <p className="text-sm text-muted-foreground">
                  Keep vendors, guests, and team members informed. Miscommunication causes 80% of event issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h3 className="font-heading text-2xl font-bold mb-3">Ready to Plan Your Event?</h3>
            <p className="text-muted-foreground mb-6">
              Use our guides as you discover and book vendors on EventzHub.
            </p>
            <Button className="bg-accent hover:bg-accent/90">
              Start Planning Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventAcademy;
