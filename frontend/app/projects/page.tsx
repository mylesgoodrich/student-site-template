import type { ReactNode } from "react";
import Link from "next/link";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  highlights: string[];
  timeframe?: string;
  link?: { label: string; href: string };
};

const projects: Project[] = [
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
  },
];

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
      {children}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-600">{project.subtitle}</p>
          </div>
          {project.timeframe ? (
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              {project.timeframe}
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm leading-6 text-neutral-700">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {project.link ? (
          <div className="mt-5">
            <a
              href={project.link.href}
              className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
            >
              {project.link.label}
              <span className="ml-2" aria-hidden>
                →
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
          A few things I've built and analyzed across internal audit, controls,
          financial reporting, and analytics. I care about clean structure,
          auditability, and results that are easy to explain.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
          >
            Back to Home
          </Link>
          <a
            href="mailto:Myles.D.Goodrich@gmail.com"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
          >
            Contact Me
          </a>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          What I'm aiming for
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-700">
          Roles where I can combine accounting fundamentals with internal audit
          thinking: testing controls, identifying risk, improving processes, and
          building dashboards that make decisions easier.
        </p>
      </section>
    </main>
  );
}
