import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Cliente Drizzle sobre el driver HTTP de Neon (serverless, ideal para
 * Vercel Functions). La conexión se crea de forma perezosa: construir el
 * cliente no abre conexiones, así que importar este módulo durante el
 * build es seguro.
 */
let _db: NeonHttpDatabase<typeof schema> | undefined;

export type Db = NeonHttpDatabase<typeof schema>;

export function getDb(): Db {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "Falta la variable de entorno DATABASE_URL (conexión a Neon PostgreSQL). " +
          "En Vercel la inyecta la integración de Neon; en local, copia .env.example a apps/web/.env.",
      );
    }
    _db = drizzle(neon(url), { schema });
  }
  return _db;
}
