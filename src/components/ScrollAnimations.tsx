"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { runScrollAnimations } from "@/lib/scrollAnimations";

/**
 * Mounts the reusable data-attribute scroll animation engine.
 * Re-scans the document on every route change (new page content mounts
 * with fresh data-* attributes; already-processed nodes are skipped).
 */
export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => runScrollAnimations(document));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
