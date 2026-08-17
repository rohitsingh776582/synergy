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

      gsap.set(cards, { opacity: 0, y: 30 });

      let maxProgress = 0;
      const tl = gsap.timeline({ paused: true });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 92%",
        end: "top 55%",
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
  }, []);

  return (
    <section ref={sectionRef} className="w-full border-t border-gray-200/80 bg-[#f7f5f8] py-6 md:py-8">
      <Container>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {features.map(({ icon: Icon, title, subtitle }, index) => (
            <div
              key={title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="flex items-center gap-3.5 bg-[#efe6f4] px-4 py-3.5 md:px-5 md:py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-[#5b176e]">
                <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#2d1b3d]">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs font-light leading-snug text-[#7a6b88]">
                  {title === "Pan-India Dispatch" ? (
                    <>
                      Delivered to your site in{" "}
                      <span className="stat-number font-bold text-black">
                        30 days
                      </span>
                    </>
                  ) : (
                    subtitle
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
