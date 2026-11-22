"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { ThemeMode } from "@freechess/shared";
import { useLocalStorageValue } from "@/lib/use-local-storage";

/**
 * Proveedor de tema (claro / oscuro / sistema).
 * - El valor vive en localStorage (almacén externo, sin setState en efectos).
 *   El script inline de app/layout.tsx aplica el tema ANTES de hidratar
 *   (misma clave: "freechess.theme") para evitar destellos.
 * - En preferencias de la cuenta, el tema se guarda además como preferencia
 *   sincronizada; en el dispositivo manda la local (skill de datos: en
 *   preferencias gana el cliente).
 */

const STORAGE_KEY = "freechess.theme";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useLocalStorageValue<ThemeMode>(STORAGE_KEY, {
    fallback: "dark",
    parse: (raw) => (raw === "light" || raw === "system" ? raw : "dark"),
    serialize: (value) => value,
  });

  // Sincronizar el DOM (sistema externo) con el tema actual.
  useEffect(() => {
    const apply = () => {
      const isDark =
        mode === "dark" ||
        (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    };
    apply();
    if (mode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [mode]);

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider.");
  }
  return ctx;
}
