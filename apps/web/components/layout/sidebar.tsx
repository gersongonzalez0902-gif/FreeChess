"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_ITEMS, isActivePath } from "@/components/nav-config";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { useLocalStorageValue } from "@/lib/use-local-storage";
import { dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Navegación lateral de escritorio, colapsable (skill de diseño).
 * El estado de colapso se recuerda en el dispositivo (almacén externo,
 * sin setState en efectos).
 */
const COLLAPSED_KEY = "freechess.sidebar-collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useLocalStorageValue<boolean>(COLLAPSED_KEY, {
    fallback: false,
    parse: (raw) => raw === "1",
    serialize: (value) => (value ? "1" : "0"),
  });

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 hidden h-dvh shrink-0 flex-col border-r border-border bg-surface",
        "transition-[width] duration-200 lg:flex",
      )}
      style={{ width: collapsed ? "4.75rem" : "16.5rem" }}
    >
      <div
        className={cn("flex h-16 items-center border-b border-border px-4", collapsed && "justify-center px-0")}
      >
        <Link href="/" aria-label={dict.common.appName} className="rounded-xl">
          <Logo collapsed={collapsed} />
        </Link>
      </div>

      <nav aria-label={dict.nav.mainNavigation} className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              title={collapsed ? item.label : undefined}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                collapsed && "justify-center px-0",
                active ? "bg-accent/15 text-accent-text" : "text-muted hover:bg-surface-2 hover:text-fg",
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={cn("flex items-center gap-1 border-t border-border p-3", collapsed && "flex-col")}>
        <UserMenu collapsed={collapsed} />
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? dict.nav.expandSidebar : dict.nav.collapseSidebar}
          title={collapsed ? dict.nav.expandSidebar : dict.nav.collapseSidebar}
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-xl text-muted transition-colors",
            "hover:bg-surface-2 hover:text-fg",
          )}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-5" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </aside>
  );
}
