"use client";

import { useState } from "react";
import {
  Thermometer,
  VolumeX,
  Feather,
  Flame,
  Droplets,
  Zap,
} from "lucide-react";
import Container from "./Container";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: typeof Thermometer;
  iconBg: string;
  iconColor: string;
  borderActive: string;
  specLabel: string;
}

const features: Feature[] = [
  {
    id: "thermal",
    title: "Thermal Insulation",
    description:
      "Exceptional thermal performance with low U-values, slashing energy costs year-round.",
    icon: Thermometer,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    borderActive: "border-2 border-red-400",
    specLabel: "K-Value: 0.022 W/mK",
  },
  {
    id: "sound",
    title: "Sound Insulation",
    description:
      "Reduces noise transmission significantly — ideal for factories, cold rooms and clean rooms.",
    icon: VolumeX,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    borderActive: "border-2 border-blue-400",
    specLabel: "Noise Reduction: up to 30dB",
  },
  {
    id: "lightweight",
    title: "Lightweight Yet Strong",
    description:
      "High strength-to-weight ratio makes erection fast and reduces structural load.",
    icon: Feather,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    borderActive: "border-2 border-purple-400",
    specLabel: "Core Density: 40 kg/m³",
  },
  {
    id: "fire",
    title: "Fire Resistance",
    description:
      "Fire-retardant cores and tested to international fire standards for enhanced site safety.",
    icon: Flame,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    borderActive: "border-2 border-orange-400",
    specLabel: "B-s2, d0 Fire Rating",
  },
  {
    id: "moisture",
    title: "Moisture Resistance",
    description:
      "Factory-coated steel faces prevent water ingress and resist corrosion over decades.",
    icon: Droplets,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-500",
    borderActive: "border-2 border-cyan-400",
    specLabel: "Zero Water Ingress",
  },
  {
    id: "fast",
    title: "Fast Installation",
    description:
      "Click-lock joinery and precision-cut panels mean projects complete up to 3x faster.",
    icon: Zap,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    borderActive: "border-2 border-yellow-400",
    specLabel: "3x Faster Assembly",
  },
];

export default function WhyPufPanelsSection() {
  const [activeId, setActiveId] = useState("thermal");
  const activeFeature = features.find((f) => f.id === activeId) ?? features[0]!;

  return (
    <section className="w-full bg-[#f8f7fd] pt-2 sm:pt-4 md:pt-6 pb-10 sm:pb-14 md:pb-16 font-sans text-gray-900 border-t border-purple-50 overflow-hidden">
      <Container>
        {/* Top Header Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 mb-4 sm:mb-6">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#5b176e]">
              Why PUF Panels
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08]">
              <span className="block text-gray-900">Smarter Panels.</span>
              <span className="block text-gray-900">
                Stronger Future.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base leading-relaxed text-gray-600">
              PUF sandwich panels deliver measurable performance advantages
              across every metric that matters to industrial construction.
            </p>
          </div>
        </div>

        {/* Main Content Grid: Left Diagram Card + Right 2x3 Feature Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* Left Diagram Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-none bg-gradient-to-br from-[#ede5f9] via-[#e5dcf7] to-[#ded2f5] p-6 sm:p-8 border border-purple-200/60 relative overflow-hidden min-h-[380px] sm:min-h-[440px]">
            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5b176e] bg-white/70 px-3 py-1 rounded-none backdrop-blur-sm border border-purple-100">
                Core Engineering
              </span>
              <span className="text-xs font-semibold text-purple-900/80 bg-purple-200/60 px-3 py-1 rounded-none">
                {activeFeature.specLabel}
              </span>
            </div>

            {/* Center PUF Sandwich Panel Diagram */}
            <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm">
                {/* Top Metal Sheet Layer */}
                <div className="h-3 w-full rounded-none bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 border border-purple-300" />

                {/* PUF Foam Core with Dotted Pattern */}
                <div className="relative h-32 sm:h-36 w-full bg-gradient-to-b from-[#eadef9] to-[#d8c3f4] border-x border-purple-300/80 flex flex-col items-center justify-center p-4">
                  {/* Grid of Dots */}
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-2 p-3 opacity-40">
                    {Array.from({ length: 72 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-[#5b176e]/50 mx-auto my-auto"
                      />
                    ))}
                  </div>

                  {/* Core Label Badge */}
                  <div className="relative z-10 rounded-none bg-white/80 backdrop-blur-md px-4 py-2 text-center border border-purple-200">
                    <p className="text-xs font-bold text-[#5b176e]">
                      PUF Foam Core
                    </p>
                    <p className="text-[10px] font-medium text-gray-500">
                      40 – 200 mm
                    </p>
                  </div>
                </div>

                {/* Bottom Metal Sheet Layer */}
                <div className="h-3 w-full rounded-none bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 border border-purple-300" />
              </div>
            </div>

            {/* Bottom Active Feature Pill */}
            <div className="relative z-10 flex justify-center">
              <div className="inline-flex items-center gap-2.5 rounded-none bg-white px-5 py-2.5 text-xs font-bold text-gray-900 border border-purple-100 transition-all duration-300">
                <activeFeature.icon className={`h-4 w-4 ${activeFeature.iconColor}`} />
                <span>{activeFeature.title}</span>
              </div>
            </div>
          </div>

          {/* Right 2x3 Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeId === feature.id;

              return (
                <div
                  key={feature.id}
                  onClick={() => setActiveId(feature.id)}
                  onMouseEnter={() => setActiveId(feature.id)}
                  className={`group relative cursor-pointer rounded-none bg-white p-5 sm:p-6 transition-all duration-300 border ${
                    isActive
                      ? feature.borderActive
                      : "border-gray-100 hover:border-purple-200"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-none ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${feature.iconColor}`} />
                  </div>

                  <h3 className="mt-4 text-base font-bold tracking-tight text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm font-light leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
