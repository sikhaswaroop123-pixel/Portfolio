export type PromptCategory = "Procurement" | "Marketing & GTM";

export type PromptSubcategory =
  | "Negotiation"
  | "Research"
  | "Contracts"
  | "SRM";

export type PromptStakes = "Low" | "Medium" | "High";

export type PromptFilter =
  | "All"
  | "Procurement"
  | "Marketing & GTM"
  | "Negotiation"
  | "Research"
  | "Contracts";

export type CiftPrompt = {
  id: string;
  category: PromptCategory;
  subcategory?: PromptSubcategory;
  stakes: PromptStakes;
  useCase: string;
  context: string;
  intent: string;
  format: string;
  tone: string;
};

export const PROMPT_FILTERS: PromptFilter[] = [
  "All",
  "Procurement",
  "Marketing & GTM",
  "Negotiation",
  "Research",
  "Contracts",
];

export const promptLibrary: CiftPrompt[] = [
  {
    id: "p1",
    category: "Procurement",
    stakes: "Medium",
    useCase: "Quickly understanding a new supplier category",
    context:
      "I'm sourcing [category — e.g. IT hardware, marketing services] for a [type] business in [region]. Current spend roughly £[X] annually.",
    intent:
      "Help me understand the market — top players, recent trends, key risks, and what to ask suppliers in first conversations.",
    format:
      "A 1-page brief structured as: 3 macro trends, top 5 players with one-line positioning each, 3 sourcing risks, 5 questions to ask in vendor calls.",
    tone: "Analytical, sourcing-led, no fluff.",
  },
  {
    id: "p2",
    category: "Procurement",
    subcategory: "Negotiation",
    stakes: "High",
    useCase: "Preparing for a difficult price increase discussion",
    context:
      "A long-term supplier is asking for a 15% price increase citing material costs. They've been our vendor for [X] years and represent £[Y] of annual spend.",
    intent:
      "Simulate their likely arguments, then help me draft a response that demands cost breakdowns without damaging the relationship.",
    format:
      "First, a simulated dialogue of their pitch and my best counter (3 exchanges). Then a bulleted email response with key asks.",
    tone: "Firm, data-driven, professional.",
  },
  {
    id: "p3",
    category: "Procurement",
    subcategory: "Contracts",
    stakes: "High",
    useCase: "Reviewing supplier-favoring contract clauses",
    context: "Paste the clause below. [Paste clause here]",
    intent:
      "Analyse this clause from a buyer perspective. Highlight language that disproportionately favours the supplier. Suggest specific redlines to better protect us.",
    format:
      "Side-by-side: original wording vs suggested redline, with a one-sentence rationale for each change.",
    tone: "Neutral, legally aware, practical — no over-lawyering.",
  },
  {
    id: "p4",
    category: "Procurement",
    subcategory: "SRM",
    stakes: "High",
    useCase: "Running a difficult vendor performance review (QBR)",
    context:
      "A logistics supplier has missed their On-Time Delivery SLA by 4% for two consecutive quarters. They're a strategic partner we can't easily replace.",
    intent:
      "Create a constructive QBR agenda that addresses the failure without damaging the relationship, plus a framework for a Performance Improvement Plan.",
    format:
      "Structured meeting agenda with time allocations, then a 3-step PIP outline with success metrics.",
    tone: "Constructive, firm, partnership-focused.",
  },
  {
    id: "p5",
    category: "Procurement",
    stakes: "Medium",
    useCase: "Comparing three vendor quotes objectively",
    context:
      "Three vendors quoting for [need]. Vendor A: £[X], 30-day delivery, Net 60 terms. Vendor B: £[Y], 14-day delivery, Net 30. Vendor C: £[Z], 7-day delivery, advance payment.",
    intent:
      "Build a weighted comparison considering price, quality, delivery, terms, and relationship risk. Recommend the best value, not just the cheapest.",
    format:
      "Comparison table with weighted scoring, then a recommendation paragraph with the trade-offs.",
    tone: "Analytical, decision-focused, transparent about assumptions.",
  },
  {
    id: "p6",
    category: "Procurement",
    stakes: "Low",
    useCase: "Asking a department head about their spend",
    context:
      "Marketing department spent £[X] on [category] last quarter, £[Y] above budget. I need to understand why before reporting up.",
    intent:
      "Draft an email asking for a breakdown that sounds curious, not accusatory. I need information, not a defensive response.",
    format: "Email, max 200 words, with three specific questions.",
    tone: "Collegial, curious, professional. No corporate jargon.",
  },
  {
    id: "p7",
    category: "Marketing & GTM",
    subcategory: "Research",
    stakes: "High",
    useCase: "Market sizing for a new product or market",
    context:
      "Considering launching [product/service] in [geography] targeting [customer segment]. Comparable products in adjacent markets sell for [price range].",
    intent:
      "Walk me through TAM, SAM, and SOM using both top-down and bottom-up methods. Be explicit about assumptions so I can challenge them.",
    format:
      "Three sizing numbers (TAM/SAM/SOM) with methodology shown, source assumptions listed, and a final sanity check comparing the two approaches.",
    tone:
      "Rigorous, transparent about assumptions, intellectually honest about uncertainty.",
  },
  {
    id: "p8",
    category: "Marketing & GTM",
    subcategory: "Research",
    stakes: "Medium",
    useCase: "Mapping competitors in a new category",
    context:
      "We're entering [category] in [region]. Our positioning is [statement]. We don't yet know the competitive set.",
    intent:
      "Map the top 5–7 competitors by positioning, pricing tier, and target segment. Identify any gaps in the market we could occupy.",
    format:
      "Competitive matrix (positioning × price tier) followed by 2-paragraph commentary on where the gaps are.",
    tone: "Analytical, neutral, opportunity-focused.",
  },
  {
    id: "p9",
    category: "Marketing & GTM",
    stakes: "High",
    useCase: "Identifying who to target first",
    context:
      "Selling [product/service] to a broad market of [description]. We have limited budget and need to pick where to start.",
    intent:
      "Identify 3–4 distinct customer segments with their needs, willingness-to-pay, and channels. Recommend a priority order.",
    format:
      "Segment profile cards (need / pain / WTP / channels) followed by a priority recommendation with rationale.",
    tone: "Strategic, customer-first, willing to make a clear call.",
  },
  {
    id: "p10",
    category: "Marketing & GTM",
    stakes: "Medium",
    useCase: "Sharpening a brand positioning statement",
    context:
      'Brand: [name]. Product: [what]. Current positioning statement: "[paste it]". Target customer: [segment].',
    intent:
      "Stress-test the positioning — what's weak, what's vague, what's claimed by competitors. Suggest 3 sharper alternatives.",
    format:
      "Audit of the current positioning (what works / what doesn't) followed by 3 alternatives with the trade-off of each.",
    tone: "Sharp, brand-strategist voice, willing to be uncomfortable.",
  },
  {
    id: "p11",
    category: "Marketing & GTM",
    stakes: "Medium",
    useCase: "Briefing an agency or internal team on a campaign",
    context:
      "Launching [product] for [segment]. Budget: £[X]. Timeline: [Y weeks]. Business objective: [what].",
    intent:
      "Generate a campaign brief covering objectives, KPIs, channels, messages, and creative direction.",
    format:
      "1-page structured brief with clear sections, written so an agency could start work from it.",
    tone: "Clear, action-oriented, no marketing-speak.",
  },
  {
    id: "p12",
    category: "Marketing & GTM",
    stakes: "Low",
    useCase: "Auditing whether content is doing its job",
    context:
      "We publish [X] pieces of content per month across [channels]. Past 90 days: [paste analytics summary or describe top/bottom 3].",
    intent:
      "Identify what's working, what isn't, what to stop, and what to double down on. Then suggest a 3-month forward plan.",
    format:
      "Audit table (what to keep / kill / scale) followed by a 3-month content plan with themes by month.",
    tone: "Honest, growth-focused, willing to recommend cuts.",
  },
];

export function assembleCiftPrompt(fields: {
  context: string;
  intent: string;
  format: string;
  tone: string;
}): string {
  return `Context: ${fields.context.trim()}\nIntent: ${fields.intent.trim()}\nFormat: ${fields.format.trim()}\nTone: ${fields.tone.trim()}`;
}

export function assemblePromptFromLibrary(prompt: CiftPrompt): string {
  return assembleCiftPrompt({
    context: prompt.context,
    intent: prompt.intent,
    format: prompt.format,
    tone: prompt.tone,
  });
}

export function filterPrompts(
  prompts: CiftPrompt[],
  filter: PromptFilter
): CiftPrompt[] {
  if (filter === "All") return prompts;
  if (filter === "Procurement" || filter === "Marketing & GTM") {
    return prompts.filter((p) => p.category === filter);
  }
  return prompts.filter((p) => p.subcategory === filter);
}
