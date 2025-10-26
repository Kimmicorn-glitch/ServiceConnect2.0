/**
 * CONTACT PAGE
 * Simple contact form that sends messages to the backend (or uses a mock in dev)
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        // If backend not available in dev, fall back to mock success
        if (import.meta.env.DEV) {
          toast({ title: "Message sent (mock)", description: "This is a simulated response in development." });
        } else {
          const text = await res.text();
          throw new Error(text || "Failed to send message");
        }
      } else {
        toast({ title: "Message sent", description: "We'll get back to you shortly." });
      }

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Contact form error:", err);
      toast({ title: "Error", description: "Unable to send message. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">ServiceConnect</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>Home</Button>
          </div>
        </div>
      </nav>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-6">Have a question or need help? Send us a message.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            <Textarea placeholder="Your message" value={message} onChange={(e) => setMessage(e.currentTarget.value)} />

            <div className="flex justify-between items-center">
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
              <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
