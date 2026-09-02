import type { Metadata } from "next";
import BuildProjectFloatingCTA from "@/components/BuildProjectFloatingCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CTA Showcase | Synergy PUF",
  description: "Floating cards call to action showcase page for Synergy PUF.",
};

export default function CTAShowcasePage() {
  return (
    <div className="relative min-h-screen bg-white font-sans text-gray-900 overflow-x-clip">
      <div className="relative z-10 bg-white pt-20">
        <main className="flex-1">
          <BuildProjectFloatingCTA />
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
