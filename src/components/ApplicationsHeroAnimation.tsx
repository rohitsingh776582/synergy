"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, RotateCcw, Smartphone } from "lucide-react";

// Accent color constant: #FF6542
const ACCENT_COLOR = "#FF6542";

// 6 Full-bleed images for Stage 2 flash slideshow & Stage 3 cards (Using public/Panels images)
const INTRO_IMAGES = [
  {
    id: "card-1",
    num: "01",
    title: "Cold Storage PUF Panel",
    tag: "Sub-Zero (-40°C)",
    src: "/Panels/Designing_cold_room_PUF_panel_202608181422.jpeg",
    link: "/applications/cold-storage",
  },
  {
    id: "card-2",
    num: "02",
    title: "Cleanroom Modular System",
    tag: "ISO Class Clean",
    src: "/Panels/Generate_clean_room_image_2K_202608181422.jpeg",
    link: "/applications/cleanrooms",
  },
  {
    id: "card-3",
    num: "03",
    title: "Fire Insulation Shield",
    tag: "Thermal & Fire Barrier",
    src: "/Panels/Generating_fire_insulation_image_2K_202608181424.jpeg",
    link: "/applications/industrial",
  },
  {
    id: "card-4",
    num: "04",
    title: "Heat Insulation Panel",
    tag: "High Energy Efficiency",
    src: "/Panels/Heat insulation.png",
    link: "/projects",
  },
  {
    id: "card-5",
    num: "05",
    title: "Cold Room Enclosure",
    tag: "Precision Temperature",
    src: "/Panels/Designing_cold_room_PUF_panel_202608181422.jpeg",
    link: "/projects",
  },
  {
    id: "card-6",
    num: "06",
    title: "Sterile Cleanroom Wall",
    tag: "Modular Wall Core",
    src: "/Panels/Generate_clean_room_image_2K_202608181422.jpeg",
    link: "/products",
  },
];

// Split text helper for Stage 4 character animation
const HEADLINE_LINES = [
  "Engineering",
  "Precision Thermal",
  "Excellence",
];

