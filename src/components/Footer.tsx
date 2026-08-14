
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Container from "./Container";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    mass: 0.2,
    restDelta: 0.001,
  });

  // Parallax upward shift & continuous scroll-driven text opacity
  const y = useTransform(smoothProgress, [0, 1], ["-15%", "0%"]);

  const opacity = useTransform(
    smoothProgress,
    [0, 0.1, 1],
    [0, 0.1, 1]
  );

  return (
    <div
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#e6e6e8] pt-16 sm:pt-24 lg:pt-32"
    >
      <motion.footer
        style={{ y, opacity }}
        className="bg-[#e6e6e8] pt-12 text-gray-700 font-sans md:pt-14 will-change-transform transform-gpu"
      >
        <Container>

          {/* Upper Footer Grid */}


          {/* Upper Footer Grid */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16">

  {/* Column 1 - Left aligned with Navbar Logo */}
  <div className="space-y-4">

    {/* Email */}
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
        <Mail className="w-4 h-4" />
      </div>

      <a
        href="mailto:sales@synergypuf.com"
        className="text-sm font-semibold text-gray-800 hover:text-[#5b176e] transition-colors"
      >
        sales@synergypuf.com
      </a>
    </div>

    {/* Phone */}
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
        <Phone className="w-4 h-4" />
      </div>

      <a
        href="tel:+919988118888"
        className="text-sm font-bold text-gray-800 hover:text-[#5b176e] transition-colors"
      >
        +91 9988118888
      </a>
    </div>

    {/* Social Icons */}
    <div className="pt-2 flex items-center gap-2.5">

      {/* Instagram */}
      <a
        href="#"
        className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Instagram"
      >
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="#"
        className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="LinkedIn"
      >
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="#"
        className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Facebook"
      >
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      </a>

    </div>
  </div>

  {/* Column 2 */}
  <div>
    <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-800 mb-4">
      POPULAR SEARCHES
    </h3>

    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600">
      <li>
        <Link
          href="/products/puf-wall-panels"
          className="hover:text-[#5b176e]"
        >
          PUF Wall Panel
        </Link>
      </li>

      <li>
        <Link
          href="/products/puf-roof-panels"
          className="hover:text-[#5b176e]"
        >
          Roof Panels
        </Link>
      </li>

      <li>
        <Link
          href="/products"
          className="hover:text-[#5b176e]"
        >
          PUF Panels
        </Link>
      </li>

      <li>
        <Link
          href="/products"
          className="hover:text-[#5b176e]"
        >
          Sandwich Panels
        </Link>
      </li>

      <li>
        <Link
          href="/products"
          className="hover:text-[#5b176e]"
        >
          Heat Insulated Panels
        </Link>
      </li>
    </ul>
  </div>

  {/* Column 3 */}
  <div>
    <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-800 mb-4">
      GROUP COMPANIES
    </h3>

    <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-600">
      <li>
        <a href="#" className="hover:text-[#5b176e]">
          Synergy Thrislington
        </a>
      </li>

      <li>
        <a href="#" className="hover:text-[#5b176e]">
          Synergy LGSF
        </a>
      </li>

      <li>
        <a href="#" className="hover:text-[#5b176e]">
          Synergy PEB
        </a>
      </li>

      <li>
        <a href="#" className="hover:text-[#5b176e]">
          Synergy Construction
        </a>
      </li>
    </ul>
  </div>

  {/* Column 4 - Right aligned with Navbar button */}
  <div className="flex flex-col items-start md:items-end">
    <div className="w-fit">

      <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-800 mb-3">
        A VENTURE BY
      </h3>

      <Image
        src="/images/logo/Group-Logo.png"
        alt="Synergy Group"
        width={180}
        height={50}
        className="h-10 w-auto object-contain object-left md:object-right"
      />

    </div>
  </div>

</div>
          
         
          {/* Middle Footer */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-gray-300/80">

            {/* Logo - LEFT */}
            <div className="md:col-span-5 flex items-center">
              <Image
                src="/images/logo/PUF-Logo%201.png"
                alt="Synergy PUF"
                width={220}
                height={66}
                className="h-12 w-auto object-contain object-left sm:h-14"
              />
            </div>

            {/* RIGHT SIDE */}
            {/* Right edge is aligned with the right edge of Start your quote */}
            <div className="md:col-span-7 flex justify-end">
              <div className="w-full flex flex-col sm:flex-row justify-end items-start gap-8 sm:gap-12">

                {/* Corporate Office */}
                <div className="text-xs sm:text-sm font-medium text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />

                    <div>
                      <span className="font-bold text-gray-900 block text-base mb-1">
                        Corporate Office
                      </span>

                      <p className="leading-relaxed">
                        C-148, Phase 7, Industrial Area
                        <br />
                        Sector 73, SAS Nagar
                        <br />
                        Punjab 160055
                      </p>
                    </div>
                  </div>
                </div>

                {/* Manufacturing Unit */}
                <div className="text-xs sm:text-sm font-medium text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />

                    <div>
                      <span className="font-bold text-gray-900 block text-base mb-1">
                        Manufacturing Unit
                      </span>

                      <p className="leading-relaxed">
                        VPO Manjholi, Tehsil Nalagarh
                        <br />
                        District Solan
                        <br />
                        HP 174010, India
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </Container>

        {/* Copyright Bar */}
        <div className="bg-[#4d135d] text-white py-3.5 text-xs font-medium">
          <Container className="flex flex-col sm:flex-row justify-between items-center gap-2">

            <div>
              © 2025 Synergy PUF. All rights reserved.
            </div>

            <div className="flex items-center gap-6 text-purple-100">
              <Link
                href="/terms"
                className="hover:text-white"
              >
                Terms of Use
              </Link>

              <Link
                href="/privacy"
                className="hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>

          </Container>
        </div>

      </motion.footer>
    </div>
  );
}