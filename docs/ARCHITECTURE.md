# ARCHITECTURE — FreeChess

> Decisiones técnicas del proyecto, tomadas y documentadas en la Fase 0.
> Cualquier cambio futuro debe actualizarse aquí (registro de decisiones al final).

## 1. Visión general

FreeChess es una **aplicación web progresiva (PWA)** monolítica y modular de
ajedrez: jugar contra bots, jugar en persona en el mismo dispositivo, análisis
con motor real, entrenamiento personalizado y aprendizaje, todo gratis.

- **No hay** multijugador online, matchmaking, WebSockets, Redis ni
  microservicios. Un backend Next.js bien organizado es suficiente.
- El cómputo pesado de ajedrez (motor) ocurre **en el navegador** del usuario,
  no en el servidor. El servidor se ocupa de cuentas, sincronización de
  progreso, datos de entrenamiento (puzzles, aperturas, cursos) e informes.

## 2. Stack elegido (Fase 0)

| Capa | Tecnología | Licencia | Decisión |
|---|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 | MIT | RSC + rutas de API + despliegue óptimo en Vercel |
| Lenguaje | TypeScript (modo estricto) | Apache-2.0 | Base compartida cliente/servidor |
| Estilos | Tailwind CSS 4 + tokens CSS propios | MIT | Rapidez + sistema de diseño propio |
| Base de datos | Neon PostgreSQL (serverless) | — | Gratuita, escalable, Postgres real |
| ORM | Drizzle ORM + drizzle-kit | Apache-2.0 | Tipado end-to-end, migraciones versionadas |
| Autenticación | Better Auth | MIT | Ver comparativa §5 |
| Tablero | chessground (lichess) | GPL-3.0+ | Ver comparativa §4 |
| Reglas ajedrez | chessops | GPL-3.0+ | Ver comparativa §4 |
| Motor | stockfish (npm, nmrugg) en Web Worker | GPL-3.0 | Ver comparativa §6 |
| Estado cliente | zustand | MIT | Ligero, ideal para estado de partida |
| Gráficas | Recharts | MIT | Fase 8 (estadísticas) |
| PWA / Service Worker | Serwist | MIT | Sucesor de next-pwa, mantenido |
| Pruebas | Vitest + Testing Library + Playwright | MIT | Unidad + componentes + E2E |
| Calidad | ESLint + Prettier + `tsc --noEmit` | MIT | CI en cada push |
| Paquetes | pnpm workspaces (monorepo) | MIT | Código compartido sin publicar en npm |

## 3. Estructura del repositorio

```text
freechess/
├── apps/
│   └── web/                  # Aplicación Next.js (Fase 1)
├── packages/
│   ├── chess-core/           # Envoltorios de chessops: FEN/PGN/SAN/UCI, validación
│   ├── chess-board/          # Componente de tablero React sobre chessground + temas
│   ├── engine/               # Gestor de Stockfish en Web Worker (niveles, personalidades)
│   ├── db/                   # Esquemas Drizzle, cliente Neon, migraciones
│   ├── shared/               # Tipos, constantes y utilidades comunes
│   └── ui/                   # Sistema de diseño (botones, diálogos, barras de eval…)
├── scripts/
│   ├── import-puzzles/       # Importador por lotes de la base CC0 de Lichess
│   ├── import-openings/      # Importador de aperturas ECO (CC0)
│   ├── seed/                 # Datos semilla (bots, cursos, finales)
│   └── maintenance/          # Mantenimiento de base de datos
├── docs/                     # Documentación del proyecto
├── .agents/skills/           # Skills propias de FreeChess (formato Agent Skills)
├── .claude/skills/           # Skills externas instaladas (ver docs/INSTALLED_SKILLS.md)
├── tests/                    # Pruebas de integración/E2E
├── .env.example
├── LICENSE                   # AGPL-3.0-or-later
└── PROJECT_STATUS.md         # Estado del desarrollo (siempre actualizado)
```

Regla: **no crear paquetes sin necesidad**; cada carpeta de `packages/` existe
porque al menos una fase lo requiere (ver ROADMAP). Los paquetes no se publican
en npm: se consumen internamente vía workspaces.

## 4. Tablero y reglas: comparativa evaluada

| Opción | Licencia | Evaluación |
|---|---|---|
| **chessground** (elegida) | GPL-3.0+ | Render perfecto (clic, drag & drop, táctil, flechas, círculos, animaciones, promoción), es el tablero de lichess.org. Sin React oficial: creamos el envoltorio propio en `packages/chess-board`. |
| react-chessboard | MIT | Más cómoda en React, pero funcionalmente muy inferior (sin flechas/círculos dibujables, animaciones más pobres). Descartada. |
| Tablero propio en SVG | — | Reinventar lo que chessground ya resuelve; prohibido por el prompt maestro. Descartada. |

| Lógica | Licencia | Evaluación |
|---|---|---|
| **chessops** (elegida) | GPL-3.0+ | FEN/PGN/SAN/UCI, movimientos legales, reglas completas, variants, inmutable y rápida. Es la biblioteca que usa chessground en lila. |
| chess.js | BSD-2 | Válida pero más lenta y con menos soporte de formatos avanzados; se usa SOLO como contraste en pruebas. |

## 5. Autenticación: comparativa evaluada

