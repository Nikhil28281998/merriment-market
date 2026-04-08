import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BudgetEstimator from "@/components/BudgetEstimator";
import BrowseByCelebration from "@/components/BrowseByCelebration";
import FeaturedVendors from "@/components/FeaturedVendors";
import InspirationSection from "@/components/InspirationSection";
import CityBrowse from "@/components/CityBrowse";
import CategoryGrid from "@/components/CategoryGrid";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <HeroSection />
      <BrowseByCelebration />
      <FeaturedVendors />
      <InspirationSection />
      <CityBrowse />
      <CategoryGrid />
      <HowItWorks />
      <BudgetEstimator />
    </main>
    <Footer />
  </div>
);

export default Index;
