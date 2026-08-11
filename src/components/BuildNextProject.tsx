"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "./Container";

export default function BuildNextProject() {
  return (
    <section className="w-full bg-[#e8e8e8] py-16 sm:py-24 font-sans">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Headline & Description */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a] leading-[1.15] tracking-tight">
            Build your next <br />
            project with <br />
            Synergy PUF.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
            High-performance insulated panel solutions delivered on time, every time — across India.
          </p>
        </div>

        {/* Right Side: Staggered Image Squares & Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
          
          {/* Left Sub-Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Top Square 1 */}
            <div className="w-full aspect-square bg-black rounded-xs shadow-md overflow-hidden relative group">
              {/* Optional image overlay styling */}
              <div className="absolute inset-0 bg-black" />
            </div>

            {/* Action Buttons Stack */}
            <div className="flex flex-col gap-3 mt-1">
              <Link
                href="/quote"
                className="flex items-center justify-between bg-[#511663] hover:bg-[#3e0f4d] text-white px-5 py-3.5 text-sm font-medium rounded-xs shadow-xs transition-colors"
              >
                <span>Get Instant Quote</span>
                <ArrowRight size={18} />
              </Link>
              <a
                href="#brochure"
                className="flex items-center justify-between bg-[#a48cb5] hover:bg-[#937aa4] text-white px-5 py-3.5 text-sm font-medium rounded-xs shadow-xs transition-colors"
              >
                <span>Download Brochure</span>
                <Download size={18} />
              </a>
            </div>
          </div>

          {/* Right Sub-Column (Shifted Down) */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Spacer top block (matching Square 1 height) */}
            <div className="w-full aspect-square opacity-0 pointer-events-none hidden sm:block" />

            {/* Bottom Square 2 */}
            <div className="w-full aspect-square bg-black rounded-xs shadow-md overflow-hidden relative group">
              {/* Optional image overlay styling */}
              <div className="absolute inset-0 bg-black" />
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
