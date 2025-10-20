/**
 * HERO COMPONENT
 * This is the main banner section at the top of the homepage
 * Features: Search bar, city selector, and call-to-action button
 */

// Import UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import icons
import { Search, MapPin } from "lucide-react";

// Import navigation hook
import { useNavigate } from "react-router-dom";

const Hero = () => {
  // Hook to navigate to different pages
  const navigate = useNavigate();

  // List of South African cities for the dropdown
  const cities = [
    "Johannesburg",
    "Cape Town",
    "Durban",
    "Pretoria",
    "Port Elizabeth",
    "Bloemfontein",
    "East London",
    "Polokwane",
    "Nelspruit",
    "Kimberley",
  ];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Find Trusted Service Providers
            <span className="block mt-2 text-secondary">Across South Africa</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Connect with verified professionals for home repairs, cleaning, plumbing, 
            electrical work, and more in your area.
          </p>

          {/* Search Box */}
          <div className="bg-card rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="What service do you need?"
                    className="h-12 pl-10 text-base border-2 focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <Select>
                  <SelectTrigger className="h-12 text-base border-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-1">
                {/* Search button - clicking navigates to Services page */}
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full h-12"
                  onClick={() => navigate("/services")}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Services
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {["Plumbing", "Electrical", "Cleaning", "Painting", "Garden Services"].map((service) => (
                <button
                  key={service}
                  className="px-3 py-1 rounded-full bg-muted hover:bg-accent text-sm font-medium transition-colors"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
