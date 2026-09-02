"use client";

import React from "react";
import Container from "./Container";

const milestones = [
  {
    year: "Year to confirm",
    title: "Group founded",
  },
  {
    year: "Year to confirm",
    title: "PUF plant commissioned",
  },
  {
    year: "Year to confirm",
    title: "First certification",
  },
  {
    year: "Year to confirm",
    title: "Capacity expanded",
  },
  {
    year: "Year to confirm",
    title: "Project milestone",
  },
];

export default function MilestonesTimelineSection() {
  return (
    <section className="w-full bg-[#f8f9fa] py-14 md:py-20 font-sans text-gray-900 border-t border-gray-200/70">
      <Container>
        {/* Section Header - Left aligned with Navbar Logo */}
        <div className="flex flex-col items-start text-left mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight mb-2">
            The milestones behind our growth
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Timeline structure. Years and events to confirm.
          </p>
        </div>

        {/* Timeline Grid Container - Spans from Navbar Left Logo to Right Quote Button */}
        <div className="relative w-full">
          {/* Horizontal Connecting Line (Dashed) */}
          <div className="hidden md:block absolute top-[9px] left-[8%] right-[8%] h-[2px] border-t-2 border-dashed border-gray-300 z-0 pointer-events-none" />

          {/* 5 Milestone Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 relative z-10">
            {milestones.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center w-full">
                {/* Gold Square Marker (ZERO border radius) */}
                <div className="w-4 h-4 bg-[#e8b030] rounded-none mb-5 shrink-0" />

                {/* Milestone Card (ZERO border radius, ZERO shadow) */}
                <div className="w-full bg-white border border-gray-200/90 rounded-none shadow-none p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[125px] sm:min-h-[140px]">
                  {/* Year Sub-label */}
                  <span className="text-[11px] sm:text-xs font-semibold text-[#e8b030] tracking-wide mb-2">
                    {item.year}
                  </span>

                  {/* Main Milestone Title */}
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug max-w-[140px]">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
