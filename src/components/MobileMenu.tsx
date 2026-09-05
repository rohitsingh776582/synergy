"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, navItems, pathname }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
      <div className="w-[85%] max-w-sm bg-white h-full p-6 flex flex-col justify-between overflow-y-auto  animate-in slide-in-from-right duration-300">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-[#5b176e] flex items-center justify-center text-white font-bold text-xs">
                S
              </div>
              <span className="text-lg font-bold text-[#5b176e] tracking-wider">
                SYNERGY PUF
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`rounded-2xl px-5 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#5b176e] text-white "
                      : "text-gray-700 hover:bg-purple-50 hover:text-[#5b176e]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <Link
            href="/quote"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-[#5b176e] py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#461056] transition-colors"
          >
            <span>Get Instant Quote</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
