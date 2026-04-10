import Link from "next/link";
import { siteContent } from "../../lib/siteContent";

export default function FinBombInternalControlsExhibitPage() {
  return (
    <main className="lsu-container py-12 space-y-10">
      {/* Hero */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold/90">
          Internal Controls Exhibit
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Fin Bomb Internal Controls Exhibit (COSO Framework)
        </h1>
        <p className="text-sm font-medium text-foreground">
          Mapped 31 internal controls to specific risks using the COSO framework.
        </p>
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Designed as an audit-style exhibit with risk ownership, documentation, and improvement
          identification.
        </p>
      </section>

      {/* Context */}
      <section className="lsu-card space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Context
        </h2>
        <p className="text-sm leading-7 text-muted">
          This was a structured internal controls mapping exercise built to simulate real internal
          audit methodology. The focus was on identifying risks, clarifying ownership, and applying
          documentation discipline so each control could be tested and improved.
        </p>
      </section>

      {/* Method */}
      <section className="lsu-card space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Method
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Inputs
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-muted">
              <li>Process documentation</li>
              <li>Risk categories</li>
              <li>COSO framework principles</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Process
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-muted">
              <li>Identified key risk areas</li>
              <li>Mapped controls to specific risks</li>
              <li>Assigned owners</li>
              <li>Documented evidence trail</li>
              <li>Flagged control gaps</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Output
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-muted">
              <li>31 mapped controls</li>
              <li>Risk–control matrix</li>
              <li>Audit-style exhibit</li>
              <li>Improvement opportunities identified</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section className="lsu-card space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Evidence
        </h2>
        <ul className="list-inside list-disc space-y-1 text-sm leading-6 text-muted">
          <li>Risk–control mapping table</li>
          <li>Screenshots of documentation</li>
          <li>Assigned control ownership</li>
          <li>Gap identification summary</li>
        </ul>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[1, 2, 3].map((slot) => (
            <div
              key={slot}
              className="flex h-28 items-center justify-center rounded-xl border border-dashed border-border/70 bg-surface-2 text-xs text-muted-2"
            >
              Screenshot placeholder
            </div>
          ))}
        </div>
      </section>

      {/* Reflection */}
      <section className="lsu-card space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          What I’d Improve
        </h2>
        <p className="text-sm leading-7 text-muted">
          Next iteration, I would expand testing procedures, add walkthrough documentation, include
          control testing samples, and formalize a short reporting summary so findings and
          recommendations are easier to review at a glance.
        </p>
      </section>

      <section className="flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-2"
        >
          Back to Projects
        </Link>
        <a
          href={`mailto:${siteContent.email}`}
          className="lsu-btn-gold"
        >
          Email me about this project
        </a>
      </section>
    </main>
  );
}

