"use client";

import { CountUp } from "@/components/ui/CountUp";
import type { P2PKpis } from "@/lib/p2p/types";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT, VIEWPORT_ONCE } from "@/components/ui/motionPresets";
import { useRef } from "react";
import { useInView } from "framer-motion";

type KpiTilesProps = {
  kpis: P2PKpis;
  resetKey: string | number;
};

const tiles = [
  {
    key: "cycle",
    label: "Average cycle time",
    caption: "requisition to current stage",
    kind: "days" as const,
    getValue: (k: P2PKpis) => k.avgCycleDays,
  },
  {
    key: "stuck",
    label: "POs stuck > 7 days",
    caption: "non-paid POs sitting too long",
    kind: "number" as const,
    getValue: (k: P2PKpis) => k.stuckCount,
  },
  {
    key: "idle",
    label: "£ value sitting idle",
    caption: "stuck POs total value",
    kind: "currency" as const,
    getValue: (k: P2PKpis) => k.idleValue,
  },
];

function KpiValue({
  kind,
  value,
  resetKey,
  delay,
}: {
  kind: "days" | "number" | "currency";
  value: number;
  resetKey: string | number;
  delay: number;
}) {
  if (kind === "days") {
    return (
      <span className="inline-flex items-baseline gap-1">
        <CountUp
          value={value}
          format="decimal"
          resetKey={resetKey}
          delay={delay}
          className="font-serif text-3xl md:text-[2rem] text-accent tabular-nums leading-none"
        />
        <span className="font-serif text-lg md:text-xl text-muted/75 tabular-nums leading-none">
          days
        </span>
      </span>
    );
  }

  return (
    <CountUp
      value={value}
      format={kind}
      resetKey={resetKey}
      delay={delay}
      className="font-serif text-3xl md:text-[2rem] text-accent tabular-nums leading-none"
    />
  );
}

export function KpiTiles({ kpis, resetKey }: KpiTilesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT_ONCE);
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="grid sm:grid-cols-3 gap-3 md:gap-4 mb-9">
      {tiles.map((tile, i) => (
        <motion.div
          key={tile.key}
          initial={false}
          animate={reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : i * 0.06,
            ease: EASE_OUT,
          }}
          className="bg-card border border-white/5 p-5"
        >
          <p className="section-label mb-2 text-[10px]">{tile.label}</p>
          <div className="mb-2">
            <KpiValue
              kind={tile.kind}
              value={tile.getValue(kpis)}
              resetKey={resetKey}
              delay={i * 80}
            />
          </div>
          <p className="section-label text-muted/75 text-[10px] leading-snug">
            {tile.caption}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
