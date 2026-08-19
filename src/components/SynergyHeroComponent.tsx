"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import Container from './Container';

const HERO_LINES = [
  ["Build", "your", "next"],
  ["project", "with"],
  ["Synergy", "PUF."],
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

export default function SynergyHeroComponent() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section className="w-full bg-[#f8f6f9] py-16 md:py-20">
      <Container className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Heading and Subtext */}
        <div className="flex flex-col space-y-6">
          <h2 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1c1917] tracking-tight leading-[1.15]">
            {PREPROCESSED_HERO.map((line, lineIdx) => (
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
                        total={TOTAL_HERO_CHARS}
                        progress={smoothProgress}
                      />
                    ))}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-[#686563] text-sm sm:text-base max-w-md leading-relaxed">
            High-performance insulated panel solutions delivered on time, every time across India.
          </p>
        </div>

        {/* Right Column: Staggered Layout & Action Buttons */}
        <div className="flex justify-center lg:justify-end">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[460px]">
            
            {/* Top-Left Image: PUF Wall Panel */}
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-purple-100 p-3 group transition-all duration-300">
              <Image
                src="/images/products/wall_panel_hero.png"
                alt="Synergy PUF Wall Panel"
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            
            {/* Top-Right Empty Space */}
            <div></div>

            {/* Bottom-Left Buttons */}
            <div className="flex flex-col justify-center gap-3">
              <Link href="/quote" className="bg-[#532247] hover:bg-[#431b38] text-white px-5 py-3.5 text-sm font-medium flex items-center justify-between transition-colors">
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <a href="/brochure.pdf" download className="bg-[#ab98a7] hover:bg-[#9c8798] text-[#2c1b29] px-5 py-3.5 text-sm font-medium flex items-center justify-between transition-colors">
                <span>Download Brochure</span>
                <Download className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Bottom-Right Image: PUF Roof Panel */}
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-purple-100 p-3 group transition-all duration-300">
              <Image
                src="/images/products/roof_panel_hero.png"
                alt="Synergy PUF Roof Panel"
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
