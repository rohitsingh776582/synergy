"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    tag: "ISSUANCE",
    title: "C8 Registry",
    description:
      "Compliant token issuance engine enabling institutions to create, manage and control digital assets with embedded smart contract logic.",
    type: "registry",
    width: "w-[503px]",
    height: "h-[582px]",
    top: "top-[300px]",
    left: "left-[40px]",
  },
  {
    tag: "YIELD",
    title: "C8 Vault",
    description:
      "Staking and yield infrastructure providing access to compliant returns on digital assets within the Canton Network ecosystem.",
    type: "vault",
    width: "w-[479px]",
    height: "h-[556px]",
    top: "top-[200px]",
    left: "left-[580px]",
  },
  {
    tag: "SETTLEMENT",
    title: "Private Transfer Infrastructure",
    description:
      "Infrastructure enabling institutions to move digital assets with configurable privacy, controlled disclosure and reliable settlement across complex workflows.",
    type: "settlement",
    width: "w-[429px]",
    height: "h-[497px]",
    top: "top-[100px]",
    left: "left-[1100px]",
  },
  {
    tag: "LIQUIDITY",
    title: "C8 Liquidity Engine",
    description:
      "Institutional asset tokenization and automated liquidity pool management across decentralized enterprise networks.",
    type: "registry",
    width: "w-[503px]",
    height: "h-[582px]",
    top: "top-[300px]",
    left: "left-[1580px]",
  },
  {
    tag: "COMPLIANCE",
    title: "C8 Zero-Knowledge Auditor",
    description:
      "Automated real-time regulatory compliance framework with zero-knowledge identity verification and confidential reporting.",
    type: "vault",
    width: "w-[479px]",
    height: "h-[556px]",
    top: "top-[200px]",
    left: "left-[2120px]",
  },
  {
    tag: "CUSTODY",
    title: "C8 Multi-Party Treasury",
    description:
      "Next-generation multi-party computation (MPC) cold key custody architecture for sovereign wealth and enterprise balance sheets.",
    type: "settlement",
    width: "w-[429px]",
    height: "h-[497px]",
    top: "top-[100px]",
    left: "left-[2640px]",
  },
];

function CardGraphic({ type }: { type: string }) {
  if (type === "registry") {
    return (
      <svg
        className="w-full h-[270px] text-white/80"
        viewBox="0 0 300 240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="50" y="40" width="200" height="150" rx="2" />
        <rect x="70" y="60" width="160" height="110" />
        <rect x="90" y="80" width="120" height="70" />
        <rect x="42" y="70" width="16" height="16" fill="#0752b8" />
        <rect x="242" y="70" width="16" height="16" fill="#0752b8" />
        <rect x="42" y="140" width="16" height="16" fill="#0752b8" />
        <rect x="242" y="140" width="16" height="16" fill="#0752b8" />
        <rect x="180" y="32" width="16" height="16" fill="#0752b8" />
        <rect x="100" y="182" width="16" height="16" fill="#0752b8" />
        <path d="M10 80 H42" />
        <path d="M10 100 H70" />
        <path d="M10 120 H90" />
        <path d="M10 150 H42" />
        <path d="M258 80 H290" />
        <path d="M230 100 H290" />
        <path d="M210 120 H290" />
        <path d="M258 150 H290" />
      </svg>
    );
  }

  if (type === "vault") {
    return (
      <svg
        className="w-full h-[270px] text-white/80"
        viewBox="0 0 300 240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M10 120 H60 V50 H240 V190 H80 V70 H220 V170 H100 V90 H200 V150 H120 V110 H180" />
      </svg>
    );
  }

  return (
    <svg
      className="w-full h-[270px] text-white/80"
      viewBox="0 0 300 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M150 10 V40 H180 V100 H150 V180 H180 V210" />
      <path d="M135 10 V30 H195 V110 H135 V190 H195 V210" />
      <path d="M120 10 V20 H210 V120 H120 V200 H210 V210" />
      <rect x="140" y="90" width="35" height="35" fill="#0752b8" strokeWidth="1.5" />
      <rect x="165" y="195" width="20" height="20" fill="#0752b8" strokeWidth="1.5" />
    </svg>
  );
}

export default function ProductsGridShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth horizontal scroll animation: slides track left so right cards move in on the same line alignment
  const x = useTransform(scrollYProgress, [0, 1], ["0px", "-1550px"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] w-full bg-[#111111] select-none"
    >
      {/* PINNED STICKY VIEWPORT CONTAINER (With top padding to clear fixed navbar) */}
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-[#111111] pt-16 sm:pt-20">
        
        {/* CARDS TRACK (ALL CARDS ALIGNED IN SAME STAGGERED HORIZONTAL LINE) */}
        <motion.div
          style={{ x }}
          className="relative flex w-[3100px] h-[900px] items-center"
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`
                absolute
                ${card.left}
                ${card.top}
                ${card.width}
                ${card.height}
                rounded-[8px]
                bg-[#0752b8]
                overflow-hidden
                shadow-2xl
                transition-transform
                duration-300
                hover:scale-[1.02]
              `}
            >
              {/* Tag */}
              <div className="absolute left-[24px] top-[15px]">
                <span className="inline-flex bg-[#3975c8] px-[10px] py-[5px] text-[11px] font-semibold text-white uppercase rounded-[3px]">
                  {card.tag}
                </span>
              </div>

              {/* Arrow Button */}
              <button className="absolute right-[10px] top-[10px] flex h-[45px] w-[45px] items-center justify-center rounded-[4px] bg-white text-[#0752b8] font-bold shadow-md hover:scale-105 transition-transform">
                ↗
              </button>

              {/* Graphic Artwork */}
              <div className="absolute left-0 top-[65px] h-[300px] w-full opacity-80 pointer-events-none">
                <CardGraphic type={card.type} />
              </div>

              {/* Content */}
              <div className="absolute bottom-[25px] left-[24px] right-[24px]">
                <h2 className="mb-[12px] text-[25px] font-medium leading-tight text-white font-sans">
                  {card.title}
                </h2>
                <p className="max-w-[450px] text-[16px] font-normal leading-[1.4] text-white">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-6 right-[3.2%] z-20 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60">
          <span>Scroll down to reveal cards</span>
          <span className="animate-pulse">→</span>
        </div>
      </div>
    </section>
  );
}
