"use client";

import React from "react";
import Link from "next/link";
import Container from "./Container";

export default function HaveBuildInMindBanner() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans text-white border-t border-gray-100 select-none">
      <Container>
        {/* Dark Purple Container Card with ZERO border radius and ZERO shadow */}
        <div className="w-full bg-[#3c094c] p-8 sm:p-12 lg:p-14 rounded-none shadow-none flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Heading & Subtitle aligned with Navbar Logo */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-[1.15] mb-3">
              Have a build like <br className="hidden sm:inline" />
              these in mind?
            </h2>

            <p className="text-sm sm:text-base text-purple-100/90 font-light leading-relaxed">
              Send us the temperature range, area and timeline. Our
              engineering team will spec the panels and quote it.
            </p>
          </div>

          {/* Right Column: Gold "Get a quote" & Outline "Download brochure" aligned with Navbar Start Your Quote */}
          <div className="flex flex-wrap items-center gap-3.5 shrink-0 w-full sm:w-auto">
            {/* Gold Solid Button (ZERO border radius, ZERO shadow) */}
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#e8b030] hover:bg-[#d49e25] text-gray-950 px-6 py-3.5 rounded-none text-sm font-bold shadow-none transition-colors active:scale-95"
            >
              Get a quote
            </Link>

            {/* Outline Button (ZERO border radius, ZERO shadow) */}
            <a
              href="#brochure"
              onClick={(e) => {
                e.preventDefault();
                alert("Downloading Synergy PUF Product Catalog PDF...");
              }}
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/60 px-6 py-3.5 rounded-none text-sm font-semibold shadow-none transition-colors active:scale-95"
            >
              Download brochure
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
