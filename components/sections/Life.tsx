"use client";

import {
  lifeCaption,
  lifeStories,
  lifeSubtitle,
  fomoGoals,
} from "@/content/life";
import { LifeMedia } from "@/components/ui/LifeMedia";
import { InstagramReelsSnap } from "@/components/ui/InstagramReelsSnap";
import { SectionShell } from "@/components/layout/SectionShell";

function FomoGoalList() {
  return (
    <div className="pt-8 border-t border-white/5">
      <p className="section-label mb-6">the fomo goal list — posted publicly</p>
      <div className="grid md:grid-cols-3 gap-4">
        {fomoGoals.map((goal) => (
          <div
            key={goal.year}
            className="border border-white/5 bg-card p-6 md:p-8"
          >
            <p className="font-serif text-3xl text-accent mb-3">{goal.year}</p>
            <h4 className="text-text font-medium mb-2">{goal.title}</h4>
            <p className="text-muted text-sm leading-relaxed">
              {goal.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LifeStoryCard({ story }: { story: (typeof lifeStories)[number] }) {
  return (
    <article
      className={`grid gap-6 items-center bg-card border border-white/5 p-6 md:p-8 ${
        story.mediaClassName
          ? "md:grid-cols-[auto_1fr] md:gap-8"
          : "md:grid-cols-2 md:gap-10"
      }`}
    >
      {story.instagramReels ? (
        <InstagramReelsSnap
          href={story.instagramReels}
          imageSrc={story.imageSrc}
        />
      ) : (
        <div className={story.mediaClassName}>
          <LifeMedia
            label={`${story.imageKey} · ${story.title}`}
            aspect={story.aspect}
            videoSrc={story.videoSrc}
          />
        </div>
      )}
      <div>
        <p className="section-label mb-2">{story.title}</p>
        <h3 className="font-serif text-2xl text-text mb-4">{story.headline}</h3>
        <p className="text-muted text-sm md:text-base leading-relaxed">
          {story.body}
        </p>
      </div>
    </article>
  );
}

export function Life() {
  return (
    <SectionShell id="life" label="10 · life" title={lifeCaption}>
      <p className="editorial-line text-3xl md:text-4xl text-text max-w-3xl mb-3 -mt-2 leading-snug">
        {lifeCaption}
      </p>
      <p className="text-muted text-lg max-w-3xl mb-8 leading-relaxed">
        {lifeSubtitle}
      </p>

      <div className="space-y-8">
        {lifeStories.map((story) => (
          <div key={story.id} className="space-y-8">
            <LifeStoryCard story={story} />
            {story.id === "social" && <FomoGoalList />}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
