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
      image: "https://public.youware.com/users-website-assets/prod/17fc0c97-909b-4f5c-b745-073dccdf3310/d2fb6bf03f164216963c9e5e7af0e994.jpg",
    },
    {
      name: "Cape Town Electrical Experts",
      category: "Electrical",
      location: "Cape Town",
      rating: 4.8,
      reviews: 203,
      verified: true,
      startingPrice: "R450",
      image: "https://public.youware.com/users-website-assets/prod/17fc0c97-909b-4f5c-b745-073dccdf3310/f74c2e3c6606445a8fff2399156c5a4b.jpg",
    },
    {
      name: "Rainbow Painting Co",
      category: "Painting",
      location: "Durban",
      rating: 4.7,
      reviews: 89,
      verified: true,
      startingPrice: "R280",
      image: "https://public.youware.com/users-website-assets/prod/17fc0c97-909b-4f5c-b745-073dccdf3310/15ec2f0482b945d588b1a593856a0d34.jpg",
    },
    {
      name: "Green Thumb Gardens",
      category: "Garden Services",
      location: "Pretoria",
      rating: 5.0,
      reviews: 142,
      verified: true,
      startingPrice: "R320",
      image: "https://public.youware.com/users-website-assets/prod/17fc0c97-909b-4f5c-b745-073dccdf3310/2a14a529a2d648d2b2090078e366a9c4.png",
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
