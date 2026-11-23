# LICENSES — Inventario de licencias de FreeChess

> Verificado el 2026-11-23 (Fase 0) consultando directamente los LICENSE y
> package.json de cada repositorio/paquete, la página oficial de
> database.lichess.org y el archivo COPYING.md de lila. **Nada de lo listado
> aquí está inventado.**
>
> Regla del proyecto: antes de incorporar cualquier recurso externo se añade
> aquí su licencia verificada. Si un recurso no tiene condiciones de uso
> verificables, NO se incorpora.

## 1. Licencia del proyecto

**FreeChess se distribuye bajo AGPL-3.0-or-later** (ver `LICENSE`).

Justificación: todas las dependencias núcleo son GPL-3.0+ (chessground,
chessops, stockfish) y GPLv3 permite combinarse con obras AGPLv3 (sección 13);
los assets AGPL de Lichess encajan de forma natural, y la licencia protege la
filosofía libre del proyecto permitiendo a la vez una distribución comercial
futura (con código fuente compartido, sin muros de pago).

## 2. Dependencias de código (npm)

| Paquete | Versión consultada | Licencia | Uso en FreeChess | Verificación |
|---|---|---|---|---|
| `chessground` | 9.2.1 | GPL-3.0-or-later | Tablero interactivo | LICENSE del repo lichess-org/chessground + npm |
| `chessops` | 0.15.1 | GPL-3.0-or-later | Reglas, FEN/PGN/SAN/UCI | README repo niklasf/chessops + npm |
| `pgn-viewer` | 1.0.53 | GPL-3.0-or-later | Visor PGN (evaluar en Fase 7) | npm |
| `stockfish` (nmrugg) | 19.0.1 | GPL-3.0 | Motor WASM en navegador | npm |
| `@lichess-org/stockfish-web` | v0.6.1 (nov 2026) | GPL-3.0 | Alternativa de motor (Fase 3) | Repo lichess-org/stockfish-web |
| `next` | 16.4.6 | MIT | Framework | npm |
| `react` / `react-dom` | 19.3.1 | MIT | UI | npm |
| `tailwindcss` / `@tailwindcss/postcss` | 4.3.5 | MIT | Estilos | npm |
| `drizzle-orm` | 0.45.4 | Apache-2.0 | ORM (esquemas y consultas) | npm |
| `drizzle-kit` | 0.31.11 | Apache-2.0 | Migraciones versionadas | npm (corregido en Fase 1: la versión 0.45.4 anotada en Fase 0 era de drizzle-orm) |
| `better-auth` | 1.7.27 | MIT | Autenticación | npm |
| `@neondatabase/serverless` | 1.2.1 | MIT | Driver HTTP de Neon PostgreSQL | npm |
| `zod` | 4.6.7 | MIT | Validación de datos (API y preferencias) | npm |
| `lucide-react` | 1.77.0 | ISC | Iconografía (único set de iconos) | npm |
| `zustand` | 5.x | MIT | Estado de partida (Fase 2) | npm |
| `recharts` | 2.x/3.x | MIT | Gráficas (Fase 8) | npm |
| `serwist` | 9.x | MIT | PWA / Service Worker | npm |
| `eslint` / `eslint-config-next` / `prettier` / `vitest` | 9.39.3 / 16.4.6 / 3.10.1 / 5.1.1 | MIT | Calidad y pruebas (desarrollo) | npm |

Descartadas con motivo: `chess.js` (BSD-2, solo pruebas de contraste),
`react-chessboard` (MIT, funcionalmente inferior), `lila-stockfish-web`
(AGPL-3.0+, orientada a lila), `stockfish.js`/`stockfish.wasm`/
`stockfish-nnue.wasm` (GPL-3.0, legadas).

## 3. Datos abiertos (CC0)

| Recurso | Contenido | Licencia | Verificación |
|---|---|---|---|
| Base de puzzles de Lichess | 6.193.530 puzzles clasificados por rating y temas | **CC0** ("Use them for research, commercial purpose, publication, anything you like") | https://database.lichess.org/ (texto literal) |
| Evaluaciones de Lichess | 417.862.375 posiciones evaluadas | CC0 | ídem |
| Partidas de Lichess | Bases PGN mensuales | CC0 | ídem |
| Aperturas ECO | TSV ECO A–E (lichess-org/chess-openings) | **CC0** | COPYING.txt del repositorio |

