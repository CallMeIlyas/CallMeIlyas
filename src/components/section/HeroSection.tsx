"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["LEARNING", "THINKING", "EXPLORATION", "DISCOVERY"];

export default function HeroSection() {
  const textRef     = useRef<HTMLDivElement>(null);
  const textMobRef  = useRef<HTMLDivElement>(null);
  const wordRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const wordMobRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const smoother = (window as any).ScrollSmoother?.get?.();

    const init = setTimeout(() => {
      if (!textRef.current && !textMobRef.current) return;

      if (smoother) smoother.scrollTo(0, true);
      else window.scrollTo(0, 0);

      const spacing = 110;

      // Setup DESKTOP words
      wordRefs.current.forEach((word, index) => {
        if (word) {
          gsap.set(word, {
            yPercent: index * spacing,
            position: "absolute",
            top: 0, left: 0, width: "100%",
            willChange: "transform",
          });
        }
      });

      // Setup MOBILE words
      wordMobRefs.current.forEach((word, index) => {
        if (word) {
          gsap.set(word, {
            yPercent: index * spacing,
            position: "absolute",
            top: 0, left: 0, width: "100%",
            willChange: "transform",
          });
        }
      });

      const lastWordIndex = words.length - 1;

      // Animasi desktop
      gsap.to(wordRefs.current, {
        yPercent: (i) => i * spacing - lastWordIndex * spacing,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          scroller: smoother ? "#smooth-content" : undefined,
          start: "top top",
          end: "+=390",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animasi mobile — sama persis, hanya refs berbeda
      gsap.to(wordMobRefs.current, {
        yPercent: (i) => i * spacing - lastWordIndex * spacing,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          scroller: smoother ? "#smooth-content" : undefined,
          start: "top top",
          end: "+=390",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh(true);
      return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
    }, 150);

    return () => clearTimeout(init);
  }, []);

  return (
    <>
      {/* Logo */}
      <div
        onClick={() => window.location.reload()}
        className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center cursor-pointer select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-[1.1rem] md:text-[1.6rem] font-semibold tracking-tight text-center leading-none">
            M.ILYAS
          </h2>
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <section
        id="hero-section"
        className="hidden md:flex relative min-h-screen items-center justify-center bg-[#f7f6f4] px-4 text-[#343535]"
      >
        <div ref={textRef} className="relative z-10 text-center w-full px-8">
          <div className="font-bold">
            <div className="font-karlo-light text-[clamp(2.25rem,10vw,8.25rem)] leading-[0.82] tracking-[1px]">
              CURIOSITY
            </div>
            <div className="font-karlo-light text-[clamp(2.25rem,10vw,8.25rem)] leading-[0.82] tracking-[1px] mt-[1px]">
              SUSTAINS
            </div>
            <div className="relative -mt-4 overflow-hidden font-dm-serif text-[clamp(2.25rem,10vw,8.25rem)] leading-[0.85] tracking-[1px] h-[clamp(1rem,6.8vw,5.8rem)] pt-[0.25em] pb-[0.25em]">
              {words.map((word, index) => (
                <div
                  key={word}
                  ref={(el) => { wordRefs.current[index] = el; }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE LAYOUT ── */}
      <section
        className="flex md:hidden relative min-h-screen items-center justify-center bg-[#f7f6f4] px-6 text-[#343535]"
      >

        <div ref={textMobRef} className="relative z-10 text-center w-full">
          <div className="font-bold">
            <div className="font-karlo-light text-[clamp(3rem,13vw,7rem)] leading-[0.85] tracking-[1px]">
              CURIOSITY
            </div>
            <div className="font-karlo-light text-[clamp(3rem,13vw,7rem)] leading-[0.85] tracking-[1px] mt-[1px]">
              SUSTAINS
            </div>
            {/* Animated word — lebih tinggi container-nya di mobile */}
            <div className="relative -mt-2 overflow-hidden font-dm-serif text-[clamp(3rem,13vw,7rem)] leading-[0.85] tracking-[1px] h-[clamp(1.6rem,10vw,4.8rem)] pt-[0.2em] pb-[0.2em]">
              {words.map((word, index) => (
                <div
                  key={word}
                  ref={(el) => { wordMobRefs.current[index] = el; }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
