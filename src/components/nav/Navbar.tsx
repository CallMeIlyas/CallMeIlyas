"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToElement, getSmoother } from "@/hooks/useScrollSmoother";

interface NavbarProps {
  sections: string[];
}

const SECTION_CONFIG: Record<string, string> = {
  home:    "hero-section",
  profile: "profile-section",
  project: "project-section",
  contact: "footer-section",
};

export default function Navbar({ sections }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const footer = document.getElementById("footer-section");
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => setHideNavbar(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    const smoother = getSmoother();
    if (smoother && el) {
      smoother.scrollTo(el, { duration: 1.5, ease: "power2.inOut" });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNav = (sectionKey: string) => {
    const targetId = SECTION_CONFIG[sectionKey] ?? sectionKey;
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollTo(targetId), 700);
    } else if (sectionKey === "home") {
      const smoother = getSmoother();
      smoother
        ? smoother.scrollTo(0, { duration: 1.5, ease: "power2.inOut" })
        : window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollTo(targetId);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={
        hideNavbar
          ? { opacity: 0, y: 20, pointerEvents: "none", scale: 0.8 }
          : { opacity: 1, y: 0, pointerEvents: "auto", scale: 1 }
      }
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="bg-card/90 backdrop-blur-lg rounded-full shadow-[0_8px_40px_-8px_rgba(0,0,0,0.3)] px-8 py-4 flex items-center justify-between gap-8 border border-border/40">

        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 font-display text-xl font-semibold hover:text-[#343535] transition-colors"
          aria-label="Reload page"
        >
          <span className="text-2xl">✺</span>
        </button>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleNav(section.toLowerCase())}
              className="relative text-sm font-medium text-foreground/80 hover:text-[#343535] transition-colors duration-300 group tracking-wide"
            >
              {section}
              {/* Underline warna tema, bukan orange */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#343535]/40 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Hamburger → X animasi */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 opacity-40 hover:opacity-100 transition-opacity"
          aria-label="Toggle menu"
        >
          {/* Strip atas — rotate 45° saat open */}
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="block w-6 h-0.5 bg-[#343535] rounded-sm origin-center"
          />
          {/* Strip tengah — menghilang saat open */}
          <motion.span
            animate={isMenuOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="block w-6 h-0.5 bg-[#343535] rounded-sm origin-center"
          />
          {/* Strip bawah — rotate -45° saat open */}
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="block w-6 h-0.5 bg-[#343535] rounded-sm origin-center"
          />
        </button>
      </div>

      {/* Dropdown mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-max bg-card/90 backdrop-blur-lg rounded-2xl shadow-2xl px-8 py-5 border border-border/40"
          >
            {/* List item di tengah */}
            <div className="flex flex-col items-center gap-5">
              {sections.map((section, i) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                  onClick={() => handleNav(section.toLowerCase())}
                  className="relative text-sm font-medium text-foreground/80 hover:text-[#343535] transition-colors duration-200 group"
                >
                  {section}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#343535]/40 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
