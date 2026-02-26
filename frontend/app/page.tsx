"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "./lib/siteContent";
import { featuredSystemsProjects } from "./lib/projectsData";

const RISK_LENS_ITEMS = [
  "Where does discretion live?",
  "What assumption isn't documented?",
  "What fails silently?",
  "What breaks under scale?",
  "What would I test first?",
];

const PERFORMANCE_GRAPH = {
  points: [
    { semester: 1, value: 2.5 },
    { semester: 2, value: 2.9 },
    { semester: 3, value: 3.2 },
    { semester: 4, value: 3.4 },
    { semester: 5, value: 3.6 },
  ],
  tooltips: [
    "Reset. Built structure.",
    "Consistency over motivation.",
    "Systems improving.",
    "Higher standards.",
    "Dialed in.",
  ],
};

const SYSTEM_VIEW_MAP: Record<
  string,
  { title: string; subtitle: string; bullets: [string, string, string] }
> = {
  "Fin Bomb Internal Controls Exhibit (COSO Framework)": {
    title: "Control Documentation Framework",
    subtitle: "31 risk-mapped controls",
    bullets: [
      "Input: Operational workflow",
      "Process: Risk identification + control mapping",
      "Output: Audit-ready evidence structure",
    ],
  },
  "Amazon 10-K Accounting Analysis": {
    title: "Disclosure Analysis System",
    subtitle: "Note-to-statement mapping",
    bullets: [
      "Input: 10-K and footnote disclosures",
      "Process: Trace policies and estimates to statement impact",
      "Output: Reference-ready outline for high-impact areas",
    ],
  },
  "Power BI Profitability Dashboard (Beverage Dataset)": {
    title: "Decision Support System",
    subtitle: "Multi-year margin visibility engine",
    bullets: [
      "Input: 4-year dataset",
      "Process: Modeled revenue and cost drivers",
      "Output: Clean KPI visualization for decision-making",
    ],
  },
  "AI Club Finance System Concept": {
    title: "Budget Control System",
    subtitle: "Real-time visibility and sponsorship pipeline",
    bullets: [
      "Input: Org funds and sponsorship commitments",
      "Process: Real-time tracking, approval checkpoints, clear categories",
      "Output: Transparent budget and sponsorship model with simple controls",
    ],
  },
};

