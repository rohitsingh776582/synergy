"use client";

import React, { useLayoutEffect, useRef, useSyncExternalStore } from "react";
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

      gsap.set([line1, line2], { y: "110%", opacity: 0 });
      gsap.set(scrollLayer, {
        y: 0,
        opacity: 1,
        scale: 1,
        transformOrigin: "left center",
        force3D: true,
      });

      // Smooth upward slide-reveal entrance on home page load
      const headlineTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      headlineTl
        .to(line1, { y: "0%", opacity: 1, duration: 1.25 }, 0.1)
        .to(line2, { y: "0%", opacity: 1, duration: 1.25 }, 0.22);

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

          const xDist = isDesktop ? 135 : isTablet ? 85 : 45;
          const yTravel = isDesktop ? -95 : isTablet ? -65 : -40;
          const fadeTo = isDesktop ? 0.12 : isTablet ? 0.18 : 0.25;
          const scrub = 0.15; // Instantaneous pixel-perfect scroll response

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroPin,
              start: "top top",
              end: "bottom top+=20%",
              scrub,
              invalidateOnRefresh: true,
            },
          });

          // Engineering slides right towards center to meet Insulation
          scrollTl.to(
            line1,
            {
              x: xDist,
              ease: "none",
              force3D: true,
            },
            0
          );

          // Insulation slides left towards center to meet Engineering
          scrollTl.to(
            line2,
            {
              x: -xDist,
              ease: "none",
              force3D: true,
            },
            0
          );

          // Whole hero container lifts & fades out smoothly
          scrollTl.to(
            scrollLayer,
            {
              y: yTravel,
              opacity: fadeTo,
              ease: "none",
              force3D: true,
            },
            0
          );
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
            <h1 className="flex flex-col gap-2 sm:gap-3 text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[1.1] w-full">
              <span className="block overflow-hidden pb-[0.3em] pt-[0.05em] -mb-[0.22em]">
                <span
                  data-element="headline-line-1"
                  className="block will-change-transform"
                >
                  Engineering
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.3em] pt-[0.05em] -mb-[0.22em] text-right w-full">
                <span
                  data-element="headline-line-2"
                  className="block will-change-transform text-right ml-auto"
                >
                  Insulation
                </span>
              </span>
            </h1>
          </div>
        </Container>
      </div>
    </section>
  );
}
