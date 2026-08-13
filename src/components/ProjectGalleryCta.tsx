import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "./Container";

const photos = [
  {
    src: "/puf_factory.png",
    alt: "Synergy PUF industrial facility cladding",
  },
  {
    src: "/cold_storage.png",
    alt: "Completed PUF warehouse installation",
  },
] as const;

export default function ProjectGalleryCta() {
  return (
    <section className="bg-[#F8F8FA] pb-20 pt-4 md:pb-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5b176e]">
            All Photos
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Every project, captured.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Real installations — real performance. Each image shot on-site at
            project completion.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center text-center md:mt-16">
          <p className="text-sm text-gray-600 sm:text-base">
            Ready to add your facility to this portfolio?
          </p>
          <Link
            href="/quote"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#5b176e] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(91,23,110,0.28)] transition-colors hover:bg-[#461056]"
          >
            Start your project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
