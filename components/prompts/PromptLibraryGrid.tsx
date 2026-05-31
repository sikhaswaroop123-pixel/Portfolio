"use client";

import {
  PROMPT_FILTERS,
  filterPrompts,
  promptLibrary,
  type PromptFilter,
} from "@/data/promptLibrary";
import { Reveal } from "@/components/ui/Reveal";
import { useMemo, useState } from "react";
import { PromptCard } from "./PromptCard";

export function PromptLibraryGrid() {
  const [filter, setFilter] = useState<PromptFilter>("All");

  const filtered = useMemo(
    () => filterPrompts(promptLibrary, filter),
    [filter]
  );

  return (
    <section className="mb-9">
      <Reveal>
        <p className="section-label mb-3">the library · 12 prompts</p>
        <h2 className="editorial-line text-2xl md:text-3xl text-text mb-6">
          Try one. Steal one. Adapt one.
        </h2>
      </Reveal>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 scrollbar-thin">
        {PROMPT_FILTERS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setFilter(chip)}
            className={`shrink-0 px-3 py-1.5 section-label text-[10px] border transition-colors duration-200 ${
              filter === chip
                ? "border-accent bg-accent/15 text-accent"
                : "border-white/10 text-muted hover:border-accent/40 hover:text-text"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {filtered.map((prompt, i) => (
          <Reveal key={prompt.id} delay={i * 0.03}>
            <PromptCard prompt={prompt} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
