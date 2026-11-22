# @freechess/db

Esquemas Drizzle ORM, cliente Neon PostgreSQL y migraciones versionadas
(`drizzle-kit generate` / `migrate`). **Implementado desde la Fase 1.**

- Diseño completo: `docs/DATABASE.md`.
- Normas: skill `.agents/skills/freechess-data-engineering`.
- Esquemas lógicos: auth, core, analysis, training, openings, learn, puzzles.
  - Fase 1: `auth` (user, session, account, verification — Better Auth,
    ADR-009) y `core` (profiles, user_preferences).
  - Fases siguientes: nuevas migraciones por fase (nunca se edita una
    migración aplicada).

Uso (los scripts se lanzan desde la raíz del monorepo):

```bash
pnpm db:generate   # generar SQL versionado en ./migrations
pnpm db:migrate    # aplicar en Neon (requiere DATABASE_URL)
pnpm db:studio     # explorar la base
```

Las migraciones NUNCA se ejecutan durante el build de Vercel (ADR-008).
