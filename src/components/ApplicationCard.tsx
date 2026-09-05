import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Application } from "@/data/applications";

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-none bg-white border border-gray-200   transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
          <Image
            src={application.image}
            alt={application.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
          />
        </div>

        <div className="p-6">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5b176e]">
            {application.category}
          </span>
          <h3 className="mt-1 text-xl font-normal text-gray-900 group-hover:text-[#5b176e] transition-colors">
            {application.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 font-light line-clamp-3 leading-relaxed">
            {application.shortDescription}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Link
          href={`/applications/${application.slug}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#5b176e] hover:text-[#461056] group-hover:translate-x-1 transition-transform"
        >
          <span>Learn More Solutions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
