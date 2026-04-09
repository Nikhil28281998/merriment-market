import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Index = lazy(() => import("./pages/Index.tsx"));
const SignUp = lazy(() => import("./pages/SignUp.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Browse = lazy(() => import("./pages/Browse.tsx"));
const VendorProfile = lazy(() => import("./pages/VendorProfile.tsx"));
const BookVendor = lazy(() => import("./pages/BookVendor.tsx"));
const BookingConfirmation = lazy(() => import("./pages/BookingConfirmation.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const VendorDashboard = lazy(() => import("./pages/VendorDashboard.tsx"));
const VendorOnboarding = lazy(() => import("./pages/VendorOnboarding.tsx"));
const VendorOnboardingConfirmation = lazy(() => import("./pages/VendorOnboardingConfirmation.tsx"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage.tsx"));
const StyleStudio = lazy(() => import("./pages/StyleStudio.tsx"));
const Cart = lazy(() => import("./pages/Cart.tsx"));
const CompareVendors = lazy(() => import("./pages/CompareVendors.tsx"));
const SuccessStories = lazy(() => import("./pages/SuccessStories.tsx"));
const EventAcademy = lazy(() => import("./pages/EventAcademy.tsx"));
const PerformanceStars = lazy(() => import("./pages/PerformanceStars.tsx"));
const VenueSpaceHub = lazy(() => import("./pages/VenueSpaceHub.tsx"));
const SmartBudgetPlanner = lazy(() => import("./pages/SmartBudgetPlanner.tsx"));
const TrendingDashboard = lazy(() => import("./pages/TrendingDashboard.tsx"));
const MyFavoritesPage = lazy(() => import("./pages/MyFavoritesPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/vendor/:id" element={<VendorProfile />} />
                <Route path="/book/:vendorId" element={<BookVendor />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["vendor"]}>
                      <VendorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor-onboarding"
                  element={
                    <ProtectedRoute allowedRoles={["vendor"]}>
                      <VendorOnboarding />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendor-onboarding-confirmation"
                  element={
                    <ProtectedRoute allowedRoles={["vendor"]}>
                      <VendorOnboardingConfirmation />
                    </ProtectedRoute>
                  }
                />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/style-studio" element={<StyleStudio />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/compare" element={<CompareVendors />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/event-academy" element={<EventAcademy />} />
                <Route path="/performance-stars" element={<PerformanceStars />} />
                <Route path="/venue-spaces" element={<VenueSpaceHub />} />
                <Route path="/budget-planner" element={<SmartBudgetPlanner />} />
                <Route path="/trending" element={<TrendingDashboard />} />
                <Route
                  path="/my-favorites"
                  element={
                    <ProtectedRoute allowedRoles={["customer"]}>
                      <MyFavoritesPage />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
