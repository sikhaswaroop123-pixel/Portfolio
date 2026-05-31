export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  imageKey: string;
  imageSrc?: string;
  demoHref?: string;
  status: "live" | "coming-soon";
  tag?: string;
  category?: string;
  expandedDescription?: string;
  primaryCtaLabel?: string;
  secondaryLabel?: string;
  secondaryMailtoSubject?: string;
};

export const featuredResources: ResourceItem[] = [
  {
    id: "p2p",
    title: "Where is your money getting stuck?",
    tag: "live · interactive · ai-powered",
    category: "p2p · procurement automation · live demo",
    description:
      "Interactive P2P health check — sample data, pipeline view, AI analysis.",
    expandedDescription:
      "Drops you into a sample business's P2P data and shows you exactly where money is leaking — with AI-generated analysis written the way I'd write it for a real client.",
    imageKey: "toolkit-p2p",
    imageSrc: "/assets/toolkit-p2p-preview.png",
    demoHref: "/demos/p2p",
    status: "live",
    primaryCtaLabel: "Try the demo →",
    secondaryLabel: "Build this for my business",
    secondaryMailtoSubject: "Build a P2P dashboard for my business",
  },
  {
    id: "ai-prompts",
    title: "Better AI prompts for procurement & marketing",
    tag: "live · interactive · ai-powered",
    category: "ai · cift framework · 12 ready-to-use prompts",
    description:
      "Most AI prompts are bad. Here's a framework that makes them better — and 12 prompts already structured this way, across procurement and marketing workflows.",
    expandedDescription:
      "Walk through the CIFT framework and copy 12 ready-made prompts — written the way I'd actually use them with clients.",
    imageKey: "toolkit-ai-prompts",
    imageSrc: "/assets/toolkit-ai-prompts-preview.png",
    demoHref: "/demos/ai-prompts",
    status: "live",
    primaryCtaLabel: "Try the library →",
    secondaryLabel: "Build a custom library for my team",
    secondaryMailtoSubject: "Build a custom AI prompt library for my team",
  },
];

export const comingSoonResources: ResourceItem[] = [
  {
    id: "spend-tracker",
    title: "Spend tracker",
    description: "Budget visibility and spend analysis — built for real ops teams.",
    imageKey: "toolkit-spend",
    demoHref: "/demos/spend-tracker",
    status: "coming-soon",
  },
];

/** @deprecated use featuredResources + comingSoonResources */
export const resources: ResourceItem[] = [
  ...featuredResources,
  ...comingSoonResources,
];

export const resourceArticles = [
  {
    title: "Procurement × marketing — why both matter",
    status: "coming-soon" as const,
  },
  {
    title: "Career pivots — lessons from London and back",
    status: "coming-soon" as const,
  },
  {
    title: "AI in procurement — what actually works",
    status: "coming-soon" as const,
  },
] as const;
