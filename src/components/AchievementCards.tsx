"use client";

import { useLayoutEffect, useRef } from "react";
import { Trophy, Users, Factory, CalendarDays } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: Trophy,
    target: 10000,
    suffix: "+",
    format: "en-IN" as const,
    label: "Projects Completed",
  },
  {
    icon: Users,
    target: 350,
    suffix: "+",
    format: "en-IN" as const,
    label: "Workforce",
  },
  {
    icon: Factory,
    target: 500000,
    suffix: "+",
    format: "en-IN" as const,
    label: "Lakh Sq Ft Production\nCapacity / Month",
  },
  {
    icon: CalendarDays,
    target: 4,
    suffix: "+",
    format: "en-IN" as const,
    label: "Decades of Trust &\nExperience",
  },
] as const;

function formatNumber(value: number, locale: string) {
  return Math.round(value).toLocaleString(locale);
}

export default function AchievementCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(cards, { x: -80, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 35%",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      // Cards: left se aate hue
      tl.to(
        cards,
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
        },
        0
      );

      // Numbers: 1 se target tak scroll ke saath
      achievements.forEach((item, idx) => {
        const el = valueRefs.current[idx];
        if (!el) return;

        const obj = { val: 1 };
        el.textContent = `1${item.suffix}`;

        tl.to(
          obj,
          {
            val: item.target,
            ease: "none",
            onUpdate: () => {
              el.textContent = `${formatNumber(obj.val, item.format)}${item.suffix}`;
            },
          },
          0
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f5f5f7] py-12 md:py-14"
    >
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map(({ icon: Icon, suffix, label }, idx) => (
            <div
              key={label}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="flex flex-col items-center border border-gray-100 bg-white px-5 py-8 text-center will-change-transform"
            >
              <Icon
                className="h-7 w-7 text-[#5b176e] stroke-[1.5]"
                aria-hidden
              />
              <p className="stat-number mt-4 text-3xl font-bold tracking-tight text-black sm:text-[2rem]">
                <span
                  ref={(el) => {
                    valueRefs.current[idx] = el;
                  }}
                >
                  1{suffix}
                </span>
              </p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500 leading-relaxed whitespace-pre-line">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
