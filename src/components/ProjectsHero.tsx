"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function WireframeShapes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute -left-[8%] top-[12%] h-[280px] w-[280px] text-[#5b176e]/15 blur-[1px]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M40 70 L100 40 L160 70 L160 130 L100 160 L40 130 Z"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path d="M40 70 L100 100 L160 70" stroke="currentColor" strokeWidth="0.8" />
        <path d="M100 100 L100 160" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      <svg
        className="absolute right-[8%] top-[18%] h-[220px] w-[220px] text-[#5b176e]/12"
        viewBox="0 0 200 200"
        fill="none"
      >
        <rect x="45" y="55" width="90" height="90" stroke="currentColor" strokeWidth="0.7" />
        <path d="M45 55 L70 35 H160 V125 L135 145" stroke="currentColor" strokeWidth="0.7" />
        <path d="M135 55 L160 35" stroke="currentColor" strokeWidth="0.7" />
      </svg>

      <svg
        className="absolute bottom-[18%] left-[18%] h-[200px] w-[200px] text-[#5b176e]/10 blur-[0.5px]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M30 90 L90 50 L150 90 L150 150 L90 190 L30 150 Z"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <path d="M30 90 L90 130 L150 90" stroke="currentColor" strokeWidth="0.7" />
        <path d="M90 130 L90 190" stroke="currentColor" strokeWidth="0.7" />
      </svg>

      <svg
        className="absolute bottom-[22%] right-[14%] h-[260px] w-[260px] text-[#5b176e]/12"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M50 80 L110 45 L170 80 L170 140 L110 175 L50 140 Z"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path d="M50 80 L110 115 L170 80" stroke="currentColor" strokeWidth="0.8" />
        <path d="M110 115 L110 175" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      <svg
        className="absolute left-[42%] top-[8%] h-[140px] w-[140px] text-[#5b176e]/12 blur-[2px]"
        viewBox="0 0 120 120"
        fill="none"
      >
        <rect x="20" y="30" width="70" height="70" stroke="currentColor" strokeWidth="0.8" />
        <path d="M20 30 L40 14 H90 V84 L70 100" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#F8F8FA_78%)]" />
    </div>
  );
}

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "1.5L+ sq ft", label: "Delivered" },
  { value: "12+", label: "Years Experience" },
] as const;

export default function ProjectsHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // Text scales down backwards, tilts back in 3D perspective, and gracefully fades
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.78]);
  const opacity = useTransform(smoothProgress, [0, 0.85], [1, 0.15]);
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 18]);
  const y = useTransform(smoothProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      id="projects-hero"
      style={{ perspective: "1200px" }}
      className="relative flex w-full flex-col overflow-hidden bg-[#F8F8FA] text-black pt-10 pb-6 sm:pt-12 sm:pb-8 md:pt-16 md:pb-10"
    >
      <WireframeShapes />

      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          y,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center md:px-10 lg:px-[50px] transform-gpu origin-top"
      >
        <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-black sm:text-xs">
          <span className="h-px w-8 bg-black/50 sm:w-10" />
          Our Portfolio · Real Builds · Real Impact
        </p>

        <h1 className="mt-4 font-sans text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem]">
          <span className="block text-black">Built across India.</span>
          <span className="mt-1 block text-black">Proven in the field.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
          Real industrial projects — engineered with Synergy PUF panels for
          performance, speed, and longevity.
        </p>

        <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="stat-number text-3xl font-bold tracking-tight text-black md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

