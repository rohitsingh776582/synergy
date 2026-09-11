"use client";

import React, { useRef } from "react";

interface HeroVideoBackgroundProps {
  src: string;
}

export default function HeroVideoBackground({ src }: HeroVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

