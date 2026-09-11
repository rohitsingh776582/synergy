"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
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
  const startScroll = 0.20;
  const endScroll = 0.95;
  const step = (endScroll - startScroll) / total;

  const letterStart = startScroll + index * step;
  const letterEnd = letterStart + step * 1.5;

  const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);
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
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "start 32%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 25,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    const section = containerRef.current;
    const leftCol = leftColRef.current;
    const imageCol = imageColRef.current;
    if (!section || !leftCol) return;

    const ctx = gsap.context(() => {
      const tag = leftCol.querySelector("span");
      const button = leftCol.querySelector("div");

      const animOthers = [tag, button].filter(Boolean);

      // Initial state: shifted downwards and transparent
      gsap.set(animOthers, {
        opacity: 0,
        y: 35,
        willChange: "transform, opacity",
      });

      if (imageCol) {
        gsap.set(imageCol, {
          opacity: 0,
          y: 30,
          scale: 0.98,
          willChange: "transform, opacity",
        });
      }

      // Smooth upward entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(animOthers, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        stagger: 0.12,
        delay: 0.1,
      });

      if (imageCol) {
        tl.to(
          imageCol,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
          },
          "-=0.7"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white py-12 md:py-16 font-sans text-gray-900 border-b border-gray-100 select-none overflow-hidden"
    >
      <Container>
        {/* 2-Column Grid: Top of left text and top of right image are aligned on the exact same horizontal line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text Content aligned with Navbar Logo */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col items-start text-left pt-1"
          >
            {/* Tag */}
            <span className="text-[#58166e] text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase mb-3 sm:mb-4">
              Applications
            </span>

            {/* Heading */}
            <h1
              ref={titleRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.12] tracking-tight mb-5"
            >
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

            {/* Subtitle - Letter by letter scroll reveal */}
            <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-md mb-8">
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

            {/* Button (ZERO border radius, ZERO shadow) */}
            <div data-animate-hero>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#461058] text-white px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-colors active:scale-95"
              >
                Get a quote
              </Link>
            </div>
          </div>

          {/* Right Column: Cleanroom / Cold Room Enclosure Image with left white fade gradient */}
          <div
            ref={imageColRef}
            className="lg:col-span-7 relative w-full aspect-[16/10] overflow-hidden rounded-none bg-white shadow-none"
          >
            <Image
              src="/images/modular_coldroom_enclosure.jpg"
              alt="Synergy PUF Cleanroom Facility"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center rounded-none shadow-none"
            />
            {/* Soft White Left Fade Gradient Overlay */}
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
            {/* Soft White Bottom Fade Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/30 to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
}
