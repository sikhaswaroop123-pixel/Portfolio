export const journeyIntro = {
  title: "How I got here",
  subtitle:
    "From Sambalpur to London and back — tap any stop for the full chapter.",
};

export type JourneyStep = {
  id: string;
  year: string;
  city: string;
  title: string;
  subtitle?: string;
  body: string;
  tags: readonly string[];
  youAreHere?: boolean;
};

export const journeySteps: JourneyStep[] = [
  {
    id: "born",
    year: "1999",
    city: "sambalpur",
    title: "Born in Odisha",
    body: "The beginning. Born in Odisha, raised on stories, books, and a lot of curiosity.",
    tags: ["the beginning"],
  },
  {
    id: "vikash",
    year: "2014–16",
    city: "bargarh",
    title: "Vikash Residential School",
    subtitle: "Monk-mode boarding school — discipline, mischief, and SQL",
    body: "Class 11–12 at boarding school. Commerce with Computer Programming — got bored of C++, fell in love with SQL. Lived four to a room, supervised like inmates. Up at 5am, lights out at 10pm. Most disciplined I've ever been. Quiet, focused, occasionally up to no good. Where I learned that depth comes from removing noise, not adding more.",
    tags: ["discipline", "focus", "early signs of an analyst"],
  },
  {
    id: "bcom",
    year: "2016–19",
    city: "bhubaneswar",
    title: "BCom Accounting, Utkal University",
    subtitle: "Foundations. Numbers, ledgers, the language of business.",
    body: "Three years of accounting, finance, and statistics. The grammar of how businesses work — long before the marketing brain arrived.",
    tags: ["bcom", "accounting", "foundations"],
  },
  {
    id: "idea",
    year: "2018",
    city: "bhubaneswar",
    title: "Idea Creations, Event Planning Intern",
    subtitle: "First taste of coordinating chaos at scale",
    body: "Summer internship at an event management firm. Managed 5+ clients from the National Informatics Centre, Delhi. Led planning for 5+ events with 800+ attendees. Discovered I'm calm when other people are panicking — useful both in events and in procurement.",
    tags: ["events", "client coordination", "the calm one"],
  },
  {
    id: "events-mumbai",
    year: "Aug 2019 – Mar 2020",
    city: "mumbai",
    title: "Freelance Event Management",
    subtitle: "18 events. 5,000–20,000 attendees. Live ops at the sharp end.",
    body: "Eight weddings, five corporate, five social events across Mumbai. Operational workflows, marketing coordination, live content delivery, ticketing, scheduling, vendor management — all in real time. High-pressure, people-heavy execution. Came home in March 2020.",
    tags: ["events", "live ops", "5K–20K attendees", "mumbai"],
  },
  {
    id: "radhe",
    year: "Apr–Dec 2020",
    city: "sambalpur",
    title: "The Radhe Ventures, C&F and Sales Executive",
    subtitle: "Selling steel & building materials across three districts",
    body: "On-the-ground sales across Sambalpur, Deogarh, and Jharsuguda. Negotiating with clients and dealers, hitting a 100 MT monthly sales target. Unglamorous, useful, taught me how commercial relationships actually work in the real economy.",
    tags: ["sales", "negotiation", "field work"],
  },
  {
    id: "prasant",
    year: "Feb 2021 – Jul 2022",
    city: "sambalpur",
    title: "Prasant Samantray, Project Analyst",
    subtitle: "First contact with commercial reality at scale",
    body: "Feasibility analysis, vendor benchmarking, and procurement evaluations across 15+ infrastructure sites. Rs 5–10 Cr projects. 100+ supplier negotiations. Reduced permit-related delays by 20%. Delivered 100% on time using MS Project. Very unglamorous. Extremely useful.",
    tags: ["procurement", "ms project", "100% on-time"],
  },
  {
    id: "bayes",
    year: "2022–23",
    city: "london",
    title: "Bayes Business School, MSc Marketing Strategy & Innovation (Merit)",
    subtitle: "Where the procurement brain met the marketing brain",
    body: "One year. Four live projects with real companies — Cookr, Yellow Bird, Aardman, Shell. Learned TAM/SAM sizing, consumer research, brand strategy, GTM planning. Graduated with Merit. Discovered I think like a buyer AND a marketer — and that combination is rare.",
    tags: ["bayes", "msc", "merit", "london"],
  },
  {
    id: "edt",
    year: "Jul 2023 – Sep 2025",
    city: "london",
    title: "Education Development Trust, Business Operations Analyst",
    subtitle: "Corporate London — where it came together",
    body: "Built automated dashboards that saved 300+ hours a year. Supported £100K+ investment decisions. Improved forecasting accuracy by 15%. Standardised templates that accelerated review cycles by 30%. Learned operational rigour at scale — and learned when to walk away from environments that didn't match the why behind the work.",
    tags: [
      "power bi",
      "power automate",
      "excel/vba",
      "sharepoint",
      "business world",
    ],
  },
  {
    id: "home-reset",
    year: "Dec 2025",
    city: "sambalpur",
    title: "Back home — family, pause, recalibrate",
    subtitle: "Not running away from London. Running toward something clearer.",
    body: "Left corporate London and came home to Odisha for the first proper stop in years. Time with family, long walks, no commute, no performance reviews. Read properly again. Started building Soireo. Helped a few small businesses think through procurement and marketing decisions. The pause wasn't idle — it was figuring out what kind of work actually fits, before picking a city to bet on next.",
    tags: ["home", "family", "reset", "sambalpur"],
  },
  {
    id: "bengaluru",
    year: "Mar 2026",
    city: "bengaluru",
    title: "Bengaluru — where the quest gets real",
    subtitle: "New city. Same standards. Different scale of ambition.",
    body: "Moved to Bengaluru to build in earnest — portfolio, demos, client work, and the search for the right full-time role in ops, procurement, or GTM. India's startup capital moves fast; I wanted to be somewhere that matches that energy. Still building in public, still open to collaborations, still looking for the room where the work actually matters.",
    tags: ["bengaluru", "building", "open to work"],
    youAreHere: true,
  },
];
