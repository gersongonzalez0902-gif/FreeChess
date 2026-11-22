import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Botón del sistema de diseño FreeChess.
 * Estados obligatorios (skill de diseño): hover, focus visible (global en
 * globals.css), disabled y objetivo táctil ≥ 44 px en tamaño md+.
 */

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg font-semibold hover:bg-accent-hover disabled:hover:bg-accent",
  secondary: "bg-surface-2 text-fg font-medium hover:bg-border",
  outline: "border border-border bg-transparent text-fg font-medium hover:bg-surface-2",
  ghost: "bg-transparent text-muted font-medium hover:bg-surface-2 hover:text-fg",
  danger: "bg-danger text-white font-semibold hover:opacity-90",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 rounded-lg px-3 text-sm",
  md: "h-11 gap-2 rounded-xl px-4 text-sm",
  lg: "h-12 gap-2 rounded-xl px-6 text-base",
};

export function buttonStyles(opts?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  const { variant = "primary", size = "md", className } = opts ?? {};
  return cn(
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap",
    "transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
