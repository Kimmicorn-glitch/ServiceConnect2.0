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
import Index from "./pages/Index";
import Services from "./pages/Services";
import Providers from "./pages/Providers";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

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
          
          {/* Catch-all route - shows 404 page for any unmatched URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
