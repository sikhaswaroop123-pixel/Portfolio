"use client";

import {
  comingSoonResources,
  featuredResources,
  resourceArticles,
  type ResourceItem,
  type ResourceArticle,
} from "@/content/resources";
import { site } from "@/content/site";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionShell } from "@/components/layout/SectionShell";
import { EASE_OUT } from "@/components/ui/motionPresets";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function FeaturedResourceCard({
  item,
  isOpen,
  onToggle,
}: {
  item: ResourceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const mailto =
    item.secondaryLabel &&
    `mailto:${site.contact.email}?subject=${encodeURIComponent(
      item.secondaryMailtoSubject ?? item.secondaryLabel
    )}`;

  const primaryLabel = item.primaryCtaLabel ?? "Try the demo →";

  return (
    <motion.article
      layout
      className="group bg-card border border-white/5 h-full flex flex-col overflow-hidden"
    >
      <PlaceholderImage
        label={`${item.imageKey} · preview`}
        aspect="wide"
        src={item.imageSrc}
      />
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {item.tag && (
          <p className="section-label text-accent mb-2">{item.tag}</p>
        )}
        <h3 className="font-serif text-xl md:text-2xl text-text mb-2">
          {item.title}
        </h3>
        {item.category && (
          <p className="section-label mb-3">{item.category}</p>
        )}
        <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
          {item.description}
        </p>

        <div className="space-y-3">
          {item.demoHref && (
            <Link
              href={item.demoHref}
              className="inline-block px-5 py-2.5 bg-accent text-text text-xs tracking-wide hover:opacity-90 transition-opacity"
            >
              {primaryLabel}
            </Link>
          )}
          <div className="flex flex-wrap items-center gap-4">
            {mailto && item.secondaryLabel && (
              <a
                href={mailto}
                className="section-label text-muted hover:text-accent transition-colors"
              >
                {item.secondaryLabel}
              </a>
            )}
            {item.expandedDescription && (
              <button
                type="button"
                onClick={onToggle}
                className="section-label text-muted hover:text-text transition-colors"
                aria-expanded={isOpen}
              >
                {isOpen ? "collapse ↑" : "read more →"}
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && item.expandedDescription && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden border-t border-white/5"
          >
            <div className="p-6 md:p-8 pt-4">
              <p className="text-muted text-sm leading-relaxed">
                {item.expandedDescription}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function ComingSoonCard({ item }: { item: ResourceItem }) {
  return (
    <article className="bg-card border border-white/5 h-full flex flex-col overflow-hidden max-w-md">
      <PlaceholderImage
        label={`${item.imageKey} · preview`}
        aspect="wide"
        src={item.imageSrc}
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif text-lg text-text mb-2">{item.title}</h3>
        <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">
          {item.description}
        </p>
        <span className="section-label text-muted">coming soon</span>
      </div>
    </article>
  );
}

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
    <li className="border-b border-white/5 text-muted">
      <div className="flex items-center justify-between gap-4 py-4">
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

export function Resources() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  return (
    <SectionShell id="resources" label="09 · resources">
      <p className="editorial-line text-2xl md:text-3xl text-text max-w-3xl mb-8 -mt-2 leading-snug">
        Tools & thinking — growing over time
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {featuredResources.map((item) => (
          <FeaturedResourceCard
            key={item.id}
            item={item}
            isOpen={expandedId === item.id}
            onToggle={() =>
              setExpandedId((current) => (current === item.id ? null : item.id))
            }
          />
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {comingSoonResources.map((item) => (
          <ComingSoonCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-12 md:mt-14 pt-10 border-t border-white/5">
        <p className="section-label mb-6">articles</p>
        <ul className="space-y-3">
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
      </div>
    </SectionShell>
  );
}
