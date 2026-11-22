"use client";

import Link from "next/link";
import { BarChart3, LogOut, Swords, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardRow, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { dict, formatDateEs } from "@/lib/i18n";
import { initialsOf } from "@/lib/utils";

/**
 * Perfil: muestra la cuenta real si hay sesión y un perfil de invitado
 * honesto si no. Las secciones futuras (estadísticas, partidas) usan
 * estados vacíos que explican su llegada (Fases 2–8), nunca datos falsos.
 */
export function ProfileView() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="space-y-4" aria-label={dict.common.loading}>
        <div className="h-28 animate-pulse rounded-2xl bg-surface-2" />
        <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="size-5 text-accent-text" aria-hidden="true" />
              {dict.profile.guestTitle}
            </CardTitle>
            <CardDescription>{dict.profile.guestBody}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/registro" className={buttonStyles({ size: "md" })}>
              {dict.profile.createAccount}
            </Link>
            <Link href="/entrar" className={buttonStyles({ variant: "outline", size: "md" })}>
              {dict.nav.signIn}
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{dict.profile.statsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<BarChart3 aria-hidden="true" />}
              title={dict.emptyState.inConstruction}
              description={dict.profile.statsEmpty}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  const { user } = session;
  const name = user.name || user.email || "?";

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-full bg-accent/20 text-xl font-bold text-accent-text">
              {initialsOf(name)}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold text-fg">{name}</h2>
              <p className="text-sm text-muted">{user.email}</p>
              {user.createdAt && (
                <p className="mt-0.5 text-xs text-muted">
                  {dict.profile.memberSince.replace(
                    "{date}",
                    formatDateEs(new Date(user.createdAt)),
                  )}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => authClient.signOut().catch(() => undefined)}
              className={buttonStyles({ variant: "outline", size: "sm", className: "ml-auto" })}
            >
              <LogOut className="size-4" aria-hidden="true" />
              {dict.auth.signOut}
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dict.profile.statsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<BarChart3 aria-hidden="true" />}
              title={dict.emptyState.inConstruction}
              description={dict.profile.statsEmpty}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{dict.profile.gamesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Swords aria-hidden="true" />}
              title={dict.emptyState.inConstruction}
              description={dict.profile.gamesEmpty}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{dict.profile.deleteTitle}</CardTitle>
          <CardDescription>{dict.profile.deleteBody}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardRow label={dict.profile.deleteTitle}>
            <span className="text-xs text-muted">{dict.profile.deleteNote}</span>
          </CardRow>
        </CardContent>
      </Card>
    </div>
  );
}
