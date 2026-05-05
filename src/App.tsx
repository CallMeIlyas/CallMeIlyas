import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/nav/Navbar";
import ConnectingLoader from "./components/loading/Loading";
import { useScrollSmoother, refreshSmoothScroll } from "./hooks/useScrollSmoother";

const queryClient = new QueryClient();

// Smooth Scroll Manager - Gunakan useScrollSmoother hook
const ScrollManager = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { wrapperRef, contentRef } = useScrollSmoother();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      refreshSmoothScroll();
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

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imagesToLoad = [
      "images/profile-photo.jpg",
      "images/left-img.jpg",
      "images/right-img.jpg"
    ];

    let imagesLoaded = false;
    let timerFinished = false;

    const checkFinished = () => {
      if (imagesLoaded && timerFinished) {
        setIsLoading(false);
      }
    };

    // 1. Min 5 second timer
    const timer = setTimeout(() => {
      timerFinished = true;
      checkFinished();
    }, 5000);

    // 2. Image preloader
    let loadedCount = 0;
    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          imagesLoaded = true;
          checkFinished();
        }
      };
      img.onload = onImageLoad;
      img.onerror = onImageLoad; // Continue even if an image fails
      
      // Handle cached images
      if (img.complete) {
        onImageLoad();
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[9999]"
            >
              <ConnectingLoader />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BrowserRouter>
                <Navbar sections={["Home", "Profile", "Project", "Contact"]} />
                <ScrollManager>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ScrollManager>
              </BrowserRouter>
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;