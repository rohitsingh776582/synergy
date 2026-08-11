import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import Container from "@/components/Container";
import { Target, Eye, ShieldCheck, HeartHandshake, Award, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Synergy PUF - Engineering Insulation Solutions",
  description: "Learn about Synergy PUF's history, mission, vision, core values, and pan-India manufacturing capability for high-density PUF panels.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      <main className="flex-1">

        {/* Page Hero */}
        <section className="relative overflow-hidden pt-14 pb-10 md:pt-20 md:pb-12 border-b border-purple-100/80">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/HeroSection/DJI_20260729155134_0345_D.JPG.jpeg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_12%] scale-[1.22] origin-top"
            />
          </div>
          <Container>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
              <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-semibold text-black tracking-tight leading-[1.15] max-w-2xl">
                India&apos;s most trusted
                <br />
                panel manufacturer.
              </h1>
              <Link
                href="/projects"
                className="shrink-0 self-start bg-[#5b176e] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#461056] transition-colors lg:mr-[5px]"
              >
                View Projects
              </Link>
            </div>
            <p className="mt-8 md:mt-10 max-w-3xl text-base sm:text-lg md:text-xl text-black leading-relaxed">
              From PUF and PIR to Rockwool panels, we don&apos;t just manufacture insulated panels — we engineer building envelopes that perform for decades.
            </p>
          </Container>
        </section>


 


        {/* Company Story & Intro */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <SectionHeading
                  title="Engineered for Precision, Built for Durability."
                  subtitle="Synergy PUF was established to bridge the gap between heavy industrial construction and modern energy-efficient insulation standards."
                />
                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                  <p>
                    From humble beginnings as an industrial supplier, Synergy PUF has evolved into a premier pan-India manufacturer equipped with automated continuous PUF sandwich panel foaming lines.
                  </p>
                  <p>
                    Our high-density polyurethane core technology guarantees minimum thermal bridge transmission, flame-retardant B1/B2 fire safety, and exceptional structural load ratings required by large-span cold logistics and pharmaceutical cleanroom installations.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl border border-gray-200">
                  <Image
                    src="/puf_factory.png"
                    alt="Synergy PUF Automated Factory"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>


        {/* Mission & Vision */}
        <section className="py-20 bg-[#f4f4f7]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-white p-8 md:p-10 shadow-lg border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="p-3.5 rounded-2xl bg-purple-100 text-[#5b176e] inline-block mb-6">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
                    To engineer world-class, energy-efficient PUF insulation systems that empower businesses to optimize thermal control, reduce carbon footprint, and lower operational energy expenses across India and global markets.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 md:p-10 shadow-lg border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="p-3.5 rounded-2xl bg-purple-100 text-[#5b176e] inline-block mb-6">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
                    To be the undisputed leader and most trusted brand in thermal insulation and modular panel engineering, known for zero-defect quality, rapid dispatch capabilities, and continuous innovation.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <Container>
            <SectionHeading
              title="Our Core Values"
              subtitle="The guiding principles behind every PUF panel manufactured in our facilities."
              centered
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="rounded-2xl p-6 bg-gray-50 border border-gray-200/80 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-purple-100 text-[#5b176e] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Quality Assurance</h4>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  Rigorous raw material testing and density checks on every single production batch.
                </p>
              </div>

              <div className="rounded-2xl p-6 bg-gray-50 border border-gray-200/80 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-purple-100 text-[#5b176e] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Innovation First</h4>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  Continuous R&D in eco-friendly blowing agents and high fire-retardant PIR formulation.
                </p>
              </div>

              <div className="rounded-2xl p-6 bg-gray-50 border border-gray-200/80 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-purple-100 text-[#5b176e] flex items-center justify-center mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Client Partnering</h4>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  End-to-end engineering support from panel thickness calculation to site erection supervision.
                </p>
              </div>

              <div className="rounded-2xl p-6 bg-gray-50 border border-gray-200/80 text-center">
                <div className="mx-auto w-12 h-12 rounded-xl bg-purple-100 text-[#5b176e] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Environmental Care</h4>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  Zero ODP (Ozone Depletion Potential) and low GWP blowing agent technologies.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <Stats />

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
