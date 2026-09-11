"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Container from "./Container";

const MANUFACTURING_WORDS = ["Manufacturing", "&", "capability"];

let manufacturingCounter = 0;
const PREPROCESSED_MANUFACTURING = MANUFACTURING_WORDS.map((word) =>
  word.split("").map((char) => ({
    char,
    index: manufacturingCounter++,
  }))
);
const TOTAL_MANUFACTURING_CHARS = manufacturingCounter;

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
  const startScroll = 0.05;
  const endScroll = 0.85;
  const step = (endScroll - startScroll) / total;

  const letterStart = startScroll + index * step;
  const letterEnd = letterStart + step * 1.5;

  const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-16, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

const specs = [
  { label: "Plant floor area", value: "To confirm" },
  { label: "Key machinery", value: "To confirm" },
  { label: "Monthly output", value: "See verified capacity" },
];

const processSteps = [
  { num: "01", title: "Raw material check" },
  { num: "02", title: "Core density control" },
  { num: "03", title: "Bonding" },
  { num: "04", title: "Dispatch inspection" },
];

export default function ManufacturingCapabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "start 32%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-14 md:py-20 font-sans text-gray-900 border-t border-gray-200/70 overflow-hidden"
    >
      <Container>
        {/* Title - Smooth Left-to-Right scroll letter-by-letter reveal */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-8">
          {PREPROCESSED_MANUFACTURING.map((word, wordIdx) => (
            <span
              key={wordIdx}
              className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
            >
              {word.map((item) => (
                <ScrollLetter
                  key={item.index}
                  char={item.char}
                  index={item.index}
                  total={TOTAL_MANUFACTURING_CHARS}
                  progress={smoothProgress}
                />
              ))}
            </span>
          ))}
        </h2>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Factory Images Grid (ZERO border radius, ZERO shadow) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 w-full">
            {/* Top Large Factory Line Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-none border border-gray-200/90 bg-gray-100 shadow-none">
              <Image
                src="/puf_factory.png"
                alt="Synergy PUF Manufacturing Facility"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center rounded-none"
              />
            </div>

            {/* Bottom 2 Process Images */}
            <div className="grid grid-cols-2 gap-3.5 w-full">
              <div className="relative w-full aspect-[16/11] overflow-hidden rounded-none border border-gray-200/90 bg-gray-100 shadow-none">
                <Image
                  src="/puf_panel_stack.png"
                  alt="PUF Panel Injection Process"
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className="object-cover object-center rounded-none"
                />
              </div>

              <div className="relative w-full aspect-[16/11] overflow-hidden rounded-none border border-gray-200/90 bg-gray-100 shadow-none">
                <Image
                  src="/images/factory_quality_inspection.jpg"
                  alt="Quality Check Inspection"
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className="object-cover object-center rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Spec Table & 4 Process Step Cards (ZERO border radius, ZERO shadow) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 w-full">
            {/* Top Box: Location & Specs */}
            <div className="w-full bg-[#fdfcfd] border border-gray-200/90 rounded-none p-6 shadow-none">
              {/* Location Title */}
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-[#58166e] shrink-0" strokeWidth={2} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  Nalagarh, Himachal Pradesh
                </h3>
              </div>

              {/* Spec Rows */}
              <div className="divide-y divide-gray-200/80">
                {specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex items-center justify-between text-xs sm:text-sm font-normal"
                  >
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: 4 Process Step Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {processSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white border border-gray-200/90 rounded-none shadow-none p-4 flex flex-col justify-between min-h-[140px] sm:min-h-[155px]"
                >
                  <span className="text-xl sm:text-2xl font-bold text-[#000000] tracking-tight">
                    {step.num}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {step.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
