"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
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

    const items = section.querySelectorAll<HTMLElement>("[data-about-hero]");
    if (!items.length) return;

    if (isReducedMotion) {
      gsap.set(items, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
        }
      );
    }, sectionRef);

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
          <h1
            data-about-hero
            className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-black opacity-0 sm:text-5xl md:text-[3.25rem]"
          >
            India&apos;s most trusted
            <br />
            panel manufacturer.
          </h1>
          <Link
            data-about-hero
            href="/projects"
            className="shrink-0 self-start bg-[#5b176e] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white opacity-0 transition-colors hover:bg-[#461056]"
          >
            View Projects
          </Link>
        </div>
        <p
          data-about-hero
          className="mt-6 max-w-2xl text-base leading-relaxed text-black/90 opacity-0 sm:text-lg md:text-xl"
        >
          From PUF and PIR to Rockwool panels, we don&apos;t just manufacture
          insulated panels — we engineer building envelopes that perform for
          decades.
        </p>
      </Container>
    </section>
  );
}
