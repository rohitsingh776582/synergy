"use client";

import { useState } from "react";
import { Target, Eye, Award } from "lucide-react";
import Container from "./Container";

const items = [
  {
    title: "Our Mission",
    icon: Target,
    body: "To engineer world-class, energy-efficient PUF insulation systems that empower businesses to optimize thermal control, reduce carbon footprint, and lower operational energy expenses across India and global markets.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    body: "To be the undisputed leader and most trusted brand in thermal insulation and modular panel engineering, known for zero-defect quality, rapid dispatch capabilities, and continuous innovation.",
  },
  {
    title: "Our Promise",
    icon: Award,
    body: "Consistent quality, on-time delivery, and engineering support that keeps every project insulated, efficient, and built to last.",
  },
] as const;

export default function MissionVisionPromise() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#f4f4f7] py-14 md:py-16">
      <Container>
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
          style={{ perspective: "900px" }}
        >
          {items.map(({ title, icon: Icon, body }, index) => {
            const isActive = hovered === index;
            const isDimmed = hovered !== null && !isActive;

            return (
              <div
                key={title}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`relative border border-gray-200 bg-white p-6 transition-[transform,box-shadow] duration-300 ease-out will-change-transform ${
                  isActive ? "z-20 shadow-md" : "z-0 shadow-none"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isActive
                    ? "translateZ(24px) scale(1.03)"
                    : isDimmed
                      ? "translateZ(-36px) scale(0.96)"
                      : "translateZ(0) scale(1)",
                }}
              >
                <div className="mb-4 inline-flex bg-purple-100 p-2.5 text-[#5b176e]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-600">
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
