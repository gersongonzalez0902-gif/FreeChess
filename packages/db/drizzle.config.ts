import { defineConfig } from "drizzle-kit";

/**
 * Configuración de drizzle-kit para FreeChess.
 * - `generate` crea el SQL versionado en ./migrations (no necesita conexión).
 * - `migrate` aplica las migraciones pendientes (necesita DATABASE_URL).
 * Las migraciones NUNCA se ejecutan durante el build de Vercel (ADR-008):
 * las aplica el agente de desarrollo desde este paquete.
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://freechess:freechess@localhost:5432/freechess",
  },
  verbose: true,
  strict: true,
});
