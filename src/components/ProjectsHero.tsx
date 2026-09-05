"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Container from "./Container";

const stats = [
  { value: "50+", label: "Project complete" },
  { value: "100+", label: "Expert teams" },
  { value: "1.5L+", label: "Sq Ft Delivered" },
  { value: "12+", label: "Years Experience" },
];

export default function ProjectsHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="projects-hero"
      className="relative w-full h-screen min-h-[750px] max-h-[1000px] flex flex-col justify-between overflow-hidden bg-black text-white select-none"
    >
      {/* FULL BLEED BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects_hero_architecture.jpg"
          alt="Architectural Masterpieces by Synergy"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* TOP AREA / CONTENT (Aligned with Navbar) */}
      <motion.div style={{ y, opacity }}>
        <Container className="relative z-10 w-full pt-32 sm:pt-36 md:pt-40 flex flex-col items-start space-y-6">
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
              BUILT TO INSPIRE
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.12] text-white tracking-tight max-w-4xl"
          >
            Design spaces people love
          </motion.h1>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/80 text-sm sm:text-base max-w-lg font-light leading-relaxed pt-1"
          >
            Bring your architectural projects to life with a template that puts your work front and center. Simple, elegant, and made for creators like you.
          </motion.p>

          {/* Call To Action Button (Pill button with dark arrow icon circle) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-2"
          >
            <Link
              href="#projects-portfolio"
              className="group flex items-center gap-3 bg-white text-black px-6 py-2.5 sm:py-3 rounded-full font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-white/90 transition-all shadow-xl"
            >
              <span>Get started</span>
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </Container>
      </motion.div>

      {/* BOTTOM OVERLAID STATS BAR & SCROLL INDICATOR (Aligned with Navbar) */}
      <Container className="relative z-10 w-full pb-8 sm:pb-12 flex flex-col space-y-6">
        {/* Stats Grid Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 pt-6 border-t border-white/20"
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col justify-start ${
                idx < stats.length - 1 ? "md:border-r md:border-white/20 md:pr-8 md:mr-8" : ""
              }`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl stat-number font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-white/70 font-light tracking-wider uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Center Scroll Down Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex justify-center pt-2"
        >
          <a
            href="#projects-portfolio"
            className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-mono px-5 py-2 rounded-full hover:bg-white/20 transition-all"
          >
            <span>Scroll down</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
