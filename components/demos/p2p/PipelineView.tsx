"use client";

import { groupByStage, isStuck, formatCurrency } from "@/lib/p2p/metrics";
import type { PurchaseOrder } from "@/lib/p2p/types";
import { P2P_STAGES } from "@/lib/p2p/types";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT, VIEWPORT_ONCE } from "@/components/ui/motionPresets";
import { useCallback, useEffect, useRef, useState } from "react";

type PipelineViewProps = {
  orders: PurchaseOrder[];
};

function POCard({ po }: { po: PurchaseOrder }) {
  const stuck = isStuck(po);
  const done = po.stage === "Paid";
  const tooltip = `${po.vendor} · ${po.category} · ${po.daysSinceRequisition}d since requisition · ${po.daysAtStage}d at ${po.stage}`;

  return (
    <div
      title={tooltip}
      className={`bg-bg/60 border py-2 px-[10px] transition-all duration-200 hover:-translate-y-[3px] ${
        stuck
          ? "border-accent/60 shadow-[0_0_12px_rgba(184,84,46,0.25)]"
          : "border-white/10 hover:border-accent/40"
      } ${done ? "opacity-50" : ""}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-wide text-text/90 mb-0.5 leading-tight">
        {po.id}
      </p>
      <p className="text-[11px] text-accent mb-0.5 truncate leading-tight">
        {po.vendor}
      </p>
      <p className="font-mono text-[13px] text-text font-semibold tabular-nums leading-tight">
        {formatCurrency(po.value)}
      </p>
      <p className="font-mono text-[9px] uppercase tracking-wide text-muted/70 mt-1 leading-tight">
        {po.daysAtStage}d here
      </p>
    </div>
  );
}

export function PipelineView({ orders }: PipelineViewProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, VIEWPORT_ONCE);
  const reduced = useReducedMotion();
  const grouped = groupByStage(orders);
  const [canScroll, setCanScroll] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 2;
    setCanScroll(overflow);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [orders, updateScrollState]);

  return (
    <div ref={sectionRef} className="mb-9">
      <p className="section-label mb-3">the pipeline</p>
      <div className="relative min-w-0">
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [scrollbar-width:thin]"
        >
          <div className="flex gap-2 md:gap-3 w-max min-w-full pr-1">
            {P2P_STAGES.map((stage, i) => (
              <motion.div
                key={stage}
                initial={false}
                animate={
                  reduced || inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -12 }
                }
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : i * 0.08,
                  ease: EASE_OUT,
                }}
                className="snap-start shrink-0 min-w-[120px] md:min-w-[140px] w-[120px] md:w-[140px] bg-card/50 border border-white/5 p-2"
              >
                <p className="section-label text-accent mb-2 text-[10px] leading-tight truncate">
                  {stage}
                </p>
                <div className="space-y-1.5 min-h-[48px]">
                  {grouped[stage].length === 0 ? (
                    <p className="text-[10px] text-muted/50 text-center py-3">—</p>
                  ) : (
                    grouped[stage].map((po) => <POCard key={po.id} po={po} />)
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {canScroll && !atEnd && (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-bg via-bg/80 to-transparent"
              aria-hidden
            />
            <span className="pointer-events-none absolute right-2 bottom-1 font-mono text-[10px] uppercase tracking-wide text-accent">
              scroll →
            </span>
          </>
        )}
      </div>
    </div>
  );
}
