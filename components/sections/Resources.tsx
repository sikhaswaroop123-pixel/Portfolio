"use client";

import {
  comingSoonResources,
  featuredResources,
  type ResourceItem,
} from "@/content/resources";
import { site } from "@/content/site";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionShell } from "@/components/layout/SectionShell";
import Link from "next/link";

const allToolResources: ResourceItem[] = [
  ...featuredResources,
  ...comingSoonResources,
];

function ResourceGridCard({ item }: { item: ResourceItem }) {
  const isLive = item.status === "live";
  const primaryLabel = item.primaryCtaLabel ?? "Try the demo →";

  const mailto =
    item.secondaryLabel &&
    `mailto:${site.contact.email}?subject=${encodeURIComponent(
      item.secondaryMailtoSubject ?? item.secondaryLabel
    )}`;

  return (
    <article className="bg-card border border-white/5 h-full flex flex-col overflow-hidden">
      <PlaceholderImage
        label={`${item.imageKey} · preview`}
        aspect="wide"
        src={item.imageSrc}
      />

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {item.tag && (
          <p className="section-label text-accent mb-2 text-[10px]">{item.tag}</p>
        )}

        <h3 className="font-serif text-base md:text-lg text-text mb-2 leading-snug">
          {item.title}
        </h3>

        {item.category && (
          <p className="section-label mb-2 text-[10px]">{item.category}</p>
        )}

        <p className="text-muted text-xs md:text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {item.description}
        </p>

        {isLive && item.demoHref ? (
          <div className="space-y-2 mt-auto">
            <Link
              href={item.demoHref}
              className="inline-block px-4 py-2 bg-accent text-text text-[11px] tracking-wide hover:opacity-90 transition-opacity"
            >
              {primaryLabel}
            </Link>
            {mailto && item.secondaryLabel && (
              <a
                href={mailto}
                className="block section-label text-muted hover:text-accent transition-colors text-[10px]"
              >
                {item.secondaryLabel}
              </a>
            )}
          </div>
        ) : (
          <span className="section-label text-muted text-[10px] mt-auto">
            coming soon
          </span>
        )}
      </div>
    </article>
  );
}

export function Resources() {
  return (
    <SectionShell id="resources" label="09 · resources">
      <p className="editorial-line text-2xl md:text-3xl text-text max-w-3xl mb-8 -mt-2 leading-snug">
        Tools & thinking — growing over time
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {allToolResources.map((item) => (
          <ResourceGridCard key={item.id} item={item} />
        ))}
      </div>
    </SectionShell>
  );
}
