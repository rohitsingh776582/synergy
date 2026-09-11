"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PUFLoaderProps {
  onComplete?: () => void;
}

let hasInitiallyLoaded = false;

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~565.487

export default function PUFLoader({ onComplete }: PUFLoaderProps) {
  const [isDone, setIsDone] = useState(hasInitiallyLoaded);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const circleGroupRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (hasInitiallyLoaded) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    // Prevent background scrolling during initial entrance loading
    document.body.style.overflow = "hidden";

    const container = containerRef.current;
    const circle = circleRef.current;
    const circleGroup = circleGroupRef.current;
    const logo = logoRef.current;

    if (!container || !circle || !circleGroup || !logo) return;

    const ctx = gsap.context(() => {
      // 1. Initial State
      // Set the stroke offset to exact full circumference so it starts at 0% visible
      gsap.set(circle, {
        strokeDasharray: CIRCUMFERENCE,
        strokeDashoffset: CIRCUMFERENCE,
      });

      // Subtle initial fade-in for the centered logo
      gsap.set(logo, {
        opacity: 0,
        scale: 0.94,
        force3D: true,
      });

      // 2. Timeline with premium natural easing
      const tl = gsap.timeline({
        onComplete: () => {
          hasInitiallyLoaded = true;
          document.body.style.overflow = "";
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });

      // Reveal logo softly in the center
      tl.to(logo, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
        // Draw the circular ring 360 degrees smoothly from top starting point all the way back to the exact same point
        .to(
          circle,
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        // Brief natural pause once circle completes 100%
        .to({}, { duration: 0.2 })
        // Smooth cinematic reveal of the underlying page
        .to(circleGroup, {
          scale: 1.04,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          container,
          {
            opacity: 0,
            duration: 0.55,
            ease: "power2.inOut",
          },
          "-=0.4"
        );
    }, container);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-white select-none pointer-events-auto"
      style={{ willChange: "opacity" }}
    >
      {/* Centered Circular Container with SVG 360-Degree Ring and Logo */}
      <div
        ref={circleGroupRef}
        className="relative flex items-center justify-center will-change-transform"
      >
        {/* SVG Drawing Circle Ring - rotated -90deg so it starts and completes at top 12 o'clock */}
        <svg
          className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] -rotate-90 transform-gpu overflow-visible"
          viewBox="0 0 200 200"
        >
          {/* Faint Guide Ring */}
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="#561a62"
            strokeOpacity="0.1"
            strokeWidth="2"
          />

          {/* Smooth 360-Degree Animated Ring */}
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="#561a62"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Centered Logo Inside the Circle */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 pointer-events-none will-change-transform"
        >
          <Image
            src="/images/logo/puf-logo.png"
            alt="Synergy PUF Logo"
            width={340}
            height={100}
            className="w-full h-auto max-w-[130px] sm:max-w-[165px] md:max-w-[185px] object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
