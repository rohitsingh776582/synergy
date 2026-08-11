import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Container from "@/components/Container";
import { projects } from "@/data/projects";
import { Check, ArrowRight, Building, MapPin, Calendar, Layers } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found | Synergy PUF" };
  }

  return {
    title: `${project.name} Case Study | Synergy PUF`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-12 border-b border-gray-100">
          <Container>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#5b176e]">Home</Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-[#5b176e]">Projects</Link>
              <span>/</span>
              <span className="text-[#5b176e]">{project.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-[#5b176e]">
                  {project.industry}
                </span>
                <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  {project.name}
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metadata Stats */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block">Client</span>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block">Location</span>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{project.location}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block">Area Installed</span>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{project.areaInstalled}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 block">Year</span>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">{project.completionYear}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 rounded-full bg-[#5b176e] px-7 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#461056] transition-all hover:scale-105"
                  >
                    <span>Request Similar Project Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl border border-gray-200">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Highlights */}
        <section className="py-20 bg-white">
          <Container>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Key Engineering Highlights</h2>
            <div className="space-y-4">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="p-1 rounded-full bg-[#5b176e] text-white mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-semibold text-base">{highlight}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
