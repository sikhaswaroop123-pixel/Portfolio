"use client";

import { marketingSkills, procurementSkills } from "@/content/site";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

function MarqueeRow({
  items,
  direction,
  reduced,
  paused,
}: {
  items: readonly string[];
  direction: "left" | "right";
  reduced: boolean | null;
  paused: boolean;
}) {
  const loop = [...items, ...items];
  const animateClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="py-3 first:border-b first:border-white/5">
      <div className="overflow-hidden mask-fade-marquee">
        {reduced ? (
          <ul className="flex flex-wrap gap-2 px-6 md:px-0">
            {items.map((tag) => (
              <li
                key={tag}
                className="section-label text-muted border border-white/5 px-3 py-1.5"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : (
          <div
            className={`marquee-track flex gap-8 whitespace-nowrap section-label text-muted/90 w-max ${animateClass} ${paused ? "marquee-paused" : ""}`}
          >
            {loop.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="inline-flex items-center gap-8 transition-colors duration-200 hover:text-text"
              >
                {tag}
                <span className="text-accent/70" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SkillsMarquee() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="mt-12 overflow-hidden border-y border-white/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <MarqueeRow
        items={procurementSkills}
        direction="left"
        reduced={reduced}
        paused={paused}
      />
      <MarqueeRow
        items={marketingSkills}
        direction="right"
        reduced={reduced}
        paused={paused}
      />
    </div>
  );
}
