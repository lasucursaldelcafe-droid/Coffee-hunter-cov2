# Colombia Green Coffee — Guía para agentes IA

**Este repo es SOLO Colombia Green Coffee (Coffee Hunter).**  
No incluye Empresario Virtual ni Programa Operativo — cada uno tiene su propio repositorio.

| Plataforma | Repo |
|------------|------|
| **Este proyecto** | Coffee-hunter-cov2 |
| Empresario Virtual | [empresario-virtual](https://github.com/lasucursaldelcafe-droid/empresario-virtual) |
| Programa Operativo (logística) | [Programa-de-logistca](https://github.com/lasucursaldelcafe-droid/Programa-de-logistca) |

Índice de repos: [`docs/00-REPOS-INDEPENDIENTES.md`](docs/00-REPOS-INDEPENDIENTES.md)

<!-- BEGIN:nextjs-agent-rules -->
## Next.js 16

Este proyecto usa **Next.js 16**. Antes de escribir código, revisa `node_modules/next/dist/docs/` si hay dudas.
<!-- END:nextjs-agent-rules -->

## URLs

| Entorno | URL |
|---------|-----|
| GitHub Pages (estático) | https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ |
| Vercel (API + Turso) | https://colombia-green-coffee.vercel.app (tras `setup:all`) |
| Rama | `main` |

## Stack

- Next.js 16 App Router + TypeScript strict
- Tailwind CSS v4
- Drizzle ORM + SQLite local / Turso producción
- Zod · GitHub Pages + Vercel

## Setup (solo este repo)

```bash
npm install
npm run setup:all    # Turso + Vercel + GitHub secrets
npm run db:init
npm run dev
```

## Scripts

```bash
npm run setup:all       # Deploy completo
npm run verify:ecosystem  # Verifica URLs (informativo)
npm run deploy:auto
npm run ci:validate
```

## Nota sobre `/logistica`

La página `/logistica` es **contenido marketing** de exportación internacional de café dentro de este sitio.  
La **app de logística empresarial** vive en el repo **Programa-de-logistca** — no modificarla desde aquí.

## Diseño

Paleta: crema `#f7e9e0`, café `#68190e`, verde `#2d5a27` (inspirado en colombiancoffeehunter.com).

## Cursor Cloud specific instructions

- **Solo dependencias**: el update script (`npm install`) ya deja el entorno listo. Node 22 y `better-sqlite3` compilan sin pasos extra.
- **Base de datos local**: por defecto usa SQLite en `./data/colombia-green-coffee.db` (gitignored). No requiere Turso ni Docker para desarrollo. El esquema se **autoinicializa** en cada request vía `initDatabase()` (`src/lib/db/index.ts`), así que `npm run db:init` es opcional. Turso solo se activa si defines `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`.
- **`.env.local` no es obligatorio**: no hay variables requeridas en tiempo de ejecución. `ENCRYPTION_KEY` solo aparece en scripts/docs de deploy, no en `src/`. `npm run setup` (copia `.env.example` y genera `ENCRYPTION_KEY`) es opcional.
- **Correr la app**: `npm run dev` (Next.js 16 + Turbopack) en http://localhost:3000. Comandos estándar de verificación en `package.json`: `npm run lint`, `npm run typecheck`. `npm run lint` reporta warnings de `<img>` esperados (0 errores).
- **No requieren credenciales** los scripts `setup:*` / `deploy:*` / `verify:ecosystem` para desarrollo local; son para deploy a Turso/Vercel/GitHub.
- **Smoke test rápido**: `curl localhost:3000/api/health` y crear tienda con `POST /api/tiendas` (ver `src/lib/validations/store.ts` para el payload). Las tiendas se listan en `/tiendas`.
