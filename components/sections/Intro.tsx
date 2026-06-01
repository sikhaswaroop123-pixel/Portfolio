"use client";

import { site } from "@/content/site";
import { twoHalves } from "@/content/twoHalves";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function HalfStrip({
  title,
  items,
  description,
}: {
  title: string;
  items: readonly string[];
  description: string;
}) {
  return (
    <div className="bg-card/40 border border-white/5 p-4 md:p-5 h-full">
      <p className="section-label text-accent mb-2 text-[10px]">{title}</p>
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {items.map((item) => (
          <span
            key={item}
            className="section-label text-muted/90 border border-white/5 px-2 py-0.5 text-[10px]"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="text-muted text-xs leading-relaxed">{description}</p>
    </div>
  );
}

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
      <Reveal delay={0.08}>
        <p className="section-label text-muted/80 tracking-widest mb-8">
          {site.experienceNote}
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-4xl">
          <HalfStrip
            title={twoHalves.moneyBrain.title}
            items={twoHalves.moneyBrain.items}
            description={twoHalves.moneyBrain.description}
          />
          <HalfStrip
            title={twoHalves.customerBrain.title}
            items={twoHalves.customerBrain.items}
            description={twoHalves.customerBrain.description}
          />
        </div>
      </Reveal>
    </section>
  );
}
