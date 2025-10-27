/**
 * INDEX PAGE (Homepage)
 * Main landing page for users.
 * Sections included:
 * - Hero banner with search
 * - Service categories grid
 * - How It Works overview
 * - Featured service providers
 * - Footer
 */

// Import homepage sections/components
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import { FeaturedProviders } from "@/components/FeaturedProviders";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Service Categories Grid */}
      <ServiceCategories />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Service Providers */}
      <FeaturedProviders />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
