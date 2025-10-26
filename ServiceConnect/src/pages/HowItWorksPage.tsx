/**
 * HOW IT WORKS PAGE
 * Standalone page explaining the platform's process
 */

import { Search, MessageSquare, CheckCircle, Shield, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HowItWorksPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "Search for Services",
      description: "Browse categories or search for specific services in your area across South Africa. Use our advanced filters to find exactly what you need.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: MessageSquare,
      title: "Compare & Connect",
      description: "View detailed provider profiles, ratings, and transparent pricing in ZAR. Contact multiple providers and ask questions before making your decision.",
      color: "bg-secondary/10 text-secondary-foreground",
    },
    {
      icon: CheckCircle,
      title: "Get it Done",
      description: "Hire the right professional for your job. Track progress, provide feedback, and rate your experience to help others in the community.",
      color: "bg-green-100 text-green-700",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers undergo thorough verification and background checks.",
    },
    {
      icon: Star,
      title: "Transparent Ratings",
      description: "Real reviews from real customers help you make informed decisions.",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get responses from providers within hours, not days.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            How ServiceConnect Works
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Three simple steps to connect with trusted professionals and get your job done right.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 -z-10" />
                  )}

                  <div className="flex flex-col items-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${step.color} mb-6 shadow-lg`}>
                      <Icon className="h-12 w-12" />
                    </div>
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose ServiceConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of South Africans who trust ServiceConnect to find quality service providers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate("/signup")}>
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" onClick={() => navigate("/services")}>
              Browse Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