function getUniqueTags(projects: typeof featuredSystemsProjects) {
  const set = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export default function Home() {
  const [identityTab, setIdentityTab] = useState<"guard" | "comeback">("guard");
  const [selectedValueIndex, setSelectedValueIndex] = useState<number | null>(null);
  const [expandedMilestoneIndex, setExpandedMilestoneIndex] = useState<number | null>(null);
  const [systemTagFilter, setSystemTagFilter] = useState<string | null>(null);
  const [riskChecked, setRiskChecked] = useState<boolean[]>(() => RISK_LENS_ITEMS.map(() => false));
  const [metricValues, setMetricValues] = useState<number[]>(() =>
    siteContent.metrics.map(() => 0)
  );
  const [metricsVisible, setMetricsVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsAnimated = useRef(false);
  const [graphLineVisible, setGraphLineVisible] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const graphAnimated = useRef(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [workView, setWorkView] = useState<"project" | "system">("project");

  const uniqueTags = getUniqueTags(featuredSystemsProjects);
  const filteredSystems =
    systemTagFilter == null
      ? featuredSystemsProjects
      : featuredSystemsProjects.filter((p) => p.tags.includes(systemTagFilter));

  useEffect(() => {
    const el = metricsRef.current;
    if (!el || metricsAnimated.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMetricsVisible(true);
          metricsAnimated.current = true;
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = graphRef.current;
    if (!el || graphAnimated.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setGraphLineVisible(true);
          graphAnimated.current = true;
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!metricsVisible) return;
    const targets = siteContent.metrics.map((m) => m.value);
    const duration = 1200;
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - (1 - t) * (1 - t);
      setMetricValues(
        targets.map((target) => Math.round(ease * target))
      );
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [metricsVisible]);

  const selectedValue =
    selectedValueIndex != null
      ? siteContent.service.values[selectedValueIndex]
      : null;

  return (
    <div className="space-y-20">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Hero: 2-col desktop */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Internal Audit mindset. Guard discipline. Built through persistence.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            I'm an Accounting student at LSU pursuing the CIA & CRM Internal
            Audit minor. I like work that is testable, evidence-based, and built
            to scale.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/projects"
              className="lsu-btn-gold transition hover:shadow-md hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <a
              href="mailto:Myles.D.Goodrich@gmail.com"
              className="lsu-btn-outline transition hover:shadow-md hover:-translate-y-0.5"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Identity Card */}
        <div className="lsu-card border-brand-purple/20 transition hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex gap-1 border-b border-border pb-3">
            <button
              type="button"
              onClick={() => setIdentityTab("guard")}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                identityTab === "guard"
                  ? "bg-brand-gold text-black border-brand-gold"
                  : "bg-surface text-muted border-border hover:bg-surface-2"
              }`}
            >
              National Guard
            </button>
            <button
              type="button"
              onClick={() => setIdentityTab("comeback")}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                identityTab === "comeback"
                  ? "bg-brand-gold text-black border-brand-gold"
                  : "bg-surface text-muted border-border hover:bg-surface-2"
              }`}
            >
              Academic Comeback
            </button>
          </div>
          <div className="mt-4 min-h-[120px]">
            {identityTab === "guard" ? (
              <>
                <p className="text-sm leading-7 text-muted">
                  {siteContent.service.roleSummary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siteContent.service.values.map((v, i) => (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setSelectedValueIndex(selectedValueIndex === i ? null : i)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        selectedValueIndex === i
                          ? "border-brand-gold bg-brand-gold/20 text-brand-gold"
                          : "border-border bg-surface text-muted hover:bg-surface-2"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm leading-7 text-muted">
                  {siteContent.comeback.summary}
                </p>
                <p className="mt-4 text-xs font-medium text-muted-2">
                  Progress is earned — built one semester at a time.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      {/* Values in Action */}
      <section aria-labelledby="values-heading" className="space-y-4">
        <h2
          id="values-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Values in Action
        </h2>
        <p className="text-sm text-muted">
          Click a value to see how it shows up in my work.
        </p>
        <div className="lsu-card transition hover:shadow-lg hover:-translate-y-0.5">
          <div className="flex flex-wrap gap-2">
            {siteContent.service.values.map((v, i) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setSelectedValueIndex(selectedValueIndex === i ? null : i)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selectedValueIndex === i
                    ? "border-brand-gold bg-brand-gold/20 text-brand-gold"
                    : "border-border bg-surface text-muted hover:bg-surface-2"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          {selectedValue != null && (
            <p className="mt-4 border-t border-border pt-4 text-sm leading-7 text-muted">
              {selectedValue.description}
            </p>
          )}
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Academic Comeback Timeline */}
      <section aria-labelledby="comeback-heading" className="space-y-4">
        <h2
          id="comeback-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Academic Comeback Timeline
        </h2>
        <p className="text-sm text-muted">
          A rough start taught me how to build systems and improve consistently.
        </p>
        <div className="space-y-3">
          {siteContent.comeback.milestones.map((m, i) => (
            <div
              key={m.year}
              className="lsu-card transition hover:shadow-lg hover:-translate-y-0.5"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedMilestoneIndex(expandedMilestoneIndex === i ? null : i)
                }
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="text-xs font-medium text-muted-2">{m.year}</span>
                <span className="font-medium text-foreground">{m.title}</span>
                <span
                  className="text-brand-purple transition-transform"
                  aria-hidden
                >
                  {expandedMilestoneIndex === i ? "−" : "+"}
                </span>
              </button>
              {expandedMilestoneIndex === i && (
                <p className="mt-3 border-t border-border pt-3 text-sm leading-7 text-muted">
                  {m.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Performance Over Time */}
      <section
        ref={graphRef}
        aria-labelledby="performance-heading"
        className="space-y-4"
      >
        <h2
          id="performance-heading"
          className="text-xl font-semibold tracking-tight text-foreground underline decoration-brand-gold decoration-2 underline-offset-4"
        >
          Performance Over Time
        </h2>
        <p className="text-sm text-muted">
          Growth built through structure and persistence.
        </p>
        <div className="lsu-card overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
          <div className="relative px-4 pb-4 pt-2">
            <div className="relative inline-block w-full max-w-2xl">
            <svg
              viewBox="0 0 360 100"
              className="w-full max-w-2xl"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="lineGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="var(--brand-purple)" />
                  <stop offset="100%" stopColor="var(--brand-purple)" />
                </linearGradient>
              </defs>
              {/* Horizontal grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1={40}
                  y1={20 + i * 20}
                  x2={320}
                  y2={20 + i * 20}
                  stroke="var(--border)"
                  strokeWidth="0.5"
                />
              ))}
              {/* Line path: x 40,100,160,220,280 for semesters 1-5; y from bottom 60 to top 10 (values 2.5->3.6) */}
              <path
                d="M 40 60 L 100 35.5 L 160 24.5 L 220 17.3 L 280 10"
                fill="none"
                stroke="var(--brand-purple)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: "300 300",
                  strokeDashoffset: graphLineVisible ? 0 : 300,
                  transition: "stroke-dashoffset 1.2s ease-out",
                }}
              />
              {PERFORMANCE_GRAPH.points.map((pt, i) => {
                const x = 40 + i * 70;
                const y = 60 - ((pt.value - 2.5) / 1.1) * 40;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={hoveredPointIndex === i ? 6 : 5}
                      fill="var(--brand-gold)"
                      stroke="var(--brand-purple)"
                      strokeWidth="1"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredPointIndex(i)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                  </g>
                );
              })}
            </svg>
            {hoveredPointIndex !== null && (
              <div
                className="pointer-events-none absolute z-10 rounded border border-border bg-surface px-3 py-2 text-sm text-foreground shadow-md"
                style={{
                  left: `${((40 + hoveredPointIndex * 70) / 360) * 100}%`,
                  top: "0.5rem",
                  transform: "translateX(-50%)",
                }}
              >
                {PERFORMANCE_GRAPH.tooltips[hoveredPointIndex]}
              </div>
            )}
            </div>
          </div>
          <p className="border-t border-border px-4 py-3 text-sm text-muted">
            This reflects how I approach growth: diagnose, build structure,
            track results, improve.
          </p>
        </div>
      </section>

      <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Proof (metrics) */}
      <section aria-labelledby="proof-heading" className="space-y-4">
        <h2
          id="proof-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Proof
        </h2>
        <p className="text-sm text-muted">
          A few numbers that summarize the kind of work I like to do.
        </p>
        <div
          ref={metricsRef}
          className="grid gap-6 sm:grid-cols-3"
        >
          {siteContent.metrics.map((m, i) => (
            <div
              key={m.label}
              className="lsu-card text-center transition hover:shadow-lg hover:-translate-y-0.5"
            >
              <p className="text-3xl font-semibold tabular-nums text-brand-purple">
                {metricValues[i]}
                {m.suffix}
              </p>
              <p className="mt-1 text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Leadership, Training, Quick Facts */}
      <section aria-labelledby="more-personal-heading" className="space-y-4">
        <h2
          id="more-personal-heading"
          className="sr-only"
        >
          More about me
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="lsu-card transition hover:shadow-lg hover:-translate-y-0.5">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {siteContent.leadership.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              {siteContent.leadership.summary}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
              {siteContent.leadership.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="lsu-card transition hover:shadow-lg hover:-translate-y-0.5">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {siteContent.athletics.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              {siteContent.athletics.summary}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
              {siteContent.athletics.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="lsu-card transition hover:shadow-lg hover:-translate-y-0.5">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {siteContent.personal.title}
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted">
              {siteContent.personal.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Systems I've Built with tag filter + System Builder Toggle */}
      <section aria-labelledby="systems-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="systems-heading"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Systems I've Built
            </h2>
            <p className="mt-1 text-sm text-muted">
              Projects that reflect my internal-audit mindset: structure,
              controls, evidence, and clear reporting.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-brand-purple underline underline-offset-4 hover:decoration-brand-gold"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSystemTagFilter(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              systemTagFilter == null
                ? "border-brand-gold bg-brand-gold/15 text-foreground"
                : "border-border bg-surface text-muted hover:bg-surface-2"
            }`}
          >
            All
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSystemTagFilter(tag)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                systemTagFilter === tag
                  ? "border-brand-gold bg-brand-gold/15 text-foreground"
                  : "border-border bg-surface text-muted hover:bg-surface-2"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Two Ways to View My Work
          </h3>
          <p className="text-sm text-muted">
            I don't just complete projects. I build repeatable systems.
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setWorkView("project")}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                workView === "project"
                  ? "bg-brand-gold text-black border-brand-gold"
                  : "bg-surface text-muted border-border hover:bg-surface-2"
              }`}
            >
              Project View
            </button>
            <button
              type="button"
              onClick={() => setWorkView("system")}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                workView === "system"
                  ? "bg-brand-gold text-black border-brand-gold"
                  : "bg-surface text-muted border-border hover:bg-surface-2"
              }`}
            >
              System View
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {filteredSystems.map((project) => {
            const systemView = SYSTEM_VIEW_MAP[project.title];
            return (
              <article
                key={project.title}
                className="lsu-card transition hover:shadow-lg hover:-translate-y-0.5"
              >
                {workView === "project" ? (
                  <div key="project" className="lsu-card-inner">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {project.description}
                    </p>
                    {project.highlights.length > 0 && (
                      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
                        {project.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : systemView ? (
                  <div key="system" className="lsu-card-inner">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {systemView.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-2">
                      {systemView.subtitle}
                    </p>
                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
                      {systemView.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div key="fallback" className="lsu-card-inner text-sm text-muted">
                    <h3 className="text-base font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2">{project.description}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      {/* Risk Lens interactive */}
      <section aria-labelledby="risk-heading" className="space-y-4">
        <h2
          id="risk-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Risk Lens
        </h2>
        <p className="text-sm text-muted">
          When I review a process, these are the questions I start with:
        </p>
        <div className="lsu-card transition hover:shadow-lg hover:-translate-y-0.5">
          <ul className="space-y-3">
            {RISK_LENS_ITEMS.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`risk-${i}`}
                  checked={riskChecked[i]}
                  onChange={() => {
                    const next = [...riskChecked];
                    next[i] = !next[i];
                    setRiskChecked(next);
                  }}
                  className="h-4 w-4 rounded border-border text-brand-gold focus:ring-brand-purple/50"
                />
                <label
                  htmlFor={`risk-${i}`}
                  className="cursor-pointer text-sm text-muted"
                >
                  {item}
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-2 rounded-full bg-brand-gold transition-all duration-300"
                style={{ width: `${(riskChecked.filter(Boolean).length / 5) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">
              {riskChecked.filter(Boolean).length === 0 &&
                "Start here — check the boxes you'd investigate first."}
              {riskChecked.filter(Boolean).length >= 1 &&
                riskChecked.filter(Boolean).length <= 2 &&
                "Good. You're isolating risk. Keep going."}
              {riskChecked.filter(Boolean).length >= 3 &&
                riskChecked.filter(Boolean).length <= 4 &&
                "Strong audit thinking — now you're building a test plan."}
              {riskChecked.filter(Boolean).length === 5 &&
                "Locked in. This is an audit-ready review mindset."}
            </p>
            <div className="mt-3">
              <p className="text-xs font-medium text-muted-2">Audit plan</p>
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-muted">
                {riskChecked.filter(Boolean).length <= 2 && (
                  <>
                    <li>Identify where discretion lives and document it</li>
                    <li>List assumptions and make them testable</li>
                  </>
                )}
                {riskChecked.filter(Boolean).length >= 3 &&
                  riskChecked.filter(Boolean).length <= 4 && (
                    <>
                      <li>Identify where discretion lives and document it</li>
                      <li>List assumptions and make them testable</li>
                      <li>Map failure modes and silent-fail scenarios</li>
                      <li>Define scale tests and prioritise what to test first</li>
                    </>
                  )}
                {riskChecked.filter(Boolean).length === 5 && (
                  <>
                    <li>Identify where discretion lives and document it</li>
                    <li>List assumptions and make them testable</li>
                    <li>Map failure modes and silent-fail scenarios</li>
                    <li>Define scale tests and prioritise what to test first</li>
                    <li>Execute tests and document findings</li>
                  </>
                )}
              </ul>
              {riskChecked.filter(Boolean).length === 5 && (
                <span className="mt-2 inline-block rounded-full bg-brand-gold/20 px-2.5 py-0.5 text-xs font-semibold text-brand-gold">
                  Audit mode
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setRiskChecked(RISK_LENS_ITEMS.map(() => false))}
              className="mt-4 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-2"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="lsu-card">
        <h2
          id="contact-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Contact
        </h2>
        <p className="mt-4 text-sm text-muted">{siteContent.email}</p>
        <p className="mt-1 text-sm text-muted">{siteContent.location}</p>
        <div className="mt-6">
          <a href={`mailto:${siteContent.email}`} className="lsu-btn-gold">
            Email me
          </a>
        </div>
      </section>
    </div>
  );
}
