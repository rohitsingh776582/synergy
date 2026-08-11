"use client";

import React from "react";
import PUFTopPart from "./PUFTopPart";
import PUFFoamCore from "./PUFFoamCore";
import PUFBottomPart from "./PUFBottomPart";

interface PUFPanelAnimationProps {
  isReducedMotion?: boolean;
}

export default function PUFPanelAnimation({ isReducedMotion = false }: PUFPanelAnimationProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto h-[300px] sm:h-[340px] flex items-center justify-center select-none perspective-[1200px] overflow-visible">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 rounded-3xl bg-radial from-blue-50/80 via-white to-transparent -z-10 opacity-70 pointer-events-none" />

      {/* 3D Isometric Canvas Frame matching reference image perspective */}
      <div
        className="relative w-full max-w-[420px] sm:max-w-[480px] h-[280px] sm:h-[320px] transform-gpu transition-transform duration-500 overflow-visible"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(20deg) rotateY(-16deg) rotateZ(2deg)",
        }}
      >
        {/* 1. BLUE TOP PART */}
        <PUFTopPart isReducedMotion={isReducedMotion} />

        {/* 2. YELLOW PU FOAM CORE */}
        <PUFFoamCore isReducedMotion={isReducedMotion} />

        {/* 3. BOTTOM SHEET */}
        <PUFBottomPart isReducedMotion={isReducedMotion} />
      </div>
    </div>
  );
}
