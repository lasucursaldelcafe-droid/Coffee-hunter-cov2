# Arquitectura — Colombia Green Coffee

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 16, React 19, Tailwind v4 |
| API | Route Handlers (`src/app/api/`) |
| Validación | Zod 4 |
| Base de datos | Drizzle ORM + SQLite (local) / Turso (prod) |
| Deploy | Vercel (`vercel.json`, región `iad1`) |
| Auth (futuro) | Google OAuth (patrón empresario-virtual) |
| Formularios backup | Google Sheets via Apps Script (patrón feria-cafe) |

## Flujos principales

### Inscripción de coffee shop

```
Usuario → /crear-tienda → POST /api/tiendas
  → Zod validate → registerCoffeeStore()
  → Drizzle insert coffee_stores → respuesta con slug
```

### Catálogo (fase actual)

Datos estáticos en `src/lib/data.ts`. Futuro: tabla `products` en Drizzle.

## Base de datos

### Tablas

- `coffee_stores` — Inscripciones del marketplace
- `logistics_quotes` — Cotizaciones logísticas (futuro)

### Modo dual (patrón empresario-virtual)

- **Local**: `better-sqlite3` → `./data/colombia-green-coffee.db`
- **Producción**: `@libsql/client` con `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`

## Repos relacionados

| Repo | Qué aportamos |
|------|----------------|
| empresario-virtual | Drizzle, Turso, Zod, scripts setup/db |
| feria-cafe-inscripcion | Formularios, Sheets, Firebase hosting |
| WEb-mas-cafe | Vercel config, health-check, CI |
| Programa-de-logistca | Dominio logístico (por desarrollar) |

## Roadmap técnico

1. ✅ Landing + páginas + formulario tiendas
2. ✅ Drizzle + Zod + API con BD
3. ⬜ Google OAuth para panel de tienda
4. ⬜ Integración Sheets para backup de formularios
5. ⬜ Panel admin (`/admin`)
6. ⬜ Productos en BD + carrito
