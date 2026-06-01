"use client";

import { resourceArticles, type ResourceArticle } from "@/content/resources";
import { EASE_OUT } from "@/components/ui/motionPresets";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function ArticleRow({
  article,
  isOpen,
  onToggle,
}: {
  article: ResourceArticle;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isLive = article.status === "live" && "paragraphs" in article;

  return (
    <li className="border-b border-white/5 text-muted last:border-b-0">
      <div className="flex items-center justify-between gap-4 py-3.5">
        <span className="text-text text-sm md:text-base font-serif leading-snug">
          {article.title}
        </span>
        {isLive ? (
          <button
            type="button"
            onClick={onToggle}
            className="section-label shrink-0 text-accent hover:underline"
            aria-expanded={isOpen}
          >
            {isOpen ? "collapse ↑" : "read →"}
          </button>
        ) : (
          <span className="section-label shrink-0">coming soon</span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && isLive && "paragraphs" in article && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <article className="pb-8 max-w-3xl">
              <div className="space-y-4 text-muted text-xs md:text-sm leading-relaxed">
                {article.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
              {"author" in article && article.author && (
                <p className="mt-8 section-label text-text">{article.author}</p>
              )}
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function ArticleList() {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setSectionOpen((open) => {
            if (open) setExpandedArticleId(null);
            return !open;
          });
        }}
        className="section-label mb-0 flex w-full items-center justify-between gap-4 text-left hover:text-accent transition-colors"
        aria-expanded={sectionOpen}
      >
        <span>articles</span>
        <span className="font-mono text-muted/60 text-sm" aria-hidden>
          {sectionOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {sectionOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <ul className="mt-4">
              {resourceArticles.map((article) => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  isOpen={expandedArticleId === article.id}
                  onToggle={() =>
                    setExpandedArticleId((current) =>
                      current === article.id ? null : article.id
                    )
                  }
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
