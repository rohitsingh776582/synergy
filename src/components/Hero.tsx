"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Container from "./Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PillarData {
  id: string;
  name: string;
  tagline: string;
  headline: React.ReactNode;
  description: string;
  badges: string[];
  ctaText: string;
  ctaHref: string;
}

const PILLARS: PillarData[] = [
  {
    id: "products",
    name: "Products",
    tagline: "INDUSTRIAL PUF PANEL MANUFACTURER",
    headline: (
      <>
        High Density <br className="hidden sm:block" />
        PUF Insulated Panels
      </>
    ),
    description:
      "Roofing, wall and cold storage panels engineered for India's industrial and commercial infrastructure.",
    badges: ["BIS CERTIFIED", "FM APPROVED", "ISO 9001", "30-DAY PAN-INDIA DELIVERY"],
    ctaText: "Explore Products",
    ctaHref: "/products",
  },
  {
    id: "cold-chain",
    name: "Cold Chain",
    tagline: "TEMPERATURE CONTROLLED SOLUTIONS",
    headline: (
      <>
        Precision Cold Room <br className="hidden sm:block" />
        & Thermal Enclosures
      </>
    ),
    description:
      "Advanced thermal insulation designed for pharmaceuticals, food processing facilities, and blast freezers with zero thermal bridging.",
    badges: ["ZERO THERMAL BRIDGING", "AIRTIGHT CAM-LOCK", "HYGIENIC SURFACES", "PAN-INDIA SUPPLY"],
    ctaText: "Cold Storage Panels",
    ctaHref: "/applications",
  },
  {
    id: "quality",
    name: "Quality",
    tagline: "UNCOMPROMISING STANDARDS",
    headline: (
      <>
        Certified Fire Safety <br className="hidden sm:block" />
        & Rigid Insulation
      </>
    ),
    description:
      "Manufactured with 40±2 kg/m³ rigid polyurethane foam featuring PIR/B1/B2 fire retardant grades and ISO 9001 quality compliance.",
    badges: ["B1/B2 FIRE RATED", "ISO 9001:2015", "ZERO CFC/HCFC", "40±2 KG/M³ DENSITY"],
    ctaText: "View Specifications",
    ctaHref: "/about",
  },
  {
    id: "delivery",
    name: "Delivery",
    tagline: "NATIONWIDE SUPPLY CHAIN",
    headline: (
      <>
        Rapid Pan-India <br className="hidden sm:block" />
        Manufacturing & Logistics
      </>
    ),
    description:
      "Fleet-managed distribution networks ensuring on-time project execution within 30 days anywhere in India.",
    badges: ["30-DAY TURNAROUND", "PAN-INDIA REACH", "ON-SITE SUPPORT", "FLEET TRACKING"],
    ctaText: "Get Instant Quote",
    ctaHref: "/quote",
  },
  {
    id: "legacy",
    name: "Legacy",
    tagline: "15+ YEARS ENGINEERING EXCELLENCE",
    headline: (
      <>
        Trusted Building <br className="hidden sm:block" />
        Envelopes Across India
      </>
    ),
    description:
      "Over 100+ industrial infrastructure projects completed with proven structural reliability, longevity, and insulation performance.",
    badges: ["100+ PROJECTS", "15+ YEARS EXCELLENCE", "TOP INDUSTRIAL CLIENTS", "END-TO-END SUPPORT"],
    ctaText: "View All Projects",
    ctaHref: "/projects",
  },
];

export default function Hero() {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const heroEl = heroRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroEl,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const activePillar = PILLARS[activePillarIndex];

  return (
    <section className="relative z-10 flex w-full flex-col justify-center text-white pt-4 pb-8 sm:pt-6 sm:pb-12 -mt-4 sm:-mt-8 md:-mt-10">
      <Container>
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Left-aligned Active Content Display */}
          <div className="lg:col-span-8 flex flex-col items-start text-left min-h-[320px] justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                {/* Top Tagline */}
                <span className="text-xs sm:text-sm font-semibold tracking-[0.12em] text-white/80 uppercase mb-3 sm:mb-4">
                  {activePillar.tagline}
                </span>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.12]">
                  {activePillar.headline}
                </h1>

                {/* Subtitle Paragraph */}
                <p className="mt-5 text-sm sm:text-base md:text-lg font-light text-white/90 leading-relaxed max-w-2xl">
                  {activePillar.description}
                </p>

                {/* Action CTA Button */}
                <div className="mt-7 flex items-center gap-4">
                  <Link
                    href={activePillar.ctaHref}
                    className="inline-flex items-center gap-2 bg-[#58166A] hover:bg-[#461056] text-white px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span>{activePillar.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Bottom Badges Bar */}
                <div className="mt-10 sm:mt-12 flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-white/80 uppercase flex-wrap">
                  {activePillar.badges.map((badge, bIdx) => (
                    <React.Fragment key={badge}>
                      {bIdx > 0 && <span className="text-white/40">•</span>}
                      <span>{badge}</span>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Glassmorphic Core Pillars Navigation Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-full max-w-sm lg:w-80 bg-black/40 backdrop-blur-xl border border-white/20 p-5 sm:p-6">
              <div className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#d8b4fe] uppercase mb-4 px-2">
                CORE PILLARS
              </div>
              <div className="flex flex-col gap-2">
                {PILLARS.map((pillar, idx) => {
                  const isActive = activePillarIndex === idx;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActivePillarIndex(idx)}
                      className={`relative w-full text-left px-5 py-3.5 text-base font-medium transition-all duration-300 flex items-center justify-between cursor-pointer ${isActive
                          ? "bg-[#58166A] text-white font-semibold scale-[1.02]"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <span>{pillar.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activePillarDot"
                          className="w-2 h-2 bg-white"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


