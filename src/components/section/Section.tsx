"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import DotWaves from "@/components/DotWaves";

gsap.registerPlugin(ScrollTrigger);

interface FormulaItem {
  tex: string;
  label?: string;
}

interface SectionProps {
  id: string;
  videoSrc?: string;
  useDotWaves?: boolean;
  bgColor?: string;
  isFullScreen?: boolean;
  leftImage?: string;
  rightImage?: string;
  formulas?: FormulaItem[];
}

// Posisi tiap rumus: index 0 kiri, 1 kanan, 2 tengah
const FORMULA_POSITIONS = [
  { justify: "justify-start", pl: "pl-[12%]",  pr: "" },       // kiri, tidak mojok
  { justify: "justify-end",   pl: "",           pr: "pr-[12%]" }, // kanan, tidak mojok
  { justify: "justify-center", pl: "",          pr: "" },         // tengah
];

export default function Section({
  id,
  videoSrc,
  useDotWaves = false,
  bgColor = "bg-[#f7f6f4]",
  isFullScreen = false,
  leftImage,
  rightImage,
  formulas,
}: SectionProps) {
  // ── Desktop refs (tidak diubah) ──
  const leftImgRef  = useRef<HTMLImageElement | null>(null);
  const rightImgRef = useRef<HTMLImageElement | null>(null);

  // ── Mobile refs (terpisah) ──
  const leftImgMobRef  = useRef<HTMLImageElement | null>(null);
  const rightImgMobRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── Desktop parallax — tidak diubah sama sekali ──
        if (leftImgRef.current) {
          gsap.to(leftImgRef.current, {
            y: "-60vh",
            ease: "none",
            scrollTrigger: {
              trigger: `#${id}`,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
        if (rightImgRef.current) {
          gsap.to(rightImgRef.current, {
            y: "-25vh",
            ease: "none",
            scrollTrigger: {
              trigger: `#${id}`,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        // ── Mobile parallax — jarak diperkecil agar pas di layar kecil ──
        if (leftImgMobRef.current) {
          gsap.to(leftImgMobRef.current, {
            y: "-35vh",
            ease: "none",
            scrollTrigger: {
              trigger: `#${id}`,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
        if (rightImgMobRef.current) {
          gsap.to(rightImgMobRef.current, {
            y: "-10vh",
            ease: "none",
            scrollTrigger: {
              trigger: `#${id}`,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

      });
      ScrollTrigger.refresh();
      return () => ctx.revert();
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <section
      id={id}
      className={`relative w-full flex flex-col items-center justify-center ${bgColor} overflow-visible`}
      style={{
        paddingTop: "10vh",
        paddingBottom: leftImage || rightImage ? "40vh" : "10vh",
      }}
    >

      {/* ╔══════════════════════════════════════╗
          ║   DESKTOP LAYOUT — tidak diubah      ║
          ╚══════════════════════════════════════╝ */}

      {/* DotWaves desktop — absolute, bleeding ke Hero atas & Profile bawah */}
      {useDotWaves && isFullScreen && (
        <div
          className="hidden md:block absolute left-0 right-0 pointer-events-none"
          style={{
            zIndex: 0,
            top: "-30vh",       // bleeding ke Hero
            height: "260vh",    // cukup panjang ke Profile
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 50%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 50%, transparent 60%)",
          }}
        >
          <DotWaves
            backgroundColor="transparent"
            dotColor="rgba(52, 53, 53, 0.28)"
            dotRadius={1.5}
            waveSpeedX={0.035}
            waveSpeedY={0.025}
            waveAmpX={45}
            waveAmpY={25}
            friction={0.6}
            tension={0.01}
            maxCursorMove={120}
            xGap={22}
            yGap={22}
          />
        </div>
      )}

      <div
        className={`hidden md:block w-full ${isFullScreen ? "h-full" : "max-w-6xl"} overflow-hidden ${
          isFullScreen ? "" : "rounded-2xl shadow-xl"
        } relative`}
        style={
          isFullScreen
            ? { transform: "translateY(-34vh)", height: "100vh", maxHeight: "1400px" }
            : {}
        }
      >
        {useDotWaves ? null : videoSrc ? (
          <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}

        {/* Rumus — overlay di atas DotWaves, tersebar sesuai posisi */}
        {useDotWaves && formulas && formulas.length > 0 && (
          <div className="absolute inset-0 z-10 pointer-events-none px-4">
            {formulas.map((f, i) => {
              const topPos =
                i === 0 ? "9%"  // rumus kiri (pertama)
              : i === 1 ? "38%"  // rumus kanan (kedua)
              :           "65%"; // rumus tengah (ketiga)
              const pos = FORMULA_POSITIONS[i] ?? FORMULA_POSITIONS[2];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                  className={`absolute w-full flex ${pos.justify} pointer-events-auto`}
                  style={{ top: topPos, transform: "translateY(-50%)" }}
                >
                  <div className={`group flex flex-col items-center gap-1 ${pos.pl} ${pos.pr}`}>
                    <div
                      className="text-[#343535] opacity-20 group-hover:opacity-100 transition-opacity duration-500 select-none"
                      style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)" }}
                    >
                      <BlockMath math={f.tex} />
                    </div>
                    {f.label && (
                      <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[#343535] opacity-0 group-hover:opacity-95 transition-opacity duration-500">
                        {f.label}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop floating images */}
      {leftImage && (
        <img
          ref={leftImgRef}
          src={leftImage}
          alt="Left visual"
          className="hidden md:block absolute left-[11vw] bottom-[13vh] w-[32vw] max-w-[520px] object-cover rounded-2xl shadow-xl z-[20]"
        />
      )}
      {rightImage && (
        <img
          ref={rightImgRef}
          src={rightImage}
          alt="Right visual"
          className="hidden md:block absolute right-[8vw] bottom-[12vh] w-[22vw] max-w-[320px] object-cover rounded-2xl shadow-lg z-[20]"
        />
      )}

      {/* ╔══════════════════════════════════════╗
          ║   MOBILE LAYOUT — tanpa video        ║
          ╚══════════════════════════════════════╝ */}
      {/* Bagian video untuk mobile dihapus */}

      {/* Mobile floating images — ukuran & posisi lebih kecil */}
      {leftImage && (
        <img
          ref={leftImgMobRef}
          src={leftImage}
          alt="Left visual"
          className="block md:hidden absolute left-[4vw] bottom-[36vh] w-[52vw] max-w-[260px] object-cover rounded-xl shadow-xl z-[20]"
        />
      )}
      {rightImage && (
        <img
          ref={rightImgMobRef}
          src={rightImage}
          alt="Right visual"
          className="block md:hidden absolute right-[4vw] bottom-[16vh] w-[36vw] max-w-[180px] object-cover rounded-xl shadow-lg z-[20]"
        />
      )}

    </section>
  );
}