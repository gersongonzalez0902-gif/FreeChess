# import-puzzles

Importador por lotes de la base de puzzles de Lichess (CC0,
https://database.lichess.org/ — `lichess_db_puzzle.csv.zst`).

Se implementa en la **Fase 4** con estas reglas críticas:

1. Streaming: descomprimir zstd y procesar el CSV línea a línea (nunca en
   memoria completa).
2. Validar cada fila (FEN legal, solución legal, rating/temas plausibles).
3. Deduplicar por `puzzle_id` (on conflict do nothing).
4. Lotes de 500-2000 filas en transacción, con log de errores y reanudación
   desde el último lote confirmado.
5. NUNCA se ejecuta durante el build de Vercel.
6. Empezar con una selección (200k-500k puzzles) midiendo tamaño y
   rendimiento en Neon antes de escalar.
7. Índices (rating btree, themes GIN, popularity) se crean DESPUÉS de la carga.

Normas: skill `.agents/skills/freechess-data-engineering`.
