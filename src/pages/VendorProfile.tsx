import { useParams, Link } from "react-router-dom";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockVendors } from "@/data/mockData";

const VendorProfile = () => {
  const { id } = useParams();
  const vendor = mockVendors.find(v => v.id === id);

  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Vendor not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Cover */}
        <div className="relative h-64 md:h-80">
          <img src={vendor.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        </div>

        <div className="container -mt-16 relative z-10 pb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img src={vendor.photo} alt={vendor.name} className="w-32 h-32 rounded-2xl border-4 border-background object-cover shadow-lg" />
            <div className="flex-1">
              <p className="text-sm font-medium text-accent">{vendor.category}</p>
              <h1 className="font-heading text-3xl font-bold">{vendor.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {vendor.city}, {vendor.state}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {vendor.rating} ({vendor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* About */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">{vendor.bio}</p>
          </section>

          {/* Portfolio */}
          {vendor.portfolio.length > 0 && (
            <section className="mt-10">
              <h2 className="font-heading text-xl font-bold mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {vendor.portfolio.map((img, i) => (
                  <img key={i} src={img} alt={`Portfolio ${i + 1}`} className="rounded-xl w-full h-40 object-cover" />
                ))}
              </div>
            </section>
          )}

          {/* Packages */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold mb-4">Pricing Packages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {vendor.packages.map(pkg => (
                <Card key={pkg.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-3xl font-bold text-accent mb-4">${pkg.price}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <Button variant="hero" className="w-full" asChild>
                      <Link to={`/book/${vendor.id}?package=${pkg.id}`}>Book This Package</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold mb-4">Reviews</h2>
            <div className="space-y-4">
              {mockReviews.map(review => (
                <Card key={review.id}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
                      <span className="text-sm font-semibold">{review.author}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section className="mt-10">
            <h2 className="font-heading text-xl font-bold mb-4">Availability</h2>
            <Card className="inline-block">
              <CardContent className="p-4">
                <Calendar className="pointer-events-auto" />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorProfile;
