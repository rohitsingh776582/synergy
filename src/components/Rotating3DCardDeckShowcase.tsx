"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Globe, Compass, MapPin } from "lucide-react";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  {
    id: "card-1",
    step: "01",
    title: "Synergy Mega Facility",
    location: "Industrial Logistics Park",
    tagline: "CONTINUOUS PUF INSULATION FACADE",
    bgColor: "rgb(200, 214, 204)",
    image: "/Rotating3DCardDeckShowcase/ChatGPT Image Aug 27, 2026, 04_32_46 PM.png",
    description: "High-density polyurethane foam sandwich panels engineered for large-scale commercial facilities with zero thermal loss.",
  },
  {
    id: "card-2",
    step: "02",
    title: "High-Bay Logistics Unit",
    location: "Manufacturing Hub",
    tagline: "ADVANCED THERMAL ENVELOPE",
    bgColor: "rgb(226, 212, 195)",
    image: "/Rotating3DCardDeckShowcase/ChatGPT Image Aug 27, 2026, 04_34_43 PM.png",
    description: "High R-value insulated roof and wall panel system designed for severe climate endurance and structural stability.",
  },
  {
    id: "card-3",
    step: "03",
    title: "Cold Chain Storage Complex",
    location: "Sub-Zero Vault Facility",
    tagline: "CONTROLLED ATMOSPHERE ENCLOSURE",
    bgColor: "rgb(205, 215, 226)",
    image: "/Rotating3DCardDeckShowcase/ChatGPT Image Aug 27, 2026, 04_36_06 PM.png",
    description: "Custom tongue-and-groove insulated panels providing continuous vapor barriers and precision temperature control.",
  },
];

