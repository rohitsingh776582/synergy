"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Globe, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  {
    id: "card-1",
    step: "01",
    title: "Synergy Industrial Campus",
    location: "Industrial Logistics Park",
    tagline: "CONTINUOUS PUF INSULATION FACADE",
    image: "/Rotating3DCardDeckShowcase/DJI_20260729132544_0302_D.JPG.jpeg",
    description:
      "High-density polyurethane foam sandwich panels engineered for large-scale commercial facilities with zero thermal loss.",
  },
  {
    id: "card-2",
    step: "02",
    title: "High-Bay Manufacturing Unit",
    location: "Manufacturing Hub",
    tagline: "ADVANCED THERMAL ENVELOPE",
    image: "/Rotating3DCardDeckShowcase/ChatGPT Image Aug 27, 2026, 04_36_06 PM.png",
    description:
      "High R-value insulated roof and wall panel system designed for severe climate endurance and structural stability.",
  },
  {
    id: "card-3",
    step: "03",
    title: "Cold Chain Storage Complex",
    location: "Sub-Zero Vault Facility",
    tagline: "CONTROLLED ATMOSPHERE ENCLOSURE",
    image: "/Rotating3DCardDeckShowcase/ChatGPT Image Aug 27, 2026, 04_34_43 PM.png",
    description:
      "Custom tongue-and-groove insulated panels providing continuous vapor barriers and precision temperature control.",
  },
  {
    id: "card-4",
    step: "04",
    title: "Pan-India Industrial Facility",
    location: "Industrial Logistics Hub",
    tagline: "PRE-ENGINEERED BUILDING CLADDING",
    image: "/Rotating3DCardDeckShowcase/DJI_20260729180801_0362_D.JPG.jpeg",
    description:
      "State-of-the-art continuous polyurethane sandwich panel manufacturing process delivering unmatched precision.",
  },
  {
    id: "card-5",
    step: "05",
    title: "Automated PUF Lamination Line",
    location: "Synergy Tech Plant",
    tagline: "CONTINUOUS AUTOMATED PRODUCTION",
    image: "/Rotating3DCardDeckShowcase/ChatGPT Image Aug 27, 2026, 04_32_46 PM.png",
    description:
      "Precision continuous lamination technology ensuring airtight jointing, zero moisture ingress, and thermal efficiency.",
  },
];

