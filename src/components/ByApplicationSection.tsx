"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

const applications = [
  {
    num: "01",
    title: "Cold storage panels",
    description: "Insulation for controlled low-temperature spaces.",
    image: "/cold_storage.png",
    href: "/applications",
  },
  {
    num: "02",
    title: "Cleanroom systems",
    description: "Modular surfaces for controlled environments.",
    image: "/cleanroom_panel.png",
    href: "/applications",
  },
  {
    num: "03",
    title: "Fire insulation",
    description: "Specify a tested fire-rated panel assembly.",
    image: "/Panels/Generating_fire_insulation_image_2K_202608181424.jpeg",
    href: "/applications",
  },
  {
    num: "04",
    title: "Heat insulation",
    description: "Thermal insulation for roofs and walls.",
    image: "/puf_roof_panel.png",
    href: "/applications",
  },
  {
    num: "05",
    title: "Cold room enclosures",
    description: "Complete enclosures for temperature-controlled rooms.",
    image: "/images/products/cold_storage_1786340194998.png",
    href: "/applications",
  },
];

export default function ByApplicationSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 font-sans text-gray-900 border-t border-gray-100 select-none">
      <Container>
        {/* Header Row - Left aligned with Navbar Logo */}
        <div className="flex flex-col items-start text-left mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-gray-900 leading-[1.15] tracking-tight mb-2">
            By application
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Start with what your panel needs to do.
          </p>
        </div>

        {/* Cards Grid (3 columns, ZERO border radius, ZERO shadow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {applications.map((app) => (
            <div
              key={app.num}
              className="bg-white border border-gray-200/90 rounded-none shadow-none flex flex-col overflow-hidden"
            >
              {/* Card Image Box (ZERO border radius) */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-none bg-gray-100">
                <Image
                  src={app.image}
                  alt={app.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover object-center rounded-none transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <span className="block text-base sm:text-lg font-bold text-[#e8b030] tracking-wide mb-1.5">
                    {app.num}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2">
                    {app.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
                    {app.description}
                  </p>
                </div>

                <Link
                  href={app.href}
                  className="self-start text-xs font-bold text-[#58166e] hover:underline"
                >
                  View application
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
