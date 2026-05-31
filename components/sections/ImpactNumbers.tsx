"use client";

import { metrics } from "@/content/metrics";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT } from "@/components/ui/motionPresets";

export function ImpactNumbers() {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, {
    once: true,
    margin: "0px 0px 120px 0px",
  });

  return (
    <section
      id="numbers"
      aria-labelledby="numbers-heading"
      className="py-14 md:py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/5"
    >
      <SectionHeading label="03 · impact" titleId="numbers-heading" />

      <div
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10"
      >
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={false}
            animate={
              reduced || gridInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : i * 0.05,
              ease: EASE_OUT,
            }}
          >
            <p className="metric-number">
              <CountUp
                value={metric.value}
                format={metric.format}
                delay={i * 100}
                start={gridInView}
              />
            </p>
            <p className="mt-4 text-text text-sm md:text-base leading-relaxed">
              {metric.label}
            </p>
            <p className="mt-2 section-label text-muted/80">{metric.sublabel}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
