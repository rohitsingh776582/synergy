"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
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
  const [topOffset, setTopOffset] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(112);
  const [onWhiteBg, setOnWhiteBg] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mounted = useSyncExternalStore(emptySubscribe, getMountedSnapshot, getMountedServerSnapshot);
  const rawPathname = usePathname();

  const pathname = mounted ? rawPathname : "";
  const isHome = rawPathname === "/";

  useLayoutEffect(() => {
    const update = () => {
      const topbar = document.querySelector<HTMLElement>("[data-topbar]");
      const topbarH = topbar ? topbar.offsetHeight : 0;
      const navH = navRef.current ? navRef.current.offsetHeight : 72;
      setTopOffset(topbarH);
      setHeaderHeight(topbarH + navH);
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${topbarH + navH}px`
      );
    };

    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    const topbar = document.querySelector("[data-topbar]");
    if (topbar) ro.observe(topbar);
    if (navRef.current) ro.observe(navRef.current);

    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  // Home hero image => white text; white page sections => black text
  useLayoutEffect(() => {
    if (!isHome) {
      setOnWhiteBg(true);
      return;
    }

    setOnWhiteBg(false);

    const hero = document.getElementById("home-hero");
    if (!hero) return;

    const update = () => {
      const headerBottom = navRef.current
        ? navRef.current.getBoundingClientRect().bottom
        : headerHeight;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setOnWhiteBg(heroBottom <= headerBottom + 4);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome, headerHeight]);

  const light = !isHome || onWhiteBg;

  return (
    <>
      <header
        ref={navRef}
        data-site-header
        className={`fixed left-0 right-0 z-[9999] w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          light
            ? "bg-white border-gray-100 shadow-sm"
            : "bg-transparent border-transparent shadow-none"
        }`}
        style={{ top: topOffset }}
      >
        <nav className="w-full bg-transparent py-3">
          <Container className="flex items-center justify-between">
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

            <div className="hidden lg:flex items-center h-[60px] rounded-[4px] py-[5px] pl-[5px] pr-0 bg-transparent">
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
                        whitespace-nowrap
                        transition-colors duration-300
                        after:absolute
                        after:left-[17px]
                        after:right-[17px]
                        after:bottom-[9px]
                        after:h-[2px]
                        after:transition-all
                        after:duration-200
                        ${
                          light
                            ? "text-black hover:text-[#3E0F4D] after:bg-[#3E0F4D]"
                            : "text-white hover:text-white/80 after:bg-white"
                        }
                        ${isActive ? "after:opacity-100" : "after:opacity-0"}
                      `}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/quote"
                className={`
                  ml-[8px]
                  h-[44px]
                  px-5
                  flex
                  items-center
                  gap-2
                  rounded-[5px]
                  text-[15px]
                  font-medium
                  whitespace-nowrap
                  transition-colors duration-300
                  ${
                    light
                      ? "bg-[#3E0F4D] text-white hover:bg-[#5b176e]"
                      : "bg-white text-[#3E0F4D] hover:bg-white/90"
                  }
                `}
              >
                <span>Start your quote</span>
                <ArrowUpRight size={20} strokeWidth={1.8} />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`
                p-2
                rounded-md
                transition-colors duration-300
                lg:hidden
                ${
                  light
                    ? "text-[#5b176e] hover:bg-purple-50"
                    : "text-white hover:bg-white/10"
                }
              `}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </Container>
        </nav>

        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navItems={navItems}
          pathname={pathname}
        />
      </header>

      <div className="w-full shrink-0" style={{ height: headerHeight }} aria-hidden />
    </>
  );
}
