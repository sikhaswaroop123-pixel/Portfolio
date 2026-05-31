"use client";

import type { BiggestLeak } from "@/lib/p2p/types";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type BiggestLeakCalloutProps = {
  leak: BiggestLeak;
  resetKey: string | number;
};

export function BiggestLeakCallout({ leak, resetKey }: BiggestLeakCalloutProps) {
  const reduced = useReducedMotion();
  const [pulsed, setPulsed] = useState(false);

  useEffect(() => {
    setPulsed(false);
    if (reduced) return;
    const t = setTimeout(() => setPulsed(true), 100);
    return () => clearTimeout(t);
  }, [resetKey, reduced]);

  return (
    <motion.div
      key={resetKey}
      initial={false}
      animate={
        !reduced && !pulsed
          ? { boxShadow: "0 0 0 rgba(184,84,46,0)" }
          : !reduced
            ? {
                boxShadow: [
                  "0 0 0 rgba(184,84,46,0)",
                  "0 0 20px rgba(184,84,46,0.15)",
                  "0 0 0 rgba(184,84,46,0)",
                ],
              }
            : {}
      }
      transition={{ duration: 1.2, times: [0, 0.5, 1] }}
      className="bg-card border border-white/5 border-l-4 border-l-accent p-5 md:p-6 mb-9"
    >
      <p className="section-label mb-2">biggest leak</p>
      <h3 className="editorial-line text-xl md:text-2xl text-text mb-3 leading-snug">
        {leak.headline}
      </h3>
      <p className="text-muted text-sm md:text-base leading-relaxed">{leak.body}</p>
    </motion.div>
  );
}