## 4. Assets de Lichess (lila, COPYING.md)

### 4.1 Sets de piezas UTILIZABLES (licencias libres)

| Set | Autor | Licencia |
|---|---|---|
| `cburnett` (set clásico) | Colin M. L. Burnett | GPLv2+ |
| `merida` | Armando Hernandez Marroquín | GPLv2+ |
| `mono` | Thibault Duplessis y Colin M. L. Burnett | GPLv2+ |
| `chessnut` | Alexis Luengas | Apache 2.0 |
| `letter` | usolando | AGPLv3+ |
| `pirouetti` | pirouetti | AGPLv3+ |
| `pixel` | therealqtpi | AGPLv3+ |
| `rhosgfx` | RhosGFX | CC0 1.0 |
| `fantasy`/`spatial`/`celtic` (fantasy, spatial, celtic) | Maurizio Monge | MIT |
| `staunton` (imágenes) | James Clarke | MIT |
| `kiwen-suwi` | neverRare | CC BY 4.0 |
| `Firi` | James Faure | CC BY 4.0 |
| `mpchess` | Maxime Chupin | GPLv3+ |
| `shapes` | flugsio | CC BY-SA 4.0 |

### 4.2 Tableros y sonidos

| Recurso | Autor | Licencia |
|---|---|---|
| Texturas de tablero (`public/images/board`) | autores de lila y pirouetti | AGPLv3+ |
| Sonidos `futuristic`, `nes`, `piano`, `sfx` | Enigmahack | AGPLv3+ |

### 4.3 PROHIBIDOS en FreeChess (verificado en COPYING.md)

| Recurso | Motivo |
|---|---|
| Sets NC: `horsey`, `california`, `caliente`, `maestro`, `fresca`, `cardinal`, `icpieces`, `gioco`, `tatiana`, `staunty`, `dubrovny`, `anarcandy`, `disguised`, `cooke`, `monarchy`, `xkcd`, `minimal-warmth`, `chessboart` | CC BY-NC-SA (uso NO comercial) |
| Sets freeware: `alpha`, `chess7`, `companion`, `leipzig`, `reillycraig`, `riohacha`, `shahi-ivory-brown`, `totoy`, `papercut` | "freeware"/restricciones no libres |
| Sonidos estándar de `public/sound` (no listados como excepción) | Sin licencia libre verificada |
| Sonido `lisp` | CC BY-NC-SA |
| Logo y favicon de lichess | Solo para referirse a lichess.org |
| Resto de artwork de `public/images` no listado | Sin licencia verificada |

## 5. Reglas de cumplimiento

1. **Atribución**: al incorporar assets se crea y mantiene
   `apps/web/public/ATTRIBUTIONS.md` con autor, origen y licencia de cada
   recurso, accesible desde la interfaz (Ajustes → Créditos y licencias).
2. **Copyleft**: al usar chessground/chessops/stockfish (GPL-3.0+) y assets
   AGPL, FreeChess se distribuye como AGPL-3.0+ con código fuente público.
   El repositorio público es parte del cumplimiento de la licencia.
3. **NC = no**: ningún recurso NonCommercial entra al proyecto, aunque sea
   "solo un set bonito".
4. **Sin verificación, sin incorporación**: toda nueva dependencia o asset
   pasa primero por este documento.
5. **Actualización**: se re-verifica este inventario al añadir cualquier
   recurso nuevo y al comienzo de cada fase que incorpore material externo
   (Fase 1: lucide-react/Inter/zod/driver Neon; Fase 2: piezas/sonidos;
   Fase 4: puzzles; Fase 7: aperturas/cursos).

## 6. Tipografías (Fase 1)

| Recurso | Uso | Licencia | Verificación |
|---|---|---|---|
| [Inter](https://rsms.me/inter/) | Tipografía de la interfaz, autoalojada por `next/font` (sin llamadas a Google en producción) | SIL Open Font License 1.1 | fonts.google.com/specimen/Inter + rsms.me/inter |

Atribuciones visibles en `apps/web/public/ATTRIBUTIONS.md` (Ajustes →
Créditos y licencias).
