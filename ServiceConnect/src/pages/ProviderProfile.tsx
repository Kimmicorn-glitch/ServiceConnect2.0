import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Mock provider data (replace with API call in production)
const providerData = [
  {
    id: 1,
    name: "Thabo's Plumbing Services",
    bio: "Expert plumber with 10+ years of experience in residential and commercial plumbing. Licensed and certified.",
    skills: ["Pipe Installation", "Leak Repairs", "Drain Cleaning", "Water Heater Installation"],
  },
  {
    id: 2,
    name: "Cape Town Electrical Experts",
    bio: "Professional electricians specializing in safe electrical installations, maintenance, and troubleshooting.",
    skills: ["Wiring", "Lighting Installation", "Electrical Safety Checks", "Circuit Repairs"],
  },
  {
    id: 3,
    name: "Rainbow Painting Co",
    bio: "Creative painters delivering professional finishes for homes and offices.",
    skills: ["Interior Painting", "Exterior Painting", "Surface Preparation", "Color Consultation"],
  },
  {
    id: 4,
    name: "Green Thumb Gardens",
    bio: "Gardening and landscaping experts making your outdoor spaces beautiful and sustainable.",
    skills: ["Lawn Care", "Planting", "Garden Design", "Irrigation Systems"],
  },
];

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const provider = providerData.find((p) => p.id === Number(id));

  const [proposal, setProposal] = useState("");

  if (!provider) return <p className="text-center mt-10">Provider not found</p>;

  const handleSendProposal = () => {
    if (!proposal.trim()) {
      alert("Please enter a proposal message.");
      return;
    }
    alert(`Proposal sent to ${provider.name}: "${proposal}"`);
    setProposal("");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Provider Header */}
      <h1 className="text-3xl font-bold mb-4">{provider.name}</h1>
      <p className="text-muted-foreground mb-6">{provider.bio}</p>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc list-inside space-y-1">
          {provider.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Proposal Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Send Proposal</h2>
        <Textarea
          placeholder="Write your proposal message here..."
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          className="mb-3 w-full"
          rows={5}
        />
        <Button onClick={handleSendProposal}>Send Proposal</Button>
      </div>
    </div>
  );
};

export default ProviderProfile;
