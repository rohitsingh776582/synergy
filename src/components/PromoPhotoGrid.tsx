"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  scatterX: string;
  scatterY: string;
  exitX: string;
  exitY: string;
}

const PHOTOS: PhotoItem[] = [
  { id: 1, src: "/puf_factory.png", alt: "Automated Line", scatterX: "-35vw", scatterY: "-25vh", exitX: "-50vw", exitY: "-40vh" },
  { id: 2, src: "/images/puf-panel-exploded.png", alt: "Exploded Panel Core", scatterX: "30vw", scatterY: "-30vh", exitX: "45vw", exitY: "-45vh" },
  { id: 3, src: "/puf_factory.png", alt: "Cold Chain Installation", scatterX: "-40vw", scatterY: "20vh", exitX: "-60vw", exitY: "35vh" },
  { id: 4, src: "/images/puf-panel-exploded.png", alt: "Pharma Cleanroom", scatterX: "35vw", scatterY: "25vh", exitX: "55vw", exitY: "40vh" },
  { id: 5, src: "/puf_factory.png", alt: "Joint Interlock", scatterX: "0vw", scatterY: "-40vh", exitX: "0vw", exitY: "-60vh" },
  { id: 6, src: "/images/puf-panel-exploded.png", alt: "High-Density Foam", scatterX: "-25vw", scatterY: "35vh", exitX: "-40vw", exitY: "50vh" },
  { id: 7, src: "/puf_factory.png", alt: "Roof Panel Ridge", scatterX: "40vw", scatterY: "-15vh", exitX: "60vw", exitY: "-25vh" },
  { id: 8, src: "/images/puf-panel-exploded.png", alt: "Industrial Facade", scatterX: "20vw", scatterY: "40vh", exitX: "30vw", exitY: "60vh" },
];

export default function PromoPhotoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    const grid = gridRef.current;
    if (!root || !grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".promo-card"));
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Set initial scattered positions
      cards.forEach((card) => {
        const sx = card.dataset.sx || "0px";
        const sy = card.dataset.sy || "0px";
        gsap.set(card, {
          x: sx,
          y: sy,
          scale: 0.7,
          opacity: 0,
        });
      });

      // 1. Scatter to Grid Entrance ScrollTrigger
      ScrollTrigger.create({
        trigger: root,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          // Shuffle order array
          const shuffled = [...cards].sort(() => Math.random() - 0.5);
          gsap.to(shuffled, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          cards.forEach((card) => {
            const sx = card.dataset.sx || "0px";
            const sy = card.dataset.sy || "0px";
            gsap.to(card, {
              x: sx,
              y: sy,
              scale: 0.7,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
            });
          });
        },
      });

      // 2. Scroll-linked Scrub Timeline pushing photos to exit positions
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "center 40%",
          end: "bottom top",
          scrub: 1,
        },
      });

      cards.forEach((card) => {
        const ex = card.dataset.ex || "0px";
        const ey = card.dataset.ey || "0px";
        exitTl.to(
          card,
          {
            x: ex,
            y: ey,
            opacity: 0,
            ease: "none",
          },
          0
        );
      });

      // 3. Hover Parallax Lerp
      const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (!isTouch) {
        cards.forEach((card) => {
          const quickX = gsap.quickTo(card, "xPercent", { duration: 0.5, ease: "power3.out" });
          const quickY = gsap.quickTo(card, "yPercent", { duration: 0.5, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            quickX(relX * 12);
            quickY(relY * 12);
          };

          const onLeave = () => {
            quickX(0);
            quickY(0);
          };

          card.addEventListener("mousemove", onMove);
          card.addEventListener("mouseleave", onLeave);
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white text-gray-900 overflow-hidden relative">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5b176e] block mb-2">
            Visual Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Precision Foam Engineering in Action
          </h2>
        </div>

        {/* 8-Photo Grid Container */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative min-h-[480px]"
        >
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              data-sx={photo.scatterX}
              data-sy={photo.scatterY}
              data-ex={photo.exitX}
              data-ey={photo.exitY}
              className="promo-card relative aspect-square overflow-hidden bg-gray-100 transform-gpu"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white">
                {photo.alt}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
