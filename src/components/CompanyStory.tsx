"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, Cpu, Zap, Building2, CheckCircle2 } from "lucide-react";
import Container from "./Container";
import PromoPhotoGrid from "./PromoPhotoGrid";
gsap.registerPlugin(ScrollTrigger);

function splitLines(el: HTMLElement): HTMLElement[] {
  const text = el.innerText || el.textContent || "";
  if (!text.trim()) return [];

  const words = text.trim().split(/\s+/);
  if (!words.length) return [];

  el.innerHTML = "";

  const spans: HTMLSpanElement[] = [];
  words.forEach((word, idx) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.whiteSpace = "pre";
    span.textContent = word + (idx < words.length - 1 ? " " : "");
    el.appendChild(span);
    spans.push(span);
  });

  const linesMap: HTMLSpanElement[][] = [];
  let currentLine: HTMLSpanElement[] = [];
  let currentTop = -1;

  spans.forEach((span) => {
    const top = span.offsetTop;
    if (currentTop === -1 || Math.abs(top - currentTop) > 4) {
      if (currentLine.length) linesMap.push(currentLine);
      currentLine = [span];
      currentTop = top;
    } else {
      currentLine.push(span);
    }
  });
  if (currentLine.length) linesMap.push(currentLine);

  el.innerHTML = "";
  const lineInners: HTMLElement[] = [];

  linesMap.forEach((lineSpans) => {
    const mask = document.createElement("span");
    mask.className = "block overflow-hidden pb-[0.06em]";

    const inner = document.createElement("span");
    inner.className = "block will-change-transform transform-gpu";

    lineSpans.forEach((s) => inner.appendChild(s));
    mask.appendChild(inner);
    el.appendChild(mask);

    lineInners.push(inner);
  });

  return lineInners;
}

/**
 * Character splitter helper for random letter fades and scroll-fill effects.
 */
function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.innerText || el.textContent || "";
  if (!text.trim()) return [];

  const words = text.trim().split(/\s+/);
  el.innerHTML = "";
  const charSpans: HTMLElement[] = [];

  words.forEach((word) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "inline-block whitespace-nowrap mr-[0.28em]";

    word.split("").forEach((char) => {
      const cSpan = document.createElement("span");
      cSpan.className = "inline-block transform-gpu will-change-[opacity,transform]";
      cSpan.textContent = char;
      wordSpan.appendChild(cSpan);
      charSpans.push(cSpan);
    });

    el.appendChild(wordSpan);
  });

  return charSpans;
}

