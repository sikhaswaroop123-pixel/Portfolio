"use client";

import {
  featuredProjectIds,
  projects,
  projectsIntro,
  volunteerProjects,
  type Project,
} from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { EASE_OUT } from "@/components/ui/motionPresets";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

function projectKind(subtitle: string): "academic" | "corporate" | "personal" | "community" {
  if (subtitle.includes("Bayes")) return "academic";
  if (subtitle.includes("Personal")) return "personal";
  if (subtitle.includes("Social") || subtitle.includes("Community")) return "community";
  return "corporate";
}

const kindAccent = {
  academic: "border-l-accent",
  corporate: "border-l-accent/70",
  personal: "border-l-accent/50",
  community: "border-l-muted/40",
};

function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const kind = projectKind(project.subtitle);
  const primaryTag = project.tags[0];

  return (
    <motion.article
      layout
      className={`bg-card/40 border border-white/5 border-l-[3px] ${kindAccent[kind]} overflow-hidden transition-colors duration-300 ${
        isOpen ? "bg-card/80 border-accent/20" : "hover:bg-card/60"
      }`}
      transition={{ layout: { duration: 0.35, ease: EASE_OUT } }}
    >
      <button
        type="button"
        className="w-full text-left px-4 md:px-5 py-3.5 md:py-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <span className="font-mono text-[10px] text-muted/40 tabular-nums pt-1 w-5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
              <h3 className="font-serif text-base md:text-lg text-accent leading-tight">
                {project.name}
              </h3>
              <span className="section-label text-[10px] text-muted/70 normal-case">
                {project.subtitle}
              </span>
            </div>
            {!isOpen && (
              <p className="text-text/85 text-sm leading-snug line-clamp-1">
                {project.headline}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
            {!isOpen && (
              <span className="section-label text-[10px] text-accent/80 hidden sm:inline max-w-[100px] text-right leading-tight">
                {primaryTag}
              </span>
            )}
            <span
              className={`section-label text-sm leading-none ${
                isOpen ? "text-accent" : "text-muted"
              }`}
              aria-hidden
            >
              {isOpen ? "−" : "+"}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 ml-8 md:ml-9 space-y-3 border-t border-white/5">
              <p className="text-text/90 text-sm font-medium leading-snug pt-3">
                {project.headline}
              </p>
              <p className="text-muted text-xs md:text-sm leading-relaxed">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="section-label text-muted border border-white/5 px-2 py-0.5 text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-accent/90 text-xs md:text-sm leading-relaxed border-l-2 border-accent/30 pl-3">
                {project.outcome}
              </p>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="section-label text-accent hover:underline inline-block text-[10px]"
                >
                  View project →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function ProjectList({
  items,
  expanded,
  setExpanded,
  startIndex = 0,
}: {
  items: Project[];
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  startIndex?: number;
}) {
  return (
    <div className="space-y-2" data-cursor-hover>
      {items.map((project, i) => (
        <ProjectRow
          key={project.id}
          project={project}
          index={startIndex + i}
          isOpen={expanded === project.id}
          onToggle={() =>
            setExpanded(expanded === project.id ? null : project.id)
          }
        />
      ))}
    </div>
  );
}

export function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const reduced = useReducedMotion();

  const { featured, rest } = useMemo(() => {
    const featuredSet = new Set<string>(featuredProjectIds);
    const featuredList: Project[] = [];
    const restList: Project[] = [];
    for (const project of projects) {
      if (featuredSet.has(project.id)) featuredList.push(project);
      else restList.push(project);
    }
    // Preserve featured order from featuredProjectIds
    featuredList.sort(
      (a, b) =>
        featuredProjectIds.indexOf(a.id as (typeof featuredProjectIds)[number]) -
        featuredProjectIds.indexOf(b.id as (typeof featuredProjectIds)[number])
    );
    return { featured: featuredList, rest: restList };
  }, []);

  const hiddenCount = rest.length + volunteerProjects.length;

  return (
    <SectionShell id="projects" label="07 · projects">
      <Reveal>
        <p className="editorial-line text-lg md:text-xl text-muted max-w-2xl mb-6 -mt-2 leading-snug">
          {projectsIntro.subtitle}
        </p>
      </Reveal>

      <ProjectList
        items={featured}
        expanded={expanded}
        setExpanded={setExpanded}
      />

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="w-full sm:w-auto px-4 py-2.5 border border-white/10 text-muted section-label text-[10px] hover:border-accent/40 hover:text-accent transition-colors"
          aria-expanded={showAll}
        >
          {showAll
            ? "Show fewer projects ↑"
            : `See more projects · ${hiddenCount} more`}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showAll && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              <ProjectList
                items={rest}
                expanded={expanded}
                setExpanded={setExpanded}
                startIndex={featured.length}
              />

              <p className="section-label text-muted pt-2">
                community work · {volunteerProjects.length} projects
              </p>

              <ProjectList
                items={volunteerProjects}
                expanded={expanded}
                setExpanded={setExpanded}
                startIndex={featured.length + rest.length}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
