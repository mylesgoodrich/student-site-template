const PHASES = [
  {
    phaseLabel: "PHASE I",
    phaseTitle: "Volatility",
    text: "Early semesters included withdrawals, retakes, and inconsistent execution. The issue was not ability. It was lack of structure. Effort was present. Systems were not.",
  },
  {
    phaseLabel: "PHASE II",
    phaseTitle: "System Redesign",
    text: "Course load was recalibrated. Retakes were completed. Weekly execution systems were implemented. GPA was treated as a measurable performance metric rather than an identity. Variability was reduced by design.",
  },
  {
    phaseLabel: "PHASE III",
    phaseTitle: "Stabilization",
    text: "Dean's List performance was established. Institutional GPA stabilized above 3.3. Foundational weaknesses were corrected. Stabilization became repeatable.",
  },
  {
    phaseLabel: "PHASE IV",
    phaseTitle: "Acceleration",
    text: "A 3.900 semester GPA was achieved during upper-division accounting coursework. Accounting Analytics and quantitative courses were completed with A+ performance. Guard service remained active throughout. Sustained performance under load.",
  },
];

export default function CaseStudyTimeline() {
  return (
    <div className="relative border-l border-brand-gold/25 pl-6">
      {PHASES.map((item) => (
        <div key={item.phaseLabel} className="relative pb-8 last:pb-0">
          <div
            className="absolute left-0 top-1.5 size-2 -translate-x-1/2 rounded-full bg-brand-gold/30"
            aria-hidden
          />
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {item.phaseLabel}
          </p>
          <p className="mt-0.5 text-base font-semibold text-foreground">
            {item.phaseTitle}
          </p>
          <p className="mt-2 text-base leading-7 text-muted">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
