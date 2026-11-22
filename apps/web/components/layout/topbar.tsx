"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { dict } from "@/lib/i18n";

/** Cabecera móvil: marca, tema y acceso al perfil. */
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur lg:hidden">
      <Link href="/" aria-label={dict.common.appName}>
        <Logo />
      </Link>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <Link
          href="/perfil"
          aria-label={dict.nav.profile}
          title={dict.nav.profile}
          className="inline-flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <UserRound className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
