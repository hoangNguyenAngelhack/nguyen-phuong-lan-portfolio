"use client";

import { LINKS, PERSONAL, EMAIL_USER } from "@/mocks";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  { name: "Behance", href: LINKS.behance },
  { name: "Facebook", href: LINKS.facebook },
  { name: "LinkedIn", href: LINKS.linkedin },
];

export const Footer = () => {
  return (
    <footer className="relative z-1 mt-20 border-t border-white/[0.06] sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {/* Big CTA line */}
        <div className="flex flex-col gap-10 border-b border-white/[0.06] pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/40">
              Have a project in mind?
            </p>
            <a
              href={`mailto:${EMAIL_USER}`}
              className="font-display text-4xl leading-tight text-white transition-colors hover:text-[var(--accent)] sm:text-6xl"
            >
              Let&apos;s create
              <br />
              something magical.
            </a>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03] md:self-auto"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-6 pt-10 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {PERSONAL} — Illustration & Visual
            Storytelling
          </span>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
