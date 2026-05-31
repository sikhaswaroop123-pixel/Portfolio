"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE =
  'a, button, [role="button"], input, select, textarea, summary, [data-cursor-hover]';

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const coarseOnly = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(finePointer && !coarseOnly && window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE)));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-normal"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden
    >
      <motion.span
        className="block rounded-full border-2 border-accent bg-accent"
        animate={{
          width: hovering ? 24 : 8,
          height: hovering ? 24 : 8,
          backgroundColor: hovering
            ? "rgba(184, 84, 46, 0)"
            : "rgba(184, 84, 46, 1)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}
