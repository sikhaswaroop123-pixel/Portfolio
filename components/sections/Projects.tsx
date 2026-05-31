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

function ProjectGrid({
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
    <div
      className="grid md:grid-cols-2 gap-4 md:gap-6"
      data-cursor-hover
    >
      {items.map((project, i) => {
        const isOpen = expanded === project.id;
        const canExpand = project.expandable !== false;

        const cardContent = (
          <>
            <p className="section-label mb-2">{project.subtitle}</p>
            <h3 className="font-serif text-xl text-accent mb-1">
              {project.name}
            </h3>
            <p className="text-text text-sm font-medium mb-3">
              {project.headline}
            </p>
            <p
              className={`text-muted text-sm leading-relaxed ${canExpand ? "line-clamp-2" : ""}`}
            >
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="section-label text-muted border border-white/5 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            {canExpand ? (
              <span className="section-label mt-4 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                {isOpen ? "collapse" : "read more →"}
              </span>
            ) : (
              <>
                <p className="text-accent/90 text-sm mt-4">{project.outcome}</p>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-sm hover:underline mt-3 inline-block"
                  >
                    View project →
                  </a>
                )}
              </>
            )}
          </>
        );

        return (
          <Reveal key={project.id} delay={startDelay + i * 0.04}>
            <motion.article
              layout
              className="group bg-card border border-white/5 h-full flex flex-col transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/30"
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -6,
                      boxShadow: "0 8px 24px rgba(184, 84, 46, 0.15)",
                    }
              }
              whileTap={reduced ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              {canExpand ? (
                <button
                  type="button"
                  className="text-left p-6 md:p-8 flex-grow"
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                >
                  {cardContent}
                </button>
              ) : (
                <div className="p-6 md:p-8 flex-grow">{cardContent}</div>
              )}
              {canExpand && (
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.45,
                        ease: EASE_OUT,
                      }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.35, ease: EASE_OUT }}
                          className="text-text text-sm leading-relaxed mb-4"
                        >
                          {project.summary}
                        </motion.p>
                        <p className="text-accent/90 text-sm mb-4">
                          {project.outcome}
                        </p>
                        {project.href && (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent text-sm hover:underline"
                          >
                            View project →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SectionShell id="projects" label="07 · projects">
      <Reveal>
        <p className="text-muted text-lg max-w-3xl mb-8 -mt-2 leading-relaxed">
          {projectsIntro.subtitle}
        </p>
      </Reveal>

      <ProjectGrid
        items={projects}
        expanded={expanded}
        setExpanded={setExpanded}
      />

      <Reveal className="mt-12 md:mt-14 mb-6">
        <h3 className="font-serif text-2xl text-text mb-2">Community work</h3>
        <p className="text-muted text-sm max-w-2xl">
          Impact work outside paid roles — campaigns and community initiatives.
        </p>
      </Reveal>

      <ProjectGrid
        items={volunteerProjects}
        expanded={expanded}
        setExpanded={setExpanded}
        startDelay={0.08}
      />
    </SectionShell>
  );
}
