"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const leftCol = leftColRef.current;
    if (!leftCol) return;

    const ctx = gsap.context(() => {
      const animElements = leftCol.querySelectorAll("[data-animate-hero]");

      // Initial state: shifted downwards and transparent
      gsap.set(animElements, {
        opacity: 0,
        y: 45,
        willChange: "transform, opacity",
      });

      // Smooth upward entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(animElements, {
        opacity: 1,
        y: 0,
        duration: 1.05,
        stagger: 0.12,
        delay: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-hero"
      ref={containerRef}
      className="w-full bg-[#3c094c] font-sans text-white overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[580px]">
        {/* Left Column: Dark Purple Content - Left padding matches Navbar Container alignment (px-5 md:px-10 lg:px-[50px]) */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 bg-[#3c094c] pt-28 pb-12 sm:pt-32 sm:pb-16 lg:py-20 pl-5 md:pl-10 lg:pl-[50px] pr-8 sm:pr-12 lg:pr-16 flex flex-col justify-center items-start text-left z-10"
        >
          {/* Tag */}
          <span
            data-animate-hero
            className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4"
          >
            About Synergy PUF
          </span>

          {/* Heading */}
          <h1
            data-animate-hero
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-white leading-[1.15] tracking-tight"
          >
            The people and <br className="hidden sm:inline" />
            process behind <br className="hidden sm:inline" />
            the panels.
          </h1>

          {/* Subtitle */}
          <p
            data-animate-hero
            className="mt-6 text-sm sm:text-base text-purple-100 font-light leading-relaxed max-w-md"
          >
            Industrial insulation expertise. <br />
            A company built around your project.
          </p>

          {/* Action Buttons Row */}
          <div
            data-animate-hero
            className="mt-8 flex items-center gap-6"
          >
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
        </div>
      </div>
    </section>
  );
}
