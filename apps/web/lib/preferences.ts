"use client";

import { userPreferencesSchema, type UserPreferences } from "@freechess/shared";
import { authClient } from "@lib/auth-client";
import {
  clearOutbox,
  enqueueOutbox,
  getLocalPreferences,
  putLocalPreferences,
} from "@lib/local-db";

/**
 * Gestión de preferencias en el cliente (ADR-007).
 * - Invitado: se guardan en IndexedDB y se encolan en el outbox.
 * - Con sesión: se guardan en la nube (API /api/preferences) y se
 *   replican en local para lectura rápida y modo offline.
 * - Al iniciar sesión: se envían las preferencias pendientes del outbox
 *   (upsert idempotente en el servidor; el último estado manda).
 */

/** Carga las preferencias locales (validadas); null si no hay o son inválidas. */
export async function loadPreferences(): Promise<UserPreferences | null> {
  const raw = await getLocalPreferences();
  if (!raw) return null;
  const parsed = userPreferencesSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export async function savePreferences(prefs: UserPreferences): Promise<void> {
  // 1) Siempre en local (funciona offline y como invitado).
  await putLocalPreferences(prefs);
  // 2) Si hay sesión, a la nube; si no, a la cola para cuando la haya.
  const session = await authClient
    .getSession({ query: { disableCookieCache: true } })
    .then((r) => r.data)
    .catch(() => null);
  if (session) {
    await fetch("/api/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prefs),
    }).catch(() => {
      // Red caída: la copia local queda como fuente.
    });
  } else {
    await enqueueOutbox({ type: "preferences", payload: prefs });
  }
}

/**
 * Tras iniciar sesión o registrarse: envía las preferencias locales
 * pendientes (outbox) al servidor y limpia la cola.
 */
export async function flushOutboxOnLogin(): Promise<void> {
  const local = await getLocalPreferences();
  if (!local) return;
  try {
    const res = await fetch("/api/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(local),
    });
    if (res.ok) {
      await clearOutbox();
    }
  } catch {
    // Se reintentará en el próximo inicio de sesión.
  }
}
