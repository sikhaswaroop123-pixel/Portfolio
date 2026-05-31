"use client";

import {
  projects,
  projectsIntro,
  volunteerProjects,
  type Project,
} from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { EASE_OUT } from "@/components/ui/motionPresets";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

const tagVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, delay: i * 0.04, ease: EASE_OUT },
  }),
};

function ProjectStack({
  items,
  expanded,
  setExpanded,
  startDelay = 0,
}: {
  items: Project[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  startDelay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-2" data-cursor-hover>
      {items.map((project, i) => {
        const isOpen = expanded === project.id;
        const index = String(i + 1).padStart(2, "0");

        return (
          <Reveal key={project.id} delay={startDelay + i * 0.04}>
            <motion.article
              layout
              className={`relative bg-card border overflow-hidden transition-colors duration-300 ${
                isOpen
                  ? "border-accent/40 shadow-[0_0_24px_rgba(184,84,46,0.08)]"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top"
                initial={false}
                animate={{ scaleY: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                aria-hidden
              />

              <button
                type="button"
                className="w-full text-left pl-5 md:pl-6 pr-4 md:pr-5 py-4 md:py-4 hover:bg-white/[0.02] transition-colors"
                onClick={() => setExpanded(isOpen ? null : project.id)}
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <span
                    className={`font-mono text-[10px] tabular-nums pt-1 shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-accent" : "text-muted/50"
                    }`}
                  >
                    {index}
                  </span>

                  <div className="flex-1 min-w-0 grid md:grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 items-start">
                    <div className="min-w-0">
                      <p className="section-label text-[10px] mb-1">
                        {project.subtitle}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl text-accent leading-snug">
                        {project.name}
                      </h3>
                      <p
                        className={`text-muted text-xs md:text-sm mt-1 leading-snug transition-opacity duration-300 ${
                          isOpen ? "opacity-100" : "opacity-80 line-clamp-1"
                        }`}
                      >
                        {project.headline}
                      </p>
                    </div>

                    <div className="hidden md:flex flex-wrap gap-1.5 justify-end max-w-[200px]">
                      {!isOpen &&
                        project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="section-label text-muted text-[9px] border border-white/5 px-1.5 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>

                  <motion.span
                    className="section-label text-accent shrink-0 pt-1 w-4 text-center"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    aria-hidden
                  >
                    +
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.4, ease: EASE_OUT },
                      opacity: { duration: 0.25 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pl-5 md:pl-6 pr-4 md:pr-5 pb-5 pt-0 border-t border-white/5 ml-8 md:ml-10">
                      <motion.p
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="text-muted text-xs md:text-sm leading-relaxed mb-3 max-w-2xl"
                      >
                        {project.summary}
                      </motion.p>

                      <motion.p
                        initial={reduced ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05, ease: EASE_OUT }}
                        className="text-accent/90 text-xs md:text-sm mb-3 leading-snug"
                      >
                        {project.outcome}
                      </motion.p>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.map((tag, ti) => (
                          <motion.span
                            key={tag}
                            custom={ti}
                            variants={tagVariants}
                            initial="hidden"
                            animate="visible"
                            className="section-label text-muted text-[9px] border border-white/5 px-1.5 py-0.5"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="section-label text-accent hover:underline inline-block"
                        >
                          View project →
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <SectionShell
      id="projects"
      label="07 · projects"
      className="py-10 md:py-14"
      headingClassName="mb-5 md:mb-6"
    >
      <Reveal>
        <p className="text-muted text-sm md:text-base max-w-3xl mb-6 -mt-1 leading-snug">
          {projectsIntro.subtitle}
        </p>
      </Reveal>

      <ProjectStack
        items={projects}
        expanded={expanded}
        setExpanded={setExpanded}
      />

      <Reveal className="mt-8 md:mt-10 mb-4">
        <h3 className="font-serif text-lg md:text-xl text-text mb-1 leading-snug">
          Community work
        </h3>
        <p className="text-muted text-xs md:text-sm max-w-2xl leading-snug">
          Impact work outside paid roles — campaigns and community initiatives.
        </p>
      </Reveal>

      <ProjectStack
        items={volunteerProjects}
        expanded={expanded}
        setExpanded={setExpanded}
        startDelay={0.06}
      />
    </SectionShell>
  );
}
