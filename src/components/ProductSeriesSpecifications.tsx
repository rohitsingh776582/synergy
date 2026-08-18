"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Container from "./Container";
import { ProductItem } from "./ProductsHero";

interface ProductSeriesSpecificationsProps {
  currentProduct: ProductItem;
}

interface DiagonalBoxProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
  className?: string;
}

function DiagonalBox({
  progress,
  index,
  total,
  children,
  className,
}: DiagonalBoxProps) {
  const step = 0.55 / Math.max(total, 1);
  const start = index * step;
  const end = Math.min(start + 0.4, 1);

  const clipPath = useTransform(
    progress,
    [start, end],
    [
      "polygon(0 0, 0 0, 0 100%, 0 100%)",
      "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ]
  );

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.97, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.div
      style={{
        clipPath,
        opacity,
        scale,
        y,
        willChange: "clip-path, transform, opacity",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProductSeriesSpecifications({
  currentProduct,
}: ProductSeriesSpecificationsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.2,
    restDelta: 0.001,
  });

  const defaultBoxes = [
    { label: "Types", value: currentProduct.types },
    { label: "Thickness", value: currentProduct.thickness },
    { label: "Core Density", value: currentProduct.density },
    { label: "Facing", value: currentProduct.facing },
  ];

  const extraSpecs = currentProduct.specs ?? [];
  const allBoxes = [...defaultBoxes, ...extraSpecs];
  const totalItems = allBoxes.length + 1; // including button

  return (
    <section ref={sectionRef} className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <Container className="text-center">
        {/* Section Badge with horizontal lines */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-[1.5px] w-12 sm:w-20 bg-gray-300" />
          <span className="border border-purple-200 bg-purple-50/60 px-5 py-1.5 text-xs sm:text-sm font-bold text-[#5b176e] uppercase tracking-wider">
            {currentProduct.series}
          </span>
          <span className="h-[1.5px] w-12 sm:w-20 bg-gray-300" />
        </div>

        <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
          Top-tier polyurethane insulation delivering high performance thermal insulation for commercial, industrial and agricultural environments.
        </p>

        {/* Specifications Cards Layout */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left max-w-3xl mx-auto">
          {allBoxes.map((box, idx) => (
            <DiagonalBox
              key={`${currentProduct.id}-${box.label}-${idx}`}
              progress={smoothProgress}
              index={idx}
              total={totalItems}
              className="bg-[#f2f2f4] p-5 border border-gray-200/80  flex flex-col justify-center"
            >
              <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                {box.label}
              </span>
              <span className="mt-1 text-lg sm:text-xl font-bold text-gray-900">
                {box.value}
              </span>
            </DiagonalBox>
          ))}

          {/* Center Custom Button Span */}
          <DiagonalBox
            progress={smoothProgress}
            index={allBoxes.length}
            total={totalItems}
            className="sm:col-span-2 flex justify-center my-2"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#5b176e] px-8 py-3.5 text-sm font-bold text-white  hover:bg-[#461056] transition-colors text-center"
            >
              Building something custom?
            </Link>
          </DiagonalBox>
        </div>
      </Container>
    </section>
  );
}
