import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import Browse from "./pages/Browse.tsx";
import VendorProfile from "./pages/VendorProfile.tsx";
import BookVendor from "./pages/BookVendor.tsx";
import BookingConfirmation from "./pages/BookingConfirmation.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import VendorDashboard from "./pages/VendorDashboard.tsx";
import VendorOnboarding from "./pages/VendorOnboarding.tsx";
import VendorOnboardingConfirmation from "./pages/VendorOnboardingConfirmation.tsx";
import HowItWorksPage from "./pages/HowItWorksPage.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/vendor/:id" element={<VendorProfile />} />
            <Route path="/book/:vendorId" element={<BookVendor />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
            <Route path="/vendor-onboarding-confirmation" element={<VendorOnboardingConfirmation />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/cart" element={<Cart />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
