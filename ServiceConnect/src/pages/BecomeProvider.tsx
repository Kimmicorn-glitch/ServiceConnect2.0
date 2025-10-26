/**
 * BECOME A PROVIDER PAGE
 * Information and application page for service providers
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Users, Shield, Award, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BecomeProvider = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Users,
      title: "Access to Customers",
      description: "Connect with thousands of potential clients across South Africa actively seeking your services.",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Expand your customer base and increase revenue with our powerful platform and marketing tools.",
    },
    {
      icon: Shield,
      title: "Trust & Credibility",
      description: "Build your reputation with verified reviews and ratings from satisfied customers.",
    },
    {
      icon: DollarSign,
      title: "Flexible Pricing",
      description: "Set your own rates and pricing structure. No hidden fees or commissions on your earnings.",
    },
    {
      icon: Award,
      title: "Professional Recognition",
      description: "Get recognized as a top-rated provider and earn featured placement on our platform.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Submit Application",
      description: "Fill out our simple application form with your business details and qualifications.",
    },
    {
      number: "2",
      title: "Verification Process",
      description: "Our team reviews your credentials and conducts necessary background checks.",
    },
    {
      number: "3",
      title: "Profile Setup",
      description: "Create your professional profile, showcase your work, and set your pricing.",
    },
    {
      number: "4",
      title: "Start Receiving Jobs",
      description: "Get matched with customers and start growing your business immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Become a Service Provider
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8">
              Join South Africa's fastest-growing platform for service professionals. 
              Grow your business and connect with customers who need your expertise.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate("/signup")}>
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Partner With ServiceConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-primary" />
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

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How to Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-primary/20 -z-10" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Provider Requirements
            </h2>
            <Card className="border-2">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {[
                    "Valid South African ID or work permit",
                    "Proof of relevant qualifications or certifications",
                    "Clean criminal record check",
                    "Professional liability insurance (for certain categories)",
                    "Minimum 2 years of experience in your field",
                    "Professional references",
                    "Commitment to quality service and customer satisfaction",
                  ].map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Network?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start your journey with ServiceConnect today and take your business to the next level.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Apply Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 border-white text-white hover:bg-white/20"
              onClick={() => navigate("/pricing")}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeProvider;
