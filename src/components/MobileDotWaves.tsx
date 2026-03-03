"use client";
import React, { useRef } from "react";
import DotWaves from "@/components/DotWaves";

/**
 * Satu instance DotWaves khusus mobile.
 * Menggunakan position:absolute + pointer-events:none
 * sehingga tidak mempengaruhi layout Hero maupun Section sama sekali.
 * Ditempatkan di Index antara HeroSection dan Section.
 */
export default function MobileDotWaves() {
  return (
    <div className="block md:hidden relative w-full" style={{ height: 0 }}>
      <div
        className="absolute left-0 right-0 pointer-events-none z-[1]"
        style={{
          top: "-40vh",      // naik ke dalam Hero (bawah DISCOVERY)
          height: "90vh",   // diperpanjang sampai ke Profile
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
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
    </div>
  );
}
