export type Project = {
  id: string;
  name: string;
  subtitle: string;
  headline: string;
  summary: string;
  outcome: string;
  tags: readonly string[];
  href?: string;
  /** When false, summary is fully shown — no expand/collapse affordance */
  expandable?: boolean;
};

export const projectsIntro = {
  title: "Projects",
  subtitle:
    "Academic, corporate, and personal builds — strategy and execution in equal measure.",
};

/** Shown on the homepage before “see more” */
export const featuredProjectIds = ["cookr", "edt-tam", "invitewithme"] as const;

export const projects: Project[] = [
  {
    id: "cookr",
    name: "Cookr",
    subtitle: "Bayes Masters Live Project",
    headline: "Market entry strategy for £16.66B UK market",
    summary:
      "Led primary research across 200+ consumer surveys and 25+ expert interviews. Built a full GTM strategy with customer acquisition costs, pricing tiers, 4-segment consumer map, and willingness-to-pay analysis.",
    outcome: "Data-driven go-to-market plan with pricing strategy",
    tags: ["Market Research", "GTM", "Consumer Insights"],
  },
  {
    id: "aardman",
    name: "Aardman Animations",
    subtitle: "Bayes Masters Live Project",
    headline: "AI technology investment & strategic feasibility",
    summary:
      "Assessed a £1M+ R&D investment for AI adoption. Built 18-month implementation roadmap, analysed consumer price sensitivity (100+ respondents), and benchmarked 12+ competitor studios.",
    outcome: "Full investment framework with ROI modelling",
    tags: ["Feasibility", "ROI", "AI Strategy"],
  },
  {
    id: "shell",
    name: "Shell PLC",
    subtitle: "Bayes Masters Live Project",
    headline: "Industry disruption & portfolio strategy",
    summary:
      "Synthesised intelligence from 30+ financial sources (10-K filings, analyst reports). Benchmarked 6 business units, analysed energy transition trends, developed capital reallocation strategy.",
    outcome: "Strategic portfolio recommendations for energy transition",
    tags: ["Strategy", "Competitive Intelligence", "Finance"],
  },
  {
    id: "yellow-bird",
    name: "Yellow Bird",
    subtitle: "Bayes Masters Live Project",
    headline: "International market launch strategy",
    summary:
      "Market penetration feasibility, competitive landscape, pricing strategy, website optimisation and packaging redesign for Thai exotic produce entering the UK.",
    outcome:
      "Full GTM strategy for international expansion — presented to client + Bayes panel",
    tags: ["Market Entry", "Branding", "GTM"],
  },
  {
    id: "edt-tam",
    name: "Education Development Trust",
    subtitle: "London · Corporate",
    headline: "£2B+ market opportunity assessment — UK education",
    summary:
      "Executed TAM/SAM sizing on the UK education sector, competitive positioning across 15+ KPIs, pricing dynamics, and regulatory impact review. Delivered findings to executive leadership.",
    outcome: "C-suite strategic briefing · Growth roadmap",
    tags: ["TAM/SAM", "Strategy", "Education"],
  },
  {
    id: "invitewithme",
    name: "Soireo",
    subtitle: "Personal build",
    headline: "Web app built with AI",
    summary:
      "End-to-end event invitation platform — design, build, and deploy using modern AI-assisted development workflows.",
    outcome: "Live product on Vercel",
    tags: ["Product", "AI", "Full Stack"],
    href: "https://invitewithme.vercel.app",
    expandable: false,
  },
  {
    id: "events",
    name: "Event management",
    subtitle: "Mumbai · Freelance",
    headline: "Large-scale cultural events at scale",
    summary:
      "18 events (8 weddings, 5 corporate, 5 social). Operational workflows, marketing coordination, and live content for audiences of 5,000–20,000. Ticketing, scheduling, and vendor management in real time.",
    outcome:
      "High-pressure, people-heavy execution — marketing at the sharp end",
    tags: ["Events", "Operations", "Marketing"],
  },
];

export const volunteerProjects: Project[] = [
  {
    id: "yef",
    name: "Youth Empowerment Foundation",
    subtitle: "Social campaign",
    headline: "Youth substance abuse awareness",
    summary:
      "Designed full digital campaign from scratch — content calendar, visual assets, influencer partnerships, audience targeting across Instagram, Facebook, and Twitter. Started from zero.",
    outcome: "6,000+ engagements · Measurable reach growth",
    tags: ["Content", "Social Media", "Campaigns"],
  },
  {
    id: "covid",
    name: "COVID-19 Community Health Initiative",
    subtitle: "Community outreach",
    headline: "Health education & relief",
    summary:
      "Educated 100+ workers on health protocols and raised funds supporting 50+ families during the pandemic.",
    outcome: "Grassroots impact · Fundraising · Education",
    tags: ["Community", "Operations"],
  },
];