export default function ApplicationsHeroAnimation() {
  // Stage state: 2 (Fullscreen Flash Intro), 3 (Shrink to Cards), 4 (Text Reveal), 5 (Supporting Content)
  const [stage, setStage] = useState<2 | 3 | 4 | 5>(2);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<"1" | "2">("1");
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  // Screen orientation detection
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== "undefined") {
        setIsPortraitMobile(
          window.innerWidth < 768 && window.innerHeight > window.innerWidth
        );
      }
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Stage 2: Rapid Flash Slideshow Intro (Slower & smoother speed)
  useEffect(() => {
    if (stage !== 2) return;

    let flashCount = 0;
    const maxFlashes = 6;
    const interval = setInterval(() => {
      flashCount++;
      setActiveSlideIndex((prev) => (prev + 1) % INTRO_IMAGES.length);

      if (flashCount >= maxFlashes) {
        clearInterval(interval);
        setTimeout(() => {
          setStage(3); // Transition to Stage 3 (Shrink to cards)
        }, 500);
      }
    }, 750); // Crossfade every 750ms

    return () => clearInterval(interval);
  }, [stage]);

  // Trigger Stage 4 & Stage 5 in sequence after Stage 3
  useEffect(() => {
    if (stage === 3) {
      const t4 = setTimeout(() => setStage(4), 500);
      const t5 = setTimeout(() => setStage(5), 1100);
      return () => {
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, [stage]);

  // Restart complete animation sequence
  const handleReplay = () => {
    setStage(2);
    setActiveSlideIndex(0);
  };

  return (
    <section className="relative w-full min-h-[600px] bg-[#F7F7F9] text-gray-900 overflow-hidden font-sans select-none">
      {/* Mobile Orientation Alert */}
      {isPortraitMobile && (
        <div className="absolute top-4 inset-x-4 z-50 bg-white/95 border border-[#FF6542]/40 rounded-lg p-3 backdrop-blur-md flex items-center justify-between text-xs text-gray-700 shadow-xl">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#FF6542] animate-bounce" />
            <span>Optimal experience in landscape orientation</span>
          </div>
          <button
            onClick={() => setIsPortraitMobile(false)}
            className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-black px-2 py-1 bg-gray-100 rounded"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* STAGE 2 — Fullscreen Rapid Flash Intro */}
      <AnimatePresence mode="wait">
        {stage === 2 && (
          <motion.div
            key="flash-slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 z-40 w-full h-full min-h-[600px]"
          >
            {INTRO_IMAGES.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: idx === activeSlideIndex ? 1 : 0,
                  scale: idx === activeSlideIndex ? 1 : 1.05,
                  filter: idx === 0 ? "blur(8px)" : "blur(0px)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

                {/* Sub-label during flash reveal */}
                <div className="absolute bottom-12 left-10 text-mono text-xs font-mono tracking-widest text-white/90 uppercase">
                  <span className="mr-3" style={{ color: ACCENT_COLOR }}>
                    [{img.num}]
                  </span>
                  {img.title} — {img.tag}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 3, 4 & 5 — Main Editorial Hero Layout (Cards, Split Text, Controls) */}
      {stage >= 3 && (
        <div className="relative w-full h-full z-30 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          {/* TOP BAR / NAVIGATION ACCENTS */}
          <div className="flex justify-between items-start z-40">
            {/* Top Left Space */}
            <div />

            {/* Top Right Layout Switcher & Replay */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full p-1 backdrop-blur-md">
                <button
                  onClick={() => setLayoutMode("1")}
                  className={`w-7 h-7 rounded-full text-xs font-mono font-medium transition-all ${layoutMode === "1"
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-500 hover:text-black"
                    }`}
                  title="Layout Option 1"
                >
                  1
                </button>
                <button
                  onClick={() => setLayoutMode("2")}
                  className={`w-7 h-7 rounded-full text-xs font-mono font-medium transition-all ${layoutMode === "2"
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-500 hover:text-black"
                    }`}
                  title="Layout Option 2"
                >
                  2
                </button>
              </div>

              <button
                onClick={handleReplay}
                className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 hover:border-gray-400 flex items-center justify-center text-gray-600 hover:text-black transition-all backdrop-blur-md"
                title="Replay Animation Intro"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* MAIN CONTENT CENTER / GRID */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-7xl mx-auto pt-2 pb-4">
            {/* LEFT COLUMN: Stage 4 Character-by-Character Split Text Reveal */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">

              {/* Headline Split-Text Character Reveal */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] font-sans text-gray-900">
                {HEADLINE_LINES.map((line, lineIdx) => (
                  <div key={lineIdx} className="overflow-hidden flex flex-wrap">
                    {line.split("").map((char, charIdx) => {
                      const totalIndex = lineIdx * 20 + charIdx;
                      return (
                        <motion.span
                          key={charIdx}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{
                            opacity: stage >= 4 ? 1 : 0,
                            y: stage >= 4 ? 0 : 40,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: stage >= 4 ? totalIndex * 0.015 : 0,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      );
                    })}
                  </div>
                ))}
              </h1>

              {/* Subtext description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: stage >= 4 ? 1 : 0, y: stage >= 4 ? 0 : 15 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-600 text-sm sm:text-base max-w-lg font-light leading-relaxed"
              >
                Next-generation PUF insulated wall & roof panel systems designed for
                extreme thermal protection, cleanroom sterility, and structural endurance.
              </motion.p>
            </div>

            {/* RIGHT COLUMN: Stage 3 FLIP Shrunk Cards & Stage 5 Secondary Photo */}
            <div className="lg:col-span-5 relative h-[420px] sm:h-[460px] flex items-center justify-center">
              {/* STAGE 3: 4 Shrunk Cards with Spring Easing (stiffness: 80, damping: 20) */}
              {INTRO_IMAGES.slice(0, 4).map((card, idx) => {
                // Layout 1 vs Layout 2 position configurations for 4 cards
                const positionLayout1 = [
                  { top: "4%", left: "2%", rotate: -4, zIndex: 40 },
                  { top: "26%", left: "36%", rotate: 3, zIndex: 30 },
                  { top: "50%", left: "6%", rotate: -2, zIndex: 20 },
                  { top: "73%", left: "38%", rotate: 4, zIndex: 10 },
                ];

                const positionLayout2 = [
                  { top: "5%", left: "40%", rotate: 2, zIndex: 10 },
                  { top: "27%", left: "4%", rotate: -5, zIndex: 40 },
                  { top: "50%", left: "42%", rotate: 3, zIndex: 20 },
                  { top: "73%", left: "8%", rotate: -3, zIndex: 30 },
                ];

                const pos =
                  layoutMode === "1" ? positionLayout1[idx] : positionLayout2[idx];

                return (
                  <motion.div
                    key={card.id}
                    layoutId={card.id}
                    initial={{
                      scale: 3.5,
                      opacity: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      top: pos.top,
                      left: pos.left,
                      rotate: pos.rotate,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 20,
                      delay: idx * 0.1,
                    }}
                    style={{ zIndex: pos.zIndex }}
                    className="absolute pointer-events-none select-none"
                  >
                    <div className="flex items-center gap-3 bg-white border border-gray-200 p-2 rounded-xl backdrop-blur-md">
                      {/* Shrunk Image (85x80px card) */}
                      <div className="relative w-[85px] h-[80px] rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image
                          src={card.src}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                      </div>

                      {/* Numeric & Label beside card */}
                      <div className="pr-3 flex flex-col justify-center">
                        <span
                          className="text-xs font-mono font-bold tracking-wider"
                          style={{ color: ACCENT_COLOR }}
                        >
                          [{card.num}]
                        </span>
                        <span className="text-xs font-semibold text-gray-900 max-w-[110px] truncate block leading-tight mt-0.5">
                          {card.title}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono tracking-tight mt-1">
                          {card.tag}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* STAGE 5 — Supporting Image (Portrait/Team Photo) */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{
                  opacity: stage >= 5 ? 1 : 0,
                  x: stage >= 5 ? 0 : 40,
                  scale: stage >= 5 ? 1 : 0.9,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute right-0 bottom-2 w-48 sm:w-56 h-64 sm:h-72 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 pointer-events-none hidden sm:block opacity-90 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/Panels/Heat insulation.png"
                  alt="Synergy PUF Thermal Insulation"
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white uppercase tracking-widest font-semibold">
                  ISO 9001:2026 CERTIFIED
                </div>
              </motion.div>
            </div>
          </div>

          {/* STAGE 5 — Footer Info Block (Copyright, Address, Social Links - 12px uppercase) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px] font-mono text-gray-500 uppercase tracking-widest pt-4 border-t border-gray-200 z-40"
          >
            {/* Bottom Left: Copyright */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>© 2026 SYNERGY PUF INSULATION</span>
            </div>

            {/* Bottom Center: Address */}
            <div className="text-left md:text-center text-gray-500">
              INDUSTRIAL ZONE, SECTOR 4, INDIA
            </div>

            {/* Bottom Right: Social Links */}
            <div className="flex items-center justify-start md:justify-end gap-6 text-gray-500">
              <a
                href="#linkedin"
                className="hover:text-black transition-colors font-semibold"
                style={{ color: ACCENT_COLOR }}
              >
                LINKEDIN
              </a>
              <a href="#instagram" className="hover:text-black transition-colors">
                INSTAGRAM
              </a>
              <a href="#twx" className="hover:text-black transition-colors">
                X.COM
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
