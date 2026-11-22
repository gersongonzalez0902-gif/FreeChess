# @freechess/engine

Gestor de Stockfish en Web Worker: API tipada (analyse/bestMove/setLevel),
protocolo UCI, niveles de fuerza reales (Skill Level, UCI_LimitStrength,
UCI_Elo) y capa de personalidades de bots que pondera candidatos MultiPV
validando siempre la legalidad con chessops. Se desarrolla a partir de la
**Fase 2** (juego) y se profundiza en la **Fase 3** (analizador).

Está PROHIBIDO simular el motor: ver
`.agents/skills/freechess-chess-engineering`.
