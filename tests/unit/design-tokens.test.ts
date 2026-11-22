import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Verifica el contraste WCAG AA de las combinaciones de color realmente
 * usadas por la interfaz (skill de diseño: criterio de aceptación).
 * Lee los tokens directamente de apps/web/styles/globals.css: si cambia un
 * color, esta prueba vuelve a comprobarlo.
 */

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function luminance([r, g, b]: Rgb): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(fg: string, bg: string): number {
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function parseTokenBlocks(css: string, selector: string): Map<string, string> {
  // El selector puede aparecer en varios bloques (p. ej. ":root" dos veces:
  // paleta de identidad + tokens semánticos): se fusionan.
  const map = new Map<string, string>();
  let cursor = 0;
  while (cursor < css.length) {
    const start = css.indexOf(selector, cursor);
    if (start === -1) break;
    const end = css.indexOf("}", start);
    if (end === -1) break;
    const block = css.slice(start, end);
    for (const match of block.matchAll(/(--fc-[\w-]+):\s*(#[0-9a-fA-F]{6})/g)) {
      map.set(match[1]!, match[2]!);
    }
    cursor = end + 1;
  }
  return map;
}

const css = readFileSync(new URL("../../apps/web/styles/globals.css", import.meta.url), "utf8");
const light = parseTokenBlocks(css, ":root");
const dark = parseTokenBlocks(css, ".dark");

// Combinaciones usadas por la interfaz (texto → fondo).
const AA_NORMAL_TEXT = 4.5;
const AA_LARGE_TEXT = 3.0; // texto grande / iconos decorativos de ≥24px

const CASES: Array<{ theme: string; tokens: Map<string, string> }> = [
  { theme: "claro", tokens: light },
  { theme: "oscuro", tokens: dark },
];

describe.each(CASES)("tokens de diseño — tema $theme", ({ theme, tokens }) => {
  it("define todos los tokens semánticos", () => {
    for (const key of ["--fc-bg", "--fc-surface", "--fc-fg", "--fc-muted", "--fc-accent", "--fc-accent-fg", "--fc-accent-text"]) {
      expect(tokens.get(key), `falta ${key} en tema ${theme}`).toBeDefined();
    }
  });

  it("texto principal sobre fondo cumple AA", () => {
    expect(contrast(tokens.get("--fc-fg")!, tokens.get("--fc-bg")!)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("texto principal sobre superficie cumple AA", () => {
    expect(contrast(tokens.get("--fc-fg")!, tokens.get("--fc-surface")!)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("texto secundario (muted) sobre fondo cumple AA", () => {
    expect(contrast(tokens.get("--fc-muted")!, tokens.get("--fc-bg")!)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("texto secundario (muted) sobre superficie cumple AA", () => {
    expect(contrast(tokens.get("--fc-muted")!, tokens.get("--fc-surface")!)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("texto de acento sobre fondo cumple AA", () => {
    expect(contrast(tokens.get("--fc-accent-text")!, tokens.get("--fc-bg")!)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });

  it("texto sobre botón de acento cumple AA", () => {
    expect(contrast(tokens.get("--fc-accent-fg")!, tokens.get("--fc-accent")!)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });
});

describe("paleta de identidad verde profundo", () => {
  it("la escala 950–300 está definida y es monótona en luminosidad", () => {
    const scale = ["--fc-green-950", "--fc-green-900", "--fc-green-800", "--fc-green-700", "--fc-green-600", "--fc-green-500", "--fc-green-400", "--fc-green-300"];
    const values = scale.map((k) => light.get(k));
    for (const v of values) expect(v, "token de la escala verde ausente").toBeDefined();
    for (let i = 1; i < values.length; i++) {
      expect(luminance(hexToRgb(values[i]!))).toBeGreaterThan(luminance(hexToRgb(values[i - 1]!)));
    }
  });

  it("el acento sobre verde 950 (superficie de marca) tiene contraste suficiente para gráficos", () => {
    expect(contrast("#35b57a", "#07331f")).toBeGreaterThanOrEqual(AA_LARGE_TEXT);
  });
});
