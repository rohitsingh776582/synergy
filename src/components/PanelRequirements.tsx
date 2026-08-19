"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

type PanelType = "roof" | "wall";

interface CardItem {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  image?: string;
  isTextOnly?: boolean;
}

const PANEL_REQ_LINES = [
  ["One", "partner", "for", "every", "panel"],
  ["requirement"],
];

let panelReqCounter = 0;
const PREPROCESSED_PANEL_REQ = PANEL_REQ_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: panelReqCounter++,
    }))
  )
);
const TOTAL_PANEL_REQ_CHARS = panelReqCounter;

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

const panelCards: Record<PanelType, CardItem[]> = {
  roof: [
    {
      slug: "puf-roof-panels",
      name: "Insulated PUF Roofing Panels",
      category: "Roofing Panels",
      shortDescription:
        "Trapezoidal metallic roofing panels with continuous PUF foam core for leak-proof weather protection.",
      image: "/images/products/roof_panel_hero.png",
    },
    {
      slug: "puf-roof-panels",
      name: "Industrial Roof Sandwich Panels",
      category: "Roofing Panels",
      shortDescription:
        "High load-bearing roof panels engineered for warehouses, factories, and large-span commercial structures.",
      isTextOnly: true,
    },
    {
      slug: "puf-roof-panels",
      name: "Weather-Tight Roof Systems",
      category: "Roofing Panels",
      shortDescription:
        "Overlapping rib joint roof panels that drain rainwater efficiently while cutting HVAC energy costs.",
      image: "/images/products/puf_roof_panel_1786340661690.png",
    },
    {
      slug: "puf-roof-panels",
      name: "Commercial Roof Cladding Systems",
      category: "Roofing Panels",
      shortDescription:
        "Engineered insulated roof cladding designed for commercial facilities and large industrial spans.",
      isTextOnly: true,
    },
  ],
  wall: [
    {
      slug: "puf-wall-panels",
      name: "PUF Wall Panels",
      category: "Wall Panels",
      shortDescription:
        "High-density polyurethane insulated wall panels with tongue-and-groove joint design for optimal thermal performance.",
      image: "/images/products/wall_panel_hero.png",
    },
    {
      slug: "puf-wall-panels",
      name: "Modular Wall Enclosures",
      category: "Wall Panels",
      shortDescription:
        "Precision-engineered sandwich wall panels for industrial factories, cleanrooms, and commercial cladding.",
      isTextOnly: true,
    },
    {
      slug: "puf-wall-panels",
      name: "Cleanroom Insulated Walls",
      category: "Wall Panels",
      shortDescription:
        "Hygienic flush wall panels engineered for pharmaceutical cleanrooms and food processing plants.",
      image: "/images/products/cleanroom_panel.png",
    },
    {
      slug: "puf-wall-panels",
      name: "Cold Storage Wall Partition",
      category: "Wall Panels",
      shortDescription:
        "Ultra-low thermal conductivity wall panels designed for cold storage rooms and freezer facilities.",
      isTextOnly: true,
    },
  ],
};

