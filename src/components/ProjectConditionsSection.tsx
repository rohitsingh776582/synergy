"use client";

import React, { useRef } from "react";
import { Thermometer, ClipboardList, Ruler } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Container from "./Container";

function ScrollTypewriterText({
  text,
  progress,
  start = 0.02,
  end = 0.45,
  className = "",
}: {
  text: string;
  progress: MotionValue<number>;
  start?: number;
  end?: number;
  className?: string;
}) {
  const words = text.split(" ");
  let counter = 0;
  const processed = words.map((word) =>
    word.split("").map((char) => ({
      char,
      index: counter++,
    }))
  );
  const totalChars = counter;

  return (
    <span className={className}>
      {processed.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          {word.map((item) => {
            const step = (end - start) / Math.max(1, totalChars);
            const letterStart = start + item.index * step;
            const letterEnd = letterStart + step * 1.3;

            return (
              <LetterItem
                key={item.index}
                char={item.char}
                progress={progress}
                letterStart={letterStart}
                letterEnd={letterEnd}
              />
            );
          })}
        </span>
      ))}
    </span>
  );
}

function LetterItem({
  char,
  progress,
  letterStart,
  letterEnd,
}: {
  char: string;
  progress: MotionValue<number>;
  letterStart: number;
  letterEnd: number;
}) {
  const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-14, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

const conditions = [
  {
    num: "01",
    title: "Temperature range",
    subtitle: "Operating conditions and target temperatures.",
    icon: Thermometer,
  },
  {
    num: "02",
    title: "Industry & use",
    subtitle: "Your process and compliance requirements.",
    icon: ClipboardList,
  },
  {
    num: "03",
    title: "Area & layout",
    subtitle: "Dimensions, openings and project scale.",
    icon: Ruler,
  },
];

function ConditionCardItem({
  item,
  progress,
  index,
}: {
  item: (typeof conditions)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const Icon = item.icon;
  const start = 0.08 + index * 0.07;
  const end = 0.58 + index * 0.07;

  // Ultra-smooth bottom-to-top fluid slide and soft opacity fade
  const y = useTransform(progress, [start, end], [50, 0]);
  const opacity = useTransform(progress, [start, end - 0.05], [0, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="bg-white border border-gray-200/90 rounded-none shadow-none p-6 sm:p-7 flex items-center gap-5 md:gap-6 transform-gpu will-change-transform"
    >
      {/* Purple Outline Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#58166e]">
        <Icon className="h-9 w-9 stroke-[1.4]" strokeWidth={1.4} />
      </div>

      {/* Vertical Separator Line */}
      <div className="h-12 w-[1px] bg-gray-200 shrink-0" />

      {/* Card Content */}
      <div className="flex flex-col items-start text-left min-w-0">
        <span className="text-xs sm:text-sm font-bold text-[#e8b030] tracking-wide mb-1">
          {item.num}
        </span>

        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
          {item.subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProjectConditionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "center 42%"],
  });

  // Softer spring physics for ultra-smooth liquid floating motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 28,
    restDelta: 0.0001,
  });

  // Dynamic scroll-driven z-index: lower z-index initially (10), elevated (20) when scrolled into view
  const zIndex = useTransform(smoothProgress, [0, 0.08, 1], [10, 20, 20]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ zIndex }}
      className="relative w-full bg-[#f8f9fa] py-14 md:py-20 font-sans text-gray-900 border-t border-gray-200/70 select-none overflow-hidden"
    >
      <Container>
        {/* Title with left-to-right scroll-driven letter typing */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-8 md:mb-10 text-left">
          <ScrollTypewriterText
            text="Start with your project conditions."
            progress={smoothProgress}
            start={0.02}
            end={0.45}
          />
        </h2>

        {/* 3 Cards Grid: Animates bottom to top with stagger on page scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {conditions.map((item, index) => (
            <ConditionCardItem
              key={item.num}
              item={item}
              progress={smoothProgress}
              index={index}
            />
          ))}
        </div>
      </Container>
    </motion.section>
  );
}

