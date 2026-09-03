"use client";

import React from "react";
import Image from "next/image";
import Container from "./Container";
import { Star, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating?: number;
  highlighted?: boolean;
}

const leftColumnCards: Testimonial[] = [
  {
    id: "left-1",
    quote: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    author: "Briana Patton",
    role: "Operations Manager",
    company: "ColdChain Logistics Ltd.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "left-2",
    quote: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    author: "Bilal Ahmed",
    role: "Project Manager",
    company: "Apex Infra Developers",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "left-3",
    quote: "Their 11-acre continuous lamination line delivered 18,000 m² of PIR panels within 10 days. Zero site delay and exceptional panel flatness.",
    author: "Rohan Malhotra",
    role: "VP Engineering",
    company: "Mega Agri Processing",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "left-4",
    quote: "Custom steel skin thickness with high R-value insulation. The thermal barrier exceeded our green building compliance certification.",
    author: "Ananya Deshmukh",
    role: "Lead Structural Consultant",
    company: "GreenBuild Designs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

const centerColumnCards: Testimonial[] = [
  {
    id: "center-1",
    quote: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    author: "Zainab Hussain",
    role: "Project Manager",
    company: "BioPharma Modular Cleanrooms",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    highlighted: true,
  },
  {
    id: "center-2",
    quote: "The software boosted team productivity and project efficiency. Highly recommend for its intuitive interface.",
    author: "Omar Raza",
    role: "CEO",
    company: "National Logistics Hub",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    highlighted: true,
  },
  {
    id: "center-3",
    quote: "The smooth implementation exceeded expectations. Multi-stage quality inspection ensured zero panel defect across 12,000 m² dispatch.",
    author: "Vikramaditya Sharma",
    role: "Head of Infrastructure",
    company: "Industrial Parks India",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    highlighted: true,
  },
  {
    id: "center-4",
    quote: "Zero thermal bridging cam-lock joints maintained precise sub-zero vault temperatures effortlessly through extreme peak summer conditions.",
    author: "Meera Kapoor",
    role: "Cold Chain Specialist",
    company: "Arctic Storage Systems",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    highlighted: true,
  },
];

const rightColumnCards: Testimonial[] = [
  {
    id: "right-1",
    quote: "Our business functions improved with a user-friendly design and positive customer feedback.",
    author: "Farhan Siddiqui",
    role: "Marketing Director",
    company: "Synergy Commercial Spaces",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "right-2",
    quote: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    author: "Sana Sheikh",
    role: "Sales Manager",
    company: "Thermal Shield Solutions",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "right-3",
    quote: "Pre-painted steel sheet corrosion resistance is outstanding. Even after 4 years of harsh environmental exposure, panels look brand new.",
    author: "Aakash Verma",
    role: "Chief Architect",
    company: "Coastal Infra Studio",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "right-4",
    quote: "Fast turnaround with 30-day pan-India delivery guaranteed. Their logistics team handled remote project site dispatches impeccably.",
    author: "Kavita Rao",
    role: "Supply Chain Head",
    company: "Pan-India Cold Grid",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

function ScrollTypewriterText({
  text,
  progress,
  start = 0.02,
  end = 0.45,
  className = "",
}: {
  text: string;
  progress: any;
  start?: number;
  end?: number;
  className?: string;
}) {
  const words = text.split(" ");
  let counter = 0;
  const processed = words.map((word) =>
    word.split("").map((char) => ({
      char,
      index: counter++,
    }))
  );
  const totalChars = counter;

  return (
    <span className={className}>
      {processed.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          {word.map((item) => {
            const step = (end - start) / Math.max(1, totalChars);
            const letterStart = start + item.index * step;
            const letterEnd = letterStart + step * 1.3;

            return (
              <LetterItem
                key={item.index}
                char={item.char}
                progress={progress}
                letterStart={letterStart}
                letterEnd={letterEnd}
              />
            );
          })}
        </span>
      ))}
    </span>
  );
}

function LetterItem({
  char,
  progress,
  letterStart,
  letterEnd,
}: {
  char: string;
  progress: any;
  letterStart: number;
  letterEnd: number;
}) {
  const opacity = useTransform(progress, [letterStart, letterEnd], [0, 1]);
  const x = useTransform(progress, [letterStart, letterEnd], [-14, 0]);

  return (
    <motion.span
      style={{ opacity, x }}
      className="inline-block transform-gpu will-change-transform"
    >
      {char}
    </motion.span>
  );
}

export default function ProductShowcaseBoxSection() {
  const sectionRef = React.useRef<HTMLElement>(null);

  // Track page scroll through the testimonials section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.0001,
  });

  // Top badge & marquee container scroll animation
  const badgeY = useTransform(smoothProgress, [0.01, 0.30], [30, 0]);
  const badgeOpacity = useTransform(smoothProgress, [0.01, 0.25], [0, 1]);

  const marqueeY = useTransform(smoothProgress, [0.22, 0.65], [55, 0]);
  const marqueeOpacity = useTransform(smoothProgress, [0.22, 0.58], [0, 1]);

  // Duplicate arrays to create a 100% seamless infinite marquee loop
  const leftItems = [...leftColumnCards, ...leftColumnCards];
  const centerItems = [...centerColumnCards, ...centerColumnCards];
  const rightItems = [...rightColumnCards, ...rightColumnCards];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAFAFC] py-16 md:py-24 overflow-hidden font-sans select-none"
    >
      <Container className="flex flex-col items-center">
        {/* SECTION HEADER: Letter-by-letter writing animation from left to right */}
        <div className="text-center max-w-2xl mb-12 sm:mb-16 space-y-4">
          <motion.div
            style={{ y: badgeY, opacity: badgeOpacity }}
            className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#5b176e] transform-gpu will-change-transform"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5b176e]" />
            <span>Client Testimonials</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            <ScrollTypewriterText
              text="Trusted by Leaders Across the Industry"
              progress={smoothProgress}
              start={0.02}
              end={0.42}
            />
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            <ScrollTypewriterText
              text="See how our high-performance PUF panel systems and operational software transform facility performance."
              progress={smoothProgress}
              start={0.16}
              end={0.62}
            />
          </p>
        </div>

        {/* 3-COLUMN INFINITE MARQUEE SHOWCASE CONTAINER */}
        <motion.div
          style={{ y: marqueeY, opacity: marqueeOpacity }}
          className="relative w-full max-w-6xl h-[620px] sm:h-[680px] md:h-[720px] overflow-hidden transform-gpu will-change-transform"
        >
          
          {/* Top & Bottom Gradient Fading Overlay Masks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAFAFC] via-[#FAFAFC]/90 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAFAFC] via-[#FAFAFC]/90 to-transparent z-20" />

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start">
            
            {/* COLUMN 1: LEFT COLUMN (Scrolls UP continuously) */}
            <div className="overflow-hidden h-full">
              <motion.div
                animate={{ y: [0, "-50%"] }}
                transition={{
                  duration: 28,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="flex flex-col gap-6 will-change-transform transform-gpu hover:[animation-play-state:paused]"
              >
                {leftItems.map((item, idx) => (
                  <div
                    key={`left-${idx}`}
                    className="bg-white border border-gray-200/80 p-6 sm:p-7 hover:border-purple-200 transition-all duration-300 group"
                  >
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                      "{item.quote}"
                    </p>

                    <div className="flex items-center gap-3.5">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-bold text-sm sm:text-base leading-snug">
                          {item.author}
                        </h4>
                        <p className="text-gray-500 text-xs font-medium">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>


            {/* COLUMN 2: CENTER COLUMN (Scrolls DOWN continuously with highlighted center card style) */}
            <div className="overflow-hidden h-full hidden sm:block">
              <motion.div
                animate={{ y: ["-50%", 0] }}
                transition={{
                  duration: 32,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="flex flex-col gap-6 will-change-transform transform-gpu hover:[animation-play-state:paused]"
              >
                {centerItems.map((item, idx) => (
                  <div
                    key={`center-${idx}`}
                    className="bg-white border-2 border-purple-200/90 p-6 sm:p-7 hover:border-[#5b176e] transition-all duration-300 relative group"
                  >
                    <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-normal mb-6">
                      "{item.quote}"
                    </p>

                    <div className="flex items-center gap-3.5">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-[#5b176e]">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-bold text-sm sm:text-base leading-snug">
                          {item.author}
                        </h4>
                        <p className="text-[#5b176e] text-xs font-semibold">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>


            {/* COLUMN 3: RIGHT COLUMN (Scrolls UP continuously) */}
            <div className="overflow-hidden h-full hidden lg:block">
              <motion.div
                animate={{ y: [0, "-50%"] }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="flex flex-col gap-6 will-change-transform transform-gpu hover:[animation-play-state:paused]"
              >
                {rightItems.map((item, idx) => (
                  <div
                    key={`right-${idx}`}
                    className="bg-white border border-gray-200/80 p-6 sm:p-7 hover:border-purple-200 transition-all duration-300 group"
                  >
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                      "{item.quote}"
                    </p>

                    <div className="flex items-center gap-3.5">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-bold text-sm sm:text-base leading-snug">
                          {item.author}
                        </h4>
                        <p className="text-gray-500 text-xs font-medium">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
