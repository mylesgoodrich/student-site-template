"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { projects, type Project } from "../lib/projectsData";
import { siteContent } from "../lib/siteContent";
import Pill from "../components/ui/Pill";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-brand-purple/35 bg-brand-purple/12 px-2 py-0.5 text-xs font-medium text-brand-purple">
      {children}
    </span>
  );
}

function getUniqueTags(projs: Project[]) {
  const set = new Set<string>();
  projs.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function deriveSignals(project: Project) {
  const text = `${project.title} ${project.description} ${project.tags.join(" ")} ${project.highlights.join(
    " "
  )}`.toLowerCase();

  const candidates: Array<{ key: string; label: string; match: RegExp }> = [
    { key: "controls", label: "Controls", match: /control|coso|sox|audit/i },
    { key: "dashboards", label: "Dashboards", match: /dashboard|power bi|kpi|analytics|visual/i },
    { key: "documentation", label: "Documentation", match: /document|evidence|exhibit|memo|write/i },
    { key: "data", label: "Data Quality", match: /data quality|recon|clean|validate|etl/i },
    { key: "tax", label: "Tax", match: /tax|pillar|oecd|irs/i },
  ];

  const picked = candidates
    .filter((c) => c.match.test(text))
    .slice(0, 3)
    .map((c) => c.label);

  return picked.length ? picked : project.tags.slice(0, 3);
}

function SignalChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2 py-0.5 text-[11px] font-semibold text-brand-gold/90">
      {children}
    </span>
  );
}

