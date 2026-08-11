"use client";

import Image from "next/image";
import Container from "./Container";

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white">
      <Container>

        {/* Main Title */}
        <div className="py-10">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900">
            Why Choose Us?
          </h2>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#9c84a7]" />

        {/* Rows */}
        <div className="divide-y divide-[#9c84a7]">

          {/* ================= ROW 1 ================= */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Title */}
            <div className="lg:col-span-4">
              <h3 className="text-xl sm:text-2xl font-normal text-gray-900 leading-snug">
                40+ years old
                
                credible excellence
              </h3>
            </div>

            {/* Center Description */}
            <div className="lg:col-span-4 flex justify-center">
              <p className="text-sm sm:text-base font-light text-gray-600 leading-relaxed max-w-md">
                From insulated wall and roof panels to specialized cold
                storage applications, Synergy PUF offers a complete range of
                high-performance sandwich panels engineered for every
                industrial, commercial, and infrastructure requirement.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-4 flex justify-end">
              <div className="aspect-[4/3] w-full max-w-xs sm:max-w-sm bg-black relative overflow-hidden shadow-lg group">
                <Image
                  src="/cold_storage.png"
                  alt="40+ years of credible excellence"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

          {/* ================= ROW 2 ================= */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Title */}
            <div className="lg:col-span-4">
              <h3 className="text-xl sm:text-2xl font-normal text-gray-900 leading-snug">
                Pan India Presence
                <br />
                and strong network
              </h3>
            </div>

            {/* Center Description */}
            <div className="lg:col-span-4 flex justify-center">
              <p className="text-sm sm:text-base font-light text-gray-600 leading-relaxed max-w-md">
                From insulated wall and roof panels to specialized cold
                storage applications, Synergy PUF offers a complete range of
                high-performance sandwich panels engineered for every
                industrial, commercial, and infrastructure requirement.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-4 flex justify-end">
              <div className="aspect-[4/3] w-full max-w-xs sm:max-w-sm bg-black relative overflow-hidden shadow-lg group">
                <Image
                  src="/puf_factory.png"
                  alt="Pan India Presence and strong network"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Divider */}
        <div className="h-[1px] w-full bg-[#9c84a7]" />

      </Container>
    </section>
  );
}