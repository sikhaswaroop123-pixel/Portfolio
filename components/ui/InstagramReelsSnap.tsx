"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const REEL_TILES = [
  "from-bg to-card",
  "from-card to-accent/20",
  "from-accent/15 to-bg",
  "from-bg to-muted/10",
  "from-card to-accent/25",
  "from-muted/10 to-card",
];

type InstagramReelsSnapProps = {
  href: string;
  handle?: string;
  imageSrc?: string;
  className?: string;
};

function ReelsMock({ handle }: { handle: string }) {
  return (
    <div className="absolute inset-0 flex flex-col p-3 md:p-4">
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <span className="h-7 w-7 rounded-full bg-gradient-to-br from-accent/60 to-accent/20 ring-1 ring-white/10 shrink-0" />
        <span className="font-mono text-[10px] md:text-xs text-text/90 lowercase">
          @{handle}
        </span>
        <span className="ml-auto section-label text-accent text-[9px]">
          reels
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 md:gap-2 flex-1 min-h-0">
        {REEL_TILES.map((gradient, i) => (
          <div
            key={i}
            className={`relative rounded-sm bg-gradient-to-b ${gradient} border border-white/5 overflow-hidden`}
          >
            <div
              className="absolute bottom-1 left-1 flex items-center gap-0.5 opacity-60"
              aria-hidden
            >
              <span className="h-1 w-1 rounded-full bg-text/80" />
              <span className="font-mono text-[7px] text-text/70">▶</span>
            </div>
          </div>
        ))}
      </div>

      <p className="section-label text-muted/70 text-center mt-2 shrink-0">
        building in public · tap to view reels
      </p>
    </div>
  );
}

export function InstagramReelsSnap({
  href,
  handle = "sikhaswaroop7",
  imageSrc,
  className = "",
}: InstagramReelsSnapProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageSrc) && !imageFailed;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      aria-label={`View @${handle} on Instagram reels`}
    >
      <div className="relative overflow-hidden bg-[#1a1614] border border-white/5 aspect-[16/9]">
        {showImage && imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={`Instagram reels — @${handle}`}
              fill
              className="object-cover object-[center_20%] opacity-[0.92] transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageFailed(true)}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-bg/10 to-transparent"
              aria-hidden
            />
            <p className="pointer-events-none absolute bottom-3 left-0 right-0 z-10 text-center section-label text-text/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              building in public · tap to view reels
            </p>
          </>
        ) : (
          <ReelsMock handle={handle} />
        )}

        <span
          className="absolute top-3 left-3 z-10 h-3 w-3 border-l border-t border-accent"
          aria-hidden
        />
        <span
          className="absolute bottom-3 right-3 z-10 h-3 w-3 border-b border-r border-accent/60"
          aria-hidden
        />
      </div>
    </Link>
  );
}
