import Hero from "@/components/Hero";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import PUFComingSoon from "@/components/PUFComingSoon";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatsInsideMatters from "@/components/WhatsInsideMatters";
import TrustedBy from "@/components/TrustedBy";
import Stats from "@/components/Stats";
import PanelRequirements from "@/components/PanelRequirements";
import IndustryShowcase from "@/components/IndustryShowcase";
import Testimonials from "@/components/Testimonials";
import BuildNextProject from "@/components/BuildNextProject";
import Footer from "@/components/Footer";
import ProductShowcaseBoxSection from "@/components/ProductShowcaseBoxSection";

const HERO_VIDEO = "/video/PUF.mp4";

export default function Home() {
  return (
    <div className="relative bg-white font-sans text-gray-900 antialiased selection:bg-[#5b176e] selection:text-white">
      <PUFComingSoon />
      <div className="relative z-0">
        <HeroVideoBackground src={HERO_VIDEO} />

        <div
          id="home-hero"
          className="relative flex min-h-screen min-h-[100dvh] h-screen w-full flex-col justify-center overflow-hidden"
        >
          <Hero />
        </div>

        <main className="relative z-10 bg-white">
          <WhatsInsideMatters />
          <WhyChooseUs />
          {/* <TrustedBy /> */}
          <Stats />
          <PanelRequirements />
          <IndustryShowcase />
          {/* <Testimonials /> */}
          <ProductShowcaseBoxSection />

          <BuildNextProject />
        </main>

        <Footer />
      </div>
    </div>
  );
}

