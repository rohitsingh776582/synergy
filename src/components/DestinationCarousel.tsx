"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
export interface DestinationItem {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}

export const DEFAULT_DESTINATIONS: DestinationItem[] = [
  {
    id: "roof-panel",
    name: "PUF Roof Panel",
    location: "Roofing Solutions",
    coordinates: "THERMAL R-VALUE: 2.2-7.5",
    description:
      "High-performance insulated PUF roof panels featuring leak-proof trapezoidal profiles and continuous lamination technology.",
    videoUrl: "/RoofVideo/Roof.mp4",
  },
  {
    id: "wall-panel-1",
    name: "PUF Wall Panel (Concealed Fix)",
    location: "Facade & Wall Systems",
    coordinates: "FOAM DENSITY: 40±2 kg/m³",
    description:
      "Modern architectural wall panel with hidden fasteners, micro-ribbing, and superior airtightness for industrial buildings.",
    videoUrl: "/RoofVideo/Wall 1.mp4",
  },
  {
    id: "wall-panel-2",
    name: "Insulated Wall Panel Series II",
    location: "Commercial Enclosures",
    coordinates: "FIRE RATING: PIR B1 / PUF B2",
    description:
      "Energy-efficient insulated wall system designed for quick modular assembly, warehouses, cleanrooms, and factory units.",
    videoUrl: "/RoofVideo/Wall 2.mp4",
  },
  {
    id: "wall-panel-3",
    name: "Architectural Wall Panel Series III",
    location: "Heavy Industrial Units",
    coordinates: "SPAN STRENGTH: High Load Capacity",
    description:
      "Robust double-skin metal facing sandwich panel engineered for severe weather conditions and long-span stability.",
    videoUrl: "/RoofVideo/Wall 3.mp4",
  },
  {
    id: "puf-continuous",
    name: "Synergy PUF Panel Line",
    location: "Continuous Manufacturing",
    coordinates: "AUTOMATED PRODUCTION LINE",
    description:
      "State-of-the-art continuous polyurethane sandwich panel manufacturing process delivering unmatched precision.",
    videoUrl: "/video/PUF.mp4",
  },
];

interface DestinationCarouselProps {
  destinations?: DestinationItem[];
  className?: string;
}

