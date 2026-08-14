"use client";

import { useState } from "react";
import Link from "next/link";
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
  Check,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

interface IndustryItem {
  id: string;
  name: string;
  icon: typeof Factory;
  description: string;
  useCases: string[];
}

const industriesData: IndustryItem[] = [
  {
    id: "industrial",
    name: "Industrial & Manufacturing",
    icon: Factory,
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

  return (
    <section className="w-full bg-white py-14 sm:py-18 md:py-22 font-sans text-gray-900">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">

          

          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-[#18181b]">
            Services tailored to every sector{" "}
            
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-gray-500 leading-relaxed">
            Select an industry below to explore how our PUF panels are
            engineered for its specific requirements.
          </p>
        </div>

        {/* Tabbed Interactive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Vertical Industry Tab List with Hover Effect */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            {industriesData.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => setSelectedId(item.id)}
                  className={`group flex items-center gap-3.5 px-4 py-3 text-left transition-colors duration-200 ${
                    isSelected
                      ? "bg-purple-50/90 border border-purple-200/90 text-gray-900 font-bold shadow-sm"
                      : "bg-transparent hover:bg-gray-50/90 text-gray-600 font-medium hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center transition-colors duration-200 ${
                      isSelected
                        ? "bg-purple-100 text-[#5b176e]"
                        : "bg-gray-100 text-gray-500 group-hover:bg-purple-100/70 group-hover:text-[#5b176e]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm tracking-tight">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Selected Industry Detail Card (Completely Stable without shaking) */}
          <div className="lg:col-span-8 bg-white border border-gray-100 p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] min-h-[390px] relative overflow-hidden flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -120 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Header Icon + Title */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center bg-purple-50 text-[#5b176e]">
                      <activeIndustry.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                      {activeIndustry.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 mb-8">
                    {activeIndustry.description}
                  </p>

                  {/* Use Cases Section */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                      Use Cases
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {activeIndustry.useCases.map((useCase) => (
                        <div key={useCase} className="flex items-center gap-2.5">
                          <div className="flex h-4 w-4 shrink-0 items-center justify-center text-[#5b176e]">
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {useCase}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Call to Action */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-start">
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2.5 rounded-none bg-[#5b176e] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#461056] transition-all hover:gap-3"
                  >
                    <span>Discuss your project</span>
                    <ArrowRight className="h-4 w-4" />
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

