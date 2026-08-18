"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroVideoBackgroundProps {
  src: string;
}

export default function HeroVideoBackground({ src }: HeroVideoBackgroundProps) {
  return (
    <motion.div
      initial={{
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        clipPath: "circle(150% at 50% 50%)",
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 3.2,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden"
      aria-hidden
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover object-center"
      >
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  );
}
