"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

export interface ProductItem {
  id: string;
  name: string;
  image: string;
  series: string;
  types: string;
  thickness: string;
  density: string;
  facing: string;
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
      density: "40 kg/m³",
      facing: "Pre-painted steel sheet",
    },
    {
      id: "02",
      name: "Double Skin Wall Panel",
      image: "/images/products/wall_panel_hero.png",
      series: "PUF Series",
      types: "Tongue & Groove Wall",
      thickness: "30–150mm",
      density: "40 kg/m³",
      facing: "PPGI / Stainless Steel",
    },
    {
      id: "03",
      name: "Cold Storage Insulation Panel",
      image: "/cold_storage.png",
      series: "PUF Series",
      types: "Cam-lock Interlocking",
      thickness: "80–200mm",
      density: "42 kg/m³",
      facing: "Pre-painted Galvanized Steel",
    },
  ],

  pir: [
    {
      id: "01",
      name: "PIR Fire-Rated Wall Panel",
      image: "/puf_panel_stack.png",
      series: "PIR Series",
      types: "Fire-Resistant PIR",
      thickness: "50–150mm",
      density: "45 kg/m³",
      facing: "High Durability Steel",
    },
    {
      id: "02",
      name: "PIR High Thermal Roof Panel",
      image: "/puf_roof_panel.png",
      series: "PIR Series",
      types: "Ribbed Roof Profile",
      thickness: "60–200mm",
      density: "45 kg/m³",
      facing: "Alu-Zinc Coated Sheet",
    },
  ],

  specialty: [
    {
      id: "01",
      name: "Cleanroom Modular Panel",
      image: "/cleanroom_panel.png",
      series: "Specialty Series",
      types: "Hygienic Sealed Joint",
      thickness: "50–100mm",
      density: "40 kg/m³",
      facing: "Anti-Bacterial Coated Steel",
    },
    {
      id: "02",
      name: "Acoustic Insulation Panel",
      image: "/puf_factory.png",
      series: "Specialty Series",
      types: "Perforated Soundproof",
      thickness: "80–150mm",
      density: "48 kg/m³",
      facing: "Perforated Steel & Mesh",
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

  return (
    <section className="pt-12 pb-16 text-center overflow-hidden">
      <Container>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.15]">
          Insulated panel systems <br className="hidden sm:inline" />
          engineered to perform.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
          PUF – fit and crafted for all roofings and walling – premium quality, custom configurations.
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
              className={`px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isActive
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
                  className={`h-3 transition-all duration-300 ${
                    idx === activeSlide ? "w-8 bg-[#5b176e]" : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-6 relative z-20">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center bg-[#5b176e] px-7 py-3 text-sm font-bold text-white hover:bg-[#461056] transition-all"
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

