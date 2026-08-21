"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  MotionValue,
} from "framer-motion";

interface GalleryCard {
  id: number;
  baseOffset: number; // Base horizontal position offset along the track
  title: string;
  category: string;
  src: string;
  isCenter?: boolean;
}

const PROVEN_LINES = [
  {
    words: ["Proven", "installations"],
    isSub: false,
  },
  {
    words: ["across", "diverse", "industries"],
    isSub: true,
  },
];

let provenCounter = 0;
const PREPROCESSED_PROVEN = PROVEN_LINES.map((lineObj) => ({
  isSub: lineObj.isSub,
  words: lineObj.words.map((word) =>
    word.split("").map((char) => ({
      char,
      index: provenCounter++,
    }))
  ),
}));
const TOTAL_PROVEN_CHARS = provenCounter;

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

const galleryCards: GalleryCard[] = [
  {
    id: 1,
    baseOffset: -600,
    title: "PUF Industrial Facility",
    category: "Factory Cladding",
    src: "/images/applications/puf_factory_1786340180982.png",
  },
  {
    id: 2,
    baseOffset: -400,
    title: "Pharma Cleanroom Unit",
    category: "Controlled Atmosphere",
    src: "/images/applications/cleanroom_panel_1786340678778.png",
  },
  {
    id: 3,
    baseOffset: -200,
    title: "Cold Chain Logistics",
    category: "Cold Storage",
    src: "/images/hero/cold_storage.png",
  },
  {
    id: 4,
    baseOffset: 0,
    title: "Futuristic Facility",
    category: "Industrial Architecture",
    src: "/hero_futuristic_architecture.png",
    isCenter: true,
  },
  {
    id: 5,
    baseOffset: 200,
    title: "Automated PUF Line",
    category: "Manufacturing Unit",
    src: "/images/hero/puf_factory.png",
  },
  {
    id: 6,
    baseOffset: 400,
    title: "Aerial Project Site",
    category: "Large Industrial Complex",
    src: "/images/HeroSection/DJI_20260729155134_0345_D.JPG.jpeg",
  },
  {
    id: 7,
    baseOffset: 600,
    title: "Wall Insulation System",
    category: "Sandwich Panels",
    src: "/images/products/wall_panel_hero.png",
  },
  {
    id: 8,
    baseOffset: 800,
    title: "Roof Panel Cladding",
    category: "Thermal Cladding",
    src: "/images/applications/puf_roof_panel_1786340661690.png",
  },
];

