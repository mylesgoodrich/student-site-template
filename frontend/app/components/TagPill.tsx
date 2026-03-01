type TagPillVariant = "default" | "compact" | "small";

const variantClasses: Record<TagPillVariant, string> = {
  default: "px-3 py-1 text-xs",
  compact: "px-2.5 py-1 text-xs",
  small: "px-2.5 py-1 text-[11px]",
};

const baseClasses =
  "rounded-full border border-brand-purple/40 bg-brand-purple/15 font-semibold text-brand-purple shadow-sm";

type TagPillProps = {
  label: string;
  variant?: TagPillVariant;
};

export default function TagPill({ label, variant = "default" }: TagPillProps) {
  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
