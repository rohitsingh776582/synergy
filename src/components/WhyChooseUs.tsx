"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

const rows = [
  {
    title: (
      <>
        40+ years old
        
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
      "From insulated wall and roof panels to specialized cold storage applications, Synergy PUF offers a complete range of high-performance sandwich panels engineered for every industrial, commercial, and infrastructure requirement.",
    image: "/puf_factory.png",
    alt: "Pan India Presence and strong network",
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
      "From insulated wall and roof panels to specialized cold storage applications, Synergy PUF offers a complete range of high-performance sandwich panels engineered for every industrial, commercial, and infrastructure requirement.",
    image: "/puf_factory.png",
    alt: "Pan India Presence and strong network",
  },
] as const;

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (isReducedMotion) return;

    const section = sectionRef.current;
    const stackRows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || stackRows.length < 2) return;

    const getNavOffset = () => {
      const header = document.querySelector("header");
      return header instanceof HTMLElement ? Math.ceil(header.getBoundingClientRect().height) : 0;
    };

    const ctx = gsap.context(() => {
      stackRows.forEach((row, index) => {
        // Last row scrolls normally; earlier rows stay pinned while the next covers them
        if (index === stackRows.length - 1) return;

        ScrollTrigger.create({
          trigger: row,
          start: () => `top ${getNavOffset()}px`,
          endTrigger: stackRows[index + 1],
          end: () => `top ${getNavOffset()}px`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    const images = section.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });

    // Recalculate after layout/fonts settle
    const raf = requestAnimationFrame(refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section ref={sectionRef} className="relative z-10 w-full bg-white">
      <Container>
        {/* Main Title — stays outside the stacked panels */}
        <div className="py-10">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900">
            Why Choose Us?
          </h2>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#9c84a7]" />

        {/* Stacked rows */}
        <div className="relative">
          {rows.map((row, index) => (
            <div
              key={index}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              data-stack-row
              className="relative border-b border-[#9c84a7] bg-white py-12"
              style={{ zIndex: index + 1 }}
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
