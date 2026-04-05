import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockBookings } from "@/data/mockData";

const statusColors: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Dashboard = () => {
  const [tab, setTab] = useState("upcoming");

  const filtered = mockBookings.filter(b => b.status === tab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">My Bookings</h1>
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
                          <p className="text-sm text-muted-foreground">{booking.eventDate}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold">${booking.price}</span>
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
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
