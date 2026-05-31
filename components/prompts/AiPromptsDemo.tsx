"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { BadGoodComparison } from "./BadGoodComparison";
import { CiftExplainer } from "./CiftExplainer";
import { PromptLibraryGrid } from "./PromptLibraryGrid";

export function AiPromptsDemo() {
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent("Custom AI prompt library for my team")}`;

  return (
    <div className="min-h-screen pt-28 pb-14 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-9">
        <Link
          href="/"
          className="section-label text-muted hover:text-accent transition-colors"
        >
          ← back to portfolio
        </Link>
        <span className="section-label text-muted">demo · interactive · 12 prompts</span>
      </div>

      <BadGoodComparison />
      <CiftExplainer />
      <PromptLibraryGrid />

      <div className="border-t border-white/10 pt-9">
        <h2 className="editorial-line text-2xl md:text-3xl text-text mb-3 max-w-2xl">
          Want a custom prompt library built around your team&apos;s workflow?
        </h2>
        <p className="text-muted text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
          12 prompts is a start. The real value is when these are tuned to your
          industry, your vendors, your customers. Let&apos;s talk.
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          <a href={mailto} className="text-accent hover:underline text-sm">
            {site.contact.email}
          </a>
          <a
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Let's talk")}`}
            className="inline-block px-6 py-3 bg-accent text-text text-sm hover:opacity-90 transition-opacity"
          >
            Hire me — send a message
          </a>
        </div>
        <p className="section-label text-muted">
          Made by {site.name.toLowerCase()} · procurement & marketing strategist ·{" "}
          <Link href="/" className="text-accent hover:underline">
            back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
