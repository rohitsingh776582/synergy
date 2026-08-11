import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import Container from "@/components/Container";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects Portfolio | Synergy PUF - Proven Case Studies",
  description: "Explore completed insulation projects across cold storage logistics, pharmaceutical cleanrooms, food processing plants, and industrial warehouses in India.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-16 text-center border-b border-gray-100">
          <Container>
            <span className="rounded-full bg-purple-100 px-4 py-1.5 text-xs font-extrabold text-[#5b176e] tracking-wider uppercase">
              Project Portfolio
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Trusted Across India. <br />
              <span className="text-[#5b176e]">Proven by Results.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover how Synergy PUF insulated panel engineering empowers cold supply chains, biotech labs, and manufacturing giants across 28+ states.
            </p>
          </Container>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-[#f8f8fa]">
          <Container>
            <SectionHeading
              title="Featured Project Case Studies"
              subtitle="From 120,000 sq. ft. mega cold rooms to Class 10,000 sterile cleanrooms."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
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
