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
