"use client";

import Link from "next/link";
import Container from "./Container";

export default function Hero() {
  return (
    <section className="bg-white py-24 sm:py-32 md:py-40 text-center font-sans">
      <Container>
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#111111] leading-[1.1] max-w-4xl mx-auto">
          Engineering <br />
          Insulation Solutions
        </h1>

        {/* Action Button: View Products */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-[#511663] hover:bg-[#3e0f4d] text-white px-7 py-3 text-xs sm:text-sm font-light shadow-sm transition-colors"
          >
            View Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
