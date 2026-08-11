"use client";

import React from "react";

interface PUFBottomPartProps {
  isReducedMotion?: boolean;
}

export default function PUFBottomPart({ isReducedMotion = false }: PUFBottomPartProps) {
  return (
    <div
      data-layer="part-bottom"
      className="absolute inset-0 z-20 transform-gpu transition-all"
      style={{
        transformStyle: "preserve-3d",
        transform: isReducedMotion ? "translateY(0px)" : "translateY(130px)",
      }}
    >
      <svg
        viewBox="0 0 500 220"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Steel Liner Sheet Gradient */}
          <linearGradient id="steel-bottom-surface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Front Thickness Edge */}
          <linearGradient id="steel-bottom-front" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* 1. BOTTOM STEEL FACING SURFACE MESH (Top edge at Y=120) */}
        <polygon points="10,120 110,70 500,70 400,120" fill="url(#steel-bottom-surface)" stroke="#94a3b8" strokeWidth="0.5" />

        {/* Micro-ribbed profile deck lines */}
        <line x1="80,120" y1="180,70" x2="470,70" y2="370,120" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />
        <line x1="160,120" y1="260,70" x2="490,70" y2="390,120" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.6" />

        {/* 2. FRONT THICKNESS CUT EDGE (Y=120..128) */}
        <polygon points="10,120 400,120 400,128 10,128" fill="url(#steel-bottom-front)" stroke="#64748b" strokeWidth="0.5" />

        {/* 3. RIGHT SIDE PERSPECTIVE DEPTH FACE */}
        <polygon points="400,120 500,70 500,76 400,128" fill="#64748b" />
      </svg>
    </div>
  );
}
