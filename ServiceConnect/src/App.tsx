/**
 * APP.TSX - Main Application Entry Point
 * This is the root component of the entire app
 * It sets up routing (navigation between pages) and provides global features
 */

// Import UI components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import React Query for data fetching (future use)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import React Router for page navigation
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all page components
<<<<<<< HEAD
import Index from "./pages/Index";
import Services from "./pages/Services";
import Providers from "./pages/Providers";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import SafetyTips from "./pages/SafetyTips";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
=======
import Index from "@/pages/Index";
import Services from "@/pages/Services";
import Providers from "@/pages/Providers";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/SignUp";
import Admin from "@/pages/Admin";
import HowItWorksPage from "@/pages/HowItWorksPage";
import BecomeProvider from "@/pages/BecomeProvider";
import Pricing from "@/pages/Pricing";
import Blog from "@/pages/Blog";
import Support from "@/pages/Support";
import Terms from "@/pages/Terms";
>>>>>>> d07207af3b4a46d5577eda7a9e4c3de13fd2768e

// Create a client for React Query (handles data caching)
const queryClient = new QueryClient();

/**
 * Main App Component
 * This wraps the entire application and provides:
 * - QueryClient: For data fetching and caching
 * - TooltipProvider: For showing tooltips across the app
 * - Toaster: For showing notification messages
 * - BrowserRouter: For URL-based page navigation
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Define all routes - each Route connects a URL path to a page component */}
          <Route path="/" element={<Index />} /> {/* Home page */}
          <Route path="/services" element={<Services />} /> {/* Services listing */}
          <Route path="/providers" element={<Providers />} /> {/* Provider profiles */}
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/contact" element={<Contact />} /> {/* Contact page */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} /> {/* Admin dashboard */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/safety" element={<SafetyTips />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* New pages */}
          <Route path="/signup" element={<SignUp />} /> {/* Sign up page */}
          <Route path="/login" element={<SignUp />} /> {/* Login page (reuses SignUp for now) */}
          <Route path="/admin" element={<Admin />} /> {/* Admin dashboard */}
          <Route path="/how-it-works" element={<HowItWorksPage />} /> {/* How it works standalone page */}
          <Route path="/become-provider" element={<BecomeProvider />} /> {/* Become a provider */}
          <Route path="/pricing" element={<Pricing />} /> {/* Pricing plans */}
          <Route path="/blog" element={<Blog />} /> {/* Blog and resources */}
          <Route path="/support" element={<Support />} /> {/* Support and FAQ */}
          <Route path="/terms" element={<Terms />} /> {/* Terms of service and privacy */}
          
          {/* Catch-all route - shows 404 page for any unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
