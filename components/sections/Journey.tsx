"use client";

import { journeyIntro, journeySteps } from "@/content/journey";
import {
  buildWavyPath,
  milestoneDotSize,
  type PathPoint,
} from "@/components/journey/journeyPath";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  EASE_OUT,
  EASE_OUT_SOFT,
  VIEWPORT_ONCE,
} from "@/components/ui/motionPresets";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const EASE = EASE_OUT;

export function Journey() {
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineInView = useInView(timelineRef, VIEWPORT_ONCE);
  const showTimeline = reduced || timelineInView;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pathD, setPathD] = useState("");
  const [traveller, setTraveller] = useState<PathPoint | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const pathDrawProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const setDotRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      dotRefs.current[index] = el;
    },
    []
  );

  const measurePath = useCallback(() => {
    const container = timelineRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const points: PathPoint[] = [];

    dotRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      points.push({
        x: r.left + r.width / 2 - containerRect.left,
        y: r.top + r.height / 2 - containerRect.top,
      });
    });

    if (points.length >= 2) {
      setPathD(buildWavyPath(points, 6));
    }
  }, []);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    measurePath();
    const ro = new ResizeObserver(() => measurePath());
    ro.observe(container);

    return () => ro.disconnect();
  }, [measurePath, expandedId]);

  useEffect(() => {
    if (!showTimeline || reduced) return;
    measurePath();
    const t = setTimeout(measurePath, 450);
    return () => clearTimeout(t);
  }, [showTimeline, reduced, measurePath]);

  useMotionValueEvent(pathDrawProgress, "change", (p) => {
    const path = pathRef.current;
    if (!path || !pathD || reduced) return;
    try {
      const len = path.getTotalLength();
      const pt = path.getPointAtLength(Math.max(0, Math.min(1, p)) * len);
      setTraveller({ x: pt.x, y: pt.y });
    } catch {
      /* path not ready */
    }
  });

  const toggle = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const total = journeySteps.length;

  return (
    <SectionShell
      id="journey"
      label="08 · journey"
      title={journeyIntro.title}
    >
      <p className="editorial-line text-3xl md:text-4xl text-text max-w-3xl mb-3 -mt-2 leading-snug">
        {journeyIntro.title}
      </p>
      <p className="text-muted text-lg max-w-3xl mb-8 leading-relaxed">
        {journeyIntro.subtitle}
      </p>

      <div
        ref={timelineRef}
        className="relative w-full md:w-[70%] md:max-w-2xl min-h-[200px]"
        data-cursor-hover
      >
        {pathD && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            aria-hidden
          >
            <defs>
              <filter
                id="journey-path-glow"
                x="-30%"
                y="-5%"
                width="160%"
                height="110%"
              >
                <feDropShadow
                  dx={0}
                  dy={0}
                  stdDeviation={3}
                  floodColor="#B8542E"
                  floodOpacity={0.35}
                />
              </filter>
            </defs>

            <path
              d={pathD}
              fill="none"
              stroke="#8a7a72"
              strokeWidth={1.5}
              strokeDasharray="5 6"
              opacity={0.38}
            />

            <motion.path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#B8542E"
              strokeWidth={2}
              strokeLinecap="round"
              filter="url(#journey-path-glow)"
              initial={false}
              animate={{
                pathLength: showTimeline ? 1 : 0,
                opacity: showTimeline ? 1 : 0,
              }}
              transition={{
                pathLength: {
                  duration: reduced ? 0 : 1.8,
                  ease: EASE_OUT_SOFT,
                },
                opacity: { duration: 0.3 },
              }}
            />

            {traveller && showTimeline && !reduced && (
              <motion.circle
                cx={traveller.x}
                cy={traveller.y}
                r={5}
                fill="#B8542E"
                stroke="#FAF5EE"
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.95, scale: 1 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </svg>
        )}

        <ol className="relative list-none m-0 p-0 z-[1]">
          {journeySteps.map((step, i) => {
            const isExpanded = expandedId === step.id;
            const isHere = step.youAreHere;
            const dotDelay = reduced ? 0 : i * 0.1;
            const dotPx = milestoneDotSize(i, total, Boolean(isHere));
            const weaveX = i % 2 === 0 ? -3 : 3;
            const dotOpacity = 0.55 + (i / Math.max(total - 1, 1)) * 0.45;

            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  onClick={() => toggle(step.id)}
                  className="w-full text-left py-4 md:py-5 pr-2 grid grid-cols-[4.5rem_2rem_1fr] md:grid-cols-[5.5rem_2rem_1fr] gap-x-3 md:gap-x-4 items-start group"
                  aria-expanded={isExpanded}
                >
                  <span className="font-mono text-[13px] text-accent tabular-nums leading-snug pt-0.5">
                    {step.year}
                  </span>

                  <span
                    className="relative flex justify-center pt-1.5 min-h-[1.25rem]"
                    style={{ transform: `translateX(${weaveX}px)` }}
                    aria-hidden
                  >
                    {isHere && !reduced && (
                      <motion.span
                        className="absolute rounded-full border-2 border-accent"
                        style={{ width: dotPx + 6, height: dotPx + 6 }}
                        animate={{
                          scale: [1, 2.2],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                    <motion.span
                      ref={setDotRef(i)}
                      className="relative z-[2] rounded-full bg-accent shrink-0 ring-2 ring-bg"
                      style={{
                        width: dotPx,
                        height: dotPx,
                        opacity: dotOpacity,
                      }}
                      initial={false}
                      animate={{ scale: showTimeline ? 1 : 0 }}
                      transition={{
                        duration: reduced ? 0 : 0.4,
                        delay: dotDelay,
                        ease: EASE_OUT,
                      }}
                    />
                  </span>

                  <span className="min-w-0 block">
                    <span className="section-label text-muted block mb-1">
                      {step.city}
                    </span>
                    <span className="font-serif text-lg text-text block leading-snug group-hover:text-text/90 transition-colors">
                      {step.title}
                    </span>
                    {step.subtitle && (
                      <span className="text-[13px] text-muted block mt-1 leading-snug">
                        {step.subtitle}
                      </span>
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                      onAnimationComplete={() => measurePath()}
                    >
                      <div className="pl-[calc(4.5rem+2rem+0.75rem)] md:pl-[calc(5.5rem+2rem+1rem)] pr-2 pb-5 -mt-1">
                        <p className="text-muted text-sm leading-relaxed mb-4 max-w-xl">
                          {step.body}
                        </p>
                        {step.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="section-label border border-white/10 px-2.5 py-1 text-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
