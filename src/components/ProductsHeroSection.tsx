"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function ProductsHeroSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans text-gray-900 border-b border-gray-100 select-none">
      <Container>
        {/* 2-Column Grid: Top of left text and top of right image are aligned on the exact same horizontal line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text Content aligned with Navbar Logo */}
          <div className="lg:col-span-5 flex flex-col items-start text-left pt-1">
            {/* Tag */}
            <span className="text-[#58166e] text-xs sm:text-sm font-bold tracking-wide uppercase mb-4">
              Our products
            </span>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-gray-900 leading-[1.12] tracking-tight mb-5">
              The right panel. <br className="hidden sm:inline" />
              A stronger build.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-md mb-8">
              Roof, wall, cold storage and cleanroom panel systems.
            </p>

            {/* Button (ZERO border radius, ZERO shadow) */}
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#461058] text-white px-6 py-3 rounded-none text-sm font-semibold shadow-none transition-colors active:scale-95"
            >
              Get a quote
            </Link>
          </div>

          {/* Right Column: High-Res PUF Panel Photo aligned with Start Your Quote (ZERO border radius, ZERO shadow) */}
          <div className="lg:col-span-7 relative w-full aspect-[16/10] overflow-hidden rounded-none bg-white shadow-none">
            <Image
              src="/images/products/roof_panel_hero copy.png"
              alt="Synergy PUF Insulated Sandwich Panel"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-right-top rounded-none shadow-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
