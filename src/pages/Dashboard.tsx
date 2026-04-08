import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCustomerBookings } from "@/lib/payment-api";
import type { Booking } from "@/lib/payment-types";

const statusColors: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Dashboard = () => {
  const [tab, setTab] = useState("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get customer ID from localStorage or context
        const customerId = localStorage.getItem("customerId") || "";
        if (!customerId) {
          setError("Not logged in. Please log in to view your bookings.");
          setLoading(false);
          return;
        }

        const customerBookings = await getCustomerBookings(customerId);
        setBookings(customerBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err instanceof Error ? err.message : "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerBookings();
  }, []);

  const filtered = bookings.filter(b => b.status === tab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">My Bookings</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            {["upcoming", "completed", "cancelled"].map(status => (
              <TabsContent key={status} value={status}>
                {filtered.length === 0 ? (
                  <p className="text-muted-foreground py-12 text-center">No {status} bookings.</p>
                ) : (
                  <div className="space-y-4 mt-4">
                    {filtered.map(booking => (
                      <Card key={booking.id}>
                        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <p className="font-semibold">{booking.vendorName}</p>
                            <p className="text-sm text-muted-foreground">{booking.eventType} · {booking.packageName}</p>
                            <p className="text-sm text-muted-foreground">{new Date(booking.eventDate).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold">${(booking.total / 100).toFixed(2)}</span>
                            <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
                            {booking.status === "completed" && (
                              <Button variant="outline" size="sm">
                                <Star className="h-4 w-4 mr-1" /> Leave a Review
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
