"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, MOBILE_PRIMARY_IDS, isActivePath } from "@/components/nav-config";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Navegación inferior móvil (skill de diseño): máximo 5 destinos visibles.
 * "Más" abre el menú completo en una hoja inferior (sheet).
 */
export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const primary = MOBILE_PRIMARY_IDS.map(
    (id) => NAV_ITEMS.find((item) => item.id === id)!,
  ).filter(Boolean);
  const moreItems = NAV_ITEMS.filter((item) => !MOBILE_PRIMARY_IDS.includes(item.id));

  const closeMenu = () => setOpen(false);
  const moreActive = moreItems.some((item) => isActivePath(pathname, item.href));

  return (
    <>
      <nav
        aria-label={dict.nav.mainNavigation}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur",
          "lg:hidden",
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-5">
          {primary.map((item) => {
            const active = isActivePath(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-[11px] font-medium transition-colors",
                  active ? "text-accent-text" : "text-muted",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={dict.nav.openMenu}
            aria-expanded={open}
            aria-current={moreActive ? "page" : undefined}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-[11px] font-medium transition-colors",
              moreActive ? "text-accent-text" : "text-muted hover:text-fg",
            )}
          >
            <Menu className="size-5" aria-hidden="true" />
            <span>{dict.nav.more}</span>
          </button>
        </div>
      </nav>

      {/* Hoja con el menú completo (sheet). */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={dict.nav.more}>
          <button
            type="button"
            aria-label={dict.nav.closeMenu}
            onClick={closeMenu}
            className="absolute inset-0 cursor-default bg-black/60"
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-border bg-surface",
              "max-h-[85dvh] overflow-y-auto p-6 pb-10",
            )}
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 2.5rem)" }}
          >
            <div className="mb-5 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={closeMenu}
                aria-label={dict.nav.closeMenu}
                className="inline-flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="grid grid-cols-2 gap-2">
              {moreItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent/15 text-accent-text"
                          : "bg-surface-2/60 text-fg hover:bg-surface-2",
                      )}
                    >
                      <Icon className="size-5 shrink-0" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-2 border-t border-border pt-4">
              <UserMenu collapsed={false} variant="panel" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
