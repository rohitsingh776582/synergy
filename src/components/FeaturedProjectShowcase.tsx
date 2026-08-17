"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { projects, type Project } from "@/data/projects";

function ProjectShowcase({ project }: { project: Project }) {
  const gallery = project.gallery.length ? project.gallery : [project.image];
  const [active, setActive] = useState(0);

  // Automatic image sliding every 5 seconds (slower & calmer)
  useEffect(() => {
    if (gallery.length <= 1) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % gallery.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [gallery.length]);

  const activeImage = gallery[active] ?? project.image;

  const specs = [
    { label: "Panel", value: project.panel },
    { label: "Thickness", value: project.thickness },
    { label: "Core Density", value: project.coreDensity },
    { label: "Area", value: project.areaInstalled },
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
      <div>
        {/* Main Showcase Image */}
        <div className="relative aspect-[16/9.5] overflow-hidden bg-gray-200 shadow-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={activeImage}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <span className="absolute left-4 top-4 z-10 bg-black/55 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {project.completionYear} • {project.location}
          </span>

          {/* Auto-Slide Progress Dots */}
          {gallery.length > 1 && (
            <div className="absolute right-4 bottom-4 z-10 flex gap-1.5 items-center bg-black/40 px-2.5 py-1 backdrop-blur-sm">
              {gallery.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 transition-all duration-500 ${
                    active === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 ? (
          <div className="mt-2.5 flex gap-2.5">
            {gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View photo ${index + 1} of ${project.name}`}
                className={`relative h-16 w-24 overflow-hidden sm:h-20 sm:w-30 transition-all ${
                  active === index
                    ? "ring-2 ring-[#5b176e] ring-offset-2 ring-offset-[#F8F8FA] scale-[1.02]"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <span className="inline-flex w-fit items-center gap-2 bg-[#5b176e]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b176e]">
          <span className="h-1.5 w-1.5 bg-[#5b176e]" />
          {project.productBadge}
        </span>

        <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-black sm:text-3xl md:text-4xl">
          {project.name}
        </h2>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          {project.location}
        </p>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-[15px]">
          {project.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="bg-[#ececf1] px-3.5 py-3 sm:px-4 sm:py-3.5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                {spec.label}
              </p>
              <p className="mt-1 text-sm font-bold text-black sm:text-base">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/quote"
          className="mt-4 inline-flex w-full items-center justify-center gap-2  bg-[#5b176e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#461056]"
        >
          Build something similar
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedProjectShowcase() {
  const project = projects[0];
  if (!project) return null;

  return (
    <section id="featured-projects" className="bg-[#F8F8FA] py-5 md:py-8">
      <Container>
        <ProjectShowcase project={project} />
      </Container>
    </section>
  );
}

