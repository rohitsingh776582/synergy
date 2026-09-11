"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const TALK_TEAM_LINES = [
  ["Talk", "to", "the", "team"],
  ["behind", "the", "panels."],
];

let talkTeamCounter = 0;
const PREPROCESSED_TALK_TEAM = TALK_TEAM_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: talkTeamCounter++,
    }))
  )
);
const TOTAL_TALK_TEAM_CHARS = talkTeamCounter;

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

export default function TalkToTeamBanner() {
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
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol) return;

    const ctx = gsap.context(() => {
      const subtitle = leftCol.querySelector("p");

      if (subtitle) {
        gsap.set(subtitle, {
          x: -40,
          opacity: 0,
          willChange: "transform, opacity",
        });
      }

      if (rightCol) {
        gsap.set(rightCol, {
          opacity: 0,
          x: 40,
          willChange: "transform, opacity",
        });
      }

      // Smooth Left-to-Right scroll reveal timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // 1. Subtitle reveals smoothly
      if (subtitle) {
        tl.to(subtitle, {
          x: 0,
          opacity: 1,
          duration: 0.85,
        });
      }

      // 2. Action buttons fade in
      if (rightCol) {
        tl.to(
          rightCol,
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
          },
          "-=0.6"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#3c094c] py-12 md:py-16 font-sans text-white border-t border-purple-900/40 select-none overflow-hidden"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Title & Subtitle aligned with Navbar Logo */}
          <div
            ref={leftColRef}
            className="flex flex-col items-start text-left flex-1 max-w-xl"
          >
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.15] mb-2">
              {PREPROCESSED_TALK_TEAM.map((line, lineIdx) => (
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
                          total={TOTAL_TALK_TEAM_CHARS}
                          progress={smoothProgress}
                        />
                      ))}
                    </span>
                  ))}
                  {lineIdx < PREPROCESSED_TALK_TEAM.length - 1 && (
                    <br className="hidden sm:inline" />
                  )}
                </React.Fragment>
              ))}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-purple-100/90 font-light leading-relaxed">
              Discuss your requirements with our engineering and sales team.
            </p>
          </div>

          {/* Right Column: Action Buttons aligned with Navbar Start Your Quote */}
          <div
            ref={rightColRef}
            className="flex flex-wrap items-center gap-3.5 shrink-0 w-full sm:w-auto"
          >
            {/* Primary Solid Button (ZERO border radius, ZERO shadow) */}
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#471159] text-white border border-[#6b1e84] px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-colors active:scale-95"
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
