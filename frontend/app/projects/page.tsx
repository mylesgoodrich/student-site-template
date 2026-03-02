"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, type Project } from "../lib/projectsData";
import { siteContent } from "../lib/siteContent";
import { CHIP_CLASSES } from "../lib/ui";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-border bg-surface-2 px-2 py-0.5 text-xs text-muted-2">
      {children}
    </span>
  );
}

function getUniqueTags(projs: Project[]) {
  const set = new Set<string>();
  projs.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

function ProjectCard({
  project,
  expanded,
  onToggle,
}: {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}) {
  const shortDescription =
    project.description.length > 160
      ? project.description.slice(0, 157).trim() + "..."
      : project.description;
  const hasSystemFrame =
    project.problem != null &&
    project.framework != null &&
    project.outcome != null;
  const hasLongDescription = project.description.length > 160;

  return (
    <article className="lsu-card">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          {project.timeframe ? (
            <span className="text-xs text-muted-2">{project.timeframe}</span>
          ) : null}
        </div>

        {hasSystemFrame ? (
          <dl className="grid gap-2 rounded-xl border border-border bg-surface-2 p-4 text-sm text-muted">
            <div>
              <dt className="font-medium text-muted-2">Problem</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-2">Framework</dt>
              <dd>{project.framework}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-2">Outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
        ) : null}

        <p className="text-sm leading-6 text-muted">
          {expanded ? project.description : shortDescription}
        </p>
        {hasLongDescription && (
          <button
            type="button"
            onClick={onToggle}
            className="w-fit text-sm font-medium text-brand-purple underline underline-offset-4 hover:decoration-brand-gold"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-2">
            Highlights
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        {project.link ? (
          <div className="pt-2">
            <a
              href={project.link.href}
              className="text-sm font-medium text-brand-purple underline underline-offset-4 hover:decoration-brand-gold"
            >
              {project.link.label}
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const uniqueTags = useMemo(() => getUniqueTags(projects), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q));
      const matchTag = tagFilter == null || p.tags.includes(tagFilter);
      return matchSearch && matchTag;
    });
  }, [search, tagFilter]);

  const toggleExpanded = (title: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <main className="lsu-container py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Systems I've Built
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Controls, evidence, analytics, and documentation — built to be
          testable and repeatable.
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

      <div className="mb-8 space-y-4">
        <input
          type="search"
          placeholder="Search by title, description, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 focus:border-brand-purple/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
          aria-label="Search projects"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTagFilter(null)}
            className={`${CHIP_CLASSES.base} ${
              tagFilter == null ? CHIP_CLASSES.filterActive : CHIP_CLASSES.filterInactive
            }`}
          >
            All
          </button>
          {uniqueTags.map((tag, idx) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTagFilter(tag)}
              className={`${CHIP_CLASSES.base} ${
                tagFilter === tag ? CHIP_CLASSES.filterActive : CHIP_CLASSES.filterInactive
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <section className="grid gap-6 sm:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard
            key={p.title}
            project={p}
            expanded={expandedIds.has(p.title)}
            onToggle={() => toggleExpanded(p.title)}
          />
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="text-sm text-muted">No projects match your search or filter.</p>
      )}

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
