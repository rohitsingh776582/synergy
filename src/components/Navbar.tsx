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
  const isAbout = rawPathname === "/about";
  const isHeroPage = isHome || isAbout;

  useLayoutEffect(() => {
    const update = () => {
      const topbar = document.querySelector<HTMLElement>("[data-topbar]");
      const topbarH = topbar ? topbar.offsetHeight : 0;
      // Keep navbar height stable across pages (logo must not stretch the bar)
      const navH = 72;
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

    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  // Home & About hero images => white text; white page sections => black text
  useLayoutEffect(() => {
    if (!isHeroPage) {
      setOnWhiteBg(true);
      return;
    }

    setOnWhiteBg(false);

    const hero = isHome
      ? document.getElementById("home-hero")
      : isAbout
      ? document.getElementById("about-hero") || document.querySelector("section")
      : document.querySelector("section");
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
  }, [isHeroPage, isHome, isAbout, headerHeight]);

  const light = !isHeroPage || onWhiteBg;

  return (
    <>
      <header
        ref={navRef}
        data-site-header
        className={`fixed left-0 right-0 z-[9999] h-[72px] w-full transition-[background-color] duration-300 ${
          light ? "overflow-hidden bg-white" : "overflow-visible bg-transparent"
        }`}
        style={{ top: topOffset }}
      >
        <nav className="flex h-full w-full items-center bg-transparent">
          <Container className="flex h-full items-center justify-between">
            <Link
              href="/"
              className={`relative z-10 flex shrink-0 items-center ${
                light
                  ? "h-10 w-[148px] overflow-hidden sm:h-11 sm:w-[168px]"
                  : "h-11 w-[200px] overflow-visible sm:w-[230px]"
              }`}
              aria-label="Synergy PUF Home"
            >
              <Image
                src={
                  light
                    ? "/images/logo/puf-logo.png"
                    : "/images/logo/synergy%20white%20logo.png"
                }
                alt="Synergy PUF"
                width={400}
                height={120}
                priority
                className={
                  light
                    ? "h-full w-full object-contain object-left"
                    : "absolute left-0 top-1/2 h-[calc(4.75rem-55px)] w-auto max-w-none -translate-y-1/2 object-contain object-left sm:h-[calc(5.5rem-55px)]"
                }
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

      {!isAbout && <div className="w-full shrink-0" style={{ height: headerHeight }} aria-hidden />}
    </>
  );
}
