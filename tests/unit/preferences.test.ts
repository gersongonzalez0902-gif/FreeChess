import { describe, expect, it } from "vitest";
import {
  DEFAULT_PREFERENCES,
  mergePreferences,
  userPreferencesSchema,
} from "@freechess/shared";

describe("preferencias del usuario (@freechess/shared)", () => {
  it("los valores por defecto cumplen el esquema", () => {
    expect(userPreferencesSchema.safeParse(DEFAULT_PREFERENCES).success).toBe(true);
  });

  it("el tema por defecto es oscuro y los sonidos están apagados (skill de diseño)", () => {
    expect(DEFAULT_PREFERENCES.theme).toBe("dark");
    expect(DEFAULT_PREFERENCES.sounds.enabled).toBe(false);
  });

  it("mergePreferences completa campos que faltan", () => {
    const merged = mergePreferences({ theme: "light" });
    expect(merged.theme).toBe("light");
    expect(merged.locale).toBe("es");
    expect(merged.sounds.enabled).toBe(false);
    expect(merged.board.coordinates).toBe(true);
  });

  it("mergePreferences degrada a valores por defecto con datos inválidos", () => {
    const merged = mergePreferences({ theme: "naranja", sounds: { enabled: "sí" } });
    expect(merged).toEqual(DEFAULT_PREFERENCES);
  });

  it("mergePreferences acepta un objeto válido sin tocarlo", () => {
    const merged = mergePreferences(DEFAULT_PREFERENCES);
    expect(merged).toEqual(DEFAULT_PREFERENCES);
  });
});
