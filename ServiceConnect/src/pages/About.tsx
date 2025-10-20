/**
 * ABOUT PAGE
 * This page provides information about ServiceConnect platform
 * Explains what the service does and how it works
 */

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Users, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Navigation hook
  const navigate = useNavigate();

  // Features list - benefits of using ServiceConnect
  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers are thoroughly vetted and verified for your safety and peace of mind.",
    },
    {
      icon: Users,
      title: "Wide Network",
      description: "Access to thousands of skilled professionals across all major cities in South Africa.",
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "Read real reviews and ratings from previous customers to make informed decisions.",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get quotes and responses from multiple providers within hours, not days.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">ServiceConnect</h1>
          <Button 
            variant="secondary" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About ServiceConnect
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're connecting South Africans with trusted, verified service professionals 
              to make home and business maintenance simple, safe, and reliable.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ServiceConnect was created to solve a common problem: finding reliable, 
              trustworthy service providers shouldn't be difficult. We built a platform 
              where homeowners and businesses can easily connect with verified professionals 
              for any service need, from plumbing and electrical work to painting and 
              garden services.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
              Why Choose ServiceConnect?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loop through features and display them */}
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Feature Icon */}
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to find your perfect service provider?
            </h3>
            <Button 
              size="lg" 
              onClick={() => navigate("/")}
              className="text-lg px-8"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
