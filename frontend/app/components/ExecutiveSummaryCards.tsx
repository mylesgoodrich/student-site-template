import {
  Layers,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const TILES = [
  {
    label: "Institutional GPA",
    value: "3.416",
    caption: "Sustained above 3.3 after stabilization",
    Icon: TrendingUp,
  },
  {
    label: "Highest Semester GPA",
    value: "3.900",
    caption: "Upper-division accounting load",
    Icon: Sparkles,
  },
  {
    label: "Credits Completed",
    value: "116+",
    caption: "Including transfer credit",
    Icon: Layers,
  },
  {
    label: "GUARD STATUS",
    main: "PFC",
    sub: "Louisiana National Guard",
    footer: "Concurrent with academic load",
    Icon: Shield,
  },
];

function isGuardTile(
  tile: (typeof TILES)[number]
): tile is (typeof TILES)[number] & { main: string; sub: string; footer: string } {
  return "main" in tile && "sub" in tile;
}

const cardBase =
  "relative rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-all duration-150 hover:border-white/15 hover:shadow-md motion-reduce:transition-none";

export default function ExecutiveSummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TILES.map((tile) => {
        const Icon = tile.Icon;
        const isGuard = isGuardTile(tile);
        return (
          <div key={tile.label} className={cardBase}>
            <Icon
              className="absolute right-4 top-4 size-[18px] text-white/50"
              aria-hidden
            />
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/60">
              {tile.label}
            </p>
            {isGuard ? (
              <>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-brand-gold sm:text-3xl">
                  {tile.main}
                </p>
                <p className="mt-0.5 text-sm text-foreground/90">{tile.sub}</p>
                <p className="mt-2 text-xs text-white/55">{tile.footer}</p>
              </>
            ) : (
              <>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-brand-gold sm:text-3xl">
                  {tile.value}
                </p>
                <p className="mt-1 text-sm text-white/60">{tile.caption}</p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
