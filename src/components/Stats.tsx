"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    title: "Launched Projects",
    target: 75,
    suffix: "+",
    description: (
      <>
        Projects were
        <br />
        launched successful
        <br />
        since 2008.
      </>
    ),
  },
  {
    title: "Client Satisfaction",
    target: 98,
    suffix: "%",
    description: (
      <>
        Percentage of our fully
        <br />
        satisfied clients.
      </>
    ),
  },
] as const;

const numberClass =
  "stat-number text-[42px] leading-none tracking-[-3px] text-black sm:text-[56px] lg:text-[64px]";

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const yearRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const counters = [
      { el: valueRefs.current[0], from: 1, to: 75 },
      { el: valueRefs.current[1], from: 1, to: 98 },
      { el: yearRef.current, from: 2001, to: 2008 },
    ];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center 40%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      counters.forEach(({ el, from, to }) => {
        if (!el) return;
        const obj = { val: from };
        el.textContent = `${from}`;

        tl.to(
          obj,
          {
            val: to,
            ease: "none",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.val)}`;
            },
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mx-auto grid w-full max-w-[1420px] grid-cols-1 gap-10 lg:grid-cols-[32%_68%] lg:gap-0">
          {/* Left decorative area */}
          <div className="flex items-start gap-3 pt-2 text-[#c9c9c9] lg:pt-6">
            <span className="text-2xl leading-none" aria-hidden>
              ✦
            </span>
            <span className="text-2xl leading-none" aria-hidden>
              ✦
            </span>
          </div>

          {/* Right content */}
          <div className="grid grid-cols-1 gap-y-[58px] sm:grid-cols-2 sm:gap-x-[28px]">
            {stats.map((stat, idx) => (
              <div key={stat.title} className="flex flex-col">
                <h3 className="text-base font-normal text-gray-900 sm:text-lg">
                  {stat.title}
                </h3>

                <div className="mt-4 h-[2px] w-full bg-[#c9c9c9]" />

                <div className="mt-6 grid grid-cols-1 items-end gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className={`${numberClass} inline-flex items-start`}>
                    <span
                      ref={(el) => {
                        valueRefs.current[idx] = el;
                      }}
                    >
                      1
                    </span>
                    <span className="ml-0.5 mt-[0.08em] text-[0.38em] leading-none">
                      {stat.suffix}
                    </span>
                  </div>

                  <p className="pb-1 text-sm font-light leading-relaxed text-gray-600 sm:text-base">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Year of Establishment — full width */}
            <div className="flex flex-col sm:col-span-2">
              <h3 className="text-base font-normal text-gray-900 sm:text-lg">
                Year of Establishment
              </h3>

              <div className="mt-4 h-[2px] w-full bg-[#c9c9c9]" />

              <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <p className="text-sm font-light leading-relaxed text-gray-600 sm:text-base">
                  The year the two founders
                  <br />
                  launched a first project:
                  <br />
                  &quot;Sonora&quot; website for IT
                  <br />
                  startup.
                </p>

                <div className="flex flex-col items-start gap-4 sm:items-end">
                  <div className={numberClass}>
                    <span ref={yearRef}>2001</span>
                  </div>

                  <div className="flex items-center -space-x-2">
                    <div className="h-10 w-10 rounded-full border-2 border-white bg-[#d9d9d9]" />
                    <div className="h-10 w-10 rounded-full border-2 border-white bg-[#bdbdbd]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
