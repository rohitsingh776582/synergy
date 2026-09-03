"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsHeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = containerRef.current;
    const leftCol = leftColRef.current;
    const imageCol = imageColRef.current;
    if (!section || !leftCol) return;

    const ctx = gsap.context(() => {
      const animElements = leftCol.querySelectorAll("[data-animate-hero]");

      // Initial state: shifted downwards and transparent
      gsap.set(animElements, {
        opacity: 0,
        y: 45,
        willChange: "transform, opacity",
      });

      if (imageCol) {
        gsap.set(imageCol, {
          opacity: 0,
          y: 30,
          scale: 0.98,
          willChange: "transform, opacity",
        });
      }

      // Smooth upward entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(animElements, {
        opacity: 1,
        y: 0,
        duration: 1.05,
        stagger: 0.12,
        delay: 0.1,
      });

      if (imageCol) {
        tl.to(
          imageCol,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
          },
          "-=0.7"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white py-12 md:py-16 font-sans text-gray-900 border-b border-gray-100 select-none overflow-hidden"
    >
      <Container>
        {/* 2-Column Grid: Top of left text and top of right image are aligned on the exact same horizontal line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text Content aligned with Navbar Logo */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col items-start text-left pt-1"
          >
            {/* Tag */}
            <span
              data-animate-hero
              className="text-[#58166e] text-xs sm:text-sm font-bold tracking-wide uppercase mb-4"
            >
              Our products
            </span>

            {/* Heading */}
            <h1
              data-animate-hero
              className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold text-gray-900 leading-[1.12] tracking-tight mb-5"
            >
              The right panel. <br className="hidden sm:inline" />
              A stronger build.
            </h1>

            {/* Subtitle */}
            <p
              data-animate-hero
              className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-md mb-8"
            >
              Roof, wall, cold storage and cleanroom panel systems.
            </p>

            {/* Button (ZERO border radius, ZERO shadow) */}
            <div data-animate-hero>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#461058] text-white px-6 py-3 rounded-none text-sm font-semibold shadow-none transition-colors active:scale-95"
              >
                Get a quote
              </Link>
            </div>
          </div>

          {/* Right Column: High-Res PUF Panel Photo aligned with Start Your Quote (ZERO border radius, ZERO shadow) */}
          <div
            ref={imageColRef}
            className="lg:col-span-7 relative w-full aspect-[16/10] overflow-hidden rounded-none bg-white shadow-none"
          >
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
