"use client";

import { useLayoutEffect, useRef } from "react";
import { Truck, Award, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Truck,
    title: "Pan-India Dispatch",
    subtitle: "Delivered to your site in 30 days",
  },
  {
    icon: Award,
    title: "Multi-Certified",
    subtitle: "FM, UL, BIS, ISO & more",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Service",
    subtitle: "From design to installation support",
  },
] as const;

export default function FeatureHighlightCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      // Initial state: Each box starts collapsed horizontally at its own position
      gsap.set(cards, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });

      // Timeline: Slower, ultra-smooth expansion to full width
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.to(cards, {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        stagger: 0.22,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full border-t border-gray-200/80 bg-[#f7f5f8] py-6 md:py-8 shadow-none overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {features.map(({ icon: Icon, title, subtitle }, index) => (
            <div
              key={title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="flex items-center gap-3.5 bg-[#efe6f4] px-4 py-3.5 md:px-5 md:py-4 rounded-none shadow-none transform-gpu"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#5b176e] rounded-none shadow-none">
                <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-normal text-[#2d1b3d]">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm font-light leading-relaxed text-[#7a6b88]">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
