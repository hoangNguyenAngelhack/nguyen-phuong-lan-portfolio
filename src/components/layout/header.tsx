"use client";

import { cn } from "@/lib/utils";
import { LINKS, PERSONAL } from "@/mocks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const menu = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-500",
        scrolled
          ? "py-3 bg-[#07070a]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "py-4 bg-transparent border-b border-transparent md:py-6"
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-sm font-bold text-white shadow-[0_8px_30px_var(--accent-glow)]">
            NL
          </span>
          <span className="hidden text-sm font-medium uppercase tracking-[0.25em] text-white/80 transition-colors group-hover:text-white sm:inline">
            {PERSONAL}
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {menu.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "text-white" : "text-white/55 hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={LINKS.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-white/55 transition-colors hover:text-white sm:inline"
          >
            Behance
          </a>
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Let&apos;s talk</span>
          </Link>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="mt-3 flex items-center justify-center gap-1.5 px-4 md:hidden">
        {menu.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition-colors",
                active
                  ? "bg-white/[0.08] text-white ring-1 ring-white/10"
                  : "text-white/55"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
};
