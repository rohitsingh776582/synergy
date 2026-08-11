"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Award, Truck, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import SynergyHeroComponent from "@/components/SynergyHeroComponent";
import Container from "@/components/Container";

// Product data for tabs & slider
const categoryTabs = [
  { id: "puf", label: "PUF Panels" },
  { id: "pir", label: "PIR Panels" },
  { id: "specialty", label: "Specialty Panels" },
];

const panelProducts: Record<string, Array<{ id: string; name: string; image: string; series: string; types: string; thickness: string; density: string; facing: string }>> = {
  puf: [
    {
      id: "01",
      name: "Single Skin Roof Panel",
      image: "/images/products/roof_panel_hero.png",
      series: "PUF Series",
      types: "PUF Wall / Roof",
      thickness: "50–200mm",
      density: "40 kg/m³",
      facing: "Pre-painted steel sheet",
    },
    {
      id: "02",
      name: "Double Skin Wall Panel",
      image: "/images/products/wall_panel_hero.png",
      series: "PUF Series",
      types: "Tongue & Groove Wall",
      thickness: "30–150mm",
      density: "40 kg/m³",
      facing: "PPGI / Stainless Steel",
    },
    {
      id: "03",
      name: "Cold Storage Insulation Panel",
      image: "/cold_storage.png",
      series: "PUF Series",
      types: "Cam-lock Interlocking",
      thickness: "80–200mm",
      density: "42 kg/m³",
      facing: "Pre-painted Galvanized Steel",
    },
  ],
  pir: [
    {
      id: "01",
      name: "PIR Fire-Rated Wall Panel",
      image: "/puf_panel_stack.png",
      series: "PIR Series",
      types: "Fire-Resistant PIR",
      thickness: "50–150mm",
      density: "45 kg/m³",
      facing: "High Durability Steel",
    },
    {
      id: "02",
      name: "PIR High Thermal Roof Panel",
      image: "/puf_roof_panel.png",
      series: "PIR Series",
      types: "Ribbed Roof Profile",
      thickness: "60–200mm",
      density: "45 kg/m³",
      facing: "Alu-Zinc Coated Sheet",
    },
  ],
  specialty: [
    {
      id: "01",
      name: "Cleanroom Modular Panel",
      image: "/cleanroom_panel.png",
      series: "Specialty Series",
      types: "Hygienic Sealed Joint",
      thickness: "50–100mm",
      density: "40 kg/m³",
      facing: "Anti-Bacterial Coated Steel",
    },
    {
      id: "02",
      name: "Acoustic Insulation Panel",
      image: "/puf_factory.png",
      series: "Specialty Series",
      types: "Perforated Soundproof",
      thickness: "80–150mm",
      density: "48 kg/m³",
      facing: "Perforated Steel & Mesh",
    },
  ],
};

const StackedDiamondIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white mb-4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 8L38 15L24 22L10 15L24 8Z" />
    <path d="M10 22.5L24 29.5L38 22.5" />
    <path d="M10 30L24 37L38 30" />
  </svg>
);

const jointProfiles = [
  { id: "roof-joint", title: "Roof Joint", col: "sm:col-start-1", row: "sm:row-start-1" },
  { id: "hidden-tongue", title: "Hidden Tongue\n& Groove", col: "sm:col-start-2", row: "sm:row-start-2" },
  { id: "single-tongue", title: "Single Tongue\n& Groove", col: "sm:col-start-3", row: "sm:row-start-1" },
  { id: "m-section", title: "M-Section", col: "sm:col-start-4", row: "sm:row-start-2" },
  { id: "double-tongue", title: "Double Tongue\n& Groove", col: "sm:col-start-5", row: "sm:row-start-1" },
];

