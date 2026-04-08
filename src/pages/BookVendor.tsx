import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Circle, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allVendors } from "@/data/vendorDiscovery";
import { useAuth } from "@/contexts/AuthContext";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";

type BookingDraft = {
  eventDate: string | null;
  location: string;
  guests: string;
  requests: string;
};

const BookVendor = () => {
  const { vendorId } = useParams();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const packageId = searchParams.get("package");
  const vendor = allVendors.find(v => v.id === vendorId);
  const pkg = vendor?.packages.find(p => p.id === packageId) ?? vendor?.packages[0];

  const [eventDate, setEventDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [requests, setRequests] = useState("");
  const [savedDraft, setSavedDraft] = useState<BookingDraft | null>(null);
  const [draftStatus, setDraftStatus] = useState<"idle" | "saving" | "saved" | "local" | "error">("idle");

  const draftKey = useMemo(
    () => `eventzhubz.bookingDraft:${vendorId ?? "unknown"}:${packageId ?? "default"}`,
    [vendorId, packageId],
  );

  useEffect(() => {
    let cancelled = false;

    const loadDraft = async () => {
      if (isAuthenticated && user && supabase && hasSupabaseEnv) {
        try {
          const { data, error } = await supabase
            .from("booking_drafts")
            .select("draft_payload")
            .eq("user_id", user.id)
            .eq("vendor_id", vendorId ?? "")
            .eq("package_id", packageId ?? "")
            .maybeSingle();

          if (!cancelled && !error && data?.draft_payload) {
            setSavedDraft(data.draft_payload as BookingDraft);
            return;
          }
        } catch {
          // fall through to local draft
        }
      }

      try {
        const raw = localStorage.getItem(draftKey);
        if (!raw) return;
        const parsed = JSON.parse(raw) as BookingDraft;
        if (!cancelled && (parsed.location || parsed.guests || parsed.requests || parsed.eventDate)) {
          setSavedDraft(parsed);
        }
      } catch {
        // ignore malformed local draft
      }
    };

    loadDraft();

    return () => {
      cancelled = true;
    };
  }, [draftKey, isAuthenticated, packageId, user, vendorId]);

  useEffect(() => {
    const payload: BookingDraft = {
      eventDate: eventDate ? eventDate.toISOString() : null,
      location,
      guests,
      requests,
    };

    if (!payload.eventDate && !payload.location && !payload.guests && !payload.requests) {
      localStorage.removeItem(draftKey);
      if (isAuthenticated && user && supabase && hasSupabaseEnv) {
        supabase
          .from("booking_drafts")
          .delete()
          .eq("user_id", user.id)
          .eq("vendor_id", vendorId ?? "")
          .eq("package_id", packageId ?? "");
      }
      return;
    }

    localStorage.setItem(draftKey, JSON.stringify(payload));

    if (isAuthenticated && user && supabase && hasSupabaseEnv) {
      setDraftStatus("saving");
      const timer = setTimeout(async () => {
        const { error } = await supabase.from("booking_drafts").upsert(
          {
            user_id: user.id,
            vendor_id: vendorId ?? "",
            package_id: packageId ?? "",
            draft_payload: payload,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,vendor_id,package_id",
          },
        );

        setDraftStatus(error ? "local" : "saved");
      }, 500);

      return () => clearTimeout(timer);
    }

    setDraftStatus("local");
  }, [eventDate, location, guests, requests, draftKey, isAuthenticated, packageId, user, vendorId]);

  const restoreDraft = () => {
    if (!savedDraft) return;
    setEventDate(savedDraft.eventDate ? new Date(savedDraft.eventDate) : undefined);
    setLocation(savedDraft.location ?? "");
    setGuests(savedDraft.guests ?? "");
    setRequests(savedDraft.requests ?? "");
    setSavedDraft(null);
  };

  const discardDraft = () => {
    localStorage.removeItem(draftKey);
    if (isAuthenticated && user && supabase && hasSupabaseEnv) {
      supabase
        .from("booking_drafts")
        .delete()
        .eq("user_id", user.id)
        .eq("vendor_id", vendorId ?? "")
        .eq("package_id", packageId ?? "");
    }
    setSavedDraft(null);
  };

  const step1Done = Boolean(eventDate);
  const step2Done = Boolean(location.trim() && guests.trim());
  const step3Done = requests.trim().length > 0;
  const currentStep = !step1Done ? 1 : !step2Done ? 2 : 3;
  const canSubmit = step1Done && step2Done;

  if (!vendor || !pkg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">Vendor or package not found.</p></main>
        <Footer />
      </div>
    );
  }

  const serviceFee = Math.round(pkg.price * 0.15);
  const total = pkg.price + serviceFee;
  const bookingDeposit = Math.round(total * 0.3);
  const preEventInstallment = Math.round(total * 0.4);
  const finalRelease = total - bookingDeposit - preEventInstallment;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-8">Complete Your Booking</h1>

        {savedDraft && (
          <Card className="mb-6 border-accent/40 bg-accent/5">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">Saved draft found</p>
                <p className="text-xs text-muted-foreground">You have unfinished booking details for this vendor. Restore them?</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={discardDraft}>Discard</Button>
                <Button size="sm" variant="accent" onClick={restoreDraft}>Restore Draft</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`rounded-lg border px-3 py-2 text-sm ${currentStep === 1 ? "border-accent bg-accent/5" : ""}`}>
                <p className="font-semibold flex items-center gap-2">
                  {step1Done ? <CircleCheckBig className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4" />}
                  1. Date
                </p>
                <p className="text-xs text-muted-foreground mt-1">Choose event date</p>
              </div>
              <div className={`rounded-lg border px-3 py-2 text-sm ${currentStep === 2 ? "border-accent bg-accent/5" : ""}`}>
                <p className="font-semibold flex items-center gap-2">
                  {step2Done ? <CircleCheckBig className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4" />}
                  2. Details
                </p>
                <p className="text-xs text-muted-foreground mt-1">Location and guests</p>
              </div>
              <div className={`rounded-lg border px-3 py-2 text-sm ${currentStep === 3 ? "border-accent bg-accent/5" : ""}`}>
                <p className="font-semibold flex items-center gap-2">
                  {step3Done ? <CircleCheckBig className="h-4 w-4 text-green-600" /> : <Circle className="h-4 w-4" />}
                  3. Notes & Payment
                </p>
                <p className="text-xs text-muted-foreground mt-1">Add requests and confirm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start mt-1", !eventDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={eventDate} onSelect={setEventDate} className="pointer-events-auto" disabled={d => d < new Date()} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Event Location / Address</Label>
                  <Input className="mt-1" placeholder="123 Main St, City, State" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                <div>
                  <Label>Number of Guests</Label>
                  <Input className="mt-1" type="number" placeholder="50" value={guests} onChange={e => setGuests(e.target.value)} />
                </div>
                <div>
                  <Label>Special Requests</Label>
                  <Textarea className="mt-1" placeholder="Any specific requirements..." value={requests} onChange={e => setRequests(e.target.value)} />
                  <p className="mt-1 text-xs text-muted-foreground">Optional, but helps vendors send better proposals.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={vendor.photo} alt={vendor.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{pkg.name}</p>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Package Price</span><span>${pkg.price}</span></div>
                  <div className="flex justify-between"><span>Service Fee (15%)</span><span>${serviceFee}</span></div>
                  <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>${total}</span></div>
                </div>
                <div className="rounded-lg border p-3 bg-muted/30 text-xs space-y-1">
                  <p className="font-semibold text-sm">Payment Milestones</p>
                  <p>Booking Deposit (30%): ${bookingDeposit}</p>
                  <p>Pre-Event Installment (40%): ${preEventInstallment}</p>
                  <p>Completion Release (30%): ${finalRelease}</p>
                </div>
                <p className="text-[11px] text-muted-foreground text-center">
                  {draftStatus === "saving" && "Saving draft..."}
                  {draftStatus === "saved" && "Draft synced to cloud"}
                  {draftStatus === "local" && "Draft saved on this device"}
                  {draftStatus === "error" && "Draft sync failed"}
                </p>
                {canSubmit ? (
                  <Button variant="hero" className="w-full" asChild>
                    <Link
                      to="/booking-confirmation"
                      state={{
                        vendorName: vendor.name,
                        packageName: pkg.name,
                        eventDate: eventDate ? format(eventDate, "PPP") : null,
                        total,
                      }}
                      onClick={() => {
                        localStorage.removeItem(draftKey);
                        if (isAuthenticated && user && supabase && hasSupabaseEnv) {
                          supabase
                            .from("booking_drafts")
                            .delete()
                            .eq("user_id", user.id)
                            .eq("vendor_id", vendorId ?? "")
                            .eq("package_id", packageId ?? "");
                        }
                      }}
                    >
                      Confirm and Pay
                    </Link>
                  </Button>
                ) : (
                  <Button variant="hero" className="w-full" disabled>
                    Complete required booking details
                  </Button>
                )}
                <p className="text-xs text-muted-foreground text-center">Your payment is held securely. Released to vendor only after your event.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookVendor;
