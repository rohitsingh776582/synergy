"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Container from "./Container";

interface BannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  className?: string;
}

/**
 * Scroll-driven letter-by-letter typewriter / write-in effect
 */
function ScrollTypewriterText({
  text,
  progress,
  start = 0.02,
  end = 0.45,
  className = "",
}: {
  text: string;
  progress: MotionValue<number>;
  start?: number;
  end?: number;
  className?: string;
}) {
  const words = text.split(" ");
  let counter = 0;
  const processed = words.map((word) =>
    word.split("").map((char) => ({
      char,
      index: counter++,
    }))
  );
  const totalChars = counter;

  return (
    <span className={className}>
      {processed.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          {word.map((item) => {
            const step = (end - start) / Math.max(1, totalChars);
            const letterStart = start + item.index * step;
            const letterEnd = letterStart + step * 1.3;

            return (
              <LetterItem
                key={item.index}
                char={item.char}
                progress={progress}
                letterStart={letterStart}
                letterEnd={letterEnd}
              />
            );
          })}
        </span>
      ))}
    </span>
  );
}

function LetterItem({
  char,
  progress,
  letterStart,
  letterEnd,
}: {
  char: string;
  progress: MotionValue<number>;
  letterStart: number;
  letterEnd: number;
}) {
  const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-14, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

/**
 * Light variant banner ("Not sure which panel fits?")
 * - Left-to-right scroll-driven letter writing animation
 * - ZERO border radius (rounded-none)
 * - ZERO shadows (shadow-none)
 */
export function LightPanelFitsBanner({
  title = "Not sure which panel fits?",
  subtitle = "Tell us what you're building. We'll help you explore the options.",
  buttonText = "Help me choose",
  buttonHref = "/contact",
  onButtonClick,
  className = "",
}: BannerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const buttonsY = useTransform(smoothProgress, [0.25, 0.65], [25, 0]);
  const buttonsOpacity = useTransform(smoothProgress, [0.25, 0.60], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-white border-y border-purple-100/80 py-10 md:py-12 font-sans select-none rounded-none shadow-none overflow-hidden ${className}`}
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8 rounded-none shadow-none">
          {/* Left-side text: Writes from left to right on scroll */}
          <div className="flex flex-col items-start text-left max-w-2xl rounded-none shadow-none">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
              <ScrollTypewriterText
                text={title}
                progress={smoothProgress}
                start={0.02}
                end={0.45}
              />
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
              <ScrollTypewriterText
                text={subtitle}
                progress={smoothProgress}
                start={0.22}
                end={0.65}
              />
            </p>
          </div>

          {/* Right-side action: Smooth entrance */}
          <motion.div
            style={{
              y: buttonsY,
              opacity: buttonsOpacity,
            }}
            className="shrink-0 w-full sm:w-auto rounded-none shadow-none transform-gpu will-change-transform"
          >
            {buttonHref && !onButtonClick ? (
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-purple-900/30 text-purple-950 hover:border-purple-900 hover:bg-purple-50 text-sm font-medium rounded-none shadow-none transition-colors duration-200 active:scale-95"
              >
                {buttonText}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onButtonClick}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-purple-900/30 text-purple-950 hover:border-purple-900 hover:bg-purple-50 text-sm font-medium rounded-none shadow-none transition-colors duration-200 active:scale-95"
              >
                {buttonText}
              </button>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Dark purple variant banner ("Ready to discuss your specification?")
 * - Left-to-right scroll-driven letter writing animation
 * - ZERO border radius (rounded-none)
 * - ZERO shadows (shadow-none)
 */
export function DarkSpecificationBanner({
  title = "Ready to discuss your specification?",
  subtitle = "Share your project requirements with our team.",
  buttonText = "Get a quote",
  buttonHref = "/quote",
  onButtonClick,
  className = "",
}: BannerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const buttonsY = useTransform(smoothProgress, [0.25, 0.65], [25, 0]);
  const buttonsOpacity = useTransform(smoothProgress, [0.25, 0.60], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-[#3E0F4D] py-10 md:py-12 font-sans text-white select-none rounded-none shadow-none overflow-hidden ${className}`}
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8 rounded-none shadow-none">
          {/* Left-side text: Writes from left to right on scroll */}
          <div className="flex flex-col items-start text-left max-w-2xl rounded-none shadow-none">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              <ScrollTypewriterText
                text={title}
                progress={smoothProgress}
                start={0.02}
                end={0.45}
              />
            </h2>
            <p className="mt-2 text-sm sm:text-base text-purple-100/90 font-light leading-relaxed">
              <ScrollTypewriterText
                text={subtitle}
                progress={smoothProgress}
                start={0.22}
                end={0.65}
              />
            </p>
          </div>

          {/* Right-side action: Smooth entrance */}
          <motion.div
            style={{
              y: buttonsY,
              opacity: buttonsOpacity,
            }}
            className="shrink-0 w-full sm:w-auto rounded-none shadow-none transform-gpu will-change-transform"
          >
            {buttonHref && !onButtonClick ? (
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-white/70 text-white hover:border-white hover:bg-white/10 text-sm font-medium rounded-none shadow-none transition-colors duration-200 active:scale-95"
              >
                {buttonText}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onButtonClick}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-white/70 text-white hover:border-white hover:bg-white/10 text-sm font-medium rounded-none shadow-none transition-colors duration-200 active:scale-95"
              >
                {buttonText}
              </button>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export interface SpecificationBannerProps {
  variant?: "light" | "purple" | "both";
  lightProps?: BannerProps;
  darkProps?: BannerProps;
  className?: string;
}

/**
 * Main SpecificationBanner Component
 * Allows rendering either the Light variant, Dark Purple variant, or both stacked together.
 */
export default function SpecificationBanner({
  variant = "both",
  lightProps,
  darkProps,
  className = "",
}: SpecificationBannerProps) {
  if (variant === "light") {
    return <LightPanelFitsBanner {...lightProps} className={className} />;
  }

  if (variant === "purple") {
    return <DarkSpecificationBanner {...darkProps} className={className} />;
  }

  return (
    <div className={`w-full rounded-none shadow-none ${className}`}>
      <LightPanelFitsBanner {...lightProps} />
      <DarkSpecificationBanner {...darkProps} />
    </div>
  );
}


