"use client";

import React from "react";
import { Factory, Cpu, ShieldCheck, Truck, Layers, Sparkles, ArrowRight } from "lucide-react";
import Container from "./Container";
import Link from "next/link";

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  stat?: string;
  icon: React.ElementType;
  badge: string;
}

const topFeatureCards: FeatureCard[] = [
  {
    id: "facility",
    title: "11-Acre Integrated Facility",
    description: "Entire production ecosystem under one roof — from raw material receipt to finished panel dispatch",
    stat: "11 Acres",
    icon: Factory,
    badge: "Ecosystem",
  },
  {
    id: "capacity",
    title: "7,200 m² Panels Per Day",
    description: "High-throughput continuous lamination lines delivering precision panels at industrial scale",
    stat: "7,200 m²/day",
    icon: Cpu,
    badge: "Scale",
  },
  {
    id: "fabrication",
    title: "Steel Fabrication & Punching",
    description: "In-house steel processing for full traceability and quality control from coil to finished panel",
    stat: "In-House",
    icon: Layers,
    badge: "Precision",
  },
  {
    id: "coating",
    title: "Advanced Powder Coating",
    description: "Premium coating lines for superior surface durability, corrosion resistance, and custom finishes",
    stat: "Durability",
    icon: Sparkles,
    badge: "Finish",
  },
];

export default function ProductShowcaseBoxSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20 overflow-hidden">
      <Container className="flex flex-col space-y-16">
        
        {/* ========================================================================= */}
        {/* TOP CAROUSEL / FEATURED CARDS GRID (ITEMS 1 to 4)                         */}
        {/* ========================================================================= */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Background Curved Dotted/Dashed Line */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <svg
              className="w-full max-w-5xl h-40 text-gray-300"
              viewBox="0 0 1000 200"
              fill="none"
              stroke="currentColor"
              strokeDasharray="6 6"
              strokeWidth="2"
            >
              <path d="M 0 120 Q 250 20 500 110 T 1000 100" />
            </svg>
          </div>

          {/* Staggered Cards Grid */}
          <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch justify-center">
            {topFeatureCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className={`group relative w-full bg-white border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:border-black ${
                    idx % 2 === 0 ? "lg:-translate-y-3" : "lg:translate-y-3"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-black bg-gray-100 px-2.5 py-1 border border-gray-200">
                      {card.badge}
                    </span>
                    <div className="w-10 h-10 bg-white border border-gray-200 text-black flex items-center justify-center group-hover:bg-[#431B38] group-hover:text-white group-hover:border-[#431B38] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <h3 className="text-black font-bold text-lg leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {card.stat && (
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">Highlight</span>
                      <span className="text-xs font-bold text-[#431B38]">{card.stat}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BOTTOM MAIN BANNER BOX (ITEMS 5 & 6)                                      */}
        {/* ========================================================================= */}
        <div className="relative w-full bg-white border border-gray-200 p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
            
            {/* ITEM 5: STRINGENT QUALITY CONTROL */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-gray-200 p-8 sm:p-10">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gray-100 border border-gray-200 text-[#431B38] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#431B38]" />
                  <span>Quality Assured</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-black leading-tight">
                  Stringent Quality Control
                </h2>

                <p className="text-gray-700 text-sm leading-relaxed">
                  Multi-stage QC at every production step — zero compromises before a single panel leaves the facility.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold text-black bg-gray-100 border border-gray-200 px-3 py-1">
                    #ZeroDefect
                  </span>
                  <span className="text-xs font-semibold text-black bg-gray-100 border border-gray-200 px-3 py-1">
                    #MultiStageQC
                  </span>
                  <span className="text-xs font-semibold text-black bg-gray-100 border border-gray-200 px-3 py-1">
                    #100%Inspected
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/quote"
                  className="inline-flex items-center space-x-2 bg-[#431B38] hover:bg-[#34142b] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Verify Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>


            {/* ITEM 6: PAN-INDIA SUPPLY & SUPPORT */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-white text-black border border-gray-200 p-8 sm:p-10">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gray-100 border border-gray-200 text-[#431B38] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-[#431B38]" />
                  <span>Nationwide Reach</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-black leading-tight">
                  Pan-India Supply & Support
                </h2>

                <p className="text-gray-700 text-sm leading-relaxed">
                  Nationwide logistics network and dedicated technical teams from design consultation to installation.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-semibold text-black bg-gray-100 border border-gray-200 px-3 py-1">
                    #PanIndiaLogistics
                  </span>
                  <span className="text-xs font-semibold text-black bg-gray-100 border border-gray-200 px-3 py-1">
                    #OnSiteSupport
                  </span>
                  <span className="text-xs font-semibold text-black bg-gray-100 border border-gray-200 px-3 py-1">
                    #TurnkeyExecution
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-[#431B38] hover:bg-[#34142b] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Connect With Technical Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
