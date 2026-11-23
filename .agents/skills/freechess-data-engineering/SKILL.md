---
name: freechess-data-engineering
description: Normas para el almacenamiento y procesamiento de datos de FreeChess (PostgreSQL en Neon, Drizzle ORM, importación masiva por lotes de puzzles, PGN, índices, consultas eficientes, validación, migraciones, persistencia local con IndexedDB y sincronización). Usar SIEMPRE que se diseñen esquemas, migraciones, importadores o consultas.
---

# FreeChess — Ingeniería de datos

## 1. Arquitectura general

- Base de datos: **Neon PostgreSQL** (serverless), acceso con el driver
  HTTP/WebSocket de Neon a través de Drizzle (`packages/db`).
- ORM: **Drizzle** con esquemas en TypeScript (`packages/db/schema`), una
  carpeta por esquema lógico (`auth`, `core`, `analysis`, `training`,
  `openings`, `learn`, `puzzles`).
- Migraciones versionadas con `drizzle-kit`; jamás editar una migración ya
  aplicada: siempre se crea una nueva.
- Datos masivos (puzzles) SIEMPRE en un esquema separado (`puzzles`) para
  poder hacer mantenimiento (reindexar, truncar, particionar) sin tocar datos
  de usuarios.
- Nada de archivos pesados en PostgreSQL: los PGN largos se guardan como texto
  comprimido (texto plano si el tamaño lo justifica) o referencias; los assets
  binarios viven en el repositorio/CDN, no en la base.

## 2. Convenciones de tablas

- Claves primarias: `uuid` con `gen_random_uuid()` (excepto importaciones
  masivas: la tabla `puzzles` usa el id textual de Lichess como PK).
- Todas las tablas con usuario llevan `user_id uuid` con FK a `user` y
  `on delete cascade`.
- Fechas SIEMPRE `timestamp with time zone` (UTC).
- Estructuras flexibles (settings del motor, líneas de análisis, planes):
  columnas `jsonb` con tipos TypeScript validados con un validador (zod).
- Auditoría mínima: `created_at` y `updated_at` en todas las tablas de usuario.
- Índices: toda consulta por usuario lleva índice compuesto empezando por
  `user_id` (ej. `(user_id, created_at desc)` en historiales).
- Paginación SIEMPRE por cursor (`created_at` + `id`), no por offset, en
  tablas de alto volumen.

## 3. Importador de puzzles (reglas críticas)

Fuente: `https://database.lichess.org/` — `lichess_db_puzzle.csv.zst`
(≈ 6 millones de puzzles, licencia CC0).

1. El importador es un programa **independiente** (`scripts/import-puzzles`),
   ejecutado manualmente contra la base; NUNCA durante el build de Vercel.
2. Procesamiento **por lotes en flujo** (streaming): descomprimir zstd y leer
   el CSV línea a línea; está PROHIBIDO cargar el archivo completo en memoria.
3. Validar cada fila antes de insertar: FEN válido (chessops), línea de
   solución legal, tema conocido, rating dentro de rango plausible.
4. Deduplicar por `puzzle_id` con `on conflict do nothing`.
5. Inserción por lotes (500–2000 filas) en transacción por lote.
6. Registro de errores en tabla de log con fila, motivo y fecha; el proceso
   debe poder **reanudarse** desde el último lote confirmado.
7. Medir impacto ANTES de importar todo: comenzar con una selección (p. ej.
   200k–500k puzzles mejor valorados y validados) y ampliar progresivamente,
   midiendo tamaño y rendimiento en Neon.
8. Índices de la tabla puzzles: `(rating)` para selección por dificultad,
  índice GIN sobre `themes` (array) para filtrar por tema, y `(popularity)`
  para el puzzle diario. Crear índices DESPUÉS de la carga masiva.
9. La tabla guarda la fuente y fecha de importación (`import_batch`,
  `imported_at`) para trazabilidad.

## 4. PGN y partidas

- Partida canónica: cabeceras (jsonb) + movimientos SAN + FEN final + PGN
  completo regenerable. Guardar ambos (campos estructurados para consultar,
  PGN para exportar) solo si el tamaño lo justifica; si no, PGN + índices mínimos.
- Importación de PGN de usuario: validar con chessops, rechazar con error
  claro por partida (no abortar el lote entero por un archivo malo), informar
  cuántas se importaron y cuáles fallaron y por qué.
- Límite razonable de tamaño por archivo (p. ej. 10 MB) y por número de
  partidas por lote, para proteger Neon.

## 5. Consultas eficientes

- Prohibidas las consultas N+1: toda lista usa una sola consulta con joins
  o subconsultas; revisar con `EXPLAIN` los cuellos de botella.
- Conteos de alto volumen (tableros de estadísticas) guardados en tablas
  resumen actualizadas por eventos, no `count(*)` en vivo sobre millones de filas.
- Las funciones analíticas (Chess DNA, Supercoach) leen de agregados, jamás
  recorren todas las partidas en cada cálculo.
- Timeouts y `LIMIT` obligatorios en toda consulta de administración.

## 6. Persistencia local (IndexedDB) y sincronización

- Modo invitado y modo offline guardan en IndexedDB: partidas locales,
  progreso, preferencias, puzzles descargados y repertorios.
- Modelo de sincronización: cola de cambios local (outbox) con ids
  deterministas (uuid generados en cliente) y reenvío al reconectar;
  el servidor hace upsert idempotente (mismo uuid no se duplica).
- Conflictos: gana el servidor en datos agregados (partidas), gana el cliente
  en preferencias; nunca borrar datos locales sin confirmación explícita.
- El usuario puede usar sin registro; al registrarse, se ofrece fusionar el
  progreso local con la cuenta (flujo explícito y reversible por confirmación).

## 7. Privacidad y seguridad de datos

- Mínimos datos personales: email (si se registra), nombre público opcional.
  Nada de datos innecesarios.
- Derecho al olvido: `DELETE` en cascada desde `user` elimina TODOS los datos
  del usuario en una transacción; verificar el conteo de filas borradas.
- Backups: exportación PGN completa del usuario disponible en la interfaz.
- Variables de entorno: `DATABASE_URL` solo en el servidor; jamás exponer
  secretos al navegador (ninguna clave en código o en el cliente).