export default function DestinationCarousel({
  destinations = DEFAULT_DESTINATIONS,
  className = "",
}: DestinationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const total = destinations.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsExpanded(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay Carousel (automatically advances every 4 seconds)
  useEffect(() => {
    if (isExpanded) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [handleNext, isExpanded]);

  // Get index offset wrapped circularly
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const activeDestination = destinations[activeIndex];

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-white font-sans text-gray-900 select-none flex flex-col justify-between p-4 sm:p-8 ${className}`}
    >
      {/* 1. Light Ambient Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-slate-50 via-white to-purple-50/20" />

      {/* 3. Main 3D Card Carousel Stage */}
      <div className="relative z-20 flex-1 flex items-center justify-center my-auto min-h-[560px] sm:min-h-[640px]">
        {/* Perspective Stage */}
        <div
          className="relative w-full max-w-6xl h-[520px] sm:h-[560px] flex items-center justify-center"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {destinations.map((dest, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // 3D Transform metrics matching reference image
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (offset === 0) {
              translateX = 0;
              translateZ = 120;
              rotateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (offset === -1) {
              translateX = -250;
              translateZ = -40;
              rotateY = 14;
              scale = 0.86;
              opacity = 0.88;
              zIndex = 20;
            } else if (offset === -2) {
              translateX = -430;
              translateZ = -140;
              rotateY = 24;
              scale = 0.72;
              opacity = 0.65;
              zIndex = 10;
            } else if (offset === 1) {
              translateX = 250;
              translateZ = -40;
              rotateY = -14;
              scale = 0.86;
              opacity = 0.88;
              zIndex = 20;
            } else if (offset === 2) {
              translateX = 430;
              translateZ = -140;
              rotateY = -24;
              scale = 0.72;
              opacity = 0.65;
              zIndex = 10;
            }

            return (
              <motion.div
                key={dest.id}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                initial={false}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  mass: 0.9,
                }}
                style={{
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                }}
                className={`absolute w-[310px] sm:w-[350px] md:w-[370px] h-[480px] sm:h-[530px] rounded-none overflow-hidden border border-gray-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer flex flex-col justify-between transition-shadow duration-300 hover:border-purple-200 ${isCenter ? "pointer-events-auto shadow-[0_25px_60px_rgba(88,22,106,0.18)]" : "hover:opacity-95"
                  }`}
              >
                {/* Media Section: Video or Image */}
                <div className="relative w-full h-[60%] overflow-hidden bg-gray-900">
                  {dest.videoUrl ? (
                    <video
                      src={dest.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover object-center pointer-events-none"
                    />
                  ) : dest.imageUrl ? (
                    <Image
                      src={dest.imageUrl}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 320px, 370px"
                      priority={isCenter}
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  ) : null}
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 flex-1 bg-white p-5 border-t border-gray-100 flex flex-col justify-between">
                  {isCenter ? (
                    <>
                      {/* Title & Counter Header */}
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight leading-snug">
                          {dest.name}
                        </h2>
                        <span className="text-xs font-mono text-gray-400 pt-1 shrink-0">
                          {activeIndex + 1} / {total}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm font-normal text-gray-600 leading-relaxed my-2 line-clamp-2 sm:line-clamp-3">
                        {dest.description}
                      </p>

                      {/* Location & Coordinates Footer */}
                      <div className="flex flex-col gap-1 pt-1.5 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#58166A] shrink-0" />
                          <span>{dest.location}</span>
                        </div>
                        <div className="text-[11px] font-mono text-gray-400 pl-5">
                          {dest.coordinates}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Side Card Bottom Layout */
                    <div className="flex flex-col justify-end h-full">
                      <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                        {dest.name}
                      </h3>
                      <p className="text-xs font-medium text-gray-500 mt-1">
                        {dest.location}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Controls: Next & Prev Arrow Buttons */}
      <div className="relative z-30 flex items-center justify-center gap-6 pb-4">
        <button
          onClick={handlePrev}
          aria-label="Previous Destination"
          className="p-3 rounded-none bg-white border border-gray-200 text-gray-800 hover:bg-purple-50 hover:text-[#58166A] hover:border-purple-200 transition-all duration-200 active:scale-95 shadow-md hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-none bg-gray-100 border border-gray-200">
          {destinations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-none transition-all duration-300 ${idx === activeIndex
                  ? "w-6 bg-[#58166A]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Destination"
          className="p-3 rounded-none bg-white border border-gray-200 text-gray-800 hover:bg-purple-50 hover:text-[#58166A] hover:border-purple-200 transition-all duration-200 active:scale-95 shadow-md hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* 5. Fullscreen Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-white/95 backdrop-blur-3xl p-6 sm:p-12 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
              <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                PRODUCT SHOWCASE
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-3 rounded-none bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full max-w-5xl mx-auto my-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6">
              <div className="relative aspect-[4/3] w-full rounded-none overflow-hidden border border-gray-200 shadow-2xl bg-black">
                {activeDestination.videoUrl ? (
                  <video
                    src={activeDestination.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : activeDestination.imageUrl ? (
                  <Image
                    src={activeDestination.imageUrl}
                    alt={activeDestination.name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-4 text-left">
                <span className="text-xs font-mono text-[#58166A] uppercase tracking-widest">
                  {activeDestination.coordinates}
                </span>
                <h2 className="text-4xl sm:text-5xl font-serif text-gray-900">
                  {activeDestination.name}
                </h2>
                <p className="text-sm font-normal text-gray-600 leading-relaxed">
                  {activeDestination.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-800 font-medium pt-2 border-t border-gray-200">
                  <MapPin className="w-4 h-4 text-[#58166A]" />
                  <span>{activeDestination.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
