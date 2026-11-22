import { cn } from "@/lib/utils";

/**
 * Marca de FreeChess: esquinas de tablero en diagonal sobre verde profundo.
 * Diseño original del proyecto (sin assets de terceros).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" fill="#07331f" />
      <rect x="6" y="6" width="9.5" height="9.5" rx="2.5" fill="#35b57a" />
      <rect x="16.5" y="16.5" width="9.5" height="9.5" rx="2.5" fill="#35b57a" />
      <rect x="16.5" y="6" width="9.5" height="9.5" rx="2.5" fill="#8fd6b4" opacity="0.35" />
      <rect x="6" y="16.5" width="9.5" height="9.5" rx="2.5" fill="#8fd6b4" opacity="0.35" />
    </svg>
  );
}

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-8" />
      {!collapsed && (
        <span className="text-lg font-bold tracking-tight text-fg">
          Free<span className="text-accent-text">Chess</span>
        </span>
      )}
    </span>
  );
}
