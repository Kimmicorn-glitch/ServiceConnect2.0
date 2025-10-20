import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedProviders = () => {
  const providers = [
    {
      name: "Thabo's Plumbing Services",
      category: "Plumbing",
      location: "Johannesburg",
      rating: 4.9,
      reviews: 156,
      verified: true,
      startingPrice: "R350",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
    },
    {
      name: "Cape Town Electrical Experts",
      category: "Electrical",
      location: "Cape Town",
      rating: 4.8,
      reviews: 203,
      verified: true,
      startingPrice: "R450",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
    },
    {
      name: "Rainbow Painting Co",
      category: "Painting",
      location: "Durban",
      rating: 4.7,
      reviews: 89,
      verified: true,
      startingPrice: "R280",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop",
    },
    {
      name: "Green Thumb Gardens",
      category: "Garden Services",
      location: "Pretoria",
      rating: 5.0,
      reviews: 142,
      verified: true,
      startingPrice: "R320",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold">
            Top Rated
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Service Providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted professionals serving communities across South Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {provider.verified && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardContent className="p-5">
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {provider.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {provider.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{provider.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({provider.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting at</p>
                    <p className="text-lg font-bold text-primary">{provider.startingPrice}</p>
                  </div>
                  <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="hero" size="lg">
            View All Providers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
