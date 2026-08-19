"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Container from "./Container";

export const manufacturingSteps = [
  {
    title: "Hi-Tech Automated Facility",
    description: "Precision roll forming, high pressure PU injection for uniform density and superior insulation.",
  },
  {
    title: "Steel Treatment & Coating",
    description: "Corrosion-resistant pre-coated steel sheets for long-lasting exterior and interior durability.",
  },
  {
    title: "Advanced Powder Coating",
    description: "High grade powders applied for smooth finish, vibrant colors and superior weather resistance.",
  },
  {
    title: "Stringent Quality Control",
    description: "Continuous quality checks during manufacturing ensure zero defects and exact tolerance compliance.",
  },
  {
    title: "Panel Compatibility & Precision",
    description: "Automated cutting, precise edge profiles, and seamless fitting for easy on-site installation.",
  },
];

const MFG_LINES = [
  ["Manufacturing"],
  ["that", "delivers."],
];

let mfgCounter = 0;
const PREPROCESSED_MFG = MFG_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: mfgCounter++,
    }))
  )
);
const TOTAL_MFG_CHARS = mfgCounter;

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

export default function ManufacturingThatDeliversSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
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
    <section className="py-20 bg-white">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Paragraph */}
        <div className="lg:col-span-5 pt-4">
          <h2 ref={titleRef} className="text-3xl sm:text-5xl font-normal text-gray-900 tracking-tight leading-tight">
            {PREPROCESSED_MFG.map((line, lineIdx) => (
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
                        total={TOTAL_MFG_CHARS}
                        progress={smoothProgress}
                      />
                    ))}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </h2>
          <motion.p
            ref={subtextRef}
            style={{ y: subtextY, opacity: subtextOpacity }}
            className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed transform-gpu will-change-transform"
          >
            From high-volume runs to custom, project-tailored solutions, our facilities combine modern machinery, precise process control, and rigorous testing for high quality results.
          </motion.p>
        </div>

        {/* Right Column: Vertical Timeline */}
        <div className="lg:col-span-7">
          <div className="relative border-l-2 border-[#5b176e] pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-10">
            {manufacturingSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Purple Node Bullet */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 bg-[#5b176e] ring-4 ring-white" />
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#5b176e] transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
