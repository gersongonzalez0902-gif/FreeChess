# DATABASE — FreeChess

> Diseño de datos (Fase 0). Implementación con Drizzle ORM en `packages/db`
> a partir de la Fase 1. Motor: Neon PostgreSQL (serverless).

## 1. Principios

1. Esquemas lógicos separados por dominio; los datos masivos (puzzles) viven
   aislados en su propio esquema.
2. Claves primarias `uuid` (`gen_random_uuid()`), salvo tablas importadas
   (id de origen, ej. `puzzles.puzzle_id`).
3. `timestamp with time zone` (UTC) siempre; `created_at`/`updated_at` en
   todas las tablas de usuario.
4. Borrado en cascada desde `user` (derecho al olvido en una transacción).
5. Índices compuestos `(user_id, created_at desc)` en historiales;
   paginación por cursor, nunca por offset.
6. `jsonb` para estructuras flexibles, siempre validadas en TypeScript.
7. Sin archivos binarios en la base; los PGN se almacenan como texto.

## 2. Esquemas y tablas

### Esquema `auth` (Better Auth)

Generadas por el adaptador Drizzle de Better Auth. **Nota (ADR-009):** los
ids de estas tablas son `text` con UUID v4 (requisito de Better Auth); el
resto de tablas del proyecto mantiene `uuid` de PostgreSQL. Migración `0000`
(Fase 1) crea `auth` (user, session, account, verification) y el arranque de
`core` (profiles, user_preferences); las tablas restantes llegan con las
migraciones de sus fases.

| Tabla | Propósito |
|---|---|
| `user` | id, email único, nombre público, email verificado, imagen, created_at |
| `session` | sesiones de base de datos (token hash, expira, ip, agente) |
| `account` | credenciales (hash Argon2id) y futuros OAuth |
| `verification` | tokens de verificación/recuperación |

### Esquema `core`

| Tabla | Campos clave | Notas |
|---|---|---|
| `profiles` | user_id PK, avatar, biografía, rating estimado por módulo (jsonb), mejor rating, totals (victorias/derrotas/tablas) | Datos públicos del jugador |
| `user_preferences` | user_id PK, tema (claro/oscuro/sistema), piezas, tablero, sonidos (jsonb por categoría con volumen), idioma, board settings (jsonb) | Preferencias sincronizadas |
| `engine_settings` | user_id PK, multipv, threads, hash, stockfish variant/build preferido | Ajustes del analizador |
| `bots` | id, slug, nombre, avatar, descripción, estilo, nivel por defecto, uci overrides (jsonb) | Colección original de rivales (contenido semilla) |
| `games` | id, user_id, origen (bot/local/importada), color, bot_id, resultado, motivo, control de tiempo, apertura_eco, pgn, movimientos (jsonb SAN+UCI), fen_final, started_at, ended_at | Partida completa, exportable |
| `game_moves` | id, game_id, ply, san, uci, fen_after, eval_cp (nullable), clock_white, clock_black | Solo se rellena al analizar (evita duplicar `games.jsonb` cuando no hay análisis) |
| `rating_history` | id, user_id, módulo (bots/puzzles/aperturas…), rating, delta, motivo, created_at | Evolución por módulo; los ratings son **locales/estimados**, nunca oficiales |

### Esquema `analysis`

| Tabla | Campos clave | Notas |
|---|---|---|
| `game_analyses` | id, game_id único, user_id, versión del método, profundidad media, precisión blanca/negra, acpl blanca/negra, conteos (brillantes/mejores/buenas/imprecisiones/errores/blunders), resumen por fases (jsonb), created_at | Reanalizar crea nueva versión (historial) |
| `analysis_positions` | id, analysis_id, ply, fen, eval antes/después (cp o mate), mejor jugada, clasificación, comentarios por reglas (jsonb), variantes (jsonb MultiPV) | Detalle por jugada |
| `blunder_records` | id, user_id, analysis_id, ply, fen, jugada del usuario, mejor jugada, tipo de error (táctico/posicional/apertura/final), pérdida cp, convertido_a_ejercicio bool | Alimenta Blunder Fix |
| `chess_dna_reports` | id, user_id, versión del método, partidas analizadas base, fortalezas/debilidades por categoría (jsonb), estilo predominante, patrones frecuentes (jsonb), muestra_suficiente bool, created_at | Si no hay partidas suficientes, se marca y NO se inventan estadísticas |

### Esquema `training`

