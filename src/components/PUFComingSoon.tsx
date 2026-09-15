"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

interface PUFComingSoonProps {
  onComplete?: () => void;
  isStandalone?: boolean;
}

export default function PUFComingSoon({
  onComplete,
  isStandalone = false,
}: PUFComingSoonProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Black transition elements
  const blackPanelRef = useRef<HTMLDivElement>(null);
  const blackLogoWrapperRef = useRef<HTMLDivElement>(null);

  // Main layout elements
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  // Headline text refs for bottom-to-top reveal
  const headingLine1Ref = useRef<HTMLHeadingElement>(null);
  const headingLine2Ref = useRef<HTMLHeadingElement>(null);
  const headingDescRef = useRef<HTMLParagraphElement>(null);

  // Bottom info card & internal text lines refs (niche se uper reveal)
  const bottomInfoBoxRef = useRef<HTMLDivElement>(null);
  const infoLine1Ref = useRef<HTMLParagraphElement>(null);
  const infoLine2Ref = useRef<HTMLParagraphElement>(null);
  const infoLine3Ref = useRef<HTMLDivElement>(null);

  // Action button
  const actionButtonRef = useRef<HTMLDivElement>(null);

  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    if (isDismissed) return;
    if (rootRef.current) {
      gsap.to(rootRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => {
          setIsDismissed(true);
          if (onComplete) onComplete();
        },
      });
    } else {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (blackPanelRef.current) {
        gsap.set(blackPanelRef.current, { display: "none" });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // MASTER TIMELINE
      // ----------------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // ----------------------------------------------------
      // 0. INITIAL STATE SETUP
      // ----------------------------------------------------
      gsap.set(rootRef.current, { opacity: 1, visibility: "visible" });
      gsap.set(blackPanelRef.current, {
        xPercent: 0,
        yPercent: 0,
        opacity: 0,
        visibility: "visible",
      });
      gsap.set(blackLogoWrapperRef.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 1,
      });

      // Text container is positioned and ready
      gsap.set(leftPanelRef.current, {
        xPercent: 0,
        opacity: 1,
      });

      // Headline and description start below (yPercent: 115)
      gsap.set(
        [
          headingLine1Ref.current,
          headingLine2Ref.current,
          headingDescRef.current,
        ],
        {
          yPercent: 115,
        }
      );

      // Bottom info card starts hidden below (yPercent: 120)
      gsap.set(bottomInfoBoxRef.current, {
        yPercent: 120,
        opacity: 0,
        willChange: "transform, opacity",
      });

      // Lines of text inside purple box start hidden below (yPercent: 115)
      gsap.set(
        [
          infoLine1Ref.current,
          infoLine2Ref.current,
          infoLine3Ref.current,
        ],
        {
          yPercent: 115,
        }
      );

      gsap.set(imageInnerRef.current, { scale: 1.03 });
      gsap.set(actionButtonRef.current, { opacity: 0, y: 10 });

      // ----------------------------------------------------
      // PHASE 1 — INITIAL GLIMPSE (0.00s - 0.15s)
      // ----------------------------------------------------
      tl.to({}, { duration: 0.15 });

      // ----------------------------------------------------
      // PHASE 2 — BLACK LOGO TRANSITION (0.15s - 1.45s)
      // ----------------------------------------------------
      tl.to(
        blackPanelRef.current,
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.inOut",
        },
        0.15
      );

      // Centered Logo reveals progressively from Left to Right
      tl.to(
        blackLogoWrapperRef.current,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.05,
          ease: "power2.inOut",
        },
        0.3
      );

      // ----------------------------------------------------
      // PHASE 3 — FULL PAGE REVEAL: LEFT SE WRIGHT (1.40s - 2.25s)
      // ----------------------------------------------------
      // Black panel slides from Left to Right opening the entire page
      tl.to(
        blackPanelRef.current,
        {
          xPercent: 100,
          duration: 0.85,
          ease: "power3.inOut",
        },
        1.4
      );

      // ----------------------------------------------------
      // PHASE 5 — HEADLINE REVEAL: NICHE SE UPER (2.25s - 2.90s)
      // ----------------------------------------------------
      // Line 1: "PUF" moves upward from bottom
      tl.to(
        headingLine1Ref.current,
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        2.25
      );

      // Line 2: "Coming Soon" moves upward from bottom
      tl.to(
        headingLine2Ref.current,
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        2.4
      );

      // Description text moves upward from bottom
      tl.to(
        headingDescRef.current,
        {
          yPercent: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        2.55
      );

      // ----------------------------------------------------
      // PHASE 6 — BOTTOM INFO CARD: NICHE SE UPER (2.70s - 3.40s)
      // ----------------------------------------------------
      // Purple info card container slides upward from bottom
      tl.to(
        bottomInfoBoxRef.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        2.65
      );

      // Lines of text inside purple box reveal upward from bottom
      tl.to(
        [
          infoLine1Ref.current,
          infoLine2Ref.current,
          infoLine3Ref.current,
        ],
        {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        2.85
      );

      // ----------------------------------------------------
      // PHASE 7 — FINAL IMAGE MOVEMENT & SETTLE (2.20s - 4.80s)
      // ----------------------------------------------------
      tl.to(
        imageInnerRef.current,
        {
          scale: 1,
          duration: 1.8,
          ease: "sine.out",
        },
        2.2
      );

      // Show action button softly after sequence finishes
      tl.to(
        actionButtonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        3.5
      );
    }, rootRef);

    return () => ctx.revert();
  }, [isStandalone]);

  if (isDismissed && !isStandalone) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[99999] w-screen h-screen bg-white text-gray-900 ${outfit.className} p-0 select-none overflow-hidden`}
      style={{
        height: "100dvh",
      }}
    >
      {/* ---------------------------------------------------- */}
      {/* FULL SCREEN RESPONSIVE COMPOSITION STAGE */}
      {/* ---------------------------------------------------- */}
      <div
        ref={stageRef}
        className="relative w-full h-full bg-white overflow-hidden flex flex-col justify-between"
      >
        {/* =================================================== */}
        {/* FULL SCREEN BACKGROUND IMAGE */}
        {/* =================================================== */}
        <div className="absolute inset-0 z-0 bg-gray-900 overflow-hidden">
          <div
            ref={imageInnerRef}
            className="relative w-full h-full transform-gpu will-change-transform"
          >
            <Image
              src="/Loder/ChatGPT Image Sep 15, 2026, 01_51_25 PM.png"
              alt="Synergy PUF Panel Facility"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle soft gradient on the left side to ensure crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* =================================================== */}
        {/* TEXT CONTENT (FLOATING DIRECTLY OVER IMAGE) */}
        {/* =================================================== */}
        <div
          ref={leftPanelRef}
          className="relative z-10 w-full sm:w-[85%] md:w-[65%] lg:w-[50%] xl:w-[46%] h-full flex flex-col justify-between p-7 sm:p-10 md:p-14 transform-gpu will-change-transform"
        >
          {/* TOP BAR: LOGO (CLEAN STATIC) */}
          <div className="flex items-center">
            <div className="relative h-10 sm:h-11 w-36 sm:w-44">
              <Image
                src="/images/logo/puf-logo.png"
                alt="Synergy PUF"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* CENTER: HEADLINE (NICHE SE UPER REVEAL INSIDE OVERFLOW:HIDDEN) */}
          <div className="my-auto py-6 sm:py-8 space-y-2">
            <div className="overflow-hidden py-1">
              <h1
                ref={headingLine1Ref}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-bold tracking-tight text-[#111111] leading-[0.92] uppercase transform-gpu will-change-transform"
              >
                PUF
              </h1>
            </div>

            <div className="overflow-hidden pt-1 pb-4">
              <h2
                ref={headingLine2Ref}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.85rem] font-semibold tracking-tight text-[#5b176e] leading-[1.08] pb-1 transform-gpu will-change-transform"
              >
                Coming Soon
              </h2>
            </div>

            <div className="overflow-hidden pt-2">
              <p
                ref={headingDescRef}
                className="text-sm sm:text-base text-gray-500 font-light max-w-sm leading-relaxed transform-gpu will-change-transform"
              >
                Precision-engineered insulated sandwich panels and thermal building systems.
              </p>
            </div>
          </div>

          {/* BOTTOM: COLOR INFORMATION PANEL (NICHE SE UPER REVEAL) */}
          <div className="relative w-full max-w-md pt-2 overflow-hidden">
            <div
              ref={bottomInfoBoxRef}
              className="bg-[#5b176e] text-white p-5 sm:p-6 shadow-md border-l-4 border-[#ad96b6] transform-gpu will-change-transform"
            >
              {/* Line 1 (niche se uper) */}
              <div className="overflow-hidden py-0.5">
                <p
                  ref={infoLine1Ref}
                  className="text-base sm:text-lg font-medium tracking-wide leading-snug transform-gpu will-change-transform"
                >
                  Something better is coming.
                </p>
              </div>

              {/* Line 2 (niche se uper) */}
              <div className="overflow-hidden py-0.5">
                <p
                  ref={infoLine2Ref}
                  className="text-xs sm:text-sm text-purple-100 font-light mt-0.5 transform-gpu will-change-transform"
                >
                  Our PUF solutions are almost ready.
                </p>
              </div>

              {/* Line 3 (niche se uper) */}
              <div className="mt-3 pt-2.5 border-t border-white/20 overflow-hidden">
                <div
                  ref={infoLine3Ref}
                  className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-purple-200 transform-gpu will-change-transform"
                >
                  PUF Panels • Insulation • Energy Efficient Solutions
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================== */}
        {/* FLOATING ACTION BUTTON */}
        {/* =================================================== */}
        <div
          ref={actionButtonRef}
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20"
        >
          {!isStandalone && (
            <button
              onClick={handleDismiss}
              className="inline-flex items-center gap-3 bg-white/95 hover:bg-white text-[#5b176e] border border-purple-200 px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-all duration-200 active:scale-95"
            >
              <span>Enter Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {isStandalone && (
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-white/95 hover:bg-white text-[#5b176e] border border-purple-200 px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-all duration-200 active:scale-95"
            >
              <span>Return Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* =================================================== */}
        {/* BLACK PANEL & CENTERED WHITE LOGO TRANSITION */}
        {/* =================================================== */}
        <div
          ref={blackPanelRef}
          className="absolute inset-0 z-50 bg-[#09070a] flex flex-col items-center justify-center pointer-events-none transform-gpu will-change-transform"
        >
          {/* Centered Logo with Progressive Left-to-Right Reveal */}
          <div
            ref={blackLogoWrapperRef}
            className="flex flex-col items-center justify-center space-y-4 px-6 text-center transform-gpu will-change-transform"
          >
            <div className="relative h-14 sm:h-18 md:h-20 w-52 sm:w-64 md:w-72">
              <Image
                src="/images/logo/synergy white logo.png"
                alt="Synergy PUF Logo"
                fill
                priority
                className="object-contain object-center brightness-125"
              />
            </div>
            <div className="h-[2px] w-20 bg-[#ad96b6]/60" />
            <p className="text-xs sm:text-sm font-light text-gray-300 tracking-[0.25em] uppercase">
              Synergy PUF Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
