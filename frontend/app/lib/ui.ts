export const CHIP_CLASSES = {
  base:
    "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-gold/30",
  baseFilter:
    "inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-gold/30",
  filterInactive:
    "border-white/10 bg-white/5 text-white/70 hover:bg-white/8 hover:text-white/85",
  filterActive:
    "border-brand-gold/40 bg-brand-gold/15 text-brand-gold shadow-[0_0_0_1px_rgba(253,208,35,0.10)]",
  tagBase:
    "border-brand-purple/30 bg-brand-purple/10 text-white/75",
  tagHoverable:
    "hover:bg-brand-purple/14 hover:text-white/85",
} as const;

