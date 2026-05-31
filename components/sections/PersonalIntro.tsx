"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "Hi, I'm Sikha.", accent: false },
  { text: "I'm the friend who's one call away.", accent: false },
  { text: "The one who shows up.", accent: false },
  {
    text: "I dance — in heels, on stage, anywhere there's music.",
    accent: false,
  },
  { text: "I climb walls. I hike mountains.", accent: false },
  { text: "I'm happiest moving.", accent: false },
  { text: "I make friends easily.", accent: false },
  { text: "I feel things deeply.", accent: false },
  { text: "I rebuild when life knocks me down.", accent: false },
  { text: "I came home to start again.", accent: true },
  { text: "Not because the old chapter failed —", accent: true },
  { text: "but because I wanted one that's fully mine.", accent: true },
  { text: "I'm still figuring it out.", accent: true },
  { text: "But I'm doing it as myself.", accent: true },
  { text: "— Sikha", accent: true, signature: true },
] as const;

const FADE_MS = 800;
const HOLD_MS = 1000;
const EASE = [0.42, 0, 0.58, 1] as const;

type PersonalIntroProps = {
  loop?: boolean;
  autoPlay?: boolean;
  embedded?: boolean;
};

export function PersonalIntro({
  loop = false,
  autoPlay = true,
  embedded = false,
}: PersonalIntroProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const playGenRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inView, setInView] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [complete, setComplete] = useState(false);

  const showAll = Boolean(reduced) || skipped || complete;
  const revealedCount = showAll ? LINES.length : activeIndex + 1;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      {
        threshold: embedded ? 0.15 : 0.3,
        rootMargin: embedded ? "0px 0px -10% 0px" : "0px",
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [embedded]);

  useEffect(() => {
    if (embedded && autoPlay && !reduced && !skipped) {
      const t = setTimeout(() => setInView(true), 400);
      return () => clearTimeout(t);
    }
  }, [embedded, autoPlay, reduced, skipped]);

  useEffect(() => {
    if (reduced) {
      setActiveIndex(LINES.length - 1);
      setComplete(true);
    }
  }, [reduced]);

  useEffect(() => {
    if (skipped) {
      setActiveIndex(LINES.length - 1);
      setComplete(true);
    }
  }, [skipped]);

  useEffect(() => {
    if (!autoPlay || !inView || reduced || skipped) return;

    const gen = ++playGenRef.current;
    let index = 0;

    const advance = () => {
      if (playGenRef.current !== gen) return;

      if (index >= LINES.length) {
        setComplete(true);
        if (loop) {
          timerRef.current = setTimeout(() => {
            if (playGenRef.current !== gen) return;
            setActiveIndex(-1);
            setComplete(false);
            index = 0;
            scheduleNext();
          }, 2000);
        }
        return;
      }

      setActiveIndex(index);
      index += 1;
      scheduleNext();
    };

    const scheduleNext = () => {
      const line = LINES[index - 1];
      const hold =
        line && "signature" in line && line.signature ? HOLD_MS * 2 : HOLD_MS;
      timerRef.current = setTimeout(advance, hold + FADE_MS);
    };

    setActiveIndex(-1);
    setComplete(false);
    advance();

    return () => {
      playGenRef.current += 1;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inView, autoPlay, loop, reduced, skipped]);

  useEffect(() => {
    const scroll = scrollRef.current;
    const container = containerRef.current;
    if (!scroll || !container || activeIndex < 0) return;

    // Never scroll the page — only the intro box, and only when it's on screen
    const rect = container.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (!onScreen) return;

    const line = scroll.querySelector(
      `[data-line="${activeIndex}"]`
    ) as HTMLElement | null;
    if (!line) return;

    const lineBottom = line.offsetTop + line.offsetHeight;
    const visibleBottom = scroll.scrollTop + scroll.clientHeight;
    if (lineBottom > visibleBottom - 8) {
      scroll.scrollTo({
        top: lineBottom - scroll.clientHeight + 16,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  }, [activeIndex, reduced]);

  const lineSize = embedded
    ? "clamp(0.72rem, 2.2vw, 0.95rem)"
    : "clamp(1rem, 3vw, 1.35rem)";

  const inner = (
    <div
      ref={containerRef}
      className={
        embedded
          ? "absolute inset-0 bg-bg/92 overflow-hidden flex flex-col"
          : "relative w-full max-w-3xl mx-auto"
      }
      aria-label="Personal introduction"
    >
      {!showAll && !complete && (
        <button
          type="button"
          onClick={() => setSkipped(true)}
          className="absolute top-3 right-3 section-label text-muted hover:text-text transition-colors z-10"
        >
          skip
        </button>
      )}

      <div
        ref={scrollRef}
        className={`flex-1 w-full overflow-y-auto overflow-x-hidden px-4 py-5 md:py-6 scroll-smooth lyrics-scroll ${
          embedded ? "" : "max-h-[70vh]"
        }`}
      >
        <div className="flex flex-col items-center text-center space-y-2 md:space-y-2.5 min-h-min justify-end pb-2">
          {LINES.slice(0, revealedCount).map((line, i) => {
            const isCurrent = !showAll && i === activeIndex;
            const isPast = !showAll && i < activeIndex;

            return (
              <motion.p
                key={`${i}-${line.text}`}
                data-line={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: showAll ? 0.9 : isCurrent ? 1 : isPast ? 0.45 : 1,
                  y: 0,
                }}
                transition={{
                  duration: FADE_MS / 1000,
                  ease: EASE,
                }}
                className={`editorial-line leading-snug max-w-lg ${
                  line.accent
                    ? isCurrent
                      ? "text-accent"
                      : "text-accent/70"
                    : isCurrent
                      ? "text-text"
                      : "text-text/55"
                } ${isCurrent ? "font-medium" : ""} ${
                  "signature" in line && line.signature ? "italic" : ""
                }`}
                style={{ fontSize: lineSize }}
              >
                {line.text}
              </motion.p>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (embedded) return inner;

  return (
    <section
      id="personal-intro"
      className="w-full bg-bg border-y border-white/5 px-6 md:px-12 lg:px-20 py-12"
    >
      {inner}
    </section>
  );
}
