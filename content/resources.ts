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
    id: "spreadsheet-and-story",
    title: "The Spreadsheet and the Story: Why I Stopped Choosing Sides",
    status: "live" as const,
    paragraphs: [
      "There's a quiet assumption in most organisations that creativity and cost live on opposite ends of the building. Marketing dreams up the campaign; procurement decides whether the company can afford it. One side is the story, the other is the spreadsheet, and the two rarely sit at the same table until the budget is already on fire.",
      "I've spent my career on both sides of that table, and I've come to believe the divide is mostly imagined — and expensive.",
      "My route here wasn't a straight line. I studied an MSc in Marketing Strategy and Innovation, the kind of programme that trains you to think in narratives, audiences and brand equity. But I also spent real time in procurement, where the language is contracts, lead times and unit costs. Add a stretch in event management — where a single missed delivery can unravel months of planning — and you get a strange but useful education: I learned to fall in love with a creative storyline and interrogate its invoice in the same afternoon.",
      "The lesson clicked during an event launch. Marketing had a beautiful concept for the social rollout — a serialised story that would unfold across a week, each post building on the last. It was genuinely good. It was also, as written, impossible: the production timeline didn't fit the vendor's lead time, and the premium supplier we'd defaulted to would have eaten the entire content budget. Because I understood both the narrative we were protecting and the supply mechanics underneath it, I could see a third option nobody else was looking for — a different vendor, a resequenced rollout that preserved the story arc, and a budget that suddenly had room to breathe. The campaign shipped. The story survived contact with reality because someone in the room spoke both languages.",
      "That's the part people miss. The point isn't that a marketer should become a procurement specialist, or that a buyer should start writing copy. The point is that knowing how the other half works changes the quality of your own decisions.",
      "When you understand procurement, your creative ideas arrive pre-stress-tested. You stop pitching concepts that quietly assume infinite budget and instant timelines, and you start designing ideas that can actually survive a real supply chain. When you understand marketing, your sourcing decisions stop being only about the lowest number — you begin to see how a vendor choice protects a brand promise, or how a few days of lead time can make or break a launch moment.",
      "You don't have to be an expert in both. You rarely will be. But fluency — knowing enough of the other side's language to ask the right question, to spot the constraint before it becomes a crisis, to find the third option — is one of the most underrated skills in modern business. It's the difference between functions that hand problems over the wall and functions that solve them together.",
      "The most useful people in any organisation are rarely the deepest specialists. They're the translators — the ones who can hold the big idea and the unit cost in the same head, and refuse to pretend they're enemies.",
      "So no, you don't have to pick a side. Knowing the front and the back of an operation isn't a dilution of expertise. It's a kind of expertise in itself — and increasingly, it's the one that gets things done.",
    ],
    author: "Sikha Swaroop",
  },
  {
    id: "career-pivots",
    title: "Career pivots — lessons from London and back",
    status: "coming-soon" as const,
  },
  {
    id: "ai-in-procurement",
    title: "AI in procurement — what actually works",
    status: "coming-soon" as const,
  },
] as const;

export type ResourceArticle = (typeof resourceArticles)[number];
