import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export const useScrollSmoother = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // Bersihkan smoother lama jika ada
    const existingSmoother = ScrollSmoother.get();
    if (existingSmoother) {
      existingSmoother.kill();
    }

    // Reset scroll
    window.scrollTo(0, 0);

    // Setup wrapper dan content
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    wrapper.style.height = "100vh";
    wrapper.style.overflow = "hidden";
    content.style.willChange = "transform";
    content.style.backfaceVisibility = "hidden";

    // FIX: Naikkan FPS dan matikan lag smoothing yang agresif
    gsap.ticker.fps(120);
    gsap.ticker.lagSmoothing(500, 16);

    // Buat smoother
    smootherRef.current = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 3.2,
      smoothTouch: 1.1,
      inertia: 1.25,
      speed: 0.85,
      normalizeScroll: false,
      ignoreMobileResize: true,
      effects: true,
      smoothTouchInertia: 1.05,
    });

    // Simpan ke window global untuk akses
    (window as any).gsapSmoother = smootherRef.current;

    // Refresh ScrollTrigger
    ScrollTrigger.refresh(true);

    // Cleanup
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      (window as any).gsapSmoother = null;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return { wrapperRef, contentRef };
};

// Helper function untuk mendapatkan smoother
export const getSmoother = () => {
  return (window as any).gsapSmoother || ScrollSmoother.get();
};

// Fungsi scroll ke element
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const smoother = getSmoother();

  if (smoother) {
    smoother.scrollTo(element, {
      duration: 1.5,
      ease: "power2.inOut",
    });
    return true;
  }
  return false;
};

// Refresh smooth scroll
export const refreshSmoothScroll = () => {
  const smoother = getSmoother();
  if (smoother) {
    smoother.refresh();
  }
  ScrollTrigger.refresh(true);
};