import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Building } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden bg-white border border-gray-200  transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
          />
          <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-white">
            {project.industry}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-normal text-gray-900 group-hover:text-[#5b176e] transition-colors">
            {project.name}
          </h3>
          <div className="mt-2 flex items-center gap-4 text-xs font-light text-gray-500">
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#5b176e]" />
              {project.client}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#5b176e]" />
              {project.location}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-600 font-light line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center justify-between w-full bg-purple-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#5b176e] hover:bg-[#5b176e] hover:text-white transition-all"
        >
          <span>View Project Case Study</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
