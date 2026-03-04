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
      "Outcome: 31 internal controls documented and mapped to specific risks with supporting evidence. Built a full internal controls exhibit for an operations-focused process, with workpapers structured like an internal audit file.",
    tags: ["Internal Audit", "COSO", "Controls Testing", "Risk Assessment"],
    highlights: [
      "Mapped 31 controls to specific risks and objectives",
      "Created audit-style exhibits with documentation + photo evidence",
      "Assigned risk levels and identified improvement opportunities",
    ],
    timeframe: "ACCT 3233 project",
    link: {
      label: "View project page",
      href: "/projects/fin-bomb-internal-controls-exhibit-coso-framework",
    },
    problem: "Unclear control ownership increased risk of inconsistent execution.",
    framework: "COSO-based mapping of risks to controls, evidence, and ratings.",
    outcome: "31 controls mapped to risks with documented evidence and ratings.",
  },
  {
    title: "Amazon 10-K Accounting Analysis",
    subtitle: "Disclosures deep dive across major accounting topics",
    description:
      "Outcome: reference-ready outline connecting key 10-K disclosures to financial statement impacts. Completed a structured analysis of Amazon's 10-K focused on revenue recognition, EPS, OCI, and deferred taxes.",
    tags: ["Financial Reporting", "10-K", "GAAP", "Disclosure Analysis"],
    highlights: [
      "Synthesized complex footnote disclosures into concise summaries",
      "Connected accounting policies to financial statement impacts",
      "Organized findings into a clean, reference-ready outline",
    ],
    timeframe: "Intermediate Accounting II",
    problem: "High-impact accounting risks in 10-K disclosures can be missed or misinterpreted.",
    framework: "Top-down review linking key disclosures to financial statement line items.",
    outcome: "Structured outline that connects critical notes to statement impacts for faster, focused review.",
  },
  {
    title: "Global Minimum Tax Policy Paper (Pillar Two)",
    subtitle: "Policy analysis with U.S. tax code connections",
    description:
      "Outcome: concise view of incentives, risks, and planning implications for Pillar Two adoption. Researched and wrote a policy analysis linking OECD global minimum tax rules to U.S. international tax.",
    tags: ["Tax Policy", "OECD Pillar Two", "International Tax", "Research"],
    highlights: [
      "Explained Pillar Two mechanics and planning implications",
      "Connected global minimum tax concepts to U.S. tax provisions",
      "Presented tradeoffs: compliance burden vs. anti–profit shifting goals",
    ],
    timeframe: "ACCT 3221 Group B",
    problem: "Complex global minimum tax rules create planning and compliance risk.",
    framework: "Policy analysis tying OECD Pillar Two mechanics to U.S. international tax rules.",
    outcome: "Concise view of incentives, risks, and planning implications for Pillar Two adoption.",
  },
  {
    title: "Power BI Profitability Dashboard (Beverage Dataset)",
    subtitle: "Multi-year trend + margin analysis with slicers",
    description:
      "Outcome: decision-ready dashboard surfacing profitability and trend insights by segment and period. Built a Power BI model from multi-year beverage data to evaluate revenue, cost behavior, and margins.",
    tags: ["Power BI", "Analytics", "KPIs", "Profitability"],
    highlights: [
      "Modeled data for trend and profitability reporting",
      "Built KPI tiles + slicers for fast segment/time analysis",
      "Focused on layout clarity and executive-style readability",
    ],
    timeframe: "Analytics coursework",
    problem: "Fragmented multi-year data obscured trends and margin drivers for decision-making.",
    framework: "Modeled multi-year data with KPIs and slicers to expose revenue and margin patterns.",
    outcome: "Decision-ready dashboard that surfaces key profitability and trend insights quickly.",
  },
  {
    title: "AI Club Finance System Concept",
    subtitle: "Real-time budget tracking + sponsorship pipeline",
    description:
      "Outcome: finance system concept giving officers a clear, current view of funds and control points. Designed a real-time budget and sponsorship tracking approach with simple control checkpoints.",
    tags: ["Budgeting", "Internal Controls", "Systems", "Dashboards"],
    highlights: [
      "Outlined a real-time budget tracking structure",
      "Designed a sponsorship tracking model to support growth",
      "Built lightweight controls for approvals + documentation",
    ],
    timeframe: "Student org initiative",
    problem: "Limited visibility into funds and sponsorships increased budgeting and control risk.",
    framework: "Real-time tracking with defined categories, approvals, and sponsorship pipeline.",
    outcome: "Finance system concept that gives officers a clear, current view of funds and control points.",
  },
  {
    title: "Advanced Excel Systems (MOS / Analytics Builds)",
    subtitle: "Lookup logic, structured references, and auditability",
    description:
      "Outcome: Excel models where key flows are easy to trace and errors are easier to detect. Completed advanced builds using XLOOKUP/VLOOKUP, IFERROR/IFNA, structured references, and review-friendly formatting.",
    tags: ["Excel", "Modeling", "Data Quality", "Functions"],
    highlights: [
      "Built reliable lookup workflows with robust error handling",
      "Used structured references and consistent formatting standards",
      "Designed models to be easy to review and grade against rubrics",
    ],
    timeframe: "Coursework",
    problem: "Opaque lookup logic could introduce undetected errors into reports.",
    framework: "XLOOKUP/IFERROR with structured references and consistent formatting for traceability.",
    outcome: "Excel models where key flows are easy to trace and errors are easier to detect.",
  },
];

/** First 4 projects for homepage Systems I've Built (COSO, 10-K, Power BI, Budget). */
export const featuredSystemsProjects = [
  projects[0],
  projects[1],
  projects[3],
  projects[4],
];
