# Colombia Green Coffee — Guía para agentes IA

<!-- BEGIN:nextjs-agent-rules -->
## Next.js 16

Este proyecto usa **Next.js 16** con cambios respecto a versiones anteriores. Antes de escribir código, revisa `node_modules/next/dist/docs/` si hay dudas sobre APIs o convenciones.
<!-- END:nextjs-agent-rules -->

## Ecosistema La Sucursal del Café

**Mapa completo:** [`docs/00-ECOSISTEMA.md`](docs/00-ECOSISTEMA.md)

| Proyecto | Repo | Rol |
|----------|------|-----|
| **La Sucursal** (marca) | Firebase `la-sucursal-del-cafe` | Identidad + contacto central |
| **Empresario Virtual** | [empresario-virtual](https://github.com/lasucursaldelcafe-droid/empresario-virtual) | 8 agentes IA microempresas |
| **Más Café** | [WEb-mas-cafe](https://github.com/lasucursaldelcafe-droid/WEb-mas-cafe) | Web + wallet fidelización |
| **Feria Café** | [feria-cafe-inscripcion](https://github.com/lasucursaldelcafe-droid/feria-cafe-inscripcion) | Inscripciones eventos |
| **Colombia Green Coffee** | **este repo** | Seguimiento café verde / marketplace |
| **Programa Operativo** | [Programa-de-logistca](https://github.com/lasucursaldelcafe-droid/Programa-de-logistca) | Logística empresarial |

### Setup de todo el ecosistema (PC del usuario)

```powershell
copy .env.ecosystem.example C:\Users\LENOVO\Projects\.env.ecosystem.local
.\scripts\ecosystem\setup-ecosystem.ps1
```

```bash
npm run setup:ecosystem
npm run verify:ecosystem
```

Manifest machine-readable: `scripts/ecosystem/manifest.json`

## Este repositorio

| Recurso | URL |
|---------|-----|
| **GitHub** | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2 |
| **GitHub Pages** | https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ |
| **Vercel** | https://colombia-green-coffee.vercel.app (tras `setup:all`) |
| **Rama principal** | `main` |

## Stack (alineado con empresario-virtual)

- Next.js 16 App Router + TypeScript strict
- Tailwind CSS v4
- Drizzle ORM + SQLite local / Turso en producción
- Zod para validación de APIs
- Vercel + GitHub Pages para deploy

## Estructura

```
src/
├── app/           # Páginas y API routes
├── components/    # UI reutilizable
├── lib/
│   ├── db/        # Drizzle schema + conexión dual SQLite/Turso
│   ├── validations/  # Esquemas Zod
│   └── stores/    # Lógica de negocio (registro tiendas)
docs/              # Documentación numerada (00 = ecosistema)
scripts/
├── setup-all.mjs  # Setup solo este repo
└── ecosystem/     # Setup multi-proyecto
```

## Convenciones de código

1. **Validación**: toda API pública valida entrada con Zod (`src/lib/validations/`)
2. **Lógica de negocio**: en `src/lib/` — las rutas API deben ser delgadas
3. **Base de datos**: usar `initDatabase()` antes de queries; no JSON en disco
4. **Idioma UI**: español; nombres de código en inglés
5. **No inline imports** — imports al inicio del archivo

## Scripts clave

```bash
npm run setup           # .env.local + ENCRYPTION_KEY (este repo)
npm run setup:all       # Turso + Vercel + GitHub + deploy (este repo)
npm run setup:ecosystem # Todos los proyectos del ecosistema
npm run verify:ecosystem
npm run db:init
npm run dev
npm run deploy:auto
```

## Cursor Cloud Agents

Tras `setup:ecosystem` o `setup:all`, pegar `cursor-secrets-ecosystem.local.txt` en  
https://cursor.com/dashboard → Cloud Agents → Secrets

## Referencia de diseño

Inspirado en [Colombian Coffee Hunter](https://www.colombiancoffeehunter.com/es):
paleta crema `#f7e9e0`, café `#68190e`, verde `#2d5a27`.
