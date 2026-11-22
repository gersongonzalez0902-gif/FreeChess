import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";
import type { ButtonSize, ButtonVariant } from "@/components/ui/button";
import type { ReactNode } from "react";

/**
 * Estado vacío útil (skill de diseño): explica qué habrá aquí y cómo se
 * generará el contenido. Nada de secciones vacías sin explicación.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  actionVariant = "secondary",
  actionSize = "md",
  className,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: { label: string; href: string };
  actionVariant?: ButtonVariant;
  actionSize?: ButtonSize;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border",
        "bg-surface-2/40 px-6 py-10 text-center",
        className,
      )}
    >
      {icon && <div className="text-muted [&>svg]:size-10">{icon}</div>}
      <div className="max-w-md space-y-1.5">
        <h3 className="font-semibold text-fg">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
      {action && (
        <a href={action.href} className={buttonStyles({ variant: actionVariant, size: actionSize })}>
          {action.label}
        </a>
      )}
    </div>
  );
}
