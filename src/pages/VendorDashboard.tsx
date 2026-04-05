import { CalendarDays, DollarSign, Star, Users, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const VendorDashboard = () => (
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

      <div className="flex gap-4 mt-8">
        <Button variant="outline">Edit Profile</Button>
        <Button variant="outline">Add Package</Button>
        <Button variant="outline">View Reviews</Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default VendorDashboard;
