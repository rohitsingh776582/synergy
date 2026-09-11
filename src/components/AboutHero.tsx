"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      const animElements = content.querySelectorAll("[data-animate-hero]");

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
      className="relative w-full h-screen min-h-[650px] max-h-[1000px] flex items-center overflow-hidden font-sans text-white select-none"
    >
      {/* FULL BLEED BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HeroSection/DJI_20260729155134_0345_D.JPG.jpeg"
          alt="Synergy PUF Industrial Facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content aligned with Container */}
      <Container className="relative z-10 w-full pt-20 sm:pt-24 lg:pt-28">
        <div
          ref={contentRef}
          className="max-w-3xl flex flex-col justify-center items-start text-left"
        >
          {/* Tag */}
          <span
            data-animate-hero
            className="text-purple-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
          >
            About Synergy PUF
          </span>

          {/* Heading */}
          <h1
            data-animate-hero
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.12] tracking-tight"
          >
            The people and <br className="hidden sm:inline" />
            process behind <br className="hidden sm:inline" />
            the panels.
          </h1>

          {/* Subtitle */}
          <p
            data-animate-hero
            className="mt-6 text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-xl"
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
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#48115b] text-white px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-all duration-200 active:scale-95"
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
      </Container>
    </section>
  );
}
