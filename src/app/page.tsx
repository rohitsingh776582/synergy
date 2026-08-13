import Image from "next/image";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustedBy from "@/components/TrustedBy";
import Stats from "@/components/Stats";
import PanelRequirements from "@/components/PanelRequirements";
import IndustryShowcase from "@/components/IndustryShowcase";
import Testimonials from "@/components/Testimonials";
import BuildNextProject from "@/components/BuildNextProject";
import Footer from "@/components/Footer";

const HERO_BG = "/images/HeroSection/DJI_20260729155134_0345_D.JPG.jpeg";

export default function Home() {
  return (
    <div className="relative bg-white font-sans text-gray-900 antialiased selection:bg-[#5b176e] selection:text-white">
      <div className="relative z-0">
        <div
          className="pointer-events-none fixed inset-0 -z-10 h-dvh w-full"
          aria-hidden
        >
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_12%] scale-[1.22] origin-top"
          />
        </div>

        <div className="flex min-h-[88dvh] flex-col">
          <div
            id="home-hero"
            className="flex flex-1 flex-col justify-center py-9 sm:py-12"
          >
            <Hero />
          </div>
        </div>

        <main className="relative z-10 -mt-4 bg-white sm:-mt-6">
          <WhyChooseUs />
          {/* <TrustedBy /> */}
          <Stats />
          <PanelRequirements />
          <IndustryShowcase />
          <Testimonials />
          <BuildNextProject />
        </main>

        <Footer />
      </div>
    </div>
  );
}
