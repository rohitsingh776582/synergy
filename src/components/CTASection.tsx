"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Award, Truck, HeartHandshake } from "lucide-react";
import Container from "./Container";

export default function CTASection() {
  return (
    <section className="bg-white py-20 text-gray-900 font-sans">
      <Container>
        
        {/* Top Split Section: Text & Buttons Left, Stacked 3D Panel Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Side-by-Side Action Buttons */}
          <div className="lg:col-span-6 space-y-8">
            <h2 data-lines-reveal className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111111] leading-[1.1]">
              Build your next <br />
              project with <br />
              Synergy PUF.
            </h2>

            {/* Side-by-Side Horizontal Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/quote"
                className="inline-flex items-center justify-between gap-4 bg-[#511663] hover:bg-[#3d0f4b] text-white px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Downloading Synergy PUF Product Catalog PDF...");
                }}
                className="inline-flex items-center justify-between gap-4 bg-[#ad96b6] hover:bg-[#9980a3] text-white px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Download Brochure</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Stacked Metallic Panel Graphic */}
          <div className="lg:col-span-6">
            <div data-scale-up className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-w-xl mx-auto lg:ml-auto">
              <Image
                src="/images/products/roof_panel_hero.png"
                alt="Synergy PUF Stacked Insulated Sandwich Panels"
                fill
                priority
                className="object-contain "
              />
            </div>
          </div>

        </div>

        {/* Bottom Feature Bar: 3 Columns */}
        <div data-stagger className="mt-16 sm:mt-24 pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          
          {/* Feature 1: Multi-Certified */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-gray-800">
              <Award className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h4 className="text-base sm:text-lg font-normal text-gray-900">
              Multi-Certified
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm font-light text-gray-500">
              FM, UL, BIS, ISO & More
            </p>
          </div>

          {/* Feature 2: Pan-India Dispatch */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-gray-800">
              <Truck className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h4 className="text-base sm:text-lg font-normal text-gray-900">
              Pan-India Dispatch
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm font-light text-gray-500">
              Delivered to your <br className="hidden sm:inline" />
              site in 30 days
            </p>
          </div>

          {/* Feature 3: End-to-End Service */}
          <div className="flex flex-col items-center">
            <div className="mb-3 text-gray-800">
              <HeartHandshake className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h4 className="text-base sm:text-lg font-normal text-gray-900">
              End-to-End Service
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm font-light text-gray-500">
              From design to <br className="hidden sm:inline" />
              installation support
            </p>
          </div>

        </div>

      </Container>
    </section>
  );
}
