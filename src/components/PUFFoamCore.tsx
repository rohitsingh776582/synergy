"use client";

import React from "react";

interface PUFFoamCoreProps {
  isReducedMotion?: boolean;
}

export default function PUFFoamCore({ isReducedMotion = false }: PUFFoamCoreProps) {
  return (
    <div
      data-layer="puf-core"
      className="absolute inset-0 z-30 transform-gpu transition-all"
      style={{
        transformStyle: "preserve-3d",
        transform: isReducedMotion ? "translateY(0px)" : "translateY(0px)",
      }}
    >
      <svg
        viewBox="0 0 500 220"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Porous Foam Cell Texture */}
          <pattern id="foam-texture-cells" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="#ca8a04" opacity="0.4" />
            <circle cx="11" cy="9" r="1.8" fill="#a16207" opacity="0.35" />
            <circle cx="6" cy="13" r="1.2" fill="#eab308" opacity="0.4" />
            <circle cx="14" cy="4" r="1" fill="#854d0e" opacity="0.3" />
          </pattern>

          {/* Yellow Foam Front Face Gradient */}
          <linearGradient id="foam-face-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#fde047" />
            <stop offset="85%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Yellow Foam Top Surface Contour Gradient */}
          <linearGradient id="foam-top-surface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* 3D Side Depth Foam Gradient */}
          <linearGradient id="foam-depth-side" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
        </defs>

        {/* 1. TOP CONTOURED SURFACE MESH FITTING BLUE RIBS */}
        <g id="foam-top-mesh">
          <polygon points="10,60 110,10 200,10 100,60" fill="url(#foam-top-surface)" />
          <polygon points="100,60 200,10 220,0 120,50" fill="#fde047" opacity="0.85" />
          <polygon points="120,50 220,0 260,0 160,50" fill="#fef08a" />
          <polygon points="160,50 260,0 280,10 180,60" fill="#eab308" opacity="0.9" />
          <polygon points="180,60 280,10 330,10 230,60" fill="url(#foam-top-surface)" />
          <polygon points="230,60 330,10 350,0 250,50" fill="#fde047" opacity="0.85" />
          <polygon points="250,50 350,0 390,0 290,50" fill="#fef08a" />
          <polygon points="290,50 390,0 410,10 310,60" fill="#eab308" opacity="0.9" />
          <polygon points="310,60 410,10 440,10 340,60" fill="url(#foam-top-surface)" />
          <polygon points="340,60 440,10 460,0 360,50" fill="#fde047" opacity="0.85" />
          <polygon points="360,50 460,0 490,0 390,50" fill="#fef08a" />
          <polygon points="390,50 490,0 500,10 400,60" fill="#eab308" opacity="0.9" />
        </g>

        {/* 2. FRONT CUTAWAY FOAM FACE (Starts top contour Y=60, Bottom flat Y=120) */}
        <path
          d="M 10,60 L 100,60 L 120,50 L 160,50 L 180,60 L 230,60 L 250,50 L 290,50 L 310,60 L 340,60 L 360,50 L 390,50 L 400,60
             L 400,120 L 10,120 Z"
          fill="url(#foam-face-gradient)"
          stroke="#ca8a04"
          strokeWidth="0.8"
        />

        {/* Texture Overlay */}
        <path
          d="M 10,60 L 100,60 L 120,50 L 160,50 L 180,60 L 230,60 L 250,50 L 290,50 L 310,60 L 340,60 L 360,50 L 390,50 L 400,60
             L 400,120 L 10,120 Z"
          fill="url(#foam-texture-cells)"
        />

        {/* 3. RIGHT SIDE PERSPECTIVE DEPTH FACE (Y=60..120 extending back) */}
        <polygon points="400,60 500,10 500,70 400,120" fill="url(#foam-depth-side)" />
      </svg>
    </div>
  );
}
