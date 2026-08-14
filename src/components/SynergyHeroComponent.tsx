import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import Container from './Container';

export default function SynergyHeroComponent() {
  return (
    <section className="w-full bg-[#f8f6f9] py-16 md:py-20">
      <Container className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Heading and Subtext */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1c1917] tracking-tight leading-[1.15]">
            Build your next <br />
            project with <br />
            Synergy PUF.
          </h2>
          <p className="text-[#686563] text-sm sm:text-base max-w-md leading-relaxed">
            High-performance insulated panel solutions delivered on time, every time across India.
          </p>
        </div>

        {/* Right Column: Staggered Layout & Action Buttons */}
        <div className="flex justify-center lg:justify-end">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[460px]">
            
            {/* Top-Left Image: PUF Wall Panel */}
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-purple-100 p-3 group transition-all duration-300">
              <Image
                src="/images/products/wall_panel_hero.png"
                alt="Synergy PUF Wall Panel"
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            
            {/* Top-Right Empty Space */}
            <div></div>

            {/* Bottom-Left Buttons */}
            <div className="flex flex-col justify-center gap-3">
              <Link href="/quote" className="bg-[#532247] hover:bg-[#431b38] text-white px-5 py-3.5 text-sm font-medium flex items-center justify-between transition-colors">
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              
              <a href="/brochure.pdf" download className="bg-[#ab98a7] hover:bg-[#9c8798] text-[#2c1b29] px-5 py-3.5 text-sm font-medium flex items-center justify-between transition-colors">
                <span>Download Brochure</span>
                <Download className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Bottom-Right Image: PUF Roof Panel */}
            <div className="relative aspect-square w-full overflow-hidden bg-white border border-purple-100 p-3 group transition-all duration-300">
              <Image
                src="/images/products/roof_panel_hero.png"
                alt="Synergy PUF Roof Panel"
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
}
