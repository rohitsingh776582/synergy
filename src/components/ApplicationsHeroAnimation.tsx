"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Container from "./Container";

export interface HeroCardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  category?: string;
}

export const HERO_CARDS: HeroCardItem[] = [
  {
    id: "industrial-buildings",
    title: "Industrial Buildings",
    subtitle:
      "Turnkey factories and production facilities engineered for maximum thermal performance and durability.",
    image: "/Rotating3DCardDeckShowcase/DJI_20260729132544_0302_D.JPG.jpeg",
    link: "/applications/warehouses-and-factories",
    category: "Industrial Solutions",
  },
  {
    id: "warehouses",
    title: "Warehouses",
    subtitle:
      "High-bay automated logistics centers and storage hubs engineered with airtight vapor barriers.",
    image: "/images/Servicestailored/Logistics & Warehousing.jpg",
    link: "/applications/warehouses-and-factories",
    category: "Logistics & Storage",
  },
  {
    id: "factories",
    title: "Factories",
    subtitle:
      "Heavy manufacturing plants built with fire-safe acoustic and temperature-regulated PUF wall panels.",
    image: "/images/Servicestailored/Industrial & Manufacturing.jpg",
    link: "/applications/warehouses-and-factories",
    category: "Manufacturing",
  },
  {
    id: "logistics-parks",
    title: "Logistics Parks",
    subtitle:
      "Commercial transport infrastructure with long-span sandwich panel roofing and modern facades.",
    image: "/Rotating3DCardDeckShowcase/DJI_20260729180801_0362_D.JPG.jpeg",
    link: "/applications/warehouses-and-factories",
    category: "Infrastructure",
  },
  {
    id: "complex-steel",
    title: "Complex Steel Structures",
    subtitle:
      "Pre-engineered structural steel envelopes integrated seamlessly with precision PUF insulated sheets.",
    image: "/Rotating3DCardDeckShowcase/DJI_20260729151448_0337_D.JPG.jpeg",
    link: "/products",
    category: "Structural Engineering",
  },
];

export default function ApplicationsHeroAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play cycling every 4.5 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CARDS.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <section className="w-full bg-[#F7F7F9] py-8 sm:py-12 md:py-16 select-none font-sans overflow-hidden">
      <Container>
        {/* Interactive Accordion Container */}
        <div
          className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] flex flex-col md:flex-row gap-2.5 sm:gap-3.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {HERO_CARDS.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                layout
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                }}
                className={`relative overflow-hidden cursor-pointer rounded-2xl md:rounded-3xl border border-black/5 shadow-sm transition-shadow duration-300 ${
                  isActive
                    ? "flex-[4] md:flex-[3.8] shadow-xl"
                    : "flex-1 md:flex-[0.85] hover:opacity-95"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index <= 1}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover object-center transition-transform duration-700 ease-out ${
                    isActive ? "scale-100" : "scale-105 filter brightness-[0.82] hover:brightness-100"
                  }`}
                />

                {/* Ambient Dark Gradient Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/85 via-black/30 to-black/20"
                      : "bg-gradient-to-t from-black/80 via-black/40 to-black/30"
                  }`}
                />

                {/* Top-Right Arrow Icon (Visible on Active Card) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.7, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20"
                    >
                      <Link
                        href={item.link}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${item.title}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-md group"
                      >
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Expanded Card Content (Bottom Aligned) */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10 z-20 flex flex-col justify-end text-center md:text-left"
                  >
                    {item.category && (
                      <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 w-fit mx-auto md:mx-0">
                        <Sparkles className="w-3 h-3 text-[#FF8A65]" />
                        <span>{item.category}</span>
                      </div>
                    )}

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-2 sm:mb-3 drop-shadow-md">
                      {item.title}
                    </h2>

                    <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed max-w-xl mx-auto md:mx-0 drop-shadow-sm line-clamp-2 sm:line-clamp-3">
                      {item.subtitle}
                    </p>
                  </motion.div>
                )}

                {/* Inactive / Collapsed Card Label */}
                {!isActive && (
                  <div className="absolute inset-0 z-20 flex flex-col justify-end items-center p-4">
                    {/* Desktop / Tablet Vertical Text */}
                    <div className="hidden md:flex flex-col items-center justify-end h-full pb-8">
                      <span
                        className="text-white text-base sm:text-lg lg:text-xl font-bold tracking-wide whitespace-nowrap drop-shadow-lg [writing-mode:vertical-rl] rotate-180"
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* Mobile Horizontal Text when collapsed */}
                    <div className="md:hidden flex items-center justify-between w-full">
                      <span className="text-white text-sm font-semibold tracking-wide truncate">
                        {item.title}
                      </span>
                      <span className="text-white/60 text-xs font-mono">
                        0{index + 1}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
