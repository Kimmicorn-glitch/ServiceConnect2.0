/**
 * SERVICES PAGE
 * This page shows all available service categories that users can browse
 * It displays service cards that can be clicked to view providers
 */

import { useNavigate } from "react-router-dom";
import { Wrench, Droplet, Zap, Paintbrush, Leaf, Hammer, Wind, Camera, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  // useNavigate is a React Router hook that lets us navigate to different pages
  const navigate = useNavigate();

  // Array of service categories - each object represents one service type
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
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">ServiceConnect</h1>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Button>
            <Button variant="outline" onClick={() => navigate("/contact")}>Contact</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Browse All Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any category to view available service providers
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Loop through each category and create a card */}
            {categories.map((category, index) => {
              const Icon = category.icon; // Get the icon component for this category
              return (
                <Card
                  key={index}
                  // onClick makes the card clickable and navigates to providers page
                  onClick={() => navigate("/providers")}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
                >
                  <CardContent className="p-6 text-center">
                    {/* Icon Container */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors duration-300 mb-4">
                      <Icon className={`h-8 w-8 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    {/* Category Name */}
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    {/* Provider Count */}
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
