"use client";

import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import Container from "./Container";

interface LayerInfo {
  id: "top-steel" | "puf-core" | "bottom-steel";
  title: string;
  subtitle: string;
  description: string;
  icon: "steel" | "core";
}

const LAYERS_DATA: LayerInfo[] = [
  {
    id: "top-steel",
    title: "STEEL FACE",
    subtitle: "Outer Sheeting",
    description: "Durable outer protection designed for demanding environments.",
    icon: "steel",
  },
  {
    id: "puf-core",
    title: "PUF CORE",
    subtitle: "Insulation Core",
    description: "The high-performance insulation core responsible for thermal efficiency.",
    icon: "core",
  },
  {
    id: "bottom-steel",
    title: "STEEL FACE",
    subtitle: "Inner Sheeting",
    description: "A protective inner surface that completes the panel system.",
    icon: "steel",
  },
];

export default function WhatsInsideMatters() {
  const [activeLayer, setActiveLayer] = useState<
    "all" | "top-steel" | "puf-core" | "bottom-steel"
  >("all");
  const [isExploded, setIsExploded] = useState(true);

  const toggleExplode = () => {
    setIsExploded((prev) => !prev);
  };

  // Y Offsets for layer explosion
  const topOffsetY = isExploded ? -65 : 0;
  const coreOffsetY = 0;
  const bottomOffsetY = isExploded ? 65 : 0;

  return (
    <section className="relative w-full bg-white text-gray-900 py-16 sm:py-20 lg:py-28 overflow-hidden font-sans border-t border-gray-100">
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.02),transparent_60%)]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-gray-900 leading-[1.08]">
              WHAT&apos;S INSIDE
              <br />
              MATTERS
            </h2>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-gray-600 font-normal max-w-md">
              A PUF panel is more than two metal faces. At its core is a
              high-performance insulation layer, engineered between them to
              deliver exceptional thermal performance.
            </p>

            <button
              onClick={toggleExplode}
              className="mt-6 sm:mt-8 group inline-flex items-center gap-3 text-xs font-bold tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase w-fit"
            >
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gray-300 group-hover:border-gray-600 group-hover:bg-gray-100 transition-colors">
                <ArrowDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isExploded ? "rotate-180 text-gray-900" : "animate-bounce text-gray-600"
                  }`}
                />
              </span>
              <span>{isExploded ? "COLLAPSE LAYERS" : "SCROLL TO SEE THE LAYERS"}</span>
            </button>
          </div>

          {/* Center 3D Isometric Exploded Panel (Shadows removed) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-4 sm:py-6">
            <div className="relative w-full max-w-[500px] h-[360px] sm:h-[420px] flex items-center justify-center">
              <svg
                viewBox="0 0 580 420"
                className="w-full h-full overflow-visible select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Metallic Steel Top Surface Gradient */}
                  <linearGradient id="silver-top-surface" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EBF1F6" />
                    <stop offset="40%" stopColor="#D5DEE7" />
                    <stop offset="75%" stopColor="#A8B5C4" />
                    <stop offset="100%" stopColor="#8997A7" />
                  </linearGradient>

                  {/* Steel Folded Rim Outer Edge Gradient */}
                  <linearGradient id="silver-rim-front" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8A97A6" />
                    <stop offset="50%" stopColor="#C4CFDB" />
                    <stop offset="100%" stopColor="#6C7887" />
                  </linearGradient>

                  <linearGradient id="silver-rim-side" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5E6978" />
                    <stop offset="100%" stopColor="#3F4854" />
                  </linearGradient>

                  {/* PUF Foam Core Warm Beige Gradients */}
                  <pattern id="foam-grain-texture" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="3" r="1.1" fill="#A89260" opacity="0.22" />
                    <circle cx="8" cy="7" r="1.4" fill="#947F4F" opacity="0.18" />
                    <circle cx="5" cy="10" r="0.9" fill="#BFA770" opacity="0.25" />
                  </pattern>

                  <linearGradient id="puf-top-face" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7EED3" />
                    <stop offset="50%" stopColor="#E9DAB2" />
                    <stop offset="100%" stopColor="#D9C799" />
                  </linearGradient>

                  <linearGradient id="puf-front-side" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EBDCB3" />
                    <stop offset="50%" stopColor="#DEC99A" />
                    <stop offset="100%" stopColor="#C9B17D" />
                  </linearGradient>

                  <linearGradient id="puf-right-side" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9B17D" />
                    <stop offset="100%" stopColor="#9C8552" />
                  </linearGradient>
                </defs>

                {/* DOTTED CONNECTOR LINES TO RIGHT CARDS WITH YELLOW DOTS (Straight Horizontal Lines) */}
                {/* 1. Top Steel Pointer */}
                <g opacity={activeLayer === "all" || activeLayer === "top-steel" ? 1 : 0.25}>
                  <line
                    x1="485"
                    y1={88 + topOffsetY}
                    x2="560"
                    y2={88 + topOffsetY}
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle cx="485" cy={88 + topOffsetY} r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="560" cy={88 + topOffsetY} r="3" fill="#F59E0B" />
                </g>

                {/* 2. Middle PUF Core Pointer */}
                <g opacity={activeLayer === "all" || activeLayer === "puf-core" ? 1 : 0.25}>
                  <line
                    x1="485"
                    y1={195 + coreOffsetY}
                    x2="560"
                    y2={195 + coreOffsetY}
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle cx="485" cy={195 + coreOffsetY} r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="560" cy={195 + coreOffsetY} r="3" fill="#F59E0B" />
                </g>

                {/* 3. Bottom Steel Pointer */}
                <g opacity={activeLayer === "all" || activeLayer === "bottom-steel" ? 1 : 0.25}>
                  <line
                    x1="485"
                    y1={302 + bottomOffsetY}
                    x2="560"
                    y2={302 + bottomOffsetY}
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle cx="485" cy={302 + bottomOffsetY} r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="560" cy={302 + bottomOffsetY} r="3" fill="#F59E0B" />
                </g>

                {/* LAYER 1: TOP STEEL FACE SHEET */}
                <g
                  style={{
                    transform: `translateY(${topOffsetY}px)`,
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveLayer("top-steel")}
                  onMouseEnter={() => setActiveLayer("top-steel")}
                  onMouseLeave={() => setActiveLayer("all")}
                >
                  {/* Top Surface Polygon Mesh */}
                  <polygon
                    points="210,35 485,82 310,195 35,148"
                    fill="url(#silver-top-surface)"
                    stroke="#A3AEB9"
                    strokeWidth="0.6"
                  />
                  
                  {/* Indented Metal Seam Lines running longitudinally along depth */}
                  <g stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65">
                    <line x1="255" y1="43" x2="80" y2="156" />
                    <line x1="300" y1="51" x2="125" y2="164" />
                    <line x1="345" y1="59" x2="170" y2="172" />
                    <line x1="390" y1="67" x2="215" y2="180" />
                    <line x1="435" y1="75" x2="260" y2="188" />
                  </g>
                  <g stroke="#6C7887" strokeWidth="0.8" opacity="0.45">
                    <line x1="256" y1="43" x2="81" y2="156" />
                    <line x1="301" y1="51" x2="126" y2="164" />
                    <line x1="346" y1="59" x2="171" y2="172" />
                    <line x1="391" y1="67" x2="216" y2="180" />
                    <line x1="436" y1="75" x2="261" y2="188" />
                  </g>

                  {/* Folded Metal Perimeter Lip (Front Edge) */}
                  <polygon
                    points="35,148 310,195 310,205 35,158"
                    fill="url(#silver-rim-front)"
                    stroke="#5E6978"
                    strokeWidth="0.6"
                  />

                  {/* Folded Metal Perimeter Lip (Right Edge) */}
                  <polygon
                    points="310,195 485,82 485,92 310,205"
                    fill="url(#silver-rim-side)"
                    stroke="#3F4854"
                    strokeWidth="0.6"
                  />
                </g>

                {/* LAYER 2: PUF FOAM CORE BLOCK */}
                <g
                  style={{
                    transform: `translateY(${coreOffsetY}px)`,
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveLayer("puf-core")}
                  onMouseEnter={() => setActiveLayer("puf-core")}
                  onMouseLeave={() => setActiveLayer("all")}
                >
                  {/* Top Face of Foam Core */}
                  <polygon
                    points="210,105 485,152 310,265 35,218"
                    fill="url(#puf-top-face)"
                    stroke="#C9B17D"
                    strokeWidth="0.6"
                  />

                  {/* Front Face of Foam Block */}
                  <polygon
                    points="35,218 310,265 310,312 35,265"
                    fill="url(#puf-front-side)"
                    stroke="#B89F6B"
                    strokeWidth="0.6"
                  />
                  <polygon
                    points="35,218 310,265 310,312 35,265"
                    fill="url(#foam-grain-texture)"
                  />

                  {/* Right Face of Foam Block */}
                  <polygon
                    points="310,265 485,152 485,199 310,312"
                    fill="url(#puf-right-side)"
                    stroke="#8C7544"
                    strokeWidth="0.6"
                  />
                  <polygon
                    points="310,265 485,152 485,199 310,312"
                    fill="url(#foam-grain-texture)"
                    opacity="0.65"
                  />
                </g>

                {/* LAYER 3: BOTTOM STEEL FACE SHEET */}
                <g
                  style={{
                    transform: `translateY(${bottomOffsetY}px)`,
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveLayer("bottom-steel")}
                  onMouseEnter={() => setActiveLayer("bottom-steel")}
                  onMouseLeave={() => setActiveLayer("all")}
                >
                  {/* Top Surface Polygon Mesh */}
                  <polygon
                    points="210,248 485,295 310,408 35,361"
                    fill="url(#silver-top-surface)"
                    stroke="#A3AEB9"
                    strokeWidth="0.6"
                  />

                  {/* Seam Grooves */}
                  <g stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65">
                    <line x1="255" y1="256" x2="80" y2="369" />
                    <line x1="345" y1="272" x2="170" y2="385" />
                    <line x1="435" y1="288" x2="260" y2="401" />
                  </g>

                  {/* Folded Metal Perimeter Lip (Front Edge) */}
                  <polygon
                    points="35,361 310,408 310,418 35,371"
                    fill="url(#silver-rim-front)"
                    stroke="#5E6978"
                    strokeWidth="0.6"
                  />

                  {/* Folded Metal Perimeter Lip (Right Edge) */}
                  <polygon
                    points="310,408 485,295 485,305 310,418"
                    fill="url(#silver-rim-side)"
                    stroke="#3F4854"
                    strokeWidth="0.6"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Right Column - Layer Details Cards (Shadows removed) */}
          <div className="lg:col-span-3 flex flex-col gap-6 justify-center">
            {LAYERS_DATA.map((layer) => {
              const isActive =
                activeLayer === "all" || activeLayer === layer.id;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer("all")}
                  className={`group cursor-pointer rounded-lg p-3 sm:p-4 transition-all duration-300 border ${
                    activeLayer === layer.id
                      ? "bg-gray-100 border-gray-900 scale-[1.02]"
                      : isActive
                      ? "bg-white border-gray-200 hover:border-gray-400"
                      : "bg-gray-50 border-gray-100 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-900 group-hover:bg-gray-200 transition-colors">
                      {layer.icon === "steel" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M3 15h18" />
                          <path d="M9 3v18" />
                          <path d="M15 3v18" />
                        </svg>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-900">
                        {layer.title}
                      </h4>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-gray-600 font-light">
                    {layer.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner Accent */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-gray-100 text-center">
          <div className="w-12 h-[3px] bg-gray-900 mx-auto mb-4 rounded-full" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-gray-900">
            THREE LAYERS <br/>
             ONE ENGINEERED PANE
          </h3>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-gray-900 mt-1">
           
          </p>
        </div>
      </Container>
    </section>
  );
}
