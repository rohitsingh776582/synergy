import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import PanelRequirements from "@/components/PanelRequirements";
import IndustryShowcase from "@/components/IndustryShowcase";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 antialiased selection:bg-[#5b176e] selection:text-white">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Stats />
        <PanelRequirements />
        <IndustryShowcase />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
