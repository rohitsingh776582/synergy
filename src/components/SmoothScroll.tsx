"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide premium smooth scroll (Lenis) + ScrollTrigger sync.
 * Uses window scrolling (no transform wrapper) so position:fixed /
 * sticky (Navbar, TopBar, WhyChooseUs) keep working.
 * Mobile / reduced-motion → native scroll.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const tickRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const teardown = () => {
      if (tickRef.current) {
        gsap.ticker.remove(tickRef.current);
        tickRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };

    const setup = () => {
      teardown();

      if (reducedMotion.matches || mobileQuery.matches) {
        ScrollTrigger.refresh();
        return;
      }

      const lenis = new Lenis({
        // Default wrapper = window → fixed/sticky stay correct
        lerp: 0.07,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
        autoRaf: false,
        anchors: true,
      });

      lenisRef.current = lenis;
      document.documentElement.classList.add("lenis", "lenis-smooth");

      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      tickRef.current = onTick;
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    setup();

    const onMediaChange = () => setup();
    reducedMotion.addEventListener("change", onMediaChange);
    mobileQuery.addEventListener("change", onMediaChange);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      reducedMotion.removeEventListener("change", onMediaChange);
      mobileQuery.removeEventListener("change", onMediaChange);
      window.removeEventListener("resize", onResize);
      teardown();
      gsap.ticker.lagSmoothing(500);
      ScrollTrigger.refresh();
    };
  }, []);

  // Refresh Lenis + ScrollTrigger on every route (About, Home, etc.)
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    }
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
