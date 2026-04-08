import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Upload, Plus, Trash2, CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, eventTypes } from "@/data/mockData";
import { categoryEventDefaults } from "@/data/vendorEventInsights";

const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Spanish", "Arabic", "Other"] as const;
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

const US_STATE_NAMES: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",
  DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",
  KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",
  MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",
  NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",
  OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",
  TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",
  WI:"Wisconsin",WY:"Wyoming",
};

interface PackageItem {
  name: string;
  description: string;
  price: string;
  duration: string;
  includes: string;
}

interface PortfolioItem {
  file: File | null;
  preview: string;
  caption: string;
}

const STEP_LABELS = ["Basic Info", "About", "Portfolio", "Bank Details", "Packages", "Availability", "Review"];

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [servesNationwide, setServesNationwide] = useState(false);
  const [serviceStates, setServiceStates] = useState<string[]>([]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSelectedEventTypes(categoryEventDefaults[value] ?? []);
  };

  const toggleEventType = (type: string) => {
    setSelectedEventTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleServiceState = (abbr: string) => {
    setServiceStates(prev =>
      prev.includes(abbr) ? prev.filter(s => s !== abbr) : [...prev, abbr]
    );
  };

  // Step 2
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState<string[]>(["English"]);

  // Step 3
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  // Step 4 - Bank Details
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [taxId, setTaxId] = useState("");
  const [businessType, setBusinessType] = useState("sole-proprietor");
  const [stripeConnectId, setStripeConnectId] = useState("");

  // Step 5
  const [packages, setPackages] = useState<PackageItem[]>([
    { name: "", description: "", price: "", duration: "", includes: "" },
  ]);

  // Step 5
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  const toggleLanguage = (lang: string) => {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]);
  };

  const addPhoto = () => {
    if (portfolio.length >= 10) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setPortfolio(prev => [...prev, { file, preview: URL.createObjectURL(file), caption: "" }]);
      }
    };
    input.click();
  };

  const removePhoto = (index: number) => {
    setPortfolio(prev => prev.filter((_, i) => i !== index));
  };

  const updateCaption = (index: number, caption: string) => {
    setPortfolio(prev => prev.map((p, i) => i === index ? { ...p, caption } : p));
  };

  const addPackage = () => {
    if (packages.length >= 5) return;
    setPackages(prev => [...prev, { name: "", description: "", price: "", duration: "", includes: "" }]);
  };

  const removePackage = (index: number) => {
    setPackages(prev => prev.filter((_, i) => i !== index));
  };

  const updatePackage = (index: number, field: keyof PackageItem, value: string) => {
    setPackages(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const toggleDate = (date: Date | undefined) => {
    if (!date) return;
    setUnavailableDates(prev => {
      const exists = prev.some(d => d.toDateString() === date.toDateString());
      return exists ? prev.filter(d => d.toDateString() !== date.toDateString()) : [...prev, date];
    });
  };

  const handleSubmit = () => {
    navigate("/vendor-onboarding-confirmation");
  };

  const next = () => setStep(s => Math.min(s + 1, 7));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold mb-2">List Your Services</h1>
        <p className="text-muted-foreground mb-8">Complete the steps below to create your vendor profile.</p>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isDone = step > stepNum;
            return (
              <div key={label} className="flex items-center gap-1">
                <button
                  onClick={() => setStep(stepNum)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive ? "bg-accent text-accent-foreground" : isDone ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isDone ? <Check className="h-3 w-3" /> : <span>{stepNum}</span>}
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {i < 6 && <div className={`w-6 h-0.5 ${step > stepNum ? "bg-accent" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Business Name *</Label>
                <Input className="mt-1" placeholder="e.g. Anand Studio Photography" value={businessName} onChange={e => setBusinessName(e.target.value)} />
              </div>
              <div>
                <Label>Service Category *</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {category && (
                <div>
                  <Label className="mb-1 block">Event Types You Cover *</Label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Select all event types you offer services for. You will appear in Browse results for each selected type.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map(type => {
                      const selected = selectedEventTypes.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleEventType(type)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                            selected
                              ? "bg-accent text-accent-foreground border-accent"
                              : "border-border text-muted-foreground hover:border-accent/50"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {selectedEventTypes.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {selectedEventTypes.length} event type{selectedEventTypes.length !== 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>City *</Label>
                  <Input className="mt-1" placeholder="Edison" value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div>
                  <Label>State *</Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="State" /></SelectTrigger>
                    <SelectContent>{US_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Zip Code *</Label>
                  <Input className="mt-1" placeholder="08817" value={zip} onChange={e => setZip(e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input className="mt-1" type="tel" placeholder="(555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>

              <div className="border rounded-xl p-4 space-y-3 bg-muted/30">
                <div>
                  <Label className="text-sm font-semibold">Service Area</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Where can you travel to serve clients? Customers searching in other states will also find you.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="nationwide"
                    checked={servesNationwide}
                    onCheckedChange={v => {
                      setServesNationwide(v === true);
                      if (v === true) setServiceStates([]);
                    }}
                  />
                  <Label htmlFor="nationwide" className="text-sm cursor-pointer font-medium">
                    I serve clients anywhere in the USA (Nationwide)
                  </Label>
                </div>
                {!servesNationwide && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Select all states you can travel to (your home state is always included):
                    </p>
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {US_STATES.filter(s => s !== state).map(abbr => (
                        <button
                          key={abbr}
                          type="button"
                          title={US_STATE_NAMES[abbr]}
                          onClick={() => toggleServiceState(abbr)}
                          className={`px-2 py-1 rounded border text-xs font-medium transition-all ${
                            serviceStates.includes(abbr)
                              ? "bg-accent text-accent-foreground border-accent"
                              : "border-border text-muted-foreground hover:border-accent/50"
                          }`}
                        >
                          {abbr}
                        </button>
                      ))}
                    </div>
                    {serviceStates.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Serving {state ? `${state} (home)` : "home state"} + {serviceStates.length} additional state{serviceStates.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Card>
            <CardHeader><CardTitle>About Your Business</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Bio / Description *</Label>
                <Textarea className="mt-1 min-h-[120px]" placeholder="Tell customers about your business, what makes you special, and what you offer..." value={bio} onChange={e => setBio(e.target.value)} />
              </div>
              <div>
                <Label>Years of Experience</Label>
                <Input className="mt-1" type="number" placeholder="e.g. 5" value={experience} onChange={e => setExperience(e.target.value)} />
              </div>
              <div>
                <Label className="mb-3 block">Languages Spoken</Label>
                <div className="flex flex-wrap gap-3">
                  {LANGUAGES.map(lang => (
                    <div key={lang} className="flex items-center gap-2">
                      <Checkbox checked={languages.includes(lang)} onCheckedChange={() => toggleLanguage(lang)} id={`lang-${lang}`} />
                      <Label htmlFor={`lang-${lang}`} className="text-sm cursor-pointer">{lang}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Photos</CardTitle>
              <p className="text-sm text-muted-foreground">Upload up to 10 photos showcasing your work.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {portfolio.map((item, i) => (
                  <div key={i} className="relative group">
                    <img src={item.preview} alt={`Photo ${i + 1}`} className="w-full h-36 object-cover rounded-xl" />
                    <button onClick={() => removePhoto(i)} className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <Input
                      placeholder="Caption (optional)"
                      className="mt-2 text-xs h-8"
                      value={item.caption}
                      onChange={e => updateCaption(i, e.target.value)}
                    />
                  </div>
                ))}
                {portfolio.length < 10 && (
                  <button
                    onClick={addPhoto}
                    className="h-36 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-xs">Add Photo</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{portfolio.length}/10 photos uploaded</p>
            </CardContent>
          </Card>
        )}

        {/* Step 4 - Bank Details */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details for Payouts</CardTitle>
              <p className="text-sm text-muted-foreground">Your payment information. EventzHub will securely hold funds from bookings and transfer your earnings after each event.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>🔒 Security & Privacy:</strong> Your bank details are encrypted and stored securely. We never share your information with third parties. Funds are held in escrow and released to you after event completion.
                </p>
              </div>

              {/* Account Holder Information */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-sm mb-4">Account Holder Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name (as on bank account) *</Label>
                    <Input className="mt-1" placeholder="John Smith" value={accountHolderName} onChange={e => setAccountHolderName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Business Type *</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole-proprietor">Sole Proprietor (Self-Employed)</SelectItem>
                        <SelectItem value="llc">LLC (Limited Liability Company)</SelectItem>
                        <SelectItem value="corporation">S-Corp / C-Corp</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="trust">Trust / Estate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-sm mb-4">Tax Information</h3>
                <div>
                  <Label>Tax ID / SSN (for 1099 forms, required when earnings exceed $20,000/year) *</Label>
                  <p className="text-xs text-muted-foreground mb-2">Last 4 digits and your full EIN/SSN (encrypted)</p>
                  <Input className="mt-1" placeholder="XXX-XX-1234" value={taxId} onChange={e => setTaxId(e.target.value)} />
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-sm mb-4">Bank Account Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Bank Name *</Label>
                    <Input className="mt-1" placeholder="e.g. Chase Bank, Bank of America" value={bankName} onChange={e => setBankName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Account Type *</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Routing Number (9 digits) *</Label>
                    <Input className="mt-1" placeholder="021000021" value={routingNumber} onChange={e => setRoutingNumber(e.target.value.replace(/\D/g, "").slice(0, 9))} />
                  </div>
                  <div>
                    <Label>Account Number *</Label>
                    <Input className="mt-1" type="password" placeholder="•••••••••••" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Stripe Connection Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-sm text-green-900 mb-2">Stripe Connect (Optional)</h4>
                <p className="text-xs text-green-800 mb-2">
                  For additional security and faster payouts, you can connect your Stripe account directly. <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Learn more</a>
                </p>
                <Input className="mt-2" placeholder="Stripe Connect ID (optional)" value={stripeConnectId} onChange={e => setStripeConnectId(e.target.value)} />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-900">
                  <strong>Note:</strong> You'll pass payout verification as part of account approval. EventzHub uses encrypted transfers and follows all banking regulations (ACH transfers, NACHA compliance, SOX Regulation).
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Pricing Packages</CardTitle>
              <p className="text-sm text-muted-foreground">Add up to 5 packages for your services.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {packages.map((pkg, i) => (
                <div key={i} className="border rounded-xl p-5 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">Package {i + 1}</p>
                    {packages.length > 1 && (
                      <button onClick={() => removePackage(i)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Package Name *</Label>
                      <Input className="mt-1" placeholder="e.g. Premium" value={pkg.name} onChange={e => updatePackage(i, "name", e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Price ($) *</Label>
                      <Input className="mt-1" type="number" placeholder="500" value={pkg.price} onChange={e => updatePackage(i, "price", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Duration</Label>
                    <Input className="mt-1" placeholder="e.g. 4 hours, Full day" value={pkg.duration} onChange={e => updatePackage(i, "duration", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs">Description</Label>
                    <Textarea className="mt-1" placeholder="Describe what's included..." value={pkg.description} onChange={e => updatePackage(i, "description", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs">What's Included (comma-separated)</Label>
                    <Input className="mt-1" placeholder="e.g. 4 hours coverage, 150 photos, online gallery" value={pkg.includes} onChange={e => updatePackage(i, "includes", e.target.value)} />
                  </div>
                </div>
              ))}
              {packages.length < 5 && (
                <Button variant="outline" onClick={addPackage} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Another Package
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <p className="text-sm text-muted-foreground">Click on dates to mark them as unavailable.</p>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="multiple"
                selected={unavailableDates}
                onSelect={(dates) => setUnavailableDates(dates || [])}
                className="pointer-events-auto mx-auto"
                disabled={d => d < new Date()}
              />
              {unavailableDates.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Unavailable dates ({unavailableDates.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {unavailableDates.sort((a, b) => a.getTime() - b.getTime()).map((d, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 7 - Review */}
        {step === 7 && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Basic Information</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Edit</Button>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground">Business Name:</span> <span className="font-medium">{businessName || "—"}</span></div>
                  <div><span className="text-muted-foreground">Category:</span> <span className="font-medium">{category || "—"}</span></div>
                  <div><span className="text-muted-foreground">Location:</span> <span className="font-medium">{city ? `${city}, ${state} ${zip}` : "—"}</span></div>
                  <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{phone || "—"}</span></div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Service Area:</p>
                  <p className="font-medium text-sm">
                    {servesNationwide
                      ? "Nationwide — serves clients across all US states"
                      : serviceStates.length === 0
                        ? `${state || "Home state"} only`
                        : `${state || "Home"}${serviceStates.length > 0 ? `, ${serviceStates.join(", ")}` : ""}`}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1.5">Event Types Covered:</p>
                  {selectedEventTypes.length === 0 ? (
                    <p className="text-muted-foreground italic">None selected — you won't appear in event-filtered searches.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEventTypes.map(type => (
                        <Badge key={type} variant="secondary" className="text-xs">{type}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">About</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>Edit</Button>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">{bio || "No description provided."}</p>
                <p><span className="text-muted-foreground">Experience:</span> <span className="font-medium">{experience ? `${experience} years` : "—"}</span></p>
                <p><span className="text-muted-foreground">Languages:</span> <span className="font-medium">{languages.join(", ")}</span></p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Portfolio</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setStep(3)}>Edit</Button>
              </CardHeader>
              <CardContent>
                {portfolio.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No photos uploaded.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {portfolio.map((p, i) => (
                      <img key={i} src={p.preview} alt={p.caption || `Photo ${i + 1}`} className="w-full h-20 object-cover rounded-lg" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Bank Details for Payouts</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setStep(4)}>Edit</Button>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><span className="text-muted-foreground">Account Holder Name:</span> <span className="font-medium">{accountHolderName || "—"}</span></div>
                <div><span className="text-muted-foreground">Business Type:</span> <span className="font-medium">{businessType.replace(/-/g, " ") || "—"}</span></div>
                <div><span className="text-muted-foreground">Bank Name:</span> <span className="font-medium">{bankName || "—"}</span></div>
                <div><span className="text-muted-foreground">Account Type:</span> <span className="font-medium">{accountType} Account</span></div>
                <div><span className="text-muted-foreground">Routing Number:</span> <span className="font-medium">{routingNumber ? `***${routingNumber.slice(-4)}` : "—"}</span></div>
                <div><span className="text-muted-foreground">Account Number:</span> <span className="font-medium">{accountNumber ? `***${accountNumber.slice(-4)}` : "—"}</span></div>
                {taxId && <div><span className="text-muted-foreground">Tax ID:</span> <span className="font-medium">Provided</span></div>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Pricing Packages ({packages.filter(p => p.name).length})</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setStep(5)}>Edit</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {packages.filter(p => p.name).map((pkg, i) => (
                  <div key={i} className="border rounded-lg p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold">{pkg.name}</span>
                      <span className="font-bold text-accent">${pkg.price}</span>
                    </div>
                    {pkg.duration && <p className="text-muted-foreground text-xs mt-1">Duration: {pkg.duration}</p>}
                    {pkg.description && <p className="text-muted-foreground text-xs">{pkg.description}</p>}
                  </div>
                ))}
                {packages.filter(p => p.name).length === 0 && <p className="text-sm text-muted-foreground">No packages added.</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Availability</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setStep(6)}>Edit</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {unavailableDates.length === 0 ? "All dates available." : `${unavailableDates.length} date(s) marked unavailable.`}
                </p>
              </CardContent>
            </Card>

            <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit}>
              Submit for Approval
            </Button>
          </div>
        )}

        {/* Navigation buttons */}
        {step < 7 && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prev} disabled={step === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button variant="accent" onClick={next}>
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VendorOnboarding;
