"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Container from "./Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => { };
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

const word1 = "Engineering";
const word2 = "Insulation";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const heroEl = heroRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      const children = Array.from(heroEl.children);
      gsap.fromTo(
        children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-10 flex w-full flex-col justify-center items-center text-center text-white pt-4 pb-12 sm:pt-8 sm:pb-16 -mt-8 sm:-mt-12 md:-mt-16">
      <Container>
        <div ref={heroRef} className="max-w-4xl mx-auto flex flex-col items-center justify-center">

          {/* Top Subheading / Label */}
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/80 uppercase mb-4 sm:mb-6">
            INDUSTRIAL PUF PANEL MANUFACTURER
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.1]">
            High Density <br />
            PUF Insulated <br />
            Panels

          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-6 text-sm sm:text-base md:text-lg font-light text-white/90 leading-relaxed max-w-2xl mx-auto">
            Roofing, wall and cold storage panels engineered for India's industrial and commercial infrastructure.
          </p>

          {/* Action Buttons */}
       

          {/* Bottom Badges Bar */}
          <div className="mt-14 sm:mt-16 flex items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-white/80 uppercase flex-wrap">
            <span>BIS CERTIFIED</span>
            <span>FM APPROVED </span>
            <span>ISO 9001</span>
            <span >30-DAY PAN-INDIA DELIVERY</span>

          </div>

        </div>
      </Container>
    </section>
  );
}

