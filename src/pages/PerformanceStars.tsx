import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trophy, TrendingUp, Heart, Users, Zap, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Achievement {
  icon: React.ReactNode;
  name: string;
  description: string;
  color: string;
  requirement: string;
}

interface VendorPerformance {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  bookingCount: number;
  responseTime: number; // minutes
  starRating: number; // 1-5
  achievements: string[];
  testimonials: number;
  yearsActive: number;
  monthlyBookings: number;
}

const achievements: Record<string, Achievement> = {
  superstar: {
    icon: <Star className="h-6 w-6" />,
    name: "Rising Superstar",
    description: "Built momentum with consistent bookings",
    color: "border-yellow-500 bg-yellow-50",
    requirement: "50+ Bookings",
  },
  excellent: {
    icon: <Trophy className="h-6 w-6" />,
    name: "Excellence Award",
    description: "Maintains 4.8+ rating consistently",
    color: "border-amber-500 bg-amber-50",
    requirement: "4.8+ Rating",
  },
  responsive: {
    icon: <Zap className="h-6 w-6" />,
    name: "Lightning Fast Response",
    description: "Responds to inquiries within 1 hour",
    color: "border-blue-500 bg-blue-50",
    requirement: "<1 Hour Response",
  },
  loved: {
    icon: <Heart className="h-6 w-6" />,
    name: "Customer Favorite",
    description: "Loved by 100+ satisfied customers",
    color: "border-red-500 bg-red-50",
    requirement: "100+ Happy Customers",
  },
  growth: {
    icon: <TrendingUp className="h-6 w-6" />,
    name: "Growth Momentum",
    description: "Growing faster than average vendors",
    color: "border-green-500 bg-green-50",
    requirement: "20% Monthly Growth",
  },
  veteran: {
    icon: <Award className="h-6 w-6" />,
    name: "Industry Veteran",
    description: "5+ years of consistent excellence",
    color: "border-purple-500 bg-purple-50",
    requirement: "5+ Years Active",
  },
  trusted: {
    icon: <Users className="h-6 w-6" />,
    name: "Trusted Partner",
    description: "Featured in 10+ success stories",
    color: "border-teal-500 bg-teal-50",
    requirement: "10+ Success Stories",
  },
  leader: {
    icon: <Target className="h-6 w-6" />,
    name: "Category Leader",
    description: "Top ranked in their category",
    color: "border-indigo-500 bg-indigo-50",
    requirement: "Top 5% in Category",
  },
};

const vendorPerformances: VendorPerformance[] = [
  {
    id: "1",
    name: "Eternal Frames Photography",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 127,
    bookingCount: 256,
    responseTime: 15,
    starRating: 5,
    achievements: ["superstar", "excellent", "responsive", "loved", "veteran", "leader"],
    testimonials: 98,
    yearsActive: 6,
    monthlyBookings: 18,
  },
  {
    id: "2",
    name: "Dream Weave Decorations",
    category: "Decorations",
    image: "https://images.unsplash.com/photo-1519167758993-403d7b6d9dd9?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 89,
    bookingCount: 142,
    responseTime: 45,
    starRating: 5,
    achievements: ["growth", "excellent", "loved", "trusted"],
    testimonials: 67,
    yearsActive: 3,
    monthlyBookings: 12,
  },
  {
    id: "3",
    name: "Celebrate Together Events",
    category: "Event Planning",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    bookingCount: 189,
    responseTime: 20,
    starRating: 5,
    achievements: ["superstar", "responsive", "loved", "growth", "trusted"],
    testimonials: 134,
    yearsActive: 4,
    monthlyBookings: 15,
  },
];

