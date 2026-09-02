"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Globe, MapPin } from "lucide-react";

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
    image: "/Rotating3DCardDeckShowcase/DJI_20260729142356_0322_D.JPG.jpeg",
    description:
      "High R-value insulated roof and wall panel system designed for severe climate endurance and structural stability.",
  },
  {
    id: "card-3",
    step: "03",
    title: "Cold Chain Storage Complex",
    location: "Sub-Zero Vault Facility",
    tagline: "CONTROLLED ATMOSPHERE ENCLOSURE",
    image: "/Rotating3DCardDeckShowcase/DJI_20260729151448_0337_D.JPG.jpeg",
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
  const bgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headingRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const lastIndexRef = useRef(0);

  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const bgs = bgRefs.current.filter(Boolean);
    const headings = headingRefs.current.filter(Boolean);

    if (bgs.length < CARDS_DATA.length || headings.length < CARDS_DATA.length) return;

    const ctx = gsap.context(() => {
      // Setup initial states
      bgs.forEach((bg, idx) => {
        if (!bg) return;
        gsap.set(bg, {
          opacity: idx === 0 ? 1 : 0,
          scale: idx === 0 ? 1 : 1.04,
          force3D: true,
        });
      });

      headings.forEach((h, idx) => {
        if (!h) return;
        gsap.set(h, {
          opacity: idx === 0 ? 1 : 0,
          y: idx === 0 ? 0 : 40,
        });
      });

      if (reducedMotion) return;

      const totalSteps = CARDS_DATA.length;
      const resolveStep = (progress: number) => {
        const rawStep = Math.floor(progress * totalSteps);
        return Math.min(totalSteps - 1, Math.max(0, rawStep));
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=100px",
          end: `+=${totalSteps * 110}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = resolveStep(self.progress);
            if (next !== lastIndexRef.current) {
              lastIndexRef.current = next;
              setActiveStepIndex(next);
            }
          },
        },
      });

      // Animate transitions between 5 steps
      for (let i = 1; i < totalSteps; i++) {
        const timePos = i * 1.5;
        const prevBg = bgs[i - 1];
        const currentBg = bgs[i];
        const prevH = headings[i - 1];
        const currentH = headings[i];

        if (currentBg) {
          tl.to(currentBg, { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut", force3D: true }, timePos);
        }
        if (prevH) {
          tl.to(prevH, { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, timePos);
        }
        if (currentH) {
          tl.fromTo(currentH, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, timePos + 0.4);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Reduced-motion fallback crossfade
  useLayoutEffect(() => {
    if (!reducedMotion) return;
    bgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === activeStepIndex ? 1 : 0, duration: 0.4, ease: "power1.out", overwrite: "auto" });
    });
    headingRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === activeStepIndex ? 1 : 0, duration: 0.4, ease: "power1.out", overwrite: "auto" });
    });
  }, [activeStepIndex, reducedMotion]);

  const activeCard = CARDS_DATA[activeStepIndex] || CARDS_DATA[0];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen py-5 px-5 md:px-10 lg:px-[50px] flex items-center justify-center font-sans select-none"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center bg-black">
        {/* Background Fullscreen Image Layers */}
        {CARDS_DATA.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => {
              bgRefs.current[idx] = el;
            }}
            className={`absolute inset-0 z-[${idx + 1}] pointer-events-none ${idx > 0 ? "opacity-0" : "opacity-100"} will-change-transform transform-gpu`}
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

        {/* Full Screen Dark Overlay for Contrast & Legibility */}
        <div className="absolute inset-0 bg-black/35 z-[10] pointer-events-none" />

        {/* Inner Content Layout Container */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between px-6 sm:px-10 py-8 text-white">

          {/* 1. TOP NAVIGATION BAR */}
          <div className="relative z-30 flex items-center justify-end w-full">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-300 bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/15">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase">{activeCard.step} / 05</span>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white hover:bg-white/30 transition-all active:scale-95">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. MAIN REGION HEADING & CONTENT AREA */}
          <div className="relative z-30 max-w-xl my-auto pt-6 flex flex-col justify-center min-h-[240px]">
            {CARDS_DATA.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => {
                  headingRefs.current[idx] = el;
                }}
                className={`absolute flex flex-col items-start text-left ${idx > 0 ? "opacity-0" : "opacity-100"} will-change-transform transform-gpu`}
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
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
