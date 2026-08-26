"use client";

import { useEffect } from "react";

export default function MediaDeferral() {
  useEffect(() => {
    const handleDeferral = () => {
      const deferredIframes = document.querySelectorAll<HTMLIFrameElement>("iframe[data-src]");
      deferredIframes.forEach((iframe) => {
        const realSrc = iframe.dataset.src;
        if (realSrc && !iframe.src) {
          iframe.src = realSrc;
        }
      });
    };

    // Load deferred media after 2 seconds or on first user interaction
    const timer = setTimeout(handleDeferral, 2000);

    const onInteraction = () => {
      handleDeferral();
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("mousemove", onInteraction);
    };

    window.addEventListener("scroll", onInteraction, { passive: true });
    window.addEventListener("touchstart", onInteraction, { passive: true });
    window.addEventListener("mousemove", onInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("mousemove", onInteraction);
    };
  }, []);

  return null;
}
