import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Provider {
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  startingPrice: string;
  image: string;
  description?: string;
}

const ProviderProfile = () => {
  const { name } = useParams<{ name: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);

  useEffect(() => {
    // fetch mock data from your local file or backend
    fetch("/mock-server/data/providers.json")
      .then((res) => res.json())
      .then((data: Provider[]) => {
        const decodedName = decodeURIComponent(name || "");
        const match = data.find(
          (p) =>
            p.name.replace(/\s+/g, "-").toLowerCase() === decodedName.toLowerCase()
        );
        setProvider(match || null);
      })
      .catch(() => setProvider(null));
  }, [name]);

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold mb-2">Provider not found</h2>
        <p className="text-muted-foreground mb-4">
          The profile you’re looking for doesn’t exist or has been removed.
        </p>
        <Link to="/providers">
          <Button variant="outline">Back to Providers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="overflow-hidden shadow-lg">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-64 object-cover"
        />
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{provider.name}</h1>
            {provider.verified && (
              <Badge className="bg-primary text-primary-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span>{provider.location}</span>
          </div>

          <Badge variant="outline" className="mb-4">
            {provider.category}
          </Badge>

          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span className="font-semibold text-lg">{provider.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({provider.reviews} reviews)
            </span>
          </div>

          <p className="text-muted-foreground mb-4">
            {provider.description || "No description available for this provider yet."}
          </p>

          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-sm text-muted-foreground">Starting at</p>
              <p className="text-xl font-bold text-primary">{provider.startingPrice}</p>
            </div>
            <Button variant="hero">Request Quote</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderProfile;
