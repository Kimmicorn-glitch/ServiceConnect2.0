/**
 * INDEX PAGE (Homepage)
 * This is the main landing page users see when they visit the site
 * It displays: Hero section, Service categories, How it works, Featured providers, and Footer
 */

// Import all the components that make up the homepage
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProviders from "@/components/FeaturedProviders";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    // min-h-screen ensures the page takes at least the full height of the screen
    <div className="min-h-screen">
      {/* Hero section - The big banner at the top with search */}
      <Hero />
      
      {/* Service Categories - Grid of different service types */}
      <ServiceCategories />
      
      {/* How It Works - Explains the process to users */}
      <HowItWorks />
      
      {/* Featured Providers - Shows top-rated service providers */}
      <FeaturedProviders />
      
      {/* Footer - Bottom section with links and info */}
      <Footer />
    </div>
  );
};

export default Index;
