"use client";

import React from "react";

interface PUFTopSheetProps {
  isReducedMotion?: boolean;
}

export default function PUFTopSheet({ isReducedMotion = false }: PUFTopSheetProps) {
  return (
    <div
      data-layer="sheet-top"
      className="absolute inset-x-0 top-0 h-36 sm:h-44 md:h-48 z-40 transform-gpu transition-all"
      style={{
        transformStyle: "preserve-3d",
        transform: isReducedMotion
          ? "translateY(0px) translateZ(0px)"
          : "translateY(-140px) translateZ(60px)",
      }}
    >
      {/* 3D Profiled Blue Metal Top Sheet SVG */}
      <svg
        viewBox="0 0 500 200"
        className="w-full h-full  overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Blue Surface Gradient for Top Rib Faces */}
          <linearGradient id="top-rib-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="80%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Darker Blue Gradient for Angled Rib Slopes */}
          <linearGradient id="slope-dark-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Lighter Blue Gradient for Flat Top Ridges */}
          <linearGradient id="ridge-light-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          {/* Front Thickness Edge Cut Metallic Blue */}
          <linearGradient id="front-edge-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Metallic Gloss Reflection Sweep */}
          <linearGradient id="shine-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* 1. TOP SURFACE CORRUGATED SHEETING PROFILE WITH 4 TRAPEZOIDAL RIBS */}
        {/* Rib 1, Rib 2, Rib 3, Rib 4 across width */}
        <g id="top-sheet-surface">
          {/* Main Top Face Polygon Mesh (Flat valleys and raised ridges) */}
          {/* Valley 0 */}
          <polygon points="10,60 110,10 200,10 100,60" fill="url(#top-rib-gradient)" opacity="0.9" />
          
          {/* Rib 1 (Slope Left, Top Ridge, Slope Right) */}
          <polygon points="100,60 200,10 220,0 120,50" fill="url(#slope-dark-gradient)" />
          <polygon points="120,50 220,0 260,0 160,50" fill="url(#ridge-light-gradient)" />
          <polygon points="160,50 260,0 280,10 180,60" fill="url(#slope-dark-gradient)" />

          {/* Valley 1 */}
          <polygon points="180,60 280,10 330,10 230,60" fill="url(#top-rib-gradient)" opacity="0.9" />

          {/* Rib 2 */}
          <polygon points="230,60 330,10 350,0 250,50" fill="url(#slope-dark-gradient)" />
          <polygon points="250,50 350,0 390,0 290,50" fill="url(#ridge-light-gradient)" />
          <polygon points="290,50 390,0 410,10 310,60" fill="url(#slope-dark-gradient)" />

          {/* Valley 2 */}
          <polygon points="310,60 410,10 440,10 340,60" fill="url(#top-rib-gradient)" opacity="0.9" />

          {/* Rib 3 */}
          <polygon points="340,60 440,10 460,0 360,50" fill="url(#slope-dark-gradient)" />
          <polygon points="360,50 460,0 490,0 390,50" fill="url(#ridge-light-gradient)" />
          <polygon points="390,50 490,0 500,10 400,60" fill="url(#slope-dark-gradient)" />
        </g>

        {/* 2. FRONT THICKNESS PROFILE CONTOUR CUT */}
        <path
          d="M 10,60 L 100,60 L 120,50 L 160,50 L 180,60 L 230,60 L 250,50 L 290,50 L 310,60 L 340,60 L 360,50 L 390,50 L 400,60 
             L 400,66 L 390,56 L 360,56 L 340,66 L 310,66 L 290,56 L 250,56 L 230,66 L 180,66 L 160,56 L 120,56 L 100,66 L 10,66 Z"
          fill="url(#front-edge-blue)"
          stroke="#1d4ed8"
          strokeWidth="1"
        />

        {/* 3. RIGHT SIDE PERSPECTIVE DEPTH EXTENSION FACE */}
        <polygon points="400,60 500,10 500,16 400,66" fill="#1e3a8a" />

        {/* 4. METALLIC SURFACE HIGHLIGHT SWEEP (GSAP Animated element) */}
        <polygon
          data-element="sheet-shine"
          points="10,60 110,10 160,10 60,60"
          fill="url(#shine-sweep)"
          opacity="0"
        />
      </svg>

      {/* Technical Spec Tag */}
      <div className="absolute top-2 left-4 flex items-center gap-1.5 bg-blue-900/90 backdrop-blur-xs px-2.5 py-1 rounded border border-blue-400/40 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        <span className="text-[10px] font-mono font-medium text-sky-200 uppercase tracking-wider">
          0.5mm Blue Corrugated PPGI Top Sheet
        </span>
      </div>
    </div>
  );
}
