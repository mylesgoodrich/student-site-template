import Link from "next/link";
import { siteContent } from "../lib/siteContent";

export default function AboutPage() {
  const { name, tagline, highlights } = siteContent;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="lsu-card relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/[0.08] blur-2xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/[0.10] blur-2xl" />

        <div className="relative space-y-3">
          <span className="lsu-badge">About</span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Built, not given.
          </h1>
          <p className="text-sm text-muted">
            I didn’t start college perfectly. I rebuilt everything with structure, standards, and
            follow-through.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/journey#reset"
              className="inline-flex items-center rounded-full border border-brand-gold/30 bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2 hover:border-brand-gold/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Journey Map
            </Link>
            <Link
              href="/projects#fin-bomb-internal-controls-exhibit-coso-framework"
              className="inline-flex items-center rounded-full border border-brand-gold/30 bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2 hover:border-brand-gold/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Projects
            </Link>
            <Link
              href="/performance#record"
              className="inline-flex items-center rounded-full border border-brand-gold/30 bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2 hover:border-brand-gold/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Performance
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-brand-gold/30 bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2 hover:border-brand-gold/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Blog
            </Link>
          </div>
          <div className="mt-3 space-y-1 text-sm text-muted-2">
            <p className="font-semibold text-foreground">{name}</p>
            <p>{tagline}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main grid */}
      <section className="grid gap-8 lg:grid-cols-3">
        {/* Left: Rebuild narrative */}
        <div className="space-y-6 lg:col-span-2">
          <section className="lsu-card space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              The rough start
            </h2>
            <p className="text-sm leading-7 text-muted">
              Early semesters were volatile. Grades moved more with my habits than my ability.
              Deadlines, workload, and expectations were real, but my systems were not. That{" "}
              <Link href="/journey" className="lsu-link">
                rough start
              </Link>{" "}
              made it clear: without structure, performance is hard to trust.
            </p>
          </section>

          <section className="lsu-card space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              The reset
            </h2>
            <p className="text-sm leading-7 text-muted">
              I treated the reset like an audit finding. I reduced course load, rebuilt my week
              from the calendar up, and defined what “good work” looked like for each class. The
              goal was simple: consistent execution, not heroic effort.
            </p>
          </section>

          <section className="lsu-card space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              The system
            </h2>
            <p className="text-sm leading-7 text-muted">
              I built a repeatable system: weekly planning, fixed study blocks, checklists,
              progress tracking, and honest review. GPA, deadlines, and{" "}
              <Link href="/projects" className="lsu-link">
                controls and dashboards
              </Link>{" "}
              were all treated as measurable obligations with clear owners, not suggestions.
            </p>
          </section>

          <section className="lsu-card space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              The standard now
            </h2>
            <p className="text-sm leading-7 text-muted">
              Today I approach accounting, risk, and control work with the same mindset: define
              the risk, design the control, document the evidence, and finish to a standard. That
              applies whether I’m building a controls exhibit, analyzing a 10-K, or managing{" "}
              <Link href="/performance" className="lsu-link">
                performance over time
              </Link>{" "}
              alongside National Guard service.
            </p>
          </section>
        </div>

        {/* Right: Operating Principles + Proof Points */}
        <div className="space-y-6">
          <section className="lsu-card space-y-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Operating Principles
            </h2>
            <ul className="space-y-2 text-sm leading-6 text-muted">
              <li>
                <Link
                  href="/projects"
                  className="font-semibold text-foreground inline-flex items-center gap-1 lsu-link"
                >
                  <span>Make it testable.</span>
                  <span aria-hidden>→</span>
                </Link>{" "}
                <span className="text-muted">
                  Every important claim should be verifiable.
                </span>
              </li>
              <li>
                <span className="font-semibold text-foreground">Document the evidence.</span>{" "}
                Conclusions should be backed by traceable support.
              </li>
              <li>
                <span className="font-semibold text-foreground">Reduce ambiguity.</span>{" "}
                Roles, ownership, and criteria should be explicit.
              </li>
              <li>
                <span className="font-semibold text-foreground">Design for repeatability.</span>{" "}
                Good work should be executable again, not reinvented.
              </li>
              <li>
                <span className="font-semibold text-foreground">Finish to a standard.</span>{" "}
                “Done” means it holds up under review, not just that it’s submitted.
              </li>
              <li>
                <Link
                  href="/journey"
                  className="font-semibold text-foreground inline-flex items-center gap-1 lsu-link"
                >
                  <span>Pressure is a filter.</span>
                  <span aria-hidden>→</span>
                </Link>{" "}
                <span className="text-muted">
                  Tight timelines should reveal weak controls, not break the system.
                </span>
              </li>
            </ul>
          </section>

          <section className="lsu-card space-y-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Proof Points
            </h2>
            <ul className="space-y-3 text-sm leading-6 text-muted">
              <li>
                <Link
                  href="/journey"
                  aria-label="Read more about earning 60 credits in one year"
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 transition hover:border-brand-gold/30 hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div>
                    <span className="font-semibold text-foreground">
                      60 credits in one year.
                    </span>{" "}
                    <span className="text-muted">
                      15 credits fall, winter, spring, and summer to earn my transfer.
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="mt-0.5 inline-block text-sm text-muted-2 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/performance"
                  aria-label="Read more about GPA performance redesign"
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 transition hover:border-brand-gold/30 hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div>
                    <span className="font-semibold text-foreground">3.7 then 3.9.</span>{" "}
                    <span className="text-muted">
                      Improvement driven by structure and execution, not motivation.
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="mt-0.5 inline-block text-sm text-muted-2 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  aria-label="Read more about documenting 31 controls"
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 transition hover:border-brand-gold/30 hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div>
                    <span className="font-semibold text-foreground">
                      31 controls documented.
                    </span>{" "}
                    <span className="text-muted">
                      Control writing taught me that if it can’t be tested, it isn’t controlled.
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="mt-0.5 inline-block text-sm text-muted-2 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/journey"
                  aria-label="Read more about Louisiana Army National Guard experience"
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface px-3 py-2 transition hover:border-brand-gold/30 hover:bg-surface-2 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div>
                    <span className="font-semibold text-foreground">
                      Louisiana Army National Guard (PFC).
                    </span>{" "}
                    <span className="text-muted">
                      Accountability and execution under pressure, carried into my accounting work.
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="mt-0.5 inline-block text-sm text-muted-2 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </section>

      {/* CTA footer card */}
      <section className="lsu-card flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Next steps
          </h2>
          <p className="mt-1 text-sm text-muted">
            See how this approach shows up in projects and the performance record.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="lsu-btn-gold">
            View Projects
          </Link>
          <Link
            href="/journey"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-2"
          >
            Read Journey
          </Link>
        </div>
      </section>
    </div>
  );
}

