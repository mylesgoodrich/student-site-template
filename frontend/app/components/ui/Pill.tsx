"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  active?: boolean;
  variant?: "default" | "gold" | "purple";
  size?: "sm" | "md";
  as?: "button" | "span";
  onClick?: () => void;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick"> &
  Omit<ComponentPropsWithoutRef<"span">, "children">;

const sizeClasses = {
  sm: "px-3 py-2 text-xs min-h-[44px]",
  md: "px-3 py-2 text-xs min-h-[44px]",
};

const baseClasses =
  "inline-flex items-center gap-1 rounded-full border font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background";

function getVariantClasses(
  variant: "default" | "gold" | "purple",
  active: boolean,
  as: "button" | "span"
) {
  const isInteractive = as === "button";
  const hover = isInteractive
    ? "hover:border-white/15 hover:bg-white/[0.08] hover:text-white/95 motion-reduce:transition-none"
    : "";

  if (variant === "purple") {
    return [
      "border-brand-purple/25 bg-brand-purple/12 text-white/90",
      "hover:bg-brand-purple/16 hover:text-white/95",
      hover,
    ].join(" ");
  }

  if (active) {
    return [
      "border-brand-gold/45 bg-brand-gold/18 text-brand-gold shadow-[0_0_0_1px_rgba(253,208,35,0.12)]",
      hover,
    ].join(" ");
  }

  // default (filter inactive)
  return [
    "border-white/12 bg-white/[0.06] text-white/75",
    hover,
  ].join(" ");
}

export default function Pill({
  children,
  active = false,
  variant = "default",
  size = "md",
  as: Component = "span",
  onClick,
  className = "",
  ...rest
}: PillProps) {
  const variantClasses = getVariantClasses(variant, active, Component);
  const sizeClass = sizeClasses[size];
  const combined = `${baseClasses} ${sizeClass} ${variantClasses} ${className}`.trim();

  if (Component === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={combined}
        {...(rest as ComponentPropsWithoutRef<"button">)}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={combined} {...(rest as ComponentPropsWithoutRef<"span">)}>
      {children}
    </span>
  );
}
