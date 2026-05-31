"use client";

import {
  assemblePromptFromLibrary,
  type CiftPrompt,
} from "@/data/promptLibrary";
import { EASE_OUT } from "@/components/ui/motionPresets";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

type PromptCardProps = {
  prompt: CiftPrompt;
};

function CiftField({ label, value }: { label: string; value: string }) {
  const isContext = label === "Context";

  return (
    <p className="text-sm leading-relaxed mb-2 last:mb-0">
      <span className="section-label text-accent text-[10px] block mb-0.5">
        {label}
      </span>
      <span className={isContext ? "text-muted italic" : "text-text/90"}>
        {value}
      </span>
    </p>
  );
}

export function PromptCard({ prompt }: PromptCardProps) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyPrompt = useCallback(async () => {
    const text = assemblePromptFromLibrary(prompt);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [prompt]);

  const tagLine = [prompt.category, `${prompt.stakes} stakes`].join(" · ");

  return (
    <motion.article
      className="bg-card border border-white/5 p-5 md:p-6 h-full flex flex-col transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_8px_24px_rgba(184,84,46,0.12)]"
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
    >
      <p className="section-label text-muted text-[10px] mb-3">{tagLine}</p>
      <h3 className="font-serif text-[17px] text-text mb-4 leading-snug">
        {prompt.useCase}
      </h3>

      <div className="flex-grow mb-5">
        <CiftField label="Context" value={prompt.context} />
        <CiftField label="Intent" value={prompt.intent} />
        <CiftField label="Format" value={prompt.format} />
        <CiftField label="Tone" value={prompt.tone} />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={copyPrompt}
          className="px-3 py-1.5 border border-accent/50 text-accent text-[10px] font-mono uppercase tracking-wide hover:bg-accent/10 transition-colors"
        >
          {copied ? "copied ✓" : "Copy full prompt"}
        </button>
      </div>
    </motion.article>
  );
}
