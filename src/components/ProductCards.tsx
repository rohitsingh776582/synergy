"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    tag: "ROOF JOINT",
    title: "Single Skin Roof Panel",
    description:
      "Innovative joinery for seamless connections, structural integrity and ease of industrial roof installation.",
    image: "/images/products/roof_panel_hero.png",
    width: "w-[503px]",
    height: "h-[582px]",
    top: "top-[300px]",
    left: "left-[40px]",
  },
  {
    tag: "HIDDEN TONGUE & GROOVE",
    title: "Double Skin Wall Panel",
    description:
      "Modular wall panel joint profile engineered for zero thermal leak, air-tight interlocking and flush hygienic finish.",
    image: "/images/products/wall_panel_hero.png",
    width: "w-[479px]",
    height: "h-[556px]",
    top: "top-[200px]",
    left: "left-[580px]",
  },
  {
    tag: "SINGLE TONGUE & GROOVE",
    title: "Cold Storage Insulation Panel",
    description:
      "Cam-lock interlocking joint system ensuring sub-zero thermal retention down to -40°C in food & pharma logistics.",
    image: "/cold_storage.png",
    width: "w-[429px]",
    height: "h-[497px]",
    top: "top-[100px]",
    left: "left-[1100px]",
  },
  {
    tag: "DOUBLE TONGUE & GROOVE",
    title: "Sterile Cleanroom Modular Panel",
    description:
      "ISO Class cleanroom modular joint profile providing flush surface sterility, antimicrobial seal and airtight containment.",
    image: "/Panels/Generate_clean_room_image_2K_202608181422.jpeg",
    width: "w-[503px]",
    height: "h-[582px]",
    top: "top-[300px]",
    left: "left-[1580px]",
  },
  {
    tag: "M-SECTION PROFILE",
    title: "PIR Fire-Rated Thermal Barrier",
    description:
      "FM-approved polyisocyanurate thermal barrier joint tested for 120-minute structural fire endurance and extreme heat protection.",
    image: "/Panels/Generating_fire_insulation_image_2K_202608181424.jpeg",
    width: "w-[479px]",
    height: "h-[556px]",
    top: "top-[200px]",
    left: "left-[2120px]",
  },
  {
    tag: "THERMAL SANDWICH JOINT",
    title: "Heat Insulation Roof System",
    description:
      "Energy-efficient sandwich roofing joint minimizing solar heat gain and thermal conductivity for commercial facilities.",
    image: "/Panels/Heat insulation.png",
    width: "w-[429px]",
    height: "h-[497px]",
    top: "top-[100px]",
    left: "left-[2640px]",
  },
];

export default function ProductCards() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0px", "-1550px"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] w-full bg-[#F2F2F4] select-none"
    >
      {/* PINNED STICKY VIEWPORT CONTAINER (With top padding to clear fixed navbar) */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-[#F2F2F4] pt-16 sm:pt-20">
        
        {/* CARDS TRACK (ALL CARDS ALIGNED IN SAME STAGGERED HORIZONTAL LINE) */}
        <motion.div
          style={{ x }}
          className="relative flex w-[3100px] h-[900px] items-center"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`
                group
                absolute
                ${card.left}
                ${card.top}
                ${card.width}
                ${card.height}
                rounded-[8px]
                bg-white
                overflow-hidden
                transition-transform
                duration-300
                hover:scale-[1.02]
                flex flex-col
                border border-gray-200/80
              `}
            >
              {/* TOP 68%: Product Image */}
              <div className="relative w-full h-[68%] overflow-hidden bg-black/30">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="500px"
                />

                {/* Arrow Icon Button Overlaid on Image Top Right */}
                <button className="absolute right-[10px] top-[10px] z-10 flex h-[42px] w-[42px] items-center justify-center rounded-[4px] bg-white text-[#0752b8] font-bold group-hover:scale-105 transition-transform">
                  ↗
                </button>
              </div>

              {/* BOTTOM 32%: Product Text & Details */}
              <div className="w-full h-[32%] p-5 sm:p-6 flex flex-col justify-start bg-white text-gray-900">
                <div>
                  <h2 className="mb-2 text-[20px] sm:text-[23px] font-normal leading-tight font-sans text-gray-900">
                    {card.title}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] font-light leading-[1.45] text-gray-600 line-clamp-3">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-6 right-[3.2%] z-20 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500">
          <span>Scroll down to reveal cards</span>
          <span className="animate-pulse">→</span>
        </div>
      </div>
    </section>
  );
}
