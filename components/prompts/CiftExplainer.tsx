"use client";

import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    letter: "C",
    title: "Context",
    body: "What's the situation? Numbers, history, constraints. AI can't help if it doesn't know what you're dealing with.",
  },
  {
    letter: "I",
    title: "Intent",
    body: "What do you want AI to do? Analyse? Draft? Compare? Simulate? Be specific about the verb.",
  },
  {
    letter: "F",
    title: "Format",
    body: "How should the output look? Table? Email? Numbered list? Specify or you'll get a wall of text.",
  },
  {
    letter: "T",
    title: "Tone",
    body: "What voice? Firm? Collegial? Sharp? Same content, totally different reception.",
  },
];

export function CiftExplainer() {
  return (
    <section className="mb-9">
      <Reveal>
        <p className="section-label mb-3">the cift framework</p>
        <h2 className="editorial-line text-2xl md:text-3xl text-text mb-6">
          Four things every good prompt has
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.letter} delay={i * 0.05}>
            <div className="bg-card border border-white/5 p-4 md:p-5 h-full">
              <p className="font-serif text-2xl text-accent mb-1">{pillar.letter}</p>
              <p className="section-label text-text mb-2 text-[10px]">
                — {pillar.title}
              </p>
              <p className="text-muted text-xs md:text-sm leading-relaxed">
                {pillar.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
