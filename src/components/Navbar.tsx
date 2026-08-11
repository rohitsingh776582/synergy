"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Container from "./Container";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Applications", href: "/applications" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rawPathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = mounted ? rawPathname : "";

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <nav className="w-full h-[97px] bg-white">
        <Container className="flex h-full items-center justify-between">
        {/* =========================
            LOGO
        ========================== */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
        >
          {/* 3 Horizontal Bar Emblem */}
          <div className="flex flex-col gap-1 shrink-0">
            <span className="block h-[5px] w-10 bg-[#5b176e] rounded-xs" />
            <span className="block h-[5px] w-10 bg-[#888888] rounded-xs" />
            <span className="block h-[5px] w-10 bg-[#5b176e] rounded-xs" />
          </div>

          {/* Logo Text */}
          <div className="leading-none">
            <div className="text-xl font-bold tracking-wider text-[#5b176e]">
              SYNERGY
            </div>

            <div className="mt-1 flex items-center justify-between gap-1 text-[10px] font-semibold text-gray-500 tracking-[3px]">
              <span className="h-[1px] w-3 bg-[#5b176e]" />
              <span>PUF</span>
              <span className="h-[1px] w-3 bg-[#5b176e]" />
            </div>
          </div>
        </Link>

        {/* =========================
            DESKTOP RIGHT NAV
        ========================== */}
        <div
          className="
    hidden
    lg:flex
    items-center
    h-[60px]
    bg-white
    rounded-[4px]
    p-[5px]
  "
        >
          {/* Navigation Links */}
          <div className="flex items-center">

            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
        relative
        px-[17px]
        py-[18px]
        text-[15px]
        leading-none
        font-normal
        text-black
        whitespace-nowrap
        transition-colors
        hover:text-[#3E0F4D]

        after:absolute
        after:left-[17px]
        after:right-[17px]
        after:bottom-[9px]
        after:h-[2px]
        after:bg-[#3E0F4D]
        after:transition-all
        after:duration-200

        ${isActive
                      ? "after:opacity-100"
                      : "after:opacity-0"
                    }
      `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            href="/quote"
            className="
      ml-[8px]
      h-[54px]
      min-w-[269px]
      px-[27px]
      flex
      items-center
      justify-between
      rounded-[5px]
      bg-[#3E0F4D]
      text-white
      text-[15px]
      font-medium
      whitespace-nowrap
      transition-colors
      hover:bg-[#5b176e]
    "
          >
            <span>Start your quote</span>

            <ArrowUpRight
              size={27}
              strokeWidth={1.8}
            />
          </Link>
        </div>
        {/* =========================
            MOBILE MENU
        ========================== */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="
            p-2
            text-[#5b176e]
            hover:bg-purple-50
            rounded-md
            transition-colors
            lg:hidden
          "
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
        </Container>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        pathname={pathname}
      />
    </header>
  );
}