import { useMemo, useState } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { Star, MapPin, CheckCircle, MessageCircle, ShieldCheck, Phone, ShoppingCart, Check, X, ChevronLeft, ChevronRight, PlayCircle, Globe, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWindow from "@/components/ChatWindow";
import VendorActionButtons from "@/components/VendorActionButtons";
import { allVendors } from "@/data/vendorDiscovery";
import type { VendorMediaVideo } from "@/data/mockData";
import { getVendorEventInsight } from "@/data/vendorEventInsights";
import { getVendorUnavailableDates } from "@/data/vendorAvailability";

const VendorProfile = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callConfirmed, setCallConfirmed] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoErrorIds, setVideoErrorIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const selectedEvent = searchParams.get("event") || "";
  const selectedColors = searchParams.get("colors") || "";
  const selectedStyles = searchParams.get("styles") || "";
  const selectedThemes = searchParams.get("themes") || "";
  const vendor = allVendors.find(v => v.id === id);

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

  const eventInsight = selectedEvent ? getVendorEventInsight(vendor, selectedEvent) : null;
  const unavailableDates = getVendorUnavailableDates(vendor.id);
  const startingPackage = vendor.packages[0];
  const vendorVideos = vendor.mediaVideos?.length ? vendor.mediaVideos : [];
  const packageFeatures = useMemo(
    () => Array.from(new Set(vendor.packages.flatMap(pkg => pkg.includes))),
    [vendor.packages],
  );

  const closeLightbox = () => setLightboxIndex(null);
  const previousLightboxImage = () => setLightboxIndex((prev) => (prev === null ? prev : (prev - 1 + vendor.portfolio.length) % vendor.portfolio.length));
  const nextLightboxImage = () => setLightboxIndex((prev) => (prev === null ? prev : (prev + 1) % vendor.portfolio.length));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Cover */}
        <div className="relative h-64 md:h-80">
          <img src={vendor.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        </div>

        <div className="container -mt-16 relative z-10 pb-24 lg:pb-12">
          <div className="mb-4">
            <Button variant="ghost" size="sm" className="gap-1 bg-background/90 backdrop-blur" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img src={vendor.photo} alt={vendor.name} className="w-32 h-32 rounded-2xl border-4 border-background object-cover shadow-lg" />
            <div className="flex-1">
              <p className="text-sm font-medium text-accent">{vendor.category}</p>
              <h1 className="font-heading text-3xl font-bold">{vendor.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {vendor.city}, {vendor.state}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {vendor.rating} ({vendor.reviewCount} reviews)</span>                  {vendor.serviceStates?.length ? (
                    <span className="flex items-center gap-1 text-accent font-medium">
                      <Globe className="h-4 w-4" />
                      {vendor.serviceStates.includes("Nationwide")
                        ? "Serves clients across all USA"
                        : `Also serves: ${vendor.serviceStates.join(", ")}`}
                    </span>
                  ) : null}              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button variant="accent" onClick={() => setChatOpen(true)} className="gap-2">
                  <MessageCircle className="h-4 w-4" /> Message Vendor
                </Button>
                <Button variant="outline" onClick={() => { setShowCallDialog(true); setCallConfirmed(false); }} className="gap-2">
                  <Phone className="h-4 w-4" /> Call Vendor
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
                All communication through EventzHub is monitored and recorded for your safety.
              </div>
              <div className="mt-4 pt-3 border-t">
                <VendorActionButtons vendorId={vendor.id} vendor={vendor} size="sm" />
              </div>
            </div>
          </div>

          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
            <div>
              {/* About */}
              <section>
                <h2 className="font-heading text-xl font-bold mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{vendor.bio}</p>
              </section>

              {(selectedColors || selectedStyles || selectedThemes || selectedEvent) && (
                <section className="mt-10 rounded-2xl border bg-muted/40 p-5">
                  <h2 className="font-heading text-xl font-bold mb-3">Client Style Brief</h2>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    {selectedEvent && <p><span className="font-semibold text-foreground">Event:</span> {selectedEvent}</p>}
                    {selectedColors && <p><span className="font-semibold text-foreground">Colors:</span> {selectedColors.split(",").join(", ")}</p>}
                    {selectedStyles && <p><span className="font-semibold text-foreground">Styles:</span> {selectedStyles.split(",").join(", ")}</p>}
                    {selectedThemes && <p><span className="font-semibold text-foreground">Themes:</span> {selectedThemes.split(",").join(", ")}</p>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Tip: Message this vendor and ask for a proposal based on this exact brief.</p>
                </section>
              )}

              <section className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-4">Media Gallery</h2>
                <Tabs defaultValue="photos">
                  <TabsList className="mb-4">
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="photos">
                    {vendor.portfolio.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {vendor.portfolio.map((img, i) => (
                          <button key={i} onClick={() => setLightboxIndex(i)} className="text-left">
                            <img src={img} alt={`Portfolio ${i + 1}`} className="rounded-xl w-full h-40 object-cover hover:opacity-90 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No photos yet.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="videos">
                    <div className="grid md:grid-cols-2 gap-4">
                      {vendorVideos.map(video => {
                        const hasError = videoErrorIds.includes(video.id);
                        return (
                          <Card key={video.id}>
                            <CardContent className="p-3">
                              <div className="aspect-video rounded-lg overflow-hidden border bg-black/5">
                                {!hasError && video.sourceType === "upload" ? (
                                  <video
                                    src={video.sourceUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                    poster={video.thumbnailUrl}
                                    onError={() => setVideoErrorIds(prev => (prev.includes(video.id) ? prev : [...prev, video.id]))}
                                  />
                                ) : !hasError ? (
                                  <iframe
                                    src={video.sourceUrl}
                                    title={video.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                ) : (
                                  <div className="h-full w-full grid place-items-center px-4 text-center">
                                    <div>
                                      <p className="text-sm font-medium">Video unavailable</p>
                                      <a href={video.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline">Open source link</a>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm font-medium mt-2 flex items-center gap-1">
                                <PlayCircle className="h-4 w-4 text-accent" /> {video.title}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="activity">
                    {eventInsight ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-4">
                          Latest work, recent photos, and trending templates/themes for {selectedEvent.toLowerCase()} clients.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-5">
                          {eventInsight.recentActivities.map(activity => (
                            <Card key={`${activity.date}-${activity.title}`}>
                              <CardContent className="p-4">
                                <p className="text-xs text-muted-foreground mb-1">{activity.date}</p>
                                <h3 className="font-semibold text-sm mb-1.5">{activity.title}</h3>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                          {eventInsight.photos.map((img, index) => (
                            <img key={`${img}-${index}`} src={img} alt={`${selectedEvent} sample ${index + 1}`} className="rounded-xl w-full h-40 object-cover" />
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {eventInsight.themes.map(theme => (
                            <Badge key={theme} variant="secondary" className="py-1.5 px-3">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">Select an event from browse to see event-specific activity highlights.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </section>

              {/* Packages */}
              <section className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-4">Pricing Packages</h2>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        {(() => {
                          const inCart = items.some(i => i.vendor.id === vendor.id && i.package.id === pkg.id);
                          return (
                            <div className="flex gap-2">
                              <Button
                                variant={inCart ? "outline" : "accent"}
                                className="flex-1 min-h-[44px] gap-2"
                                disabled={inCart}
                                onClick={() => {
                                  addItem(vendor, pkg);
                                  toast.success(`${pkg.name} added to cart!`);
                                }}
                              >
                                {inCart ? <><Check className="h-4 w-4" /> In Cart</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
                              </Button>
                              <Button variant="hero" className="flex-1 min-h-[44px]" asChild>
                                <Link to={`/book/${vendor.id}?package=${pkg.id}`}>Book Now</Link>
                              </Button>
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-4">Package Comparison</h2>
                <div className="rounded-xl border overflow-auto">
                  <table className="w-full text-sm min-w-[640px]">
                    <thead className="bg-muted/40">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold">Included Feature</th>
                        {vendor.packages.map(pkg => (
                          <th key={`head-${pkg.id}`} className="text-left px-4 py-3 font-semibold">{pkg.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {packageFeatures.map(feature => (
                        <tr key={feature} className="border-t">
                          <td className="px-4 py-3 text-muted-foreground">{feature}</td>
                          {vendor.packages.map(pkg => (
                            <td key={`${pkg.id}-${feature}`} className="px-4 py-3">
                              {pkg.includes.includes(feature) ? (
                                <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                                  <CheckCircle className="h-4 w-4" /> Included
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Reviews */}
              <section className="mt-10">
                <h2 className="font-heading text-xl font-bold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {vendor.reviews.map(review => (
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
                    <Calendar
                      className="pointer-events-auto"
                      disabled={(date) => {
                        const iso = date.toISOString().slice(0, 10);
                        return date < new Date() || unavailableDates.includes(iso);
                      }}
                    />
                  </CardContent>
                </Card>
                {unavailableDates.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Blocked dates this season: {unavailableDates.map(value => new Date(value).toLocaleDateString()).join(", ")}
                  </p>
                )}
              </section>
            </div>

            <aside className="hidden lg:block">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Book This Vendor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border p-3 bg-muted/30">
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="text-3xl font-bold text-accent">${vendor.startingPrice}</p>
                    {startingPackage && <p className="text-xs text-muted-foreground mt-1">Most popular: {startingPackage.name}</p>}
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-600" /> Verified profile</p>
                    <p className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-accent" /> Typical response: under 2 hours</p>
                    <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> {vendor.reviewCount}+ completed bookings</p>
                  </div>
                  {startingPackage && (
                    <Button className="w-full" variant="hero" asChild>
                      <Link to={`/book/${vendor.id}?package=${startingPackage.id}`}>Book from ${startingPackage.price}</Link>
                    </Button>
                  )}
                  <Button className="w-full" variant="outline" onClick={() => setChatOpen(true)}>
                    Message First
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      {/* Call Vendor Dialog */}
      {showCallDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowCallDialog(false)}>
          <div className="bg-background rounded-2xl shadow-2xl p-6 max-w-sm mx-4 w-full" onClick={e => e.stopPropagation()}>
            {!callConfirmed ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <h3 className="font-heading text-lg font-bold">Call Vendor</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Calls are connected securely through EventzHub. This call will be recorded for safety purposes. Click confirm to connect.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCallDialog(false)}>Cancel</Button>
                  <Button variant="accent" className="flex-1" onClick={() => setCallConfirmed(true)}>Confirm</Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <Phone className="h-10 w-10 text-accent mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-bold mb-2">Call Connected</h3>
                  <p className="text-sm text-muted-foreground mb-4">Please dial the number below to connect with this vendor through EventzHub:</p>
                  <p className="text-2xl font-bold text-accent mb-4">(888) 555-0199</p>
                  <p className="text-xs text-muted-foreground mb-4">This is an EventzHub relay number. The vendor's personal number is never shared.</p>
                  <Button variant="outline" className="w-full" onClick={() => setShowCallDialog(false)}>Close</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {chatOpen && <ChatWindow vendorName={vendor.name} onClose={() => setChatOpen(false)} />}

      {lightboxIndex !== null && vendor.portfolio.length > 0 && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white" onClick={closeLightbox}>
            <X className="h-7 w-7" />
          </button>
          <button className="absolute left-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); previousLightboxImage(); }}>
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            src={vendor.portfolio[lightboxIndex]}
            alt={`Portfolio ${lightboxIndex + 1}`}
            className="max-h-[86vh] max-w-[92vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="absolute right-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}>
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute bottom-4 text-white/70 text-sm">
            {lightboxIndex + 1} / {vendor.portfolio.length}
          </div>
        </div>
      )}

      {startingPackage && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur p-3">
          <div className="container flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-lg font-bold text-accent">${vendor.startingPrice}</p>
            </div>
            <Button variant="hero" asChild className="min-w-[150px]">
              <Link to={`/book/${vendor.id}?package=${startingPackage.id}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default VendorProfile;
