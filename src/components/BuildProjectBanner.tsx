"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const badges = ["BIS certified*", "FM approved*", "ISO 9001*"] as const;

export default function BuildProjectBanner() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20 font-sans border-t border-gray-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subheading, Buttons & Badges */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-[1.15]">
              Build your next project <br className="hidden sm:inline" />
              with Synergy PUF.
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-base sm:text-lg text-gray-600 font-normal">
              Tell us about your project requirements.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-none bg-[#58166e] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#461058] transition-all duration-200 active:scale-95"
              >
                Get a quote
              </Link>

              <a
                href="#brochure"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Downloading Synergy PUF Product Catalog PDF...");
                }}
                className="inline-flex items-center justify-center rounded-none bg-white border border-[#58166e] px-6 py-3 text-sm font-semibold text-[#58166e] hover:bg-purple-50 transition-all duration-200 active:scale-95"
              >
                Download brochure
              </a>
            </div>

            {/* Certification Badges Row */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-gray-300 bg-gray-50/50 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-gray-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Horizontal PUF Roof Panel Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            <div className="relative w-full aspect-[16/9] max-w-xl">
              <Image
                src="/images/products/roof_panel_hero copy.png"
                alt="Synergy PUF Roof Panel"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
