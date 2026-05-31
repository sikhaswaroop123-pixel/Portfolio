"use client";

import { specialisms, whatIDoIntro } from "@/content/whatIDo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";

export function WhatIDo() {
  return (
    <SectionShell id="what-i-do" label="05 · what i do">
      <Reveal>
        <p className="text-muted text-lg max-w-3xl mb-8 -mt-2 leading-relaxed">
          {whatIDoIntro.subtitle}
        </p>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {specialisms.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06}>
            <article className="bg-card border border-white/5 p-6 md:p-8 h-full flex flex-col hover:border-white/10 transition-colors">
              <h3 className="font-serif text-xl text-accent mb-3">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>
              <ul className="space-y-2 border-t border-white/5 pt-4">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-text/80 text-xs md:text-sm leading-relaxed pl-3 border-l border-accent/40"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
