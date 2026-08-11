"use client";

import Image from "next/image";
import Container from "./Container";

export default function IndustryShowcase() {
  return (
    <section className="bg-white py-20 font-sans">
      <Container className="text-center">
        <h2 className="text-3xl md:text-5xl font-normal text-gray-900 tracking-tight">
          Insulation for <br className="hidden sm:inline" />
          every industry.
        </h2>

        {/* Large Image Frame */}
        <div className="mt-12 mx-auto max-w-3xl overflow-hidden">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/cold_storage.png"
              alt="Insulation for every industry showcase"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Caption text banner below */}
        <p className="mt-8 mx-auto max-w-3xl text-sm md:text-base font-light text-gray-600 leading-relaxed">
          From food processing and pharmaceuticals to commercial construction and logistics, our PUF panels are engineered to maintain stringent temperature controls and structural durability across all sector applications.
        </p>
      </Container>
    </section>
  );
}
