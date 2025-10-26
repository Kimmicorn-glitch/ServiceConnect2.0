<<<<<<< HEAD
const Terms = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">These are placeholder terms. Replace with legal text before going live.</p>
        <section className="mt-4 text-muted-foreground">
          <p>Use of ServiceConnect is subject to these terms. By using the service you agree to them.</p>
        </section>
      </div>
=======
/**
 * TERMS OF SERVICE PAGE
 * Legal terms, privacy policy, and usage agreements
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Legal Information
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Terms of Service, Privacy Policy, and User Agreements
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Tabs defaultValue="terms" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="conduct">Code of Conduct</TabsTrigger>
            </TabsList>

            {/* Terms of Service */}
            <TabsContent value="terms">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Terms of Service</CardTitle>
                  <p className="text-sm text-muted-foreground">Last updated: October 25, 2025</p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6 text-sm text-muted-foreground">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">1. Acceptance of Terms</h3>
                        <p className="leading-relaxed mb-4">
                          By accessing and using ServiceConnect ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this Platform.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">2. Description of Service</h3>
                        <p className="leading-relaxed mb-4">
                          ServiceConnect is a platform that connects customers with service providers across South Africa. We facilitate connections but are not responsible for the actual services provided by independent contractors.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">3. User Accounts</h3>
                        <p className="leading-relaxed mb-4">
                          Users must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>You must provide accurate and complete information</li>
                          <li>You must keep your account information up to date</li>
                          <li>You are responsible for all activity on your account</li>
                          <li>You must not share your account with others</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">4. Service Provider Obligations</h3>
                        <p className="leading-relaxed mb-4">
                          Service providers must:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Provide accurate information about qualifications and services</li>
                          <li>Maintain all necessary licenses and insurance</li>
                          <li>Provide quality services in a professional manner</li>
                          <li>Honor quoted prices and agreed-upon terms</li>
                          <li>Comply with all applicable laws and regulations</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">5. Customer Obligations</h3>
                        <p className="leading-relaxed mb-4">
                          Customers must:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Provide accurate job descriptions and requirements</li>
                          <li>Respect service providers' time and expertise</li>
                          <li>Pay agreed-upon amounts in a timely manner</li>
                          <li>Provide a safe working environment</li>
                          <li>Leave honest reviews based on actual experiences</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">6. Payments and Fees</h3>
                        <p className="leading-relaxed mb-4">
                          Payment terms are agreed upon directly between customers and service providers. ServiceConnect charges service providers subscription fees as outlined in our pricing plans. All fees are non-refundable except as required by law.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">7. Dispute Resolution</h3>
                        <p className="leading-relaxed mb-4">
                          In case of disputes between users, we encourage resolution through direct communication. ServiceConnect may provide mediation services but is not obligated to resolve disputes and bears no liability for dispute outcomes.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">8. Limitation of Liability</h3>
                        <p className="leading-relaxed mb-4">
                          ServiceConnect is not liable for the quality, safety, or legality of services provided through the Platform. We do not guarantee the accuracy of user-provided information and are not responsible for damages arising from platform use.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">9. Termination</h3>
                        <p className="leading-relaxed mb-4">
                          We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or pose risks to other users. Users may terminate their accounts at any time through their account settings.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">10. Changes to Terms</h3>
                        <p className="leading-relaxed mb-4">
                          We reserve the right to modify these terms at any time. Continued use of the Platform after changes constitutes acceptance of the modified terms. Users will be notified of significant changes via email or platform notifications.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Policy */}
            <TabsContent value="privacy" id="privacy">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Privacy Policy</CardTitle>
                  <p className="text-sm text-muted-foreground">Last updated: October 25, 2025</p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6 text-sm text-muted-foreground">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">1. Information We Collect</h3>
                        <p className="leading-relaxed mb-4">
                          We collect information you provide directly, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Account information (name, email, phone number)</li>
                          <li>Profile information (bio, photos, qualifications)</li>
                          <li>Communication data (messages, reviews, feedback)</li>
                          <li>Payment information (processed securely by third parties)</li>
                          <li>Usage data (how you interact with the Platform)</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">2. How We Use Your Information</h3>
                        <p className="leading-relaxed mb-4">
                          Your information is used to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Provide and improve our services</li>
                          <li>Facilitate connections between users</li>
                          <li>Process payments and subscriptions</li>
                          <li>Send important notifications and updates</li>
                          <li>Prevent fraud and ensure platform security</li>
                          <li>Comply with legal obligations</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">3. Information Sharing</h3>
                        <p className="leading-relaxed mb-4">
                          We do not sell your personal information. We may share information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>With other users as necessary for service provision</li>
                          <li>With service providers who assist our operations</li>
                          <li>When required by law or to protect rights and safety</li>
                          <li>In connection with a business transfer or merger</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">4. Data Security</h3>
                        <p className="leading-relaxed mb-4">
                          We implement appropriate technical and organizational measures to protect your data. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">5. Your Rights</h3>
                        <p className="leading-relaxed mb-4">
                          Under South African law (POPIA), you have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Access your personal information</li>
                          <li>Correct inaccurate information</li>
                          <li>Request deletion of your information</li>
                          <li>Object to processing of your information</li>
                          <li>Withdraw consent at any time</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">6. Cookies and Tracking</h3>
                        <p className="leading-relaxed mb-4">
                          We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie preferences through your browser settings.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">7. Contact Us</h3>
                        <p className="leading-relaxed mb-4">
                          For privacy-related questions or requests, contact us at privacy@serviceconnect.co.za
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Code of Conduct */}
            <TabsContent value="conduct">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Code of Conduct</CardTitle>
                  <p className="text-sm text-muted-foreground">Community guidelines and expected behavior</p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-6 text-sm text-muted-foreground">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">1. Respectful Communication</h3>
                        <p className="leading-relaxed mb-4">
                          All users must communicate respectfully and professionally. Harassment, discrimination, or abusive language will not be tolerated.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">2. Honest Representation</h3>
                        <p className="leading-relaxed mb-4">
                          Provide accurate information about services, qualifications, and job requirements. Misrepresentation may result in account suspension.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">3. Prohibited Activities</h3>
                        <p className="leading-relaxed mb-4">
                          The following activities are strictly prohibited:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Fraudulent activity or scams</li>
                          <li>Impersonation of others</li>
                          <li>Spam or unsolicited advertising</li>
                          <li>Violation of laws or regulations</li>
                          <li>Circumventing platform fees or policies</li>
                          <li>Sharing inappropriate or illegal content</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">4. Reviews and Ratings</h3>
                        <p className="leading-relaxed mb-4">
                          Reviews must be honest, based on actual experiences, and free from conflicts of interest. Fake reviews or review manipulation will result in account termination.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">5. Reporting Violations</h3>
                        <p className="leading-relaxed mb-4">
                          If you encounter violations of this code, report them to our support team immediately. All reports are investigated confidentially.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">6. Consequences</h3>
                        <p className="leading-relaxed mb-4">
                          Violations may result in warnings, account suspension, or permanent termination depending on severity. We reserve the right to report illegal activities to authorities.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
>>>>>>> d07207af3b4a46d5577eda7a9e4c3de13fd2768e
    </div>
  );
};

export default Terms;
