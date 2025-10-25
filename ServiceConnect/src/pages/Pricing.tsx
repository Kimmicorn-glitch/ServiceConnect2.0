/**
 * PRICING PAGE
 * Pricing plans for service providers
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "R0",
      period: "Free Forever",
      description: "Perfect for getting started",
      features: [
        "Create basic profile",
        "Receive up to 5 job requests per month",
        "Standard customer support",
        "Basic analytics",
        "Profile listed in search results",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "R299",
      period: "per month",
      description: "For growing businesses",
      features: [
        "Enhanced profile with photos and videos",
        "Unlimited job requests",
        "Priority customer support",
        "Advanced analytics and insights",
        "Featured placement in search results",
        "Customer review management",
        "Monthly performance reports",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "R699",
      period: "per month",
      description: "For established businesses",
      features: [
        "Everything in Professional",
        "Premium badge on profile",
        "Top placement in search results",
        "Dedicated account manager",
        "Custom branding options",
        "API access for integrations",
        "Quarterly business reviews",
        "Marketing consultation",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const forCustomers = [
    "Browse services completely free",
    "Contact unlimited providers",
    "View verified reviews and ratings",
    "Get competitive quotes",
    "Secure messaging platform",
    "No platform fees or commissions",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include our core features 
            with no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border-2 relative ${
                  plan.popular ? "border-primary shadow-2xl scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => navigate("/signup")}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              For Customers
            </h2>
            <p className="text-lg text-muted-foreground">
              ServiceConnect is completely free for customers. Find and hire professionals 
              with no platform fees or hidden charges.
            </p>
          </div>
          <Card className="max-w-3xl mx-auto border-2">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forCustomers.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button size="lg" onClick={() => navigate("/services")}>
                  Browse Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect 
                  at the start of your next billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a contract or commitment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No, all our plans are month-to-month with no long-term contracts. You can 
                  cancel at any time.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, debit cards, and EFT payments. All 
                  transactions are processed securely.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of service providers already growing their businesses on ServiceConnect.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/become-provider")}>
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
