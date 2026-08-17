"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

type PanelType = "roof" | "wall";

interface CardItem {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  image?: string;
  isTextOnly?: boolean;
}

const panelCards: Record<PanelType, CardItem[]> = {
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
      isTextOnly: true,
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
      isTextOnly: true,
    },
  ],
};

export default function PanelRequirements() {
  const [activePanel, setActivePanel] = useState<PanelType>("roof");
  const cards = panelCards[activePanel];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    if (!section || !header || !track) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      const slideTween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      const handleMouseEnter = () => slideTween.pause();
      const handleMouseLeave = () => slideTween.play();

      track.addEventListener("mouseenter", handleMouseEnter);
      track.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        track.removeEventListener("mouseenter", handleMouseEnter);
        track.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, section);

    return () => ctx.revert();
  }, [activePanel]);

  const displayCards = [...cards, ...cards];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white overflow-hidden py-16"
    >
      <Container>
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
      </Container>

      <div className="mt-12 w-full overflow-hidden">
        <div
          ref={trackRef}
          key={activePanel}
          className="flex gap-8 w-max will-change-transform px-4"
        >
          {displayCards.map((item, idx) => (
            <div
              key={`${activePanel}-${idx}`}
              className="
                group
                w-[320px]
                sm:w-[420px]
                md:w-[480px]
                flex-shrink-0
                overflow-hidden
                bg-white
                border
                border-gray-200
                transition-all
                duration-300
                flex
                flex-col
                justify-between
                shadow-sm
                hover:shadow-md
              "
            >
              {item.isTextOnly ? (
                <div
                  className="
                    relative
                    aspect-[16/10]
                    w-full
                    bg-gradient-to-br
                    from-[#461056]
                    via-[#5b176e]
                    to-[#7b3f8f]
                    p-6
                    sm:p-8
                    flex
                    flex-col
                    justify-center
                    items-center
                    text-center
                    overflow-hidden
                  "
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 backdrop-blur-sm">
                    <Layers className="w-5 h-5 text-purple-200" />
                  </div>

                  <span className="text-xs uppercase tracking-[2px] text-purple-200 font-light mb-2">
                    {item.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-normal text-white leading-tight">
                    {item.name}
                  </h3>
                </div>
              ) : (
                <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="
                        object-cover
                        opacity-90
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  )}
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <span className="text-xs font-light uppercase tracking-[1.5px] text-[#7b3f8f]">
                    {item.category}
                  </span>

                  <h3 className="mt-2 text-xl font-normal text-[#111827] transition-colors group-hover:text-[#5b176e]">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
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
      </div>

      <Container>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
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
