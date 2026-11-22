# ROADMAP — FreeChess

> Ruta de desarrollo por fases funcionales. Cada fase se entrega verificada:
> nada se marca como terminado sin probar. Estado detallado en `PROJECT_STATUS.md`.

## FASE 0 — Preparación (COMPLETADA)

- [x] Inspección del sandbox (Node 24, npm 11, git, acceso a registro npm).
- [x] Cuentas: GitHub (repo público `freechess`), Vercel (conectado al repo,
  plan Hobby), Neon (proyecto conectado a Vercel con base de datos lista).
- [x] Instalación y verificación de 7 skills externas; creación de 3 skills
  propias (`.agents/skills/`).
- [x] Investigación de Lichess: licencias de chessground, chessops,
  stockfish-web, pgn-viewer, assets (piezas/tableros/sonidos) y base de
  puzzles (CC0, 6.193.530 puzzles).
- [x] Investigación de Chessigma (funcionalidades verificadas).
- [x] Revisión comparativa de bibliotecas (tablero, lógica, motor, auth).
- [x] Inventario de licencias (`docs/LICENSES.md`).
- [x] Decisiones de arquitectura (`docs/ARCHITECTURE.md`, ADR-001…008).
- [x] Diseño de base de datos (`docs/DATABASE.md`).
- [x] Estructura del repositorio y documentación completa.
- **Entregable:** proyecto preparado para el desarrollo.

## FASE 1 — Identidad y fundación

- [ ] Scaffold de `apps/web` (Next.js 16 + TS estricto + Tailwind 4 + ESLint/Prettier).
- [ ] Sistema visual: tokens de color (verde profundo), tipografía, espaciado.
- [ ] Modo claro y modo oscuro completos.
- [ ] Navegación lateral (escritorio) e inferior (móvil); 10 secciones.
- [ ] Dashboard: saludo, actividad, acceso rápido, plan de hoy, progreso.
- [ ] Perfil y preferencias (piezas, tablero, sonidos).
- [ ] Better Auth: registro, inicio/cierre de sesión, recuperación; modo
  invitado sin registro obligatorio.
- [ ] Conexión Neon + Drizzle + primera migración (esquemas `auth` y `core`).
- [ ] IndexedDB: preferencias y datos de invitado (con outbox de sincronización).
- [ ] Layout responsive verificado en escritorio, tablet y móvil.
- **Entregable:** aplicación visual y funcional desplegada en Vercel.

## FASE 2 — Experiencia de juego

- [ ] `packages/chess-board`: envoltorio React de chessground (temas,
  coordenadas, promoción, animaciones, táctil).
- [ ] `packages/engine`: Stockfish en Web Worker, API tipada, niveles
  UCI reales (Skill Level / UCI_LimitStrength / UCI_Elo).
- [ ] Jugar contra bots: color, dificultad, personalidad, control de tiempo,
  rendirse, tablas, reinicio; auto-guardado de la partida.
- [ ] Colección original de bots con identidad (nombre, avatar, estilo,
  descripción, historial de enfrentamientos).
- [ ] Capa de personalidades (MultiPV ponderado por estilo, siempre legal).
- [ ] Modo dos jugadores en el mismo dispositivo: rotación de tablero,
  nombres, reloj opcional, pausa, ocultar tablero al cambiar turno.
- [ ] Historial de partidas + exportación PGN.
- [ ] Sonidos opcionales con volumen por categoría (conjuntos AGPL de Enigmahack).
- **Entregable:** sistema de juego funcional.

## FASE 3 — Analizador

- [ ] Importación: PGN (archivo/texto), FEN, partidas de FreeChess y de
  otras plataformas.
- [ ] Tablero de análisis: navegación, variantes, MultiPV, barra de
  evaluación, flechas, profundidad/nodos, copiar FEN, exportar PGN,
  reanudar desde posición.
- [ ] Editor de posiciones.
- [ ] Revisión automática: clasificación de jugadas con metodología propia
  documentada, precisión, ACPL, momentos críticos, rendimiento por fases.
