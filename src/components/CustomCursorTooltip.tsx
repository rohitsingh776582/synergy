"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursorTooltip() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.2, ease: "power2.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.2, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");

      if (cursorTarget) {
        const type = cursorTarget.dataset.cursor || "view";
        setLabel(type);
        gsap.to(el, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)" });
      } else {
        gsap.to(el, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 px-3 py-1.5 rounded-full bg-[#5b176e] text-white text-xs font-extrabold uppercase tracking-widest shadow-2xl scale-0 opacity-0 transform-gpu"
    >
      {label}
    </div>
  );
}
