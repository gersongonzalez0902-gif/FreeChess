import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getDb, userPreferences } from "@freechess/db";
import {
  DEFAULT_PREFERENCES,
  mergePreferences,
  userPreferencesSchema,
  type UserPreferences,
} from "@freechess/shared";

/**
 * API de preferencias del usuario autenticado.
 * - GET: devuelve las preferencias (creándolas con valores por defecto la
 *   primera vez: creación perezosa, sin ganchos frágiles en el registro).
 * - PUT: valida con zod y hace upsert (idempotente; el último estado manda,
 *   regla de la skill de datos).
 * Sin sesión → 401. Base de datos sin migrar → 503 con mensaje claro.
 */

async function requireUserId(): Promise<string | null> {
  const session = await auth.api
    .getSession({ headers: await headers() })
    .catch(() => null);
  return session?.user?.id ?? null;
}

function rowToPreferences(row: typeof userPreferences.$inferSelect): UserPreferences {
  return mergePreferences({
    theme: row.theme,
    locale: row.locale,
    pieceSet: row.pieceSet,
    boardTheme: row.boardTheme,
    sounds: row.sounds,
    board: row.board,
  });
}

export async function GET() {
  const userId = await requireUserId();
  if (!userId) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const db = getDb();
    let [row] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));
    if (!row) {
      await db
        .insert(userPreferences)
        .values({ userId })
        .onConflictDoNothing();
      [row] = await db
        .select()
        .from(userPreferences)
        .where(eq(userPreferences.userId, userId));
    }
    const preferences = row ? rowToPreferences(row) : DEFAULT_PREFERENCES;
    return Response.json({ preferences });
  } catch {
    return Response.json({ error: "db-unavailable" }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const userId = await requireUserId();
  if (!userId) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid-json" }, { status: 400 });
  }

  const parsed = userPreferencesSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid-preferences" }, { status: 400 });
  }

  const prefs = parsed.data;
  try {
    const db = getDb();
    await db
      .insert(userPreferences)
      .values({
        userId,
        theme: prefs.theme,
        locale: prefs.locale,
        pieceSet: prefs.pieceSet,
        boardTheme: prefs.boardTheme,
        sounds: prefs.sounds,
        board: prefs.board,
      })
      .onConflictDoUpdate({
        target: userPreferences.userId,
        set: {
          theme: prefs.theme,
          locale: prefs.locale,
          pieceSet: prefs.pieceSet,
          boardTheme: prefs.boardTheme,
          sounds: prefs.sounds,
          board: prefs.board,
          updatedAt: new Date(),
        },
      });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "db-unavailable" }, { status: 503 });
  }
}
