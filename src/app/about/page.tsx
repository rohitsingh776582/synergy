import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import BuildProjectCTA from "@/components/BuildProjectCTA";
import AchievementCards from "@/components/AchievementCards";
import FeatureHighlightCards from "@/components/FeatureHighlightCards";
import AboutHero from "@/components/AboutHero";
import Container from "@/components/Container";
import { Target, Eye, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Synergy PUF - Engineering Insulation Solutions",
  description:
    "Learn about Synergy PUF's history, mission, vision, core values, and pan-India manufacturing capability for high-density PUF panels.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      
      <main className="flex-1">
        <AboutHero />

        <AchievementCards />

        {/* Company Story */}
        <section className="bg-white py-14 md:py-16">
          <Container>
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
                  <Image
                    src="/puf_factory.png"
                    alt="Synergy PUF Automated Factory"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="mb-5 max-w-xl">
                  <h2 className="text-3xl font-normal leading-[1.15] tracking-tight text-gray-900 sm:text-4xl">
                    Engineered for Precision, Built for Durability.
                  </h2>
                  <p className="mt-3 text-base font-light leading-relaxed text-gray-600">
                    Synergy PUF was established to bridge the gap between heavy
                    industrial construction and modern energy-efficient
                    insulation standards.
                  </p>
                </div>
                <div className="max-w-xl space-y-3 text-sm leading-relaxed text-gray-600 md:text-[15px]">
                  <p>
                    From humble beginnings as an industrial supplier, Synergy
                    PUF has evolved into a premier pan-India manufacturer
                    equipped with automated continuous PUF sandwich panel
                    foaming lines.
                  </p>
                  <p>
                    Our high-density polyurethane core technology guarantees
                    minimum thermal bridge transmission, flame-retardant B1/B2
                    fire safety, and exceptional structural load ratings
                    required by large-span cold logistics and pharmaceutical
                    cleanroom installations.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Mission / Vision / Promise */}
        <section className="bg-[#f4f4f7] py-14 md:py-16">
          <Container>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              <div className="border border-gray-200 bg-white p-6">
                <div className="mb-4 inline-flex bg-purple-100 p-2.5 text-[#5b176e]">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Our Mission
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                  To engineer world-class, energy-efficient PUF insulation
                  systems that empower businesses to optimize thermal control,
                  reduce carbon footprint, and lower operational energy expenses
                  across India and global markets.
                </p>
              </div>

              <div className="border border-gray-200 bg-white p-6">
                <div className="mb-4 inline-flex bg-purple-100 p-2.5 text-[#5b176e]">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Our Vision
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                  To be the undisputed leader and most trusted brand in thermal
                  insulation and modular panel engineering, known for
                  zero-defect quality, rapid dispatch capabilities, and
                  continuous innovation.
                </p>
              </div>

              <div className="border border-gray-200 bg-white p-6">
                <div className="mb-4 inline-flex bg-purple-100 p-2.5 text-[#5b176e]">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Our Promise
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                  Consistent quality, on-time delivery, and engineering support
                  that keeps every project insulated, efficient, and built to
                  last.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <BuildProjectCTA />
      </main>

      <FeatureHighlightCards />
      <Footer />
    </div>
  );
}
