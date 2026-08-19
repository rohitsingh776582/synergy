"use client";

import React, { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const WHY_CHOOSE_US_WORDS = ["Why", "Choose", "Us?"];

let whyChooseCounter = 0;
const PREPROCESSED_WHY_CHOOSE_US = WHY_CHOOSE_US_WORDS.map((word) =>
  word.split("").map((char) => ({
    char,
    index: whyChooseCounter++,
  }))
);
const TOTAL_WHY_CHOOSE_CHARS = whyChooseCounter;

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
  const endScroll = 0.38;
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

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

const rows = [
  {
    titleLines: ["40+ years old", "credible excellence"],
    description:
      "From insulated wall and roof panels to specialized cold storage applications, Synergy PUF offers a complete range of high-performance sandwich panels engineered for every industrial, commercial, and infrastructure requirement.",
    image: "/cold_storage.png",
    alt: "40+ years of credible excellence",
  },
  {
    titleLines: ["Pan India Presence and", "strong network"],
    description:
      "From Kashmir to Kanyakumari our distribution and installation network covers every corner of India, backed by regional warehouses and a dedicated project execution team.",
    image: "/puf_factory.png",
    alt: "Pan India Presence and strong network",
  },
  {
    titleLines: ["Unmatched Speed & Timely", "Delivery"],
    description:
      "A 48-hour record on dispatch because a delayed panel means a delayed project. Speed built into every order, from factory floor to site, pan-India.",
    image: "/puf_factory.png",
    alt: "Unmatched Speed & Timely Delivery",
  },
] as const;

function ScrollAnimatedText({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  let charCounter = 0;
  const preprocessed = lines.map((line) =>
    line.split(" ").map((word) =>
      word.split("").map((char) => ({
        char,
        index: charCounter++,
      }))
    )
  );
  const totalChars = charCounter;

  return (
    <span ref={containerRef} className={className}>
      {preprocessed.map((line, lineIdx) => (
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
                  total={totalChars}
                  progress={smoothProgress}
                />
              ))}
            </span>
          ))}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const divider = dividerRef.current;
    if (!section || isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Divider line animation
      if (divider) {
        gsap.fromTo(
          divider,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Stacked rows text & images slide up from bottom on scroll into each row
      const activeRows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
      activeRows.forEach((row) => {
        const titleEl = row.querySelector(".row-title");
        const descEl = row.querySelector(".row-desc");
        const imgEl = row.querySelector(".row-img");

        const targets = [titleEl, descEl, imgEl].filter(Boolean);

        if (targets.length) {
          gsap.fromTo(
            targets,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full bg-white">
      <Container>
        {/* Main Title — stays outside the stacked panels */}
        <div ref={titleRef} className="pb-10 pt-20 sm:pb-10 sm:pt-24 overflow-hidden">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 leading-[1.15] tracking-[-0.02em]">
            {PREPROCESSED_WHY_CHOOSE_US.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
              >
                {word.map((item) => (
                  <ScrollLetter
                    key={item.index}
                    char={item.char}
                    index={item.index}
                    total={TOTAL_WHY_CHOOSE_CHARS}
                    progress={smoothProgress}
                  />
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="h-[1px] w-full bg-[#9c84a7] origin-left will-change-transform"
        />

        {/* Stacked rows — CSS sticky avoids GSAP pin / React DOM conflicts */}
        <div className="relative">
          {rows.map((row, index) => (
            <div
              key={index}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              data-stack-row
              className={`bg-white py-12 will-change-transform ${
                index === rows.length - 1 ? "" : "border-b border-[#9c84a7]"
              }`}
              style={{
                position: isReducedMotion ? "relative" : "sticky",
                top: isReducedMotion
                  ? undefined
                  : "var(--site-header-height, 7rem)",
                zIndex: index + 1,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Title */}
                <div className="lg:col-span-4 row-title will-change-transform">
                  <h3 className="text-xl sm:text-2xl font-normal text-gray-900 leading-snug">
                    <ScrollAnimatedText lines={Array.from(row.titleLines)} />
                  </h3>
                </div>

                {/* Center Description */}
                <div className="lg:col-span-4 flex justify-center row-desc will-change-transform">
                  <p className="text-sm sm:text-base font-light text-gray-600 leading-relaxed max-w-md">
                    {row.description}
                  </p>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-4 flex justify-end row-img will-change-transform">
                  <div className="aspect-[4/3] w-full max-w-xs sm:max-w-sm bg-black relative overflow-hidden group">
                    <Image
                      src={row.image}
                      alt={row.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

