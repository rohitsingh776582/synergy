"use client";

import React from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import Container from "./Container";

export default function BuildingStorySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 font-sans text-gray-900 border-t border-gray-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Text Content aligned with Navbar left edge */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-6">
              Part of a bigger <br className="hidden sm:inline" />
              building story.
            </h2>

            {/* Paragraph 1 */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-4">
              Synergy PUF sits within Synergy Group, alongside Thrislington,
              LGSF, PEB and Construction.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mb-8">
              This is where the verified story of our founding, growth and
              insulation business will appear.
            </p>

            {/* Info Note Row */}
            <div className="flex items-start gap-3 pt-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#d99e2b]">
                <Info className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">
                Founding details and group relationship to confirm.
              </p>
            </div>
          </div>

          {/* Right Column: Team Image aligned with Navbar right edge */}
          <div className="lg:col-span-7 flex flex-col items-start w-full">
            {/* Image Box with ZERO border radius */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-none border border-gray-200/80 bg-gray-100">
              <Image
                src="/images/team_building_story.jpg"
                alt="Synergy Group Team"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center rounded-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
