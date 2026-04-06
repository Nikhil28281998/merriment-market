import { useState } from "react";
import { CalendarDays, DollarSign, Star, Users, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWindow from "@/components/ChatWindow";

const stats = [
  { label: "Total Bookings", value: "47", icon: Users, color: "text-blue-600" },
  { label: "Upcoming Events", value: "5", icon: CalendarDays, color: "text-accent" },
  { label: "Total Earnings", value: "$23,450", icon: DollarSign, color: "text-green-600" },
  { label: "Average Rating", value: "4.9", icon: Star, color: "text-yellow-500" },
];

const requests = [
  { id: 1, customer: "Priya Sharma", event: "Wedding", date: "May 15, 2026", package: "Premium", price: "$1,200" },
  { id: 2, customer: "Marcus Johnson", event: "Birthday Party", date: "Apr 28, 2026", package: "Essential", price: "$500" },
  { id: 3, customer: "Lisa Chen", event: "Baby Shower", date: "Jun 2, 2026", package: "Essential", price: "$500" },
];

const conversations = [
  { id: 1, customer: "Priya Sharma", lastMessage: "Thank you! I'll go with the Premium package.", time: "2 hours ago", unread: true },
  { id: 2, customer: "Marcus Johnson", lastMessage: "Do you have availability for April 28th?", time: "5 hours ago", unread: true },
  { id: 3, customer: "Lisa Chen", lastMessage: "Can you share more details about decorations?", time: "1 day ago", unread: false },
  { id: 4, customer: "Anita Patel", lastMessage: "Great, looking forward to it!", time: "2 days ago", unread: false },
];

const VendorDashboard = () => {
  const [chatOpen, setChatOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">Vendor Dashboard</h1>

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

        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
            <TabsTrigger value="messages" className="gap-1.5">
              <MessageCircle className="h-4 w-4" /> Messages
              <span className="ml-1 bg-accent text-white text-xs rounded-full px-1.5 py-0.5">2</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader><CardTitle>Recent Booking Requests</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {requests.map(r => (
                  <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-xl">
                    <div>
                      <p className="font-semibold">{r.customer}</p>
                      <p className="text-sm text-muted-foreground">{r.event} · {r.date} · {r.package}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{r.price}</span>
                      <Button variant="accent" size="sm"><CheckCircle className="h-4 w-4 mr-1" /> Accept</Button>
                      <Button variant="outline" size="sm"><XCircle className="h-4 w-4 mr-1" /> Decline</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader><CardTitle>Conversations</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {conversations.map(c => (
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
                ))}
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
