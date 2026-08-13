"use client";

import React from "react";
import Container from "./Container";

const StackedDiamondIcon = () => (
  <svg
    className="w-12 h-12 sm:w-14 sm:h-14 text-white mb-4"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M24 8L38 15L24 22L10 15L24 8Z" />
    <path d="M10 22.5L24 29.5L38 22.5" />
    <path d="M10 30L24 37L38 30" />
  </svg>
);

export const jointProfiles = [
  { id: "roof-joint", title: "Roof Joint", col: "sm:col-start-1", row: "sm:row-start-1" },
  { id: "hidden-tongue", title: "Hidden Tongue\n& Groove", col: "sm:col-start-2", row: "sm:row-start-2" },
  { id: "single-tongue", title: "Single Tongue\n& Groove", col: "sm:col-start-3", row: "sm:row-start-1" },
  { id: "m-section", title: "M-Section", col: "sm:col-start-4", row: "sm:row-start-2" },
  { id: "double-tongue", title: "Double Tongue\n& Groove", col: "sm:col-start-5", row: "sm:row-start-1" },
];

export default function AvailablePanelJointsSection() {
  return (
    <section className="py-20 bg-[#e6e6e8]">
      <Container className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 tracking-tight">
          Available Panel Joints.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
          Innovative joinery for seamless connections, structural integrity and ease of installation.
        </p>

        {/* Staggered 5-Box Interlocking Grid */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 max-w-4xl mx-auto">
            {jointProfiles.map((joint) => (
              <div
                key={joint.id}
                className={`${joint.col} ${joint.row} bg-black aspect-square p-4 sm:p-6 flex flex-col items-center justify-center text-center border border-black shadow-md transition-transform duration-300 hover:z-10 hover:scale-105`}
              >
                <StackedDiamondIcon />
                <h3 className="text-xs sm:text-sm md:text-base font-normal text-white leading-snug whitespace-pre-line">
                  {joint.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
