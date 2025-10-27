import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const providers = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

export const FeaturedProviders = () => {
  const navigate = useNavigate();

  const handleViewProfile = (providerId: number) => {
    navigate(`/provider/${providerId}`);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <Badge variant="secondary" className="mb-3 text-sm font-semibold">
            Top Rated
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Featured Service Providers
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted professionals serving communities across South Africa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <Card
              key={provider.id}
              className="group relative overflow-hidden border-2 border-transparent rounded-xl transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 min-h-[420px] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {provider.verified && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground flex items-center gap-1 animate-badge-shimmer group-hover:animate-badge-shimmer-hover">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>

              {/* Card Content */}
              <CardContent className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg sm:text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{provider.category}</p>

                  <div className="flex items-center text-sm text-muted-foreground mb-2 gap-2">
                    <MapPin className="w-4 h-4" /> {provider.location}
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{provider.rating} ({provider.reviews})</span>
                  </div>
                </div>

                {/* Footer: Price + Button */}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-base sm:text-sm">{provider.startingPrice}</span>
                  <Button
                    size="sm"
                    className="px-3 py-1 sm:px-4 sm:py-2 transition-transform duration-300 group-hover:scale-105"
                    onClick={() => handleViewProfile(provider.id)}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes badge-shimmer {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-2px); opacity: 0.8; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .animate-badge-shimmer {
          animation: badge-shimmer 2s ease-in-out infinite;
        }

        .animate-badge-shimmer-hover {
          animation: badge-shimmer 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
