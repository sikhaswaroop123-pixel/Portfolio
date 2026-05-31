export const lifeCaption = "I'm not just my CV.";

export const lifeSubtitle =
  "The people who do the most interesting work tend to live the most interesting lives. Movement is how I think.";

export type LifeStory = {
  id: string;
  title: string;
  headline: string;
  body: string;
  imageKey: string;
  aspect: "wide" | "tall";
  videoSrc?: string;
  imageSrc?: string;
  instagramReels?: string;
  /** Optional wrapper sizing for the media slot */
  mediaClassName?: string;
};

export const lifeStories: LifeStory[] = [
  {
    id: "dance",
    title: "Dance · Movement · Expression",
    headline: "I decided to keep the dream alive.",
    body: "My childhood dream was to become a dancer. By adulthood I kept it alive differently — learning commercial dance in heels. Unfinished childhood dreams are just deferred power.",
    imageKey: "life-dance",
    aspect: "wide",
    videoSrc: "/assets/life/dance.mp4",
  },
  {
    id: "fitness",
    title: "Fitness · Discipline",
    headline: "My goal list is terrifying.",
    body: "Working towards Pilates instructor certification. Also bouldering, hiking, gym, swimming, and boxing — physical discipline that makes everything else easier. The plan exists. The chaos is real.",
    imageKey: "life-pilates",
    aspect: "tall",
    videoSrc: "/assets/life/pilates.mov",
    mediaClassName: "w-[200px] sm:w-[220px] md:w-[240px] shrink-0 mx-auto md:mx-0",
  },
  {
    id: "social",
    title: "Building in public",
    headline: "No niche. Just life.",
    body: "Documenting how an average human navigates an increasingly weird world — the chaos, the in-betweens, the real decisions. No personal brand formula. Just a life, honestly told.",
    imageKey: "life-gym",
    aspect: "wide",
    instagramReels: "https://www.instagram.com/sikhaswaroop7/reels/",
    imageSrc: "/assets/life/instagram-reels.png",
  },
];

export const fomoGoals = [
  {
    year: "2026",
    title: "1 month in Bali — CrossFit & reset",
    description:
      "A full month training, thinking, and building something new in Bali.",
  },
  {
    year: "2027",
    title: "HYROX + half marathon",
    description:
      "Register for HYROX and a half marathon in the same year. Train like someone who means it.",
  },
  {
    year: "2028",
    title: "Ladakh half marathon",
    description:
      "21km at altitude in one of the most beautiful places on earth.",
  },
] as const;
