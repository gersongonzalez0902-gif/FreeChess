"use client";

import { authClient } from "@/lib/auth-client";
import { dict } from "@/lib/i18n";

/** Saludo personalizado según sesión (cliente: sin acoplar al servidor). */
export function Greeting() {
  const { data: session, isPending } = authClient.useSession();
  const name = session?.user?.name;

  const greetingByHour = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "Buenas noches";
    if (hour < 13) return "Buenos días";
    if (hour < 21) return "Buenas tardes";
    return "Buenas noches";
  };

  if (isPending) {
    return (
      <div className="space-y-2" aria-label={dict.common.loading}>
        <div className="h-8 w-56 animate-pulse rounded-lg bg-surface-2" />
        <div className="h-5 w-72 animate-pulse rounded-lg bg-surface-2" />
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
        {name ? dict.dashboard.greetingUser.replace("{name}", name) : greetingByHour()}
      </h1>
      <p className="text-muted">{dict.dashboard.subtitle}</p>
    </div>
  );
}
