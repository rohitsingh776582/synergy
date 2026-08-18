"use client";

import React from "react";

interface PUFTopPartProps {
  isReducedMotion?: boolean;
}

export default function PUFTopPart({ isReducedMotion = false }: PUFTopPartProps) {
  return (
    <div
      data-layer="part-top"
      className="absolute inset-0 z-40 transform-gpu transition-all"
      style={{
        transformStyle: "preserve-3d",
        transform: isReducedMotion ? "translateY(0px)" : "translateY(-130px)",
      }}
    >
      <svg
        viewBox="0 0 500 220"
        className="w-full h-full  overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blue Metallic Surface Gradient for Top Rib Faces */}
          <linearGradient id="blue-rib-main" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="85%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Darker Blue Gradient for Angled Slopes */}
          <linearGradient id="blue-slope-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Lighter Blue Gradient for Flat Top Ridges */}
          <linearGradient id="blue-ridge-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>

          {/* Front Edge Blue Gradient */}
          <linearGradient id="blue-front-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Surface Reflective Shine */}
          <linearGradient id="metal-shine-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* 1. TOP CORRUGATED SURFACE MESH (Trapezoidal Ribs) */}
        <g id="blue-top-mesh">
          {/* Valley 0 */}
          <polygon points="10,60 110,10 200,10 100,60" fill="url(#blue-rib-main)" />
          
          {/* Rib 1 */}
          <polygon points="100,60 200,10 220,0 120,50" fill="url(#blue-slope-dark)" />
          <polygon points="120,50 220,0 260,0 160,50" fill="url(#blue-ridge-light)" />
          <polygon points="160,50 260,0 280,10 180,60" fill="url(#blue-slope-dark)" />

          {/* Valley 1 */}
          <polygon points="180,60 280,10 330,10 230,60" fill="url(#blue-rib-main)" />

          {/* Rib 2 */}
          <polygon points="230,60 330,10 350,0 250,50" fill="url(#blue-slope-dark)" />
          <polygon points="250,50 350,0 390,0 290,50" fill="url(#blue-ridge-light)" />
          <polygon points="290,50 390,0 410,10 310,60" fill="url(#blue-slope-dark)" />

          {/* Valley 2 */}
          <polygon points="310,60 410,10 440,10 340,60" fill="url(#blue-rib-main)" />

          {/* Rib 3 */}
          <polygon points="340,60 440,10 460,0 360,50" fill="url(#blue-slope-dark)" />
          <polygon points="360,50 460,0 490,0 390,50" fill="url(#blue-ridge-light)" />
          <polygon points="390,50 490,0 500,10 400,60" fill="url(#blue-slope-dark)" />
        </g>

        {/* 2. FRONT THICKNESS CUT EDGE (Bottom at Y=66) */}
        <path
          d="M 10,60 L 100,60 L 120,50 L 160,50 L 180,60 L 230,60 L 250,50 L 290,50 L 310,60 L 340,60 L 360,50 L 390,50 L 400,60
             L 400,66 L 390,56 L 360,56 L 340,66 L 310,66 L 290,56 L 250,56 L 230,66 L 180,66 L 160,56 L 120,56 L 100,66 L 10,66 Z"
          fill="url(#blue-front-edge)"
          stroke="#1d4ed8"
          strokeWidth="0.8"
        />

        {/* 3. RIGHT SIDE PERSPECTIVE DEPTH FACE */}
        <polygon points="400,60 500,10 500,16 400,66" fill="#1e3a8a" />

        {/* 4. METALLIC SHINE HIGHLIGHT */}
        <polygon
          data-element="sheet-shine"
          points="10,60 110,10 160,10 60,60"
          fill="url(#metal-shine-sweep)"
          opacity="0"
        />
      </svg>
    </div>
  );
}
