import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">ServiceConnect</h3>
            <p className="text-primary-foreground/80 mb-4">
              Connecting South Africans with trusted service providers nationwide.
            </p>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded bg-secondary" />
              <div className="w-8 h-8 rounded bg-accent" />
              <div className="w-8 h-8 rounded bg-primary-foreground/20" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
<<<<<<< HEAD
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary transition-colors">Browse Services</Link>
              </li>
              <li>
                <Link to="/providers" className="hover:text-secondary transition-colors">Become a Provider</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-secondary transition-colors">Admin</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
              </li>
=======
              <li><Link to="/how-it-works" className="hover:text-secondary transition-colors">How It Works</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Browse Services</Link></li>
              <li><Link to="/become-provider" className="hover:text-secondary transition-colors">Become a Provider</Link></li>
              <li><Link to="/pricing" className="hover:text-secondary transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog & Resources</Link></li>
>>>>>>> d07207af3b4a46d5577eda7a9e4c3de13fd2768e
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
<<<<<<< HEAD
              <li><Link to="/help" className="hover:text-secondary transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="hover:text-secondary transition-colors">Safety Tips</Link></li>
              <li><Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
=======
              <li><Link to="/support" className="hover:text-secondary transition-colors">Help Center</Link></li>
              <li><Link to="/support#safety" className="hover:text-secondary transition-colors">Safety Tips</Link></li>
              <li><Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
              <li><Link to="/terms#privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
>>>>>>> d07207af3b4a46d5577eda7a9e4c3de13fd2768e
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>123 Main Street, Johannesburg, 2000, South Africa</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <Link to="/contact" className="hover:text-secondary transition-colors">support@serviceconnect.co.za</Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+27 11 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80 text-sm">
          <p>&copy; {currentYear} ServiceConnect. All rights reserved. Proudly South African 🇿🇦</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
