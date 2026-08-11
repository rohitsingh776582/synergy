"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Container from "./Container";

const emptySubscribe = () => () => {};
const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

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
  const mounted = useSyncExternalStore(emptySubscribe, getMountedSnapshot, getMountedServerSnapshot);
  const rawPathname = usePathname();

  const pathname = mounted ? rawPathname : "";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <nav className="w-full bg-white py-3">
        <Container className="flex items-center justify-between">
        {/* =========================
            LOGO
        ========================== */}
        <Link
          href="/"
          className="relative shrink-0 inline-flex items-center"
          aria-label="Synergy PUF Home"
        >
          <Image
            src="/images/logo/puf-logo.png"
            alt="Synergy PUF"
            width={140}
            height={40}
            priority
            className="h-7 sm:h-8 w-auto object-contain"
          />
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
    py-[5px]
    pl-[5px]
    pr-0
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
      h-[44px]
      px-5
      flex
      items-center
      gap-2
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
              size={20}
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