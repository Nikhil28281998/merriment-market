import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { eventTypes } from "@/data/mockData";
import { eventBundles } from "@/data/eventBundles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BudgetEstimator = () => {
  const [eventType, setEventType] = useState("Wedding");
  const [guestCount, setGuestCount] = useState("100");
  const [city, setCity] = useState("Houston");

  const estimate = useMemo(() => {
    const guests = Number(guestCount) || 0;
    const bundle = eventBundles.find(item => item.eventType === eventType);
    const mustHaveCount = bundle?.mustHave.length ?? 2;
    const recommendedCount = bundle?.recommended.length ?? 2;

    const basePerGuest = eventType === "Wedding" ? 120 : 60;
    const subtotal = guests * basePerGuest;
    const mustHaveBudget = Math.round(subtotal * 0.55);
    const recommendedBudget = Math.round(subtotal * 0.3);
    const buffer = Math.round(subtotal * 0.15);

    return {
      subtotal,
      mustHaveBudget,
      recommendedBudget,
      buffer,
      mustHaveCount,
      recommendedCount,
    };
  }, [eventType, guestCount]);

  const params = new URLSearchParams();
  params.set("event", eventType);
  if (city.trim()) params.set("location", city.trim());

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-heading flex items-center gap-2">
              <Calculator className="h-5 w-5 text-accent" /> Smart Budget Estimator
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Event Type</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Guest Count</Label>
                <Input className="mt-1" value={guestCount} onChange={e => setGuestCount(e.target.value)} type="number" min="1" />
              </div>
              <div>
                <Label>City</Label>
                <Input className="mt-1" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
              </div>
            </div>

            <div className="md:col-span-2 rounded-xl border p-5 bg-background">
              <h3 className="font-semibold text-lg mb-4">Estimated Plan</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <p>Total Estimate: <span className="font-semibold">${estimate.subtotal.toLocaleString()}</span></p>
                <p>Must-Have Vendors: <span className="font-semibold">{estimate.mustHaveCount}</span></p>
                <p>Must-Have Budget: <span className="font-semibold">${estimate.mustHaveBudget.toLocaleString()}</span></p>
                <p>Recommended Vendors: <span className="font-semibold">{estimate.recommendedCount}</span></p>
                <p>Recommended Budget: <span className="font-semibold">${estimate.recommendedBudget.toLocaleString()}</span></p>
                <p>Contingency Buffer: <span className="font-semibold">${estimate.buffer.toLocaleString()}</span></p>
              </div>
              <div className="mt-5">
                <Button variant="accent" asChild>
                  <Link to={`/browse?${params.toString()}`}>Browse Matching Vendors</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BudgetEstimator;
