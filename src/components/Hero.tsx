"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import Container from "./Container";
import PUFPanelAnimation from "./PUFPanelAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (isReducedMotion) return;

    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const ctx = gsap.context(() => {
      const partTop = triggerEl.querySelector('[data-layer="part-top"]');
      const partBottom = triggerEl.querySelector('[data-layer="part-bottom"]');
      const shineEl = triggerEl.querySelector('[data-element="sheet-shine"]');
      const line1 = triggerEl.querySelector('[data-element="headline-line-1"]');
      const line2 = triggerEl.querySelector('[data-element="headline-line-2"]');

      // Headline entrance on load — staggered line reveal
      gsap.set([line1, line2], { y: 48, opacity: 0 });

      const headlineTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      headlineTl
        .to(line1, { y: 0, opacity: 1, duration: 0.85 }, 0.12)
        .to(line2, { y: 0, opacity: 1, duration: 0.95 }, 0.32);

      // Panel converge pinned to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 0.8,
        },
      });

      tl.to(
        partTop,
        {
          y: 0,
          ease: "power2.out",
          duration: 1,
        },
        0
      )
        .to(
          partBottom,
          {
            y: 0,
            ease: "power2.out",
            duration: 1,
          },
          0
        )
        .to(
          shineEl,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power1.inOut",
          },
          1.0
        );
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section ref={sectionRef} className="relative z-0 bg-white text-slate-900 overflow-hidden">
      <div ref={triggerRef} className="py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT SIDE: HEADING ONLY */}
            <div className="lg:col-span-6 flex flex-col justify-start text-left">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-[#111111] leading-[1.1]">
                <span
                  data-element="headline-line-1"
                  className={`block transform-gpu will-change-transform ${isReducedMotion ? "" : "opacity-0"}`}
                >
                  Engineering
                </span>
                <span
                  data-element="headline-line-2"
                  className={`block transform-gpu will-change-transform ${isReducedMotion ? "" : "opacity-0"}`}
                >
                  Insulation Solutions
                </span>
              </h1>
            </div>

            {/* RIGHT SIDE: ANIMATED 3-PART STAGE */}
            <div className="lg:col-span-6 relative flex items-center justify-center overflow-visible">
              <div className="relative w-full">
                <PUFPanelAnimation isReducedMotion={isReducedMotion} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
