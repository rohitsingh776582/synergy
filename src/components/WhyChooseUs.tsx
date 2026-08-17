"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

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

const rows = [
  {
    title: (
      <>
        40+ years old
        <br />
        credible excellence
      </>
    ),
    description:
      "From insulated wall and roof panels to specialized cold storage applications, Synergy PUF offers a complete range of high-performance sandwich panels engineered for every industrial, commercial, and infrastructure requirement.",
    image: "/cold_storage.png",
    alt: "40+ years of credible excellence",
  },
  {
    title: (
      <>
        Pan India Presence and
        <br />
        strong network
      </>
    ),
    description:
      "From Kashmir to Kanyakumari our distribution and installation network covers every corner of India, backed by regional warehouses and a dedicated project execution team.",
    image: "/puf_factory.png",
    alt: "Pan India Presence and strong network",
  },
  {
    title: (
      <>
        Unmatched Speed & Timely <br />
        Delivery
        <br />
        strong network
      </>
    ),
    description:
      "A 48-hour record on dispatch because a delayed panel means a delayed project. Speed built into every order, from factory floor to site, pan-India.",
    image: "/puf_factory.png",
    alt: "Pan India Presence and strong network",
  },
] as const;

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || isReducedMotion) return;

    const ctx = gsap.context(() => {
      const activeRows = rowRefs.current.filter(Boolean) as HTMLDivElement[];

      if (heading) gsap.set(heading, { opacity: 0, y: 35 });
      if (activeRows.length) gsap.set(activeRows, { opacity: 0, y: 35 });

      let maxProgress = 0;
      const tl = gsap.timeline({ paused: true });

      if (heading) {
        tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "none" }, 0);
      }

      if (activeRows.length) {
        tl.to(
          activeRows,
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1,
            ease: "none",
          },
          0.15
        );
      }

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
  }, [isReducedMotion]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full bg-white">
      <Container>
        {/* Main Title — stays outside the stacked panels */}
        <div className="pb-10 pt-20 sm:pb-10 sm:pt-24">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 leading-[1.15] tracking-[-0.02em] will-change-transform"
          >
            Why Choose Us?
          </h2>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#9c84a7]" />

        {/* Stacked rows — CSS sticky avoids GSAP pin / React DOM conflicts */}
        <div className="relative">
          {rows.map((row, index) => (
            <div
              key={index}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              data-stack-row
              className={`bg-white py-12 will-change-transform ${
                index === rows.length - 1 ? "" : "border-b border-[#9c84a7]"
              }`}
              style={{
                position: isReducedMotion ? "relative" : "sticky",
                top: isReducedMotion
                  ? undefined
                  : "var(--site-header-height, 7rem)",
                zIndex: index + 1,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Title */}
                <div className="lg:col-span-4">
                  <h3 className="text-xl sm:text-2xl font-normal text-gray-900 leading-snug">
                    {row.title}
                  </h3>
                </div>

                {/* Center Description */}
                <div className="lg:col-span-4 flex justify-center">
                  <p className="text-sm sm:text-base font-light text-gray-600 leading-relaxed max-w-md">
                    {row.description}
                  </p>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-4 flex justify-end">
                  <div className="aspect-[4/3] w-full max-w-xs sm:max-w-sm bg-black relative overflow-hidden group">
                    <Image
                      src={row.image}
                      alt={row.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
