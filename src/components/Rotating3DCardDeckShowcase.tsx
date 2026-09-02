"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
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
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const lastIndexRef = useRef(0);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const totalSteps = CARDS_DATA.length;

    const resolveStep = (progress: number) => {
      const rawStep = Math.floor(progress * totalSteps);
      return Math.min(totalSteps - 1, Math.max(0, rawStep));
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top+=80px",
      end: `+=${totalSteps * 120}%`,
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const next = resolveStep(self.progress);
        if (next !== lastIndexRef.current) {
          lastIndexRef.current = next;
          setActiveStepIndex(next);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const activeCard = CARDS_DATA[activeStepIndex] || CARDS_DATA[0];

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev + 1) % CARDS_DATA.length);
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev - 1 + CARDS_DATA.length) % CARDS_DATA.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen py-5 px-5 md:px-10 lg:px-[50px] flex items-center justify-center font-sans select-none"
    >
      <div className="relative w-full h-full rounded-none overflow-hidden flex items-center justify-center bg-black">
        {/* Background Fullscreen Image Layers (Both text and image change together cleanly) */}
        {CARDS_DATA.map((card, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <div
              key={card.id}
              style={{ zIndex: idx + 1 }}
              className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
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
          );
        })}

        {/* Full Screen Dark Overlay for Contrast & Text Legibility */}
        <div className="absolute inset-0 bg-black/40 z-[10] pointer-events-none" />

        {/* Inner Content Layout Container */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between px-6 sm:px-10 py-8 text-white">

          {/* 1. TOP NAVIGATION BAR */}
          <div className="relative z-30 flex items-center justify-between sm:justify-end w-full gap-4">

            {/* Step Dots indicator */}
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/15">
              {CARDS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeStepIndex
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
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. MAIN REGION HEADING & CONTENT AREA (Synchronized Text + Image) */}
          <div className="relative z-30 max-w-xl my-auto pt-6 flex flex-col justify-center min-h-[240px]">
            {CARDS_DATA.map((card, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={card.id}
                  className={`absolute flex flex-col items-start text-left transition-all duration-700 ease-out ${isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-8 pointer-events-none"
                    }`}
                >
                  <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-300 uppercase mb-2">
                    {card.tagline}
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    {card.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-xs text-purple-200 mt-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{card.location}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-light text-gray-200 leading-relaxed max-w-md mt-3 line-clamp-3">
                    {card.description}
                  </p>
                </div>
              );
            })}
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
