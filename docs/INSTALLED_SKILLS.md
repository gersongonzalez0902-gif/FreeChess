# INSTALLED_SKILLS — Habilidades del agente para FreeChess

> Registro de skills verificadas (Fase 0). Fuente de verdad de qué
> instrucciones reutilizables puede usar el agente que desarrolla este
> repositorio. Nada está "instalado" si no aparece aquí con ubicación real.

## 1. Entorno del agente (inspección de la Fase 0)

- Agente: Z.ai (GLM) con acceso a sandbox Linux, Node 24, npm 11, git.
- Gestor de Agent Skills disponible: CLI `npx skills` (skills.sh) — genera
  `skills-lock.json` con repositorio, commit y hash de cada skill instalada.
- Ubicación de skills externas en el proyecto: `.claude/skills/` (elección
  del CLI al detectar el entorno).
- Skills propias del proyecto: `.agents/skills/` (formato Agent Skills
  estándar: carpeta con `SKILL.md` y frontmatter `name` + `description`).
- Sin duplicados: cada skill aparece en una única ubicación.

## 2. Skills externas (7) — instaladas y verificadas

Instaladas con `npx skills add <repo> --skill <nombre>` desde el directorio
raíz del proyecto. Bloqueo de versiones en `skills-lock.json` (repositorio,
commit y hash exactos de cada una).

| # | Skill | Origen | Propósito | Estado |
|---|---|---|---|---|
| 1 | `frontend-design` | github.com/anthropics/skills | Interfaces distintivas y de calidad profesional; evitar diseños genéricos de IA | Instalada y verificada (`.claude/skills/frontend-design/SKILL.md`) |
| 2 | `vercel-react-best-practices` | github.com/vercel-labs/agent-skills | Buenas prácticas React/Next.js: rendimiento, renderizado, carga de datos | Instalada y verificada (`.claude/skills/vercel-react-best-practices/`) |
| 3 | `web-design-guidelines` | github.com/vercel-labs/agent-skills | Revisión de accesibilidad, navegación, formularios, UX, responsive | Instalada y verificada (`.claude/skills/web-design-guidelines/`) |
| 4 | `writing-plans` | github.com/obra/superpowers | Planes de implementación específicos y división de tareas | Instalada y verificada (`.claude/skills/writing-plans/`) |
| 5 | `test-driven-development` | github.com/obra/superpowers | Ciclo Red-Green-Refactor; pruebas antes del código | Instalada y verificada (`.claude/skills/test-driven-development/`) |
| 6 | `systematic-debugging` | github.com/obra/superpowers | Investigación de errores por causa raíz, no parches superficiales | Instalada y verificada (`.claude/skills/systematic-debugging/`) |
| 7 | `verification-before-completion` | github.com/obra/superpowers | Verificar que algo funciona de verdad antes de declararlo terminado | Instalada y verificada (`.claude/skills/verification-before-completion/`) |

Cómo restaurarlas en un clon nuevo (restauración reproducible):

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/vercel-labs/agent-skills --skill react-best-practices
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/obra/superpowers --skill writing-plans
npx skills add https://github.com/obra/superpowers --skill test-driven-development
npx skills add https://github.com/obra/superpowers --skill systematic-debugging
npx skills add https://github.com/obra/superpowers --skill verification-before-completion
```

(El commit exacto de cada una queda fijado en `skills-lock.json`.)

## 3. Skills propias de FreeChess (3) — parte del repositorio

Ubicación: `.agents/skills/`. Se activan cuando el agente trabaja en las
áreas correspondientes; sus reglas son vinculantes para el desarrollo.

| Skill | Ubicación | Cuándo usarla |
|---|---|---|
| `freechess-chess-engineering` | `.agents/skills/freechess-chess-engineering/SKILL.md` | SIEMPRE que se programe lógica de ajedrez: tablero, motor, analizador, puzzles, repertorios, finales |
| `freechess-product-design` | `.agents/skills/freechess-product-design/SKILL.md` | SIEMPRE que se diseñen o modifiquen pantallas, componentes, temas o UX |
| `freechess-data-engineering` | `.agents/skills/freechess-data-engineering/SKILL.md` | SIEMPRE que se diseñen esquemas, migraciones, importadores, consultas o sincronización |

## 4. Verificación realizada (26.5 del prompt maestro)

1. Archivos verificados: las 7 externas tienen `SKILL.md` presente y legible
   (comprobado por listado de directorio); las 3 propias se crearon y
   revisaron en la Fase 0.
2. Descripciones revisadas: cada `SKILL.md` expone propósito y ámbito.
3. Disponibilidad: en este entorno las skills se consultan como documentos
   de instrucciones por el agente (lectura directa de `SKILL.md`); en
   entornos Claude Code se cargan automáticamente desde `.claude/skills`.
4. Sin duplicados: ninguna skill aparece dos veces (lock + carpetas únicas).
5. Todas aportan valor real: no se instaló ninguna skill adicional "por si acaso".
6. Procedencia registrada: `skills-lock.json` (externas) y este documento.

## 5. Reglas de mantenimiento

- Toda skill nueva (externa o propia) se registra aquí y, si es externa, en
  `skills-lock.json`.
- Si una skill deja de aportar valor, se elimina del lock y de su carpeta, y
  se anota aquí el motivo.
- Las skills propias se actualizan con el proyecto (son código del repositorio).