export default function ProjectGalleryCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const autoDrift = useMotionValue(0);

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

  // Continuous subtle auto-drift (Right to Left horizontal flow: -18px per second)
  useAnimationFrame((_, delta) => {
    const current = autoDrift.get();
    autoDrift.set(current - (delta / 1000) * 24);
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 18,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // Scroll down maps from +500px (Right) to -500px (Left)
  const scrollFlowX = useTransform(smoothProgress, [0, 1], [450, -450]);

  // Combine auto-drift and scroll-driven Right-to-Left movement
  const totalFlowX = useTransform(
    [autoDrift, scrollFlowX],
    ([drift, scrollX]) => (drift as number) + (scrollX as number)
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF8F5] pt-1 sm:pt-2 md:pt-3 pb-2 sm:pb-3 md:pb-4 px-3 sm:px-6 md:px-8 font-sans overflow-hidden"
    >
      {/* Outer Container */}
      <div className="mx-auto max-w-7xl relative bg-[#FAF8F5] overflow-hidden">
        
        {/* Hero Section Container inside Frame */}
        <div className="relative pt-2 sm:pt-3 pb-0 px-4 sm:px-8 text-center">
          

          {/* Pill Badge */}
          <div className="inline-flex items-center  bg-[#EEEEF1] border border-gray-200/90 px-4 py-1.5 text-xs font-medium text-gray-700  mb-4">
            Join over 100,000 happy clients
          </div>

          {/* Main Heading */}
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.12] max-w-3xl mx-auto">
            {PREPROCESSED_PROVEN.map((lineObj, lineIdx) => {
              if (lineObj.isSub) {
                return (
                  <span key={lineIdx} className="block text-gray-400 font-semibold mt-1">
                    {lineObj.words.map((word, wordIdx) => (
                      <span
                        key={wordIdx}
                        className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
                      >
                        {word.map((item) => (
                          <ScrollLetter
                            key={item.index}
                            char={item.char}
                            index={item.index}
                            total={TOTAL_PROVEN_CHARS}
                            progress={smoothTitleProgress}
                          />
                        ))}
                      </span>
                    ))}
                  </span>
                );
              }
              return (
                <React.Fragment key={lineIdx}>
                  {lineObj.words.map((word, wordIdx) => (
                    <span
                      key={wordIdx}
                      className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
                    >
                      {word.map((item) => (
                        <ScrollLetter
                          key={item.index}
                          char={item.char}
                          index={item.index}
                          total={TOTAL_PROVEN_CHARS}
                          progress={smoothTitleProgress}
                        />
                      ))}
                    </span>
                  ))}
                </React.Fragment>
              );
            })}
          </h2>

          {/* Subtitle */}
          <motion.p
            ref={subtextRef}
            style={{ y: subtextY, opacity: subtextOpacity }}
            className="mt-4 text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed transform-gpu will-change-transform"
          >
            Explore our pan-India installations  cold storage logistics, pharma cleanrooms, food processing plants & manufacturing facilities.
          </motion.p>

          {/* 3D Arc Right-to-Left Moving Stage */}
          <div
            style={{ perspective: "1300px", perspectiveOrigin: "50% 50%" }}
            className="relative z-10 flex justify-center items-center h-[340px] sm:h-[400px] md:h-[430px] overflow-hidden mt-4 mb-0"
          >
            {/* Render Cards moving Right to Left */}
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full h-full flex justify-center items-center transform-gpu"
            >
              {galleryCards.map((card) => (
                <FlowingRightToLeftCard
                  key={card.id}
                  card={card}
                  totalFlowX={totalFlowX}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function FlowingRightToLeftCard({
  card,
  totalFlowX,
}: {
  card: GalleryCard;
  totalFlowX: MotionValue<number>;
}) {
  // Wrap position horizontally within a 1600px track so cards loop endlessly from Right to Left
  const x = useTransform(totalFlowX, (flow) => {
    const rawX = card.baseOffset + flow;
    // Loop modulo around -800px to +800px
    const wrappedX = ((((rawX + 800) % 1600) + 1600) % 1600) - 800;
    return wrappedX;
  });

  // Calculate 3D rotateY based on current horizontal X position (Right = tilt right, Left = tilt left)
  const rotateY = useTransform(x, (posX) => (posX / 600) * 24);

  // Dynamic scale: Center card is largest (1.08), outer cards taper down
  const scale = useTransform(x, (posX) => {
    const absX = Math.abs(posX);
    return Math.max(0.82, 1.08 - (absX / 800) * 0.3);
  });

  // Dynamic opacity: Fade smoothly at edges when exiting left / entering right
  const opacity = useTransform(x, (posX) => {
    const absX = Math.abs(posX);
    if (absX > 650) return Math.max(0, 1 - (absX - 650) / 150);
    return 1;
  });

  return (
    <motion.div
      style={{
        x,
        rotateY,
        z: useTransform(x, (posX) => 50 - Math.abs(posX) * 0.12),
        scale,
        opacity,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      className="absolute aspect-[3/4] w-[130px] sm:w-[170px] md:w-[200px] lg:w-[230px] overflow-hidden rounded-[22px] sm:rounded-[26px] bg-gray-900 border border-gray-200/80  will-change-transform transform-gpu group"
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        unoptimized
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Card Overlay Details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 p-3 sm:p-4 flex flex-col justify-end text-left">
        <span className="text-[10px] sm:text-xs font-semibold text-white truncate">
          {card.title}
        </span>
        <span className="text-[9px] sm:text-[10px] text-gray-300 truncate">
          {card.category}
        </span>
      </div>
    </motion.div>
  );
}











