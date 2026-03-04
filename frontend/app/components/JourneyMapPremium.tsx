"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import siteContent from "../lib/siteContent";

type Mode = "past" | "present" | "future";

type Checkpoint = {
  id: string;
  mode: Mode;
  label: string;
  title: string;
  detail: string;
  year?: string;
  metricTag?: string;
  x: number;
  y: number;
  achievement?: { id: string; label: string; icon?: string };
};

const LSU_GOLD = "#FDD023";
const LSU_PURPLE = "#461D7C";
const LSU_PURPLE_BRIGHT = "#7C3AED";

const W = 100;
const H = 100;

/** Build path through every point using quadratic segments (midpoint control). Same coords as dots. */
function buildPathThroughPoints(
  points: Array<{ x: number; y: number }>
): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2;
    d += ` Q ${midX} ${midY} ${p1.x} ${p1.y}`;
  }
  return d;
}

function buildCheckpoints(): {
  past: Checkpoint[];
  present: Checkpoint[];
  future: Checkpoint[];
} {
  const milestones = siteContent.comeback?.milestones ?? [];
  const pastCoords = [
    { x: 0.16, y: 0.7 },
    { x: 0.52, y: 0.48 },
    { x: 0.86, y: 0.3 },
  ];
  const past: Checkpoint[] = milestones.slice(0, 3).map((m, i) => ({
    id: `past-${i}`,
    mode: "past",
    label: m.year ?? "Past",
    title: m.title,
    detail: m.detail,
    year: m.year,
    metricTag: m.year ?? undefined,
    x: pastCoords[i]?.x ?? 0.5,
    y: pastCoords[i]?.y ?? 0.5,
    achievement: {
      id: `past-achievement-${i}`,
      label: i === 0 ? "Started" : i === 1 ? "Progress" : "Academic comeback",
    },
  }));

  const presentCoords = [
    { x: 0.16, y: 0.7 },
    { x: 0.52, y: 0.48 },
    { x: 0.86, y: 0.3 },
  ];
  const present: Checkpoint[] = [
    {
      id: "present-momentum",
      mode: "present",
      label: "LSU Momentum",
      title: "LSU Momentum",
      detail:
        "Recent semester: 3.9 GPA with Dean's List. Consistent execution under a higher load.",
      year: "Now",
      metricTag: "GPA 3.9 / Dean's List",
      x: presentCoords[0].x,
      y: presentCoords[0].y,
      achievement: { id: "present-achievement-0", label: "LSU momentum" },
    },
    {
      id: "present-controls",
      mode: "present",
      label: "Controls & Dashboards",
      title: "Controls & Dashboards",
      detail:
        "Designed and documented 31 controls and dashboards that make risks and metrics visible.",
      year: "Now",
      metricTag: "31 controls / dashboards",
      x: presentCoords[1].x,
      y: presentCoords[1].y,
      achievement: { id: "present-achievement-1", label: "Controls & dashboards" },
    },
    {
      id: "present-guard",
      mode: "present",
      label: "Guard Standards",
      title: "Guard Standards",
      detail:
        "Louisiana Army National Guard (PFC). Standards, accountability, and execution carry into my audit work.",
      year: "Now",
      metricTag: "PFC • Accountability",
      x: presentCoords[2].x,
      y: presentCoords[2].y,
      achievement: { id: "present-achievement-2", label: "Guard discipline" },
    },
  ];

  const futureCoords = [
    { x: 0.16, y: 0.64 },
    { x: 0.4, y: 0.48 },
    { x: 0.64, y: 0.34 },
    { x: 0.86, y: 0.24 },
  ];
  const future: Checkpoint[] = [
    {
      id: "future-internship",
      mode: "future",
      label: "Audit Internship",
      title: "Internal Audit Internship",
      detail:
        "Target: secure an internal audit internship to apply controls, testing, and documentation in a real environment.",
      year: "Projected",
      metricTag: "Hands-on controls work",
      x: futureCoords[0].x,
      y: futureCoords[0].y,
      achievement: { id: "future-achievement-0", label: "Internship" },
    },
    {
      id: "future-cia",
      mode: "future",
      label: "CIA Progress",
      title: "CIA Progress",
      detail:
        "Target: pass CIA exam parts in sequence while keeping class performance steady.",
      year: "Projected",
      metricTag: "CIA Part 1 / Part 2",
      x: futureCoords[1].x,
      y: futureCoords[1].y,
      achievement: { id: "future-achievement-1", label: "CIA progress" },
    },
    {
      id: "future-offer",
      mode: "future",
      label: "Full-time Offer",
      title: "Full-time Offer",
      detail:
        "Target: full-time role in risk and controls where I can scale systems, documentation, and dashboards.",
      year: "Projected",
      metricTag: "Risk & controls role",
      x: futureCoords[2].x,
      y: futureCoords[2].y,
      achievement: { id: "future-achievement-2", label: "Full-time offer" },
    },
    {
      id: "future-credentials",
      mode: "future",
      label: "CPA / CIA Completed",
      title: "CPA / CIA Completed",
      detail:
        "Target: complete CPA / CIA credentials so my documentation and recommendations are backed by rigorous standards.",
      year: "Projected",
      metricTag: "CPA / CIA completed",
      x: futureCoords[3].x,
      y: futureCoords[3].y,
      achievement: { id: "future-achievement-3", label: "Credentials earned" },
    },
  ];

  return { past, present, future };
}

