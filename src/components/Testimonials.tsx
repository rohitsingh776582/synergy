"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

const testimonials = [
  {
    quote:
      "Three years since our food processing plant expansion and the clean room panels still look and perform like new. Synergy's team stuck with us through the whole installation,  not just there for the sale, actually there when we needed them.",
    client: "Sunita Patel",
    image: "/cold_storage.png",
  },
  {
    quote:
      "Synergy built our 20,000 sq ft cold storage facility ahead of schedule. Energy bills are down 38% versus our old warehouse, the panels are just holding temperature better than we expected",
    client: "Rajesh Kumar",
    image: "/cleanroom_panel.png",
  },
  {
    quote:
      "We've standardised on Synergy PUF across every pharma warehouse we run, pan-India. BIS certified, consistent, always on time, that's really all we ask for, and they haven't missed yet.",
    client: "Dr. Priya Sharma",
    image: "/puf_factory.png",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    if (isReducedMotion) return;

    const section = sectionRef.current;
    const stage = stageRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !stage || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(stage, { perspective: 1400, transformStyle: "preserve-3d" });

      // Start in front (samne), scroll → move back (peeche)
      gsap.set(cards, {
        z: 160,
        y: 48,
        scale: 1.06,
        opacity: 0.92,
        force3D: true,
        transformOrigin: "center center",
      });

      gsap.to(cards, {
        z: -220,
        y: -36,
        scale: 0.9,
        opacity: 1,
        ease: "none",
        stagger: 0.04,
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative z-0 overflow-hidden bg-[#e9e9ed] py-20 font-sans"
    >
      <Container className="text-center">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-normal uppercase tracking-[0.2em] text-[#5b176e] sm:text-sm">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-normal leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            What Our Clients Are Saying
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-gray-600 sm:text-base md:text-lg">
            Pan-India installations. Zero compromise on quality.
          </p>
        </div>

        <div
          ref={stageRef}
          className="mt-16 grid grid-cols-1 items-stretch gap-14 md:grid-cols-3 md:gap-8 lg:gap-10 text-left"
          style={{ perspective: 1400 }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative flex h-full w-full flex-col pt-12 will-change-transform"
              style={{
                zIndex: testimonials.length - idx,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute left-1/2 top-0 z-10 h-[96px] w-[96px] -translate-x-1/2 overflow-hidden rounded-full border-2 border-white/25 shadow-xl lg:h-[108px] lg:w-[108px]">
                <Image
                  src={item.image}
                  alt={item.client}
                  fill
                  sizes="108px"
                  className="object-cover grayscale"
                />
              </div>

              <div className="relative flex h-full min-h-[280px] w-full flex-1 flex-col rounded-[22px] bg-[rgba(28,28,28,0.88)] px-6 pb-7 pt-16 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-md sm:min-h-[300px] sm:px-8 sm:pt-[4.5rem]">
                <div className="relative z-[1] flex h-full flex-1 flex-col">
                  <p className="text-[13px] font-light leading-relaxed text-white/90 sm:text-sm">
                    {item.quote}
                  </p>

                  <div className="mt-4 flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="mt-auto pt-5 text-right text-[13px] font-light leading-relaxed text-white/90 sm:text-sm">
                    — {item.client}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