| Tabla | Campos clave | Notas |
|---|---|---|
| `training_sessions` | id, user_id, tipo (puzzles/woodpecker/blunder/opening/endgame), duración, aciertos, fallos, metadatos (jsonb), created_at | Historial de entrenamiento |
| `puzzle_attempts` | id, user_id, puzzle_id, correcto, tiempo_ms, intentos, pista_usada, modo, created_at | Índice (user_id, puzzle_id) para repaso de fallos |
| `puzzle_favorites` | user_id + puzzle_id PK, created_at | |
| `puzzle_ratings` | user_id PK, rating puzzles, rd, racha, mejor racha, updated_at | Rating independiente (tipo Glicko simplificado) |
| `training_plans` | id, user_id, fecha, estado, bloques (jsonb: tipo, minutos, objetivo), generado_por (reglas), created_at | Plan diario Supercoach |
| `training_tasks` | id, plan_id, tipo, objetivo, completado, resultado (jsonb) | Tarea concreta del plan |
| `woodpecker_sets` | id, user_id, nombre, descripción, criterio de selección (jsonb), puzzle_count, created_at | Colecciones del usuario + recomendadas |
| `woodpecker_puzzles` | set_id + puzzle_id PK, orden | |
| `woodpecker_cycles` | id, set_id, número de ciclo, duración total, aciertos, fallos, precision, created_at | Comparar ciclos |
| `blunder_training_sessions` | id, user_id, filtros (jsonb), ejercicios totales, corregidos, created_at | Sesiones Blunder Fix |

### Esquema `openings`

| Tabla | Campos clave | Notas |
|---|---|---|
| `opening_repertoires` | id, user_id, nombre, color (blancas/negras), descripción, created_at | |
| `opening_lines` | id, repertoire_id, nombre (ej. "Defensa Siciliana"), uci path, pgn, eco, notas, etiquetas (jsonb), nivel de dominio, última revisión (repetición espaciada: `due_at`) | Árbol de líneas |
| `opening_attempts` | id, line_id, user_id, modo (aprender/completar/entrenar), aciertos, errores, tiempo_ms, created_at | Estadísticas por línea |
| `opening_trees` (datos) | id, eco, nombre, uci path, pgn, transposiciones (jsonb) | Datos ECO CC0 importados (esquema público, sin datos de usuario) |

### Esquema `learn`

| Tabla | Campos clave | Notas |
|---|---|---|
| `courses` | id, slug, título, categoría (fundamentos/táctica/aperturas/mediojuego/finales), nivel, orden | Contenido original |
| `lessons` | id, course_id, título, contenido (jsonb: texto, diagramas FEN, posiciones interactivas, ejercicios), orden | |
| `lesson_progress` | user_id + lesson_id PK, estado, puntaje, completado_at | |
| `achievements` | id, slug, nombre, descripción, criterio (jsonb), icono | Definiciones |
| `user_achievements` | user_id + achievement_id PK, progreso, desbloqueado_at | |
| `xp_events` | id, user_id, origen, cantidad, created_at | Registro de XP |

### Esquema `puzzles` (datos masivos, sin datos personales)

| Tabla | Campos clave | Notas |
|---|---|---|
| `puzzles` | puzzle_id PK (texto), fen, moves (línea UCI), rating, rating_deviation, popularity, nb_plays, themes (text[]), game_url, opening_tags (text[]), import_batch, imported_at | Fuente CC0 Lichess; índices: rating (btree), themes (GIN), popularity (btree). Se crean tras la carga masiva |
| `import_logs` | id, batch, fila, error, created_at | Reanudar importaciones |

## 3. Estimaciones y estrategia de volumen

| Concepto | Estimación | Estrategia |
|---|---|---|
| Puzzles completos (6,19 M) | ~1,5–2 GB | NO importar todo al inicio |
| Selección inicial recomendada | 200k–500k puzzles (validados, mejor puntuados) | ~60–150 MB; ampliar por lotes midiendo Neon |
| Partida promedio | ~4 KB (PGN) | Scales con usuarios |
| `analysis_positions` | ~30 filas/partida × ~1 KB | Crece más rápido que `games`; archivar/particionar a partir de 10 M de filas |

## 4. Migraciones

- `drizzle-kit generate` para generar SQL versionado en
  `packages/db/migrations`; `drizzle-kit migrate` para aplicarlas.
- Una migración por cambio; jamás editar migraciones aplicadas.
- Las tablas de Better Auth se generan desde el esquema Drizzle del proyecto
  (no con SQL suelto) para mantener el flujo único de migraciones.

## 5. Consultas críticas (diseñadas desde el inicio)

1. Puzzle siguiente por rating objetivo y temas: índice `(rating)` + filtro
   GIN `themes`; orden aleatorio con `TABLESAMPLE` o `order by random() limit 1`
   sobre un subconjunto acotado por rating.
2. Puzzle del día: determinista por fecha (hash de fecha → seed) sobre el
   conjunto de mayor popularidad.
3. Historial de partidas: cursor `(created_at, id)` + índice `(user_id, created_at desc)`.
4. Repaso de errores: `puzzle_attempts` falladas unidas a `puzzles` con
   `not exists (attempt correcta posterior)`, acotado por límite.
5. Métricas de Chess DNA: leen de agregados en `game_analyses`, no de
   `analysis_positions` en crudo.
