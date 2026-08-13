import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProjectsHero from "@/components/ProjectsHero";
import FeaturedProjectShowcase from "@/components/FeaturedProjectShowcase";
import ProjectGalleryCta from "@/components/ProjectGalleryCta";
import BuildProjectCTA from "@/components/BuildProjectCTA";
import FeatureHighlightCards from "@/components/FeatureHighlightCards";

export const metadata: Metadata = {
  title: "Projects Portfolio | Synergy PUF - Proven Case Studies",
  description: "Explore completed insulation projects across cold storage logistics, pharmaceutical cleanrooms, food processing plants, and industrial warehouses in India.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <main className="flex-1">
        <ProjectsHero />

        <FeaturedProjectShowcase />

        <ProjectGalleryCta />
      </main>
      <BuildProjectCTA />

      <FeatureHighlightCards />

      <Footer />
    </div>
  );
}
