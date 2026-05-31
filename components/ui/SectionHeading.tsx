"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT, VIEWPORT_ONCE } from "@/components/ui/motionPresets";

type SectionHeadingProps = {
  label: string;
  /** Screen-reader heading when it differs from the visible label */
  title?: string;
  titleId?: string;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  titleId,
  className = "",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT_ONCE);
  const reduced = useReducedMotion();
  const show = reduced || inView;

  return (
    <div ref={ref} className={`mb-8 md:mb-10 ${className}`}>
      <motion.p
        className="section-label mb-4"
        initial={false}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT }}
      >
        {label}
      </motion.p>

      <motion.div
        className="h-px w-[120px] bg-accent origin-left"
        initial={false}
        animate={show ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
        aria-hidden
      />

      {titleId && (
        <h2 id={titleId} className="sr-only">
          {title || label}
        </h2>
      )}
    </div>
  );
}
