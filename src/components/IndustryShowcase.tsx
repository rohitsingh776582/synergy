"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function IndustryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Scale, border radius & opacity transformation on scroll
  const scale = useTransform(scrollYProgress, [0.05, 0.85], [0.1, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.85], [64, 0]);
  const imgScale = useTransform(scrollYProgress, [0.05, 0.85], [1.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0.2, 1, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-16 sm:py-24 font-sans overflow-hidden"
    >
      <div className="text-center px-4 mb-10 sm:mb-14 max-w-4xl mx-auto">
        
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#5b176e]">
          Versatile Sector Protection
        </span>

        <h2 className="mt-3 text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.08]">
          Insulation for <br className="hidden sm:inline" />
          every industry.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
          From food processing and pharmaceuticals to commercial construction and logistics, our PUF panels are engineered to maintain stringent controls across all sector applications.
        </p>
      </div>

      {/* Expandable Image Frame: Grows from ultra-small capsule on scroll */}
      <div className="w-full flex justify-center items-center py-6">
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
          }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden shadow-2xl origin-center border border-purple-200/50"
        >
          <motion.div
            style={{ scale: imgScale }}
            className="relative h-full w-full"
          >
            <Image
              src="/cold_storage.png"
              alt="Insulation for every industry showcase"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
