"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, BarChart3, Target } from "lucide-react";
import { siteContent } from "./lib/siteContent";
import { featuredSystemsProjects } from "./lib/projectsData";
import { fadeUp, fadeIn } from "./lib/motion";
import OperatingSystemDashboard from "./components/OperatingSystemDashboard";
import Pill from "./components/ui/Pill";

const RISK_LENS_ITEMS = [
  "Where does discretion live?",
  "What assumption isn't documented?",
  "What fails silently?",
  "What breaks under scale?",
  "What would I test first?",
];

const PERFORMANCE_GRAPH = {
  /** Single dataset: 5 points, evenly spaced x, y from GPA values. Line and dots use this. */
  points: [
    { value: 2.5 },
    { value: 2.9 },
    { value: 3.2 },
    { value: 3.4 },
    { value: 3.9 },
  ],
  milestones: ["Reset", "Structure", "Momentum", "LSU", "3.9 GPA"],
  tooltips: [
    "Reset. Built structure.",
    "Consistency over motivation.",
    "Systems improving.",
    "Higher standards.",
    "Dialed in.",
  ],
};

const PLOT = {
  viewWidth: 360,
  viewHeight: 120,
  left: 36,
  right: 324,
  top: 28,
  bottom: 76,
  minGpa: 2.5,
  maxGpa: 3.9,
};
function getPlotCoords(index: number, value: number) {
  const x = PLOT.left + (index / 4) * (PLOT.right - PLOT.left);
  const y =
    PLOT.bottom -
    ((value - PLOT.minGpa) / (PLOT.maxGpa - PLOT.minGpa)) * (PLOT.bottom - PLOT.top);
  return { x, y };
}
function getPerformancePathD() {
  return PERFORMANCE_GRAPH.points
    .map((pt, i) => getPlotCoords(i, pt.value))
    .reduce(
      (acc, { x, y }, i) => (i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`),
      ""
    );
}
function getPerformanceAreaPathD() {
  const coords = PERFORMANCE_GRAPH.points.map((pt, i) => getPlotCoords(i, pt.value));
  const x0 = coords[0].x;
  const linePart = coords.reduce(
    (acc, { x, y }, i) => (i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`),
    ""
  );
  const last = coords[coords.length - 1];
  return `${linePart} L ${last.x} ${PLOT.bottom} L ${x0} ${PLOT.bottom} Z`;
}

function truncateText(text: string, max = 60) {
  const t = text.trim();
  if (t.length <= max) return t;
  const hard = t.slice(0, Math.max(0, max - 1));
  const lastSpace = hard.lastIndexOf(" ");
  const soft = lastSpace > 30 ? hard.slice(0, lastSpace) : hard;
  return `${soft.trimEnd()}…`;
}

function slugifyProjectTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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

