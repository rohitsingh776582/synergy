"use client";

import React from "react";
import Link from "next/link";
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
 * Light variant banner ("Not sure which panel fits?")
 * - ZERO border radius (rounded-none)
 * - ZERO shadows (shadow-none)
 * - Left text aligned exactly with Navbar logo
 * - Right button aligned exactly with "Start Your Quote"
 */
export function LightPanelFitsBanner({
  title = "Not sure which panel fits?",
  subtitle = "Tell us what you're building. We'll help you explore the options.",
  buttonText = "Help me choose",
  buttonHref = "/contact",
  onButtonClick,
  className = "",
}: BannerProps) {
  return (
    <section
      className={`w-full bg-white border-y border-purple-100/80 py-10 md:py-12 font-sans select-none rounded-none shadow-none ${className}`}
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8 rounded-none shadow-none">
          {/* Left-side text: Aligned exactly with Navbar logo */}
          <div className="flex flex-col items-start text-left max-w-2xl rounded-none shadow-none">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Right-side action: Aligned exactly with Navbar "Start Your Quote" */}
          <div className="shrink-0 w-full sm:w-auto rounded-none shadow-none">
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
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Dark purple variant banner ("Ready to discuss your specification?")
 * - ZERO border radius (rounded-none)
 * - ZERO shadows (shadow-none)
 * - Left text aligned exactly with Navbar logo
 * - Right button aligned exactly with "Start Your Quote"
 */
export function DarkSpecificationBanner({
  title = "Ready to discuss your specification?",
  subtitle = "Share your project requirements with our team.",
  buttonText = "Get a quote",
  buttonHref = "/quote",
  onButtonClick,
  className = "",
}: BannerProps) {
  return (
    <section
      className={`w-full bg-[#3E0F4D] py-10 md:py-12 font-sans text-white select-none rounded-none shadow-none ${className}`}
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 md:gap-8 rounded-none shadow-none">
          {/* Left-side text: Aligned exactly with Navbar logo */}
          <div className="flex flex-col items-start text-left max-w-2xl rounded-none shadow-none">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-purple-100/90 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Right-side action: Aligned exactly with Navbar "Start Your Quote" */}
          <div className="shrink-0 w-full sm:w-auto rounded-none shadow-none">
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
          </div>
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
