"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function BuildingStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol) return;

    const ctx = gsap.context(() => {
      const leftElements = leftCol.querySelectorAll("[data-animate-item]");

      // Initial state: Left-side items shifted downwards with opacity 0
      gsap.set(leftElements, {
        y: 40,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Initial state: Right-side element scaled from bottom-right corner (100% 100%)
      if (rightCol) {
        gsap.set(rightCol, {
          scale: 0,
          opacity: 0,
          transformOrigin: "100% 100%",
          willChange: "transform, opacity",
        });
      }

      // Smooth bidirectional ScrollTrigger timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Animate left-side items with subtle stagger
      tl.to(leftElements, {
        y: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.12,
      });

      // Animate right-side item from bottom-right corner smoothly
      if (rightCol) {
        tl.to(
          rightCol,
          {
            scale: 1,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.7"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 md:py-24 font-sans text-gray-900 border-t border-gray-100 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Text Content (animates bottom to top with stagger) */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            {/* Title */}
            <h2
              data-animate-item
              className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-6"
            >
              Part of a bigger <br className="hidden sm:inline" />
              building story.
            </h2>

            {/* Paragraph 1 */}
            <p
              data-animate-item
              className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-4"
            >
              Synergy PUF sits within Synergy Group, alongside Thrislington,
              LGSF, PEB and Construction.
            </p>

            {/* Paragraph 2 */}
            <p
              data-animate-item
              className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mb-8"
            >
              This is where the verified story of our founding, growth and
              insulation business will appear.
            </p>

            {/* Info Note Row */}
            <div
              data-animate-item
              className="flex items-start gap-3 pt-2"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#d99e2b]">
                <Info className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">
                Founding details and group relationship to confirm.
              </p>
            </div>
          </div>

          {/* Right Column: Team Image (animates from bottom-right corner: transform-origin 100% 100%, scale 0 to 1) */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 flex flex-col items-start w-full"
          >
            {/* Image Box with ZERO border radius */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100">
              <Image
                src="/images/team_building_story.jpg"
                alt="Synergy Group Team"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center rounded-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
