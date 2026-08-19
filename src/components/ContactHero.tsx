"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Container from "./Container";

const CONTACT_HEADING_LINES = [
  ["Contact", "Synergy", "PUF"],
  ["Engineering", "Team"],
];

let contactCounter = 0;
const PREPROCESSED_CONTACT_HEADING = CONTACT_HEADING_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: contactCounter++,
    }))
  )
);
const TOTAL_CONTACT_CHARS = contactCounter;

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

export default function ContactHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothTitleProgress = useSpring(titleScrollProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const { scrollYProgress: subtextScrollProgress } = useScroll({
    target: subtextRef,
    offset: ["start 90%", "center 50%"],
  });

  const smoothSubtextProgress = useSpring(subtextScrollProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  const subtextY = useTransform(smoothSubtextProgress, [0, 0.45], [50, 0]);
  const subtextOpacity = useTransform(smoothSubtextProgress, [0, 0.40], [0, 1]);

  return (
    <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-16 text-center border-b border-gray-100">
      <Container>
        <span className="rounded-none bg-purple-100 px-4 py-1.5 text-xs font-extrabold text-[#5b176e] tracking-wider uppercase">
          Connect With Us
        </span>
        <h1 ref={titleRef} className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          {PREPROCESSED_CONTACT_HEADING.map((line, lineIdx) => (
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
                      total={TOTAL_CONTACT_CHARS}
                      progress={smoothTitleProgress}
                    />
                  ))}
                </span>
              ))}
            </React.Fragment>
          ))}
        </h1>
        <motion.p
          ref={subtextRef}
          style={{ y: subtextY, opacity: subtextOpacity }}
          className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto transform-gpu will-change-transform"
        >
          Have a technical query or require site inspection? Our insulation specialists are ready to assist you.
        </motion.p>
      </Container>
    </section>
  );
}
