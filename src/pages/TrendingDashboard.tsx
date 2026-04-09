import { useState } from "react";
import { TrendingUp, Users, MapPin, Eye, Star, Calendar, BarChart3, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface TrendingVendor {
  id: number;
  name: string;
  category: string;
  bookings: number;
  rating: number;
  growth: number;
  location: string;
  trend: "up" | "down" | "stable";
}

interface EventTrend {
  type: string;
  bookings: number;
  percentage: number;
  avgBudget: number;
  trend: number;
}

interface InsightData {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
}

const TrendingDashboard = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  const trendingVendors: TrendingVendor[] = [
    {
      id: 1,
      name: "Sakshi Photography Studio",
      category: "Photography",
      bookings: 23,
      rating: 4.8,
      growth: 45,
      location: "Bangalore",
      trend: "up",
    },
    {
      id: 2,
      name: "Royal Feast Catering",
      category: "Catering",
      bookings: 18,
      rating: 4.9,
      growth: 32,
      location: "Bangalore",
      trend: "up",
    },
    {
      id: 3,
      name: "Dream Decorators",
      category: "Decorations",
      bookings: 15,
      rating: 4.7,
      growth: 28,
      location: "Hyderabad",
      trend: "up",
    },
    {
      id: 4,
      name: "Sound & Light Pro",
      category: "Entertainment",
      bookings: 12,
      rating: 4.6,
      growth: -5,
      location: "Delhi",
      trend: "down",
    },
    {
      id: 5,
      name: "Elite Venues Co.",
      category: "Venues",
      bookings: 28,
      rating: 4.9,
      growth: 52,
      location: "Mumbai",
      trend: "up",
    },
  ];

  const eventTrends: EventTrend[] = [
    { type: "Weddings", bookings: 340, percentage: 40, avgBudget: 450000, trend: 15 },
    { type: "Corporate Events", bookings: 280, percentage: 33, avgBudget: 200000, trend: 12 },
    { type: "Gender Reveals", bookings: 150, percentage: 18, avgBudget: 150000, trend: 25 },
    { type: "Housewarmings", bookings: 80, percentage: 9, avgBudget: 80000, trend: 8 },
  ];

  const locationTrends = [
    { location: "Bangalore", bookings: 450, vendors: 350, avgRating: 4.7 },
    { location: "Mumbai", bookings: 380, vendors: 290, avgRating: 4.6 },
    { location: "Delhi", bookings: 320, vendors: 280, avgRating: 4.5 },
    { location: "Hyderabad", bookings: 280, vendors: 210, avgRating: 4.8 },
    { location: "Pune", bookings: 200, vendors: 180, avgRating: 4.6 },
  ];

  const peakBookingTimes = [
    { day: "Friday", bookings: 85, percentage: 22 },
    { day: "Saturday", bookings: 142, percentage: 37 },
    { day: "Sunday", bookings: 110, percentage: 28 },
    { day: "Thursday", bookings: 45, percentage: 12 },
    { day: "Tuesday", bookings: 8, percentage: 2 },
  ];

  const seasonalInsights = [
    { month: "January", eventTypeTop: "New Year Parties", avgSpend: "₹120K" },
    { month: "March", eventTypeTop: "Holi Celebrations", avgSpend: "₹95K" },
    { month: "November", eventTypeTop: "Engagement & Weddings", avgSpend: "₹350K" },
    { month: "December", eventTypeTop: "Weddings & Year-End Parties", avgSpend: "₹400K" },
  ];

  const insights: InsightData[] = [
    {
      title: "Total Bookings",
      value: "1,850+",
      change: "+18% vs last month",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Avg Budget",
      value: "₹185K",
      change: "+5% increase",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Top Vendors",
      value: "156",
      change: "Available & Trending",
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "Satisfaction",
      value: "4.7/5",
      change: "1,200+ reviews this week",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-slate-50 to-white py-16">
          <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="h-10 w-10 text-accent" />
            <h1 className="font-heading text-4xl font-bold">Trending Dashboard</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into booking patterns, trending vendors, and event analytics 
            to help you make informed decisions.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8 justify-center">
          {(["week", "month", "year"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? "bg-accent hover:bg-accent/90" : ""}
            >
              {range === "week" && "This Week"}
              {range === "month" && "This Month"}
              {range === "year" && "This Year"}
            </Button>
          ))}
        </div>

        {/* Key Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {insights.map((insight, idx) => (
            <Card key={idx} className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground font-medium">{insight.title}</p>
                  <div className="text-accent">{insight.icon}</div>
                </div>
                <p className="text-3xl font-bold mb-1">{insight.value}</p>
                <p className="text-xs text-green-600 font-semibold">{insight.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Vendors */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
            <Flame className="h-6 w-6 text-red-500" />
            🔥 Trending This Week
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {trendingVendors.map((vendor) => (
              <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground">{vendor.category}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {vendor.location}
                      </p>
                    </div>
                    <Badge
                      variant={vendor.trend === "up" ? "default" : "secondary"}
                      className={vendor.trend === "up" ? "bg-green-500" : "bg-orange-500"}
                    >
                      {vendor.trend === "up" ? "↑" : "↓"} {Math.abs(vendor.growth)}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Bookings</p>
                      <p className="text-xl font-bold text-accent">{vendor.bookings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="text-xl font-bold text-yellow-500">★ {vendor.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Growth</p>
                      <p className="text-xl font-bold text-green-600">{vendor.growth}%</p>
                    </div>
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent/90" size="sm" asChild>
                    <Link to={`/browse?search=${encodeURIComponent(vendor.name)}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Type Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Most Booked Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventTrends.map((event, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{event.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.bookings} bookings • Avg: ₹{(event.avgBudget / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {event.trend > 15 ? "📈 Trending" : event.trend > 5 ? "→ Stable" : "📉 Declining"}
                    </Badge>
                  </div>
                  <Progress value={event.percentage * 10} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Trends & Peak Times */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationTrends.map((loc, idx) => (
                  <div key={idx} className="pb-4 border-b last:border-0 last:pb-0">
                    <p className="font-semibold mb-2">{loc.location}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                      <div>
                        <p className="text-muted-foreground text-xs">Bookings</p>
                        <p className="font-bold text-accent">{loc.bookings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Vendors</p>
                        <p className="font-bold text-blue-600">{loc.vendors}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Avg Rating</p>
                        <p className="font-bold text-yellow-500">★ {loc.avgRating}</p>
                      </div>
                    </div>
                    <Progress value={(loc.bookings / 450) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Peak Booking Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Peak Booking Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {peakBookingTimes.map((time, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{time.day}</p>
                      <span className="text-sm font-bold text-accent">{time.bookings} bookings</span>
                    </div>
                    <Progress value={time.percentage * 5.5} className="h-3" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-900">💡 Pro Tip</p>
                <p className="text-xs text-yellow-800 mt-1">
                  Best time to book: Wednesday evening. Saturday is the peak day, book 2-3 months in advance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seasonal Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Seasonal Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {seasonalInsights.map((season, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900">{season.month}</p>
                  <p className="text-sm text-blue-700 mt-2">
                    <span className="font-semibold">Popular:</span> {season.eventTypeTop}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    <span className="font-semibold">Avg Spend:</span> {season.avgSpend}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Smart Recommendations */}
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">For Event Planners</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>Book trending vendors 2-3 months in advance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>Schedule Wednesday consultations for better availability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>Bangalore & Mumbai offer most variety and availability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">→</span>
                    <span>Off-peak months (Jan-Feb) offer 20% better pricing</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">For Vendors</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">📈</span>
                    <span>Highlight your trending status to increase bookings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">📈</span>
                    <span>Saturdays see 37% of weekly bookings - prepare accordingly</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">📈</span>
                    <span>Wedding market grows 15% in Nov-Dec - increase capacity</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">📈</span>
                    <span>Maintain 4.7+ rating to stay on trending list</span>
                  </li>
                </ul>
              </div>
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

export default TrendingDashboard;