export default function PanelRequirements() {
  const [activePanel, setActivePanel] = useState<PanelType>("roof");
  const cards = panelCards[activePanel];

  const sectionRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: titleContainerRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const trackContainer = trackContainerRef.current;
    const buttons = buttonsRef.current;
    const track = trackRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // 2. Subtext slide up from bottom on scroll
      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Carousel Track Container slide up from bottom on scroll
      if (trackContainer) {
        gsap.fromTo(
          trackContainer,
          { opacity: 0, y: 70 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trackContainer,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Buttons slide up from bottom on scroll
      if (buttons) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: buttons,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 5. Infinite Carousel loop on track
      if (track) {
        const numSets = 3;
        const totalCards = cards.length * numSets;
        const oneCardStepPercent = -100 / totalCards;

        const slideTl = gsap.timeline({ repeat: -1 });

        for (let i = 1; i <= cards.length; i++) {
          slideTl
            .to(track, {
              xPercent: oneCardStepPercent * i,
              duration: 0.65,
              ease: "power3.inOut",
            })
            .to({}, { duration: 1.4 });
        }

        slideTl.set(track, { xPercent: 0 });

        const handleMouseEnter = () => slideTl.pause();
        const handleMouseLeave = () => slideTl.play();

        track.addEventListener("mouseenter", handleMouseEnter);
        track.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          track.removeEventListener("mouseenter", handleMouseEnter);
          track.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, section);

    return () => ctx.revert();
  }, [activePanel, cards.length]);

  // Triple cards array to ensure continuous fill with zero empty space
  const displayCards = [...cards, ...cards, ...cards];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white overflow-hidden py-16"
    >
      <Container>
        <div ref={titleContainerRef} className="max-w-[680px]">
          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-normal
              text-[#111827]
              leading-[1.15]
              tracking-[-0.02em]
            "
          >
            {PREPROCESSED_PANEL_REQ.map((line, lineIdx) => (
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
                        total={TOTAL_PANEL_REQ_CHARS}
                        progress={smoothProgress}
                      />
                    ))}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </h2>

          <p
            ref={textRef}
            className="
              mt-6
              max-w-[650px]
              text-sm
              sm:text-base
              font-light
              text-[#64748b]
              leading-[1.9]
              will-change-transform
            "
          >
            From cold rooms to clean rooms, warehouse roofing to modular
            cabins, Synergy PUF delivers high-performance insulation
            tailored to your exact specifications
          </p>
        </div>
      </Container>

      <div
        ref={trackContainerRef}
        className="mt-12 w-full overflow-hidden will-change-transform"
      >
        <div
          ref={trackRef}
          key={activePanel}
          className="flex gap-8 w-max will-change-transform px-4"
        >
          {displayCards.map((item, idx) => (
            <div
              key={`${activePanel}-${idx}`}
              className="
                group
                w-[320px]
                sm:w-[420px]
                md:w-[480px]
                flex-shrink-0
                overflow-hidden
                bg-white
                border
                border-gray-200
                transition-all
                duration-300
                flex
                flex-col
                justify-between
              "
            >
              {item.isTextOnly ? (
                <div
                  className="
                    relative
                    aspect-[16/10]
                    w-full
                    bg-white
                    p-6
                    sm:p-8
                    flex
                    flex-col
                    justify-center
                    items-center
                    text-center
                    overflow-hidden
                  "
                >
                  <div className="w-10 h-10 rounded-full bg-[#5b176e]/10 flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5 text-[#5b176e]" />
                  </div>

                  <span className="text-xs uppercase tracking-[2px] text-[#7b3f8f] font-light mb-2">
                    {item.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-normal text-[#111827] leading-tight mb-4">
                    {item.name}
                  </h3>

                  <Link
                    href={`/products/${item.slug}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-light
                      text-[#5b176e]
                      transition-colors
                      hover:text-[#461056]
                    "
                  >
                    <span>Explore Product</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="
                        object-cover
                        opacity-90
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Container>
        <div
          ref={buttonsRef}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 will-change-transform"
        >
          <button
            type="button"
            onClick={() => setActivePanel("roof")}
            className={`
              px-8
              py-3.5
              text-base
              font-light
              transition-all
              duration-300
              ${
                activePanel === "roof"
                  ? "bg-[#5b176e] text-white hover:bg-[#461056]"
                  : "border border-gray-400 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            Roof Panels
          </button>

          <button
            type="button"
            onClick={() => setActivePanel("wall")}
            className={`
              px-8
              py-3.5
              text-base
              font-light
              transition-all
              duration-300
              ${
                activePanel === "wall"
                  ? "bg-[#5b176e] text-white hover:bg-[#461056]"
                  : "border border-gray-400 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            Wall Panels
          </button>
        </div>
      </Container>
    </section>
  );
}