export default function Rotating3DCardDeckShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const lastIndexRef = useRef(0);

  const totalSteps = CARDS_DATA.length;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const imgElements = section.querySelectorAll<HTMLElement>("[data-slide-image]");
      const textElements = section.querySelectorAll<HTMLElement>("[data-slide-text]");

      // Initial state: first slide fully visible, rest hidden and scaled
      imgElements.forEach((el, idx) => {
        gsap.set(el, {
          opacity: idx === 0 ? 1 : 0,
          scale: idx === 0 ? 1 : 1.08,
          zIndex: idx + 1,
        });
      });

      textElements.forEach((el, idx) => {
        gsap.set(el, {
          opacity: idx === 0 ? 1 : 0,
          y: idx === 0 ? 0 : 28,
          pointerEvents: idx === 0 ? "auto" : "none",
        });
      });

      // Linear, immediate GSAP timeline scrubbed 1:1 to scroll
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(totalSteps - 1) * 700}`,
          pin: true,
          scrub: 0.1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalSteps - 1),
            duration: { min: 0.2, max: 0.35 },
            delay: 0,
            ease: "none",
          },
          onUpdate: (self) => {
            const rawStep = Math.round(self.progress * (totalSteps - 1));
            const currentStep = Math.min(totalSteps - 1, Math.max(0, rawStep));
            if (currentStep !== lastIndexRef.current) {
              lastIndexRef.current = currentStep;
              setActiveStepIndex(currentStep);
            }
          },
        },
      });

      triggerRef.current = tl.scrollTrigger || null;

      // Build sequential synchronous transitions between slides
      for (let i = 0; i < totalSteps - 1; i++) {
        const currentImg = imgElements[i];
        const nextImg = imgElements[i + 1];
        const currentTxt = textElements[i];
        const nextTxt = textElements[i + 1];

        // Fade out previous slide (image + text together)
        if (currentImg && currentTxt) {
          tl.to(
            currentImg,
            { opacity: 0, scale: 0.96, duration: 1 },
            `step-${i}`
          );
          tl.to(
            currentTxt,
            { opacity: 0, y: -20, pointerEvents: "none", duration: 0.8 },
            `step-${i}`
          );
        }

        // Fade in next slide immediately in lockstep
        if (nextImg && nextTxt) {
          tl.to(
            nextImg,
            { opacity: 1, scale: 1, duration: 1 },
            `step-${i}`
          );
          tl.to(
            nextTxt,
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 1 },
            `step-${i}`
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, [totalSteps]);

  const goToSlide = useCallback(
    (index: number) => {
      const st = triggerRef.current;
      if (!st) {
        setActiveStepIndex(index);
        return;
      }
      const targetProgress = index / (totalSteps - 1);
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    [totalSteps]
  );

  const handleNext = useCallback(() => {
    const next = (activeStepIndex + 1) % totalSteps;
    goToSlide(next);
  }, [activeStepIndex, totalSteps, goToSlide]);

  const handlePrev = useCallback(() => {
    const prev = (activeStepIndex - 1 + totalSteps) % totalSteps;
    goToSlide(prev);
  }, [activeStepIndex, totalSteps, goToSlide]);

  const activeCard = CARDS_DATA[activeStepIndex] || CARDS_DATA[0];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen pt-28 sm:pt-32 pb-6 px-5 md:px-10 lg:px-[50px] flex items-center justify-center font-sans select-none"
    >
      <div className="relative w-full h-full rounded-none overflow-hidden flex items-center justify-center bg-black">
        {/* Background Fullscreen Image Layers with instant GPU transform & scrub */}
        {CARDS_DATA.map((card, idx) => (
          <div
            key={card.id}
            data-slide-image
            style={{ willChange: "transform, opacity" }}
            className="absolute inset-0 pointer-events-none"
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Full Screen Dark Overlay for Contrast & Text Legibility */}
        <div className="absolute inset-0 bg-black/45 z-[10] pointer-events-none" />

        {/* Inner Content Layout Container */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between px-6 sm:px-10 py-6 text-white">

          {/* 1. TOP NAVIGATION BAR */}
          <div className="relative z-30 flex items-center justify-between sm:justify-end w-full gap-4">

            {/* Step Dots indicator */}
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
              {CARDS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${idx === activeStepIndex
                    ? "w-6 bg-emerald-400"
                    : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Top Right Controls & Arrows */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-200 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase font-semibold">{activeCard.step} / 05</span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. MAIN REGION HEADING & CONTENT AREA (Synchronized Text + Image in single scroll) */}
          <div className="relative z-30 max-w-xl my-auto pt-4 flex flex-col justify-center min-h-[240px]">
            {CARDS_DATA.map((card) => (
              <div
                key={card.id}
                data-slide-text
                style={{ willChange: "transform, opacity" }}
                className="absolute flex flex-col items-start text-left"
              >
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-emerald-300 uppercase mb-2">
                  {card.tagline}
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12]">
                  {card.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-purple-200 mt-2 font-light">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{card.location}</span>
                </div>
                <p className="text-xs sm:text-sm font-light text-gray-200 leading-relaxed max-w-md mt-3 line-clamp-3">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* 3. BOTTOM SCROLL INDICATOR */}
          <div className="relative z-30 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>Scroll down or use controls to switch slides</span>
            <span className="animate-bounce">↓</span>
          </div>

        </div>
      </div>
    </section>
  );
}