- [ ] Informes guardados con historial (re-análisis y comparación de versiones).
- [ ] Motor siempre en Worker, sin bloquear la interfaz.
- [ ] Evaluar `@lichess-org/stockfish-web` (`sf_19_smallnet`) para reducir
  el peso de descarga (ADR-004).
- **Entregable:** analizador profesional operativo.

## FASE 4 — Entrenamiento táctico

- [ ] Importador de puzzles por lotes (streaming zst, validación,
  deduplicación, reanudable, logs) — selección inicial 200k–500k.
- [ ] Puzzle diario (determinista), aleatorio, por rating, por tema.
- [ ] Modos: Rush, Streak, libre, por temas, personalizado, repaso de errores.
- [ ] Rating de puzzles independiente (Glicko simplificado) con evolución.
- [ ] Favoritos y filtros.
- **Entregable:** sistema de entrenamiento completo.

## FASE 5 — Entrenadores avanzados

- [ ] Woodpecker (colecciones propias + recomendadas, ciclos comparables).
- [ ] Opening Trainer (repertorios blancas/negras, PGN import/export, modos
  aprender/completar/entrenar, repetición espaciada, estadísticas).
- [ ] Blunder Fix (errores reales → ejercicios, con filtros por tipo).
- [ ] Blunder Shield (niveles de asistencia: desactivado/pistas/advertencias/
  explicación posterior; con explicaciones en lenguaje natural por reglas).
- [ ] Entrenador de finales (posiciones verificadas con fuente citada).
- [ ] Entrenador de coordenadas.
- **Entregable:** suite de entrenamiento avanzada.

## FASE 6 — Inteligencia y personalización

- [ ] Chess DNA (perfil por categorías, historial de informes, muestra
  insuficiente marcada explícitamente).
- [ ] Supercoach: plan diario adaptativo (errores recientes, rating, tiempo
  disponible, objetivos); recomendaciones explicadas; ignorable.
- [ ] Maestro FreeChess: explicaciones por reglas + datos reales del motor;
  capa de proveedores IA intercambiable (opcional, sin claves expuestas).
- [ ] Sistema de progreso: XP, niveles, insignias, misiones diarias/semanales
  sin bloquear funciones.
- **Entregable:** experiencia personalizada.

## FASE 7 — Aprendizaje y herramientas

- [ ] Cursos y lecciones originales (fundamentos → finales) con posiciones
  interactivas y evaluaciones.
- [ ] Explorador de aperturas (ECO CC0, árbol navegable, transposiciones).
- [ ] Biblioteca de partidas del usuario.
- [ ] Caja de herramientas completa: editor FEN, visor PGN, constructor de
  variantes, tablero de demostración, reloj, modo análisis a ciegas,
  entrenador de patrones.
- **Entregable:** ecosistema educativo.

## FASE 8 — Estadísticas y pulido

- [ ] Centro de estadísticas: rating, precisión, rendimiento por
  color/apertura/fase, entrenamiento semanal, tendencias (gráficas Recharts).
- [ ] PWA completa con Serwist: offline real (bots, análisis, puzzles
  descargados, repertorios, herramientas), actualizaciones y recuperación.
- [ ] Accesibilidad auditada (contraste, teclado, lectores de pantalla).
- [ ] Rendimiento: presupuestos por ruta, Lighthouse.
- [ ] Seguridad: revisión de rate limiting, sesiones, validación.
- [ ] Despliegue de producción con dominio.
- **Entregable:** FreeChess listo para una primera publicación.

## Definición de terminado (todas las fases)

1. Funciona de verdad (probado; sin simulaciones).
2. Cubierto por pruebas automatizadas cuando aplica.
3. Verificado en escritorio, tablet y móvil; claro y oscuro.
4. Sin botones sin funcionalidad ni estados vacíos inútiles.
5. Documentado (PROJECT_STATUS.md y docs afectados).
6. Desplegado en Vercel (preview verificado antes de producción).
