"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
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
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <section className="relative z-10 w-full bg-white">
      <Container>
        {/* Main Title — stays outside the stacked panels */}
        <div className="py-10">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900">
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
              data-stack-row
              className="border-b border-[#9c84a7] bg-white py-12"
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
