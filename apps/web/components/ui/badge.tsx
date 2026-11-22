import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "accent" | "neutral" | "outline" | "warning";

const VARIANTS: Record<BadgeVariant, string> = {
  accent: "bg-accent/15 text-accent-text",
  neutral: "bg-surface-2 text-muted",
  outline: "border border-border text-muted",
  warning: "bg-warning/15 text-warning",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
