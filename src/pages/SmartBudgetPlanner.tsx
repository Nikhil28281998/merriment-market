import { useState } from "react";
import { DollarSign, Target, TrendingDown, Zap, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface BudgetBreakdown {
  category: string;
  recommended: number;
  min: number;
  max: number;
  icon: React.ReactNode;
  tips: string[];
}

interface BudgetCategory {
  category: string;
  allocated: number;
  percentage: number;
  status: "on-track" | "over" | "under";
}

const SmartBudgetPlanner = () => {
  const [totalBudget, setTotalBudget] = useState<number>(200000);
  const [guestCount, setGuestCount] = useState<number>(100);
  const [eventType, setEventType] = useState<string>("Wedding");
  const [allocated, setAllocated] = useState<Record<string, number>>({});

  const budgetBreakdowns: Record<string, BudgetBreakdown[]> = {
    Wedding: [
      {
        category: "Venue & Decoration",
        recommended: 0.35,
        min: 0.25,
        max: 0.45,
        icon: <Target className="h-5 w-5" />,
        tips: ["Book 3-6 months in advance", "Consider off-season dates for savings"],
      },
      {
        category: "Catering",
        recommended: 0.25,
        min: 0.20,
        max: 0.30,
        icon: <Target className="h-5 w-5" />,
        tips: ["Negotiate per-head rates", "Include beverages in the quote"],
      },
      {
        category: "Photography & Videography",
        recommended: 0.15,
        min: 0.10,
        max: 0.20,
        icon: <Target className="h-5 w-5" />,
        tips: ["Book experienced vendors", "Check their portfolio thoroughly"],
      },
      {
        category: "Music & Entertainment",
        recommended: 0.10,
        min: 0.05,
        max: 0.15,
        icon: <Target className="h-5 w-5" />,
        tips: ["Book early for peak dates", "Consider live band vs DJ"],
      },
      {
        category: "Apparel & Styling",
        recommended: 0.08,
        min: 0.05,
        max: 0.12,
        icon: <Target className="h-5 w-5" />,
        tips: ["Budget for alterations", "Shop during sales"],
      },
      {
        category: "Miscellaneous",
        recommended: 0.07,
        min: 0.05,
        max: 0.10,
        icon: <Target className="h-5 w-5" />,
        tips: ["Include contingency (5%)", "Plan for last-minute costs"],
      },
    ],
    "Housewarming": [
      {
        category: "Venue & Setup",
        recommended: 0.15,
        min: 0.10,
        max: 0.20,
        icon: <Target className="h-5 w-5" />,
        tips: ["Use your home as venue", "Minimal decoration needed"],
      },
      {
        category: "Catering & Beverages",
        recommended: 0.50,
        min: 0.40,
        max: 0.60,
        icon: <Target className="h-5 w-5" />,
        tips: ["Finger foods work well", "DIY or order from caterer"],
      },
      {
        category: "Photography",
        recommended: 0.10,
        min: 0.05,
        max: 0.15,
        icon: <Target className="h-5 w-5" />,
        tips: ["Hire a semi-professional", "Informal shots are fine"],
      },
      {
        category: "Decorations",
        recommended: 0.15,
        min: 0.10,
        max: 0.20,
        icon: <Target className="h-5 w-5" />,
        tips: ["DIY decorations", "Use balloons and lights"],
      },
      {
        category: "Entertainment",
        recommended: 0.05,
        min: 0.02,
        max: 0.10,
        icon: <Target className="h-5 w-5" />,
        tips: ["Playlist instead of DJ", "Games for entertainment"],
      },
      {
        category: "Miscellaneous",
        recommended: 0.05,
        min: 0.05,
        max: 0.10,
        icon: <Target className="h-5 w-5" />,
        tips: ["Small contingency fund"],
      },
    ],
    "Gender Reveal": [
      {
        category: "Venue & Setup",
        recommended: 0.20,
        min: 0.10,
        max: 0.30,
        icon: <Target className="h-5 w-5" />,
        tips: ["Outdoor venue cheaper than indoor", "Park or farm works great"],
      },
      {
        category: "Catering",
        recommended: 0.35,
        min: 0.25,
        max: 0.45,
        icon: <Target className="h-5 w-5" />,
        tips: ["Snacks & cake focused", "Signature drinks theme"],
      },
      {
        category: "Decorations & Reveal Props",
        recommended: 0.20,
        min: 0.15,
        max: 0.25,
        icon: <Target className="h-5 w-5" />,
        tips: ["Reveal props are key", "Color-theme decorations"],
      },
      {
        category: "Photography",
        recommended: 0.12,
        min: 0.08,
        max: 0.18,
        icon: <Target className="h-5 w-5" />,
        tips: ["Capture the reveal moment", "Professional needed"],
      },
      {
        category: "Entertainment",
        recommended: 0.08,
        min: 0.05,
        max: 0.12,
        icon: <Target className="h-5 w-5" />,
        tips: ["DJ optional", "Games for guests"],
      },
      {
        category: "Miscellaneous",
        recommended: 0.05,
        min: 0.03,
        max: 0.08,
        icon: <Target className="h-5 w-5" />,
        tips: ["Invitations & favors"],
      },
    ],
  };

  const currentBreakdown = budgetBreakdowns[eventType] || budgetBreakdowns.Wedding;
  
  const calculations = currentBreakdown.map(item => ({
    ...item,
    allocatedAmount: totalBudget * item.recommended,
  }));

  const costPerGuest = (totalBudget / guestCount).toFixed(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-slate-50 to-white py-16">
          <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <DollarSign className="h-10 w-10 text-accent" />
            <h1 className="font-heading text-4xl font-bold">Smart Budget Planner</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized budget breakdowns. Our AI analyzes your event type and guest count 
            to recommend optimal spending across all categories.
          </p>
        </div>

        {/* Input Controls */}
        <Card className="mb-8 bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Event Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Total Budget */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Total Budget
                </label>
                <div className="relative mb-3">
                  <span className="absolute left-3 top-3 text-slate-500">₹</span>
                  <Input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(parseInt(e.target.value) || 0)}
                    className="pl-8"
                  />
                </div>
                <input 
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Expected Guests
                </label>
                <div className="mb-3">
                  <Input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                  />
                </div>
                <input 
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Event Type
                </label>
                <select 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Housewarming">Housewarming</option>
                  <option value="Gender Reveal">Gender Reveal</option>
                </select>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-4 mt-6 p-4 bg-white rounded-lg border border-accent/20">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Cost Per Guest</p>
                <p className="text-2xl font-bold text-accent">₹{costPerGuest}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Recommended</p>
                <p className="text-2xl font-bold text-green-600">✓ {eventType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Contingency</p>
                <p className="text-2xl font-bold text-accent">₹{Math.round(totalBudget * 0.05).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Breakdown */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-6">Recommended Budget Breakdown</h2>
          <div className="space-y-4">
            {calculations.map((item, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-accent">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.category}</h3>
                        <p className="text-sm text-muted-foreground">
                          {Math.round(item.recommended * 100)}% of total budget
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">
                        ₹{item.allocatedAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Range: ₹{(totalBudget * item.min).toLocaleString()} - ₹{(totalBudget * item.max).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <Progress 
                      value={item.recommended * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Tips */}
                  <div className="grid md:grid-cols-2 gap-2">
                    {item.tips.map((tip, tipIdx) => (
                      <div key={tipIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Budget Tips */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Money-Saving Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Book Early</p>
                  <p className="text-xs text-muted-foreground">Early booking discounts: 10-20% savings</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Off-Peak Dates</p>
                  <p className="text-xs text-muted-foreground">Weekday events cost 25-30% less</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Negotiate Packages</p>
                  <p className="text-xs text-muted-foreground">Bundle services for better rates</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">DIY Where Possible</p>
                  <p className="text-xs text-muted-foreground">Decorations, invitations can save 5-10%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h3 className="font-heading text-2xl font-bold mb-3">Ready to Book Your Vendors?</h3>
            <p className="text-muted-foreground mb-6">
              Use this budget breakdown to negotiate with vendors and find the best deals
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="bg-accent hover:bg-accent/90" asChild>
                <Link to="/browse">Browse Vendors</Link>
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                Download / Print Budget Sheet
              </Button>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartBudgetPlanner;
