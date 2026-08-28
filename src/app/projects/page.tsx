import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProjectsHero from "@/components/ProjectsHero";
import FeaturedProjectShowcase from "@/components/FeaturedProjectShowcase";
import ProjectGalleryCta from "@/components/ProjectGalleryCta";
import BuildProjectCTA from "@/components/BuildProjectCTA";
import FeatureHighlightCards from "@/components/FeatureHighlightCards";
import Rotating3DCardDeckShowcase from "@/components/Rotating3DCardDeckShowcase";

export const metadata: Metadata = {
  title: "Projects Portfolio | Synergy PUF - Proven Case Studies",
  description: "Explore completed insulation projects across cold storage logistics, pharmaceutical cleanrooms, food processing plants, and industrial warehouses in India.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-white font-sans text-gray-900 overflow-x-clip">
      {/* Main page content layer - covers footer while scrolling top/middle */}
      <div className="relative z-10 bg-white shadow-none">
        <main className="flex-1">
          <ProjectsHero />

          <FeaturedProjectShowcase />

          {/* <ProjectGalleryCta /> */}
        </main>

        <Rotating3DCardDeckShowcase />

         <BuildProjectCTA /> 

        <FeatureHighlightCards />
      </div>

      {/* Sticky footer reveal layer - unmasks smoothly as page end is reached */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