export default function JourneyMapPremium() {
  const shouldReduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("past");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [parallax, setParallax] = useState({
    bgX: 0,
    bgY: 0,
    glowX: 0,
    glowY: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const userClickedRef = useRef(false);
  const [tooltipPlacement, setTooltipPlacement] = useState<{ left: number; top: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { past, present, future } = useMemo(() => buildCheckpoints(), []);
  const checkpoints = mode === "past" ? past : mode === "present" ? present : future;
  const activeCheckpoint =
    checkpoints.find((c) => c.id === activeId) ?? checkpoints[0] ?? null;
  const hoveredCheckpoint = hoveredId
    ? checkpoints.find((c) => c.id === hoveredId) ?? null
    : null;

  const TOOLTIP_MAX_WIDTH = 180;
  const TOOLTIP_EST_HEIGHT = 60;
  const TOOLTIP_PADDING = 12;

  useLayoutEffect(() => {
    if (!hoveredCheckpoint || !mapRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTooltipPlacement(null);
      return;
    }
    const rect = mapRef.current.getBoundingClientRect();
    const centerX = rect.width * hoveredCheckpoint.x;
    const centerY = rect.height * hoveredCheckpoint.y;
    let left = centerX - TOOLTIP_MAX_WIDTH / 2;
    let top = centerY - TOOLTIP_EST_HEIGHT - 10;
    left = Math.max(
      TOOLTIP_PADDING,
      Math.min(left, rect.width - TOOLTIP_MAX_WIDTH - TOOLTIP_PADDING)
    );
    top = Math.max(
      TOOLTIP_PADDING,
      Math.min(top, rect.height - TOOLTIP_EST_HEIGHT - TOOLTIP_PADDING)
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTooltipPlacement({ left, top });
  }, [hoveredCheckpoint]);

  /** Route path through every checkpoint; same normalized coords as dots (W=100, H=100) */
  const routePathD = useMemo(
    () =>
      buildPathThroughPoints(
        checkpoints.map((c) => ({ x: c.x * W, y: c.y * H }))
      ),
    [checkpoints]
  );

  // Sync activeId when mode/checkpoints change; get path length once mounted
  useEffect(() => {
    if (!checkpoints.some((c) => c.id === activeId) && checkpoints[0]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveId(checkpoints[0].id);
    }
  }, [mode, checkpoints, activeId]);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    setPathLength(el.getTotalLength());
  }, [checkpoints]);

  // Scroll-driven progress: update progress and active checkpoint
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const p = Math.max(0, Math.min(1, v));
      setProgress(p);
      if (checkpoints.length === 0) return;
      const idx = Math.min(
        Math.floor(p * checkpoints.length),
        checkpoints.length - 1
      );
      const nextId = checkpoints[idx]?.id ?? null;
      if (userClickedRef.current) userClickedRef.current = false;
      setActiveId(nextId);
    });
    return () => unsub();
  }, [scrollYProgress, checkpoints]);

  // Achievement unlock: when a checkpoint becomes active, unlock it once per session
  useEffect(() => {
    if (!activeId) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnlocked((prev) => {
      if (prev.has(activeId)) return prev;
      const next = new Set(prev);
      next.add(activeId);
      return next;
    });
  }, [activeId]);

  const achievementsUnlockedForMode = useMemo(
    () =>
      checkpoints.filter(
        (c) => c.achievement && unlocked.has(c.id)
      ),
    [checkpoints, unlocked]
  );

  function resetAchievementsForCurrentMode() {
    setUnlocked((prev) => {
      const next = new Set(prev);
      checkpoints.forEach((c) => next.delete(c.id));
      return next;
    });
  }

  function handleMapMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      bgX: relX * 3,
      bgY: relY * 3,
      glowX: relX * 6,
      glowY: relY * 6,
    });
  }

  function handleMapMouseLeave() {
    if (shouldReduceMotion) return;
    setParallax({ bgX: 0, bgY: 0, glowX: 0, glowY: 0 });
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-[rgba(70,29,124,0.25)] bg-[#14121b] p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }
      }
    >
      <div ref={containerRef} className="relative space-y-4">
        {/* Top bar: Route Map + mode toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">Route Map</p>
          <div className="inline-flex items-center gap-0.5 rounded-xl border border-[rgba(253,208,35,0.2)] bg-[#1a1820] p-0.5 text-xs font-medium">
            {(["past", "present", "future"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  const list = m === "past" ? past : m === "present" ? present : future;
                  setActiveId(list[0]?.id ?? null);
                }}
                className={`rounded-md px-3 py-1.5 transition ${
                  mode === m
                    ? "bg-brand-gold text-black"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {m === "past" ? "Past" : m === "present" ? "Present" : "Future"}
              </button>
            ))}
          </div>
        </div>

        {/* Left: SVG route map | Right: story panel */}
        <div className="grid gap-4 md:grid-cols-5">
            <div
            ref={mapRef}
            className="md:col-span-2 relative min-h-[280px] rounded-xl border border-[rgba(253,208,35,0.12)] bg-[#171522] overflow-hidden shadow-sm"
            onMouseMove={handleMapMouseMove}
            onMouseLeave={() => {
              handleMapMouseLeave();
              setHoveredId(null);
            }}
          >
            {/* Background grid: 1–2px parallax; disabled when prefers-reduced-motion */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
              animate={{
                x: shouldReduceMotion ? 0 : parallax.bgX,
                y: shouldReduceMotion ? 0 : parallax.bgY,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 32,
              }}
            />
            {/* Subtle center tint (no neon); disabled when prefers-reduced-motion */}
            <motion.div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(253,208,35,0.03),transparent_70%)]"
              animate={{
                x: shouldReduceMotion ? 0 : parallax.glowX,
                y: shouldReduceMotion ? 0 : parallax.glowY,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 32,
              }}
            />
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 h-full w-full"
              role="img"
              aria-label="Journey route map"
            >
              <defs>
                <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0.5" stdDeviation="0.3" floodColor="#000" floodOpacity="0.35" />
                </filter>
              </defs>
              {/* Soft halo behind line: reduced spread, slightly higher opacity */}
              <path
                d={routePathD}
                fill="none"
                stroke={LSU_GOLD}
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.26}
              />
              {/* Core stroke: gold, full opacity; crisp full path for all modes */}
              <path
                ref={pathRef}
                d={routePathD}
                fill="none"
                stroke={LSU_GOLD}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Checkpoints */}
              {checkpoints.map((c) => {
                const px = c.x * W;
                const py = c.y * H;
                const isActive = c.id === activeId;
                return (
                  <g
                    key={c.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      userClickedRef.current = true;
                      setActiveId(c.id);
                    }}
                    onMouseEnter={() => setHoveredId(c.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <circle cx={px} cy={py} r={8} fill="transparent" />
                    {isActive && !shouldReduceMotion && (
                      <motion.circle
                        cx={px}
                        cy={py}
                        r={6}
                        fill={LSU_GOLD}
                        opacity={0.12}
                        animate={{ opacity: [0.08, 0.14, 0.08], r: [5.5, 6.5, 5.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    {/* Inactive: purple ring + dark center; Active: gold ring + gold center */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isActive ? 3.5 : 2.5}
                      fill="rgba(0,0,0,0.6)"
                      stroke={isActive ? LSU_GOLD : LSU_PURPLE_BRIGHT}
                      strokeWidth={1.2}
                      filter="url(#nodeShadow)"
                    />
                    <circle
                      cx={px}
                      cy={py}
                      r={isActive ? 1.2 : 0.9}
                      fill={isActive ? LSU_GOLD : "rgba(0,0,0,0.8)"}
                    />
                  </g>
                );
              })}
            </svg>
            {/* HTML tooltip: only when hoveredCheckpoint != null; no SVG text on map */}
            {hoveredCheckpoint && tooltipPlacement && (
              <div
                className="pointer-events-none absolute z-20 max-w-[180px] rounded-md border border-brand-gold/25 bg-[#0f0d16]/95 px-2.5 py-1.5 shadow-md"
                style={{
                  left: `${tooltipPlacement.left}px`,
                  top: `${tooltipPlacement.top}px`,
                }}
              >
                <p className="text-sm font-semibold text-white leading-tight">
                  {hoveredCheckpoint.title}
                </p>
                {hoveredCheckpoint.metricTag && (
                  <p className="mt-0.5 text-xs text-white/70">
                    {hoveredCheckpoint.metricTag}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="md:col-span-3 max-w-full rounded-xl border border-[rgba(253,208,35,0.15)] bg-[#1a1820] p-6 space-y-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              {mode === "past"
                ? "Past checkpoint"
                : mode === "present"
                  ? "Present"
                  : "Projected future"}
            </p>
            {activeCheckpoint ? (
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white leading-tight">
                  {activeCheckpoint.title}
                </h3>
                {activeCheckpoint.metricTag && (
                  <p>
                    <span className="inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2.5 py-0.5 text-xs font-medium text-white">
                      {activeCheckpoint.metricTag}
                    </span>
                  </p>
                )}
                {activeCheckpoint.year && (
                  <p className="text-xs uppercase tracking-wide text-white/65">
                    {activeCheckpoint.year}
                  </p>
                )}
                <p className="text-base leading-7 text-white/85 max-w-prose">
                  {activeCheckpoint.detail}
                </p>
              </div>
            ) : (
              <p className="text-sm text-white/70">Select a checkpoint.</p>
            )}
          </div>
        </div>

        {/* Achievements tray: only unlocked for current mode; pop when added; reset button */}
        <div className="rounded-xl border border-[rgba(253,208,35,0.12)] bg-[#1a1820] p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-white">Achievements</p>
            <button
              type="button"
              onClick={resetAchievementsForCurrentMode}
              className="text-[10px] font-medium text-white/65 hover:text-white/90 transition-colors"
            >
              Reset achievements
            </button>
          </div>
          {achievementsUnlockedForMode.length === 0 ? (
            <p className="mt-1 text-[11px] text-white/65">
              Scroll or click checkpoints to unlock.
            </p>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              {achievementsUnlockedForMode.map((c) => (
                <motion.span
                  key={`${mode}-${c.achievement?.id ?? c.id}`}
                  initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                  animate={{ scale: 1 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 25 }
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2.5 py-1 text-[11px] font-semibold text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
                  {c.achievement?.label}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
