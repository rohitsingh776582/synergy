"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface ApplicationSlide {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
  tag: string;
}

const SLIDES: ApplicationSlide[] = [
  {
    id: 1,
    number: "01",
    tag: "COLD STORAGE",
    title: "Cold Storage PUF Panels",
    subtitle: "Precision Thermal Control (-40°C to +15°C)",
    description:
      "Engineered for sub-zero temperature retention, zero moisture ingress, and maximum energy conservation across industrial cold rooms.",
    src: "/Panels/Designing_cold_room_PUF_panel_202608181422.jpeg",
  },
  {
    id: 2,
    number: "02",
    tag: "CLEANROOM",
    title: "Cleanroom Modular Panels",
    subtitle: "Sterile & Dust-Free Controlled Environments",
    description:
      "Seamless flush-joint panels built to ISO cleanroom standards for pharmaceutical, electronics, and biotech processing facilities.",
    src: "/Panels/Generate_clean_room_image_2K_202608181422.jpeg",
  },
  {
    id: 3,
    number: "03",
    tag: "FIRE PROTECTION",
    title: "Fire Insulation Panels",
    subtitle: "Certified Structural Safety & Thermal Barrier",
    description:
      "High-density fire-retardant insulation core designed to withstand extreme thermal exposure and satisfy stringent building safety codes.",
    src: "/Panels/Generating_fire_insulation_image_2K_202608181424.jpeg",
  },
  {
    id: 4,
    number: "04",
    tag: "THERMAL BARRIER",
    title: "Heat Insulation Systems",
    subtitle: "Industrial Energy Efficiency & Solar Reflectance",
    description:
      "Advanced roofing and wall panels engineered to reflect solar heat and reduce HVAC energy loads in large industrial structures.",
    src: "/Panels/Heat insulation.png",
  },
];

const AUTO_PLAY_INTERVAL = 1200; // 1.2s per slide (Lightning fast automatic image changes)

export default function ApplicationsImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play sequence loop: 01 -> closes RIGHT to LEFT -> 02 -> closes RIGHT to LEFT -> 03 -> 04 -> 01
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = SLIDES[currentIndex];
  const nextSlide = SLIDES[(currentIndex + 1) % SLIDES.length];

  return (
    <section className="relative w-full bg-white text-gray-900 overflow-hidden font-sans py-0">
      {/* Preload images in browser cache */}
      <div className="hidden">
        {SLIDES.map((s) => (
          <Image key={`preload-${s.id}`} src={s.src} alt="preload" width={100} height={100} priority />
        ))}
      </div>

      {/* 100% Full-Width Edge-to-Edge Container (No Top/Bottom Black Bars or Borders) */}
      <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[640px] rounded-none overflow-hidden bg-white">
        {/* Next Image Underlay - Ready underneath so as current slide closes RIGHT -> LEFT, next image is instantly revealed */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={nextSlide.src}
            alt={nextSlide.title}
            fill
            priority
            className="object-cover object-center select-none"
            sizes="100vw"
          />
        </div>

        {/* Main Current Active Image Stage */}
        <AnimatePresence>
          <motion.div
            key={currentSlide.id}
            initial={
              currentIndex === 0
                ? {
                    clipPath: "inset(50% 0% 50% 0%)", // 1st image opens from center horizontal line expanding upward and downward
                    opacity: 0,
                    scale: 1.1,
                  }
                : {
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                    scale: 1.0,
                  }
            }
            animate={{
              clipPath: "inset(0% 0% 0% 0%)", // Full expansion upward and downward
              opacity: 1,
              scale: 1.0,
            }}
            exit={
              currentIndex === 0
                ? {
                    clipPath: "inset(50% 0% 50% 0%)",
                    opacity: 0,
                  }
                : {
                    clipPath: "inset(0% 100% 0% 0%)", // Remaining images collapse/wipe from RIGHT side to LEFT side
                    opacity: 1,
                  }
            }
            transition={{
              duration: currentIndex === 0 ? 1.25 : 0.15, // 1.25s smooth center expansion for 1st image, 0.15s fast wipe for remaining
              ease: currentIndex === 0 ? [0.16, 1, 0.3, 1] : "easeInOut",
            }}
            className="absolute inset-0 w-full h-full z-20 transform-gpu will-change-transform"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.title}
              fill
              priority
              className="object-cover object-center select-none"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
