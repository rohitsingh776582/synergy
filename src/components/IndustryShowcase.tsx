"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INDUSTRY_HEADING_LINES = [
  ["Insulation", "for"],
  ["every", "industry."],
];

let industryCounter = 0;
const PREPROCESSED_INDUSTRY_HEADING = INDUSTRY_HEADING_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: industryCounter++,
    }))
  )
);
const TOTAL_INDUSTRY_CHARS = industryCounter;

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

export default function IndustryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textHeaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothTitleProgress = useSpring(titleScrollProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    const textHeader = textHeaderRef.current;
    if (!textHeader) return;

    const ctx = gsap.context(() => {
      const children = Array.from(textHeader.children).filter((el) => el.tagName !== "H2");
      if (children.length) {
        gsap.set(children, { opacity: 0, y: 160, force3D: true });

        gsap.to(children, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textHeader,
            start: "top 95%",
            end: "top 30%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }
    }, textHeader);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Scale, border radius & opacity transformation on scroll
  const scale = useTransform(scrollYProgress, [0.05, 0.85], [0.1, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.05, 0.85], [64, 0]);
  const imgScale = useTransform(scrollYProgress, [0.05, 0.85], [1.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0.2, 1, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-16 sm:py-24 font-sans overflow-hidden"
    >
      <div ref={textHeaderRef} className="text-center px-4 mb-10 sm:mb-14 max-w-4xl mx-auto">
        <h2 ref={titleRef} className="mt-3 text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.08]">
          {PREPROCESSED_INDUSTRY_HEADING.map((line, lineIdx) => (
            <React.Fragment key={lineIdx}>
              {lineIdx > 0 && <br className="hidden sm:inline" />}
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
                      total={TOTAL_INDUSTRY_CHARS}
                      progress={smoothTitleProgress}
                    />
                  ))}
                </span>
              ))}
            </React.Fragment>
          ))}
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
          From food processing and pharmaceuticals to commercial construction and logistics, our PUF panels are engineered to maintain stringent controls across all sector applications.
        </p>
      </div>

      {/* Expandable Image Frame: Grows from ultra-small capsule on scroll */}
      <div className="w-full flex justify-center items-center py-6">
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
          }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden  origin-center border border-purple-200/50"
        >
          <motion.div
            style={{ scale: imgScale }}
            className="relative h-full w-full"
          >
            <Image
              src="/cold_storage.png"
              alt="Insulation for every industry showcase"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
