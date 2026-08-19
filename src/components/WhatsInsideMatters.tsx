"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Container from "./Container";

interface LayerInfo {
  id: "top-steel" | "puf-core" | "bottom-steel";
  title: string;
  subtitle: string;
  description: string;
  icon: "steel" | "core";
}

const LAYERS_DATA: LayerInfo[] = [
  {
    id: "top-steel",
    title: "STEEL FACE",
    subtitle: "Outer Sheeting",
    description: "Durable outer protection designed for demanding environments.",
    icon: "steel",
  },
  {
    id: "puf-core",
    title: "PUF CORE",
    subtitle: "Insulation Core",
    description: "The high-performance insulation core responsible for thermal efficiency.",
    icon: "core",
  },
  {
    id: "bottom-steel",
    title: "STEEL FACE",
    subtitle: "Inner Sheeting",
    description: "A protective inner surface that completes the panel system.",
    icon: "steel",
  },
];

const HEADING_DATA = [
  ["WHAT'S", "INSIDE"],
  ["MATTERS"],
];

let globalCounter = 0;
const PREPROCESSED_HEADING = HEADING_DATA.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: globalCounter++,
    }))
  )
);
const TOTAL_CHARS = globalCounter;

const BOTTOM_BANNER_LINES = [
  ["THREE", "LAYERS."],
  ["ONE", "ENGINEERED", "PANEL"],
];

let bottomBannerCounter = 0;
const PREPROCESSED_BOTTOM_BANNER = BOTTOM_BANNER_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: bottomBannerCounter++,
    }))
  )
);
const TOTAL_BOTTOM_BANNER_CHARS = bottomBannerCounter;

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

export default function WhatsInsideMatters() {
  const [activeLayer, setActiveLayer] = useState<
    "all" | "top-steel" | "puf-core" | "bottom-steel"
  >("all");

  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomHeadingRef = useRef<HTMLHeadingElement>(null);

  // Track scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 40%"],
  });

  // Spring physics for ultra-smooth, fluid motion without sudden jumps
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const { scrollYProgress: bottomHeadingScrollProgress } = useScroll({
    target: bottomHeadingRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothBottomHeadingProgress = useSpring(bottomHeadingScrollProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // 1. Prominent forward scale: Moves strongly forward towards the viewer on scroll (scale: 0.92 -> 1.20 -> 1.28)
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1.2, 1.28]);

  // 2. Smooth vertical position shift
  const y = useTransform(smoothProgress, [0, 0.5, 1], [40, 0, -20]);

  // 3. Forward 3D tilt: Smoothly levels straight into front-facing view as user scrolls
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [14, 0, -5]);

  // Left Column Description slide reveal on scroll
  const descY = useTransform(smoothProgress, [0.06, 0.48], [90, 0]);
  const descOpacity = useTransform(smoothProgress, [0.06, 0.42], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 py-8 sm:py-10 lg:py-14 overflow-hidden font-sans border-t border-gray-100"
    >
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.02),transparent_60%)]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column - Scroll-driven letter by letter reveal from left side */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left relative z-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-gray-900 leading-[1.08]">
              {PREPROCESSED_HEADING.map((line, lineIdx) => (
                <React.Fragment key={lineIdx}>
                  {lineIdx > 0 && <br />}
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
                          total={TOTAL_CHARS}
                          progress={smoothProgress}
                        />
                      ))}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </h2>

            <motion.p
              style={{
                y: descY,
                opacity: descOpacity,
              }}
              className="mt-3 text-xs sm:text-sm leading-relaxed text-gray-600 font-normal max-w-md transform-gpu will-change-transform"
            >
              A PUF panel is more than two metal faces. At its core is a
              high-performance insulation layer, engineered between them to
              deliver exceptional thermal performance.
            </motion.p>
          </div>

          {/* Center Column - Moves strongly forward directly towards the front viewer on scroll */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-2 sm:py-4 z-10 perspective-[1000px]">
            <motion.div
              style={{
                scale,
                y,
                rotateX,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
              }}
              className="relative w-full max-w-[450px] sm:max-w-[500px] flex items-center justify-center transform-gpu will-change-transform"
            >
              <Image
                src="/images/puf-3d-panel-exploded.png"
                alt="3D PUF Panel Exploded View"
                width={500}
                height={500}
                priority
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Right Column - Layer Details Cards */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 justify-center relative z-20">
            {LAYERS_DATA.map((layer) => {
              const isActive =
                activeLayer === "all" || activeLayer === layer.id;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  onMouseEnter={() => setActiveLayer(layer.id)}
                  onMouseLeave={() => setActiveLayer("all")}
                  className={`group cursor-pointer rounded-lg p-3 sm:p-3.5 transition-all duration-300 border ${
                    activeLayer === layer.id
                      ? "bg-gray-100 border-gray-900 scale-[1.01]"
                      : isActive
                      ? "bg-white border-gray-200 hover:border-gray-400"
                      : "bg-gray-50 border-gray-100 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-900 group-hover:bg-gray-200 transition-colors">
                      {layer.icon === "steel" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M3 15h18" />
                          <path d="M9 3v18" />
                          <path d="M15 3v18" />
                        </svg>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-900">
                        {layer.title}
                      </h4>
                    </div>
                  </div>

                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600 font-light">
                    {layer.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner Accent */}
        <div className="mt-8 sm:mt-10 pt-4 border-t border-gray-100 text-center">
          <div className="w-12 h-[3px] bg-gray-900 mx-auto mb-3 rounded-full" />
          <h3 ref={bottomHeadingRef} className="text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-gray-900">
            {PREPROCESSED_BOTTOM_BANNER.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
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
                        total={TOTAL_BOTTOM_BANNER_CHARS}
                        progress={smoothBottomHeadingProgress}
                      />
                    ))}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </h3>
        </div>
      </Container>
    </section>
  );
}
