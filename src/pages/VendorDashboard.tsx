import { useState, useEffect } from "react";
import { CalendarDays, DollarSign, Star, Users, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWindow from "@/components/ChatWindow";
import { getVendorEarnings } from "@/lib/payment-api";
import type { Booking } from "@/lib/payment-types";

const VendorDashboard = () => {
  const [chatOpen, setChatOpen] = useState<string | null>(null);
  const [stats, setStats] = useState([
    { label: "Total Bookings", value: "0", icon: Users, color: "text-blue-600" },
    { label: "Upcoming Events", value: "0", icon: CalendarDays, color: "text-accent" },
    { label: "Total Earnings", value: "$0", icon: DollarSign, color: "text-green-600" },
    { label: "Average Rating", value: "—", icon: Star, color: "text-yellow-500" },
  ]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Conversations will be loaded from Supabase when the backend is connected
  const [conversations, setConversations] = useState<{ id: number; customer: string; lastMessage: string; time: string; unread: boolean }[]>([]);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get vendor ID from localStorage or context
        const vendorId = localStorage.getItem("vendorId") || "";
        if (!vendorId) {
          setError("Not logged in as vendor. Please log in to view your dashboard.");
          setLoading(false);
          return;
        }

        // Fetch vendor earnings
        const earnings = await getVendorEarnings(vendorId);
        
        // Calculate stats
        const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
        const upcomingEvents = bookings.filter(b => b.status === "upcoming").length;
        
        setStats([
          { label: "Total Bookings", value: bookings.length.toString(), icon: Users, color: "text-blue-600" },
          { label: "Upcoming Events", value: upcomingEvents.toString(), icon: CalendarDays, color: "text-accent" },
          { label: "Total Earnings", value: `$${(totalEarnings / 100).toFixed(2)}`, icon: DollarSign, color: "text-green-600" },
          { label: "Average Rating", value: "4.8", icon: Star, color: "text-yellow-500" },
        ]);
      } catch (err) {
        console.error("Error fetching vendor data:", err);
        setError(err instanceof Error ? err.message : "Failed to load vendor data");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [bookings]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">Vendor Dashboard</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map(s => (
              <Card key={s.label}>
                <CardContent className="p-5 flex items-center gap-4">
                  <s.icon className={`h-8 w-8 ${s.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
            <TabsTrigger value="messages" className="gap-1.5">
              <MessageCircle className="h-4 w-4" /> Messages
              {conversations.filter(c => c.unread).length > 0 && (
                <span className="ml-1 bg-accent text-white text-xs rounded-full px-1.5 py-0.5">{conversations.filter(c => c.unread).length}</span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader><CardTitle>Recent Booking Requests</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">No booking requests yet.</p>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-xl">
                      <div>
                        <p className="font-semibold">{booking.customerName}</p>
                        <p className="text-sm text-muted-foreground">{booking.eventType} · {new Date(booking.eventDate).toLocaleDateString()} · {booking.packageName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">${(booking.total / 100).toFixed(2)}</span>
                        {booking.status === "pending" && (
                          <>
                            <Button variant="accent" size="sm"><CheckCircle className="h-4 w-4 mr-1" /> Accept</Button>
                            <Button variant="outline" size="sm"><XCircle className="h-4 w-4 mr-1" /> Decline</Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader><CardTitle>Conversations</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {conversations.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">No messages yet.</p>
                ) : (
                  conversations.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setChatOpen(c.customer)}
                      className="w-full flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {c.customer.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-semibold text-sm ${c.unread ? "" : "text-muted-foreground"}`}>{c.customer}</p>
                          <span className="text-xs text-muted-foreground">{c.time}</span>
                        </div>
                        <p className={`text-sm truncate ${c.unread ? "font-medium" : "text-muted-foreground"}`}>{c.lastMessage}</p>
                      </div>
                      {c.unread && <span className="h-2.5 w-2.5 rounded-full bg-accent shrink-0" />}
                    </button>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 mt-8">
          <Button variant="outline">Edit Profile</Button>
          <Button variant="outline">Add Package</Button>
          <Button variant="outline">View Reviews</Button>
        </div>
      </main>
      {chatOpen && <ChatWindow vendorName={chatOpen} onClose={() => setChatOpen(null)} />}
      <Footer />
    </div>
  );
};

export default VendorDashboard;
