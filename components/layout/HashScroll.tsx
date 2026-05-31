"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HEADER_OFFSET = 88;

function scrollToHash(retry = 0) {
  const hash = window.location.hash;
  if (!hash) return;

  const id = hash.slice(1);
  const el = document.getElementById(id);
  if (!el) {
    if (retry < 12) {
      window.setTimeout(() => scrollToHash(retry + 1), 50);
    }
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHash();
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
