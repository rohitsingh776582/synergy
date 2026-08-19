"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Target, Eye, Award } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const ENGINEERED_WORDS = ["Engineered", "with", "Purpose", "&", "Precision"];

let engineeredCounter = 0;
const PREPROCESSED_ENGINEERED = ENGINEERED_WORDS.map((word) =>
  word.split("").map((char) => ({
    char,
    index: engineeredCounter++,
  }))
);
const TOTAL_ENGINEERED_CHARS = engineeredCounter;

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

const items = [
  {
    title: "Our Mission",
    icon: Target,
    body: "To engineer energy-efficient PUF insulation systems that help businesses reduce thermal loss, lower carbon footprint, and cut operational energy costs across India.",
    image: "/images/MissionVisionPromise/WhatsApp Image 2026-08-18 at 17.24.42.jpeg",
  },
  {
    title: "Our Vision",
    icon: Eye,
    body: "To be the most trusted name in thermal insulation and modular panel engineering, built on zero-defect manufacturing and dispatch you can set a schedule around.",
    image: "/images/MissionVisionPromise/WhatsApp Image 2026-08-18 at 17.32.53.jpeg",
  },
  {
    title: "Our Promise",
    icon: Award,
    body: "To deliver consistent quality, on-time delivery, and engineering support on every project, insulated, efficient, built to last.",
    image: "/images/MissionVisionPromise/WhatsApp Image 2026-08-18 at 17.33.35.jpeg",
  },
];

export default function MissionVisionPromise() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(cards, { opacity: 0, y: 40 });

      let maxProgress = 0;
      const tl = gsap.timeline({ paused: true });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        duration: 1,
        ease: "power2.out",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "top 35%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > maxProgress) {
            maxProgress = self.progress;
            tl.progress(maxProgress);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f4f4f7] py-14 sm:py-18 md:py-22 font-sans text-gray-900">
      <Container>
        {/* Section Title */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#5b176e]">
            CORE VALUES & COMMITMENT
          </span>
          <h2 ref={titleRef} className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            {PREPROCESSED_ENGINEERED.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
              >
                {word.map((item) => (
                  <ScrollLetter
                    key={item.index}
                    char={item.char}
                    index={item.index}
                    total={TOTAL_ENGINEERED_CHARS}
                    progress={smoothProgress}
                  />
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* 50% Image / 50% Text Cards Stack */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {items.map(({ title, icon: Icon, body, image }, index) => {
            const isActive = hovered === index;
            const isEven = index % 2 === 0;

            return (
              <div
                key={title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`grid grid-cols-1 lg:grid-cols-2 border border-gray-200/90 bg-white overflow-hidden transition-all duration-300 ${
                  isActive ? "border-[#5b176e]/50" : "border-gray-200/90"
                }`}
              >
                {/* 50% Image Side */}
                <div
                  className={`relative w-full h-[260px] sm:h-[320px] lg:h-auto min-h-[280px] overflow-hidden bg-gray-100 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* 50% Text Side */}
                <div
                  className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-center ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-purple-50 text-[#5b176e]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-gray-600">
                    {body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
