"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function ApplicationsHeroSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans text-gray-900 border-b border-gray-100 select-none">
      <Container>
        {/* 2-Column Grid: Top of left text and top of right image are aligned on the exact same horizontal line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text Content aligned with Navbar Logo */}
          <div className="lg:col-span-5 flex flex-col items-start text-left pt-1">
            {/* Tag */}
            <span className="text-[#58166e] text-xs sm:text-sm font-bold tracking-wide uppercase mb-4">
              Applications
            </span>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-gray-900 leading-[1.12] tracking-tight mb-5">
              Built for the job <br className="hidden sm:inline" />
              it has to do.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-md mb-8">
              Explore panel systems for cold storage, cleanrooms, fire
              insulation and energy-efficient buildings.
            </p>

            {/* Button (ZERO border radius, ZERO shadow) */}
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#461058] text-white px-6 py-3 rounded-none text-sm font-semibold shadow-none transition-colors active:scale-95"
            >
              Get a quote
            </Link>
          </div>

          {/* Right Column: Cleanroom / Cold Room Enclosure Image with left white fade gradient */}
          <div className="lg:col-span-7 relative w-full aspect-[16/10] overflow-hidden rounded-none bg-white shadow-none">
            <Image
              src="/images/modular_coldroom_enclosure.jpg"
              alt="Synergy PUF Cleanroom Facility"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center rounded-none shadow-none"
            />
            {/* Soft White Left Fade Gradient Overlay */}
            <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
            {/* Soft White Bottom Fade Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/30 to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
}
