export const metrics = [
  {
    id: "hours-saved",
    value: 300,
    label: "hours saved annually through automated reporting workflows",
    sublabel: "Power Automate · Excel VBA · Dashboards",
    format: "plus" as const,
  },
  {
    id: "forecasting",
    value: 15,
    label: "improvement in forecasting accuracy through scenario modelling",
    sublabel: "CapEx/OpEx · Variance analysis · Planning",
    format: "percent" as const,
  },
  {
    id: "review-cycles",
    value: 30,
    label: "faster review cycles through standardised templates and dashboards",
    sublabel: "Process design · Governance · Templates",
    format: "percent" as const,
  },
  {
    id: "capex",
    value: 100000,
    label: "investment decisions supported through CapEx/OpEx reporting",
    sublabel: "Financial reporting · Stakeholder briefings",
    format: "currency-k" as const,
  },
  {
    id: "delivery",
    value: 100,
    label: "on-time project delivery across Rs 5–10 Cr infrastructure projects",
    sublabel: "Resource planning · Delivery",
    format: "percent" as const,
  },
  {
    id: "events",
    value: 18,
    label: "events coordinated across weddings, corporate & social (5K–20K attendees)",
    sublabel: "Mumbai · Live ops · Vendor coordination",
    format: "number" as const,
  },
] as const;
