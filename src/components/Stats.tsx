"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    targetVal: 500,
    suffix: "+",
    label: "PROJECTS\nCOMPLETED",
    offset: false,
  },
  {
    targetVal: 98,
    suffix: "%",
    label: "CLIENT\nRETENTION\nRATE",
    offset: true,
  },
  {
    targetVal: 12,
    suffix: "+",
    label: "YEARS\nOF\nTRUST",
    offset: false,
  },
  {
    targetVal: 28,
    suffix: "+",
    label: "STATES\nSERVED",
    offset: true,
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalCards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (totalCards.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Function to attach counter animations to a timeline (fast count-up)
      const attachCounters = (tl: gsap.core.Timeline) => {
        totalCards.forEach((_, idx) => {
          const stat = stats[idx];
          const valEl = valueRefs.current[idx];
          if (!stat || !valEl) return;

          const counterObj = { val: 0 };

          tl.to(
            counterObj,
            {
              val: stat.targetVal,
              duration: 0.35,
              ease: "power2.out",
              onUpdate: () => {
                if (valEl) {
                  valEl.textContent = `${Math.floor(counterObj.val)}${stat.suffix}`;
                }
              },
            },
            0
          );
        });
      };

      // Desktop animation setup
      mm.add("(min-width: 768px)", () => {
        const row1 = totalCards.length >= 8 ? totalCards.slice(0, 4) : totalCards;
        const row2 = totalCards.length >= 8 ? totalCards.slice(4, 8) : [];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 25%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Row 1: animate from RIGHT (+120px) to normal position (0px)
        if (row1.length > 0) {
          tl.fromTo(
            row1,
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.12, ease: "power2.out" },
            0
          );
        }

        // Row 2: animate from LEFT (-120px) to normal position (0px)
        if (row2.length > 0) {
          tl.fromTo(
            row2,
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.12, ease: "power2.out" },
            0
          );
        }

        // Synchronize numbers counter with scroll timeline
        attachCounters(tl);
      });

      // Mobile animation setup
      mm.add("(max-width: 767px)", () => {
        const half = Math.ceil(totalCards.length / 2);
        const row1 = totalCards.slice(0, half);
        const row2 = totalCards.slice(half);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        if (row1.length > 0) {
          tl.fromTo(
            row1,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1, ease: "power2.out" },
            0
          );
        }

        if (row2.length > 0) {
          tl.fromTo(
            row2,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1, ease: "power2.out" },
            0
          );
        }

        attachCounters(tl);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full py-16 sm:py-24 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 items-start pb-12 md:pb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className={`aspect-square bg-[#e6e6e8] p-6 flex flex-col justify-center items-center text-center ${
                stat.offset ? "md:translate-y-12" : "md:translate-y-0"
              }`}
            >
              <div
                ref={(el) => {
                  valueRefs.current[idx] = el;
                }}
                className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 tracking-wide mb-3"
              >
                0{stat.suffix}
              </div>
              <div className="text-[11px] sm:text-xs font-normal uppercase tracking-[0.15em] text-gray-600 leading-snug whitespace-pre-line max-w-[130px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}


