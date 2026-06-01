"use client";

import { site } from "@/content/site";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SkillsMarquee } from "@/components/ui/SkillsMarquee";
import { Reveal } from "@/components/ui/Reveal";
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
      className="pt-28 pb-8 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <Reveal>
            <p className="section-label text-accent mb-4">{site.title}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              id="hero-heading"
              className="editorial-line text-4xl sm:text-5xl lg:text-6xl text-text mb-5"
            >
              {site.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted text-base md:text-lg max-w-xl mb-6 leading-relaxed">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted/90 text-sm md:text-base max-w-xl mb-4 leading-relaxed">
              {site.mission}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted/80 text-sm max-w-xl mb-8">{site.subline}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-3 md:gap-4">
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
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={16}>
          <motion.div style={{ y: imageY }} className="relative overflow-hidden w-full">
            <PlaceholderImage
              label="hero · editorial photo"
              aspect="hero"
              className="w-full max-h-[min(72vh,480px)] lg:max-h-none"
              imageClassName="object-cover object-top"
              src="/assets/hero-editorial.png"
              priority
            />
          </motion.div>
        </Reveal>
      </div>

      <SkillsMarquee />
    </section>
  );
}
