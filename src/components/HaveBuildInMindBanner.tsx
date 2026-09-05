"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function HaveBuildInMindBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      const leftElements = leftCol.querySelectorAll("[data-animate-left]");
      const rightElements = rightCol.querySelectorAll("[data-animate-right]");

      // Initial state: transform: translateX(-60px); opacity: 0
      gsap.set(leftElements, {
        x: -60,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Right buttons initial state
      gsap.set(rightElements, {
        x: 60,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Scroll-triggered entrance animation (fires when user scrolls section into viewport)
      gsap.to(leftElements, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });

      gsap.to(rightElements, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 font-sans text-white border-t border-gray-100 select-none overflow-hidden"
    >
      <Container>
        {/* Dark Purple Container Card with ZERO border radius and ZERO shadow */}
        <div className="w-full bg-[#3c094c] p-8 sm:p-12 lg:p-14 rounded-none shadow-none flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Heading & Subtitle entering from left */}
          <div
            ref={leftColRef}
            className="flex flex-col items-start text-left max-w-xl"
          >
            <h2
              data-animate-left
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-normal text-white tracking-[-0.02em] leading-[1.15] mb-3"
            >
              Have a build like <br className="hidden sm:inline" />
              these in mind?
            </h2>

            <p
              data-animate-left
              className="text-sm sm:text-base text-purple-100/90 font-light leading-relaxed"
            >
              Send us the temperature range, area and timeline. Our
              engineering team will spec the panels and quote it.
            </p>
          </div>

          {/* Right Column: Buttons entering from right */}
          <div
            ref={rightColRef}
            className="flex flex-wrap items-center gap-3.5 shrink-0 w-full sm:w-auto"
          >
            {/* Solid Button (ZERO border radius, ZERO shadow) */}
            <Link
              data-animate-right
              href="/quote"
              className="inline-flex items-center justify-center bg-[#000000] hover:bg-black/80 text-white px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-colors active:scale-95"
            >
              Get a quote
            </Link>

            {/* Outline Button (ZERO border radius, ZERO shadow) */}
            <a
              data-animate-right
              href="#brochure"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading Synergy PUF Product Catalog PDF...");
              }}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/60 px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-colors active:scale-95"
            >
              Download brochure
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
