"use client";

import React from "react";
import { Thermometer, ClipboardList, Ruler } from "lucide-react";
import Container from "./Container";

const conditions = [
  {
    num: "01",
    title: "Temperature range",
    subtitle: "Operating conditions and target temperatures.",
    icon: Thermometer,
  },
  {
    num: "02",
    title: "Industry & use",
    subtitle: "Your process and compliance requirements.",
    icon: ClipboardList,
  },
  {
    num: "03",
    title: "Area & layout",
    subtitle: "Dimensions, openings and project scale.",
    icon: Ruler,
  },
];

export default function ProjectConditionsSection() {
  return (
    <section className="w-full bg-[#f8f9fa] py-14 md:py-20 font-sans text-gray-900 border-t border-gray-200/70 select-none">
      <Container>
        {/* Title - Left aligned with Navbar Logo */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-8 md:mb-10 text-left">
          Start with your project conditions.
        </h2>

        {/* 3 Cards Grid (ZERO border radius, ZERO shadow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {conditions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-white border border-gray-200/90 rounded-none shadow-none p-6 sm:p-7 flex items-center gap-5 md:gap-6"
              >
                {/* Purple Outline Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#58166e]">
                  <Icon className="h-9 w-9 stroke-[1.4]" strokeWidth={1.4} />
                </div>

                {/* Vertical Separator Line */}
                <div className="h-12 w-[1px] bg-gray-200 shrink-0" />

                {/* Card Content */}
                <div className="flex flex-col items-start text-left min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#e8b030] tracking-wide mb-1">
                    {item.num}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
