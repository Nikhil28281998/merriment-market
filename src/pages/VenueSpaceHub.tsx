import { useState } from "react";
import { MapPin, Users, DollarSign, Wifi, SquareParking, ChefHat, Music, Maximize2, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Venue {
  id: string;
  name: string;
  city: string;
  type: string;
  image: string;
  capacity: { min: number; max: number };
  pricing: { min: number; max: number };
  amenities: string[];
  rating: number;
  reviews: number;
  available: boolean;
  phone: string;
}

const venues: Venue[] = [
  {
    id: "1",
    name: "Grand Elegance Ballroom",
    city: "Mumbai",
    type: "Banquet Hall",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&h=300&fit=crop",
    capacity: { min: 100, max: 500 },
    pricing: { min: 75000, max: 200000 },
    amenities: ["Parking", "Wifi", "Catering", "DJ Setup", "Stage"],
    rating: 4.8,
    reviews: 142,
    available: true,
    phone: "+91-98765-43210",
  },
  {
    id: "2",
    name: "Lakeside Paradise Resort",
    city: "Pune",
    type: "Resort",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    capacity: { min: 50, max: 300 },
    pricing: { min: 100000, max: 350000 },
    amenities: ["Pool", "Parking", "Rooms", "Restaurant", "Garden"],
    rating: 4.9,
    reviews: 267,
    available: true,
    phone: "+91-98765-43211",
  },
  {
    id: "3",
    name: "Urban Loft Studio",
    city: "Bangalore",
    type: "Modern Venue",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&h=300&fit=crop",
    capacity: { min: 30, max: 150 },
    pricing: { min: 40000, max: 100000 },
    amenities: ["Wifi", "Flexible Layout", "Natural Light", "Parking"],
    rating: 4.6,
    reviews: 98,
    available: true,
    phone: "+91-98765-43212",
  },
  {
    id: "4",
    name: "Heritage Fort Venue",
    city: "Jaipur",
    type: "Destination Wedding",
    image: "https://images.unsplash.com/photo-1519167758993-403d7b6d9dd9?w=500&h=300&fit=crop",
    capacity: { min: 200, max: 800 },
    pricing: { min: 150000, max: 500000 },
    amenities: ["Garden", "Parking", "Accommodation", "Catering", "Multi-level"],
    rating: 4.7,
    reviews: 189,
    available: true,
    phone: "+91-98765-43213",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  "Parking": <SquareParking className="h-4 w-4" />,
  "Wifi": <Wifi className="h-4 w-4" />,
  "Catering": <ChefHat className="h-4 w-4" />,
  "DJ Setup": <Music className="h-4 w-4" />,
  "Stage": <Maximize2 className="h-4 w-4" />,
  "Pool": <Users className="h-4 w-4" />,
  "Rooms": <MapPin className="h-4 w-4" />,
  "Restaurant": <ChefHat className="h-4 w-4" />,
  "Garden": <Maximize2 className="h-4 w-4" />,
  "Flexible Layout": <Maximize2 className="h-4 w-4" />,
  "Natural Light": <Wifi className="h-4 w-4" />,
  "Multi-level": <Maximize2 className="h-4 w-4" />,
  "Accommodation": <MapPin className="h-4 w-4" />,
};

const VenueSpaceHub = () => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [guestCount, setGuestCount] = useState<number>(100);
  const [budget, setBudget] = useState<number>(200000);
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const cities = ["All", ...new Set(venues.map(v => v.city))];
  const filteredVenues = selectedCity === "All" 
    ? venues 
    : venues.filter(v => v.city === selectedCity);

  const matchedVenues = filteredVenues.filter(v => 
    guestCount >= v.capacity.min && 
    guestCount <= v.capacity.max &&
    budget >= v.pricing.min && 
    budget <= v.pricing.max
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin className="h-10 w-10 text-accent" />
            <h1 className="font-heading text-4xl font-bold">Venue & Space Hub</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect venue with our intelligent matching system. 
            Browse stunning spaces, check availability, and compare in real-time.
          </p>
        </div>

        {/* Smart Filter Section */}
        <Card className="mb-8 bg-gradient-to-r from-accent/5 to-accent/10 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Maximize2 className="h-5 w-5 text-accent" />
              Smart Venue Matcher
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  City
                </label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Expected Guests: <span className="text-accent font-bold">{guestCount}</span>
                </label>
                <input 
                  type="range"
                  min="10"
                  max="1000"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Budget: <span className="text-accent font-bold">₹{budget.toLocaleString()}</span>
                </label>
                <input 
                  type="range"
                  min="30000"
                  max="500000"
                  step="10000"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-6 p-4 bg-white rounded-lg border border-accent/20">
              <p className="text-sm text-slate-700">
                ✓ Found <span className="font-bold text-accent">{matchedVenues.length}</span> venues matching your criteria
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Venues Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {matchedVenues.map((venue) => (
            <Card 
              key={venue.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVenue(venue)}
            >
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img 
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                />
                <Badge className="absolute top-4 right-4 bg-accent">{venue.type}</Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-xl font-bold">{venue.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {venue.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(Math.round(venue.rating))].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{venue.rating} ({venue.reviews})</span>
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                    <p className="font-semibold text-sm">{venue.capacity.min} - {venue.capacity.max} Guests</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Price (per day)</p>
                    <p className="font-semibold text-sm">₹{venue.pricing.min/1000}L - {venue.pricing.max/1000}L</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                        {amenityIcons[amenity]}
                        <span className="text-xs">{amenity}</span>
                      </Badge>
                    ))}
                    {venue.amenities.length > 4 && (
                      <Badge variant="outline">+{venue.amenities.length - 4} more</Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed View Modal */}
        {selectedVenue && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-auto"
            onClick={() => setSelectedVenue(null)}
          >
            <Card 
              className="max-w-3xl w-full rounded-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-96 overflow-hidden bg-slate-200">
                <img 
                  src={selectedVenue.image}
                  alt={selectedVenue.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-white">{selectedVenue.type}</Badge>
              </div>

              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="font-heading text-3xl font-bold mb-2">{selectedVenue.name}</h2>
                  <p className="text-lg text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {selectedVenue.city}
                  </p>
                </div>

                {/* Key Details */}
                <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Guest Capacity</p>
                    <p className="text-2xl font-bold text-accent">{selectedVenue.capacity.min}-{selectedVenue.capacity.max}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price Range (per day)</p>
                    <p className="text-2xl font-bold text-accent">₹{(selectedVenue.pricing.min/100000).toFixed(1)}L - {(selectedVenue.pricing.max/100000).toFixed(1)}L</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rating & Reviews</p>
                    <p className="text-2xl font-bold text-accent">{selectedVenue.rating} ⭐ ({selectedVenue.reviews})</p>
                  </div>
                </div>

                {/* All Amenities */}
                <div className="mb-8">
                  <h4 className="font-semibold text-lg mb-4">Complete Amenities</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedVenue.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="flex items-center gap-2 py-2 px-3">
                        {amenityIcons[amenity]}
                        <span>{amenity}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Button className="bg-accent hover:bg-accent/90 py-6 text-base">
                    <Phone className="h-5 w-5 mr-2" />
                    Call: {selectedVenue.phone}
                  </Button>
                  <Button variant="outline" className="py-6 text-base">
                    Schedule Site Visit
                  </Button>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedVenue(null)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results */}
        {matchedVenues.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-lg text-muted-foreground mb-4">
                No venues found matching your criteria. Try adjusting guest count or budget.
              </p>
              <Button 
                className="bg-accent hover:bg-accent/90"
                onClick={() => {
                  setGuestCount(100);
                  setBudget(200000);
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VenueSpaceHub;
