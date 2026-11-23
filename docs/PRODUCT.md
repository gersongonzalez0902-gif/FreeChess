# PRODUCT — FreeChess

> Definición de producto: identidad, alcance, referencias y diferenciación.

## 1. Identidad

- **Nombre:** FreeChess
- **Eslogan:** Todo el ajedrez. Una sola plataforma. Gratis para todos.
- **Categoría:** Plataforma integral de ajedrez y entrenamiento personalizado.
- **Formato:** Aplicación web progresiva (PWA) para computadoras, tablets y móviles.
- **Idioma inicial:** Español (arquitectura preparada para internacionalización).
- **Filosofía:** el ajedrez debe ser accesible para cualquier persona sin
  importar su presupuesto. Sin planes premium, sin funciones bloqueadas, sin
  límites artificiales, sin publicidad intrusiva. *El ajedrez es para todos.
  El conocimiento no debería tener una barrera de pago.*

## 2. Alcance

### FreeChess SÍ tiene

- Partidas contra bots (niveles y personalidades).
- Partidas entre dos personas en el mismo dispositivo.
- Analizador profesional (importa PGN/FEN y partidas propias).
- Revisión automática de partidas con clasificación de jugadas e informes.
- Entrenamiento táctico (puzzles CC0 de Lichess: diario, por tema, Rush, Streak).
- Woodpecker Trainer.
- Opening Trainer (repertorios con repetición espaciada).
- Blunder Fix (tus errores convertidos en ejercicios).
- Blunder Shield (advertencias pedagógicas en modos de práctica).
- Chess DNA (perfil ajedrecístico con fortalezas y debilidades).
- Supercoach (plan de entrenamiento diario personalizado).
- Maestro FreeChess (entrenador explicativo basado en reglas + motor, con
  capa de proveedores IA intercambiables opcional).
- Centro de aprendizaje (cursos y lecciones originales).
- Explorador de aperturas (ECO CC0).
- Caja de herramientas (editor FEN, visor PGN, reloj, entrenador de
  coordenadas, entrenador de finales, etc.).
- Estadísticas personales y sistema de progreso (XP, niveles, insignias,
  misiones) que motiva sin bloquear nada.

### FreeChess NO tiene

- Partidas online entre usuarios, matchmaking, salas en tiempo real.
- WebSockets, Redis, relojes sincronizados remotos, chat, torneos en vivo.
- Planes de pago ni funciones bloqueadas por suscripción.

## 3. Referencias investiggadas (Fase 0)

### Chessigma (referencia principal)

Plataforma de análisis y entrenamiento. Hallazgos verificados:

- Análisis gratuito ilimitado en el propio dispositivo con Stockfish 17 WASM
  (importa de Chess.com, Lichess o PGN; sin límites diarios).
- Game Review con grados por jugada (Brillante → Blunder), precisión global,
  gráfico de evaluación, apertura identificada y mejor jugada del motor.
- Entrenamiento: puzzles con rating, Woodpecker, Blunder Shield, Blunder
  Training, Conversion Trainer, Sparring contra bots, Opening Trainer,
  Endgame Trainer.
- Supercoach: entrenador IA que analiza 12 meses de partidas, detecta
  patrones, crea drills de los propios errores y escribe el plan diario
  (~15 min: revisar una partida, puzzle diario, drill de apertura).
- Chess DNA report, cursos de apertura, herramientas (tablero de análisis,
  editor, calculadora Elo, reloj), rachas diarias, modo claro/oscuro.
- **Diferencia clave:** Chessigma tiene planes de pago; FreeChess ofrecerá
  experiencias equivalentes o mejores, gratis.

### Lichess

- Referencia de calidad de tablero (chessground), datos abiertos (puzzles CC0,
  aperturas ECO CC0) y filosofía libre (AGPL). No se clona su identidad visual.

### Chess.com / Aimchess

- Referencias de game review premium y analíticas de mejora (ACPL,
  informes de rendimiento). FreeChess las integra sin muro de pago.

## 4. Diferenciación: el ecosistema inteligente

FreeChess no acumula herramientas sueltas: **todas trabajan juntas**.

Ciclo central: jugar contra un bot → guardar la partida → analizar con
Stockfish → detectar debilidades (ej. pierde piezas por clavadas) → registrar
el perfil (Chess DNA) → generar ejercicios específicos (Blunder Fix) →
actualizar el plan diario (Supercoach) → recomendar una lección → volver a
medir el rendimiento.

Reglas de personalización:

- El plan diario se adapta por errores reales, rating, tiempo disponible y
  objetivos; nunca es idéntico para todos.
- Se puede ignorar cualquier recomendación y usar cualquier herramienta libre.
- Sin presión por rachas: motivar, no castigar.

## 5. Metodología de revisión de partidas (documentación pública)

- **Precisión**: función monótona de la pérdida de evaluación por jugada
  (media sobre la partida), con clamp por evaluación absoluta y fase; versión
  del método guardada en cada informe.
- **Clasificación de jugadas** por diferencia de evaluación con umbrales
  dependientes del contexto: Brillante (sacrificio material que sigue siendo
  la mejor jugada), Mejor jugada, Buena, Imprecisión, Error, Blunder.
- **ACPL**: pérdida media de centipeones por jugada (solo jugadas del usuario).
- Los ratings mostrados son **estimaciones locales orientativas** (contra
  bots o puzzles), nunca ratings oficiales; se etiquetan como tales.

## 6. Audiencia y tono

- Desde principiantes absolutos hasta jugadores experimentados.
- Copys en español claro y cálido (tuteo), términos técnicos explicados la
  primera vez; nomenclatura ajedrecística española oficial.

## 7. Sostenibilidad

Se planifica la sostenibilidad técnica y económica (costes de infraestructura

casi nulos: Vercel Hobby + Neon free + cómputo en el navegador), pero jamás
se convertirá en ventajas de pago para los jugadores.
