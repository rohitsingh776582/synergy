import Hero from "@/components/Hero";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import IntroLoader from "@/components/IntroLoader";
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
      <IntroLoader />
      <div className="relative z-0">
        <HeroVideoBackground src={HERO_VIDEO} />

        <div className="flex min-h-[96dvh] flex-col">
          <div
            id="home-hero"
            className="flex flex-1 flex-col justify-center py-9 sm:py-12"
          >
            <Hero />
          </div>
        </div>

        <main className="relative z-10 -mt-4 bg-white sm:-mt-6">
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

