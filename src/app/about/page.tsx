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
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <main className="flex-1">
        <AboutHero />

        <AchievementCards />

        <CompanyStory />

        <MissionVisionPromise />

        <BuildProjectCTA />
      </main>

      <FeatureHighlightCards />

      <Footer />
    </div>
  );
}