function ProjectCard({
  project,
  onQuickView,
  id,
  isHighlighted = false,
}: {
  project: Project;
  onQuickView: () => void;
  id: string;
  isHighlighted?: boolean;
}) {
  const signals = useMemo(() => deriveSignals(project), [project]);

  return (
    <article
      id={id}
      className={`lsu-card group scroll-mt-28 transition hover:-translate-y-0.5 hover:border-brand-gold/30 hover:shadow-lg ${
        isHighlighted
          ? "ring-2 ring-brand-gold/50 shadow-[0_0_0_6px_rgba(253,208,23,0.10)]"
          : ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {project.title === "Fin Bomb Internal Controls Exhibit (COSO Framework)" && (
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold/80">
                Featured Exhibit
              </p>
            )}
            <h3 className="mt-0.5 truncate text-base font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-1 text-sm leading-6 text-muted">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {signals.slice(0, 3).map((s) => (
                <SignalChip key={s}>{s}</SignalChip>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            {project.timeframe ? (
              <span className="text-xs text-muted-2">{project.timeframe}</span>
            ) : null}
            <button
              type="button"
              onClick={onQuickView}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-brand-gold/30 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View case study
              <span className="text-muted-2 transition group-hover:text-brand-gold/90">↗</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted-2">
            Case study summary — open quick view for details.
          </p>
          {project.link ? (
            <a
              href={project.link.href}
              className="text-xs font-semibold text-brand-purple underline underline-offset-4 hover:decoration-brand-gold"
            >
              {project.link.label}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<"az" | "za">("az");
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const uniqueTags = useMemo(() => getUniqueTags(projects), []);

  useEffect(() => {
    if (!highlightId) return;
    if (typeof window === "undefined") return;
    const timeout = window.setTimeout(() => {
      setHighlightId(null);
    }, 1600);
    return () => window.clearTimeout(timeout);
  }, [highlightId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.location.hash.slice(1);
    const hash = raw.trim();
    if (!hash) return;

    // Ensure the target card is not hidden by search or tag filters.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch("");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTagFilter(null);

    const el = document.getElementById(hash);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightId(hash);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = projects.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q));
      const matchTag = tagFilter == null || p.tags.includes(tagFilter);
      return matchSearch && matchTag;
    });
    const sorted = [...base].sort((a, b) =>
      sort === "az" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    return sorted;
  }, [search, tagFilter, sort]);

  useEffect(() => {
    if (!sortMenuOpen) return;

    function handleClick(event: MouseEvent) {
      if (!sortMenuRef.current) return;
      if (!(event.target instanceof Node)) return;
      if (!sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSortMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [sortMenuOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setQuickViewProject(null);
      }
    }
    if (quickViewProject) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quickViewProject]);

  useEffect(() => {
    if (quickViewProject && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [quickViewProject]);

  return (
    <main className="lsu-container py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Systems I've Built
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Selected systems that reflect how I approach risk, controls, analytics, and structured
          execution.
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-2">
          Each project follows a consistent pattern: identify risk, apply structure, document
          evidence, deliver clarity.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-2"
          >
            Back to Home
          </Link>
          <a href={`mailto:${siteContent.email}`} className="lsu-btn-gold">
            Email me
          </a>
        </div>
      </header>

      <div className="mb-8">
        <section className="rounded-2xl border border-border bg-surface/85 p-4 backdrop-blur supports-[backdrop-filter]:bg-surface/70 lg:sticky lg:top-4 lg:z-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              placeholder="Search by title, description, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:border-brand-purple/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
              aria-label="Search projects"
            />
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:hidden"
                aria-expanded={filtersOpen}
                aria-controls="projects-filters"
              >
                Filters
                <span className="text-muted-2">{filtersOpen ? "–" : "+"}</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-2">Sort</span>
                <div className="relative" ref={sortMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs text-foreground shadow-sm transition hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
                  onClick={() => setSortMenuOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={sortMenuOpen}
                >
                  <span>{sort === "az" ? "A–Z" : "Z–A"}</span>
                  <span className="text-[10px] text-muted-2">▾</span>
                </button>
                {sortMenuOpen ? (
                  <div
                    className="absolute left-full top-0 z-30 ml-2 w-32 overflow-hidden rounded-xl border border-border bg-background/85 text-xs text-foreground shadow-lg backdrop-blur"
                    role="listbox"
                    aria-label="Sort projects"
                  >
                    <button
                      type="button"
                      className={`flex w-full items-center px-3 py-2 text-left transition hover:bg-surface-2 ${
                        sort === "az" ? "bg-brand-purple/25 text-foreground" : ""
                      }`}
                      onClick={() => {
                        setSort("az");
                        setSortMenuOpen(false);
                      }}
                      role="option"
                      aria-selected={sort === "az"}
                    >
                      A–Z
                    </button>
                    <button
                      type="button"
                      className={`flex w-full items-center px-3 py-2 text-left transition hover:bg-surface-2 ${
                        sort === "za" ? "bg-brand-purple/25 text-foreground" : ""
                      }`}
                      onClick={() => {
                        setSort("za");
                        setSortMenuOpen(false);
                      }}
                      role="option"
                      aria-selected={sort === "za"}
                    >
                      Z–A
                    </button>
                  </div>
                ) : null}
              </div>
              </div>
            </div>
          </div>
          <div
            id="projects-filters"
            className={`${filtersOpen ? "mt-3 block" : "mt-3 hidden"} sm:mt-4 sm:block`}
          >
            <div className="flex flex-wrap gap-2">
              <Pill
                as="button"
                active={tagFilter == null}
                onClick={() => setTagFilter(null)}
              >
                All
              </Pill>
              {uniqueTags.map((tag) => (
                <Pill
                  key={tag}
                  as="button"
                  active={tagFilter === tag}
                  onClick={() => setTagFilter(tag)}
                >
                  {tag}
                </Pill>
              ))}
            </div>
          </div>
        </section>
      </div>

      {filtered.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2">
          {filtered.map((p) => {
            const id = slugify(p.title);
            return (
              <ProjectCard
                key={p.title}
                project={p}
                id={id}
                isHighlighted={highlightId === id}
                onQuickView={() => setQuickViewProject(p)}
              />
            );
          })}
        </section>
      ) : (
        <section className="mt-6 lsu-card">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            No projects match that filter.
          </h2>
          <p className="mt-2 text-sm text-muted">
            Try adjusting your search or clearing a tag filter to see more case studies.
          </p>
        </section>
      )}

      {quickViewProject && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/90 p-4 backdrop-blur-[2px]"
          onClick={() => setQuickViewProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project quick view"
        >
          <div
            className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-brand-gold/25 bg-gradient-to-b from-surface to-surface-2 shadow-2xl p-0 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border bg-surface p-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                  Case study
                </p>
                <h2 className="mt-1 truncate text-lg font-semibold tracking-tight text-foreground">
                  {quickViewProject.title}
                </h2>
                {quickViewProject.subtitle && (
                  <p className="mt-1 text-xs text-muted-2">{quickViewProject.subtitle}</p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setQuickViewProject(null)}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Close <span className="text-muted-2">ESC</span>
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-5">
              <div className="space-y-5 text-sm leading-7 text-foreground">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Purpose
                  </p>
                  <p className="mt-2 text-foreground">{quickViewProject.description}</p>
                </div>
                {quickViewProject.problem != null &&
                  quickViewProject.framework != null &&
                  quickViewProject.outcome != null && (
                  <div className="grid gap-3 rounded-xl border border-border bg-surface-2 p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Risk
                      </p>
                      <p className="mt-1 text-muted">{quickViewProject.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Framework
                      </p>
                      <p className="mt-1 text-muted">{quickViewProject.framework}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Outcome
                      </p>
                      <p className="mt-1 text-muted">{quickViewProject.outcome}</p>
                    </div>
                  </div>
                )}
                {quickViewProject.highlights.length > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-2">
                      Inputs → Process → Output
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-muted">
                      {quickViewProject.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {quickViewProject.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-2">
                      Tags
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {quickViewProject.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {quickViewProject.link ? (
                  <a
                    href={quickViewProject.link.href}
                    className="lsu-btn-gold text-xs sm:text-sm"
                  >
                    Open project
                  </a>
                ) : (
                  <Link
                    href="/blog"
                    className="lsu-btn-gold text-xs sm:text-sm"
                  >
                    Explore blog
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setQuickViewProject(null)}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="mt-12 lsu-card sm:p-8">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          How I Approach Audit Work
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          A consistent pattern I apply across accounting, controls, and analytics work.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          <li>Identify where discretion exists and define the exposure</li>
          <li>Map risk to a documented control with assigned ownership</li>
          <li>Test conclusions against evidence before finalizing output</li>
        </ul>
      </section>

      <section className="mt-12 lsu-card">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Career focus
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          Roles where I can combine accounting fundamentals with internal audit
          and controls: testing controls, identifying risk, improving processes,
          and building dashboards that support decision-making.
        </p>
      </section>
    </main>
  );
}
