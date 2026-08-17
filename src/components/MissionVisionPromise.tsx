"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Target, Eye, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Our Mission",
    icon: Target,
    body: "To engineer energy-efficient PUF insulation systems that help businesses reduce thermal loss, lower carbon footprint, and cut operational energy costs across India.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    body: "To be the most trusted name in thermal insulation and modular panel engineering, built on zero-defect manufacturing and dispatch you can set a schedule around.",
  },
  {
    title: "Our Promise",
    icon: Award,
    body: "To deliver consistent quality, on-time delivery, and engineering support on every project, insulated, efficient, built to last.",
  },
] as const;

export default function MissionVisionPromise() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(cards, { opacity: 0, y: 35 });

      let maxProgress = 0;
      const tl = gsap.timeline({ paused: true });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1,
        ease: "none",
      });

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
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f4f4f7] py-14 md:py-16">
      <Container>
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
          style={{ perspective: "900px" }}
        >
          {items.map(({ title, icon: Icon, body }, index) => {
            const isActive = hovered === index;
            const isDimmed = hovered !== null && !isActive;

            return (
              <div
                key={title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`relative border border-gray-200 bg-white p-6 transition-[transform,box-shadow] duration-300 ease-out will-change-transform ${
                  isActive ? "z-20 shadow-md" : "z-0 shadow-none"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isActive
                    ? "translateZ(24px) scale(1.03)"
                    : isDimmed
                      ? "translateZ(-36px) scale(0.96)"
                      : "translateZ(0) scale(1)",
                }}
              >
                <div className="mb-4 inline-flex bg-purple-100 p-2.5 text-[#5b176e]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