export default function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // 1. Text Line Reveal Animation (data-lines-reveal)
      root.querySelectorAll<HTMLElement>("[data-lines-reveal]").forEach((el) => {
        const lines = splitLines(el);
        if (!lines.length) return;

        const speed = parseFloat(el.dataset.speed || "0.8");
        const stagger = parseFloat(el.dataset.stagger || "0.1");
        const delay = parseFloat(el.dataset.delay || "0");
        const offset = el.dataset.offset || "20";
        const hideOnScroll = el.hasAttribute("data-hide-on-scroll");

        gsap.set(lines, {
          yPercent: 100,
          rotation: 7,
          opacity: 0,
          transformOrigin: "0% 100%",
        });

        ScrollTrigger.create({
          trigger: el,
          start: `top bottom-=${offset}%`,
          onEnter: () => {
            gsap.to(lines, {
              yPercent: 0,
              rotation: 0,
              opacity: 1,
              duration: speed,
              delay,
              stagger,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            if (hideOnScroll) {
              gsap.to(lines, {
                yPercent: 100,
                rotation: 7,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
              });
            }
          },
        });
      });

      // 2. Random Character Fade-In (data-fade-letters)
      root.querySelectorAll<HTMLElement>("[data-fade-letters]").forEach((el) => {
        const chars = splitChars(el);
        if (!chars.length) return;

        const speed = parseFloat(el.dataset.speed || "0.8");
        const offset = el.dataset.offset || "20";

        gsap.set(chars, { opacity: 0, y: 15 });

        ScrollTrigger.create({
          trigger: el,
          start: `top bottom-=${offset}%`,
          onEnter: () => {
            gsap.to(chars, {
              opacity: 1,
              y: 0,
              duration: speed,
              stagger: { amount: 0.6, from: "random" },
              ease: "power2.out",
            });
          },
        });
      });

      // 3. Character Fill-on-Scroll (data-fill-scroll)
      root.querySelectorAll<HTMLElement>("[data-fill-scroll]").forEach((el) => {
        const chars = splitChars(el);
        if (!chars.length) return;

        gsap.set(chars, { opacity: 0.25 });

        gsap.to(chars, {
          opacity: 1,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        });
      });

      // 4. Fade In Animation (data-fade-in)
      root.querySelectorAll<HTMLElement>("[data-fade-in]").forEach((el) => {
        const hasChild = el.hasAttribute("data-child");
        const targets = hasChild
          ? (Array.from(el.children) as HTMLElement[])
          : [el];

        const speed = parseFloat(el.dataset.speed || "0.8");
        const stagger = parseFloat(el.dataset.stagger || "0.15");
        const delay = parseFloat(el.dataset.delay || "0");
        const offset = el.dataset.offset || "20";
        const hideOnScroll = el.hasAttribute("data-hide-on-scroll");

        gsap.set(targets, { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: el,
          start: `top bottom-=${offset}%`,
          onEnter: () => {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: speed,
              delay,
              stagger: hasChild ? stagger : 0,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            if (hideOnScroll) {
              gsap.to(targets, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: "power2.in",
              });
            }
          },
        });
      });

      // 5. Scale Up Animation (data-scale-up)
      root.querySelectorAll<HTMLElement>("[data-scale-up]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.8");
        const delay = parseFloat(el.dataset.delay || "0");
        const offset = el.dataset.offset || "20";
        const hideOnScroll = el.hasAttribute("data-hide-on-scroll");

        gsap.set(el, { scale: 0.85, opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: el,
          start: `top bottom-=${offset}%`,
          onEnter: () => {
            gsap.to(el, {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: speed,
              delay,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            if (hideOnScroll) {
              gsap.to(el, {
                scale: 0.85,
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: "power2.in",
              });
            }
          },
        });
      });

      // 6. Desktop Hover Parallax Lerp (data-hover-image)
      const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      if (!isTouch) {
        root.querySelectorAll<HTMLElement>("[data-hover-image]").forEach((el) => {
          const quickX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const quickY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            quickX(relX * 22);
            quickY(relY * 22);
          };
          const onLeave = () => {
            quickX(0);
            quickY(0);
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
        });
      }

      // 7. Parallax Depth (data-parallax)
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.15");
        gsap.fromTo(
          el,
          { y: -35 * speed },
          {
            y: 35 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* 1. Main Company Narrative & Engineering Heritage Section */}
      <section ref={sectionRef} className="bg-white py-16 md:py-24 overflow-hidden border-t border-gray-100">
        <Container>
          {/* Section Header */}
          <div className="mb-14 max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5b176e]/10 text-[#5b176e] text-xs font-semibold uppercase tracking-wider mb-4"
              data-scale-up
              data-offset="20"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Our Heritage & Innovation</span>
            </div>

            <h2
              className="text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-[44px]"
              data-lines-reveal
              data-offset="20"
              data-speed="0.85"
              data-stagger="0.1"
              data-hide-on-scroll
            >
              Engineered for Precision, Built for Uncompromised Durability.
            </h2>

            <p
              className="mt-5 text-lg font-normal leading-relaxed text-gray-700 md:text-xl"
              data-fill-scroll
            >
              Synergy PUF was established to bridge the critical gap between heavy
              industrial construction and modern energy-efficient insulation standards.
            </p>
          </div>

          {/* Content Layout Grid */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Factory Showcase with Hover Lerp & Parallax */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Main Image Frame */}
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900 transform-gpu"
                  data-scale-up
                  data-hover-image
                  data-offset="20"
                  data-speed="0.9"
                  data-hide-on-scroll
                >
                  <div
                    className="absolute inset-0 h-[118%] w-full -top-[9%]"
                    data-parallax
                    data-speed="0.15"
                  >
                    <Image
                      src="/puf_factory.png"
                      alt="Synergy PUF Continuous Automated Line Factory"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-widest text-purple-300 font-semibold mb-1">
                      Continuous Foaming Facility
                    </p>
                    <p className="text-base font-medium">
                      Pan-India Manufacturing Hub with High-Density PUF Core Foaming
                    </p>
                  </div>
                </div>

                {/* Floating Highlight Card */}
                <div
                  className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 border border-gray-100 max-w-[260px] hidden sm:block"
                  data-scale-up
                  data-delay="0.25"
                  data-offset="20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-[#5b176e] text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">B1 / B2 Fire Safety</p>
                      <p className="text-[11px] text-gray-500">Flame-Retardant Certified</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-snug">
                    High-density polyurethane core ensures minimal thermal transmission.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Narrative & Core Specifications */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div
                className="space-y-4 text-base leading-relaxed text-gray-600 mb-8"
                data-fade-in
                data-child
                data-stagger="0.15"
                data-offset="20"
                data-hide-on-scroll
              >
                <p>
                  From humble beginnings as a specialized industrial supplier, Synergy PUF
                  has evolved into a premier pan-India manufacturer equipped with automated
                  continuous PUF sandwich panel foaming lines.
                </p>
                <p>
                  Our high-density polyurethane core technology guarantees minimum thermal bridge
                  transmission, flame-retardant B1/B2 fire safety ratings, and exceptional
                  structural load capacity required by large-span cold logistics, food processing facilities,
                  and pharmaceutical cleanroom installations.
                </p>
              </div>

              {/* Key Engineering Features Grid */}
              <div
                className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/80"
                data-fade-in
                data-child
                data-stagger="0.1"
                data-delay="0.2"
                data-offset="20"
              >
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#5b176e]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#5b176e]">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-extrabold uppercase tracking-wider">0.022 W/mK</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Thermal Conductivity</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Ultra-low thermal bridge loss</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#5b176e]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#5b176e]">
                    <Cpu className="w-4 h-4" />
                    <span className="text-xs font-extrabold uppercase tracking-wider">100% Automated</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Continuous Production</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Consistent density & bonding</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#5b176e]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#5b176e]">
                    <Award className="w-4 h-4" />
                    <span className="text-xs font-extrabold uppercase tracking-wider">Pan-India</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Project Delivery</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Large-span logistics support</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#5b176e]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5 text-[#5b176e]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-extrabold uppercase tracking-wider">Cleanroom Ready</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">Hygienic Standards</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Pharma & cold store certified</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

    
      {/* 4. Promo Photo Scatter-to-Grid Component */}
      <PromoPhotoGrid />

    
    </div>
  );
}
