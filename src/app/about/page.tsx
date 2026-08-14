import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BuildProjectCTA from "@/components/BuildProjectCTA";
import AchievementCards from "@/components/AchievementCards";
import FeatureHighlightCards from "@/components/FeatureHighlightCards";
import AboutHero from "@/components/AboutHero";
import CompanyStory from "@/components/CompanyStory";
import MissionVisionPromise from "@/components/MissionVisionPromise";

export const metadata: Metadata = {
  title: "About Us | Synergy PUF - Engineering Insulation Solutions",
  description:
    "Learn about Synergy PUF's history, mission, vision, core values, and pan-India manufacturing capability for high-density PUF panels.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white font-sans text-gray-900 overflow-x-clip">
      {/* Main page content layer - covers footer while scrolling top/middle */}
      <div className="relative z-10 bg-white shadow-2xl">
        <main className="flex-1">
          <AboutHero />

          <AchievementCards />

          <CompanyStory />

          <MissionVisionPromise />

          <BuildProjectCTA />
        </main>

        <FeatureHighlightCards />
      </div>

      {/* Sticky footer reveal layer - unmasks smoothly as page end is reached */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
