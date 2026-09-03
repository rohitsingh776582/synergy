"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Container from "./Container";

const HEADING_WORDS = ["Not", "sure", "which", "panel", "fits", "your", "use?"];

let globalCounter = 0;
const PREPROCESSED_HEADING = HEADING_WORDS.map((word) =>
  word.split("").map((char) => ({
    char,
    index: globalCounter++,
  }))
);
const TOTAL_CHARS = globalCounter;

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
  const endScroll = 0.45;
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

export default function PanelFitsYourUseBanner() {
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

  const descY = useTransform(smoothProgress, [0.08, 0.50], [35, 0]);
  const descOpacity = useTransform(smoothProgress, [0.08, 0.44], [0, 1]);
  const buttonsY = useTransform(smoothProgress, [0.15, 0.55], [30, 0]);
  const buttonsOpacity = useTransform(smoothProgress, [0.15, 0.50], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#3c094c] py-12 md:py-16 font-sans text-white border-t border-purple-900/40 select-none overflow-hidden"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Heading & Subtitle with scroll-driven letter reveal */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-white tracking-tight leading-[1.18] mb-2">
              {PREPROCESSED_HEADING.map((word, wordIdx) => (
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
            </h2>

            <motion.p
              style={{
                y: descY,
                opacity: descOpacity,
              }}
              className="text-sm sm:text-base text-purple-100/90 font-light leading-relaxed transform-gpu will-change-transform"
            >
              Share your temperature, sector and area. Our engineers can
              recommend a system and prepare a quote.
            </motion.p>
          </div>

          {/* Right Column: Action Buttons */}
          <motion.div
            style={{
              y: buttonsY,
              opacity: buttonsOpacity,
            }}
            className="flex flex-wrap items-center gap-3.5 shrink-0 w-full sm:w-auto transform-gpu will-change-transform"
          >
            {/* Primary Solid Button (ZERO border radius, ZERO shadow) */}
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#471159] text-white border border-[#6b1e84] px-6 py-3.5 rounded-none text-sm font-semibold shadow-none transition-colors active:scale-95"
            >
              Get a quote
            </Link>

            {/* Secondary Outline Button (ZERO border radius, ZERO shadow) */}
            <a
              href="#brochure"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading Synergy PUF Product Catalog PDF...");
              }}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/60 px-6 py-3.5 rounded-none text-sm font-semibold shadow-none transition-colors active:scale-95"
            >
              Download brochure
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
