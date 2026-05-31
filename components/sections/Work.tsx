"use client";

import { workExperience } from "@/content/work";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/layout/SectionShell";
import { EASE_OUT } from "@/components/ui/motionPresets";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bulletVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.08,
      ease: EASE_OUT,
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function Work() {
  const [expanded, setExpanded] = useState<string | null>(workExperience[0].id);

  return (
    <SectionShell id="work" label="06 · work experience">
      <div className="space-y-3" data-cursor-hover>
        {workExperience.map((job, i) => {
          const isOpen = expanded === job.id;
          return (
            <Reveal key={job.id} delay={i * 0.06}>
              <article className="bg-card border border-white/5 overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left p-6 md:p-8 hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpanded(isOpen ? null : job.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-2xl md:text-3xl text-accent mb-1">
                        {job.company}
                      </h3>
                      {job.companyFull && (
                        <p className="section-label text-muted mb-2 normal-case">
                          {job.companyFull}
                        </p>
                      )}
                      {job.role && (
                        <p className="text-muted text-sm md:text-base">
                          {job.role}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {job.period && (
                        <p className="section-label text-accent whitespace-nowrap">
                          {job.period}
                        </p>
                      )}
                      <span className="section-label text-muted">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: EASE_OUT },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="px-6 md:px-8 pb-6 md:pb-8 space-y-2 text-muted text-sm md:text-base border-t border-white/5 pt-6">
                        <AnimatePresence initial={false}>
                          {job.highlights.map((h, hi) => (
                            <motion.li
                              key={h}
                              custom={hi}
                              variants={bulletVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="pl-3 border-l border-accent/30"
                            >
                              {h}
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
