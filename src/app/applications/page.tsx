import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import WhyPufPanelsSection from "@/components/WhyPufPanelsSection";
import IndustriesWeServeSection from "@/components/IndustriesWeServeSection";


export const metadata: Metadata = {
  title: "Industry Applications | Synergy PUF Insulation Solutions",
  description: "Thermal insulation applications for Cold Storage, Pharmaceutical Cleanrooms, Industrial Warehouses, and Food Processing Facilities.",
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-16 text-center border-b border-gray-100">
          <Container>
            <span className="rounded-full bg-purple-100 px-4 py-1.5 text-xs font-extrabold text-[#5b176e] tracking-wider uppercase">
              Sector Applications
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Insulation Tailored for <br />
              <span className="text-[#5b176e]">Every Industry Vertical</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              From food safety to sterile pharmaceuticals, Synergy PUF paneling meets rigid international standards for temperature, hygiene, and energy isolation.
            </p>
          </Container>
        </section>

        {/* Why PUF Panels Feature Section */}
        <WhyPufPanelsSection />

        {/* Industries We Serve Interactive Section */}
        <IndustriesWeServeSection />

      
      </main>

      <Footer />
    </div>
  );
}
