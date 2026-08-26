"use client";

/**
 * Reusable, data-attribute-driven scroll animation engine.
 *
 * Mounted once (see src/components/ScrollAnimations.tsx) and re-scanned on
 * every route change. Elements opt in via data attributes instead of each
 * component writing its own GSAP wiring:
 *
 *   data-lines-reveal   masked line-by-line text reveal (SplitText)
 *   data-fade-in        opacity + y entrance
 *   data-scale-up       scale 0.85 -> 1 + opacity + y entrance (images)
 *   data-parallax       subtle continuous scroll-scrubbed movement
 *   data-hover-image    smooth mouse-follow (lerp) on desktop, disabled on touch
 *   data-stagger        applied to a container -> staggers its direct children
 *
 * Optional modifiers: data-speed, data-delay, data-stagger (numeric, on the
 * stagger container), data-offset.
 *
 * Every element is processed at most once (marked with a `-done` attribute)
 * so re-scans on route change only pick up newly-mounted nodes. Components
 * that already own bespoke GSAP/framer-motion entrance animations (and mark
 * their nodes with other data-* hooks) are simply never given these
 * attributes, so there is no double-animation risk.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

let registered = false;
function ensurePlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("premiumOut", "0.21, 1, 0.34, 1");
  registered = true;
}

const EASE = "premiumOut";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isTouchDevice() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      "ontouchstart" in window)
  );
}

function num(el: HTMLElement, key: string, fallback: number) {
  const raw = el.dataset[key];
  if (raw === undefined || raw === "") return fallback;
  const parsed = parseFloat(raw);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/** Kill ScrollTriggers whose trigger element is no longer in the document (previous route). */
function sweepStaleTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.trigger;
    if (trigger && !document.documentElement.contains(trigger)) {
      st.kill();
    }
  });
}

function initLinesReveal(root: ParentNode) {
  const els = root.querySelectorAll<HTMLElement>(
    "[data-lines-reveal]:not([data-lr-done])"
  );
  els.forEach((el) => {
    el.setAttribute("data-lr-done", "");
    if (!el.textContent?.trim()) return;

    const split = new SplitText(el, {
      type: "lines",
      linesClass: "sa-line",
      mask: "lines",
      reduceWhiteSpace: false,
    });

    const delay = num(el, "delay", 0);
    const stagger = num(el, "stagger", 0.08);

    gsap.set(split.lines, { yPercent: 100, opacity: 0, rotate: 6, transformOrigin: "0% 100%" });

    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(split.lines, {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.85,
          delay,
          stagger,
          ease: EASE,
        });
      },
    });
  });
}

function initFadeIn(root: ParentNode) {
  const els = Array.from(
    root.querySelectorAll<HTMLElement>("[data-fade-in]:not([data-fi-done])")
  );
  if (!els.length) return;
  els.forEach((el) => el.setAttribute("data-fi-done", ""));

  ScrollTrigger.batch(els, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => {
        const target = el as HTMLElement;
        gsap.fromTo(
          target,
          { opacity: 0, y: num(target, "offset", 28) },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: num(target, "delay", 0),
            ease: EASE,
          }
        );
      });
    },
  });
}

function initScaleUp(root: ParentNode) {
  const els = Array.from(
    root.querySelectorAll<HTMLElement>("[data-scale-up]:not([data-su-done])")
  );
  if (!els.length) return;
  els.forEach((el) => el.setAttribute("data-su-done", ""));

  ScrollTrigger.batch(els, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => {
        const target = el as HTMLElement;
        gsap.fromTo(
          target,
          { opacity: 0, y: num(target, "offset", 30), scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: num(target, "delay", 0),
            ease: EASE,
          }
        );
      });
    },
  });
}

function initStagger(root: ParentNode) {
  const containers = root.querySelectorAll<HTMLElement>(
    "[data-stagger]:not([data-sg-done])"
  );
  containers.forEach((container) => {
    container.setAttribute("data-sg-done", "");
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    const staggerAmt = num(container, "stagger", 0.08);
    const delay = num(container, "delay", 0);

    gsap.set(children, { opacity: 0, y: 30, scale: 0.98 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay,
          stagger: staggerAmt,
          ease: EASE,
        });
      },
    });
  });
}

function initParallax(root: ParentNode) {
  if (isTouchDevice() || prefersReducedMotion()) return;
  const els = root.querySelectorAll<HTMLElement>(
    "[data-parallax]:not([data-px-done])"
  );
  els.forEach((el) => {
    el.setAttribute("data-px-done", "");
    const speed = num(el, "speed", 0.12);
    const distance = Math.min(50, 40 * speed);

    gsap.fromTo(
      el,
      { y: -distance },
      {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );
  });
}

function initHoverImage(root: ParentNode) {
  if (isTouchDevice()) return;
  const els = root.querySelectorAll<HTMLElement>(
    "[data-hover-image]:not([data-hi-done])"
  );
  els.forEach((el) => {
    el.setAttribute("data-hi-done", "");
    const strength = num(el, "speed", 14);

    const quickX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      quickX(relX * strength * 2);
      quickY(relY * strength * 2);
    };
    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });
}

/** Scan (a subtree of, or the whole) document and wire up every animation type. */
export function runScrollAnimations(root: ParentNode = document) {
  ensurePlugins();
  if (typeof window === "undefined") return;

  sweepStaleTriggers();

  const reduced = prefersReducedMotion();

  if (reduced) {
    // Reveal everything immediately, skip motion entirely.
    root
      .querySelectorAll<HTMLElement>(
        "[data-lines-reveal], [data-fade-in], [data-scale-up], [data-stagger]"
      )
      .forEach((el) => {
        el.setAttribute("data-lr-done", "");
        el.setAttribute("data-fi-done", "");
        el.setAttribute("data-su-done", "");
        el.setAttribute("data-sg-done", "");
      });
    return;
  }

  initLinesReveal(root);
  initFadeIn(root);
  initScaleUp(root);
  initStagger(root);
  initParallax(root);
  initHoverImage(root);

  requestAnimationFrame(() => ScrollTrigger.refresh());
}
