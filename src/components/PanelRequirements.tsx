"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Container from "./Container";

export default function PanelRequirements() {
  const [activeTab, setActiveTab] =
    useState<"PUF Panels" | "Other Panels">("PUF Panels");

  const displayPanels =
    activeTab === "PUF Panels"
      ? products.slice(0, 3)
      : products.slice(2, 5);

  return (
    <section className="w-full bg-white">
      <Container>

        {/* =========================
            HEADER
        ========================== */}
        <div className="pt-16">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* LEFT CONTENT */}
            <div className="max-w-[680px]">

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-normal
                  text-[#111827]
                  leading-[1.15]
                  tracking-[-0.02em]
                "
              >
                One partner for every panel
                <br />
                requirement.
              </h2>

              <p
                className="
                  mt-6
                  max-w-[650px]
                  text-sm
                  sm:text-base
                  font-light
                  text-[#64748b]
                  leading-[1.9]
                "
              >
                From cold rooms to clean rooms, warehouse roofing to modular
                cabins, Synergy PUF delivers high-performance insulation
                tailored to your exact specifications.
              </p>

            </div>

            {/* =========================
                CATEGORY TABS
            ========================== */}
            <div
              className="
                flex
                items-center
                gap-2
                p-1.5
                bg-white
                border
                border-gray-200
                shadow-sm
                shrink-0
              "
            >

              <button
                type="button"
                onClick={() => setActiveTab("PUF Panels")}
                className={`
                  px-7
                  py-3
                  text-sm
                  whitespace-nowrap
                  transition-all
                  ${
                    activeTab === "PUF Panels"
                      ? "bg-[#5b176e] text-white shadow-md font-normal"
                      : "text-gray-600 font-light hover:text-gray-900"
                  }
                `}
              >
                PUF Panels
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Other Panels")}
                className={`
                  px-7
                  py-3
                  text-sm
                  whitespace-nowrap
                  transition-all
                  ${
                    activeTab === "Other Panels"
                      ? "bg-[#5b176e] text-white shadow-md font-normal"
                      : "text-gray-600 font-light hover:text-gray-900"
                  }
                `}
              >
                Other Panels
              </button>

            </div>
          </div>
        </div>

        {/* =========================
            DIVIDER
        ========================== */}
        <div className="mt-10 h-[1px] w-full bg-[#9c84a7]" />

        {/* =========================
            PRODUCT CARDS
        ========================== */}
        <div
          className="
            mt-12
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {displayPanels.map((item, idx) => (
            <div
              key={`${item.slug}-${idx}`}
              className="
                group
                overflow-hidden
                bg-white
                border
                border-gray-200
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                flex
                flex-col
                justify-between
              "
            >

              {/* =========================
                  IMAGE
              ========================== */}
              <div
                className="
                  relative
                  aspect-[16/10]
                  w-full
                  bg-gray-100
                  overflow-hidden
                "
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw
                  "
                  className="
                    object-cover
                    opacity-90
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* =========================
                  PRODUCT CONTENT
              ========================== */}
              <div className="flex flex-1 flex-col justify-between">

                <div className="p-6">

                  <span
                    className="
                      text-xs
                      font-light
                      uppercase
                      tracking-[1.5px]
                      text-[#7b3f8f]
                    "
                  >
                    {item.category}
                  </span>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-normal
                      text-[#111827]
                      transition-colors
                      group-hover:text-[#5b176e]
                    "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-light
                      text-[#64748b]
                      leading-relaxed
                      line-clamp-3
                    "
                  >
                    {item.shortDescription}
                  </p>

                </div>

                {/* =========================
                    EXPLORE PRODUCT
                ========================== */}
                <div className="px-6 pb-6">

                  <Link
                    href={`/products/${item.slug}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-light
                      text-[#5b176e]
                      transition-colors
                      hover:text-[#461056]
                    "
                  >
                    <span>Explore Product</span>

                    <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* =========================
            CTA BUTTONS
        ========================== */}
        <div
          className="
            mt-12
            pb-16
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-4
          "
        >

          <Link
            href="/quote"
            className="
              bg-[#5b176e]
              px-8
              py-3.5
              text-base
              font-light
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-[#461056]
            "
          >
            Get Quote
          </Link>

          <Link
            href="/products"
            className="
              border
              border-gray-400
              px-6
              py-3.5
              text-base
              font-light
              text-gray-800
              transition-all
              hover:bg-gray-200
            "
          >
            Explore All Products
          </Link>

        </div>

      </Container>
    </section>
  );
}