| Criterio | Auth.js (NextAuth v5) | **Better Auth (elegida)** |
|---|---|---|
| Estado | v5 en beta prolongada | Estable (v1.x), desarrollo muy activo |
| Integración Drizzle | Adaptadores, más fricción | Cliente Drizzle de primera clase |
| Modelo de datos | Propietario | Tablas claras, sin magia, fáciles de consultar |
| Contraseñas | Proveedor credentials limitado | Argon2id integrado + email de verificación |
| OAuth social | Sí | Sí (GitHub, Google, etc. como proveedores opcionales futuros) |
| Extensibilidad | Middleware | Plugins oficiales (2FA, organizaciones…) |
| Licencia | ISC | MIT |

**Decisión**: Better Auth con email+contraseña (Argon2id) y sesiones de base de
datos. El registro NO es obligatorio para usar la app (modo invitado con
IndexedDB); registrarse sirve para sincronizar el progreso.

## 6. Motor: comparativa evaluada

| Opción | Licencia | Evaluación |
|---|---|---|
| **`stockfish` (nmrugg, npm v19.x)** — elegida | GPL-3.0 | Builds WASM de Stockfish 17/19 listos para navegador, Web Worker, API simple, mantenimiento activo. Punto de partida oficial del proyecto. |
| `@lichess-org/stockfish-web` (v0.6.1, SF19) | GPL-3.0 | Builds optimizados de lichess (`sf_19_smallnet` reduce mucho la descarga del NNUE). Más complejo de cargar. **Plan**: evaluarlo en la Fase 3 para reducir el peso de descarga del analizador. |
| `lila-stockfish-web` | AGPL-3.0+ | Orientado a integraciones lila. Descartada. |
| `stockfish.js` / `stockfish.wasm` / `stockfish-nnue.wasm` | GPL-3.0 | Antiguos, mantenidos solo por compatibilidad. Descartados. |

Arquitectura del motor (detallada en la skill `freechess-chess-engineering`):

- Web Worker dedicado + protocolo UCI tipado en `packages/engine`.
- Niveles de fuerza por `Skill Level` / `UCI_LimitStrength` / `UCI_Elo` reales.
- Capa de **personalidades** que pondera candidatos MultiPV (agresivo,
  defensivo, táctico, posicional, equilibrado, aventurero, principiante,
  preciso) validando SIEMPRE la legalidad con chessops.
- Descarga perezosa del binario con estados de carga y reintento.

## 7. Modelo de aplicación (Next.js)

- **App Router**, componentes de servidor por defecto; componentes cliente
  solo donde hay interactividad (tablero, motor, entrenadores).
- Datos del servidor: Server Components + Server Actions; rutas REST mínimas
  para exportaciones (PGN, informes).
- Autenticación en middleware de rutas protegidas (perfil, sincronización).
- Internacionalización: textos centralizados desde el inicio (diccionario
  `es`), arquitectura lista para añadir idiomas (en la Fase 8 se decide si se
  activa enrutamiento por locale).
- PWA con Serwist: precarga de la shell + assets del tablero; IndexedDB para
  partidas, progreso y puzzles descargados; cola de sincronización (outbox).
- Rendimiento: presupuestos por ruta (LCP < 2,5 s en móvil 4G), imágenes
  optimizadas, sin fuentes bloqueantes, tablero con tamaño fluido.

## 8. Entornos y despliegue (Vercel)

| Rama | Entorno | Uso |
|---|---|---|
| `main` | Producción | Dominio principal |
| `feat/*`, `fix/*` | Preview | URL temporal por PR para verificar |

- Despliegue automático desde GitHub (ya conectado).
- Variables de entorno: `DATABASE_URL` (Neon, solo servidor),
  `AUTH_SECRET` (Better Auth), `PUBLIC_APP_URL`.
- Neon ya conectado a Vercel (integración oficial): la variable de conexión
  se inyecta por entorno.
- El importador de puzzles y las migraciones NO corren en el build de Vercel:
  se ejecutan manualmente desde `scripts/`.

## 9. Decisiones registradas (ADR breves)

| # | Decisión | Motivo | Fecha |
|---|---|---|---|
| ADR-001 | Monorepo pnpm con apps/web + packages | Código compartido sin fricción, límites claros | Fase 0 |
| ADR-002 | chessground + chessops | Mejor tablero y mejor lógica, GPL-3.0+ compatible con AGPL del proyecto | Fase 0 |
| ADR-003 | Better Auth frente a Auth.js | Estable, Drizzle de primera clase, MIT | Fase 0 |
| ADR-004 | Motor npm `stockfish` (nmrugg) inicialmente; evaluar `@lichess-org/stockfish-web` en Fase 3 | Simplicidad primero, optimización de peso después | Fase 0 |
| ADR-005 | Licencia del proyecto: AGPL-3.0-or-later | Compatible con todas las dependencias y assets elegidos (ver LICENSES.md) y coherente con la filosofía libre | Fase 0 |
| ADR-006 | Puzzles en esquema `puzzles` separado, importación por lotes reanudable | Millones de filas sin afectar datos de usuarios | Fase 0 |
| ADR-007 | Registro no obligatorio (modo invitado + IndexedDB con outbox de sincronización) | Probar sin fricción; sincronizar solo si se desea | Fase 0 |
| ADR-008 | Sin Redis/WebSockets/microservicios | Fuera de alcance por diseño del producto | Fase 0 |
