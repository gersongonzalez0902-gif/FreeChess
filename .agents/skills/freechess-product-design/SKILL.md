---
name: freechess-product-design
description: Identidad visual, filosofía, arquitectura de navegación, criterios UX y convenciones de diseño de FreeChess. Usar SIEMPRE que se diseñen o modifiquen pantallas, componentes, temas, modo claro/oscuro o cualquier superficie visible de la aplicación.
---

# FreeChess — Diseño de producto

## 1. Filosofía (innegociable)

- **Todo el ajedrez. Una sola plataforma. Gratis para todos.**
- Todas las herramientas son gratuitas: sin planes premium, sin funciones
  bloqueadas, sin límites artificiales, sin publicidad intrusiva.
- La gamificación motiva pero NUNCA bloquea el acceso a herramientas.
- La calidad funcional manda sobre la cantidad de botones: un botón que no
  funciona es un defecto grave; no se entrega nada sin funcionalidad real.
- Todo debe funcionar como un ecosistema: jugar → guardar → analizar → detectar
  debilidades → generar ejercicios → actualizar el plan diario → recomendar
  lecciones → volver a medir. Ese ciclo es el corazón del producto.

## 2. Identidad visual

- **Color de identidad: verde profundo** (paleta base de trabajo:
  `--fc-green-950 #07331f` a `--fc-green-300 #8fd6b4`; acento
  `--fc-accent #35b57a`; verificar contraste WCAG AA en cada combinación).
- Superficies oscuras elegantes por defecto en escritorio + modo claro
  completo; ambos modos son de primera clase (mismo componente, dos paletas).
- Tipografía moderna, jerarquía fuerte, mucho espacio en blanco.
- El **tablero es el protagonista**: ninguna decoración compite con él.
- Nada de plantilla SaaS genérica ni muros de tarjetas repetidas: identidad
  reconocible propia, sin clonar Lichess ni Chessigma.
- Animaciones cuidadas y discretas; SIEMPRE respetar
  `prefers-reduced-motion` (desactivar animaciones no esenciales).
- Iconografía consistente (un solo set de iconos).
- El idioma inicial de la interfaz es español, con textos centralizados para
  internacionalización futura (ningún string suelto en componentes).

## 3. Navegación (arquitectura de la información)

Secciones fijas del producto:

`Inicio · Jugar · Analizar · Entrenar · Aperturas · Aprender · Herramientas · Estadísticas · Mi perfil · Ajustes`

- Escritorio: navegación lateral colapsable.
- Móvil: navegación inferior (máx. 5 destinos visibles) + menú completo.
- En herramientas de tablero, diseño mobile-first: el tablero primero,
  controles al pulgar, paneles secundarios en hojas deslizables (sheets).
- La pantalla de inicio (dashboard) muestra: saludo, resumen de actividad,
  acceso rápido a jugar, plan de entrenamiento de hoy, progreso, últimas
  partidas y recomendaciones. Sin saturar: entender la app debe tomar segundos.

## 4. Estados y microdetalle (obligatorios en toda pantalla)

Toda superficie interactiva debe definir:

1. Estado hover y focus visible (accesible por teclado, anillo de foco claro).
2. Estado de carga (skeleton, no spinners infinitos).
3. Estado vacío útil (explica qué habrá aquí y cómo generarlo).
4. Estado de error recuperable (mensaje claro + acción de reintento).
5. Mensaje de éxito en acciones destructivas o importantes.
6. Tooltips en iconos sin texto.
7. Transiciones cortas (150–250 ms) solo en propiedades transform/opacity.

Sonidos: opcionales, apagados por defecto, con volumen independiente por
categoría (movimientos, capturas, fin de partida, interfaz).

## 5. Accesibilidad (criterios de aceptación)

- Contraste AA mínimo en todo texto y controles.
- Navegación completa por teclado (tablero incluido: selección de casilla con
  Enter, movimiento con flechas, anuncio de jugada para lectores de pantalla).
- Etiquetas `aria` en controles de iconos; `role` y estados correctos.
- Objetivos táctiles ≥ 44 px.
- El tablero debe ser usable con lector de pantalla (anunciar jugada,
  resultado y evaluación esencial).

## 6. Componentes y convenciones

- Sistema de diseño propio en `packages/ui` (botones, entradas, diálogos,
  hojas, pestañas, toasts, tarjetas, barras de evaluación, chips de temas).
- Tokens de diseño como variables CSS (colores, espaciado, radios, sombras,
  tipografía) definidos una vez y consumidos por Tailwind.
- Denominación: componentes `PascalCase`, hooks `useX`, utilidades `camelCase`.
- Copys en español claro y cálido, tuteo, sin tecnicismos sin explicar la
  primera vez (ej. "PGN (el formato estándar para guardar partidas").
- Los términos de ajedrez usan la nomenclatura española oficial
  ("tablas", "enroque", "captura al paso", "ahogado").
- Números y fechas localizados; evaluaciones en peones con 2 decimales y
  mates como "Mate en 3".

## 7. Lo que FreeChess NO es

- No hay multijugador online ni matchmaking: no diseñar flujos que lo sugieran
  ("Jugar" siempre significa bots o dos personas en el mismo dispositivo).
- No hay chat, torneos online ni salas en tiempo real.
- No diseñar pantallas de pagos, planes ni muros de suscripción.
- No pedir registro obligatorio para probar: las funciones básicas se usan como
  invitado y el registro solo sirve para sincronizar el progreso.
