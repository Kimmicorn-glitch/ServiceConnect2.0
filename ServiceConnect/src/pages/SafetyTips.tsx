const SafetyTips = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Safety Tips</h1>
        <p className="mb-4 text-muted-foreground">Keeping you safe when hiring a provider.</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Always meet in a public place for initial meetings when possible.</li>
          <li>Verify the provider's identity and reviews.</li>
          <li>Never pay the full amount upfront for a large job; arrange milestones.</li>
        </ul>
      </div>
    </div>
  );
};

export default SafetyTips;
