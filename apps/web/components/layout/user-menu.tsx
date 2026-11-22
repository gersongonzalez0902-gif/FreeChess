"use client";

import Link from "next/link";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { dict } from "@/lib/i18n";
import { cn, initialsOf } from "@/lib/utils";

/**
 * Estado de sesión en la interfaz (cliente para no acoplar el render del
 * servidor a la base de datos). Si la sesión no se puede consultar (base
 * sin migrar, red caída), better-auth devuelve error y se muestra el
 * estado de invitado: degradación elegante, nunca una pantalla rota.
 * - variant="sidebar": fila compacta del pie de la barra lateral (solo
 *   iconos para invitados, para no partir el texto).
 * - variant="panel": pie de la hoja "Más" en móvil (con texto).
 */
export function UserMenu({
  collapsed = false,
  variant = "sidebar",
}: {
  collapsed?: boolean;
  variant?: "sidebar" | "panel";
}) {
  const { data: session, isPending, error } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut().catch(() => undefined);
  };

  if (isPending) {
    return (
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full",
          collapsed && "animate-pulse",
        )}
        aria-label={dict.common.loading}
      >
        <span className="size-9 rounded-full bg-surface-2" />
      </span>
    );
  }

  const user = !error ? session?.user : null;

  if (user) {
    const name = user.name || user.email || "?";
    return (
      <div className={cn("flex min-w-0 flex-1 items-center gap-2.5", collapsed && "flex-col")}>
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent-text"
          title={name}
          aria-hidden="true"
        >
          {initialsOf(name)}
        </span>
        {!collapsed && (
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-fg">{name}</span>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-danger"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              {dict.auth.signOut}
            </button>
          </span>
        )}
        {collapsed && (
          <button
            type="button"
            onClick={handleSignOut}
            aria-label={dict.auth.signOut}
            title={dict.auth.signOut}
            className="inline-flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-danger"
          >
            <LogOut className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }

  // Invitado (o sesión no consultable): acceso directo a entrar / crear cuenta.
  const iconOnly = variant === "sidebar";
  return (
    <div className={cn("flex items-center gap-1", (iconOnly || collapsed) && "flex-col")}>
      <Link
        href="/entrar"
        aria-label={dict.nav.signIn}
        title={dict.nav.signIn}
        className="inline-flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-fg"
      >
        <LogIn className="size-5" aria-hidden="true" />
      </Link>
      {iconOnly || collapsed ? (
        <Link
          href="/registro"
          aria-label={dict.nav.signUp}
          title={dict.nav.signUp}
          className="inline-flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <UserPlus className="size-5" aria-hidden="true" />
        </Link>
      ) : (
        <Link
          href="/registro"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-accent px-3 text-xs font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
        >
          <UserPlus className="size-4" aria-hidden="true" />
          {dict.nav.signUp}
        </Link>
      )}
    </div>
  );
}
