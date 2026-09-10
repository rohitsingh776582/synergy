"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoBackgroundProps {
  src: string;
}

export default function HeroVideoBackground({ src }: HeroVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Hero image/video subtle scroll parallax movement (small translate movement)
      const heroPin = document.getElementById("home-hero");
      gsap.to(container, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroPin ?? document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden will-change-transform"
      aria-hidden
    >
      {/* Subtle overlay for text contrast without hiding video */}
      <div className="absolute inset-0 bg-black/20 bg-gradient-to-b from-black/35 via-transparent to-black/50 z-10" />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover object-center"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

