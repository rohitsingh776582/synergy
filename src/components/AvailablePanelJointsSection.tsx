"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Container from "./Container";

export const jointProfiles = [
  {
    id: "roof-joint",
    title: "Roof Joint",
    videoSrc: "/RoofVideo/Roof.mp4",
    col: "sm:col-start-1",
    row: "sm:row-start-1",
    initialX: -65,
    initialY: 0,
  },
  {
    id: "hidden-tongue",
    title: "Hidden Tongue\n& Groove",
    videoSrc: "/RoofVideo/Wall 1.mp4",
    col: "sm:col-start-2",
    row: "sm:row-start-2",
    initialX: 0,
    initialY: 65,
  },
  {
    id: "single-tongue",
    title: "Single Tongue\n& Groove",
    videoSrc: "/RoofVideo/Wall 2.mp4",
    col: "sm:col-start-3",
    row: "sm:row-start-1",
    initialX: 0,
    initialY: -65,
  },
  {
    id: "m-section",
    title: "M-Section",
    videoSrc: "/RoofVideo/Wall 3.mp4",
    col: "sm:col-start-4",
    row: "sm:row-start-2",
    initialX: 0,
    initialY: 65,
  },
  {
    id: "double-tongue",
    title: "Double Tongue\n& Groove",
    videoSrc: "/RoofVideo/Wall 1.mp4",
    col: "sm:col-start-5",
    row: "sm:row-start-1",
    initialX: 65,
    initialY: 0,
  },
];

function JointBoxItem({
  joint,
  progress,
}: {
  joint: (typeof jointProfiles)[number];
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 1], [joint.initialX, 0]);
  const y = useTransform(progress, [0, 1], [joint.initialY, 0]);
  const opacity = useTransform(progress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      style={{ x, y, opacity }}
      className={`${joint.col} ${joint.row} bg-black aspect-square overflow-hidden flex items-center justify-center border border-black transition-transform duration-300 hover:z-10 hover:scale-105`}
    >
      <video
        src={joint.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

const JOINTS_HEADING_WORDS = ["Available", "Panel", "Joints."];

let jointsHeadingCounter = 0;
const PREPROCESSED_JOINTS_HEADING = JOINTS_HEADING_WORDS.map((word) =>
  word.split("").map((char) => ({
    char,
    index: jointsHeadingCounter++,
  }))
);
const TOTAL_JOINTS_HEADING_CHARS = jointsHeadingCounter;

function HeadingScrollLetter({
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

export default function AvailablePanelJointsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "start 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 25,
    mass: 0.1,
  });

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
    <section ref={sectionRef} className="py-20 bg-[#e6e6e8] overflow-hidden">
      <Container className="text-center">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 tracking-tight">
          {PREPROCESSED_JOINTS_HEADING.map((word, wordIdx) => (
            <span
              key={wordIdx}
              className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
            >
              {word.map((item) => (
                <HeadingScrollLetter
                  key={item.index}
                  char={item.char}
                  index={item.index}
                  total={TOTAL_JOINTS_HEADING_CHARS}
                  progress={smoothTitleProgress}
                />
              ))}
            </span>
          ))}
        </h2>
        <motion.p
          ref={subtextRef}
          style={{ y: subtextY, opacity: subtextOpacity }}
          className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed transform-gpu will-change-transform"
        >
          Innovative joinery for seamless connections, structural integrity and ease of installation.
        </motion.p>

        {/* Staggered 5-Box Interlocking Grid */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 max-w-4xl mx-auto">
            {jointProfiles.map((joint) => (
              <JointBoxItem
                key={joint.id}
                joint={joint}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}



