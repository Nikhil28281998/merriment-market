import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedVendors from "@/components/FeaturedVendors";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <HeroSection />
      <CategoryGrid />
      <FeaturedVendors />
      <HowItWorks />
    </main>
    <Footer />
  </div>
);

export default Index;
