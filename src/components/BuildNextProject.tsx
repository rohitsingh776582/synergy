"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";

gsap.registerPlugin(ScrollTrigger);

const badges = ["BIS certified", "FM approved", "ISO 9001"] as const;

const stats = [
  { target: 500, suffix: "+", label: "Panels installed" },
  { target: 30, suffix: " days", label: "Avg. delivery" },
  { target: 12, suffix: "+", label: "States served" },
] as const;

const BUILD_PROJECT_LINES = [
  ["Build", "your", "next"],
  ["project", "with"],
  ["Synergy", "PUF."],
];

let buildCounter = 0;
const PREPROCESSED_BUILD_PROJECT = BUILD_PROJECT_LINES.map((line) =>
  line.map((word) =>
    word.split("").map((char) => ({
      char,
      index: buildCounter++,
    }))
  )
);
const TOTAL_BUILD_CHARS = buildCounter;

function ScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const startScroll = 0.02;
  const endScroll = 0.40;
  const step = (endScroll - startScroll) / total;

  const letterStart = startScroll + index * step;
  const letterEnd = letterStart + step * 1.3;

  const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-20, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

export default function BuildNextProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start 90%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const { scrollYProgress: subtextScrollProgress } = useScroll({
    target: subtextRef,
    offset: ["start 90%", "center 50%"],
  });

  const smoothSubtextProgress = useSpring(subtextScrollProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  const subtextY = useTransform(smoothSubtextProgress, [0, 0.45], [50, 0]);
  const subtextOpacity = useTransform(smoothSubtextProgress, [0, 0.40], [0, 1]);

  const playCountAnimation = () => {
    tweensRef.current.forEach((tween) => tween.kill());
    tweensRef.current = [];

    stats.forEach((stat, idx) => {
      const el = valueRefs.current[idx];
      if (!el) return;

      const obj = { val: 1 };
      el.textContent = `1${stat.suffix}`;

      const tween = gsap.to(obj, {
        val: stat.target,
        duration: 0.7,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${stat.suffix}`;
        },
        onComplete: () => {
          el.textContent = `${stat.target}${stat.suffix}`;
        },
      });

      tweensRef.current.push(tween);
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRevealRef.current;
    const content = contentRef.current;
    if (!section || !imageEl || !content) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils
        .toArray<HTMLElement>(content.querySelectorAll("[data-reveal]"))
        .filter((el) => el.tagName !== "H2");

      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: content,
              start: "top 88%",
              toggleActions: "play none none reverse",
              onEnter: () => playCountAnimation(),
            },
          }
        );
      }

      // Stats row reveal animation
      const statsRow = content.querySelector("[data-stats-reveal]");
      if (statsRow) {
        gsap.fromTo(
          statsRow,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRow,
              start: "top 90%",
              toggleActions: "play none none reverse",
              onEnter: () => playCountAnimation(),
            },
          }
        );
      }

      // Start: only 10% visible; scroll → slowly full open
      gsap.set(imageEl, { clipPath: "inset(0 90% 0 0)" });

      gsap.to(imageEl, {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "center 35%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 sm:py-20 lg:py-24 font-sans"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            ref={contentRef}
            className="relative isolate text-left"
            style={{ perspective: 1000 }}
          >
            <h2
              ref={titleRef}
              className="relative text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-[1.15]"
            >
              {PREPROCESSED_BUILD_PROJECT.map((line, lineIdx) => (
                <React.Fragment key={lineIdx}>
                  {lineIdx > 0 && <br />}
                  {line.map((word, wordIdx) => (
                    <span
                      key={wordIdx}
                      className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
                    >
                      {word.map((item) => (
                        <ScrollLetter
                          key={item.index}
                          char={item.char}
                          index={item.index}
                          total={TOTAL_BUILD_CHARS}
                          progress={smoothProgress}
                        />
                      ))}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </h2>

            <motion.p
              ref={subtextRef}
              style={{ y: subtextY, opacity: subtextOpacity }}
              className="relative mt-4 text-sm sm:text-base font-light text-gray-600 leading-relaxed transform-gpu will-change-transform"
            >
              BIS certified. FM approved. Delivered pan-India in 30 days
            </motion.p>

            <div
              data-reveal
              className="relative mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 will-change-transform"
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className=" border border-gray-300 px-3.5 py-1.5 text-xs sm:text-sm font-light text-gray-800"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div
              data-reveal
              className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 will-change-transform"
            >
              <Link
                href="/quote"
                className="inline-flex items-center justify-between gap-4 rounded-none bg-[#511663] px-5 py-3.5 text-sm font-normal text-white transition-colors hover:bg-[#3e0f4d] sm:min-w-[200px]"
              >
                <span>Get instant quote</span>
                <ArrowUpRight size={18} strokeWidth={1.8} />
              </Link>

              <a
                href="#brochure"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Downloading Synergy PUF Product Catalog PDF...");
                }}
                className="inline-flex items-center justify-between gap-4 rounded-none bg-[#e8dff0] px-5 py-3.5 text-sm font-normal text-[#511663] transition-colors hover:bg-[#ddd0e8] sm:min-w-[200px]"
              >
                <span>Download brochure</span>
                <ArrowUpRight size={18} strokeWidth={1.8} />
              </a>
            </div>

            <div
              data-stats-reveal
              className="mt-10 border-t border-gray-200 pt-8 will-change-transform"
              onMouseEnter={playCountAnimation}
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
                {stats.map((stat, idx) => (
                  <div key={stat.label}>
                    <p className="stat-number text-2xl sm:text-3xl font-bold tracking-tight text-black">
                      <span
                        ref={(el) => {
                          valueRefs.current[idx] = el;
                        }}
                      >
                        1{stat.suffix}
                      </span>
                    </p>
                    <p className="mt-1 text-sm font-light text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/10] w-full lg:aspect-[4/3]">
            <div
              ref={imageRevealRef}
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(0 90% 0 0)" }}
            >
              <Image
                src="/images/products/roof_panel_hero.png"
                alt="Synergy PUF roof panel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