export default function Rotating3DCardDeckShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Full screen background image refs
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);

  // Content heading refs
  const heading1Ref = useRef<HTMLDivElement>(null);
  const heading2Ref = useRef<HTMLDivElement>(null);
  const heading3Ref = useRef<HTMLDivElement>(null);

  // 3D Card Refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  // Mirrors activeStepIndex without triggering re-renders — read inside the
  // scrub's onUpdate so we only ever call setState on a real step change,
  // never on every scroll tick.
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
    const bg1 = bg1Ref.current;
    const bg2 = bg2Ref.current;
    const bg3 = bg3Ref.current;

    const h1 = heading1Ref.current;
    const h2 = heading2Ref.current;
    const h3 = heading3Ref.current;

    const c1 = card1Ref.current;
    const c2 = card2Ref.current;
    const c3 = card3Ref.current;

    if (!section || !bg1 || !bg2 || !bg3 || !h1 || !h2 || !h3 || !c1 || !c2 || !c3) return;

    const ctx = gsap.context(() => {
      // 3D Perspective on cards
      gsap.set([c1, c2, c3], {
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });

      // Initial States: Card 1 / Image 1 active
      gsap.set(bg1, { opacity: 1, scale: 1, force3D: true });
      gsap.set(bg2, { opacity: 0, scale: 1.04, force3D: true });
      gsap.set(bg3, { opacity: 0, scale: 1.04, force3D: true });

      gsap.set(h1, { opacity: 1, y: 0 });
      gsap.set(h2, { opacity: 0, y: 40 });
      gsap.set(h3, { opacity: 0, y: 40 });

      if (reducedMotion) {
        // No scroll-jacked pin, no 3D spin — a calm click-through only.
        // Backgrounds/headings still crossfade (opacity), driven directly
        // by activeStepIndex in the effect below.
        return;
      }

      // Small hysteresis band around each threshold so the scrub's lag
      // smoothing can't make `progress` flicker back and forth across
      // 0.33 / 0.66 and spam setState (the real cause of the "stuck" hitches).
      const resolveStep = (progress: number, current: number) => {
        if (current === 0) return progress < 0.35 ? 0 : progress < 0.66 ? 1 : 2;
        if (current === 1) return progress < 0.31 ? 0 : progress < 0.68 ? 1 : 2;
        return progress < 0.64 ? 1 : 2;
      };

      // Master ScrollTrigger timeline with 3 distinct card background steps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=100px",
          end: "+=350%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = resolveStep(self.progress, lastIndexRef.current);
            if (next !== lastIndexRef.current) {
              lastIndexRef.current = next;
              setActiveStepIndex(next);
            }
          },
        },
      });

      // STEP 1 -> STEP 2 (Card 1 -> Card 2)
      tl.to(bg2, { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut", force3D: true }, 1.0);

      tl.to(h1, { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, 1.0);
      tl.fromTo(h2, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.4);

      // Card 3D rotations for Step 2
      tl.to(c1, { rotateY: 90, scale: 0.85, duration: 0.5, ease: "power2.in", force3D: true }, 1.0);
      tl.to(c1, { rotateY: 180, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 1.5);

      tl.to(c2, { rotateY: 90, scale: 0.85, duration: 0.5, ease: "power2.in", force3D: true }, 1.2);
      tl.to(c2, { rotateY: 180, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 1.7);

      tl.to(c3, { rotateY: 90, scale: 0.85, duration: 0.5, ease: "power2.in", force3D: true }, 1.4);
      tl.to(c3, { rotateY: 180, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 1.9);

      // ===================================================
      // STEP 2 -> STEP 3 (Card 2 -> Card 3)
      // ===================================================
      tl.to(bg3, { opacity: 1, scale: 1, duration: 1, ease: "power2.inOut", force3D: true }, 2.5);

      tl.to(h2, { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, 2.5);
      tl.fromTo(h3, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2.9);

      // Card 3D rotations for Step 3
      tl.to(c1, { rotateY: 270, scale: 0.85, duration: 0.5, ease: "power2.in", force3D: true }, 2.5);
      tl.to(c1, { rotateY: 360, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 3.0);

      tl.to(c2, { rotateY: 270, scale: 0.85, duration: 0.5, ease: "power2.in", force3D: true }, 2.7);
      tl.to(c2, { rotateY: 360, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 3.2);

      tl.to(c3, { rotateY: 270, scale: 0.85, duration: 0.5, ease: "power2.in", force3D: true }, 2.9);
      tl.to(c3, { rotateY: 360, scale: 1, duration: 0.5, ease: "power2.out", force3D: true }, 3.4);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Reduced-motion fallback: thumbnail clicks still crossfade the
  // background/heading via opacity only — no pin, no 3D spin.
  useLayoutEffect(() => {
    if (!reducedMotion) return;
    const bgs = [bg1Ref.current, bg2Ref.current, bg3Ref.current];
    const headings = [heading1Ref.current, heading2Ref.current, heading3Ref.current];
    bgs.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === activeStepIndex ? 1 : 0, duration: 0.4, ease: "power1.out", overwrite: "auto" });
    });
    headings.forEach((el, i) => {
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
        {/* Full Screen Layer 1: Card 1 Image */}
        <div
          ref={bg1Ref}
          className="absolute inset-0 z-[1] pointer-events-none will-change-transform transform-gpu"
        >
          <Image
            src={CARDS_DATA[0].image}
            alt={CARDS_DATA[0].title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Full Screen Layer 2: Card 2 Image */}
        <div
          ref={bg2Ref}
          className="absolute inset-0 z-[2] pointer-events-none opacity-0 will-change-transform transform-gpu"
        >
          <Image
            src={CARDS_DATA[1].image}
            alt={CARDS_DATA[1].title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Full Screen Layer 3: Card 3 Image */}
        <div
          ref={bg3Ref}
          className="absolute inset-0 z-[3] pointer-events-none opacity-0 will-change-transform transform-gpu"
        >
          <Image
            src={CARDS_DATA[2].image}
            alt={CARDS_DATA[2].title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Full Screen Dark Overlay for Contrast & Legibility */}
        <div className="absolute inset-0 bg-black/35 z-[5] pointer-events-none" />

        {/* Inner Content Layout Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-10 py-8 text-white">

          {/* 1. TOP NAVIGATION BAR */}
          <div className="relative z-20 flex items-center justify-end w-full">

            {/* Top Right Controls */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-300 bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/15">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase">{activeCard.step} / 03</span>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white hover:bg-white/30 transition-all active:scale-95">
                <span>Explore</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. MAIN REGION HEADING & CONTENT AREA (Middle Left) */}
          <div className="relative z-20 max-w-xl my-auto pt-6 flex flex-col justify-center min-h-[220px]">
            {/* HEADING 1: Card 1 */}
            <div ref={heading1Ref} className="absolute flex flex-col items-start text-left will-change-transform transform-gpu">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-emerald-300 uppercase mb-2">
                {CARDS_DATA[0].tagline}
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {CARDS_DATA[0].title}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-purple-200 mt-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{CARDS_DATA[0].location}</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-gray-200 leading-relaxed max-w-md mt-3 line-clamp-3">
                {CARDS_DATA[0].description}
              </p>
            </div>

            {/* HEADING 2: Card 2 */}
            <div ref={heading2Ref} className="absolute flex flex-col items-start text-left opacity-0 will-change-transform transform-gpu">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-300 uppercase mb-2">
                {CARDS_DATA[1].tagline}
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {CARDS_DATA[1].title}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-amber-200 mt-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{CARDS_DATA[1].location}</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-gray-200 leading-relaxed max-w-md mt-3 line-clamp-3">
                {CARDS_DATA[1].description}
              </p>
            </div>

            {/* HEADING 3: Card 3 */}
            <div ref={heading3Ref} className="absolute flex flex-col items-start text-left opacity-0 will-change-transform transform-gpu">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-300 uppercase mb-2">
                {CARDS_DATA[2].tagline}
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {CARDS_DATA[2].title}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-cyan-200 mt-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{CARDS_DATA[2].location}</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-gray-200 leading-relaxed max-w-md mt-3 line-clamp-3">
                {CARDS_DATA[2].description}
              </p>
            </div>
          </div>

          {/* 3. RIGHT-SIDE 3D ROTATING IMAGE CARDS SYSTEM */}
          <div
            className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-4"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {/* Card 1 — glow is a separate static-blur layer whose only
              animated property is opacity, so it never fights GSAP for
              control of `transform` on the card itself. */}
            <div className="relative">
              <div
                aria-hidden
                className={`absolute -inset-1.5 rounded-xl bg-emerald-400/40 blur-lg transition-opacity duration-500 ${activeStepIndex === 0 ? "opacity-100" : "opacity-0"
                  }`}
              />
              <div
                ref={card1Ref}
                onClick={() => setActiveStepIndex(0)}
                className={`relative w-28 lg:w-36 h-40 lg:h-52 rounded-xl overflow-hidden border cursor-pointer transition-[border-color,opacity] duration-500 will-change-transform transform-gpu ${activeStepIndex === 0
                    ? "border-emerald-400 opacity-100 z-30"
                    : "border-white/30 opacity-70 hover:opacity-100"
                  }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={CARDS_DATA[0].image}
                  alt="Destination Card 1"
                  fill
                  sizes="(max-width: 1024px) 112px, 144px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative">
              <div
                aria-hidden
                className={`absolute -inset-1.5 rounded-xl bg-amber-400/40 blur-lg transition-opacity duration-500 ${activeStepIndex === 1 ? "opacity-100" : "opacity-0"
                  }`}
              />
              <div
                ref={card2Ref}
                onClick={() => setActiveStepIndex(1)}
                className={`relative w-32 lg:w-40 h-48 lg:h-60 rounded-xl overflow-hidden border cursor-pointer transition-[border-color,opacity] duration-500 will-change-transform transform-gpu ${activeStepIndex === 1
                    ? "border-amber-400 opacity-100 z-30"
                    : "border-white/30 opacity-70 hover:opacity-100"
                  }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={CARDS_DATA[1].image}
                  alt="Destination Card 2"
                  fill
                  sizes="(max-width: 1024px) 128px, 160px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative">
              <div
                aria-hidden
                className={`absolute -inset-1.5 rounded-xl bg-cyan-400/40 blur-lg transition-opacity duration-500 ${activeStepIndex === 2 ? "opacity-100" : "opacity-0"
                  }`}
              />
              <div
                ref={card3Ref}
                onClick={() => setActiveStepIndex(2)}
                className={`relative w-28 lg:w-36 h-40 lg:h-52 rounded-xl overflow-hidden border cursor-pointer transition-[border-color,opacity] duration-500 will-change-transform transform-gpu ${activeStepIndex === 2
                    ? "border-cyan-400 opacity-100 z-30"
                    : "border-white/30 opacity-70 hover:opacity-100"
                  }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={CARDS_DATA[2].image}
                  alt="Destination Card 3"
                  fill
                  sizes="(max-width: 1024px) 112px, 144px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
