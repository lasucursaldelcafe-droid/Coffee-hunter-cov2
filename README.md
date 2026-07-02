# Colombia Green Coffee

Plataforma web integral de café colombiano de especialidad, inspirada en [Colombian Coffee Hunter](https://www.colombiancoffeehunter.com/es).

## Enlaces GitHub

| Recurso | URL |
|---------|-----|
| **Repositorio** | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2 |
| **Código (main)** | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/tree/main |
| **GitHub Actions** | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/actions |
| **Publicar en web** | [![Deploy con Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flasucursaldelcafe-droid%2FCoffee-hunter-cov2&project-name=colombia-green-coffee) |
| **Checklist deploy** | [CHECKLIST.md](CHECKLIST.md) |

### Ecosistema La Sucursal del Café

| Repo | URL | Rol |
|------|-----|-----|
| empresario-virtual | https://github.com/lasucursaldelcafe-droid/empresario-virtual | Patrón stack (Drizzle, Turso, Zod) |
| feria-cafe-inscripcion | https://github.com/lasucursaldelcafe-droid/feria-cafe-inscripcion | Formularios + Firebase |
| WEb-mas-cafe | https://github.com/lasucursaldelcafe-droid/WEb-mas-cafe | Vercel + wallet (live: https://w-eb-mas-cafe.vercel.app) |
| Programa-de-logistca | https://github.com/lasucursaldelcafe-droid/Programa-de-logistca | Logística (en desarrollo) |

## Características

- **Catálogo de café**: café verde, tostado y maquila con puntajes SCA
- **Coffee Shop Marketplace**: inscripción para montar tu propia tienda
- **Logística internacional**: operadores de envío a más de 15 países
- **Maquila de marca**: desarrollo de marcas premium con perfiles únicos

## Stack

- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS 4
- Drizzle ORM + SQLite local / Turso en producción
- Zod para validación de APIs
- Vercel para deploy

## Desarrollo

```bash
npm install
npm run setup      # Genera .env.local
npm run db:init    # Crea tablas
npm run dev
```

Abre http://localhost:3000

## Documentación

- [`docs/01-VISION.md`](docs/01-VISION.md) — Visión del producto
- [`docs/02-ARCHITECTURE.md`](docs/02-ARCHITECTURE.md) — Arquitectura técnica
- [`docs/03-DEPLOY.md`](docs/03-DEPLOY.md) — Deploy en Vercel + Turso
- [`AGENTS.md`](AGENTS.md) — Guía para agentes IA

## Estructura

```
src/
├── app/              # Páginas + API routes
├── components/       # UI
└── lib/
    ├── db/           # Drizzle schema + conexión
    ├── validations/  # Zod schemas
    └── stores/       # Lógica de registro
```

## Despliegue

Ver [`docs/03-DEPLOY.md`](docs/03-DEPLOY.md) y [`docs/04-GITHUB-AUTOMATION.md`](docs/04-GITHUB-AUTOMATION.md).

```bash
npm run ci:validate   # Validación completa (igual que GitHub Actions)
npm run deploy:auto   # Deploy a Vercel (requiere VERCEL_TOKEN)
```

### Automatización GitHub Actions

| Workflow | Cuándo | Qué hace |
|----------|--------|----------|
| `ci.yml` | Cada push/PR | typecheck, lint, build |
| `deploy-vercel.yml` | Push a `main` | Publica en Vercel |
| `deploy-preview.yml` | PRs | URL preview en el PR |
| `auto-merge-cursor-prs.yml` | PR `cursor/*` | Merge automático |

**Actions:** https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/actions
