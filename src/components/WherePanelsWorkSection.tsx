"use client";

import React from "react";
import Link from "next/link";
import Container from "./Container";

const stats = [
  {
    num: "500",
    plus: "+",
    label: "Projects delivered",
    isGold: false,
  },
  {
    num: "12",
    plus: "+",
    label: "States served",
    isGold: false,
  },
  {
    num: "5L",
    plus: "+",
    label: "Sq ft / month capacity",
    isGold: false,
  },
  {
    num: "-35°C",
    plus: "",
    label: "Coldest zone built",
    isGold: true,
  },
];

export default function WherePanelsWorkSection() {
  return (
    <section className="w-full bg-[#20092c] py-16 md:py-24 font-sans text-white border-t border-purple-950/60 select-none">
      <Container>
        {/* Main Heading & Subtitle aligned with Navbar Logo */}
        <div className="max-w-3xl flex flex-col items-start text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white leading-[1.08] tracking-tight mb-6">
            Where our panels <br />
            go to work.
          </h2>

          <p className="text-purple-100/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8">
            A selection of facilities engineered and delivered across India —
            from -35°C blast freezers to large-scale warehouse envelopes with
            zero thermal loss.
          </p>

          {/* Action Buttons Row (ZERO border radius, ZERO shadow) */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#58166e] hover:bg-[#461058] text-white px-6 py-3.5 rounded-none text-sm font-semibold shadow-none transition-all duration-200 active:scale-95"
            >
              Get a quote
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/40 px-6 py-3.5 rounded-none text-sm font-semibold shadow-none transition-all duration-200 active:scale-95"
            >
              Talk to an engineer
            </Link>
          </div>
        </div>

        {/* Bottom Stats Grid (4 Columns, NO border radius, NO grid background square boxes) */}
        <div className="pt-10 border-t border-purple-900/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-start text-left ${idx !== 0 ? "md:border-l md:border-purple-900/40 md:pl-6" : ""
                  }`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                  {item.isGold ? (
                    <span className="text-[#e8b030]">{item.num}</span>
                  ) : (
                    <>
                      <span className="text-white">{item.num}</span>
                      <span className="text-[#e8b030] ml-0.5">{item.plus}</span>
                    </>
                  )}
                </div>
                <span className="text-xs sm:text-sm text-purple-200/80 font-normal leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Footnote Note */}
          <p className="mt-8 text-[11px] font-mono text-purple-300/50">
            Placeholder figures — replace with your confirmed, single set of numbers (see spec).
          </p>
        </div>
      </Container>
    </section>
  );
}
