import { CHIP_CLASSES } from "../lib/ui";

type TagPillVariant = "default" | "compact" | "small";

const variantClasses: Record<TagPillVariant, string> = {
  default: "",
  compact: "px-2.5 py-1 text-xs",
  small: "px-2.5 py-1 text-xs",
};

type TagPillProps = {
  label: string;
  variant?: TagPillVariant;
};

export default function TagPill({ label, variant = "default" }: TagPillProps) {
  return (
    <span
      className={`${CHIP_CLASSES.base} ${CHIP_CLASSES.tagBase} ${CHIP_CLASSES.tagHoverable} ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
