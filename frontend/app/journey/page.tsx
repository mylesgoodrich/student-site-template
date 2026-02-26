"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPostHref, posts, student } from "../lib/siteContent";

type JourneyEvent = {
  id: string;
  dateLabel: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
  relatedSlugs?: string[];
};

function classNames(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function JourneyPage() {
  const events: JourneyEvent[] = useMemo(
    () => [
      {
        id: "online-cc",
        dateLabel: "Early college",
        title: "Online community college didn’t work for me",
        summary:
          "I didn’t learn well in an online format and underestimated how much structure I needed.",
        detail:
          "I thought I had dropped by the deadline, but a miscommunication meant I stayed enrolled. My first grades were an F, a D, and an A — a rough start that forced an honest reset.",
        tags: ["Reset", "Structure"],
      },
      {
        id: "time-off",
        dateLabel: "Reset",
        title: "Took a semester off and rebuilt my approach",
        summary:
          "Instead of pretending everything was fine, I paused and rebuilt my system.",
        detail:
          "That break helped me stop reacting and start designing habits: planning, consistency, and a standard for what ‘good work’ looks like.",
        tags: ["Discipline", "Comeback"],
      },
      {
        id: "in-person-cc",
        dateLabel: "Community college",
        title: "Returned in-person and proved consistency",
        summary:
          "In-person learning changed everything. I earned a 3.7 GPA and built momentum.",
        detail:
          "The bigger win wasn’t just grades — it was structure. I learned how to plan my weeks, track deadlines, and improve steadily instead of relying on motivation.",
        tags: ["Momentum", "System"],
      },
      {
        id: "60-hours",
        dateLabel: "One-year sprint",
        title: "Earned 60 credit hours in one year",
        summary:
          "I wanted LSU badly and treated it like a mission: 15 credits fall, winter, spring, summer.",
        detail:
          "It wasn’t glamorous. It was execution: show up, follow the plan, stay consistent, and keep raising the standard.",
        tags: ["Execution", "Discipline"],
      },
      {
        id: "alcatraz",
        dateLabel: "Summer before LSU",
        title: "Shark Fest Alcatraz: first open-water swim",
        summary:
          "My first open-water swim — cold water, current, the SF skyline ahead and Alcatraz behind me.",
        detail:
          "My godfather asked if I wanted to do it with him. I said yes — I don’t back down from challenges. Halfway through I looked up and saw the skyline, then looked back and saw the prison. It’s still one of the most memorable experiences of my life.",
        tags: ["Resilience", "Challenge"],
        relatedSlugs: ["shark-fest-alcatraz-cold-water-no-turning-back"],
      },
      {
        id: "moved-to-la",
        dateLabel: "Transfer",
        title: "Moved to Baton Rouge without ever visiting Louisiana",
        summary:
          "The first time I came to Louisiana was two weeks before the semester started — to look at housing.",
        detail:
          "No friends. No comfort zone. I started fresh and built a new life through routine, consistency, and getting involved.",
        tags: ["Courage", "Fresh start"],
        relatedSlugs: ["moving-to-lsu-without-ever-visiting"],
      },
      {
        id: "lsu-deans-list",
        dateLabel: "LSU",
        title: "First semester at LSU: 3.7 GPA and Dean’s List",
        summary:
          "The plan worked. The structure translated. I kept improving.",
        detail:
          "That semester proved I wasn’t defined by the rough start — I was defined by the response to it.",
        tags: ["Proof", "Growth"],
      },
      {
        id: "recent-39",
        dateLabel: "Recent",
        title: "Recent semester: 3.9 GPA (3 A+ and 1 B-)",
        summary:
          "I kept raising the bar — stronger performance while taking on more responsibility.",
        detail:
          "That’s the pattern I trust: structure → consistency → results. Not intensity. Not hype.",
        tags: ["Standard", "Consistency"],
        relatedSlugs: ["from-rough-start-to-structured-comeback"],
      },
      {
        id: "guard",
        dateLabel: "Service",
        title: "Louisiana Army National Guard (PFC)",
        summary:
          "Service sharpened discipline, accountability, and execution under pressure.",
        detail:
          "The Guard reinforced that standards aren’t optional. That mindset carries into internal audit: clear documentation, repeatable processes, and evidence you can defend.",
        tags: ["Discipline", "Accountability"],
      },
    ],
    []
  );

  const journeyPosts = useMemo(() => {
    return posts
      .filter((p) => p.tags.includes("Journey"))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const [activeId, setActiveId] = useState(events[0]?.id ?? "");
  const [viewMode, setViewMode] = useState<"timeline" | "map">("timeline");
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [markerTop, setMarkerTop] = useState<number | null>(null);

  const active = events.find((e) => e.id === activeId) ?? events[0];

  useEffect(() => {
    if (viewMode !== "map") return;
    const container = mapRef.current;
    const activeEl = itemRefs.current[activeId];
    if (!container || !activeEl) return;

    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();

    const top = aRect.top - cRect.top + aRect.height / 2 - 10;
    setMarkerTop(top);
  }, [viewMode, activeId]);

  return (
    <div className="space-y-10">
      <header className="lsu-card relative overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/15 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />

        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="lsu-badge">Journey</span>
            <p className="text-sm text-muted">
              The story behind the work —{" "}
              <span className="font-semibold text-foreground">{student.name}</span>
            </p>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Built, not given
          </h1>

          <p className="max-w-3xl text-base leading-7 text-muted">
            A rough start taught me to build structure. Moving across the country forced me to grow.
            Service reinforced standards. Challenges proved I can execute when it’s uncomfortable.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-xl bg-brand-gold px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Read the Journey posts →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-2"
            >
              View systems I’ve built
            </Link>
          </div>
        </div>
      </header>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent my-2" />

      <section className="grid gap-6 lg:grid-cols-12">
        {/* Timeline / Map list */}
        <div className="lg:col-span-5">
          <div className="lsu-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">Journey</h2>
                <p className="mt-1 text-sm text-muted">
                  Switch views to explore the story.
                </p>
              </div>

              <div className="flex items-center rounded-xl border border-border bg-surface p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("timeline")}
                  className={
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition " +
                    (viewMode === "timeline"
                      ? "bg-brand-gold text-black"
                      : "text-muted hover:text-foreground")
                  }
                >
                  Timeline
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition " +
                    (viewMode === "map"
                      ? "bg-brand-gold text-black"
                      : "text-muted hover:text-foreground")
                  }
                >
                  Map
                </button>
              </div>
            </div>

            <div className="mt-5">
              {viewMode === "timeline" ? (
                <div className="space-y-2">
                  {events.map((e) => {
                    const isActive = e.id === activeId;
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setActiveId(e.id)}
                        className={classNames(
                          "w-full text-left rounded-xl border px-4 py-3 transition",
                          isActive
                            ? "border-brand-gold bg-brand-gold/15"
                            : "border-border bg-surface hover:bg-surface-2"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                              {e.dateLabel}
                            </p>
                            <p className="mt-1 font-semibold text-foreground">{e.title}</p>
                            <p className="mt-1 text-sm text-muted">{e.summary}</p>
                          </div>

                          <span
                            className={classNames(
                              "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                              isActive ? "bg-brand-gold" : "bg-border"
                            )}
                          />
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {e.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-brand-purple/25 bg-brand-purple/5 px-2.5 py-1 text-xs font-medium text-brand-purple"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div
                  ref={mapRef}
                  className="relative rounded-2xl border border-border bg-surface p-4 overflow-hidden"
                >
                  {/* Map header */}
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Route Map</p>
                    <p className="text-xs text-muted-2">Click checkpoints</p>
                  </div>

                  {/* Start / Finish badges */}
                  <div className="absolute left-4 top-16">
                    <span className="rounded-full border border-brand-purple/30 bg-brand-purple/10 px-3 py-1 text-[11px] font-semibold text-brand-purple">
                      Start
                    </span>
                  </div>
                  <div className="absolute left-4 bottom-4">
                    <span className="rounded-full border border-brand-purple/30 bg-brand-purple/10 px-3 py-1 text-[11px] font-semibold text-brand-purple">
                      Finish
                    </span>
                  </div>

                  {/* You are here marker */}
                  {markerTop !== null && (
                    <div
                      ref={markerRef}
                      className="absolute left-2 z-10 flex items-center gap-2 transition-all duration-300"
                      style={{ top: markerTop }}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-gold" />
                      <span className="rounded-full border border-brand-gold/40 bg-brand-gold/15 px-2.5 py-1 text-[11px] font-semibold text-brand-gold">
                        You are here
                      </span>
                    </div>
                  )}

                  {/* Vertical route line */}
                  <div className="absolute left-8 top-24 bottom-10 w-px bg-gradient-to-b from-brand-purple/40 via-brand-gold/40 to-brand-purple/40" />

                  <div className="space-y-4">
                    {events.map((e, idx) => {
                      const isActive = e.id === activeId;
                      return (
                        <button
                          key={e.id}
                          ref={(el) => {
                            itemRefs.current[e.id] = el;
                          }}
                          type="button"
                          onClick={() => setActiveId(e.id)}
                          className={classNames(
                            "relative w-full text-left rounded-2xl border px-4 py-3 pl-14 transition",
                            isActive
                              ? "border-brand-gold bg-brand-gold/15"
                              : "border-border bg-surface hover:bg-surface-2"
                          )}
                        >
                          {/* Checkpoint */}
                          <div className="absolute left-6 top-1/2 -translate-y-1/2">
                            <div
                              className={classNames(
                                "relative h-5 w-5 rounded-full border",
                                isActive
                                  ? "border-brand-gold bg-brand-gold"
                                  : "border-border bg-surface"
                              )}
                            >
                              {isActive && (
                                <span className="absolute inset-0 rounded-full bg-brand-gold/40 animate-ping-slow" />
                              )}
                            </div>
                          </div>

                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                                Stop {idx + 1} • {e.dateLabel}
                              </p>
                              <p className="mt-1 font-semibold text-foreground">{e.title}</p>
                              <p className="mt-1 text-sm text-muted">{e.summary}</p>
                            </div>

                            <span className="text-xs text-muted-2">{e.tags[0]}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 text-xs text-muted-2">
                    Tip: Use Map view to scan the arc quickly, then read the detail panel on the right.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active detail */}
        <div className="lg:col-span-7">
          <div className="lsu-card relative overflow-hidden">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/10 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                {active.dateLabel}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {active.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-muted">
                {active.detail}
              </p>

              {active.relatedSlugs?.length ? (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold text-foreground">Related</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {active.relatedSlugs.map((slug) => {
                      const p = posts.find((x) => x.slug === slug);
                      if (!p) return null;
                      return (
                        <Link
                          key={slug}
                          href={getPostHref(slug)}
                          className="rounded-xl border border-border bg-surface px-4 py-3 transition hover:bg-surface-2 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <p className="text-sm font-semibold underline decoration-brand-gold/40 underline-offset-4">
                            {p.title}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            {p.excerpt}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-6 py-6 text-sm">
                <p className="font-semibold text-brand-gold">— Myles</p>
                <p className="mt-1 text-muted">Discipline compounds.</p>
              </div>
            </div>
          </div>

          {/* Journey posts list */}
          <div className="mt-6 lsu-card">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">Journey posts</h3>
              <Link className="text-sm lsu-link" href="/blog">
                View all →
              </Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {journeyPosts.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  href={getPostHref(p.slug)}
                  className="rounded-xl border border-border bg-surface px-4 py-3 transition hover:bg-surface-2 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="mt-1 text-xs text-muted">{p.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-brand-purple/25 bg-brand-purple/5 px-2.5 py-1 text-[11px] font-medium text-brand-purple"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

