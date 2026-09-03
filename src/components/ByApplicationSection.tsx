"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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

const applications = [
  {
    num: "01",
    title: "Cold storage panels",
    description: "Insulation for controlled low-temperature spaces.",
    image: "/cold_storage.png",
    href: "/applications",
  },
  {
    num: "02",
    title: "Cleanroom systems",
    description: "Modular surfaces for controlled environments.",
    image: "/cleanroom_panel.png",
    href: "/applications",
  },
  {
    num: "03",
    title: "Fire insulation",
    description: "Specify a tested fire-rated panel assembly.",
    image: "/Panels/Generating_fire_insulation_image_2K_202608181424.jpeg",
    href: "/applications",
  },
  {
    num: "04",
    title: "Heat insulation",
    description: "Thermal insulation for roofs and walls.",
    image: "/puf_roof_panel.png",
    href: "/applications",
  },
  {
    num: "05",
    title: "Cold room enclosures",
    description: "Complete enclosures for temperature-controlled rooms.",
    image: "/images/products/cold_storage_1786340194998.png",
    href: "/applications",
  },
];

export default function ByApplicationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 md:py-24 font-sans text-gray-900 border-t border-gray-100 select-none overflow-hidden"
    >
      <Container>
        {/* Header Row - Left aligned with Navbar Logo */}
        <div className="flex flex-col items-start text-left mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-2">
            <ScrollTypewriterText
              text="By application"
              progress={smoothProgress}
              start={0.02}
              end={0.40}
            />
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            <ScrollTypewriterText
              text="Start with what your panel needs to do."
              progress={smoothProgress}
              start={0.18}
              end={0.60}
            />
          </p>
        </div>

        {/* Cards Grid (3 columns, ZERO border radius, ZERO shadow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {applications.map((app) => (
            <div
              key={app.num}
              className="bg-white border border-gray-200/90 rounded-none shadow-none flex flex-col overflow-hidden"
            >
              {/* Card Image Box (ZERO border radius) */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-none bg-gray-100">
                <Image
                  src={app.image}
                  alt={app.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover object-center rounded-none transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <span className="block text-base sm:text-lg font-bold text-[#e8b030] tracking-wide mb-1.5">
                    {app.num}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2">
                    {app.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
                    {app.description}
                  </p>
                </div>

                <Link
                  href={app.href}
                  className="self-start text-xs font-bold text-[#58166e] hover:underline"
                >
                  View application
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

