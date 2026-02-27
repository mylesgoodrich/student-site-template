"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPostHref, posts, student } from "../lib/siteContent";

type JourneyEvent = {
  id: string;
  dateLabel: string;
  title: string;
  short: string; // short label shown on map node
  summary: string;
  detail: string;
  tags: string[];
  relatedSlugs?: string[];
};

type ViewMode = "map" | "timeline";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function pickJourneyPosts() {
  return posts
    .filter((p) => p.tags.includes("Journey"))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function JourneyPage() {
  const LSU_GOLD = "#FDD023";
  const LSU_PURPLE = "#461D7C";
  const LSU_PURPLE_BRIGHT = "#7C3AED"; // boosts visibility on dark bg

  const events: JourneyEvent[] = useMemo(
    () => [
      {
        id: "online-cc",
        dateLabel: "Early college",
        title: "Online community college didn’t work for me",
        short: "Online CC",
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
        short: "Reset",
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
        short: "In-person",
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
        short: "60 credits",
        summary:
          "I wanted LSU badly and treated it like a mission: 15 credits fall, winter, spring, summer.",
        detail:
          "It wasn’t glamorous. It was execution: show up, follow the plan, stay consistent, and keep raising the standard.",
        tags: ["Execution", "Discipline"],
      },
      {
        id: "alcatraz",
        dateLabel: "Summer before LSU",
        title: "Shark Fest Alcatraz: cold water, no turning back",
        short: "Alcatraz",
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
        short: "Move",
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
        short: "Dean’s",
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
        short: "3.9",
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
        short: "Guard",
        summary:
          "Service sharpened discipline, accountability, and execution under pressure.",
        detail:
          "The Guard reinforced that standards aren’t optional. That mindset carries into internal audit: clear documentation, repeatable processes, and evidence you can defend.",
        tags: ["Discipline", "Accountability"],
      },
    ],
    []
  );

  const journeyPosts = useMemo(() => pickJourneyPosts(), []);
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [activeId, setActiveId] = useState(events[0]?.id ?? "");
  const mapViewportRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  const active = events.find((e) => e.id === activeId) ?? events[0];

  useEffect(() => {
    const el = mapViewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only zoom when cursor is over the map viewport
      e.preventDefault();

      const delta = -e.deltaY; // up = zoom in
      const step = 0.0018; // sensitivity
      const next = clamp(zoom + delta * step, 0.8, 2.4);

      setZoom(next);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, [zoom]);

  function onMouseDown(e: any) {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  }

  function onMouseMove(e: any) {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    // pan scaling feels better when tied to zoom
    setPan({
      x: panStartRef.current.x + dx / zoom,
      y: panStartRef.current.y + dy / zoom,
    });
  }

  function endDrag() {
    isDraggingRef.current = false;
  }

  // Map layout positions (forward route with gentle upward progression)
  const mapNodes = useMemo(() => {
    const coords: Record<string, { x: number; y: number }> = {
      "online-cc": { x: 10, y: 68 },
      "time-off": { x: 22, y: 58 },
      "in-person-cc": { x: 36, y: 50 },
      "60-hours": { x: 50, y: 42 },
      "guard": { x: 64, y: 36 },
      "alcatraz": { x: 76, y: 30 },
      "moved-to-la": { x: 86, y: 26 },
      "lsu-deans-list": { x: 94, y: 22 },
      "recent-39": { x: 98, y: 18 },
    };
    return events.map((e) => ({ ...e, ...coords[e.id] }));
  }, [events]);

  return (
    <div className="space-y-10">
      <header className="lsu-card relative overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/15 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />

        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="lsu-badge">Journey</span>
              <p className="text-sm text-muted">
                Built, not given —{" "}
                <span className="font-semibold text-foreground">{student.name}</span>
              </p>
            </div>

            <div className="flex items-center rounded-xl border border-border bg-surface p-1">
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  viewMode === "map"
                    ? "bg-brand-gold text-black"
                    : "text-muted hover:text-foreground"
                )}
              >
                Map
              </button>
              <button
                type="button"
                onClick={() => setViewMode("timeline")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  viewMode === "timeline"
                    ? "bg-brand-gold text-black"
                    : "text-muted hover:text-foreground"
                )}
              >
                Timeline
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            The story behind the systems
          </h1>

          <p className="max-w-3xl text-base leading-7 text-muted">
            Click through the route. Each checkpoint is a moment that shaped how I work: structure,
            evidence, discipline, and execution under pressure.
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
              View projects & systems
            </Link>
          </div>
        </div>
      </header>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent my-2" />

      <section className="grid gap-6 lg:grid-cols-12">
        {/* LEFT: Map/Timeline interactive panel */}
        <div className="lg:col-span-7">
          {viewMode === "map" ? (
            <div className="lsu-card relative overflow-hidden">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-purple/10 blur-3xl" />
              <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Route Map</p>
                    <p className="mt-1 text-sm text-muted">
                      Click checkpoints. Hover for quick labels.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-2">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: LSU_GOLD }} />
                      Active
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: LSU_PURPLE_BRIGHT }} />
                      Checkpoint
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                  {/* Controls */}
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-muted-2">
                      Drag to pan • Scroll to zoom • Double click to reset
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setZoom((z) => clamp(z + 0.15, 0.8, 2.4))}
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2"
                        aria-label="Zoom in"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoom((z) => clamp(z - 0.15, 0.8, 2.4))}
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2"
                        aria-label="Zoom out"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={resetView}
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-surface-2"
                        aria-label="Reset view"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Viewport */}
                  <div
                    ref={mapViewportRef}
                    className="relative h-[360px] w-full overflow-hidden rounded-xl border border-border bg-[#15131D] select-none"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={endDrag}
                    onMouseLeave={endDrag}
                    onDoubleClick={resetView}
                    style={{ cursor: isDraggingRef.current ? "grabbing" : "grab" }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: "50% 50%",
                      }}
                    >
                      <svg viewBox="0 0 100 90" className="h-full w-full" role="img" aria-label="Journey route map">
                        <defs>
                          <filter id="routeGlow" x="-35%" y="-35%" width="170%" height="170%">
                            <feGaussianBlur stdDeviation="0.7" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>

                          <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow
                              dx="0"
                              dy="0.9"
                              stdDeviation="0.7"
                              floodColor="black"
                              floodOpacity="0.45"
                            />
                          </filter>

                          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={LSU_GOLD} stopOpacity="0.55" />
                            <stop offset="55%" stopColor={LSU_GOLD} stopOpacity="1" />
                            <stop offset="100%" stopColor={LSU_GOLD} stopOpacity="0.65" />
                          </linearGradient>
                        </defs>

                        {/* Background guide (very subtle) */}
                        <path
                          d="
                            M10 68
                            C16 64, 20 60, 22 58
                            C28 54, 32 52, 36 50
                            C42 46, 46 44, 50 42
                            C56 40, 60 38, 64 36
                            C70 34, 74 32, 76 30
                            C82 28, 88 26, 92 24
                            C95 22, 97 20, 98 18
                          "
                          fill="none"
                          stroke="rgba(255,255,255,0.06)"
                          strokeWidth="4.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Route (gold core) */}
                        <path
                          d="
                            M10 68
                            C16 64, 20 60, 22 58
                            C28 54, 32 52, 36 50
                            C42 46, 46 44, 50 42
                            C56 40, 60 38, 64 36
                            C70 34, 74 32, 76 30
                            C82 28, 88 26, 92 24
                            C95 22, 97 20, 98 18
                          "
                          fill="none"
                          stroke="url(#goldGrad)"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#routeGlow)"
                          opacity="0.9"
                        />

                        {/* Route shimmer (very faint moving dash) */}
                        <path
                          d="
                            M10 68
                            C16 64, 20 60, 22 58
                            C28 54, 32 52, 36 50
                            C42 46, 46 44, 50 42
                            C56 40, 60 38, 64 36
                            C70 34, 74 32, 76 30
                            C82 28, 88 26, 92 24
                            C95 22, 97 20, 98 18
                          "
                          fill="none"
                          stroke="rgba(255,255,255,0.10)"
                          strokeWidth="1.05"
                          strokeDasharray="2 14"
                          strokeLinecap="round"
                          opacity="0.8"
                        >
                          <animate attributeName="stroke-dashoffset" from="0" to="-120" dur="7s" repeatCount="indefinite" />
                        </path>

                        {/* Nodes */}
                        {mapNodes.map((n) => {
                          const isActive = n.id === activeId;
                          return (
                            <g
                              key={n.id}
                              className="group"
                              onMouseEnter={(e) => {
                                (e.currentTarget as SVGGElement).style.transform = "scale(1.06)";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as SVGGElement).style.transform = "scale(1)";
                              }}
                              style={{
                                transformOrigin: `${n.x}px ${n.y}px`,
                                transition: "transform 140ms ease",
                              }}
                            >
                              {/* click target */}
                              <circle
                                cx={n.x}
                                cy={n.y}
                                r={7}
                                fill="transparent"
                                onClick={() => setActiveId(n.id)}
                                style={{ cursor: "pointer" }}
                              />

                              {/* active pulse */}
                              {isActive && (
                                <circle cx={n.x} cy={n.y} r={6.2} fill={LSU_GOLD} opacity="0.10">
                                  <animate attributeName="opacity" values="0.06;0.14;0.06" dur="2.2s" repeatCount="indefinite" />
                                  <animate attributeName="r" values="5.8;6.6;5.8" dur="2.2s" repeatCount="indefinite" />
                                </circle>
                              )}

                              {/* ring */}
                              <circle
                                cx={n.x}
                                cy={n.y}
                                r={isActive ? 3.5 : 3.0}
                                fill="rgba(0,0,0,0.55)"
                                stroke={isActive ? LSU_GOLD : LSU_PURPLE_BRIGHT}
                                strokeWidth={1.5}
                                filter="url(#nodeShadow)"
                              >
                                {isActive && (
                                  <animate attributeName="stroke-opacity" values="0.85;1;0.85" dur="2.2s" repeatCount="indefinite" />
                                )}
                              </circle>

                              {/* center */}
                              <circle
                                cx={n.x}
                                cy={n.y}
                                r={isActive ? 1.55 : 1.25}
                                fill={isActive ? LSU_GOLD : LSU_PURPLE_BRIGHT}
                              />

                              {/* label only on hover/active */}
                              <text
                                x={n.x}
                                y={n.y - 9}
                                textAnchor="middle"
                                fontSize="2.6"
                                style={{
                                  paintOrder: "stroke",
                                  stroke: "rgba(0,0,0,0.70)",
                                  strokeWidth: 1.1,
                                  letterSpacing: "0.2px",
                                }}
                                className={
                                  (isActive
                                    ? "fill-white opacity-100"
                                    : "fill-white/80 opacity-0 group-hover:opacity-100") +
                                  " transition-opacity"
                                }
                              >
                                {n.short}
                              </text>

                              <title>{n.title}</title>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  {/* Start/Finish OUTSIDE the map */}
                  <p className="mt-3 text-xs text-muted-2">
                    <span className="font-semibold text-foreground">Start:</span> Online CC
                    <span className="mx-2">•</span>
                    <span className="font-semibold text-foreground">Finish:</span> 3.9 GPA
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-muted-2">
                      Tip: Map is for scanning. The right panel is for the full story.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {events.slice(0, 4).map((e) => (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => setActiveId(e.id)}
                          className={
                            "rounded-full border px-3 py-1.5 text-xs font-semibold transition " +
                            (e.id === activeId
                              ? "border-brand-gold bg-brand-gold/15 text-foreground"
                              : "border-border bg-surface text-muted hover:bg-surface-2")
                          }
                        >
                          {e.short}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lsu-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Timeline</p>
                  <p className="mt-1 text-sm text-muted">
                    A clean overview. Click a card to read the detail.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {events.map((e) => {
                  const isActive = e.id === activeId;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setActiveId(e.id)}
                      className={cn(
                        "text-left rounded-2xl border px-4 py-4 transition hover:shadow-lg hover:-translate-y-0.5",
                        isActive
                          ? "border-brand-gold bg-brand-gold/15"
                          : "border-border bg-surface hover:bg-surface-2"
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
                        {e.dateLabel}
                      </p>
                      <p className="mt-2 font-semibold text-foreground">{e.title}</p>
                      <p className="mt-2 text-sm text-muted">{e.summary}</p>
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
            </div>
          )}
        </div>

        {/* RIGHT: Detail panel */}
        <div className="lg:col-span-5">
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
              <p className="mt-3 text-base leading-7 text-muted">{active.detail}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-brand-purple/25 bg-brand-purple/5 px-3 py-1 text-xs font-medium text-brand-purple"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {active.relatedSlugs?.length ? (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold text-foreground">Related</p>
                  <div className="grid gap-3">
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
                          <p className="mt-1 text-xs text-muted">{p.excerpt}</p>
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

          {/* Journey posts preview */}
          <div className="mt-6 lsu-card">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">Journey posts</h3>
              <Link className="text-sm lsu-link" href="/blog">
                View all →
              </Link>
            </div>
            <div className="mt-4 grid gap-3">
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

