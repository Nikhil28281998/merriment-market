import { useState } from "react";
import { Heart, MessageCircle, Share2, Star, Calendar, MapPin, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SuccessStory {
  id: string;
  title: string;
  vendorName: string;
  vendorCategory: string;
  eventType: string;
  customerName: string;
  rating: number;
  image: string;
  testimonial: string;
  date: string;
  likes: number;
  comments: number;
}

const successStories: SuccessStory[] = [
  {
    id: "1",
    title: "Dreams Come True - The Perfect Wedding Day",
    vendorName: "Eternal Frames Photography",
    vendorCategory: "Photography",
    eventType: "Wedding",
    customerName: "Priya & Arjun",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop",
    testimonial: "Eternal Frames captured every precious moment of our wedding day. The photos are absolutely stunning and tell our love story beautifully!",
    date: "2 weeks ago",
    likes: 342,
    comments: 28,
  },
  {
    id: "2",
    title: "Magical Decorations - Our Housewarming Was Unforgettable",
    vendorName: "Dream Weave Decorations",
    vendorCategory: "Decorations",
    eventType: "Housewarming",
    customerName: "Rahul & Family",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519167758993-403d7b6d9dd9?w=500&h=500&fit=crop",
    testimonial: "The team transformed our boring space into a magical wonderland. Every guest was amazed!",
    date: "1 month ago",
    likes: 256,
    comments: 19,
  },
  {
    id: "3",
    title: "Gender Reveal Party Perfection",
    vendorName: "Celebrate Together Events",
    vendorCategory: "Event Planning",
    eventType: "Gender Reveal",
    customerName: "Sneha",
    rating: 5,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop",
    testimonial: "Our gender reveal was planned so thoughtfully. Everything was perfect from start to finish!",
    date: "3 weeks ago",
    likes: 189,
    comments: 14,
  },
];

const VendorSuccessStories = () => {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  const toggleLike = (storyId: string) => {
    setLiked(prev => ({ ...prev, [storyId]: !prev[storyId] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <section className="flex-1 py-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold mb-3">Vendor Success Stories</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real couples and families sharing their unforgettable moments with our amazing vendors. 
              Your inspiration for your perfect event awaits.
            </p>
          </div>

          {/* Featured Story */}
          {successStories.length > 0 && (
            <Card className="mb-12 overflow-hidden border-2 border-accent">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-80 md:h-96 overflow-hidden bg-slate-200">
                  <img 
                    src={successStories[0].image} 
                    alt={successStories[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-3 bg-accent">{successStories[0].eventType}</Badge>
                  <h2 className="font-heading text-2xl font-bold mb-2">{successStories[0].title}</h2>
                  <p className="text-muted-foreground mb-4">By {successStories[0].customerName}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(successStories[0].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-lg mb-6 italic text-slate-700">"{successStories[0].testimonial}"</p>

                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <span className="font-semibold text-slate-900">📍 {successStories[0].vendorName}</span>
                    <span>{successStories[0].date}</span>
                  </div>

                  <Button className="bg-accent hover:bg-accent/90 w-fit" asChild>
                    <Link to="/browse">View {successStories[0].vendorName}</Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Story Grid */}
          <div className="mb-8">
            <h3 className="font-heading text-2xl font-bold mb-6">More Success Stories</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.slice(1).map((story) => (
                <Card 
                  key={story.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="h-64 bg-slate-200 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">{story.eventType}</Badge>
                      <div className="flex gap-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mb-2 line-clamp-2">{story.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">"{story.testimonial}"</p>
                    <p className="text-xs text-muted-foreground mb-4">— {story.customerName}</p>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <button 
                        className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(story.id);
                        }}
                      >
                        <Heart 
                          className={`h-5 w-5 ${liked[story.id] ? 'fill-red-500 text-red-500' : ''}`}
                        />
                        <span className="text-sm">{story.likes + (liked[story.id] ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm">{story.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-8 text-center">
              <h3 className="font-heading text-2xl font-bold mb-3">Ready to Create Your Success Story?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Book your next event with EventzHub and share your unforgettable moment with our community.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button className="bg-accent hover:bg-accent/90" asChild>
                  <Link to="/browse">Browse Vendors</Link>
                </Button>
                <Button variant="outline" onClick={() => setShareOpen(true)}>Share Your Story</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal for detailed view */}
      {selectedStory && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStory(null)}
        >
          <Card className="max-w-2xl w-full rounded-lg" onClick={e => e.stopPropagation()}>
            <CardContent className="p-6">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              <h2 className="font-heading text-2xl font-bold mb-2">{selectedStory.title}</h2>
              <p className="text-muted-foreground mb-4">By {selectedStory.customerName}</p>
              
              <div className="flex items-center gap-2 mb-4">
                {[...Array(selectedStory.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-lg mb-6 italic">{selectedStory.testimonial}</p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Vendor:</span> {selectedStory.vendorName}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Category:</span> {selectedStory.vendorCategory}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Event Type:</span> {selectedStory.eventType}
                </div>
              </div>

              <Button className="bg-accent hover:bg-accent/90 w-full mb-3" asChild>
                <Link to="/browse">Book {selectedStory.vendorName}</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setSelectedStory(null)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Share Story Modal */}
      {shareOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShareOpen(false)}
        >
          <Card className="max-w-md w-full rounded-lg" onClick={e => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold">Share Your Story</h2>
                <button type="button" onClick={() => setShareOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">We'd love to hear about your event! Email us your story and photos.</p>
              <a
                href="mailto:stories@eventzhub.com?subject=My Event Success Story"
                className="block"
              >
                <Button className="bg-accent hover:bg-accent/90 w-full mb-3">
                  Email Us Your Story
                </Button>
              </a>
              <Button variant="outline" className="w-full" onClick={() => setShareOpen(false)}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default VendorSuccessStories;
