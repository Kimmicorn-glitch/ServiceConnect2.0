const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <p className="text-muted-foreground mb-6">Effective date: October 26, 2025</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-muted-foreground">ServiceConnect (“we”, “us”, “the Platform”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and the rights you have under applicable law (including POPIA in South Africa).</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Account information: name, email address, phone number, and profile details you provide when creating an account.</li>
            <li>Service data: booking requests, messages, reviews, and provider responses necessary to facilitate connections between customers and providers.</li>
            <li>Payment and billing data: when payments are processed through third-party processors, we store transaction metadata but do not directly handle raw payment card numbers.</li>
            <li>Usage data: device information, IP address, browser type, and interactions with the Platform for analytics and security.</li>
            <li>Support and communications: content of messages you send to our support team or other users.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p className="text-muted-foreground">We use personal information to operate and improve the Platform, including:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>To provide and personalize the services you request.</li>
            <li>To communicate with you about bookings, updates, and support.</li>
            <li>To detect and prevent fraud and abuse.</li>
            <li>To comply with legal obligations and enforce our Terms of Service.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Sharing and Disclosure</h2>
          <p className="text-muted-foreground">We do not sell your personal information. We may share information with:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Service providers and partners who help us operate the Platform (e.g., hosting, analytics, payment processors).</li>
            <li>Other users when necessary to provide the service (e.g., sharing your contact details with a booked provider).</li>
            <li>Law enforcement, regulators, or other parties when required by law or to protect rights and safety.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Cookies and Tracking</h2>
          <p className="text-muted-foreground">We use cookies and similar technologies to remember preferences, provide secure logins, and analyze usage. You can control cookies through your browser settings. Third-party services integrated with the Platform may also set cookies subject to their policies.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Data Retention and Security</h2>
          <p className="text-muted-foreground">We retain personal data only as long as necessary to provide the service, comply with legal obligations, and resolve disputes. We implement reasonable technical and organizational measures to protect data, but no system is completely secure.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
          <p className="text-muted-foreground">Under POPIA and other applicable laws, you may have rights to:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Access personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion or restriction of processing in certain circumstances.</li>
            <li>Withdraw consent where processing is based on consent.</li>
          </ul>
          <p className="text-muted-foreground mt-2">To exercise these rights, contact privacy@serviceconnect.co.za.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Children</h2>
          <p className="text-muted-foreground">The Platform is not intended for children under 18. We do not knowingly collect information from children under 18.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Changes to this Policy</h2>
          <p className="text-muted-foreground">We may update this policy from time to time. Significant changes will be notified via the Platform or email.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
          <p className="text-muted-foreground">Questions or requests about this policy: privacy@serviceconnect.co.za</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
