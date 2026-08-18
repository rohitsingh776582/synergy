"use client";

import React from "react";

export interface ComponentLabel {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  position: "left" | "right";
  topPercent: number;
}

const LABELS: ComponentLabel[] = [
  {
    id: "part-top",
    title: "TOP METAL SHEET",
    subtitle: "Blue corrugated steel profile with trapezoidal ribs",
    tag: "Blue Metallic",
    position: "left",
    topPercent: 12,
  },
  {
    id: "puf-core",
    title: "PU FOAM CORE",
    subtitle: "High density 40±2 kg/m³ rigid polyurethane foam insulation",
    tag: "Yellow PU Foam",
    position: "right",
    topPercent: 44,
  },
  {
    id: "part-bottom",
    title: "BOTTOM SHEET",
    subtitle: "Corrosion-resistant structural steel liner deck",
    tag: "0.5mm Steel Deck",
    position: "left",
    topPercent: 76,
  },
];

interface PUFLabelsProps {
  isReducedMotion?: boolean;
}

export default function PUFLabels({ isReducedMotion = false }: PUFLabelsProps) {
  if (isReducedMotion) {
    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {LABELS.map((item) => (
          <div key={item.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-[#1d4ed8] bg-blue-100 px-1.5 py-0.5 rounded font-medium">
              {item.tag}
            </span>
            <h4 className="text-xs font-semibold text-slate-800 mt-1">{item.title}</h4>
            <p className="text-[11px] text-slate-500">{item.subtitle}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-50 hidden lg:block">
      {LABELS.map((label) => {
        const isLeft = label.position === "left";
        return (
          <div
            key={label.id}
            data-label={label.id}
            className={`absolute flex items-center gap-3 transition-all duration-300 ${
              isLeft ? "-left-16 xl:-left-24 flex-row" : "-right-16 xl:-right-24 flex-row-reverse"
            }`}
            style={{ top: `${label.topPercent}%` }}
          >
            {/* Callout Badge Card */}
            <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-md max-w-[220px] pointer-events-auto hover:border-[#1d4ed8] transition-colors group">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]" />
                <span className="text-[9px] font-mono font-semibold text-[#1d4ed8] uppercase tracking-wider">
                  {label.tag}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-slate-900 leading-tight group-hover:text-[#1d4ed8]">
                {label.title}
              </h4>
              <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{label.subtitle}</p>
            </div>

            {/* Connecting Guide Line */}
            <div className="flex items-center gap-1 opacity-80">
              <div className="w-2 h-2 rounded-full bg-[#1d4ed8] border-2 border-white " />
              <div className="w-10 lg:w-16 h-px bg-gradient-to-r from-[#1d4ed8] to-slate-300 stroke-dasharray-2" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
