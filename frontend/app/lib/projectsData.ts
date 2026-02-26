export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  highlights: string[];
  timeframe?: string;
  link?: { label: string; href: string };
  /** Short line for systems framing: Problem → Framework → Outcome */
  problem?: string;
  framework?: string;
  outcome?: string;
};

export const projects: Project[] = [
  {
    title: "Fin Bomb Internal Controls Exhibit (COSO Framework)",
    subtitle: "31 controls mapped to risks with photo evidence",
    description:
      "Built a full internal controls exhibit for an operations-focused project by documenting 31 controls, tying each to the relevant risk, and supporting conclusions with clear evidence (including photos and write-ups). The final deliverable was structured like an internal audit workpaper set—clean, repeatable, and easy to test.",
    tags: ["Internal Audit", "COSO", "Controls Testing", "Risk Assessment"],
    highlights: [
      "Mapped 31 controls to specific risks and objectives",
      "Created audit-style exhibits with documentation + photo evidence",
      "Assigned risk levels and identified improvement opportunities",
    ],
    timeframe: "ACCT 3025 project",
    problem: "Process had gaps and inconsistent documentation.",
    framework: "COSO-style risk → control → evidence → rating.",
    outcome: "Audit-ready exhibit set with 31 controls and photo evidence.",
  },
  {
    title: "Amazon 10-K Accounting Analysis",
    subtitle: "Disclosures deep dive across major accounting topics",
    description:
      "Completed a structured analysis of Amazon's 10-K with emphasis on high-impact accounting areas like revenue recognition, EPS, OCI, and deferred taxes. Focused on interpreting note disclosures and translating them into clear takeaways and implications.",
    tags: ["Financial Reporting", "10-K", "GAAP", "Disclosure Analysis"],
    highlights: [
      "Synthesized complex footnote disclosures into concise summaries",
      "Connected accounting policies to financial statement impacts",
      "Organized findings into a clean, reference-ready outline",
    ],
    timeframe: "Intermediate Accounting II",
    problem: "10-K disclosures are dense and easy to lose the thread.",
    framework: "Start with what moves the numbers; trace policies and estimates.",
    outcome: "Reference-ready outline connecting notes to statement impact.",
  },
  {
    title: "Global Minimum Tax Policy Paper (Pillar Two)",
    subtitle: "Policy analysis with U.S. tax code connections",
    description:
      "Researched and wrote a policy-focused analysis of the OECD global minimum tax (Pillar Two) and how it interacts with U.S. international tax rules. Emphasized real-world incentives, compliance complexity, and how rule design affects investment and reporting decisions.",
    tags: ["Tax Policy", "OECD Pillar Two", "International Tax", "Research"],
    highlights: [
      "Explained Pillar Two mechanics and planning implications",
      "Connected global minimum tax concepts to U.S. tax provisions",
      "Presented tradeoffs: compliance burden vs. anti–profit shifting goals",
    ],
    timeframe: "ACCT 3221 Group B",
    problem: "Global minimum tax rules are complex and affect planning.",
    framework: "Policy analysis linking OECD Pillar Two to U.S. tax code.",
    outcome: "Clear tradeoffs: compliance burden vs. anti–profit shifting.",
  },
  {
    title: "Power BI Profitability Dashboard (Beverage Dataset)",
    subtitle: "Multi-year trend + margin analysis with slicers",
    description:
      "Built a Power BI dashboard from a multi-year beverage dataset to evaluate revenue trends, cost behavior, and profitability by category/segment. Designed it to be decision-friendly with clean KPIs, slicers, and visuals that tell a story quickly.",
    tags: ["Power BI", "Analytics", "KPIs", "Profitability"],
    highlights: [
      "Modeled data for trend and profitability reporting",
      "Built KPI tiles + slicers for fast segment/time analysis",
      "Focused on layout clarity and executive-style readability",
    ],
    timeframe: "Analytics coursework",
    problem: "Multi-year data without clear view of trends or profitability.",
    framework: "Model data; build KPIs and slicers for segment and time.",
    outcome: "Dashboard that supports fast, decision-ready analysis.",
  },
  {
    title: "AI Club Finance System Concept",
    subtitle: "Real-time budget tracking + sponsorship pipeline",
    description:
      "Designed a finance-system concept for a student organization focused on transparency and scalability: real-time budget tracking, sponsor tracking, and simple control checkpoints so the board always knows where funds stand.",
    tags: ["Budgeting", "Internal Controls", "Systems", "Dashboards"],
    highlights: [
      "Outlined a real-time budget tracking structure",
      "Designed a sponsorship tracking model to support growth",
      "Built lightweight controls for approvals + documentation",
    ],
    timeframe: "Student org initiative",
    problem: "Org funds and sponsorships were opaque and hard to track.",
    framework: "Real-time tracking, approval checkpoints, clear categories.",
    outcome: "Transparent budget and sponsorship model with simple controls.",
  },
  {
    title: "Advanced Excel Systems (MOS / Analytics Builds)",
    subtitle: "Lookup logic, structured references, and auditability",
    description:
      "Completed multiple advanced Excel builds using XLOOKUP/VLOOKUP, IFERROR/IFNA, structured references, and reporting-friendly formatting. Emphasized accuracy, clean structure, and models that are easy to check.",
    tags: ["Excel", "Modeling", "Data Quality", "Functions"],
    highlights: [
      "Built reliable lookup workflows with robust error handling",
      "Used structured references and consistent formatting standards",
      "Designed models to be easy to review and grade against rubrics",
    ],
    timeframe: "Coursework",
    problem: "Data and lookups needed to be correct and auditable.",
    framework: "XLOOKUP/IFERROR, structured references, consistent formatting.",
    outcome: "Models that are easy to review and grade against rubrics.",
  },
];

/** First 4 projects for homepage Systems I've Built (COSO, 10-K, Power BI, Budget). */
export const featuredSystemsProjects = [
  projects[0],
  projects[1],
  projects[3],
  projects[4],
];
