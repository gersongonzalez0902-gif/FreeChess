# @freechess/shared

Tipos, constantes, validadores (zod) y utilidades compartidas entre cliente
y servidor. **Activo desde la Fase 1** (sin código muerto anticipado).

Contenido actual:

- `preferences.ts` — esquema zod y valores por defecto de las preferencias
  del usuario (tema, idioma, piezas, tablero, sonidos), compartidas entre
  IndexedDB (cliente), `core.user_preferences` (servidor) y la API.
