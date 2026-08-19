"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

export default function BuildProjectCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightGridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightGrid = rightGridRef.current;
    if (!section || !leftCol || !rightGrid) return;

    const ctx = gsap.context(() => {
      const leftElements = leftCol.querySelectorAll("span, h2, p");
      const rightElements = rightGrid.children;

      gsap.set([leftElements, rightElements], { opacity: 0, y: 35 });

      let maxProgress = 0;
      const tl = gsap.timeline({ paused: true });

      tl.to(
        leftElements,
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "none",
        },
        0
      );

      tl.to(
        rightElements,
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "none",
        },
        0.15
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "top 45%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > maxProgress) {
            maxProgress = self.progress;
            tl.progress(maxProgress);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f8f6f9] py-16 md:py-20 shadow-none">
      <Container className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Heading and Subtext */}
        <div ref={leftColRef} className="flex flex-col space-y-6">
          <span className="inline-flex items-center gap-2 self-start bg-[#f3e8f7] px-4 py-1.5 text-xs font-medium text-[#5b176e] sm:text-sm">
            <span className="h-1.5 w-1.5 bg-[#5b176e]" aria-hidden />
            Even impossible is possible
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1c1917] tracking-tight leading-[1.15]">
            Build your next <br />
            project with <br />
            Synergy PUF.
          </h2>

          <p className="text-[#686563] text-sm sm:text-base max-w-md leading-relaxed">
            High-performance insulated panel solutions delivered on time, every time, across India.
          </p>
        </div>

        {/* Right Column: Staggered Grid & Action Buttons */}
        <div className="flex justify-center lg:justify-end">
          <div ref={rightGridRef} className="grid grid-cols-2 gap-4 w-full max-w-[460px]">
            {/* Top-Left Image: PUF Wall Panel */}
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-purple-100 p-3 group transition-all duration-300">
              <Image
                src="/images/products/wall_panel_hero.png"
                alt="Synergy PUF Wall Panel"
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Top-Right Empty Space */}
            <div />

            {/* Bottom-Left Action Buttons */}
            <div className="flex flex-col justify-center gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center justify-between gap-2 bg-[#532247] hover:bg-[#431b38] text-white px-5 py-3.5 text-sm font-medium transition-colors"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <a
                href="/brochure.pdf"
                download
                className="inline-flex items-center justify-between gap-2 bg-[#ab98a7] hover:bg-[#9c8798] text-[#2c1b29] px-5 py-3.5 text-sm font-medium transition-colors"
              >
                <span>Download Brochure</span>
                <Download className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Bottom-Right Image: PUF Roof Panel */}
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-purple-100 p-3 group transition-all duration-300">
              <Image
                src="/images/products/roof_panel_hero.png"
                alt="Synergy PUF Roof Panel"
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


