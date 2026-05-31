export type WorkRole = {
  id: string;
  company: string;
  companyFull?: string;
  location?: string;
  period?: string;
  role?: string;
  highlights: readonly string[];
};

/** Most recent first */
export const workExperience: WorkRole[] = [
  {
    id: "edt",
    company: "Education Development Trust",
    companyFull: "London",
    location: "London",
    period: "Jul 2023 – Sep 2025",
    role: "Business Operations Analyst",
    highlights: [
      "Built automated Excel dashboards and spend trackers — saved 300+ hours annually in manual reporting",
      "Led CapEx/OpEx reporting supporting £100K+ investment decisions; improved forecasting accuracy by 15%",
      "Standardised KPI dashboards and templates — accelerated review cycles by 30%",
      "Power BI · Power Automate · Excel/VBA · SharePoint · Business World (BW)",
    ],
  },
  {
    id: "prasant",
    company: "Prasant Samantray",
    companyFull: "Public construction · self-employed",
    location: "Sambalpur, Odisha",
    period: "Feb 2021 – Jul 2022",
    role: "Project Analyst",
    highlights: [
      "Procurement and supply chain across 15+ infrastructure sites (Rs 5 Cr portfolio).",
      "RFP/tendering, vendor negotiations with 100+ suppliers, 8–10% cost savings.",
      "Audit-ready SOW records and on-time delivery via Microsoft Project.",
    ],
  },
  {
    id: "radhe",
    company: "The Radhe Ventures",
    companyFull: "Steel & building materials sales",
    location: "Sambalpur, Odisha",
    period: "Apr 2020 – Dec 2020",
    role: "C&F and Sales Executive",
    highlights: [
      "Sales promotion and outreach for rods, steel, and construction materials across Sambalpur, Deogarh, and Jharsuguda.",
      "Negotiated with clients and dealers to grow the regional customer base.",
      "Consistently achieved sales target of 100 MT per month.",
    ],
  },
  {
    id: "idea",
    company: "Idea Creations",
    companyFull: "Event management firm",
    location: "Bhubaneswar, Odisha",
    period: "May 2018 – Aug 2018",
    role: "Event Planning Intern",
    highlights: [
      "Managed customer relations for 5+ clients from the National Informatics Centre, Delhi — planned minute-to-minute event movement for seamless coordination.",
      "Led overall planning and management of 5+ events with an average footfall of 800+ attendees.",
      "Directed a 5-person creative and execution team — invitation templates, venue decoration, and on-site setup delivered on time.",
    ],
  },
];
