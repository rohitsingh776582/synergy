"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const previewImages = [
  { src: "/puf_factory.png", alt: "Synergy PUF Factory" },
  { src: "/puf_panel_stack.png", alt: "PUF Panel Stack" },
  { src: "/puf_roof_panel.png", alt: "PUF Roof Panel" },
] as const;

function SidePreviewSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const total = previewImages.length;
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

    for (let i = 1; i <= total; i++) {
      const next = i % total;
      tl.to(
        track,
        {
          x: () => -next * viewport.offsetWidth,
          duration: 0.9,
        },
        "+=2.5"
      );
    }

    const onResize = () => {
      const current = Number(gsap.getProperty(track, "x")) || 0;
      const width = viewport.offsetWidth || 1;
      const index = Math.round(Math.abs(current) / width) % total;
      gsap.set(track, { x: -index * width });
    };
    window.addEventListener("resize", onResize);

    return () => {
      tl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="relative h-36 w-full shrink-0 overflow-hidden  border border-gray-200  sm:h-auto sm:w-36 sm:self-stretch"
    >
      <div ref={trackRef} className="flex h-full will-change-transform">
        {previewImages.map((img) => (
          <div
            key={img.src}
            className="relative h-full w-full min-w-full shrink-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, 150px"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
gsap.registerPlugin(ScrollTrigger);

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => { };
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const watermark = section.querySelector<HTMLElement>(
      '[data-hero-element="watermark"]'
    );

    if (isReducedMotion) {
      if (watermark) gsap.set(watermark, { opacity: 0.32, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const bgImage = section.querySelector('[data-hero-element="bg"]');
      const headingLines = section.querySelectorAll('[data-hero-element="heading"]');
      const cta = section.querySelector('[data-hero-element="cta"]');
      const floatCard = section.querySelector('[data-hero-element="card"]');

      // Initial state setup for smooth reveal on page load
      if (bgImage) {
        gsap.set(bgImage, {
          scale: 1.08,
          y: 25,
          opacity: 0,
          transformOrigin: "center center",
          force3D: true,
        });
      }
      if (watermark) {
        gsap.set(watermark, { opacity: 0, y: -20 });
      }
      if (headingLines.length) {
        gsap.set(headingLines, { y: "100%", opacity: 0, force3D: true });
      }
      if (cta) {
        gsap.set(cta, { y: 40, opacity: 0, force3D: true });
      }
      if (floatCard) {
        gsap.set(floatCard, { y: 50, scale: 0.95, opacity: 0, force3D: true });
      }

      // Page load entrance timeline: triggers automatically on page open
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
          duration: 1.25,
        },
      });

      // 1. Background image settle & reveal
      if (bgImage) {
        tl.to(
          bgImage,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
          },
          0
        );
      }

      // 2. Giant Watermark text reveal
      if (watermark) {
        tl.to(
          watermark,
          {
            opacity: 0.32,
            y: 0,
            duration: 1.2,
          },
          0.1
        );
      }

      // 3. Main heading lines upward reveal ("Engineering Insulation Solutions")
      if (headingLines.length) {
        tl.to(
          headingLines,
          {
            y: "0%",
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: "power4.out",
          },
          0.15
        );
      }

      // 4. CTA button reveal
      if (cta) {
        tl.to(
          cta,
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
          },
          0.45
        );
      }

      // 5. Floating card reveal on bottom-right
      if (floatCard) {
        tl.to(
          floatCard,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          0.35
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="about-hero"
      ref={sectionRef}
      className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[780px] w-full overflow-hidden bg-gray-950 text-white flex flex-col justify-between py-10 md:py-16"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div data-hero-element="bg" className="relative h-full w-full will-change-transform">
          <Image
            src="/hero_futuristic_architecture.png"
            alt="Synergy Futuristic Architecture Building Envelope"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] brightness-[0.82] contrast-[1.05]"
          />
          {/* Subtle dark gradient overlays for cinematic mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
        </div>
      </div>

      {/* Giant Typography Watermark Background */}
      <div
        data-hero-element="watermark"
        className="absolute top-2 left-1/2 z-10 w-full -translate-x-1/2 overflow-hidden text-center select-none pointer-events-none opacity-0"
      >
    
      </div>

      {/* Foreground Content */}
      <Container className="relative z-20 my-auto w-full h-full flex flex-col justify-between pt-12 md:pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">

          {/* Bottom Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 pt-12 md:pt-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-serif leading-[1.1] text-white tracking-tight">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-element="heading" className="block will-change-transform">
                  Engineering
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-hero-element="heading" className="block will-change-transform">
                  Insulation Solutions
                </span>
              </span>
            </h1>

            {/* Vibrant Orange Pill Button */}
            <div className="overflow-hidden pt-2">
              <div data-hero-element="cta" className="will-change-transform">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#58166A] hover:bg-[#461056] text-white px-8 py-4  text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Right Floating Card */}
          <div className="lg:col-span-6 lg:justify-self-end w-full max-w-lg">
            <div
              data-hero-element="card"
              className="will-change-transform relative flex flex-col sm:flex-row items-stretch bg-white/95 backdrop-blur-md  p-6 sm:p-7  border border-white/40 text-gray-900 gap-6"
            >
              {/* Card Text & Tags */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                {/* Category Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide">
                    PUF
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide">
                    PIR
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide">
                    Rockwool
                  </span>
                </div>

                {/* Card Title & Description */}
                <div>
                  <h3 className="text-xl font-serif font-normal text-gray-900 leading-snug">
                    Crafted with Precision
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm font-light leading-relaxed text-gray-600">
                    From PUF and PIR to Rockwool panels, we engineer building envelopes that perform for decades.
                  </p>
                </div>

                {/* Bottom Avatar / Stat Badge */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-purple-700 text-white font-bold text-[10px] flex items-center justify-center">
                      SP
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center">
                      98%
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-800">
                    100+ Projects &amp; Growing
                  </span>
                </div>
              </div>

              {/* Side Floating Preview Image — auto slide */}
              <SidePreviewSlider />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}




