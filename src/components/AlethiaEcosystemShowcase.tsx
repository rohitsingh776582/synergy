"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";
import { ArrowUpRight, Plus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ==========================================================================
   1. PRELOADER COMPONENT
   ========================================================================== */
function AlethiaPreloader({ onLoaded }: { onLoaded: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onLoaded();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-black will-change-transform"
        >
          {/* Animated Spinner Icon */}
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-black/20 border-t-black animate-spin duration-1000" />
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-black font-mono text-xs font-bold tracking-widest uppercase">
              ECO
            </div>
          </div>
          <p className="mt-6 font-mono text-[11px] text-black font-bold tracking-[0.3em] uppercase">
            CALIBRATING ECOSYSTEM DATA...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ==========================================================================
   2. TOP NAVBAR COMPONENT
   ========================================================================== */
function AlethiaNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -94 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-sm"
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold font-mono text-xs">
          E
        </div>
        <span className="font-mono text-sm tracking-widest text-black font-bold uppercase">
          ECOSYSTEM INTELLIGENCE
        </span>
      </div>

      {/* Menu / Close Pill Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="relative overflow-hidden rounded-[5px] bg-black px-4 py-2 font-mono text-xs font-bold tracking-wider text-white hover:bg-slate-800 transition-all duration-300 shadow-sm"
      >
        <span className="relative z-10 uppercase text-white">
          {menuOpen ? "Close" : "Menu"}
        </span>
      </button>
    </div>
  );
}

/* ==========================================================================
   3. DATA TOOLTIP COMPONENT
   ========================================================================== */
interface TooltipProps {
  label: string;
  x: string;
  y: string;
}

function DataTooltip({ label, x, y }: TooltipProps) {
  return (
    <div
      className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto hidden md:block"
      style={{ left: x, top: y }}
    >
      <div className="flex items-center gap-2.5 rounded-lg border border-black/20 bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-lg hover:border-black transition-colors">
        {/* Pulsing Status Indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
        </span>
        <span className="font-mono text-[10px] font-bold tracking-widest text-black uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. STICKY ACCORDION COMPONENT
   ========================================================================== */
const ACCORDION_DATA = [
  {
    id: "01",
    title: "GOLD-STANDARD OBSERVATION SYSTEMS",
    desc: "Multi-tiered sensor arrays combining high-resolution satellite imagery, ground flux towers, and airborne laser scanning to deliver unmatched accuracy.",
  },
  {
    id: "02",
    title: "WORLD-CLASS ATMOSPHERIC MONITORING (AMRV)",
    desc: "Advanced Measurement, Reporting, and Verification protocols utilizing cavity ring-down spectroscopy to continuously trace greenhouse gas dynamics.",
  },
  {
    id: "03",
    title: "INTEGRATED ALGORITHMIC PROCESSING",
    desc: "Machine learning models trained on decades of bio-geochemical data to isolate human interventions from natural climate variability.",
  },
  {
    id: "04",
    title: "BLOCKCHAIN-SECURED TRACEABILITY",
    desc: "Immutable ledger registration for every carbon credit generated, linking telemetry directly to cryptographic tokens.",
  },
  {
    id: "05",
    title: "BUILT FOR SCALE AND COMPLEXITY",
    desc: "Enterprise-grade API integrations designed to handle millions of data points across global supply chains.",
  },
];

function StickyAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full flex flex-col gap-3 text-black">
      {ACCORDION_DATA.map((item, idx) => {
        const isActive = activeIdx === idx;

        return (
          <div
            key={item.id}
            onClick={() => setActiveIdx(idx)}
            className={`group cursor-pointer rounded-xl p-5 transition-all duration-300 border ${
              isActive
                ? "bg-slate-100 text-black border-black shadow-md"
                : "bg-white text-black border-slate-300 hover:border-black shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold tracking-widest text-black">
                  {item.id}
                </span>
                <h4 className="font-mono text-sm sm:text-base font-bold tracking-wider uppercase text-black">
                  {item.title}
                </h4>
              </div>

              <div
                className={`flex-shrink-0 transition-transform duration-300 ${
                  isActive ? "rotate-45" : "group-hover:rotate-90"
                }`}
              >
                <Plus className="w-5 h-5 text-black" />
              </div>
            </div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-xs sm:text-sm leading-relaxed pl-9 text-black font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ==========================================================================
   5. MAIN ALETHIA ECOSYSTEM SHOWCASE COMPONENT
   ========================================================================== */
export default function AlethiaEcosystemShowcase() {
  const [contentReady, setContentReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const rockBackRef = useRef<HTMLDivElement>(null);
  const rockMedRef = useRef<HTMLDivElement>(null);
  const rockFrontRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!contentReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Heading Reveal
      if (heroHeadingRef.current) {
        gsap.fromTo(
          heroHeadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );
      }

      // Parallax Rock Layers Scrub Animation
      if (rockBackRef.current) {
        gsap.to(rockBackRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (rockMedRef.current) {
        gsap.to(rockMedRef.current, {
          y: -140,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (rockFrontRef.current) {
        gsap.to(rockFrontRef.current, {
          y: -200,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [contentReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-white text-black font-sans overflow-hidden selection:bg-black selection:text-white"
    >
      {/* 1. Preloader */}
      <AlethiaPreloader onLoaded={() => setContentReady(true)} />

      {/* 2. Navigation */}
      <AlethiaNavbar />

      {/* 3. HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-16 overflow-hidden bg-white text-black">
        {/* Background Parallax Orbs Backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Back Orb */}
          <div
            ref={rockBackRef}
            style={{
              transform:
                "translate(-50%,-50%) translateX(35vw) translateY(-10vh) scale(3.2) rotate(-16deg)",
            }}
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-slate-200/50 to-slate-100/20 border border-slate-300 opacity-60 transform-gpu will-change-transform"
          />

          {/* Middle Orb */}
          <div
            ref={rockMedRef}
            style={{
              transform:
                "translate(-50%,-50%) translateX(-40vw) translateY(25vh) scale(3.2) rotate(-16deg)",
            }}
            className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-emerald-100/40 to-slate-100/20 border border-slate-300 opacity-50 transform-gpu will-change-transform"
          />

          {/* Front Orb */}
          <div
            ref={rockFrontRef}
            style={{
              transform:
                "translate(-50%,-50%) translateX(30vw) translateY(30vh) scale(2.2) rotate(-26deg)",
            }}
            className="absolute top-1/2 left-1/2 w-[280px] h-[280px] rounded-full bg-gradient-to-bl from-slate-200/60 to-transparent border border-slate-300 opacity-70 transform-gpu will-change-transform"
          />
        </div>

        {/* Live Data Telemetry Tooltips */}
        <DataTooltip label="CARBON DIOXIDE FLUX" x="18%" y="28%" />
        <DataTooltip label="SENSIBLE HEAT FLUX" x="80%" y="35%" />
        <DataTooltip label="DATA STREAMING" x="72%" y="78%" />

        <Container className="relative z-10 max-w-5xl text-center flex flex-col items-center">
          {/* Tagline / Badge: ECOSYSTEM INTELLIGENCE ENGINE */}
          <span className="inline-block bg-white text-black border border-black shadow-sm px-5 py-2 rounded-full font-mono text-xs tracking-[0.3em] uppercase font-extrabold mb-6">
            ECOSYSTEM INTELLIGENCE ENGINE
          </span>

          {/* H1 Heading */}
          <h1
            ref={heroHeadingRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-black leading-[1.1] max-w-4xl"
          >
            Where Ecosystem Science and Enterprise Strategy Meet
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-black font-medium max-w-2xl leading-relaxed">
            Know your impact—precisely. Translate complex bio-geochemical data into verifiable, compliance-ready carbon telemetry.
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex items-center gap-4">
            <button className="rounded-full border border-black bg-white px-8 py-3.5 font-mono text-xs font-bold tracking-widest text-black uppercase hover:bg-black hover:text-white transition-all duration-300 shadow-md flex items-center gap-2">
              <span className="text-black hover:text-white">Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </Container>
      </section>

      {/* 4. RADIAL EXPLOSION COLLAGE SECTION ("ALETHIA SOLVES") */}
      <section className="relative w-full py-24 px-6 border-t border-slate-200 bg-slate-50 text-black">
        <Container className="max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-white text-black border border-black shadow-sm px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase font-extrabold">
              CAPABILITIES & ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-black mt-4">
              Alethia Solves Complex Environmental Telemetry
            </h2>
          </div>

          {/* Radial Floating Layout */}
          <div className="relative min-h-[420px] flex items-center justify-center">
            {/* Center Core Card */}
            <div className="relative z-20 rounded-2xl bg-white text-black p-8 max-w-md shadow-2xl border border-black text-center">
              <div className="w-10 h-10 rounded-full bg-black text-white mx-auto mb-4 flex items-center justify-center font-mono text-xs font-bold">
                01
              </div>
              <h3 className="font-mono text-lg font-extrabold uppercase tracking-wider text-black">
                CORE ANALYTICS ENGINE
              </h3>
              <p className="font-sans text-xs sm:text-sm font-medium leading-relaxed mt-2 text-black">
                Seamlessly synthesizing satellite observations, flux towers, and atmospheric monitoring into unified metrics.
              </p>
            </div>

            {/* Radial Layer 1 */}
            <div
              style={{ transform: "translateX(220px) translateY(80px) scale(0.85)" }}
              className="absolute z-10 p-4 rounded-xl border border-black bg-white text-black shadow-lg max-w-xs transform-gpu will-change-transform hidden md:block"
            >
              <span className="font-mono text-[10px] text-black font-bold">LAYER 01</span>
              <p className="text-xs text-black mt-1 font-mono font-bold">Product & Offset Verification</p>
            </div>

            {/* Radial Layer 2 */}
            <div
              style={{ transform: "translateX(-240px) translateY(100px) scale(0.8)" }}
              className="absolute z-10 p-4 rounded-xl border border-black bg-white text-black shadow-lg max-w-xs transform-gpu will-change-transform hidden md:block"
            >
              <span className="font-mono text-[10px] text-black font-bold">LAYER 02</span>
              <p className="text-xs text-black mt-1 font-mono font-bold">Real-Time Atmospheric Measurement</p>
            </div>

            {/* Radial Layer 3 */}
            <div
              style={{ transform: "translateX(-280px) translateY(-110px) scale(0.8)" }}
              className="absolute z-10 p-4 rounded-xl border border-black bg-white text-black shadow-lg max-w-xs transform-gpu will-change-transform hidden md:block"
            >
              <span className="font-mono text-[10px] text-black font-bold">LAYER 03</span>
              <p className="text-xs text-black mt-1 font-mono font-bold">Carbon Removal Telemetry</p>
            </div>

            {/* Radial Layer 4 */}
            <div
              style={{ transform: "translateX(260px) translateY(-120px) scale(0.85)" }}
              className="absolute z-10 p-4 rounded-xl border border-black bg-white text-black shadow-lg max-w-xs transform-gpu will-change-transform hidden md:block"
            >
              <span className="font-mono text-[10px] text-black font-bold">LAYER 04</span>
              <p className="text-xs text-black mt-1 font-mono font-bold">Bio-Geochemical Flux Modeling</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. STICKY ACCORDION SECTION */}
      <section className="relative w-full py-24 px-6 border-t border-slate-200 bg-white text-black">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 sticky top-28">
              <span className="inline-block bg-white text-black border border-black shadow-sm px-4 py-1.5 rounded-full font-mono text-xs tracking-widest uppercase font-extrabold">
                SYSTEM MODULES
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-black mt-4 leading-tight">
                Enterprise-Grade Climate Science Infrastructure
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-black font-medium leading-relaxed">
                Click through each module to examine the multi-tiered observation layers powering our accounting platform.
              </p>
            </div>

            <div className="lg:col-span-7">
              <StickyAccordion />
            </div>
          </div>
        </Container>
      </section>

      {/* 6. FOOTER CTA SECTION */}
      <footer className="relative w-full py-24 px-6 overflow-hidden border-t border-slate-200 bg-slate-50 text-black text-center">
        <Container className="relative z-20 max-w-3xl flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-mono text-sm font-bold mb-6 shadow-md">
            ↗
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-black tracking-tight">
            Ready to Calibrate Your Corporate Climate Action?
          </h2>
          <p className="mt-4 text-sm text-black font-medium max-w-xl">
            Connect with our climate intelligence team to deploy verifiable ecosystem accounting across your supply chain.
          </p>

          <button className="mt-8 rounded-full bg-black text-white font-mono text-xs font-bold tracking-widest uppercase px-10 py-4 hover:bg-slate-800 transition-all shadow-lg">
            Schedule Technical Briefing
          </button>
        </Container>
      </footer>
    </div>
  );
}


