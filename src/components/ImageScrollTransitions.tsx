"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

/**
 * Image Decrease Section: Full-screen/large image shrinks on scroll.
 */
export function ImageDecreaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgFrameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    const frame = imgFrameRef.current;
    if (!root || !frame) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { scale: 1, borderRadius: "0rem" },
        {
          scale: 0.82,
          borderRadius: "2rem",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-gray-900 text-white overflow-hidden flex flex-col justify-center items-center">
      <div
        ref={imgFrameRef}
        className="relative w-full h-[85vh] overflow-hidden bg-black shadow-2xl transform-gpu"
      >
        <Image
          src="/puf_factory.png"
          alt="Continuous PUF Panel Line"
          fill
          priority={false}
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        <Container className="relative z-10 h-full flex flex-col justify-end pb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 block mb-3 font-semibold">
              SCROLL TRANSITION — DECREASE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Engineering High-Density Structural Foam
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              Watch structural panel density scale continuously with sub-millimeter precision.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}

/**
 * Image Increase Section: Small image expands to full-bleed presentation on scroll.
 */
export function ImageIncreaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgFrameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    const frame = imgFrameRef.current;
    if (!root || !frame) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { scale: 0.72, borderRadius: "2.5rem" },
        {
          scale: 1,
          borderRadius: "0rem",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] bg-white text-gray-900 py-16 overflow-hidden flex flex-col justify-center items-center">
      <div
        ref={imgFrameRef}
        className="relative w-[92vw] max-w-6xl h-[70vh] overflow-hidden bg-gray-900 shadow-2xl transform-gpu"
      >
        <Image
          src="/images/puf-panel-exploded.png"
          alt="Exploded PUF Panel Core Assembly"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <Container className="relative z-10 h-full flex flex-col justify-end pb-12">
          <div className="max-w-2xl text-white">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300 block mb-2 font-semibold">
              SCROLL TRANSITION — INCREASE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Expanding Core Strength & Fire Barrier Rating
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-200 leading-relaxed">
              B1/B2 fire-retardant formulation bonded seamlessly between steel fascia skins.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
