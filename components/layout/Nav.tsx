"use client";

import { navLinks, site } from "@/content/site";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(31, 26, 23, 0)", "rgba(31, 26, 23, 0.92)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(250, 245, 238, 0)", "rgba(250, 245, 238, 0.08)"]
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      style={{ backgroundColor: headerBg, borderBottom: `1px solid`, borderColor }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-sm md:text-base text-text shrink-0 hover:text-accent transition-colors"
        >
          {site.name}
        </Link>

        <nav
          className="hidden lg:flex items-center gap-6 text-sm text-muted"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-text transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <p className="section-label text-right max-w-[220px] hidden xl:block text-muted">
            {site.title}
          </p>
          <Link
            href="/#contact"
            className="px-4 py-2 bg-accent text-text text-xs tracking-wide hover:opacity-90 transition-opacity"
          >
            Hire me
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden section-label text-text border border-white/10 px-3 py-2"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden border-t border-white/10 bg-bg/95 backdrop-blur-md px-6 py-6 flex flex-col gap-4"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg text-text"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-2 px-6 py-3 bg-accent text-text text-center text-sm"
            onClick={() => setOpen(false)}
          >
            Hire me
          </Link>
        </nav>
      )}
    </motion.header>
  );
}
