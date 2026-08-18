import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ApplicationsImageSlider from "@/components/ApplicationsImageSlider";
import IndustriesWeServeSection from "@/components/IndustriesWeServeSection";

export const metadata: Metadata = {
  title: "Industry Applications | Synergy PUF Insulation Solutions",
  description: "Thermal insulation applications for Cold Storage, Pharmaceutical Cleanrooms, Industrial Warehouses, and Food Processing Facilities.",
};

export default function ApplicationsPage() {
  return (
    <div className="relative min-h-screen bg-white font-sans text-gray-900 overflow-x-clip">
      {/* Main page content layer - covers footer while scrolling top/middle */}
      <div className="relative z-10 bg-white">
        <main className="flex-1">
          {/* Applications 4-Image Slider Component */}
          <ApplicationsImageSlider />

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
