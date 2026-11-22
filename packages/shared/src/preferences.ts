import { z } from "zod";

/**
 * Preferencias del usuario de FreeChess.
 * Fuente única de verdad compartida entre cliente (IndexedDB), servidor
 * (PostgreSQL, tabla core.user_preferences) y validación de API.
 */

export const THEME_MODES = ["light", "dark", "system"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

/** Idiomas disponibles en la interfaz (Fase 1: solo español). */
export const LOCALES = ["es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Volumen por categoría de sonido (0–1). Los sonidos llegan en la Fase 2. */
export const soundSettingsSchema = z.object({
  enabled: z.boolean(),
  move: z.number().min(0).max(1),
  capture: z.number().min(0).max(1),
  end: z.number().min(0).max(1),
  ui: z.number().min(0).max(1),
});
export type SoundSettings = z.infer<typeof soundSettingsSchema>;

/** Ajustes del tablero (se aplican a partir de la Fase 2). */
export const boardSettingsSchema = z.object({
  coordinates: z.boolean(),
  animation: z.boolean(),
  highlightLastMove: z.boolean(),
});
export type BoardSettings = z.infer<typeof boardSettingsSchema>;

export const userPreferencesSchema = z.object({
  theme: z.enum(THEME_MODES),
  locale: z.enum(LOCALES),
  pieceSet: z.string().min(1).max(40),
  boardTheme: z.string().min(1).max(40),
  sounds: soundSettingsSchema,
  board: boardSettingsSchema,
});
export type UserPreferences = z.infer<typeof userPreferencesSchema>;

/**
 * Valores por defecto.
 * - Tema oscuro por defecto (identidad visual de FreeChess, skill de diseño).
 * - Sonidos apagados por defecto (skill de diseño: opcionales, off por defecto).
 */
export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "dark",
  locale: "es",
  pieceSet: "cburnett",
  boardTheme: "green",
  sounds: {
    enabled: false,
    move: 0.7,
    capture: 0.8,
    end: 0.9,
    ui: 0.5,
  },
  board: {
    coordinates: true,
    animation: true,
    highlightLastMove: true,
  },
};

/** Fusiona preferencias parciales/legacy con los valores por defecto actuales. */
export function mergePreferences(
  partial: Partial<Record<string, unknown>> | null | undefined,
): UserPreferences {
  const parsed = userPreferencesSchema.safeParse({
    ...DEFAULT_PREFERENCES,
    ...partial,
    sounds: { ...DEFAULT_PREFERENCES.sounds, ...(partial?.sounds ?? {}) },
    board: { ...DEFAULT_PREFERENCES.board, ...(partial?.board ?? {}) },
  });
  if (parsed.success) {
    return parsed.data;
  }
  return structuredClone(DEFAULT_PREFERENCES);
}
