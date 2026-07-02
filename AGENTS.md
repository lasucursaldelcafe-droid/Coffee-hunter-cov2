# Colombia Green Coffee — Guía para agentes IA

<!-- BEGIN:nextjs-agent-rules -->
## Next.js 16

Este proyecto usa **Next.js 16** con cambios respecto a versiones anteriores. Antes de escribir código, revisa `node_modules/next/dist/docs/` si hay dudas sobre APIs o convenciones.
<!-- END:nextjs-agent-rules -->

## Repositorio y ecosistema

| Recurso | URL |
|---------|-----|
| **Este repo** | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2 |
| **PR activo** | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/pull/1 |
| **Rama de trabajo** | `cursor/colombia-green-coffee-987d` |
| **Empresario Virtual** (patrón stack) | https://github.com/lasucursaldelcafe-droid/empresario-virtual |
| **Feria Café** (formularios + Firebase) | https://github.com/lasucursaldelcafe-droid/feria-cafe-inscripcion |
| **Más Café web** (Vercel + wallet) | https://github.com/lasucursaldelcafe-droid/WEb-mas-cafe |

## Stack (alineado con empresario-virtual)

- Next.js 16 App Router + TypeScript strict
- Tailwind CSS v4
- Drizzle ORM + SQLite local / Turso en producción
- Zod para validación de APIs
- Vercel para deploy

## Estructura

```
src/
├── app/           # Páginas y API routes
├── components/    # UI reutilizable
├── lib/
│   ├── db/        # Drizzle schema + conexión dual SQLite/Turso
│   ├── validations/  # Esquemas Zod
│   └── stores/    # Lógica de negocio (registro tiendas)
docs/              # Documentación numerada
scripts/           # setup, db:init, health-check
```

## Convenciones de código

1. **Validación**: toda API pública valida entrada con Zod (`src/lib/validations/`)
2. **Lógica de negocio**: en `src/lib/` — las rutas API deben ser delgadas
3. **Base de datos**: usar `initDatabase()` antes de queries; no JSON en disco
4. **Idioma UI**: español; nombres de código en inglés
5. **No inline imports** — imports al inicio del archivo

## Scripts clave

```bash
npm run setup      # Genera .env.local + ENCRYPTION_KEY
npm run db:init    # Crea tablas SQLite
npm run dev        # Desarrollo local
npm run build      # Build producción
npm run typecheck  # Verificación TypeScript
npm run health-check  # Requiere servidor en :3000
```

## Referencia de diseño

Inspirado en [Colombian Coffee Hunter](https://www.colombiancoffeehunter.com/es):
paleta crema `#f7e9e0`, café `#68190e`, verde `#2d5a27`.
