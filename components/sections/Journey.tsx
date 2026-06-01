"use client";

import {
  featuredJourneyIds,
  journeyIntro,
  journeySteps,
} from "@/content/journey";
import {
  buildWavyPath,
  milestoneDotSize,
  schedulePathMeasure,
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
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const EASE = EASE_OUT;

export function Journey() {
  const reduced = useReducedMotion() ?? false;
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const timelineInView = useInView(timelineRef, VIEWPORT_ONCE);
  const showTimeline = reduced || timelineInView;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFull, setShowFull] = useState(false);
  const [pathD, setPathD] = useState("");
  const [traveller, setTraveller] = useState<PathPoint | null>(null);

  const visibleSteps = useMemo(() => {
    if (showFull) return journeySteps;
    const featured = new Set<string>(featuredJourneyIds);
    return journeySteps.filter((step) => featured.has(step.id));
  }, [showFull]);

  const pathKey = visibleSteps.map((step) => step.id).join("-");
  const hiddenCount = journeySteps.length - featuredJourneyIds.length;

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const pathDrawProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const setDotRef = useCallback(
    (id: string) => (el: HTMLSpanElement | null) => {
      if (el) dotRefs.current.set(id, el);
      else dotRefs.current.delete(id);
    },
    []
  );

  const measurePath = useCallback(() => {
    const container = timelineRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const points: PathPoint[] = [];

    for (const step of visibleSteps) {
      const el = dotRefs.current.get(step.id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      points.push({
        x: r.left + r.width / 2 - containerRect.left,
        y: r.top + r.height / 2 - containerRect.top,
      });
    }

    if (points.length >= 2) {
      setPathD(buildWavyPath(points));
    } else {
      setPathD("");
    }
  }, [visibleSteps]);

  useLayoutEffect(() => {
    const cleanup = schedulePathMeasure(measurePath);
    return cleanup;
  }, [measurePath, expandedId, pathKey]);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => measurePath());
    ro.observe(container);
    return () => ro.disconnect();
  }, [measurePath]);

  useEffect(() => {
    if (!showTimeline || reduced) return;
    return schedulePathMeasure(measurePath);
  }, [showTimeline, reduced, measurePath, pathKey]);

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

  const total = visibleSteps.length;

  return (
    <SectionShell
      id="journey"
      label="08 · journey"
      title={journeyIntro.title}
    >
      <p className="editorial-line text-xl md:text-2xl text-text max-w-2xl mb-2 -mt-2 leading-snug">
        {journeyIntro.title}
      </p>
      <p className="text-muted text-sm max-w-2xl mb-6 leading-relaxed">
        {journeyIntro.subtitle}
      </p>

      <div
        ref={timelineRef}
        className="relative w-full md:w-[70%] md:max-w-2xl min-h-[120px]"
        data-cursor-hover
      >
        {pathD && (
          <svg
            key={pathKey}
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
          {visibleSteps.map((step, i) => {
            const isExpanded = expandedId === step.id;
            const isHere = step.youAreHere;
            const dotDelay = reduced ? 0 : i * 0.08;
            const dotPx = milestoneDotSize(i, total, Boolean(isHere));
            const dotOpacity = 0.55 + (i / Math.max(total - 1, 1)) * 0.45;

            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  onClick={() => toggle(step.id)}
                  className="w-full text-left py-2.5 md:py-3 pr-2 grid grid-cols-[4rem_1.5rem_1fr] md:grid-cols-[5rem_1.5rem_1fr] gap-x-2.5 md:gap-x-3 items-start group"
                  aria-expanded={isExpanded}
                >
                  <span className="font-mono text-[11px] md:text-xs text-accent tabular-nums leading-snug pt-0.5">
                    {step.year}
                  </span>

                  <span
                    className="relative flex justify-center pt-1 min-h-[1rem]"
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
                      ref={setDotRef(step.id)}
                      className="relative z-[2] rounded-full bg-accent shrink-0 ring-2 ring-bg"
                      style={{
                        width: dotPx,
                        height: dotPx,
                        opacity: dotOpacity,
                      }}
                      initial={false}
                      animate={{
                        scale: showTimeline ? 1 : 0.001,
                        opacity: dotOpacity,
                      }}
                      transition={{
                        duration: reduced ? 0 : 0.4,
                        delay: dotDelay,
                        ease: EASE_OUT,
                      }}
                      onAnimationComplete={() => {
                        if (i === total - 1) measurePath();
                      }}
                    />
                  </span>

                  <span className="min-w-0 block">
                    <span className="section-label text-muted/80 block mb-0.5 text-[10px]">
                      {step.city}
                    </span>
                    <span className="font-serif text-base text-text block leading-snug group-hover:text-text/90 transition-colors">
                      {step.title}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                      onAnimationComplete={() => measurePath()}
                    >
                      <div className="pl-[calc(4rem+1.5rem+0.625rem)] md:pl-[calc(5rem+1.5rem+0.75rem)] pr-2 pb-4 -mt-0.5">
                        {step.subtitle && (
                          <p className="text-text/80 text-xs md:text-sm mb-2 leading-snug">
                            {step.subtitle}
                          </p>
                        )}
                        <p className="text-muted text-xs md:text-sm leading-relaxed mb-3 max-w-xl">
                          {step.body}
                        </p>
                        {step.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="section-label border border-white/10 px-2 py-0.5 text-muted text-[10px]"
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

      <div className="mt-5 md:w-[70%] md:max-w-2xl">
        <button
          type="button"
          onClick={() => {
            setShowFull((v) => !v);
            setExpandedId(null);
            setPathD("");
          }}
          className="w-full sm:w-auto px-4 py-2.5 border border-white/10 text-muted section-label text-[10px] hover:border-accent/40 hover:text-accent transition-colors"
          aria-expanded={showFull}
        >
          {showFull
            ? "Show fewer stops ↑"
            : `See full journey · 1999–2026 · ${hiddenCount} more stops`}
        </button>
      </div>
    </SectionShell>
  );
}
