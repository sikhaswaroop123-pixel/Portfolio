"use client";

import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type LifeMediaProps = {
  label: string;
  aspect: "wide" | "tall";
  videoSrc?: string;
  className?: string;
};

const aspectClasses = {
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4]",
};

export function LifeMedia({
  label,
  aspect,
  videoSrc,
  className = "",
}: LifeMediaProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [videoSrc]);

  useEffect(() => {
    if (!videoSrc || reduced) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc, reduced]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || reduced) return;

    if (inView) {
      video.muted = true;
      video.volume = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, videoSrc, reduced]);

  if (!videoSrc || videoFailed) {
    return (
      <PlaceholderImage label={label} aspect={aspect} className={className} />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-card border border-white/5 ${aspectClasses[aspect]} ${className}`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.88]"
        aria-label={label}
        onError={() => setVideoFailed(true)}
      />
      {/* Soft grade so motion stays editorial, not loud */}
      <div
        className="pointer-events-none absolute inset-0 bg-bg/30"
        aria-hidden
      />
      <span
        className="absolute top-3 left-3 z-10 h-3 w-3 border-l border-t border-accent"
        aria-hidden
      />
      <span
        className="absolute bottom-3 right-3 z-10 h-3 w-3 border-b border-r border-accent/60"
        aria-hidden
      />
    </div>
  );
}
