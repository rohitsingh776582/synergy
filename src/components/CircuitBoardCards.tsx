"use client";

import React from "react";
import CircuitCard from "./CircuitCard";
import Container from "./Container";

const sampleCards = [
  {
    badge: "CUSTODY",
    title: "Institutional Custody",
    description:
      "Military-grade MPC key management and hardware security module integration for multi-chain digital asset protection.",
    variant: 1 as const,
    href: "#custody",
  },
  {
    badge: "ISSUANCE",
    title: "Token Issuance Engine",
    description:
      "Automated smart contract deployment and compliance workflows for tokenized real-world assets and securities.",
    variant: 2 as const,
    href: "#issuance",
  },
  {
    badge: "STAKING",
    title: "Validator Node Network",
    description:
      "High-availability non-custodial staking infrastructure with 99.99% uptime SLA across major proof-of-stake protocols.",
    variant: 3 as const,
    href: "#staking",
  },
];

export default function CircuitBoardCards() {
  return (
    <section className="w-full bg-[#03091e] py-16">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Infrastructure Layer
          </span>
          <h2 data-lines-reveal className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            Next-Gen Microchip Architecture
          </h2>
          <p data-fade-in data-delay="0.15" className="text-blue-200/70 max-w-2xl text-sm sm:text-base">
            High-performance crypto infrastructure powered by custom PCB trace circuits
            and real-time hardware telemetry.
          </p>
        </div>

        {/* Horizontal Row / Responsive Grid */}
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {sampleCards.map((card, idx) => (
            <CircuitCard
              key={idx}
              badge={card.badge}
              title={card.title}
              description={card.description}
              variant={card.variant}
              href={card.href}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
