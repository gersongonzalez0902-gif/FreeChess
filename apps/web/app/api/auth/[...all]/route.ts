import { auth } from "@/lib/auth";

/**
 * Ruta catch-all de Better Auth: registro, inicio de sesión, cierre,
 * sesión actual… El adaptador Drizzle habla con Neon (DATABASE_URL).
 * Si la base de datos aún no tiene las tablas (migración pendiente),
 * las llamadas devuelven un error que la interfaz muestra de forma clara.
 */
const handler = auth.handler;

export { handler as GET, handler as POST };
