"use client";

import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-heading"
      className="py-14 md:py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/5"
    >
      <SectionHeading
        label="02 · introduction"
        title={site.coreStory}
        titleId="intro-heading"
        className="mb-6"
      />
      <Reveal>
        <p className="editorial-line text-3xl md:text-4xl lg:text-5xl text-text max-w-5xl leading-snug mb-6">
          {site.coreStory}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="section-label text-muted/80 tracking-widest">
          {site.experienceNote}
        </p>
      </Reveal>
    </section>
  );
}
