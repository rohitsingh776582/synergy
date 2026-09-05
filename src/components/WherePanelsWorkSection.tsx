"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    num: "500",
    plus: "+",
    label: "Projects delivered",
    isGold: false,
  },
  {
    num: "12",
    plus: "+",
    label: "States served",
    isGold: false,
  },
  {
    num: "5L",
    plus: "+",
    label: "Sq ft / month capacity",
    isGold: false,
  },
  {
    num: "-35°C",
    plus: "",
    label: "Coldest zone built",
    isGold: true,
  },
];

export default function WherePanelsWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    const statsContainer = statsContainerRef.current;
    if (!section || !textContainer) return;

    const ctx = gsap.context(() => {
      const textElements = textContainer.querySelectorAll("[data-animate-up]");
      const statElements = statsContainer ? statsContainer.children : [];

      // Initial state: shifted downwards and transparent
      gsap.set(textElements, {
        opacity: 0,
        y: 45,
        willChange: "transform, opacity",
      });

      if (statElements.length) {
        gsap.set(statElements, {
          opacity: 0,
          y: 35,
          willChange: "transform, opacity",
        });
      }

      // Smooth upward entrance timeline triggered on scroll/view
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.to(textElements, {
        opacity: 1,
        y: 0,
        duration: 1.05,
        stagger: 0.12,
      });

      if (statElements.length) {
        tl.to(
          statElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
          },
          "-=0.4"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#20092c] py-16 md:py-24 font-sans text-white border-t border-purple-950/60 select-none overflow-hidden"
    >
      <Container>
        {/* Main Heading & Subtitle aligned with Navbar Logo */}
        <div
          ref={textContainerRef}
          className="max-w-3xl flex flex-col items-start text-left"
        >
          <h2
            data-animate-up
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.12] tracking-tight mb-6"
          >
            Where our panels <br />
            go to work.
          </h2>

          <p
            data-animate-up
            className="text-purple-100/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8"
          >
            A selection of facilities engineered and delivered across India —
            from -35°C blast freezers to large-scale warehouse envelopes with
            zero thermal loss.
          </p>

          {/* Action Buttons Row (ZERO border radius, ZERO shadow) */}
          <div
            data-animate-up
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#461058] text-white px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-all duration-200 active:scale-95"
            >
              Get a quote
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/40 px-7 py-3.5 rounded-none text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-none transition-all duration-200 active:scale-95"
            >
              Talk to an engineer
            </Link>
          </div>
        </div>

        {/* Bottom Stats Grid (4 Columns, NO border radius, NO grid background square boxes) */}
        <div className="pt-10 border-t border-purple-900/50">
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          >
            {stats.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-start text-left ${
                  idx !== 0 ? "md:border-l md:border-purple-900/40 md:pl-6" : ""
                }`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl stat-number font-bold tracking-tight mb-2">
                  <span className="text-white">{item.num}</span>
                  {item.plus && <span className="text-white ml-0.5">{item.plus}</span>}
                </div>
                <span className="text-xs sm:text-sm text-purple-200/80 font-light leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
