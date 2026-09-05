"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Container from "./Container";

const PRODUCTS_HERO_LINES = [
  ["Insulated", "panel", "systems"],
  ["engineered", "to", "perform."],
];

let productsHeroCounter = 0;
const PREPROCESSED_PRODUCTS_HERO = PRODUCTS_HERO_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: productsHeroCounter++,
    }))
  )
);
const TOTAL_PRODUCTS_HERO_CHARS = productsHeroCounter;

function ScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const startScroll = 0.02;
  const endScroll = 0.40;
  const step = (endScroll - startScroll) / total;

  const letterStart = startScroll + index * step;
  const letterEnd = letterStart + step * 1.3;

  const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-20, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  name: string;
  image: string;
  series: string;
  types: string;
  thickness: string;
  density: string;
  facing: string;
  specs?: ProductSpec[];
}

export const categoryTabs = [
  { id: "puf", label: "PUF Panels" },
  { id: "pir", label: "PIR Panels" },
  { id: "specialty", label: "Rockwool Panels" },
];

export const panelProducts: Record<string, ProductItem[]> = {
  puf: [
    {
      id: "01",
      name: "Single Skin Roof Panel",
      image: "/images/products/roof_panel_hero.png",
      series: "PUF Series",
      types: "PUF Wall / Roof",
      thickness: "50–200mm",
      density: "40–45 kg/m³",
      facing: "Pre-painted steel sheet",
      specs: [
        { label: "Core Density", value: "40–45 kg/m³" },
        { label: "Thermal Conductivity", value: "0.0214 W/m·K" },
        { label: "Temperature Range", value: "−20°C to +110°C" },
        { label: "Water Absorption", value: "≤ 0.2%" },
        { label: "Water Vapour Permeability", value: "0.11 gm/hr/m²" },
        { label: "Fire Performance", value: "Self-extinguishing" },
      ],
    },
    {
      id: "02",
      name: "Double Skin Wall Panel",
      image: "/images/products/wall_panel_hero.png",
      series: "PUF Series",
      types: "Tongue & Groove Wall",
      thickness: "30–150mm",
      density: "40–45 kg/m³",
      facing: "PPGI / Stainless Steel",
      specs: [
        { label: "Core Density", value: "40–45 kg/m³" },
        { label: "Thermal Conductivity", value: "0.0214 W/m·K" },
        { label: "Temperature Range", value: "−20°C to +110°C" },
        { label: "Water Absorption", value: "≤ 0.2%" },
        { label: "Water Vapour Permeability", value: "0.11 gm/hr/m²" },
        { label: "Fire Performance", value: "Self-extinguishing" },
      ],
    },
    {
      id: "03",
      name: "Cold Storage Insulation Panel",
      image: "/cold_storage.png",
      series: "PUF Series",
      types: "Cam-lock Interlocking",
      thickness: "80–200mm",
      density: "40–45 kg/m³",
      facing: "Pre-painted Galvanized Steel",
      specs: [
        { label: "Core Density", value: "40–45 kg/m³" },
        { label: "Thermal Conductivity", value: "0.0214 W/m·K" },
        { label: "Temperature Range", value: "−20°C to +110°C" },
        { label: "Water Absorption", value: "≤ 0.2%" },
        { label: "Water Vapour Permeability", value: "0.11 gm/hr/m²" },
        { label: "Fire Performance", value: "Self-extinguishing" },
      ],
    },
  ],
  pir: [
    {
      id: "01",
      name: "PIR Fire-Rated Wall Panel",
      image: "/puf_panel_stack.png",
      series: "PIR Series",
      types: "Fire-Resistant PIR",
      thickness: "30–200mm",
      density: "40–45 kg/m³",
      facing: "High Durability Steel",
      specs: [
        { label: "Core Density", value: "40–45 kg/m³" },
        { label: "Thermal Conductivity", value: "≤ 0.022 W/m·K" },
        { label: "Temperature Range", value: "-40°C to +120°C" },
        { label: "Fire Performance", value: "FM / EN standard" },
        { label: "Compressive Strength", value: "≥ 150 kPa" },
        { label: "Closed Cell Content", value: "≥ 90%" },
      ],
    },
    {
      id: "02",
      name: "PIR High Thermal Roof Panel",
      image: "/puf_roof_panel.png",
      series: "PIR Series",
      types: "Ribbed Roof Profile",
      thickness: "30–200mm",
      density: "40–45 kg/m³",
      facing: "Alu-Zinc Coated Sheet",
      specs: [
        { label: "Core Density", value: "40–45 kg/m³" },
        { label: "Thermal Conductivity", value: "≤ 0.022 W/m·K" },
        { label: "Temperature Range", value: "-40°C to +120°C" },
        { label: "Fire Performance", value: "FM / EN standard" },
        { label: "Compressive Strength", value: "≥ 150 kPa" },
        { label: "Closed Cell Content", value: "≥ 90%" },
      ],
    },
  ],
  specialty: [
    {
      id: "01",
      name: "Cleanroom Modular Panel",
      image: "/cleanroom_panel.png",
      series: "Rockwool Series",
      types: "Hygienic Sealed Joint",
      thickness: "50–200mm",
      density: "100–120 kg/m³",
      facing: "Anti-Bacterial Coated Steel",
      specs: [
        { label: "Core Density", value: "100–120 kg/m³" },
        { label: "Thermal Conductivity", value: "0.040–0.045 W/m·K" },
        { label: "Temperature Resistance", value: "Up to 750°C" },
        { label: "Reaction to Fire", value: "Non-combustible (Euroclass A1)" },
        { label: "Fire Rating", value: "Up to 4 Hours" },
        { label: "Sound Reduction", value: "Up to 35 dB" },
      ],
    },
    {
      id: "02",
      name: "Acoustic Insulation Panel",
      image: "/puf_factory.png",
      series: "Rockwool Series",
      types: "Perforated Soundproof",
      thickness: "50–200mm",
      density: "100–120 kg/m³",
      facing: "Perforated Steel & Mesh",
      specs: [
        { label: "Core Density", value: "100–120 kg/m³" },
        { label: "Thermal Conductivity", value: "0.040–0.045 W/m·K" },
        { label: "Temperature Resistance", value: "Up to 750°C" },
        { label: "Reaction to Fire", value: "Non-combustible (Euroclass A1)" },
        { label: "Fire Rating", value: "Up to 4 Hours" },
        { label: "Sound Reduction", value: "Up to 35 dB" },
      ],
    },
  ],
};

