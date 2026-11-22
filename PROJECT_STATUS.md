# PROJECT_STATUS — Estado del desarrollo

> Archivo de continuidad del proyecto. Se actualiza en cada sesión de trabajo.
> Objetivo: que cualquier agente o persona pueda retomar el desarrollo sin
> perder contexto. Fuente de verdad del producto: `docs/PRODUCT.md` y el
> prompt maestro custodiado por el propietario.

## Fase actual

**FASE 1 — Identidad y fundación** (a punto de comenzar). La Fase 0 está
completada y verificada.

## Avance

| Fase | Estado | Entregable |
|---|---|---|
| 0 — Preparación | **COMPLETADA** | Proyecto preparado para el desarrollo |
| 1 — Identidad y fundación | Pendiente de iniciar | Aplicación visual y funcional |
| 2 — Experiencia de juego | No iniciada | Sistema de juego funcional |
| 3 — Analizador | No iniciada | Analizador profesional operativo |
| 4 — Entrenamiento táctico | No iniciada | Sistema de entrenamiento completo |
| 5 — Entrenadores avanzados | No iniciada | Suite de entrenamiento avanzada |
| 6 — Inteligencia y personalización | No iniciada | Experiencia personalizada |
| 7 — Aprendizaje y herramientas | No iniciada | Ecosistema educativo |
| 8 — Estadísticas y pulido | No iniciada | Primera publicación |

## Funciones terminadas (verificadas)

- Entorno de desarrollo preparado (Node 24, npm 11, git, pnpm).
- Repositorio de GitHub público `gersongonzalez0902-gif/freechess` con toda
  la estructura y documentación de la Fase 0.
- Cuentas conectadas: Vercel (repo conectado, plan Hobby) y Neon (base de
  datos creada e integrada con Vercel).
- 7 skills externas instaladas y verificadas + 3 skills propias creadas
  (`.agents/skills/`) — ver `docs/INSTALLED_SKILLS.md`.
- Inventario de licencias verificado de dependencias, datos CC0 y assets de
  Lichess (incluye listas de prohibidos NC/freeware) — ver `docs/LICENSES.md`.
- Decisiones de arquitectura documentadas (ADR-001…008) — ver
  `docs/ARCHITECTURE.md`.
- Diseño completo de base de datos (7 esquemas, todas las tablas) — ver
  `docs/DATABASE.md`.

## Funciones pendientes (siguiente: Fase 1)

- Scaffold de `apps/web` (Next.js 16 + TS + Tailwind 4).
- Sistema visual, modo claro/oscuro, navegación, dashboard.
- Better Auth + Neon + Drizzle + primera migración.
- Modo invitado con IndexedDB.

## Problemas conocidos

1. **Plugin de Vercel sin acceso**: la API del plugin Vercel no devuelve
   equipos/proyectos (cuenta personal Hobby). No bloquea nada: mientras el
   repo siga conectado desde la web de Vercel, cada push despliega
   automáticamente. Si en el futuro hace falta gestionar Vercel por API
   (variables de entorno, por ejemplo), se pedirá al usuario reconectar el
   plugin o se guiará desde la interfaz web.
2. El despliegue de Vercel del commit de Fase 0 puede mostrar un aviso de
   "no se detectó framework": es normal, porque la app Next.js se crea en
   la Fase 1.

## Decisiones técnicas (resumen; detalle en docs/ARCHITECTURE.md)

- Monorepo pnpm: `apps/web` + 6 paquetes internos.
- chessground + chessops (GPL-3.0+) para tablero y reglas.
- Motor: paquete npm `stockfish` (nmrugg) en Web Worker; evaluar
  `@lichess-org/stockfish-web` en Fase 3 para reducir peso.
- Autenticación: Better Auth (MIT) con modo invitado opcional.
- Licencia del proyecto: AGPL-3.0-or-later.
- Puzzles: base CC0 de Lichess, importación por lotes reanudable,
  selección inicial de 200k–500k antes de escalar.
- Prohibido por diseño: multijugador online, matchmaking, WebSockets,
  Redis, microservicios, y toda simulación de Stockfish o del analizador.

## Últimas modificaciones

- **2026-11-23 — Fase 0 completada**: investigación de licencias y
  referencias, skills instaladas/creadas, estructura y documentación
  completa del repositorio, primer push a GitHub (rama `main`).

## Próximos pasos

1. Iniciar Fase 1: scaffold de `apps/web` con Next.js 16.
2. Sistema visual (tokens, tema claro/oscuro) y navegación.
3. Conexión Drizzle + Neon y primera migración (esquemas `auth` y `core`).
4. Better Auth con modo invitado.
5. Primer despliegue verificable en Vercel.
