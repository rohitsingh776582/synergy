"use client";

import React from "react";
import Container from "./Container";

export const manufacturingSteps = [
  {
    title: "Hi-Tech Automated Facility",
    description: "Precision roll forming, high pressure PU injection for uniform density and superior insulation.",
  },
  {
    title: "Steel Treatment & Coating",
    description: "Corrosion-resistant pre-coated steel sheets for long-lasting exterior and interior durability.",
  },
  {
    title: "Advanced Powder Coating",
    description: "High grade powders applied for smooth finish, vibrant colors and superior weather resistance.",
  },
  {
    title: "Stringent Quality Control",
    description: "Continuous quality checks during manufacturing ensure zero defects and exact tolerance compliance.",
  },
  {
    title: "Panel Compatibility & Precision",
    description: "Automated cutting, precise edge profiles, and seamless fitting for easy on-site installation.",
  },
];

export default function ManufacturingThatDeliversSection() {
  return (
    <section className="py-20 bg-white">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Paragraph */}
        <div className="lg:col-span-5 pt-4">
          <h2 className="text-3xl sm:text-5xl font-normal text-gray-900 tracking-tight leading-tight">
            Manufacturing <br />
            that delivers.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            From high-volume runs to custom, project-tailored solutions, our facilities combine modern machinery, precise process control, and rigorous testing for high quality results.
          </p>
        </div>

        {/* Right Column: Vertical Timeline */}
        <div className="lg:col-span-7">
          <div className="relative border-l-2 border-[#5b176e] pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-10">
            {manufacturingSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Purple Node Bullet */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 bg-[#5b176e] ring-4 ring-white" />
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#5b176e] transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
