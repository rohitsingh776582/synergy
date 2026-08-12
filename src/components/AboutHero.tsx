"use client";

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Container from "./Container";

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

function RevealLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span data-reveal-line className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-reveal-line]")
    );
    if (!lines.length) return;

    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Video-style masked rise: each line comes from below the clip edge
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        lines,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.14,
        },
        0.15
      );
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-purple-100/80 pt-12 pb-10 md:pt-16 md:pb-12"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/HeroSection/DJI_20260729155134_0345_D.JPG.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_12%] scale-[1.22] origin-top"
        />
      </div>

      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.15] tracking-tight text-black sm:text-5xl md:text-[3.25rem]">
            <RevealLine className="pb-[0.06em]">
              India&apos;s most trusted
            </RevealLine>
            <RevealLine className="pb-[0.06em]">
              panel <span className="font-bold">manufacturer.</span>
            </RevealLine>
          </h1>

          <div className="shrink-0 self-start">
            <RevealLine>
              <Link
                href="/projects"
                className="inline-block bg-[#5b176e] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#461056]"
              >
                View Projects
              </Link>
            </RevealLine>
          </div>
        </div>

        <div className="mt-6 max-w-2xl">
          <RevealLine>
            <p className="text-base leading-relaxed text-black/90 sm:text-lg md:text-xl">
              From PUF and PIR to Rockwool panels, we don&apos;t just manufacture
              insulated panels — we engineer building envelopes that perform for
              decades.
            </p>
          </RevealLine>
        </div>
      </Container>
    </section>
  );
}
