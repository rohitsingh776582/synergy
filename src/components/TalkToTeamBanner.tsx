"use client";

import React from "react";
import Link from "next/link";
import Container from "./Container";

export default function TalkToTeamBanner() {
  return (
    <section className="w-full bg-[#3c094c] py-12 md:py-16 font-sans text-white border-t border-purple-900/40 select-none">
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Column: Title & Subtitle aligned with Navbar Logo */}
          <div className="flex flex-col items-start text-left flex-1 max-w-xl">
              {/* Title with subtle gold accent line */}
              <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-white tracking-tight leading-[1.18] mb-2">
                Talk to the team <br className="hidden sm:inline" />
                behind the panels.
              </h2>

              {/* Gold Accent Underline */}
              <div className="w-12 h-[3px] bg-[#e8b030] mb-3 rounded-none" />

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-purple-100 font-light leading-relaxed">
                Discuss your requirements with our engineering and sales team.
              </p>
            </div>

          {/* Vertical Separator Line (visible on desktop) */}
          <div className="hidden lg:block h-16 w-[1px] bg-[#e8b030]/50 shrink-0 mx-2" />

          {/* Right Column: Action Buttons aligned with Navbar Start Your Quote */}
          <div className="flex flex-wrap items-center gap-3.5 shrink-0 w-full sm:w-auto">
            {/* Primary Solid Button (ZERO border radius, ZERO shadow) */}
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#471159] text-white border border-[#6b1e84] px-6 py-3.5 rounded-none text-sm font-semibold shadow-none transition-colors active:scale-95"
            >
              Get a quote
            </Link>

            {/* Secondary Outline Button (ZERO border radius, ZERO shadow) */}
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
