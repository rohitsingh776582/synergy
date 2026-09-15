"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = [
  ["Built", "for", "the", "job"],
  ["it", "has", "to", "do."],
];

let heroCounter = 0;
const PREPROCESSED_HERO = HERO_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: heroCounter++,
    }))
  )
);
const TOTAL_HERO_CHARS = heroCounter;

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
  const endScroll = 0.65;
  const step = (endScroll - startScroll) / total;

  const letterStart = startScroll + index * step;
  const letterEnd = letterStart + step * 1.5;

  const opacity = useTransform(progress, [letterStart, letterEnd], [0.12, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-18, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

const SUBTITLE_WORDS = [
  "Explore",
  "panel",
  "systems",
  "for",
  "cold",
  "storage,",
  "cleanrooms,",
  "fire",
  "insulation",
  "and",
  "energy-efficient",
  "buildings.",
];

let subtitleCounter = 0;
const PREPROCESSED_SUBTITLE = SUBTITLE_WORDS.map((word) =>
  word.split("").map((char) => ({
    char,
    index: subtitleCounter++,
  }))
);
const TOTAL_SUBTITLE_CHARS = subtitleCounter;

function SubtitleScrollLetter({
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
  const startScroll = 0.35;
  const endScroll = 0.90;
  const step = (endScroll - startScroll) / total;

  const letterStart = startScroll + index * step;
  const letterEnd = letterStart + step * 1.5;

  const opacity = useTransform(progress, [letterStart, letterEnd], [0.12, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-12, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

export default function ApplicationsHeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  // Scroll Progress tied to section entering viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    const section = containerRef.current;
    const leftCol = leftColRef.current;
    if (!section || !leftCol) return;

    const ctx = gsap.context(() => {
      const tag = leftCol.querySelector("[data-anim-tag]");
      const button = leftCol.querySelector("[data-anim-button]");

      // Initial state
      gsap.set([tag, button], {
        opacity: 0,
        x: -25,
        willChange: "transform, opacity",
      });

      // ScrollTrigger for Tag & Button
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(tag, {
        opacity: 1,
        x: 0,
        duration: 0.65,
        ease: "power2.out",
      }).to(
        button,
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[650px] max-h-[1080px] flex items-center overflow-hidden font-sans text-gray-900 border-b border-gray-100 select-none"
    >
      {/* Full Width Background Image */}
      <div ref={imageColRef} className="absolute inset-0 z-0">
        <Image
          src="/Partofabigger/ChatGPT Image Sep 15, 2026, 10_49_43 AM.png"
          alt="Synergy PUF Application Facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Text Content positioned directly over the image */}
      <Container className="relative z-10 w-full">
        <div
          ref={leftColRef}
          className="max-w-2xl flex flex-col items-start text-left pt-1"
        >
          {/* Tag */}
          <span
            data-anim-tag
            className="text-[#58166e] text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase mb-3 sm:mb-4 bg-purple-50/85 px-3 py-1 border border-purple-200/60"
          >
            Applications
          </span>

          {/* Heading - Left to Right Scroll Controlled Letter Reveal */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light text-gray-900 leading-[1.12] tracking-tight mb-5">
            {PREPROCESSED_HERO.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
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
                        total={TOTAL_HERO_CHARS}
                        progress={smoothProgress}
                      />
                    ))}
                  </span>
                ))}
                {lineIdx < PREPROCESSED_HERO.length - 1 && (
                  <br className="hidden sm:inline" />
                )}
              </React.Fragment>
            ))}
          </h1>

          {/* Subtitle - Left to Right Scroll Controlled Letter Reveal */}
          <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700 font-light leading-relaxed max-w-xl mb-8">
            {PREPROCESSED_SUBTITLE.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
              >
                {word.map((item) => (
                  <SubtitleScrollLetter
                    key={item.index}
                    char={item.char}
                    index={item.index}
                    total={TOTAL_SUBTITLE_CHARS}
                    progress={smoothProgress}
                  />
                ))}
              </span>
            ))}
          </p>

          {/* Button */}
          <div data-anim-button>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#461058] text-white px-8 py-4 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm transition-colors active:scale-95"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
