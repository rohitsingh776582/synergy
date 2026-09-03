"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "Year to confirm",
    title: "Group founded",
  },
  {
    year: "Year to confirm",
    title: "PUF plant commissioned",
  },
  {
    year: "Year to confirm",
    title: "First certification",
  },
  {
    year: "Year to confirm",
    title: "Capacity expanded",
  },
  {
    year: "Year to confirm",
    title: "Project milestone",
  },
];

export default function MilestonesTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const isHoveredRef = useRef(false);

  // 1. Text entrance animation: slides smoothly from Left to Right when scrolling into view
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      const headerElements = header.children;

      // Initial state: shifted to the left and transparent
      gsap.set(headerElements, {
        x: -70,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Smooth Left-to-Right entrance
      gsap.to(headerElements, {
        x: 0,
        opacity: 1,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // 2. Continuous infinite marquee loop for timeline cards
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Smooth continuous movement speed (pixels per frame)
    const speed = 0.9;

    const step = () => {
      if (!isHoveredRef.current) {
        posRef.current -= speed;
        const halfWidth = track.scrollWidth / 2;

        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = 0;
        }

        track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Duplicate items for seamless continuous infinite marquee loop
  const duplicatedMilestones = [...milestones, ...milestones, ...milestones, ...milestones];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f8f9fa] py-14 md:py-20 font-sans text-gray-900 border-t border-gray-200/70 overflow-hidden select-none"
    >
      <Container>
        {/* Section Header - Animates from Left to Right on scroll */}
        <div
          ref={headerRef}
          className="flex flex-col items-start text-left mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-2">
            The milestones behind our growth
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Timeline structure. Years and events to confirm.
          </p>
        </div>
      </Container>

      {/* Infinite Continuous Timeline Marquee Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        <div
          ref={trackRef}
          className="inline-flex whitespace-nowrap items-center transform-gpu will-change-transform"
        >
          {duplicatedMilestones.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex flex-col items-center mx-3 sm:mx-4 w-[240px] sm:w-[270px] shrink-0"
            >
              {/* Gold Square Marker (ZERO border radius) */}
              <div className="w-4 h-4 bg-[#e8b030] rounded-none mb-4 shrink-0" />

              {/* Milestone Card (ZERO border radius, ZERO shadow) */}
              <div className="w-full bg-white border border-gray-200/90 rounded-none shadow-none p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[130px] sm:min-h-[145px] hover:border-purple-200 transition-colors">
                {/* Year Sub-label */}
                <span className="text-[11px] sm:text-xs font-semibold text-[#e8b030] tracking-wide mb-2">
                  {item.year}
                </span>

                {/* Main Milestone Title */}
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug whitespace-normal max-w-[170px]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
