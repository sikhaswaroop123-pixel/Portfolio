"use client";

import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT_SOFT } from "@/components/ui/motionPresets";

type MetricFormat = "currency-k" | "percent" | "plus" | "number" | "days" | "currency" | "decimal";

type CountUpProps = {
  value: number;
  format: MetricFormat;
  className?: string;
  /** Stagger delay in ms before count starts */
  delay?: number;
  /** Reset key to re-trigger animation */
  resetKey?: string | number;
};

function getParts(value: number, format: MetricFormat) {
  switch (format) {
    case "currency-k":
      return { prefix: "£", digits: value / 1000, suffix: "K+", decimals: 0 };
    case "currency":
      return { prefix: "£", digits: value, suffix: "", decimals: value >= 1000 ? 1 : 0, divide: value >= 1000 ? 1000 : 1, suffixK: value >= 1000 };
    case "percent":
      return { prefix: "", digits: value, suffix: "%", decimals: 0 };
    case "plus":
      return { prefix: "", digits: value, suffix: "+", decimals: 0 };
    case "days":
      return { prefix: "", digits: value, suffix: " days", decimals: 1 };
    case "decimal":
      return { prefix: "", digits: value, suffix: "", decimals: 1 };
    case "number":
      return { prefix: "", digits: value, suffix: "", decimals: 0 };
    default:
      return { prefix: "", digits: value, suffix: "", decimals: 0 };
  }
}

function formatDisplay(display: number, format: MetricFormat, targetValue: number): string {
  if (format === "currency") {
    if (targetValue >= 1000) {
      return `£${(display / 1000).toFixed(1)}K`;
    }
    return `£${Math.round(display).toLocaleString("en-GB")}`;
  }
  const parts = getParts(targetValue, format);
  if (parts.decimals > 0) {
    return `${parts.prefix}${display.toFixed(parts.decimals)}${parts.suffix}`;
  }
  return `${parts.prefix}${Math.round(display)}${parts.suffix}`;
}

export function CountUp({
  value,
  format,
  className = "",
  delay = 0,
  resetKey,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const { digits } = getParts(value, format);
  const [display, setDisplay] = useState(reduced ? digits : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(digits);
      return;
    }

    setDisplay(0);
    const controls = animate(0, digits, {
      duration: 1.2,
      ease: EASE_OUT_SOFT,
      delay: delay / 1000,
      onUpdate: (v) => setDisplay(v),
    });

    return () => controls.stop();
  }, [inView, reduced, digits, delay, resetKey]);

  return (
    <span ref={ref} className={className}>
      {formatDisplay(display, format, value)}
    </span>
  );
}