const EVIDENCE_CUE: Record<string, string> = {
  "Fin Bomb Internal Controls Exhibit (COSO Framework)":
    "Evidence: mapped risks + owner + screenshots",
  "Amazon 10-K Accounting Analysis": "Evidence: note references + reconciliations",
  "Power BI Profitability Dashboard (Beverage Dataset)":
    "Evidence: model + measures + visuals",
  "AI Club Finance System Concept": "Evidence: budget model + approval controls",
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
  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmailTimerRef = useRef<number | null>(null);
  const [graphLineVisible, setGraphLineVisible] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const graphAnimated = useRef(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const plotAreaRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const sectionVariants = shouldReduceMotion ? fadeIn : fadeUp;
  const [workView, setWorkView] = useState<"project" | "system">("project");

  const uniqueTags = getUniqueTags(featuredSystemsProjects);
  const filteredSystems =
    systemTagFilter == null
      ? featuredSystemsProjects
      : featuredSystemsProjects.filter((p) => p.tags.includes(systemTagFilter));

  useEffect(() => {
    return () => {
      if (copyEmailTimerRef.current != null) {
        window.clearTimeout(copyEmailTimerRef.current);
        copyEmailTimerRef.current = null;
      }
    };
  }, []);

  const handleCopyEmail = useCallback(async () => {
    const email = "Myles.D.Goodrich@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for older browsers / restricted contexts.
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setEmailCopied(true);
    if (copyEmailTimerRef.current != null) {
      window.clearTimeout(copyEmailTimerRef.current);
    }
    copyEmailTimerRef.current = window.setTimeout(() => {
      setEmailCopied(false);
      copyEmailTimerRef.current = null;
    }, 1200);
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

  const TOOLTIP_W = 160;
  const TOOLTIP_H = 56;
  const handleChartMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoveredPointIndex === null || shouldReduceMotion) return;
      const el = plotAreaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let x = e.clientX - rect.left - TOOLTIP_W / 2;
      let y = e.clientY - rect.top - TOOLTIP_H - 8;
      x = Math.max(8, Math.min(x, rect.width - TOOLTIP_W - 8));
      y = Math.max(8, Math.min(y, rect.height - TOOLTIP_H - 8));
      setTooltipPosition({ x, y });
    },
    [hoveredPointIndex, shouldReduceMotion]
  );
  const handleChartMouseLeave = useCallback(() => {
    setHoveredPointIndex(null);
    setTooltipPosition(null);
  }, []);

  useEffect(() => {
    if (hoveredPointIndex === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTooltipPosition(null);
      return;
    }
    const el = plotAreaRef.current || chartContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTooltipPosition({
      x: Math.max(8, rect.width / 2 - TOOLTIP_W / 2),
      y: 12,
    });
  }, [hoveredPointIndex]);

  const selectedValue =
    selectedValueIndex != null
      ? siteContent.service.values[selectedValueIndex]
      : null;

  return (
    <div className="space-y-10">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Hero: 2-col desktop */}
      <motion.section
        className="grid gap-10 lg:grid-cols-2 lg:items-start"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <div className="space-y-5">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built on structure. Tested by pressure.
            <span className="mt-2 block text-base font-normal text-muted-2 sm:text-lg">
              Accounting, risk, and control systems at LSU • Louisiana National Guard
            </span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted">
            I design controls, analytics, and documentation so work holds up under scrutiny.
          </p>
          {/* Signal Bar */}
          <div className="mt-6 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
            {/* MOMENTUM */}
            <div className="relative h-full min-w-0 rounded-xl border border-border bg-surface/70 p-3.5">
              <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-brand-gold/50" />
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-white/70">
                  {/* keep your existing icon here if you have one */}
                  ↗
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70 whitespace-normal leading-tight">
                    Momentum
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground leading-snug sm:text-base">
                    GPA 3.9
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-white/65">
                    Dean’s List trend
                  </p>
                </div>
              </div>
            </div>

            {/* EVIDENCE */}
            <div className="relative h-full min-w-0 rounded-xl border border-border bg-surface/70 p-3.5">
              <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-brand-purple/50" />
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-white/70">
                  {/* keep your existing icon here if you have one */}
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70 whitespace-normal leading-tight">
                    Evidence
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground leading-snug sm:text-base">
                    31 Controls
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-white/65">
                    COSO-mapped exhibit
                  </p>
                </div>
              </div>
            </div>

            {/* STANDARDS */}
            <div className="relative h-full min-w-0 rounded-xl border border-border bg-surface/70 p-3.5">
              <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-brand-gold/50" />
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-white/70">
                  {/* keep your existing icon here if you have one */}
                  🛡️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70 whitespace-normal leading-tight">
                    Standards
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground leading-snug sm:text-base">
                    PFC
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-white/65">
                    Louisiana National Guard
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/projects"
              className="lsu-btn-gold transition hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              View Projects
            </Link>
            <a
              href="mailto:Myles.D.Goodrich@gmail.com"
              className="lsu-btn-outline transition hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              Contact
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/projects#fin-bomb-internal-controls-exhibit-coso-framework"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-purple-light underline underline-offset-4 hover:decoration-brand-gold"
            >
              View controls exhibit &rarr;
            </Link>
            <Link
              href="/projects#amazon-10-k-accounting-analysis"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-purple-light underline underline-offset-4 hover:decoration-brand-gold"
            >
              See the 10-K outline &rarr;
            </Link>
            <Link
              href="/performance#record"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-purple-light underline underline-offset-4 hover:decoration-brand-gold"
            >
              See performance record &rarr;
            </Link>
            <Link
              href="/journey#reset"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-purple-light underline underline-offset-4 hover:decoration-brand-gold"
            >
              Read the reset &rarr;
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/journey"
              className="rounded-2xl border border-border bg-surface/70 px-4 py-3 text-left text-sm text-muted transition hover:border-brand-gold/50 hover:bg-surface hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                Read the rebuild &rarr;
              </p>
              <p className="mt-1 text-sm text-muted">
                From volatility to control.
              </p>
            </Link>
            <Link
              href="/performance"
              className="rounded-2xl border border-border bg-surface/70 px-4 py-3 text-left text-sm text-muted transition hover:border-brand-gold/50 hover:bg-surface hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                See the record &rarr;
              </p>
              <p className="mt-1 text-sm text-muted">
                Measured over semesters.
              </p>
            </Link>
          </div>
        </div>

        {/* Identity Card */}
          <div className="lsu-card border-brand-purple/25 overflow-hidden">
            <div className="relative mx-auto mb-4 w-full max-w-[175px]">
              <div className="relative w-full overflow-hidden rounded-2xl aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <Image
                  src="/headshot.png"
                  alt={`${siteContent?.name ?? "Student"} headshot`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 175px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                    Profile
                  </p>
                  <p className="truncate text-lg font-semibold text-foreground">
                    {siteContent?.name ?? "Student"}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-border/60" />
            </div>
          <div className="flex gap-1 border-b border-border pb-3" role="tablist" aria-label="Identity">
            <button
              type="button"
              role="tab"
              aria-selected={identityTab === "guard"}
              aria-controls="panel-guard"
              onClick={() => setIdentityTab("guard")}
              className={`min-h-[44px] rounded-xl border px-4 py-2 text-sm font-medium transition ${
                identityTab === "guard"
                  ? "bg-brand-gold text-black border-brand-gold/60 shadow-[0_0_0_1px_rgba(253,208,35,0.4)]"
                  : "bg-surface text-foreground/85 border-border hover:bg-surface-2"
              }`}
            >
              National Guard
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={identityTab === "comeback"}
              aria-controls="panel-comeback"
              onClick={() => setIdentityTab("comeback")}
              className={`min-h-[44px] rounded-xl border px-4 py-2 text-sm font-medium transition ${
                identityTab === "comeback"
                  ? "bg-brand-gold text-black border-brand-gold/60 shadow-[0_0_0_1px_rgba(253,208,35,0.4)]"
                  : "bg-surface text-foreground/85 border-border hover:bg-surface-2"
              }`}
            >
              Academic Comeback
            </button>
          </div>
          <div className="mt-4 min-h-[120px]" id={identityTab === "guard" ? "panel-guard" : "panel-comeback"} role="tabpanel">
            {identityTab === "guard" ? (
              <>
                <p className="text-sm leading-7 text-muted">
                  {siteContent.service.roleSummary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {siteContent.service.values.map((v, i) => (
                    <Pill
                      key={v.label}
                      as="button"
                      active={selectedValueIndex === i}
                      onClick={() =>
                        setSelectedValueIndex(
                          selectedValueIndex === i ? null : i,
                        )
                      }
                    >
                      {v.label}
                    </Pill>
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
      </motion.section>

      <OperatingSystemDashboard />

      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Performance Over Time */}
      <motion.section
        ref={graphRef}
        aria-labelledby="performance-heading"
        className="space-y-4"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
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
        <div className="lsu-card overflow-hidden">
          <div className="relative px-4 pb-3 pt-3">
            <div
              ref={chartContainerRef}
              className="relative w-full max-w-2xl rounded-lg border border-brand-gold/15"
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <div
                ref={plotAreaRef}
                className="relative h-[260px] overflow-hidden"
              >
              {/* Vignette */}
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.2) 100%)",
                }}
              />
              <svg
                viewBox={`0 0 ${PLOT.viewWidth} ${PLOT.viewHeight}`}
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="GPA trend chart showing improvement from 2.5 to 3.9 over five semesters"
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-purple)" stopOpacity="0.18" />
                    <stop offset="70%" stopColor="var(--brand-purple)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* 3 horizontal grid lines, very faint */}
                {[40, 52, 64].map((y) => (
                  <line
                    key={y}
                    x1={PLOT.left}
                    y1={y}
                    x2={PLOT.right}
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Area fill under line (static, no animation) */}
                <path
                  d={getPerformanceAreaPathD()}
                  fill="url(#areaGradient)"
                  stroke="none"
                />
                {/* Line: same points as dots, ends at 5th point */}
                <path
                  d={getPerformancePathD()}
                  fill="none"
                  stroke="var(--brand-purple)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: "400 400",
                    strokeDashoffset: graphLineVisible ? 0 : 400,
                    transition: shouldReduceMotion ? "none" : "stroke-dashoffset 1.2s ease-out",
                  }}
                />
                {/* Points: single dataset; default r=5, hovered r=7 + soft glow */}
                {PERFORMANCE_GRAPH.points.map((pt, i) => {
                  const { x, y } = getPlotCoords(i, pt.value);
                  const isActive = hoveredPointIndex === i;
                  return (
                    <g
                      key={i}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoveredPointIndex(i)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    >
                      {isActive && !shouldReduceMotion && (
                        <circle
                          cx={x}
                          cy={y}
                          r={14}
                          fill="var(--brand-gold)"
                          opacity={0.12}
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 7 : 5}
                        fill="rgba(15,13,22,0.9)"
                        stroke="var(--brand-gold)"
                        strokeWidth={1.2}
                        style={{ transition: "r 0.15s ease-out" }}
                      />
                    </g>
                  );
                })}
              </svg>
              {/* Y-axis context labels: aligned with bottom and top gridlines */}
              <div
                className="pointer-events-none absolute left-3 z-[2] -translate-y-1/2"
                style={{ top: "50.5%" }}
                aria-hidden
              >
                <div className="rounded-md bg-black/40 px-2 py-0.5 backdrop-blur-sm">
                  <span className="text-[11px] font-medium tracking-wide text-white/65">
                    Baseline
                  </span>
                </div>
              </div>
              <div
                className="pointer-events-none absolute left-3 z-[2] -translate-y-1/2"
                style={{ top: "30.5%" }}
                aria-hidden
              >
                <div className="rounded-md bg-black/40 px-2 py-0.5 backdrop-blur-sm">
                  <span className="text-[11px] font-medium tracking-wide text-white/65">
                    Peak
                  </span>
                </div>
              </div>
              {/* HTML tooltip: absolute overlay, clamped */}
              {hoveredPointIndex !== null && tooltipPosition && (
                <div
                  className="pointer-events-none absolute z-10 rounded-xl border border-brand-gold/25 bg-[#0f0d16]/95 px-3 py-2 shadow-md"
                  style={{
                    left: tooltipPosition.x,
                    top: tooltipPosition.y,
                    width: TOOLTIP_W,
                  }}
                >
                  <p className="text-sm font-semibold text-white leading-tight">
                    {PERFORMANCE_GRAPH.milestones[hoveredPointIndex]}
                  </p>
                  <p className="mt-0.5 text-xs text-white/70 leading-snug">
                    {PERFORMANCE_GRAPH.tooltips[hoveredPointIndex]}
                  </p>
                </div>
              )}
              </div>
            {/* Milestone labels: aligned under each point */}
            <div className="relative mt-2 h-5 w-full max-w-2xl">
              {PERFORMANCE_GRAPH.milestones.map((label, i) => (
                <span
                  key={label}
                  className="absolute text-[10px] font-medium transition-colors cursor-default"
                  style={{
                    left: `${(getPlotCoords(i, PERFORMANCE_GRAPH.points[i].value).x / PLOT.viewWidth) * 100}%`,
                    transform: "translateX(-50%)",
                    color: hoveredPointIndex === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.55)",
                  }}
                  onMouseEnter={() => setHoveredPointIndex(i)}
                  onMouseLeave={() => setHoveredPointIndex(null)}
                >
                  {label}
                </span>
              ))}
            </div>
            </div>
          </div>
          <p className="border-t border-border px-4 py-3 text-sm text-muted">
            This reflects how I approach growth: diagnose, build structure,
            track results, improve.
          </p>
        </div>
      </motion.section>

      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Evidence Trail */}
      <motion.section
        aria-labelledby="evidence-heading"
        className="space-y-4"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <h2
          id="evidence-heading"
          className="text-2xl font-semibold tracking-tight text-foreground"
        >
          Evidence Trail
        </h2>
        <p className="text-sm text-muted">
          Receipts, not stats — what I built, how it’s validated, and where to review it.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="lsu-card relative group">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-full bg-brand-gold/0 transition-colors group-hover:bg-brand-gold" />
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Controls
              </p>
              <ShieldCheck className="h-5 w-5 text-brand-gold/70" aria-hidden />
            </div>
            <p className="mt-2 text-base font-semibold text-foreground">
              31 Controls Documented
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              <li>31 controls mapped to specific risks + owners</li>
              <li>Evidence trail defined (what proves execution)</li>
              <li>Risk ratings assigned and gaps identified</li>
            </ul>
            <p className="mt-3 text-xs text-muted-2">
              Structured using COSO framework principles.
            </p>
            <Link
              href="/projects"
              className="mt-3 inline-flex min-h-[44px] items-center text-xs font-semibold text-brand-purple-light underline underline-offset-4 hover:decoration-brand-gold"
            >
              See controls
            </Link>
          </div>

          <div className="lsu-card relative group">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-full bg-brand-gold/0 transition-colors group-hover:bg-brand-gold" />
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Analytics
              </p>
              <BarChart3 className="h-5 w-5 text-brand-purple/70" aria-hidden />
            </div>
            <p className="mt-2 text-base font-semibold text-foreground">
              Dashboards &amp; KPI Definitions
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              <li>KPI definitions tied to decision use</li>
              <li>Metrics standardized for repeat reporting</li>
              <li>Dashboards built for executive clarity</li>
            </ul>
            <p className="mt-3 text-xs text-muted-2">
              Built in Power BI + Excel modeling.
            </p>
            <Link
              href="/projects"
              className="mt-3 inline-flex min-h-[44px] items-center text-xs font-semibold text-brand-purple-light underline underline-offset-4 hover:decoration-brand-gold"
            >
              See dashboards
            </Link>
          </div>

          <div className="lsu-card relative group">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-full bg-brand-gold/0 transition-colors group-hover:bg-brand-gold" />
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Execution
              </p>
              <Target className="h-5 w-5 text-brand-gold/70" aria-hidden />
            </div>
            <p className="mt-2 text-base font-semibold text-foreground">
              Repeatable Improvement
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              <li>Weekly planning system implemented</li>
              <li>Semester-over-semester performance tracked</li>
              <li>Variability reduced by design</li>
            </ul>
            <p className="mt-3 text-xs text-muted-2">
              Measured across academic + Guard workload.
            </p>
            <Link
              href="/performance"
              className="mt-3 inline-flex min-h-[44px] items-center text-xs font-semibold text-brand-purple-light underline underline-offset-4 hover:decoration-brand-gold"
            >
              See record
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Leadership, Training, Quick Facts */}
      <motion.section
        aria-labelledby="more-personal-heading"
        className="space-y-4"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <h2
          id="more-personal-heading"
          className="sr-only"
        >
          More about me
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="lsu-card">
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
          <div className="lsu-card">
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
          <div className="lsu-card">
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
      </motion.section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Systems I've Built with tag filter + System Builder Toggle */}
      <motion.section
        aria-labelledby="systems-heading"
        className="space-y-4"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="systems-heading"
              className="text-xl font-bold tracking-tighter text-foreground"
            >
              Systems I&apos;ve Built
            </h2>
            <p className="mt-1 text-xs text-muted-2 leading-snug">
              Projects that reflect my internal-audit mindset: structure,
              controls, evidence, and clear reporting.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-brand-gold underline underline-offset-4 decoration-brand-gold/70 hover:decoration-brand-gold hover:[&>span]:translate-x-0.5 transition-all duration-200 inline-flex min-h-[44px] items-center gap-1"
          >
            View all <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill
            as="button"
            active={systemTagFilter == null}
            onClick={() => setSystemTagFilter(null)}
            size="sm"
            className={
              systemTagFilter == null
                ? "!bg-brand-gold !text-black !border-brand-gold/60"
                : "!border-border/60 !bg-surface-2/90 !text-foreground/80 py-1.5 px-2.5 hover:!border-brand-gold hover:shadow-[0_0_12px_rgba(253,208,35,0.12)]"
            }
          >
            All
          </Pill>
          {uniqueTags.map((tag) => (
            <Pill
              key={tag}
              as="button"
              active={systemTagFilter === tag}
              onClick={() => setSystemTagFilter(tag)}
              size="sm"
              className={
                systemTagFilter === tag
                  ? "!bg-brand-gold !text-black !border-brand-gold/60"
                  : "!border-border/60 !bg-surface-2/90 !text-foreground/80 py-1.5 px-2.5 hover:!border-brand-gold hover:shadow-[0_0_12px_rgba(253,208,35,0.12)]"
              }
            >
              {tag}
            </Pill>
          ))}
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Two Ways to View My Work
          </h3>
          <p className="text-sm text-muted">
            I don&rsquo;t just complete projects. I build systems that can be tested and reused.
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setWorkView("project")}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                workView === "project"
                  ? "bg-brand-gold text-black border-brand-gold/60"
                  : "bg-surface text-muted border-border hover:bg-surface-2"
              }`}
            >
              Project View
            </button>
            <button
              type="button"
              onClick={() => setWorkView("system")}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                workView === "system"
                  ? "bg-brand-gold text-black border-brand-gold/60"
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
            const projectOutcome = truncateText(
              project.highlights?.[0]?.trim()
                ? project.highlights[0]
                : project.description
            );
            const evidenceCue = EVIDENCE_CUE[project.title];
            const anchorId = slugifyProjectTitle(project.title);
            const projectHref = `/projects#${anchorId}`;
            return (
              <article
                key={project.title}
                className="lsu-card group relative min-w-0 overflow-hidden border-border bg-surface transition-all duration-[220ms] ease-out hover:-translate-y-0.5 hover:border-brand-gold hover:bg-surface/95 hover:shadow-lg motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
              >
                <div className="absolute left-0 top-5 bottom-5 w-0.5 bg-brand-purple/35 transition-colors group-hover:bg-brand-gold/40" />
                {workView === "project" ? (
                  <div key="project" className="lsu-card-inner min-w-0 pl-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="relative -top-0.5 inline-flex items-center rounded-full border border-border/70 bg-surface-2 px-2 py-0.5 text-xs font-semibold leading-none tracking-wide text-muted">
                        PROJECT
                      </span>
                      <span className="sr-only">Project view</span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-foreground/90">
                      Outcome: {projectOutcome}
                    </p>
                    {project.highlights.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-2">
                          Inputs → Process → Output
                        </p>
                        <ul className="list-inside list-disc space-y-1 text-xs text-muted leading-relaxed">
                          {project.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {evidenceCue && (
                      <p className="mt-3 text-xs text-muted-2">{evidenceCue}</p>
                    )}
                    <Link
                      href={projectHref}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-gold decoration-brand-gold/80 underline-offset-2 hover:underline [&>span]:inline-block [&>span]:transition-transform duration-200 hover:[&>span]:translate-x-0.5"
                    >
                      See project <span aria-hidden>→</span>
                    </Link>
                  </div>
                ) : systemView ? (
                  <div key="system" className="lsu-card-inner min-w-0 pl-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full border border-border/70 bg-surface-2 px-2 py-0.5 text-xs font-semibold tracking-wide text-muted">
                        SYSTEM
                      </span>
                      <span className="inline-flex items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2 py-0.5 text-xs font-semibold text-muted">
                        Evidence-ready
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground">
                      {systemView.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-foreground/90">
                      Outcome: {systemView.subtitle}
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-2">
                        Inputs → Process → Output
                      </p>
                      <ul className="list-inside list-disc space-y-1 text-xs text-muted leading-relaxed">
                        {systemView.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    {evidenceCue && (
                      <p className="mt-3 text-xs text-muted-2">{evidenceCue}</p>
                    )}
                    <Link
                      href={projectHref}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-gold decoration-brand-gold/80 underline-offset-2 hover:underline [&>span]:inline-block [&>span]:transition-transform duration-200 hover:[&>span]:translate-x-0.5"
                    >
                      See system <span aria-hidden>→</span>
                    </Link>
                  </div>
                ) : (
                  <div key="fallback" className="lsu-card-inner min-w-0 pl-2 text-sm text-muted">
                    <div className="flex items-center justify-between gap-3">
                      <span className="relative -top-0.5 inline-flex items-center rounded-full border border-border/70 bg-surface-2 px-2 py-0.5 text-xs font-semibold leading-none tracking-wide text-muted">
                        PROJECT
                      </span>
                      <span className="sr-only">Fallback view</span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 font-medium text-foreground/90">
                      Outcome: {projectOutcome}
                    </p>
                    {evidenceCue && (
                      <p className="mt-3 text-xs text-muted-2">{evidenceCue}</p>
                    )}
                    <Link
                      href={projectHref}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-gold decoration-brand-gold/80 underline-offset-2 hover:underline [&>span]:inline-block [&>span]:transition-transform duration-200 hover:[&>span]:translate-x-0.5"
                    >
                      See project <span aria-hidden>→</span>
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </motion.section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      {/* Risk Lens interactive */}
      <motion.section
        aria-labelledby="risk-heading"
        className="space-y-4"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <h2
          id="risk-heading"
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          Risk Lens
        </h2>
        <p className="text-sm text-muted">
          When I review a process, these are the questions I start with:
        </p>
        <div className="lsu-card">
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
              className="mt-4 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-2"
            >
              Reset
            </button>
          </div>
        </div>
      </motion.section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Operating Principles */}
      <motion.section
        aria-labelledby="principles-heading"
        className="relative pl-5"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-px bg-brand-gold/25"
          aria-hidden
        />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-2">
          PERSONAL DOCTRINE
        </p>
        <h2
          id="principles-heading"
          className="mt-2 text-xl font-semibold tracking-tight text-foreground"
        >
          Operating Principles
        </h2>
        <p className="mt-1 text-sm text-muted-2/90">
          The rules I build and operate by — quietly consistent and traceable.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          <div className="flex flex-col space-y-4">
            {[
              "If it can’t be tested, it isn’t complete.",
              "Clarity beats intensity.",
              "Structure reduces emotion.",
              "Reduce variability before chasing growth.",
            ].map((principle) => (
              <p
                key={principle}
                className="text-base font-medium leading-snug text-foreground"
              >
                {principle}
              </p>
            ))}
          </div>
          <div className="flex flex-col space-y-4 md:mt-0">
            {[
              "Build systems that hold under stress.",
              "Measure what matters. Ignore the rest.",
              "Consistency compounds.",
            ].map((principle) => (
              <p
                key={principle}
                className="text-base font-medium leading-snug text-foreground"
              >
                {principle}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-muted-2">
          Consistency compounds. Systems endure.
        </p>
      </motion.section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* From Volatility to Control */}
      <motion.section
        aria-labelledby="volatility-heading"
        className="lsu-card"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <h2
          id="volatility-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          From Volatility to Control
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          The record began with volatility. It was redesigned through structure. The result:
          controlled performance.
        </p>
      </motion.section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent" />

      {/* Contact */}
      <motion.section
        aria-labelledby="contact-heading"
        className="lsu-card transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:translate-y-0"
        variants={sectionVariants}
        initial="initial"
        animate="animate"
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-2">
          LET&rsquo;S CONNECT
        </p>
        <h2
          id="contact-heading"
          className="mt-2 text-xl font-semibold tracking-tight text-foreground"
        >
          Contact
        </h2>
        <p className="mt-2 text-sm text-muted">
          If you value structure, clarity, and evidence-driven work — I’d be glad to connect.
        </p>
        <p className="mt-5 text-sm text-muted">{siteContent.email}</p>
        <p className="mt-1 text-sm text-muted">{siteContent.location}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteContent.email}`}
            className="lsu-btn-gold px-6 py-2.5 text-sm sm:text-base"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/myles-goodrich/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-foreground transition hover:border-brand-gold hover:text-brand-gold hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
          >
            <span>LinkedIn</span>
            <span
              aria-hidden
              className="ml-1 inline-block transition-transform group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group inline-flex items-center justify-center rounded-full border border-brand-gold/50 bg-surface px-5 py-2 text-sm font-semibold text-muted transition hover:border-brand-gold hover:text-brand-gold hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
          >
            <span>{emailCopied ? "Copied" : "Copy email"}</span>
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-2">
          Open to audit, controls, analytics, and leadership opportunities.
        </p>
      </motion.section>
    </div>
  );
}
