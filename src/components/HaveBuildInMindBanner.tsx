"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const BUILD_MIND_LINES = [
  ["Have", "a", "build", "like"],
  ["these", "in", "mind?"],
];

let buildMindCounter = 0;
const PREPROCESSED_BUILD_MIND = BUILD_MIND_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: buildMindCounter++,
    }))
  )
);
const TOTAL_BUILD_MIND_CHARS = buildMindCounter;

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

export default function HaveBuildInMindBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "start 32%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 25,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      const subtitle = leftCol.querySelector("p");
      const rightElements = rightCol.querySelectorAll("[data-animate-right]");

      if (subtitle) {
        gsap.set(subtitle, {
          x: -50,
          opacity: 0,
          willChange: "transform, opacity",
        });
      }

      // Right buttons initial state
      gsap.set(rightElements, {
        x: 60,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Scroll-triggered entrance animation (fires when user scrolls section into viewport)
      if (subtitle) {
        gsap.to(subtitle, {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.to(rightElements, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 font-sans text-white border-t border-gray-100 select-none overflow-hidden"
    >
      <Container>
        {/* Dark Purple Container Card with ZERO border radius and ZERO shadow */}
        <div className="w-full bg-[#3c094c] p-8 sm:p-12 lg:p-14 rounded-none shadow-none flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Heading & Subtitle entering from left */}
          <div
            ref={leftColRef}
            className="flex flex-col items-start text-left max-w-xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-normal text-white tracking-[-0.02em] leading-[1.15] mb-3">
              {PREPROCESSED_BUILD_MIND.map((line, lineIdx) => (
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
                          total={TOTAL_BUILD_MIND_CHARS}
                          progress={smoothProgress}
                        />
                      ))}
                    </span>
                  ))}
                  {lineIdx < PREPROCESSED_BUILD_MIND.length - 1 && (
                    <br className="hidden sm:inline" />
                  )}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-sm sm:text-base text-purple-100/90 font-light leading-relaxed">
              Send us the temperature range, area and timeline. Our
              engineering team will spec the panels and quote it.
            </p>
          </div>

          {/* Right Column: Buttons entering from right */}
          <div
            ref={rightColRef}
            className="flex flex-wrap items-center gap-3.5 shrink-0 w-full sm:w-auto"
          >
            {/* Solid Button (ZERO border radius, ZERO shadow) */}
            <Link
              data-animate-right
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#471159] text-white border border-[#6b1e84] px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-colors active:scale-95"
            >
              Get a quote
            </Link>

            {/* Outline Button (ZERO border radius, ZERO shadow) */}
            <a
              data-animate-right
              href="#brochure"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading Synergy PUF Product Catalog PDF...");
              }}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/60 px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-colors active:scale-95"
            >
              Download brochure
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
