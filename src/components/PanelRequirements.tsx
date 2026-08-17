"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

type PanelType = "roof" | "wall";

const panelCards: Record<
  PanelType,
  {
    slug: string;
    name: string;
    category: string;
    shortDescription: string;
    image: string;
  }[]
> = {
  roof: [
    {
      slug: "puf-roof-panels",
      name: "Insulated PUF Roofing Panels",
      category: "Roofing Panels",
      shortDescription:
        "Trapezoidal metallic roofing panels with continuous PUF foam core for leak-proof weather protection.",
      image: "/images/products/roof_panel_hero.png",
    },
    {
      slug: "puf-roof-panels",
      name: "Industrial Roof Sandwich Panels",
      category: "Roofing Panels",
      shortDescription:
        "High load-bearing roof panels engineered for warehouses, factories, and large-span commercial structures.",
      image: "/images/products/puf_roof_panel.png",
    },
    {
      slug: "puf-roof-panels",
      name: "Weather-Tight Roof Systems",
      category: "Roofing Panels",
      shortDescription:
        "Overlapping rib joint roof panels that drain rainwater efficiently while cutting HVAC energy costs.",
      image: "/images/products/puf_roof_panel_1786340661690.png",
    },
  ],
  wall: [
    {
      slug: "puf-wall-panels",
      name: "PUF Wall Panels",
      category: "Wall Panels",
      shortDescription:
        "High-density polyurethane insulated wall panels with tongue-and-groove joint design for optimal thermal performance.",
      image: "/images/products/wall_panel_hero.png",
    },
    {
      slug: "puf-wall-panels",
      name: "Modular Wall Enclosures",
      category: "Wall Panels",
      shortDescription:
        "Precision-engineered sandwich wall panels for industrial factories, cleanrooms, and commercial cladding.",
      image: "/images/products/puf_panel_stack_1786340168248.png",
    },
    {
      slug: "puf-wall-panels",
      name: "Insulated Exterior Walls",
      category: "Wall Panels",
      shortDescription:
        "Pre-finished wall panels with superior insulation, fast interlocking assembly, and lasting durability.",
      image: "/images/products/cleanroom_panel.png",
    },
  ],
};

export default function PanelRequirements() {
  const [activePanel, setActivePanel] = useState<PanelType>("roof");
  const cards = panelCards[activePanel];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      const headerElements = header.children;
      const gridElements = grid.children;

      gsap.set([headerElements, gridElements], { opacity: 0, y: 35 });

      let maxProgress = 0;
      const tl = gsap.timeline({ paused: true });

      tl.to(
        headerElements,
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "none",
        },
        0
      );

      tl.to(
        gridElements,
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "none",
        },
        0.15
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        end: "top 45%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > maxProgress) {
            maxProgress = self.progress;
            tl.progress(maxProgress);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [activePanel]);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <Container>
        {/* =========================
            HEADER
        ========================== */}
        <div className="pt-16">
          <div ref={headerRef} className="max-w-[680px]">
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
        </div>

        {/* =========================
            PRODUCT CARDS — always 3
        ========================== */}
        <div
          ref={gridRef}
          key={activePanel}
          className="
            mt-10
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {cards.map((item, idx) => (
            <div
              key={`${activePanel}-${idx}`}
              className="
                group
                overflow-hidden
                bg-white
                border
                border-gray-200
                transition-all
                duration-300
                flex
                flex-col
                justify-between
              "
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
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

              {/* PRODUCT CONTENT */}
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
            PANEL TYPE BUTTONS
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
          <button
            type="button"
            onClick={() => setActivePanel("roof")}
            className={`
              px-8
              py-3.5
              text-base
              font-light
              transition-all
              duration-300
              ${
                activePanel === "roof"
                  ? "bg-[#5b176e] text-white hover:bg-[#461056]"
                  : "border border-gray-400 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            Roof Panels
          </button>

          <button
            type="button"
            onClick={() => setActivePanel("wall")}
            className={`
              px-8
              py-3.5
              text-base
              font-light
              transition-all
              duration-300
              ${
                activePanel === "wall"
                  ? "bg-[#5b176e] text-white hover:bg-[#461056]"
                  : "border border-gray-400 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            Wall Panels
          </button>
        </div>
      </Container>
    </section>
  );
}
