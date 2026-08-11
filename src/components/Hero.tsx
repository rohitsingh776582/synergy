"use client";

import React, { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import Container from "./Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (isReducedMotion) return;

    const triggerEl = triggerRef.current;
    const scrollLayer = scrollLayerRef.current;
    if (!triggerEl || !scrollLayer) return;

    const ctx = gsap.context(() => {
      const line1 = triggerEl.querySelector('[data-element="headline-line-1"]');
      const line2 = triggerEl.querySelector('[data-element="headline-line-2"]');
      const heroPin = document.getElementById("home-hero") ?? sectionRef.current;

      gsap.set([line1, line2], { opacity: 0 });
      gsap.set(scrollLayer, {
        y: 0,
        opacity: 1,
        scale: 1,
        transformOrigin: "left center",
        force3D: true,
      });

      // Soft entrance — independent of scroll scrub
      const headlineTl = gsap.timeline({ defaults: { ease: "power2.out" } });
      headlineTl
        .to(line1, { opacity: 1, duration: 0.7 }, 0.1)
        .to(line2, { opacity: 1, duration: 0.7 }, 0.25);

      // Scroll-linked exit — progress drives motion both ways
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop, isTablet } = context.conditions ?? {};

          const yTravel = isDesktop ? -110 : isTablet ? -72 : -44;
          const fadeTo = isDesktop ? 0.12 : isTablet ? 0.2 : 0.28;
          const scaleTo = isDesktop ? 0.97 : 0.985;
          const scrub = isDesktop ? 1.15 : isTablet ? 1 : 0.85;

          gsap.to(scrollLayer, {
            y: yTravel,
            opacity: fadeTo,
            scale: scaleTo,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: heroPin,
              start: "top top",
              end: "bottom top+=10%",
              scrub,
              invalidateOnRefresh: true,
            },
          });
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative z-0 flex w-full flex-col justify-start bg-transparent"
    >
      <div ref={triggerRef} className="relative w-full">
        <Container>
          <div
            ref={scrollLayerRef}
            className="will-change-transform flex flex-col justify-start text-left"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[1.1] max-w-4xl">
              <span
                data-element="headline-line-1"
                className={`block ${isReducedMotion ? "" : "opacity-0"}`}
              >
                Engineering
              </span>
              <span
                data-element="headline-line-2"
                className={`block ${isReducedMotion ? "" : "opacity-0"}`}
              >
                Insulation Solutions
              </span>
            </h1>
          </div>
        </Container>
      </div>
    </section>
  );
}
