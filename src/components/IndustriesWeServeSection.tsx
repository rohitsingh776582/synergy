"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Factory,
  Snowflake,
  FlaskConical,
  Package,
  Sprout,
  Server,
  Zap,
  Building2,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import Container from "./Container";

interface IndustryItem {
  id: string;
  name: string;
  icon: typeof Factory;
  description: string;
  useCases: string[];
  imageSrc: string;
}

const SERVICES_WORDS = ["Services", "tailored", "to", "every", "sector"];

let servicesCounter = 0;
const PREPROCESSED_SERVICES = SERVICES_WORDS.map((word) =>
  word.split("").map((char) => ({
    char,
    index: servicesCounter++,
  }))
);
const TOTAL_SERVICES_CHARS = servicesCounter;

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

const industriesData: IndustryItem[] = [
  {
    id: "industrial",
    name: "Industrial & Manufacturing",
    icon: Factory,
    imageSrc: "/images/Servicestailored/Industrial & Manufacturing.jpg",
    description:
      "Extreme thermal control for high-output facilities where temperature precision directly impacts product quality and energy efficiency across the production line.",
    useCases: [
      "Manufacturing Plants",
      "Engineering Workshops",
      "Textile Units",
      "Automotive Facilities",
      "Electronics Manufacturing",
      "Assembly Plants",
    ],
  },
  {
    id: "cold-chain",
    name: "Cold Chain & Food Processing",
    icon: Snowflake,
    imageSrc: "/images/Servicestailored/Cold Chain & Food Processing.jpg",
    description:
      "Strict temperature preservation down to -35°C for blast freezers, dairy processing, and perishable food logistics compliant with food-safety norms.",
    useCases: [
      "Blast Freezers & Chillers",
      "Dairy Processing Facilities",
      "Meat & Seafood Packing",
      "Ripening Chambers",
      "Fruit & Veg Storage",
      "Refrigerated Logistics",
    ],
  },
  {
    id: "pharma",
    name: "Healthcare & Pharmaceuticals",
    icon: FlaskConical,
    imageSrc: "/images/Servicestailored/Healthcare & Pharmaceuticals.jpg",
    description:
      "Modular, dust-free cleanroom panel solutions engineered for US-FDA and WHO-GMP sterile drug manufacturing and biosafety spaces.",
    useCases: [
      "Sterile Injectable Plants",
      "Class 10,000 Cleanrooms",
      "Vaccine Storage Vaults",
      "R&D Laboratories",
      "Biotech Testing Labs",
      "Airlocks & Pass-Boxes",
    ],
  },
  {
    id: "logistics",
    name: "Logistics & Warehousing",
    icon: Package,
    imageSrc: "/images/Servicestailored/Logistics & Warehousing.jpg",
    description:
      "Large-span insulated roofing and wall paneling engineered to withstand high wind loads and maintain ambient thermal balance in massive distribution centers.",
    useCases: [
      "Fulfillment Centers",
      "E-Commerce Hubs",
      "Cross-Dock Terminals",
      "High-Bay Warehouses",
      "Bonded Cargo Storage",
      "Solar-Ready Roofs",
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: Sprout,
    imageSrc: "/images/Servicestailored/Agriculture.jpg",
    description:
      "Climate-controlled agricultural storage panels preventing post-harvest decay and safeguarding grain, seeds, and produce freshness.",
    useCases: [
      "Grain Storage Silos",
      "Seed Preservation Vaults",
      "Controlled Atmosphere Rooms",
      "Poultry & Livestock Farms",
      "Floriculture Greenhouses",
      "Cold Chain Depots",
    ],
  },
  {
    id: "technology",
    name: "Data & Technology",
    icon: Server,
    imageSrc: "/images/Servicestailored/Data & Technology.jpg",
    description:
      "High-density PUF panels providing thermal isolation, sound dampening, and moisture prevention for critical server rooms and tech infrastructure.",
    useCases: [
      "Data Center Halls",
      "Telecom Server Rooms",
      "Battery Storage Facilities",
      "Semiconductor Clean Space",
      "Control Command Hubs",
      "UPS Utility Enclosures",
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure & Utilities",
    icon: Zap,
    imageSrc: "/images/Servicestailored/Infrastructure & Utilities.jpg",
    description:
      "Heavy-duty insulated enclosures and prefabricated modular structures designed for harsh ambient weather conditions and remote site deployments.",
    useCases: [
      "Power Substation Cabins",
      "Water Treatment Facilities",
      "Site Operations Offices",
      "Remote Telecom Shelters",
      "Solar Inverter Housing",
      "Metro Railway Enclosures",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: Building2,
    imageSrc: "/images/Servicestailored/Hospitality.jpg",
    description:
      "Commercial kitchen walk-in coolers, acoustic isolation paneling, and aesthetic insulated facades for luxury hotel properties and resorts.",
    useCases: [
      "Walk-in Kitchen Freezers",
      "Banquet Storage Rooms",
      "Resort Mechanical Spaces",
      "HVAC Duct Insulation",
      "Acoustic Partitions",
      "Cold Beverage Vaults",
    ],
  },
  {
    id: "commercial",
    name: "Commercial & Institutional",
    icon: Landmark,
    imageSrc: "/images/Servicestailored/Shopping Centers.jpg",
    description:
      "Energy-efficient envelope solutions for shopping malls, sports arenas, educational campuses, and corporate headquarters.",
    useCases: [
      "Retail Malls & Hypermarkets",
      "Indoor Sports Complexes",
      "Educational Campuses",
      "Exhibition Centers",
      "Corporate Office Roofing",
      "Auditoriums & Theaters",
    ],
  },
];

export default function IndustriesWeServeSection() {
  const [selectedId, setSelectedId] = useState("industrial");
  const activeIndustry =
    industriesData.find((item) => item.id === selectedId) ?? industriesData[0]!;

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
    <section className="w-full bg-white py-14 sm:py-18 md:py-22 font-sans text-gray-900">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <h2 ref={titleRef} className="mt-3 text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-[#18181b]">
            {PREPROCESSED_SERVICES.map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
              >
                {word.map((item) => (
                  <ScrollLetter
                    key={item.index}
                    char={item.char}
                    index={item.index}
                    total={TOTAL_SERVICES_CHARS}
                    progress={smoothProgress}
                  />
                ))}
              </span>
            ))}
          </h2>
          <motion.p
            ref={subtextRef}
            style={{ y: subtextY, opacity: subtextOpacity }}
            className="mt-3.5 text-base sm:text-lg text-gray-500 leading-relaxed transform-gpu will-change-transform"
          >
            Select an industry below to explore how our PUF panels are
            engineered for its specific requirements.
          </motion.p>
        </div>

        {/* Tabbed Interactive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Vertical Industry Tab List with Hover Effect */}
          <div data-stagger="0.05" className="lg:col-span-4 flex flex-col gap-1.5">
            {industriesData.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => setSelectedId(item.id)}
                  className={`group flex items-center gap-3.5 px-4 py-3.5 text-left transition-all duration-200 rounded-none ${
                    isSelected
                      ? "bg-purple-50/90 border border-purple-200/90 text-gray-900 font-bold"
                      : "bg-transparent hover:bg-gray-50/90 text-gray-600 font-medium hover:text-gray-900 border border-transparent"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center transition-colors duration-200 ${
                      isSelected
                        ? "bg-purple-100 text-[#5b176e]"
                        : "bg-gray-100 text-gray-500 group-hover:bg-purple-100/70 group-hover:text-[#5b176e]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm sm:text-base tracking-tight">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Selected Industry Image Stage (Displays Image corresponding to selected left-side text item) */}
          <div className="lg:col-span-8 relative w-full h-[450px] sm:h-[520px] lg:h-[580px] overflow-hidden bg-gray-100 border border-gray-200/80">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeIndustry.imageSrc}
                  alt={activeIndustry.name}
                  fill
                  priority
                  className="object-cover object-center select-none"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />

                {/* Gradient Mask Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Industry Badge & CTA */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="flex flex-col gap-1.5 max-w-xl text-white">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center bg-white/20 backdrop-blur-md text-white">
                        <activeIndustry.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/80">
                        APPLICATION SECTOR
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {activeIndustry.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed font-normal">
                      {activeIndustry.description}
                    </p>
                  </div>

                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 shrink-0 bg-[#5b176e] hover:bg-[#461056] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:gap-3"
                  >
                    <span>EXPLORE SECTOR</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
