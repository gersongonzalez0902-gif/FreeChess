/** Utilidades generales de la aplicación. */

/** Une clases condicionales (sin dependencias externas). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Iniciales de un nombre para el avatar generado (máx. 2 letras). */
export function initialsOf(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase());
  return parts.join("") || "?";
}

/** Espera un tiempo en milisegundos (para pruebas y reintentos). */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
