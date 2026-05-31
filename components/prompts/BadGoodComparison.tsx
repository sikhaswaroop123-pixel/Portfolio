"use client";

import { Reveal } from "@/components/ui/Reveal";

export function BadGoodComparison() {
  return (
    <section className="mb-9">
      <Reveal>
        <p className="section-label mb-3">the framework</p>
        <h2 className="editorial-line text-2xl md:text-3xl text-text mb-6 max-w-3xl leading-snug">
          Most AI prompts are bad. Here&apos;s one that isn&apos;t.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Reveal delay={0.05}>
          <div className="bg-card border border-white/5 p-5 md:p-6 h-full">
            <p className="section-label text-muted mb-4">❌ a bad prompt</p>
            <p className="text-muted text-sm md:text-base leading-relaxed italic">
              &ldquo;Help me negotiate with my supplier.&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-card border border-accent/30 p-5 md:p-6 h-full shadow-[0_0_20px_rgba(184,84,46,0.08)]">
            <p className="section-label text-accent mb-4">✓ a great prompt</p>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                <span className="section-label text-accent text-[10px] block mb-1">
                  Context
                </span>
                <span className="text-text/90">
                  My supplier wants a 15% increase citing material costs. We&apos;ve been
                  with them 3 years, spend £200K/year, have one alternative quote 8%
                  cheaper.
                </span>
              </p>
              <p>
                <span className="section-label text-accent text-[10px] block mb-1">
                  Intent
                </span>
                <span className="text-text/90">
                  Help me prepare 3 negotiation paths — hold the line, partial
                  concession, walk away — with the strongest case for each.
                </span>
              </p>
              <p>
                <span className="section-label text-accent text-[10px] block mb-1">
                  Format
                </span>
                <span className="text-text/90">
                  3 numbered options + a recommended best path with one-paragraph
                  justification.
                </span>
              </p>
              <p>
                <span className="section-label text-accent text-[10px] block mb-1">
                  Tone
                </span>
                <span className="text-text/90">
                  Strategic, firm, relationship-aware.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl">
          Same question. Wildly different answer. The framework that makes the
          difference is below.
        </p>
      </Reveal>
    </section>
  );
}
