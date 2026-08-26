"use client";

import React, { useEffect, useRef } from "react";

const MARQUEE_ITEMS = [
  "HIGH-DENSITY PUF CORE",
  "FLAME-RETARDANT B1/B2 CERTIFIED",
  "0.022 W/mK THERMAL CONDUCTIVITY",
  "PAN-INDIA CONTINUOUS FOAMING LINE",
  "COLD STORAGE & PHARMA CLEANROOM",
  "CAM-LOCK LOCKING MECHANISM",
];

export default function RunningMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 1.2; // Pixels per frame

    const step = () => {
      posRef.current -= speed;
      const halfWidth = track.scrollWidth / 2;

      if (Math.abs(posRef.current) >= halfWidth) {
        posRef.current = 0;
      }

      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Duplicate items 4 times for seamless continuous loop
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#5b176e] text-white py-4 overflow-hidden shadow-inner select-none"
    >
      <div
        ref={trackRef}
        className="inline-flex whitespace-nowrap items-center transform-gpu will-change-transform"
      >
        {duplicatedItems.map((text, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-purple-100">
              {text}
            </span>
            <span className="ml-6 text-purple-300 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
