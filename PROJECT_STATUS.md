# PROJECT_STATUS — Estado del desarrollo

> Archivo de continuidad del proyecto. Se actualiza en cada sesión de trabajo.
> Objetivo: que cualquier agente o persona pueda retomar el desarrollo sin
> perder contexto. Fuente de verdad del producto: `docs/PRODUCT.md` y el
> prompt maestro custodiado por el propietario.

## Fase actual

**FASE 1 — Identidad y fundación (EN CURSO, ~95 %)**. El código está completo,
compilado y verificado localmente (build, pruebas, lint y revisión visual en
navegador, claro/oscuro y escritorio/móvil). **Pendiente para cerrar la fase:**
aplicar la migración en Neon, configurar Vercel (Root Directory + variables)
y verificar el despliegue en producción (definición de terminado: preview
verificado antes de producción).

## Avance

| Fase | Estado | Entregable |
|---|---|---|
| 0 — Preparación | **COMPLETADA** | Proyecto preparado para el desarrollo |
| 1 — Identidad y fundación | **EN CURSO** (código listo; falta despliegue) | Aplicación visual y funcional |
| 2 — Experiencia de juego | No iniciada | Sistema de juego funcional |
| 3 — Analizador | No iniciada | Analizador profesional operativo |
| 4 — Entrenamiento táctico | No iniciada | Sistema de entrenamiento completo |
| 5 — Entrenadores avanzados | No iniciada | Suite de entrenamiento avanzada |
| 6 — Inteligencia y personalización | No iniciada | Experiencia personalizada |
| 7 — Aprendizaje y herramientas | No iniciada | Ecosistema educativo |
| 8 — Estadísticas y pulido | No iniciada | Primera publicación |

## Funciones terminadas (verificadas)

- Fase 0 completa (ver historial): docs, skills, licencias, arquitectura.
- `packages/shared`: tipos y validación zod de preferencias (fuente única).
- `packages/db`: esquemas Drizzle `auth` (user/session/account/verification,
  Better Auth) y `core` (profiles, user_preferences); cliente Neon HTTP
  perezoso; **migración 0000 generada** (`packages/db/migrations/0000_…sql`).
- `apps/web` (Next.js 16 + React 19 + Tailwind 4 + TS estricto):
  - Sistema visual: tokens verde profundo, modo claro/oscuro/sistema con
    script anti-destello y `useSyncExternalStore` (sin setState en efectos).
  - Navegación: 10 secciones; barra lateral colapsable (escritorio) y barra
    inferior + hoja "Más" (móvil). Layout responsive verificado.
  - Dashboard: saludo por sesión, acceso rápido con fases reales, plan/actividad
    (estados vacíos honestos), estado de la plataforma, tarjeta de invitado.
  - Autenticación Better Auth: /entrar, /registro, /api/auth/[...all],
    errores traducidos, modo invitado sin registro obligatorio (ADR-007).
  - Perfil (invitado/usuario), Ajustes (tema, idioma deshabilitado honesto,
    cuenta, borrado de datos locales, créditos), /api/preferences (GET/PUT
    idempotente con zod).
  - IndexedDB: preferencias + outbox de sincronización (flush al iniciar
    sesión); secciones futuras con estados vacíos útiles (sin botones falsos).
- Calidad: 21 pruebas unitarias Vitest (16 de contraste WCAG AA sobre los
  tokens reales del CSS + 5 de preferencias), typecheck y ESLint limpios,
  `next build` correcto sin base de datos (páginas estáticas, sesión en cliente).
- Iconografía lucide-react (ISC) y tipografía Inter (OFL) registradas en
  `docs/LICENSES.md` y `apps/web/public/ATTRIBUTIONS.md`.

## Funciones pendientes (para CERRAR la Fase 1)

1. **Aplicar la migración en Neon**: `DATABASE_URL=… pnpm db:migrate` desde
   el sandbox (necesita la cadena de conexión del panel de Neon; las
   migraciones NO corren en el build de Vercel, ADR-008).
2. **Vercel**: configurar Root Directory = `apps/web` y las variables
   `BETTER_AUTH_SECRET` y `PUBLIC_APP_URL` (la integración Neon ya inyecta
   `DATABASE_URL`). Guía paso a paso entregada al usuario.
3. Verificar el despliegue en producción (registro/login reales con Neon).

## Problemas conocidos

1. **Plugin de Vercel sin acceso** (cuenta personal Hobby): se gestiona Vercel
   desde la web; cada push a `main` despliega automáticamente.
2. **`pnpm-lock.yaml` no está en GitHub** (204 KB; la API del plugin solo
   sube texto inline y el agente no tiene credenciales git). Consecuencia:
   Vercel instala sin lockfile (versiones fijadas en los package.json, así
   que el árbol directo es determinista; los transitorios pueden variar).
   Solución futura: credenciales git para el agente o plugin con subida de
   archivos grandes.
3. La recuperación de contraseña necesita un servicio de correo (SMTP);
   se diseñará cuando se active (Better Auth ya trae el flujo). No hay
   botón hasta que funcione de verdad.
4. Piezas/tablero/sonidos de Ajustes se exponen en la Fase 2 (cuando tienen
   efecto real; el esquema ya está listo).

## Decisiones técnicas (resumen; detalle en docs/ARCHITECTURE.md)

- Monorepo pnpm: `apps/web` + 6 paquetes internos.
- chessground + chessops (GPL-3.0+) para tablero y reglas (Fase 2).
- Motor: paquete npm `stockfish` (nmrugg) en Web Worker (Fase 2-3).
- Autenticación: Better Auth (MIT), ids de auth `text(uuid v4)` (ADR-009).
- Componentes UI de Fase 1 en `apps/web/components`; `packages/ui` se llena
  en Fase 2 cuando `packages/chess-board` los consuma (ADR-010).
- Licencia del proyecto: AGPL-3.0-or-later.
- Prohibido por diseño: multijugador online, matchmaking, WebSockets,
  Redis, microservicios, y toda simulación de Stockfish o del analizador.

## Últimas modificaciones

- **2026-11-23 — Fase 1 (código)**: apps/web completa + packages/db y shared,
  migración generada, 21 pruebas, verificación visual en navegador
  (dashboard claro/oscuro, escritorio y móvil, formularios y menús).

## Próximos pasos

1. Cerrar la Fase 1: migración en Neon + configuración Vercel + verificación
   del despliegue (guía entregada al usuario).
2. Fase 2: `packages/chess-board` (envoltorio chessground), `packages/engine`
   (Stockfish en Worker), jugar contra bots y partidas en el mismo dispositivo.
