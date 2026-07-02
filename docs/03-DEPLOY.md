# Deploy — Colombia Green Coffee

## Vercel (recomendado)

1. Importar repo: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2
2. Rama: `cursor/colombia-green-coffee-987d` (o `main` tras merge)
3. Framework: Next.js (auto-detectado)

### Variables de entorno en Vercel

```
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
MAIN_EMAIL=lasucursaldelcafe@gmail.com
ENCRYPTION_KEY=<generada con npm run setup>
```

### Turso (tier gratuito)

1. Crear base en https://turso.tech
2. `turso db create colombia-green-coffee`
3. `turso db tokens create colombia-green-coffee`
4. Copiar URL y token a Vercel

## Local

```bash
npm run setup
npm run db:init
npm run dev
```

## CI

GitHub Actions en `.github/workflows/ci.yml`:
- `npm ci` → `npm run typecheck` → `npm run lint` → `npm run build`

## Firebase (opcional, patrón feria-cafe)

Proyecto existente: `la-sucursal-del-cafe`

```bash
npx firebase deploy --only hosting
```
