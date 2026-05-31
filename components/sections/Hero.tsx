"use client";

import { site } from "@/content/site";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SkillsMarquee } from "@/components/ui/SkillsMarquee";
import { EASE_OUT, EASE_OUT_SOFT } from "@/components/ui/motionPresets";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reduced = useReducedMotion();
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-heading"
      className="min-h-screen pt-28 pb-8 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.h1
            id="hero-heading"
            className="editorial-line text-4xl sm:text-5xl lg:text-6xl text-text mb-6"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.6,
              ease: EASE_OUT,
            }}
          >
            {site.tagline}
          </motion.h1>
          <motion.p
            className="text-muted text-base md:text-lg max-w-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
          >
            {site.mission}
          </motion.p>
          <motion.p
            className="text-muted/80 text-sm md:text-base max-w-xl mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
          >
            {site.subline}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
          >
            <Link
              href="/#what-i-do"
              className="inline-block px-6 py-3 bg-accent text-text text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              See what I do
            </Link>
            <Link
              href="/#journey"
              className="inline-block px-6 py-3 border border-white/20 text-text text-sm tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              My story
            </Link>
            <a
              href={site.contact.cvPath}
              download
              className="inline-block px-6 py-3 border border-white/10 text-muted text-sm tracking-wide hover:text-text transition-colors"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y: imageY }} className="relative overflow-hidden">
          <motion.div
            className="w-full origin-center"
            initial={reduced ? false : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduced ? 0 : 1.8,
              ease: EASE_OUT_SOFT,
            }}
          >
            <PlaceholderImage
              label="hero · editorial photo"
              aspect="hero"
              className="w-full"
              src="/assets/hero-editorial.png"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <SkillsMarquee />
    </section>
  );
}
