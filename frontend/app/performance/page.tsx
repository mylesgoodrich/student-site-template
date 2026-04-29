import CaseStudyTimeline from "../components/CaseStudyTimeline";
import ExecutiveSummaryCards from "../components/ExecutiveSummaryCards";
import { student } from "../lib/siteContent";

export const metadata = {
  title: `Performance Record | ${student.name}`,
  description:
    "From volatility to control. A personal record of rebuilding consistency.",
};

export default function PerformancePage() {
  return (
    <section id="record" className="space-y-14 scroll-mt-24">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Performance Record
        </h1>
        <p className="mt-2 text-sm text-muted">
          A measurable transition from volatility to controlled performance.
        </p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          GPA and workload tracked over consecutive semesters.
        </p>
      </header>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />

      {/* Executive Summary */}
      <section aria-labelledby="exec-summary-heading" className="space-y-4">
        <h2
          id="exec-summary-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Executive Summary
        </h2>
        <p className="border-l-2 border-brand-gold/40 pl-3 text-xs font-medium uppercase tracking-wide text-white/65">
          Rebuild Metrics
        </p>
        <ExecutiveSummaryCards />
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent" />

      {/* Performance Redesign Framework */}
      <section
        id="framework"
        aria-labelledby="timeline-heading"
        className="space-y-6"
      >
        <h2
          id="timeline-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Performance Redesign Framework
        </h2>
        <div className="lsu-card space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
              Phase I – Diagnosis
            </p>
            <p className="text-sm leading-6 text-muted">
              Early volatility revealed lack of structure, not lack of ability. Inconsistent
              execution and undefined systems drove variability.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
              Phase II – System Implementation
            </p>
            <p className="text-sm leading-6 text-muted">
              Course load was recalibrated. Weekly execution systems were implemented. GPA was
              treated as a measurable performance metric.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
              Phase III – Control Stabilization
            </p>
            <p className="text-sm leading-6 text-muted">
              Institutional GPA stabilized above 3.3. Foundational weaknesses were corrected and
              variability reduced by design.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
              Phase IV – Scaled Performance
            </p>
            <p className="text-sm leading-6 text-muted">
              A 3.900 semester GPA was achieved during upper-division accounting coursework while
              serving in the National Guard.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
    </section>
  );
}
