import { jsonb, pgSchema, text, timestamp } from "drizzle-orm/pg-core";
import type { BoardSettings, SoundSettings } from "@freechess/shared";
import { user } from "./auth";

/**
 * Esquema `core` (Fase 1): perfil público y preferencias del jugador.
 * Las tablas de partidas, bots y rating se añaden con migraciones propias
 * en sus fases (Fase 2+), siguiendo "una migración por cambio".
 */
export const coreSchema = pgSchema("core");

/** Ratings estimados por módulo (bots, puzzles, aperturas…). Estimaciones
 * locales orientativas, nunca ratings oficiales (docs/PRODUCT.md). */
export type ModuleRatings = Record<string, number>;

export type GameTotals = {
  wins: number;
  losses: number;
  draws: number;
};

export const profiles = coreSchema.table("profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  /** URL de avatar (opcional; por defecto se generan iniciales). */
  avatar: text("avatar"),
  bio: text("bio"),
  ratings: jsonb("ratings")
    .$type<ModuleRatings>()
    .notNull()
    .default({}),
  bestRatings: jsonb("best_ratings")
    .$type<ModuleRatings>()
    .notNull()
    .default({}),
  totals: jsonb("totals")
    .$type<GameTotals>()
    .notNull()
    .default({ wins: 0, losses: 0, draws: 0 }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const userPreferences = coreSchema.table("user_preferences", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  /** light | dark | system (validado con zod en el borde de la API). */
  theme: text("theme").notNull().default("dark"),
  locale: text("locale").notNull().default("es"),
  pieceSet: text("piece_set").notNull().default("cburnett"),
  boardTheme: text("board_theme").notNull().default("green"),
  sounds: jsonb("sounds")
    .$type<SoundSettings>()
    .notNull()
    .default({ enabled: false, move: 0.7, capture: 0.8, end: 0.9, ui: 0.5 }),
  board: jsonb("board")
    .$type<BoardSettings>()
    .notNull()
    .default({ coordinates: true, animation: true, highlightLastMove: true }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});
