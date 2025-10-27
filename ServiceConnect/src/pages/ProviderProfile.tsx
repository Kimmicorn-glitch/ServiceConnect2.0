import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const providerData = [
  // same data as FeaturedProviders, or fetch from backend
  { id: 1, name: "Thabo's Plumbing Services", description: "Expert plumbing in Johannesburg" },
  { id: 2, name: "Cape Town Electrical Experts", description: "Certified electricians" },
  { id: 3, name: "Rainbow Painting Co", description: "Professional painting services" },
  { id: 4, name: "Green Thumb Gardens", description: "Gardening & landscaping" },
];

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const provider = providerData.find((p) => p.id === Number(id));

  if (!provider) return <p>Provider not found</p>;

  const handleSendProposal = () => {
    alert(`Proposal sent to ${provider.name}!`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{provider.name}</h1>
      <p className="mb-6">{provider.description}</p>
      <Button onClick={handleSendProposal}>Send Proposal</Button>
    </div>
  );
};

export default ProviderProfile;
