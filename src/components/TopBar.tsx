"use client";

import Link from "next/link";
import Container from "./Container";

export default function TopBar() {
  return (
    <div
      data-topbar
      className="fixed top-0 left-0 right-0 z-[10000] bg-[#58166f] text-white py-2 text-xs sm:text-sm font-medium"
    >
      <Container className="flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-3 relative">
        
        {/* Announcement Text in Center */}
        <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex items-center gap-1.5 text-center">
          <span className="text-white/95">New: Cold Chain PUF Panels now available -</span>
          <Link
            href="/products"
            className="border border-white px-2 py-0.5 text-xs font-medium text-white hover:bg-white hover:text-[#58166f] transition-all rounded-sm inline-block"
          >
            Explore range
          </Link>
        </div>

        {/* Social Icons on Right */}
        <div className="flex items-center gap-3">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/synergypuf/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm4 5.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5ZM16.75 6a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
              />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@Synergypuf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/people/Synergy-PUF/61593245264043/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Facebook"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
        </div>

      </Container>
    </div>
  );
}
