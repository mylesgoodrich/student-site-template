import Pill from "./ui/Pill";

type TagPillVariant = "default" | "compact" | "small";

const sizeMap: Record<TagPillVariant, "sm" | "md"> = {
  default: "md",
  compact: "sm",
  small: "sm",
};

type TagPillProps = {
  label: string;
  variant?: TagPillVariant;
};

export default function TagPill({ label, variant = "default" }: TagPillProps) {
  return (
    <Pill variant="purple" as="span" size={sizeMap[variant]}>
      {label}
    </Pill>
  );
}
