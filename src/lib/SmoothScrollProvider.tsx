"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        gsap.ticker.fps(120);
        gsap.ticker.lagSmoothing(500, 16);

        // Buat smoother
        smootherRef.current = ScrollSmoother.create({
          wrapper: wrapperRef.current!,
          content: contentRef.current!,
          smooth: isDesktop ? 4.5 : 0,   // Nilai asli dipertahankan
          smoothTouch: false,
          inertia: isDesktop ? 1.25 : 1.0, // Nilai asli dipertahankan
          speed: 1,
          // FIX: normalizeScroll dimatikan — penyebab utama scroll mouse nyendat
          normalizeScroll: false,
          ignoreMobileResize: true,
          effects: true,
          onUpdate: () => {
            ScrollTrigger.update();
          },
        });

        ScrollTrigger.refresh(true);

        const handleTransitionDone = () => {
          setTimeout(() => {
            smootherRef.current?.refresh();
            smootherRef.current?.scrollTo(0, false);
          }, 100);
        };

        window.addEventListener("pageTransition:done", handleTransitionDone);

        return () => {
          window.removeEventListener("pageTransition:done", handleTransitionDone);
          if (smootherRef.current) {
            smootherRef.current.kill();
            smootherRef.current = null;
          }
          context.revert();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollProvider;
