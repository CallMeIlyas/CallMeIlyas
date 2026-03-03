import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import { Experience } from "./components/section/Experience";
import { Project } from "./components/section/Project";
import NotFound from "./pages/NotFound";
import Navbar from "./components/nav/Navbar";
import { useScrollSmoother, refreshSmoothScroll } from "./hooks/useScrollSmoother"; // Import useScrollSmoother

const queryClient = new QueryClient();

// Smooth Scroll Manager - Gunakan useScrollSmoother hook
const ScrollManager = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { wrapperRef, contentRef } = useScrollSmoother(); // Gunakan hook

  useEffect(() => {
    // Refresh saat route berubah
    const timer = setTimeout(() => {
      refreshSmoothScroll();
      console.log("Scroll refreshed after route change");
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

// Main App
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Navbar di luar smoother */}
        <Navbar sections={["Home", "Profile", "Project", "Contact"]} />

        {/* Smooth scroll manager */}
        <ScrollManager>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollManager>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;