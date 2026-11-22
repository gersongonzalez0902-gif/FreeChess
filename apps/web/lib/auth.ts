import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@freechess/db";
import * as schema from "@freechess/db/schema";

/**
 * Better Auth (ADR-003): email + contraseña con hash Argon2id y sesiones
 * de base de datos. El registro NO es obligatorio (ADR-007): la app
 * funciona como invitado; la cuenta solo sincroniza el progreso.
 */

const secret = process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET;
if (!secret && process.env.NODE_ENV === "production") {
  // En producción exigimos secreto real: sin él las sesiones no son seguras.
  console.warn(
    "[freechess] BETTER_AUTH_SECRET no está definida. Configúrala en las variables de entorno de Vercel.",
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema: schema as Record<string, unknown>,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 días
    updateAge: 60 * 60 * 24, // refrescar la sesión cada 24 h
  },
  // En Vercel la URL base se infiere de la petición; en local, del .env.
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.PUBLIC_APP_URL,
  // Secreto para firmar tokens internos. En desarrollo local, sin él,
  // se genera uno efímero (aviso arriba). Producción debe definirlo.
  secret: secret ?? crypto.randomUUID(),
});

export type Session = typeof auth.$Infer.Session;
