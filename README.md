# FreeChess

**Todo el ajedrez. Una sola plataforma. Gratis para todos.**

FreeChess es una plataforma integral de ajedrez y entrenamiento personalizado:
juega contra bots con personalidades, juega con otra persona en el mismo
dispositivo, analiza cualquier partida con un motor real (Stockfish en tu
propio navegador), entrena táctica con millones de puzzles, estudia
aperturas, corrige tus errores y sigue un plan diario que se adapta a ti.

Sin planes premium. Sin funciones bloqueadas. Sin publicidad intrusiva.

> *El ajedrez es para todos. El conocimiento no debería tener una barrera de pago.*

## Estado del proyecto

Fase 0 (preparación) completada. **Fase 1 (identidad y fundación) con el
código completo y verificado localmente; queda aplicar la migración en Neon y
configurar el despliegue en Vercel** — el estado exacto está siempre en
[PROJECT_STATUS.md](PROJECT_STATUS.md) y la ruta completa en
[docs/ROADMAP.md](docs/ROADMAP.md).

## Stack tecnológico

- **Next.js 16 + React 19 + TypeScript** (App Router, modo estricto)
- **Tailwind CSS 4** con sistema de diseño propio (verde profundo, modo claro/oscuro)
- **Neon PostgreSQL** + **Drizzle ORM** (migraciones versionadas)
- **Better Auth** (registro opcional; hay modo invitado)
- **chessground + chessops** (tablero y reglas, de Lichess)
- **Stockfish WebAssembly** en Web Worker (el motor corre en tu navegador)
- **PWA** con modo offline real (IndexedDB)
- Despliegue en **Vercel** desde este repositorio

Todo el análisis de decisiones está en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Estructura del repositorio

```text
apps/web          Aplicación Next.js (implementada en la Fase 1)
packages/         shared y db (Fase 1); chess-core, chess-board, engine, ui (Fase 2+)
scripts/          import-puzzles, import-openings, seed, maintenance
docs/             Documentación completa del proyecto
.agents/skills/   Skills propias de FreeChess para el agente de desarrollo
tests/            Pruebas unitarias (Vitest) y E2E (Playwright, Fase 2+)
```

## Documentación

| Documento | Contenido |
|---|---|
| [docs/PRODUCT.md](docs/PRODUCT.md) | Identidad, alcance, referencias y diferenciación |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, estructura y decisiones (ADR) |
| [docs/DATABASE.md](docs/DATABASE.md) | Diseño de datos completo |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Fases de desarrollo y criterios de terminado |
| [docs/LICENSES.md](docs/LICENSES.md) | Inventario verificado de licencias |
| [docs/SECURITY.md](docs/SECURITY.md) | Seguridad y privacidad |
| [docs/INSTALLED_SKILLS.md](docs/INSTALLED_SKILLS.md) | Skills del agente de desarrollo |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Estado actual del desarrollo |

## Desarrollo

Requisitos: Node.js 24+, pnpm 12+, una base de datos Neon PostgreSQL.

```bash
pnpm install                        # dependencias (workspaces)
cp .env.example apps/web/.env       # configurar variables
pnpm dev                            # servidor de desarrollo
pnpm test                           # pruebas unitarias
pnpm db:migrate                     # aplicar migraciones (requiere DATABASE_URL)
```

El proyecto lo desarrolla y mantiene un agente de IA siguiendo las skills
del repositorio (`.agents/skills/`) y la documentación de `docs/`.

## Licencia y créditos

- Código del proyecto: **AGPL-3.0-or-later** ([LICENSE](LICENSE)).
- Tablero y lógica: [chessground](https://github.com/lichess-org/chessground)
  y [chessops](https://github.com/niklasf/chessops) (GPL-3.0+, Lichess).
- Motor: [Stockfish](https://stockfishchess.org/) (GPL-3.0) vía WASM.
- Puzzles y aperturas: bases abiertas de [database.lichess.org](https://database.lichess.org/) (CC0).
- Assets: sets de piezas y sonidos con licencia libre (detalle completo en
  [docs/LICENSES.md](docs/LICENSES.md)).

FreeChess no está afiliado a Lichess ni a Chess.com. Agradecemos al
ecosistema del software libre de ajedrez que hace posible este proyecto.
