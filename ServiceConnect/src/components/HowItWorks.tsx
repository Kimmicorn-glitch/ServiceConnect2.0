import { Search, MessageSquare, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search for Services",
      description: "Browse categories or search for specific services in your area across South Africa",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: MessageSquare,
      title: "Compare & Connect",
      description: "View provider profiles, ratings, and pricing in ZAR. Contact multiple providers",
      color: "bg-secondary/10 text-secondary-foreground",
    },
    {
      icon: CheckCircle,
      title: "Get it Done",
      description: "Hire the right professional and get your job completed to satisfaction",
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How ServiceConnect Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to find and hire the best service providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 -z-10" />
                )}

                <div className="flex flex-col items-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${step.color} mb-4 shadow-lg`}>
                    <Icon className="h-10 w-10" />
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