const PerformanceStars = () => {
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null);

  const getAchievementBadges = (vendorAchievements: string[]) => {
    return vendorAchievements.map(achievementKey => achievements[achievementKey]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="h-10 w-10 text-accent" />
            <h1 className="font-heading text-4xl font-bold">Performance Stars</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our top-performing vendors recognized for excellence, reliability, and customer satisfaction.
          </p>
        </div>

        {/* Achievement Badges Reference */}
        <Card className="mb-12 bg-gradient-to-r from-slate-50 to-white border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {Object.values(achievements).map((achievement, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-2 ${achievement.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent">{achievement.icon}</span>
                    <span className="font-semibold text-sm">{achievement.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                  <p className="text-xs font-semibold text-slate-700">📊 {achievement.requirement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Performance Cards */}
        <div className="space-y-6 mb-12">
          {vendorPerformances.map((vendor) => (
            <Card 
              key={vendor.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)}
            >
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Image & Basic Info */}
                  <div className="md:col-span-1">
                    <img 
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  </div>

                  {/* Main Info */}
                  <div className="md:col-span-3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading text-2xl font-bold">{vendor.name}</h3>
                        <p className="text-muted-foreground">{vendor.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          {[...Array(vendor.starRating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-bold text-lg">{vendor.rating}</span>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Total Bookings</p>
                        <p className="text-2xl font-bold text-accent">{vendor.bookingCount}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Reviews</p>
                        <p className="text-2xl font-bold text-accent">{vendor.reviewCount}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Response Time</p>
                        <p className="text-2xl font-bold text-accent">{vendor.responseTime}m</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Monthly Bookings</p>
                        <p className="text-2xl font-bold text-accent">{vendor.monthlyBookings}</p>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-600 mb-2">Achievements: {vendor.achievements.length}/8</p>
                      <Progress value={(vendor.achievements.length / 8) * 100} className="h-2 mb-3" />
                      
                      <div className="flex flex-wrap gap-2">
                        {getAchievementBadges(vendor.achievements).map((achievement, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <span className="text-accent">{achievement.icon}</span>
                            <span className="text-xs">{achievement.name}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {expandedVendor === vendor.id && (
                      <div className="mt-6 pt-6 border-t space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-1">Years Active</p>
                            <p className="text-lg font-bold">{vendor.yearsActive} Years</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-1">Success Stories</p>
                            <p className="text-lg font-bold">{vendor.testimonials} Testimonials</p>
                          </div>
                        </div>

                        {/* Performance Breakdown */}
                        <div>
                          <h4 className="font-semibold mb-3">Performance Breakdown</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Rating Consistency</span>
                                <span className="font-semibold">{Math.round((vendor.rating / 5) * 100)}%</span>
                              </div>
                              <Progress value={(vendor.rating / 5) * 100} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Review Volume</span>
                                <span className="font-semibold">{Math.min(100, Math.round((vendor.reviewCount / 200) * 100))}%</span>
                              </div>
                              <Progress value={Math.min(100, Math.round((vendor.reviewCount / 200) * 100))} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Response Quality</span>
                                <span className="font-semibold">{Math.round((1 - vendor.responseTime / 120) * 100)}%</span>
                              </div>
                              <Progress value={Math.round((1 - vendor.responseTime / 120) * 100)} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View Profile CTA */}
                    <div className="mt-4 flex gap-3" onClick={e => e.stopPropagation()}>
                      <Button variant="accent" size="sm" asChild>
                        <Link to={`/browse?search=${encodeURIComponent(vendor.name)}`}>View Profile</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/browse">Browse All</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Browse CTA */}
        <div className="text-center mb-8">
          <Button variant="accent" size="lg" asChild>
            <Link to="/browse">Browse All Vendors</Link>
          </Button>
        </div>

        {/* Leaderboard Stats */}
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              This Month's Rising Stars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-accent mb-2">42</p>
                <p className="text-sm text-muted-foreground">Vendors Gaining Recognition</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-accent mb-2">98%</p>
                <p className="text-sm text-muted-foreground">Average Customer Satisfaction</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-accent mb-2">1,240</p>
                <p className="text-sm text-muted-foreground">Success Stories This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerformanceStars;
