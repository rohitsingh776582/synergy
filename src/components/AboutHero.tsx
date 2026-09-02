"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      className="w-full bg-[#3c094c] font-sans text-white overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[580px]">
        {/* Left Column: Dark Purple Content - Left padding matches Navbar Container alignment (px-5 md:px-10 lg:px-[50px]) */}
        <div className="lg:col-span-5 bg-[#3c094c] py-12 sm:py-16 lg:py-20 pl-5 md:pl-10 lg:pl-[50px] pr-8 sm:pr-12 lg:pr-16 flex flex-col justify-center items-start text-left z-10">
          {/* Gold Tag */}
          <span className="text-[#e8b030] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            About Synergy PUF
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-white leading-[1.15] tracking-tight">
            The people and <br className="hidden sm:inline" />
            process behind <br className="hidden sm:inline" />
            the panels.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-sm sm:text-base text-purple-100 font-light leading-relaxed max-w-md">
            Industrial insulation expertise. <br />
            A company built around your project.
          </p>

          {/* Action Buttons Row */}
          <div className="mt-8 flex items-center gap-6">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#48115b] text-white px-6 py-3 rounded-none text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95"
            >
              Get a quote
            </Link>

            <Link
              href="/projects"
              className="text-white hover:text-purple-200 text-sm font-semibold underline underline-offset-4 transition-colors"
            >
              View projects
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Image with Floating White Card */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full w-full bg-gray-900">
          <Image
            src="/images/HeroSection/DJI_20260729155134_0345_D.JPG.jpeg"
            alt="Synergy PUF Industrial Facility"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center"
          />

          {/* Top-Right Floating White Card */}
          <div className="absolute top-28 sm:top-32 lg:top-36 right-5 md:right-10 lg:right-[50px] z-20 bg-white rounded-none shadow-2xl p-5 border border-white/40 max-w-xs text-gray-900 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
              Crafted with precision
            </h3>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#e8b030] text-white px-3.5 py-1.5 rounded-none text-xs font-bold tracking-wide">
                PUF
              </span>
              <span className="bg-[#e8b030] text-white px-3.5 py-1.5 rounded-none text-xs font-bold tracking-wide">
                PIR
              </span>
              <span className="bg-[#e8b030] text-white px-3.5 py-1.5 rounded-none text-xs font-bold tracking-wide">
                Rockwool
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
