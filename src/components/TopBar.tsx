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
            href="https://www.instagram.com/synergypuf?igsi=dW80Z2k5dDZlOTZy&utm_source=qr"
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
            href="#"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/posts/synergypuf-pufpanels-insulatedpanels-share-7503790976856133632-AcNp/?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAAFfGTboBkjOh_pA-foMZTXSlvywtL7Bs6pY"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61593245264043"
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
