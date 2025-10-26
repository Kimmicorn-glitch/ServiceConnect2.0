const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="mb-4 text-muted-foreground">Find answers to common questions about using ServiceConnect.</p>
        <section className="space-y-4">
          <div>
            <h3 className="font-semibold">How do I book a provider?</h3>
            <p className="text-muted-foreground">Browse services, pick a provider, and contact them directly or request a quote.</p>
          </div>
          <div>
            <h3 className="font-semibold">How are providers verified?</h3>
            <p className="text-muted-foreground">Providers are vetted via document checks and reviews before they are marked verified.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;
