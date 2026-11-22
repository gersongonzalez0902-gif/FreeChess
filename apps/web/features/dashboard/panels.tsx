"use client";

import Link from "next/link";
import { CalendarClock, Check, Cloud, History, Rocket } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { buttonStyles } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { dict } from "@/lib/i18n";

/** Plan de entrenamiento de hoy (Supercoach llega en Fase 6: estado vacío honesto). */
export function PlanPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="size-5 text-accent-text" aria-hidden="true" />
          {dict.dashboard.planTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EmptyState
          icon={<Rocket aria-hidden="true" />}
          title={dict.emptyState.inConstruction}
          description={dict.dashboard.planEmpty}
          action={{ label: dict.nav.play, href: "/jugar" }}
        />
      </CardContent>
    </Card>
  );
}

/** Actividad reciente: aparecerá con las fases de juego y entrenamiento. */
export function ActivityPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="size-5 text-accent-text" aria-hidden="true" />
          {dict.dashboard.activityTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EmptyState
          icon={<History aria-hidden="true" />}
          title={dict.emptyState.thisArrives}
          description={dict.dashboard.activityEmpty}
        />
      </CardContent>
    </Card>
  );
}

/** Tarjeta para invitados: explica el valor de crear cuenta, sin presión. */
export function GuestCard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || session?.user) {
    return null; // Con sesión activa no se muestra.
  }

  return (
    <Card className="border-accent/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="size-5 text-accent-text" aria-hidden="true" />
          {dict.dashboard.guestTitle}
        </CardTitle>
        <CardDescription>{dict.dashboard.guestBody}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Link href="/registro" className={buttonStyles({ size: "md" })}>
          {dict.nav.signUp}
        </Link>
        <Link href="/entrar" className={buttonStyles({ variant: "outline", size: "md" })}>
          {dict.nav.signIn}
        </Link>
      </CardContent>
    </Card>
  );
}

/** Estado real de la plataforma: qué hay hoy y qué llega (transparencia). */
export function PlatformStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.dashboard.platformTitle}</CardTitle>
        <CardDescription>{dict.dashboard.platformIntro}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-text">
            {dict.dashboard.platformNow}
          </h3>
          <ul className="space-y-2">
            {dict.dashboard.platformNowItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            {dict.dashboard.platformNext}
          </h3>
          <ul className="space-y-2">
            {dict.dashboard.platformNextItems.map((item) => (
              <li key={item.phase} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-0.5 shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-fg">
                  F{item.phase}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