interface ProductsHeroProps {
  activeTab: string;
  activeSlide: number;
  onTabChange: (tabId: string) => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onSlideSelect: (idx: number) => void;
  currentProduct: ProductItem;
  currentProducts: ProductItem[];
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -180 : 180,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function ProductsHero({
  activeTab,
  activeSlide,
  onTabChange,
  onPrevSlide,
  onNextSlide,
  onSlideSelect,
  currentProduct,
  currentProducts,
}: ProductsHeroProps) {
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    onNextSlide();
  };

  const handlePrev = () => {
    setDirection(-1);
    onPrevSlide();
  };

  // Automatic slide animation loop (every 3.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      onNextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, [onNextSlide, activeSlide, activeTab]);

  const prevProduct =
    currentProducts[(activeSlide - 1 + currentProducts.length) % currentProducts.length]!;
  const nextProduct =
    currentProducts[(activeSlide + 1) % currentProducts.length]!;

  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothTitleProgress = useSpring(titleScrollProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section className="pt-12 pb-16 text-center overflow-hidden">
      <Container>
        <h1 ref={titleRef} className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.15]">
          {PREPROCESSED_PRODUCTS_HERO.map((line, lineIdx) => (
            <React.Fragment key={lineIdx}>
              {lineIdx > 0 && <br className="hidden sm:inline" />}
              {line.map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
                >
                  {word.map((item) => (
                    <ScrollLetter
                      key={item.index}
                      char={item.char}
                      index={item.index}
                      total={TOTAL_PRODUCTS_HERO_CHARS}
                      progress={smoothTitleProgress}
                    />
                  ))}
                </span>
              ))}
            </React.Fragment>
          ))}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
          PUF fit and crafted for all roofings and walling premium quality, custom configurations.
        </p>
      </Container>

      {/* Category Filter Tabs */}
      <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
        {categoryTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${isActive
                ? "bg-[#5b176e] text-white "
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200/60"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Product Carousel Showcase */}
      <div className="mt-12 relative max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-8 py-4 relative min-h-[460px] sm:min-h-[500px]">

          {/* Left Preview Card */}
          <motion.div
            key={`left-${prevProduct.id}-${activeSlide}`}
            initial={{ opacity: 0, x: -60, scale: 0.8 }}
            animate={{ opacity: 0.45, x: 0, scale: 0.9 }}
            exit={{ opacity: 0, x: -100, scale: 0.7 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={handlePrev}
            className="hidden md:block w-48 lg:w-64 h-64 shrink-0 bg-black overflow-hidden relative cursor-pointer hover:opacity-75 transition-opacity border border-gray-800  z-0"
          >
            <Image
              src={prevProduct.image}
              alt="Previous panel"
              fill
              className="object-cover opacity-80"
            />
          </motion.div>

          {/* Main Active Card with Slide Shift Animation */}
          <div className="w-full max-w-md sm:max-w-xl bg-white p-4 sm:p-6  border border-gray-200 flex flex-col items-center text-center relative group z-10 overflow-hidden">





            {/* Product Content with Animated Slide Transition */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentProduct.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center"
              >
                {/* Product Image Frame */}
                <div className="w-full h-56 sm:h-72 bg-black overflow-hidden relative ">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    priority
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Title */}
                <h3 className="mt-6 text-xl sm:text-2xl font-normal text-gray-900">
                  {currentProduct.name}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="mt-4 flex items-center justify-center gap-2 relative z-20">
              {currentProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeSlide ? 1 : -1);
                    onSlideSelect(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-3 transition-all duration-300 ${idx === activeSlide ? "w-8 bg-[#5b176e]" : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-6 relative z-20">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center bg-[#5b176e] px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#461056] transition-all"
              >
                Get A Quote
              </Link>
            </div>
          </div>

          {/* Right Preview Card */}
          <motion.div
            key={`right-${nextProduct.id}-${activeSlide}`}
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 0.45, x: 0, scale: 0.9 }}
            exit={{ opacity: 0, x: 100, scale: 0.7 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleNext}
            className="hidden md:block w-48 lg:w-64 h-64 shrink-0 bg-black overflow-hidden relative cursor-pointer hover:opacity-75 transition-opacity border border-gray-800  z-0"
          >
            <Image
              src={nextProduct.image}
              alt="Next panel"
              fill
              className="object-cover opacity-80"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

