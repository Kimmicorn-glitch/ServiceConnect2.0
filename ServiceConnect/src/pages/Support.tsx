/**
 * SUPPORT PAGE
 * Help center with FAQ and contact form
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Mail, Phone, MessageSquare, Shield } from "lucide-react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log("Support request:", formData);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top right corner and fill in your details. You can create either a customer or provider account depending on your needs.",
    },
    {
      question: "Is ServiceConnect free to use?",
      answer: "For customers, ServiceConnect is completely free. Service providers can start with a free Basic plan or upgrade to paid plans for additional features and benefits.",
    },
    {
      question: "How are service providers verified?",
      answer: "All service providers undergo a thorough verification process including ID verification, qualification checks, and background screening. Verified providers display a 'Verified' badge on their profiles.",
    },
    {
      question: "How do I contact a service provider?",
      answer: "Browse the available providers, view their profiles, and click the 'Contact' button to send them a message directly through our secure messaging platform.",
    },
    {
      question: "What if I'm not satisfied with a service?",
      answer: "If you're not satisfied, first try to resolve the issue directly with the provider. If that doesn't work, contact our support team, and we'll help mediate the situation.",
    },
    {
      question: "How do payments work?",
      answer: "Payment terms are agreed upon directly between customers and service providers. We recommend discussing payment schedules before work begins and keeping all communication on our platform.",
    },
    {
      question: "Can I cancel a booking?",
      answer: "Yes, you can cancel a booking through your dashboard. Please review our cancellation policy and notify the provider as soon as possible to avoid any cancellation fees.",
    },
    {
      question: "How do I become a service provider?",
      answer: "Visit the 'Become a Provider' page, complete the application form, and submit the required documentation. Our team will review your application within 2-3 business days.",
    },
  ];

  const safetyTips = [
    "Always verify provider credentials and reviews before hiring",
    "Communicate through our platform to maintain transaction records",
    "Get written quotes before work begins",
    "Discuss payment terms and schedules upfront",
    "Report any suspicious activity to our support team immediately",
    "Keep proof of payments and work completed",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            How Can We Help?
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Mail className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-lg">Email Support</CardTitle>
                <CardDescription>support@serviceconnect.co.za</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Phone className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-lg">Phone Support</CardTitle>
                <CardDescription>+27 11 123 4567</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <MessageSquare className="h-10 w-10 text-primary mx-auto mb-3" />
                <CardTitle className="text-lg">Live Chat</CardTitle>
                <CardDescription>Available 9AM - 6PM</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" id="faq">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions about ServiceConnect
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-20 bg-white" id="safety">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Safety Tips
              </h2>
              <p className="text-muted-foreground">
                Stay safe while using our platform
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {safetyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Badge className="mt-1 flex-shrink-0">{index + 1}</Badge>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Get in touch with our support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question in detail..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
