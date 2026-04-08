import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { hasSupabaseEnv } from "@/lib/supabase";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Shared fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Vendor-only fields
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasSupabaseEnv) {
      toast({
        title: "Supabase not configured",
        description: "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable signup.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error, needsEmailVerification } = await signUp({
      email,
      password,
      metadata: {
        role,
        full_name: fullName,
        phone,
        business_name: businessName,
        category,
        city,
      },
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Signup failed",
        description: error,
        variant: "destructive",
      });
      return;
    }

    if (needsEmailVerification) {
      toast({
        title: "Check your email",
        description: "Verify your account from the email link, then log in.",
      });
      navigate("/login");
      return;
    }

    toast({
      title: "Account created",
      description: "Your account is ready.",
    });
    navigate(role === "vendor" ? "/vendor-onboarding" : "/dashboard");
  };

  const handleGoogle = async () => {
    if (!hasSupabaseEnv) {
      toast({
        title: "Supabase not configured",
        description: "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable Google signup.",
      });
      return;
    }

    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Google signup failed",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Join thousands of families and vendors on EventzHub</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`p-4 rounded-xl border-2 text-center transition-all ${role === "customer" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
            >
              <span className="text-2xl block mb-1">🎉</span>
              <span className="text-sm font-semibold">I am a Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`p-4 rounded-xl border-2 text-center transition-all ${role === "vendor" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
            >
              <span className="text-2xl block mb-1">💼</span>
              <span className="text-sm font-semibold">I am a Vendor</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1" />
            </div>

            {role === "vendor" && (
              <>
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="e.g. Anand Studio Photography" value={businessName} onChange={e => setBusinessName(e.target.value)} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="category">Service Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="e.g. Edison, NJ" value={city} onChange={e => setCity(e.target.value)} required className="mt-1" />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1" />
            </div>

            {role === "vendor" && (
              <div className="flex items-start gap-2">
                <Checkbox id="vendorTerms" required className="mt-1" />
                <Label htmlFor="vendorTerms" className="text-sm text-muted-foreground leading-snug">
                  I agree to process all bookings from EventzHub customers through the EventzHub platform. I understand that sharing personal contact information with customers before a confirmed booking, or accepting payment outside the platform, is a violation of EventzHub terms and may result in removal from the platform.
                </Label>
              </div>
            )}

            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-snug">
                  I agree to the <span className="text-accent">Terms of Service</span> and <span className="text-accent">Privacy Policy</span>
              </Label>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={!agreed || submitting}>
              {submitting ? "Creating account..." : role === "vendor" ? "Sign Up as Vendor" : "Sign Up as Customer"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
            </div>

            <Button type="button" variant="outline" size="lg" className="w-full gap-2" onClick={handleGoogle}>
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign up with Google
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-accent font-semibold hover:underline">Log In</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
