"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check if session already played intro to prevent annoying re-triggers on minor navigation
    const hasSeenIntro = sessionStorage.getItem("synergy_intro_seen");
    if (hasSeenIntro) {
      setHidden(true);
      if (onComplete) onComplete();
      return;
    }

    const container = containerRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const line = lineRef.current;
    const curtain = curtainRef.current;

    if (!container || !text1 || !text2 || !line || !curtain) return;

    const ctx = gsap.context(() => {
      // Prevent scroll while intro is playing
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          sessionStorage.setItem("synergy_intro_seen", "true");
          setHidden(true);
          if (onComplete) onComplete();
        },
      });

      // Initial state setup
      gsap.set(text1, { y: 40, opacity: 0 });
      gsap.set(text2, { y: 30, opacity: 0 });
      gsap.set(line, { scaleX: 0, opacity: 0 });
      gsap.set(curtain, { clipPath: "inset(0% 0% 0% 0%)" });

      // Step 1: Brand reveal in loader
      tl.to(line, {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          text1,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          text2,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          [text1, text2, line],
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
          },
          "+=0.4"
        )
        // Step 2: Full screen curtain reveal (inset 0% 0% 100% 0%)
        .to(curtain, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.1,
          ease: "expo.inOut",
        });
    }, container);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-auto flex items-center justify-center select-none"
    >
      <div
        ref={curtainRef}
        className="absolute inset-0 w-full h-full bg-[#0a0a0c] flex flex-col items-center justify-center px-6"
        style={{ willChange: "clip-path" }}
      >
        <div className="relative flex flex-col items-center text-center max-w-xl">
          <div
            ref={lineRef}
            className="w-16 h-[2px] bg-white mb-6 origin-left"
          />

          <h1
            ref={text1Ref}
            className="text-3xl sm:text-5xl font-extrabold uppercase tracking-widest text-white leading-tight font-sans"
          >
            SYNERGY <span className="text-[#a855f7]">PUF</span>
          </h1>

          <p
            ref={text2Ref}
            className="mt-3 text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 font-light"
          >
            Engineering Insulation Solutions
          </p>
        </div>
      </div>
    </div>
  );
}
