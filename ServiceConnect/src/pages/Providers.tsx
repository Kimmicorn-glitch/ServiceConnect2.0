/**
 * PROVIDERS PAGE
 * This page displays a list of service providers
 * Users can view provider profiles, ratings, and contact information
 */

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Providers = () => {
  // Hook to navigate between pages
  const navigate = useNavigate();

  // Sample data - In a real app, this would come from a database
  const providers = [
    {
      id: 1,
      name: "John's Plumbing Services",
      rating: 4.8,
      reviews: 127,
      location: "Johannesburg",
      specialty: "Plumbing",
      verified: true,
      phone: "+27 11 123 4567",
      email: "john@plumbing.co.za",
    },
    {
      id: 2,
      name: "Sarah's Electrical Solutions",
      rating: 4.9,
      reviews: 98,
      location: "Cape Town",
      specialty: "Electrical",
      verified: true,
      phone: "+27 21 987 6543",
      email: "sarah@electrical.co.za",
    },
    {
      id: 3,
      name: "Mike's Painting Pro",
      rating: 4.7,
      reviews: 85,
      location: "Durban",
      specialty: "Painting",
      verified: true,
      phone: "+27 31 555 1234",
      email: "mike@painting.co.za",
    },
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
              onClick={() => navigate("/services")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Available Service Providers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse verified professionals in your area
            </p>
          </div>

          {/* Provider Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loop through each provider and display their info */}
            {providers.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{provider.name}</CardTitle>
                    {/* Show verified badge if provider is verified */}
                    {provider.verified && (
                      <Badge variant="default" className="bg-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                  {/* Specialty Badge */}
                  <Badge variant="secondary" className="w-fit mt-2">
                    {provider.specialty}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rating Display */}
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-muted-foreground">
                      ({provider.reviews} reviews)
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4" />
                      <span>{provider.email}</span>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <Button className="w-full mt-4">
                    Contact Provider
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Providers;
