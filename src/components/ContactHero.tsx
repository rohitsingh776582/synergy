"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = containerRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

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
        stagger: 0.14,
        delay: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[60vh] sm:min-h-[70vh] w-full flex-col justify-center overflow-hidden bg-gray-900 py-32 sm:py-40 md:py-48 text-left text-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Contact/f051904f1a925e5300c3cdf10d2c3a62.jpg"
          alt="Contact Synergy PUF"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Minimal Light Overlay for Crisp Image Visibility */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Container className="relative z-10 w-full flex flex-col items-start text-left">
        <div ref={contentRef} className="flex flex-col items-start text-left">
          <h1
            data-animate-hero
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.12] text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          >
            Contact Synergy PUF <br />
            Engineering Team
          </h1>

          <p
            data-animate-hero
            className="mt-5 text-base sm:text-lg md:text-xl text-white font-light leading-relaxed max-w-2xl transform-gpu will-change-transform drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            Have a technical query or require site inspection? Our insulation specialists are ready to assist you.
          </p>
        </div>
      </Container>
    </section>
  );
}
