/**
 * SERVICE CATEGORIES COMPONENT
 * Displays a grid of service categories on the homepage
 * Each category is clickable and navigates to the full services page
 */

// Import icons for each service type
import { Wrench, Droplet, Zap, Paintbrush, Leaf, Hammer, Wind, Camera } from "lucide-react";

// Import UI components
import { Card, CardContent } from "@/components/ui/card";

// Import navigation hook
import { useNavigate } from "react-router-dom";

const ServiceCategories = () => {
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Array of service categories with their details
  const categories = [
    { icon: Wrench, name: "General Repairs", count: "450+ providers", color: "text-primary" },
    { icon: Droplet, name: "Plumbing", count: "320+ providers", color: "text-blue-600" },
    { icon: Zap, name: "Electrical", count: "280+ providers", color: "text-accent" },
    { icon: Paintbrush, name: "Painting", count: "190+ providers", color: "text-purple-600" },
    { icon: Leaf, name: "Garden Services", count: "230+ providers", color: "text-green-600" },
    { icon: Hammer, name: "Construction", count: "170+ providers", color: "text-orange-600" },
    { icon: Wind, name: "HVAC", count: "150+ providers", color: "text-cyan-600" },
    { icon: Camera, name: "Security Systems", count: "120+ providers", color: "text-red-600" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Browse Services by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect professional for any job across South Africa
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Loop through categories and create clickable cards */}
          {categories.map((category, index) => {
            const Icon = category.icon; // Get the icon component
            return (
              <Card
                key={index}
                // onClick event - when card is clicked, navigate to /services page
                onClick={() => navigate("/services")}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors duration-300 mb-4">
                    <Icon className={`h-8 w-8 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
