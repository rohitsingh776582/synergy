"use client";

import React from "react";

interface PUFBottomSheetProps {
  isReducedMotion?: boolean;
}

export default function PUFBottomSheet({ isReducedMotion = false }: PUFBottomSheetProps) {
  return (
    <div
      data-layer="sheet-bottom"
      className="absolute inset-x-0 top-36 sm:top-44 md:h-48 z-20 transform-gpu transition-all"
      style={{
        transformStyle: "preserve-3d",
        transform: isReducedMotion
          ? "translateY(0px) translateZ(0px)"
          : "translateY(140px) translateZ(-40px)",
      }}
    >
      <svg
        viewBox="0 0 500 180"
        className="w-full h-full  overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Steel Liner Sheet Surface Gradient */}
          <linearGradient id="bottom-steel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Front Thickness Edge Gradient */}
          <linearGradient id="bottom-edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* 1. BOTTOM STEEL FACING SURFACE MESH */}
        <polygon points="10,120 110,70 500,70 400,120" fill="url(#bottom-steel-gradient)" stroke="#94a3b8" strokeWidth="0.5" />

        {/* Micro-ribbed profile deck lines on bottom sheet */}
        <line x1="80,120" y1="180,70" x2="470,70" y2="370,120" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />
        <line x1="160,120" y1="260,70" x2="490,70" y2="390,120" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />

        {/* 2. FRONT THICKNESS CUT EDGE */}
        <polygon points="10,120 400,120 400,128 10,128" fill="url(#bottom-edge-gradient)" stroke="#64748b" strokeWidth="0.5" />

        {/* 3. RIGHT SIDE PERSPECTIVE DEPTH FACE */}
        <polygon points="400,120 500,70 500,76 400,128" fill="#64748b" />
      </svg>

      {/* Technical Spec Tag for Bottom Sheet */}
      <div className="absolute bottom-2 right-4 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded border border-slate-400/40">
        <span className="w-2 h-2 rounded-full bg-slate-400" />
        <span className="text-[10px] font-mono font-medium text-slate-200 uppercase tracking-wider">
          0.5mm Bottom Galvanized Steel Liner Sheet
        </span>
      </div>
    </div>
  );
}
