import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Horizontal padding aligned with the Navbar (single source of truth):
 * - Mobile: 20px (px-5)
 * - Tablet: 40px (md:px-10)
 * - Desktop: 50px (lg:px-[50px])
 */
export const CONTAINER_PADDING = "px-5 md:px-10 lg:px-[50px]";

/**
 * Global layout container that defines the uniform left and right boundaries
 * across the entire website for logo, text, headings, cards, and footers.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full ${CONTAINER_PADDING} ${className}`}>
      {children}
    </div>
  );
}
