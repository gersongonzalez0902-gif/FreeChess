import { defineConfig } from "vitest/config";

/**
 * Pruebas unitarias del monorepo (Vitest). Las pruebas E2E (Playwright)
 * se configuran en la Fase 2 junto a las primeras pantallas de juego.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
