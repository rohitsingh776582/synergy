"use client";

import { Star, Building2, ShieldCheck, Factory } from "lucide-react";
import Container from "./Container";

const testimonials = [
  {
    quote: "Synergy PUF delivered cold storage wall panels for our distribution hub in Noida. Zero thermal leaks and superb installation support.",
    client: "Apex Cold Chain Logistics",
    location: "Noida, NCR",
    icon: Building2,
  },
  {
    quote: "Their cleanroom panels met all US-FDA standards seamlessly. Highly durable and precision engineered.",
    client: "BioMed Pharma Pvt Ltd",
    location: "Hyderabad",
    icon: ShieldCheck,
  },
  {
    quote: "We insulated over 50,000 sq ft of warehouse roofing with Synergy PUF sheets. Remarkable reduction in HVAC power costs!",
    client: "SteelCraft Infrastructure",
    location: "Gurugram",
    icon: Factory,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#e9e9ed] py-20 font-sans">
      <Container className="text-center">
        <h2 className="text-3xl md:text-5xl font-normal text-gray-900 leading-tight">
          Trusted Across India. <br />
          Proven by <span className="text-[#5b176e]">Results.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between bg-white p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm md:text-base font-light leading-relaxed italic">
                    &quot;{item.quote}&quot;
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-100/70 text-[#5b176e]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-normal text-gray-900">
                      {item.client}
                    </h4>
                    <p className="text-xs font-light text-gray-500">{item.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#5b176e]" />
          <span className="h-2 w-2 rounded-full bg-gray-400" />
          <span className="h-2 w-2 rounded-full bg-gray-400" />
        </div>
      </Container>
    </section>
  );
}
