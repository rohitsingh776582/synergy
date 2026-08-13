"use client";

import React from "react";
import Link from "next/link";
import Container from "./Container";
import { ProductItem } from "./ProductsHero";

interface ProductSeriesSpecificationsProps {
  currentProduct: ProductItem;
}

export default function ProductSeriesSpecifications({
  currentProduct,
}: ProductSeriesSpecificationsProps) {
  return (
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
  );
}