const manufacturingSteps = [
  {
    title: "Hi-Tech Automated Facility",
    description: "Precision roll forming, high pressure PU injection for uniform density and superior insulation.",
  },
  {
    title: "Steel Treatment & Coating",
    description: "Corrosion-resistant pre-coated steel sheets for long-lasting exterior and interior durability.",
  },
  {
    title: "Advanced Powder Coating",
    description: "High grade powders applied for smooth finish, vibrant colors and superior weather resistance.",
  },
  {
    title: "Stringent Quality Control",
    description: "Continuous quality checks during manufacturing ensure zero defects and exact tolerance compliance.",
  },
  {
    title: "Panel Compatibility & Precision",
    description: "Automated cutting, precise edge profiles, and seamless fitting for easy on-site installation.",
  },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("puf");
  const [activeSlide, setActiveSlide] = useState(0);

  const currentProducts = panelProducts[activeTab] || panelProducts.puf;
  const currentProduct = currentProducts[activeSlide % currentProducts.length];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveSlide(0);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % currentProducts.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + currentProducts.length) % currentProducts.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-[#5b176e] selection:text-white">
      {/* Top Header & Navigation */}

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-12 pb-16 text-center">
          <Container>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.15]">
              Insulated panel systems <br className="hidden sm:inline" />
              engineered to perform.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
              PUF – fit and crafted for all roofings and walling – premium quality, custom configurations.
            </p>
          </Container>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#5b176e] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200/60"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Product Carousel Showcase */}
          <div className="mt-12 relative max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-4 sm:gap-8 overflow-hidden py-4">
              
              {/* Left Preview Card */}
              <div 
                onClick={handlePrevSlide}
                className="hidden md:block w-48 lg:w-64 h-64 shrink-0 bg-black overflow-hidden relative cursor-pointer opacity-40 hover:opacity-70 transition-opacity transform scale-90 border border-gray-800 shadow-lg"
              >
                <Image
                  src={currentProducts[(activeSlide - 1 + currentProducts.length) % currentProducts.length].image}
                  alt="Previous panel"
                  fill
                  className="object-cover opacity-80"
                />
              </div>

              {/* Main Active Card */}
              <div className="w-full max-w-md sm:max-w-xl bg-white p-4 sm:p-6 shadow-2xl border border-gray-200 flex flex-col items-center text-center relative group">
                
                {/* Slide Number */}
                <div className="absolute top-6 left-6 text-2xl font-bold text-gray-400 font-mono tracking-tighter">
                  {currentProduct.id}
                </div>

                {/* Left/Right Navigation Arrows */}
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#5b176e] hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  aria-label="Next Slide"
                  className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#5b176e] hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Product Image Frame */}
                <div className="w-full h-56 sm:h-72 bg-black overflow-hidden relative shadow-inner">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    priority
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Title */}
                <h3 className="mt-6 text-xl sm:text-2xl font-normal text-gray-900">
                  {currentProduct.name}
                </h3>

                {/* Pagination Indicators */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {currentProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-3 transition-all duration-300 ${
                        idx === activeSlide ? "w-8 bg-[#5b176e]" : "w-3 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center bg-[#5b176e] px-7 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#461056] transition-all"
                  >
                    Get A Quote
                  </Link>
                </div>
              </div>

              {/* Right Preview Card */}
              <div 
                onClick={handleNextSlide}
                className="hidden md:block w-48 lg:w-64 h-64 shrink-0 bg-black overflow-hidden relative cursor-pointer opacity-40 hover:opacity-70 transition-opacity transform scale-90 border border-gray-800 shadow-lg"
              >
                <Image
                  src={currentProducts[(activeSlide + 1) % currentProducts.length].image}
                  alt="Next panel"
                  fill
                  className="object-cover opacity-80"
                />
              </div>

            </div>
          </div>
        </section>


        {/* PRODUCT SERIES SPECIFICATIONS */}
        <section className="py-16 bg-white border-t border-gray-100">
          <Container className="text-center">
            
            {/* Section Badge with horizontal lines */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-[1.5px] w-12 sm:w-20 bg-gray-300" />
              <span className="border border-purple-200 bg-purple-50/60 px-5 py-1.5 text-xs sm:text-sm font-bold text-[#5b176e] uppercase tracking-wider">
                {currentProduct.series}
              </span>
              <span className="h-[1.5px] w-12 sm:w-20 bg-gray-300" />
            </div>

            <p className="text-base sm:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Top-tier polyurethane insulation delivering high performance thermal insulation for commercial, industrial and agricultural environments.
            </p>

            {/* Specifications Cards Layout */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left max-w-3xl mx-auto">
              
              {/* Box 1: Types */}
              <div className="bg-[#f2f2f4] p-5 border border-gray-200/80 shadow-sm flex flex-col justify-center">
                <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Types</span>
                <span className="mt-1 text-lg sm:text-xl font-bold text-gray-900">{currentProduct.types}</span>
              </div>

              {/* Box 2: Thickness */}
              <div className="bg-[#f2f2f4] p-5 border border-gray-200/80 shadow-sm flex flex-col justify-center">
                <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Thickness</span>
                <span className="mt-1 text-lg sm:text-xl font-bold text-gray-900">{currentProduct.thickness}</span>
              </div>

              {/* Center Custom Button Span */}
              <div className="sm:col-span-2 flex justify-center my-1">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#5b176e] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#461056] transition-colors text-center"
                >
                  Building something custom?
                </Link>
              </div>

              {/* Box 3: Core Density */}
              <div className="bg-[#f2f2f4] p-5 border border-gray-200/80 shadow-sm flex flex-col justify-center">
                <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Core Density</span>
                <span className="mt-1 text-lg sm:text-xl font-bold text-gray-900">{currentProduct.density}</span>
              </div>

              {/* Box 4: Facing */}
              <div className="bg-[#f2f2f4] p-5 border border-gray-200/80 shadow-sm flex flex-col justify-center">
                <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Facing</span>
                <span className="mt-1 text-lg sm:text-xl font-bold text-gray-900">{currentProduct.facing}</span>
              </div>

            </div>
          </Container>
        </section>


        {/* AVAILABLE PANEL JOINTS SECTION */}
        <section className="py-20 bg-[#e6e6e8]">
          <Container className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 tracking-tight">
              Available Panel Joints.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Innovative joinery for seamless connections, structural integrity and ease of installation.
            </p>

            {/* Staggered 5-Box Interlocking Grid */}
            <div className="mt-14 max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 max-w-4xl mx-auto">
                {jointProfiles.map((joint) => (
                  <div
                    key={joint.id}
                    className={`${joint.col} ${joint.row} bg-black aspect-square p-4 sm:p-6 flex flex-col items-center justify-center text-center border border-black shadow-md transition-transform duration-300 hover:z-10 hover:scale-105`}
                  >
                    <StackedDiamondIcon />
                    <h3 className="text-xs sm:text-sm md:text-base font-normal text-white leading-snug whitespace-pre-line">
                      {joint.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>


        {/* MANUFACTURING THAT DELIVERS SECTION */}
        <section className="py-20 bg-white">
          <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Heading & Paragraph */}
            <div className="lg:col-span-5 pt-4">
              <h2 className="text-3xl sm:text-5xl font-normal text-gray-900 tracking-tight leading-tight">
                Manufacturing <br />
                that delivers.
              </h2>
              <p className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                From high-volume runs to custom, project-tailored solutions, our facilities combine modern machinery, precise process control, and rigorous testing for high quality results.
              </p>
            </div>

            {/* Right Column: Vertical Timeline */}
            <div className="lg:col-span-7">
              <div className="relative border-l-2 border-[#5b176e] pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-10">
                {manufacturingSteps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Purple Node Bullet */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 bg-[#5b176e] ring-4 ring-white" />
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#5b176e] transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </Container>
        </section>


        {/* BUILD YOUR NEXT PROJECT CTA SECTION */}
        <SynergyHeroComponent />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
