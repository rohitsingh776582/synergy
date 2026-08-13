"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Container from "./Container";
import { projects, type Project } from "@/data/projects";

function ProjectShowcase({ project }: { project: Project }) {
  const gallery = project.gallery.length ? project.gallery : [project.image];
  const [active, setActive] = useState(0);
  const activeImage = gallery[active] ?? project.image;

  const specs = [
    { label: "Panel", value: project.panel },
    { label: "Thickness", value: project.thickness },
    { label: "Core Density", value: project.coreDensity },
    { label: "Area", value: project.areaInstalled },
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-gray-200">
          <Image
            src={activeImage}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority={project.slug === projects[0]?.slug}
          />
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {project.completionYear} • {project.location}
          </span>
        </div>

        {gallery.length > 1 ? (
          <div className="mt-3 flex gap-3">
            {gallery.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View photo ${index + 1} of ${project.name}`}
                className={`relative h-20 w-28 overflow-hidden rounded-xl sm:h-24 sm:w-36 ${
                  active === index
                    ? "ring-2 ring-[#5b176e] ring-offset-2 ring-offset-[#F8F8FA]"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#5b176e]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b176e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5b176e]" />
          {project.productBadge}
        </span>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-black md:text-4xl">
          {project.name}
        </h2>

        <p className="mt-2.5 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="h-4 w-4 text-gray-400" />
          {project.location}
        </p>

        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-gray-600">
          {project.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-xl bg-[#ececf1] px-4 py-4 sm:px-5 sm:py-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                {spec.label}
              </p>
              <p className="mt-1.5 text-base font-bold text-black sm:text-lg">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/quote"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5b176e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(91,23,110,0.28)] transition-colors hover:bg-[#461056]"
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
    <section id="featured-projects" className="bg-[#F8F8FA] py-16 md:py-20">
      <Container>
        <ProjectShowcase project={project} />
      </Container>
    </section>
  );
}
