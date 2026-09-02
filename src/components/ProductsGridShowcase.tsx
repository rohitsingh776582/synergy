"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const cards = [
  {
    tag: "ROOF JOINT",
    title: "Single Skin Roof Panel",
    description:
      "Innovative joinery for seamless connections, structural integrity and ease of industrial roof installation.",
    image: "/images/products/roof_panel_hero.png",
    width: "w-[330px] sm:w-[365px]",
    height: "h-[450px] sm:h-[480px]",
    top: "top-0",
    left: "left-[40px]",
  },
  {
    tag: "HIDDEN TONGUE & GROOVE",
    title: "Double Skin Wall Panel",
    description:
      "Modular wall panel joint profile engineered for zero thermal leak, air-tight interlocking and flush hygienic finish.",
    image: "/images/products/wall_panel_hero.png",
    width: "w-[330px] sm:w-[365px]",
    height: "h-[450px] sm:h-[480px]",
    top: "top-0",
    left: "left-[445px]",
  },
  {
    tag: "SINGLE TONGUE & GROOVE",
    title: "Cold Storage Insulation Panel",
    description:
      "Cam-lock interlocking joint system ensuring sub-zero thermal retention down to -40°C in food & pharma logistics.",
    image: "/images/products/cold_storage_1786340194998.png",
    width: "w-[330px] sm:w-[365px]",
    height: "h-[450px] sm:h-[480px]",
    top: "top-0",
    left: "left-[850px]",
  },
  {
    tag: "DOUBLE TONGUE & GROOVE",
    title: "Sterile Cleanroom Modular Panel",
    description:
      "ISO Class cleanroom modular joint profile providing flush surface sterility, antimicrobial seal and airtight containment.",
    image: "/images/products/cleanroom_panel.png",
    width: "w-[330px] sm:w-[365px]",
    height: "h-[450px] sm:h-[480px]",
    top: "top-0",
    left: "left-[1255px]",
  },
  {
    tag: "M-SECTION PROFILE",
    title: "PIR Fire-Rated Thermal Barrier",
    description:
      "FM-approved polyisocyanurate thermal barrier joint tested for 120-minute structural fire endurance and extreme heat protection.",
    image: "/images/products/puf_panel_stack_1786340168248.png",
    width: "w-[330px] sm:w-[365px]",
    height: "h-[450px] sm:h-[480px]",
    top: "top-0",
    left: "left-[1660px]",
  },
  {
    tag: "THERMAL SANDWICH JOINT",
    title: "Heat Insulation Roof System",
    description:
      "Energy-efficient sandwich roofing joint minimizing solar heat gain and thermal conductivity for commercial facilities.",
    image: "/images/products/puf_roof_panel.png",
    width: "w-[330px] sm:w-[365px]",
    height: "h-[450px] sm:h-[480px]",
    top: "top-0",
    left: "left-[2065px]",
  },
];

function ShowcaseAnimatedCard({
  card,
  idx,
  totalCards,
  scrollYProgress,
}: {
  card: (typeof cards)[0];
  idx: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / Math.max(1, totalCards - 1);
  const startProgress = Math.max(0, (idx - 1) * step);
  const centerProgress = idx * step;
  const endProgress = Math.min(1, (idx + 1) * step);

  const scale = useTransform(
    scrollYProgress,
    [startProgress, centerProgress, endProgress],
    [0.9, 1.02, 0.95]
  );

  const opacity = useTransform(
    scrollYProgress,
    [startProgress, centerProgress, endProgress],
    [0.8, 1, 0.9]
  );

  return (
    <motion.div
      style={{ scale, opacity, willChange: "transform, opacity" }}
      className={`
        group
        absolute
        ${card.left}
        ${card.top}
        ${card.width}
        ${card.height}
        rounded-[12px]
        bg-white
        overflow-hidden
        hover:shadow-2xl
        flex flex-col
        border border-gray-200/90
        shadow-[0_15px_45px_rgba(0,0,0,0.08)]
      `}
    >
      {/* TOP 52%: Product Image */}
      <div className="relative w-full h-[52%] overflow-hidden bg-gray-100">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          sizes="400px"
        />

        {/* Arrow Icon Button Overlaid on Image Top Right */}
        <button className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-[6px] bg-white text-[#0752b8] font-bold shadow-md hover:scale-105 transition-transform text-sm">
          ↗
        </button>
      </div>

      {/* BOTTOM 48%: Product Text & Details */}
      <div className="w-full h-[48%] p-4 sm:p-5 flex flex-col justify-between bg-white text-gray-900 overflow-hidden">
        <div>
          <h2 className="mb-1.5 text-[17px] sm:text-[19.5px] font-medium leading-snug font-sans text-gray-900 tracking-tight">
            {card.title}
          </h2>
          <p className="text-[12px] sm:text-[13px] font-normal leading-relaxed text-gray-600">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsGridShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth horizontal scroll animation: slides track left as user scrolls down page
  const x = useTransform(scrollYProgress, [0, 1], ["0px", "-1550px"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[260vh] w-full bg-[#F2F2F4] select-none"
    >
      {/* PINNED STICKY VIEWPORT CONTAINER WITH FULL CLEARANCE */}
      <div className="sticky top-[80px] flex h-[calc(100vh-80px)] w-full items-center overflow-hidden bg-[#F2F2F4] pt-8 pb-12">
        {/* CARDS TRACK */}
        <motion.div
          style={{ x }}
          className="relative flex w-[2500px] h-[700px] items-center"
        >
          {cards.map((card, idx) => (
            <ShowcaseAnimatedCard
              key={idx}
              card={card}
              idx={idx}
              totalCards={cards.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-4 right-[3.2%] z-20 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500">
          <span>Scroll down to reveal cards</span>
          <span className="animate-pulse">→</span>
        </div>
      </div>
    </section>
  );
}
