# @freechess/web

Aplicación Next.js 16 de FreeChess (App Router, React 19, TypeScript estricto,
Tailwind CSS 4). **Implementada en la Fase 1** (identidad y fundación).

Estructura actual:

- `app/` — rutas y páginas: inicio (dashboard), jugar, analizar, entrenar,
  aperturas, aprender, herramientas, estadísticas, perfil, ajustes, entrar,
  registro, `api/auth/[...all]` (Better Auth), `api/preferences`, `manifest.ts`.
- `components/` — carcasa de la aplicación: barra lateral (escritorio),
  barra inferior + hoja "Más" (móvil), sistema de tema claro/oscuro/sistema,
  primitivas de interfaz (`components/ui/`).
- `features/` — módulos funcionales por dominio (auth, dashboard, perfil,
  ajustes).
- `lib/` — i18n (diccionario `es` centralizado), cliente de auth, IndexedDB
  (preferencias + outbox), utilidades.
- `styles/` — tokens de diseño (verde profundo) y estilos globales.
- `public/` — `icon.svg` (marca original) y `ATTRIBUTIONS.md` con los
  créditos de licencias.

Notas técnicas (detalle en `docs/ARCHITECTURE.md`, ADR-009 a ADR-011):

- La sesión se consulta desde componentes cliente: el render del servidor no
  depende de la base de datos (build sin DATABASE_URL).
- Tema con script anti-destello + `useSyncExternalStore` (localStorage).
- Variables de entorno: ver `.env.example` (DATABASE_URL, BETTER_AUTH_SECRET,
  PUBLIC_APP_URL).
