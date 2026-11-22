---
name: freechess-chess-engineering
description: Normas técnicas para implementar lógica ajedrecística en FreeChess (reglas, FEN, PGN, SAN, UCI, Stockfish en WebAssembly, legalidad de movimientos, validación de partidas, evaluación, análisis, aperturas, tácticas y finales). Usar SIEMPRE que se programe algo relacionado con el ajedrez: tablero, motor, analizador, puzzles, repertorios o entrenadores.
---

# FreeChess — Ingeniería ajedrecística

Esta skill reúne las reglas no negociables para todo código de FreeChess que
toque lógica de ajedrez. Su objetivo es que la lógica sea **siempre correcta**,
verificable y nunca "simulada".

## 1. Regla de oro: nunca simular

- Está PROHIBIDO simular Stockfish, inventar evaluaciones, inventar mejores
  jugadas o devolver movimientos "parecidos a los de un motor".
- Toda evaluación que vea el usuario debe salir del motor real (Stockfish vía
  WASM) o de una fuente de datos verificada (ej. base de puzzles CC0 de Lichess).
- Si una función no puede garantizar corrección, debe lanzar error explícito,
  nunca degradar silenciosamente a resultados inventados.

## 2. Bibliotecas oficiales del proyecto

| Necesidad | Biblioteca | Notas |
|---|---|---|
| Reglas, movimientos legales, FEN, PGN, SAN | `chessops` (GPL-3.0+) | Fuente de verdad. Usar `parseFen`, `parsePgn`, `parseSan`, `legalMoves`, etc. |
| Tablero interactivo (render, drag & drop, flechas, círculos) | `chessground` (GPL-3.0+) | Envolver en React dentro de `packages/chess-board` |
| Motor | `stockfish` (npm, nmrugg, GPL-3.0) en Web Worker | Alternativa avanzada: `@lichess-org/stockfish-web` (builds `sf_19_smallnet`) |

- No reimplementar reglas del ajedrez a mano: si chessops lo resuelve, se usa
  chessops. `chess.js` solo se permite como herramienta de contraste en pruebas
  (nunca en producción) por ser BSD-2 y menos apta para análisis masivo.
- Toda posición interna viaja como FEN válido + histórico de movimientos UCI;
  no inventar formatos propios.

## 3. Formatos: definiciones y validación

- **FEN** (Forsyth–Edwards Notation): 6 campos — piezas, turno, derechos de
  enroque, casilla de captura al paso, contador de medio-movimiento, número de
  jugada. Validar SIEMPRE con `chessops.fen.parseFen` antes de usar; FEN
  inválido ⇒ error visible, jamás "mejor adivinado".
- **PGN**: aceptar variantes anidadas, comentarios, NAGs (`$1`, `$2`…), y
  cabeceras estándar (`Event`, `Site`, `Date`, `White`, `Black`, `Result`,
  `TimeControl`, `WhiteElo`, `BlackElo`, `ECO`, `FEN` para posiciones iniciales
  alternativas). Exportar PGN estándar SAN con numeración.
- **SAN** (notación algebraica): aceptar formas comunes de entrada
  (`Nf3`, `0-0`, `O-O`, `e8=Q`, `Nbd2`), pero emitir siempre SAN canónico corto.
- **UCI** (`e2e4`, `e7e8q`): único formato de comunicación con el motor.

## 4. Reglas del ajedrez que deben cubrirse en pruebas

Toda funcionalidad nueva de tablero debe pasar pruebas de:

1. Movimientos legales e ilegales (incluidos movimientos que dejan al rey propio en jaque).
2. Jaque, jaque mate y ahogado (tablas por rey ahogado).
3. Enroque corto, largo, con derechos perdidos y a través de casillas atacadas.
4. Captura al paso (incluida la pérdida del derecho tras una jugada).
5. Promoción a dama, torre, alfil o caballo.
6. Tablas: por ahogado, por material insuficiente, por la regla de 50 jugadas
   y por triple repetición (comparando posición + turno + derechos de enroque +
  captura al paso, no solo la disposición de piezas).

Chess960 no es objetivo del producto; no implementar sin necesidad real.

## 5. Stockfish en el navegador

- El motor SIEMPRE se ejecuta en un **Web Worker**; jamás en el hilo de la interfaz.
- Comunicación por protocolo UCI (`uci`, `isready`, `setoption`, `position fen …`,
  `go [depth|movetime|nodes]`, `stop`). Envolver en `packages/engine` con una API
  tipada (`analyse(fen, opts)`, `bestMove(fen, opts)`, `setLevel(level)`).
- Niveles de dificultad: usar opciones UCI reales (`Skill Level` 0–20,
  `UCI_LimitStrength`, `UCI_Elo` cuando el build lo soporte). Los Elo mostrados
  en la interfaz son **estimaciones orientativas**, nunca ratings oficiales.
- Descarga perezosa (lazy): el binario WASM (~MB) se descarga solo cuando se
  necesita, con pantalla de carga y control de reintento.
- Analizador: correr análisis por posición con `MultiPV` ≥ 2 para variantes
  alternativas; recopilar `depth`, `nps`, evaluación en centipeones y mates.
- Personalidades de bots: capa `packages/engine/src/personalities.ts` que filtra
  o pondera los candidatos del motor (MultiPV) según estilo (agresivo,
  defensivo, táctico, posicional…). Todos los movimientos finales deben pasar
  la validación legal de chessops. Un bot "débil" comete errores con movimientos
  LEGALES, nunca emite jugadas inválidas.

## 6. Clasificación de jugadas (Game Review)

- La clasificación (Brillante → Blunder) se calcula con diferencias de
  evaluación del motor antes/después de la jugada, considerando contexto:
  - Solo se puede considerar "brillante" una jugada que sacrifica material y
    sigue siendo claramente la mejor tras análisis profundo.
  - Un pequeño descenso en posición ya ganada no es un error: usar márgenes
    dependientes de la evaluación absoluta (clamp) y de la fase de la partida.
- La metodología exacta (umbrales, fórmula de precisión) debe estar documentada
  y mantenerse estable entre versiones, guardando la versión del método en cada
  informe generado.
- ACPL = pérdida media de centipeones por jugada, solo sobre jugadas del usuario.

## 7. Aperturas, tácticas y finales

- Identificación de aperturas: usar los TSV ECO (CC0) de `lichess-org/chess-openings`.
- Puzzles: solo desde la base CC0 (`database.lichess.org`, CSV comprimido con
  zstd). Un puzzle es válido si: FEN válido, línea de solución íntegramente
  legal, y ratings/temas provienen del CSV original. Nunca generar puzzles
  sintéticos sin etiquetarlos como ejemplos didácticos propios.
- Blunder Fix: los ejercicios se generan a partir de blunders reales del
  usuario en partidas analizadas, con la solución correcta del motor y
  explicación generada por reglas.
- Finales: las posiciones de entrenamiento deben tener resultado teórico
  conocido o verificación por tabla de finales (Syzygy) documentada; citar la fuente.

## 8. Pruebas obligatorias

- Marco: Vitest (unidad) + Playwright (integración/E2E).
- Suite de corrección de reglas: partidas históricas reales en PGN deben
  reproducirse jugada a jugada sin error.
- Suite del motor: en CI no se ejecuta el WASM completo; se prueban los
  adaptadores con un motor falso que respeta UCI, y la integración real se
  verifica con prueba de humo en despliegue de vista previa.
- Nunca marcar una función de ajedrez como "terminada" sin pruebas que la cubran.
