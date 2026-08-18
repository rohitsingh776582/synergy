"use client";

import React, { useState } from "react";

export interface CircuitCardProps {
  badge: string;
  title: string;
  description: string;
  href?: string;
  variant?: 1 | 2 | 3;
  className?: string;
}

export default function CircuitCard({
  badge,
  title,
  description,
  href = "#",
  variant = 1,
  className = "",
}: CircuitCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full h-[380px] sm:h-[420px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden cursor-pointer bg-gradient-to-br from-[#061142] via-[#0a1a5c] to-[#1a3688] border border-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:border-blue-400/50  hover:shadow-blue-600/25 ${className}`}
    >
      {/* Self-contained CSS Animation styles */}
      <style jsx>{`
        @keyframes circuitDash {
          0% {
            stroke-dashoffset: 240;
          }
          100% {
            stroke-dashoffset: -240;
          }
        }
        @keyframes chipGlow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 4px #3b82f6);
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 12px #60a5fa);
          }
        }
        .animate-dash-1 {
          animation: circuitDash 3.5s linear infinite;
        }
        .animate-dash-2 {
          animation: circuitDash 4.8s linear infinite reverse;
        }
        .animate-dash-3 {
          animation: circuitDash 3.0s linear infinite;
        }
        .animate-chip-glow {
          animation: chipGlow 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Radial Gradient Background Accent */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-40"
        }`}
      />

      {/* PCB Circuit Board SVG Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow Filter */}
            <filter id={`glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Chip Gradient */}
            <linearGradient id={`chip-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* VARIANT 1: Center Chip with Symmetric Branching Traces */}
          {variant === 1 && (
            <g>
              {/* Static PCB Trace Lines */}
              <g
                stroke="rgba(191, 219, 254, 0.2)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Center to Top */}
                <path d="M 200 230 L 200 130 L 140 130 L 140 60" />
                <path d="M 200 230 L 200 110 L 260 110 L 260 50" />
                {/* Center to Right */}
                <path d="M 220 250 L 310 250 L 310 320 L 360 320" />
                <path d="M 220 260 L 290 260 L 290 380 L 350 380" />
                {/* Center to Bottom */}
                <path d="M 200 270 L 200 370 L 150 370 L 150 440" />
                <path d="M 190 270 L 190 390 L 240 390 L 240 460" />
                {/* Center to Left */}
                <path d="M 180 250 L 90 250 L 90 180 L 40 180" />
                <path d="M 180 260 L 110 260 L 110 340 L 50 340" />
              </g>

              {/* Animated Glowing Pulses */}
              <g
                stroke="#60a5fa"
                strokeWidth="2"
                filter={`url(#glow-${variant})`}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M 200 230 L 200 130 L 140 130 L 140 60"
                  className="animate-dash-1"
                  strokeDasharray="20 160"
                />
                <path
                  d="M 220 250 L 310 250 L 310 320 L 360 320"
                  className="animate-dash-2"
                  strokeDasharray="25 180"
                />
                <path
                  d="M 180 250 L 90 250 L 90 180 L 40 180"
                  className="animate-dash-3"
                  strokeDasharray="18 140"
                />
                <path
                  d="M 200 270 L 200 370 L 150 370 L 150 440"
                  className="animate-dash-1"
                  strokeDasharray="22 170"
                />
              </g>

              {/* Terminal Connection Nodes / Dots */}
              <g fill="#93c5fd">
                <circle cx="140" cy="60" r="3" />
                <circle cx="260" cy="50" r="3" />
                <circle cx="360" cy="320" r="3" />
                <circle cx="350" cy="380" r="3" />
                <circle cx="150" cy="440" r="3" />
                <circle cx="240" cy="460" r="3" />
                <circle cx="40" cy="180" r="3" />
                <circle cx="50" cy="340" r="3" />
              </g>

              {/* Central Microchip (CPU Die) */}
              <g className="animate-chip-glow">
                <rect
                  x="175"
                  y="225"
                  width="50"
                  height="50"
                  rx="8"
                  fill={`url(#chip-grad-${variant})`}
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                />
                <rect
                  x="187"
                  y="237"
                  width="26"
                  height="26"
                  rx="4"
                  fill="#1d4ed8"
                  fillOpacity="0.4"
                  stroke="#93c5fd"
                  strokeWidth="1"
                />
                {/* Chip Pin Markers */}
                <circle cx="170" cy="235" r="1.5" fill="#93c5fd" />
                <circle cx="170" cy="250" r="1.5" fill="#93c5fd" />
                <circle cx="170" cy="265" r="1.5" fill="#93c5fd" />
                <circle cx="230" cy="235" r="1.5" fill="#93c5fd" />
                <circle cx="230" cy="250" r="1.5" fill="#93c5fd" />
                <circle cx="230" cy="265" r="1.5" fill="#93c5fd" />
              </g>
            </g>
          )}

          {/* VARIANT 2: Off-Center Top-Right Chip Matrix */}
          {variant === 2 && (
            <g>
              {/* Static PCB Trace Lines */}
              <g
                stroke="rgba(191, 219, 254, 0.2)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 270 170 L 160 170 L 160 250 L 80 250 L 80 320" />
                <path d="M 280 190 L 280 300 L 200 300 L 200 420" />
                <path d="M 260 190 L 260 340 L 320 340 L 320 450" />
                <path d="M 250 170 L 250 100 L 120 100 L 120 40" />
                <path d="M 310 170 L 370 170 L 370 260" />
              </g>

              {/* Animated Glowing Pulses */}
              <g
                stroke="#38bdf8"
                strokeWidth="2"
                filter={`url(#glow-${variant})`}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M 270 170 L 160 170 L 160 250 L 80 250 L 80 320"
                  className="animate-dash-2"
                  strokeDasharray="22 180"
                />
                <path
                  d="M 280 190 L 280 300 L 200 300 L 200 420"
                  className="animate-dash-1"
                  strokeDasharray="25 200"
                />
                <path
                  d="M 250 170 L 250 100 L 120 100 L 120 40"
                  className="animate-dash-3"
                  strokeDasharray="16 150"
                />
              </g>

              {/* Terminal Connection Nodes */}
              <g fill="#7dd3fc">
                <circle cx="80" cy="320" r="3" />
                <circle cx="200" cy="420" r="3" />
                <circle cx="320" cy="450" r="3" />
                <circle cx="120" cy="40" r="3" />
                <circle cx="370" cy="260" r="3" />
              </g>

              {/* Microchip */}
              <g className="animate-chip-glow">
                <rect
                  x="255"
                  y="145"
                  width="55"
                  height="55"
                  rx="8"
                  fill={`url(#chip-grad-${variant})`}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <rect
                  x="267"
                  y="157"
                  width="31"
                  height="31"
                  rx="4"
                  fill="#0284c7"
                  fillOpacity="0.35"
                  stroke="#7dd3fc"
                  strokeWidth="1"
                />
              </g>
            </g>
          )}

          {/* VARIANT 3: Bottom-Left Microchip Route */}
          {variant === 3 && (
            <g>
              {/* Static PCB Trace Lines */}
              <g
                stroke="rgba(191, 219, 254, 0.2)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 140 330 L 140 210 L 240 210 L 240 120 L 330 120" />
                <path d="M 160 330 L 270 330 L 270 260 L 360 260" />
                <path d="M 120 310 L 120 160 L 60 160 L 60 80" />
                <path d="M 140 370 L 240 370 L 240 440" />
              </g>

              {/* Animated Glowing Pulses */}
              <g
                stroke="#60a5fa"
                strokeWidth="2"
                filter={`url(#glow-${variant})`}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M 140 330 L 140 210 L 240 210 L 240 120 L 330 120"
                  className="animate-dash-1"
                  strokeDasharray="24 190"
                />
                <path
                  d="M 160 330 L 270 330 L 270 260 L 360 260"
                  className="animate-dash-3"
                  strokeDasharray="20 160"
                />
                <path
                  d="M 120 310 L 120 160 L 60 160 L 60 80"
                  className="animate-dash-2"
                  strokeDasharray="18 150"
                />
              </g>

              {/* Terminal Connection Nodes */}
              <g fill="#93c5fd">
                <circle cx="330" cy="120" r="3" />
                <circle cx="360" cy="260" r="3" />
                <circle cx="60" cy="80" r="3" />
                <circle cx="240" cy="440" r="3" />
              </g>

              {/* Microchip */}
              <g className="animate-chip-glow">
                <rect
                  x="110"
                  y="310"
                  width="50"
                  height="50"
                  rx="8"
                  fill={`url(#chip-grad-${variant})`}
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                />
                <rect
                  x="122"
                  y="322"
                  width="26"
                  height="26"
                  rx="4"
                  fill="#2563eb"
                  fillOpacity="0.4"
                  stroke="#93c5fd"
                  strokeWidth="1"
                />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* TOP BAR: Badge (Left) & Detail Button (Right) */}
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Uppercase Badge Label */}
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest text-blue-200 uppercase bg-blue-950/80 border border-blue-400/30 shadow-inner backdrop-blur-md">
          {badge}
        </span>

        {/* Diagonal Arrow Icon Link Button (↗) */}
        <a
          href={href}
          aria-label={`Learn more about ${title}`}
          className="w-10 h-10 rounded-xl bg-white text-blue-950 flex items-center justify-center font-bold shadow-lg shadow-black/20 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:shadow-blue-500/30"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H9M17 7V15"
            />
          </svg>
        </a>
      </div>

      {/* BOTTOM CONTENT: Title & Paragraph Description */}
      <div className="relative z-10 mt-auto pt-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight transition-colors duration-300 group-hover:text-blue-200">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed line-clamp-3 transition-opacity duration-300 group-hover:text-blue-100">
          {description}
        </p>
      </div>
    </div>
  );
}
