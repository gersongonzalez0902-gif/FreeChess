"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "@freechess/shared";

const ORDER: ThemeMode[] = ["light", "dark", "system"];

const LABELS: Record<ThemeMode, string> = {
  light: dict.theme.light,
  dark: dict.theme.dark,
  system: dict.theme.system,
};

/** Cicla claro → oscuro → sistema. Objetivo táctil ≥ 44 px (skill de diseño). */
export function ThemeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useTheme();
  const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length] ?? "dark";
  const label = dict.theme.current.replace("{theme}", LABELS[mode]);

  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-xl text-muted transition-colors",
        "hover:bg-surface-2 hover:text-fg",
        className,
      )}
    >
      {mode === "light" ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : mode === "dark" ? (
        <Moon className="size-5" aria-hidden="true" />
      ) : (
        <Monitor className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
