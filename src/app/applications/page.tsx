import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ApplicationsHeroAnimation from "@/components/ApplicationsHeroAnimation";
import IndustriesWeServeSection from "@/components/IndustriesWeServeSection";

export const metadata: Metadata = {
  title: "Industry Applications | Synergy PUF Insulation Solutions",
  description: "Thermal insulation applications for Cold Storage, Pharmaceutical Cleanrooms, Industrial Warehouses, and Food Processing Facilities.",
};

export default function ApplicationsPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F7F9] font-sans text-gray-900 overflow-x-clip">
      {/* Main page content layer - covers footer while scrolling top/middle */}
      <div className="relative z-10 bg-[#F7F7F9]">
        <main className="flex-1">
          {/* Animated Editorial Hero Section */}
          <ApplicationsHeroAnimation />

        

          {/* Industries We Serve Interactive Section */}
          <IndustriesWeServeSection />
        </main>
      </div>


      {/* Sticky footer reveal layer - unmasks smoothly as page end is reached */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
