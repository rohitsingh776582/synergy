import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Container from "./Container";

export default function BuildProjectCTA() {
  return (
    <section className="w-full border-t border-gray-100 bg-white py-14 md:py-16">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f3e8f7] px-4 py-1.5 text-xs font-medium text-[#5b176e] sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5b176e]" aria-hidden />
            Even impossible is possible
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-[#111827] sm:text-4xl md:text-[2.75rem]">
            Build your next project with{" "}
            <span className="text-[#5b176e]">Synergy PUF.</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-500 sm:text-base">
            High-performance insulated panel solutions delivered on time,
            every time — across India.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-[#5b176e] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#461056]"
            >
              Get Instant Quote
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="/brochure.pdf"
              download
              className="inline-flex items-center gap-2 border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-800 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
