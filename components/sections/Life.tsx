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
    <div className="pt-5 border-t border-white/5">
      <p className="section-label mb-4 text-[10px]">
        the fomo goal list — posted publicly
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {fomoGoals.map((goal) => (
          <div
            key={goal.year}
            className="border border-white/5 bg-card/60 p-4 md:p-5"
          >
            <p className="font-serif text-xl md:text-2xl text-accent mb-2">
              {goal.year}
            </p>
            <h4 className="text-text text-sm font-medium mb-1.5 leading-snug">
              {goal.title}
            </h4>
            <p className="text-muted text-xs md:text-sm leading-relaxed">
              {goal.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LifeStoryCard({ story }: { story: (typeof lifeStories)[number] }) {
  const mediaSlot =
    story.mediaClassName ?? "w-full max-w-[260px] shrink-0 mx-auto md:mx-0";

  const copy = (
    <div className="min-w-0">
      <p className="section-label mb-1.5 text-[10px]">{story.title}</p>
      <h3 className="font-serif text-lg md:text-xl text-text mb-2 leading-snug">
        {story.headline}
      </h3>
      <p className="text-muted text-xs md:text-sm leading-relaxed">
        {story.body}
      </p>
    </div>
  );

  if (story.aspect === "tall") {
    return (
      <article className="flex gap-4 items-start bg-card/40 border border-white/5 p-4 md:p-5">
        <div className="w-[100px] sm:w-[112px] shrink-0">
          <LifeMedia
            label={`${story.imageKey} · ${story.title}`}
            aspect={story.aspect}
            videoSrc={story.videoSrc}
            className="!aspect-auto h-[128px] sm:h-[140px] w-full"
          />
        </div>
        {copy}
      </article>
    );
  }

  return (
    <article
      className={`grid gap-4 items-start bg-card/40 border border-white/5 p-4 md:p-5 ${
        story.mediaClassName
          ? "md:grid-cols-[auto_1fr] md:gap-5"
          : "md:grid-cols-[minmax(0,260px)_1fr] md:gap-5"
      }`}
    >
      {story.instagramReels ? (
        <InstagramReelsSnap
          href={story.instagramReels}
          imageSrc={story.imageSrc}
          className={`${mediaSlot} block`}
        />
      ) : (
        <div className={mediaSlot}>
          <LifeMedia
            label={`${story.imageKey} · ${story.title}`}
            aspect={story.aspect}
            videoSrc={story.videoSrc}
          />
        </div>
      )}
      {copy}
    </article>
  );
}

export function Life() {
  return (
    <SectionShell id="life" label="10 · life" title={lifeCaption}>
      <p className="editorial-line text-2xl md:text-3xl text-text max-w-3xl mb-2 -mt-2 leading-snug">
        {lifeCaption}
      </p>
      <p className="text-muted text-sm md:text-base max-w-2xl mb-6 leading-relaxed">
        {lifeSubtitle}
      </p>

      <div className="space-y-5 max-w-4xl">
        {lifeStories.map((story) => (
          <div key={story.id} className="space-y-5">
            <LifeStoryCard story={story} />
            {story.id === "social" && <FomoGoalList />}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
