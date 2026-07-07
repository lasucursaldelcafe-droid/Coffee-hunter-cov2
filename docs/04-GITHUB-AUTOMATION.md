# Automatización GitHub + Deploy Web

Guía para publicar **Colombia Green Coffee** en la web con CI/CD automático.

## Flujo automático

```
Push a rama cursor/* → CI valida → Preview Vercel (si hay secrets)
PR listo (no draft)  → CI pasa → Auto-merge a main
Push a main          → CI + Deploy Vercel producción
```

## Workflows incluidos

| Archivo | Disparador | Acción |
|---------|------------|--------|
| `ci.yml` | push / PR | typecheck, lint, db:init, build |
| `deploy-vercel.yml` | push `main` | Build + deploy producción |
| `deploy-preview.yml` | PR a `main` | Preview URL en comentario del PR |
| `auto-merge-cursor-prs.yml` | PR `cursor/*` | Merge automático tras CI verde |

## Opción A — Vercel (recomendado, 5 minutos)

1. Abre https://vercel.com/new
2. Importa: `lasucursaldelcafe-droid/Coffee-hunter-cov2`
3. Framework: **Next.js** (auto-detectado)
4. Variables de entorno en Vercel:

```
DATABASE_URL=./data/colombia-green-coffee.db
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
ENCRYPTION_KEY=<npm run setup>
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
MAIN_EMAIL=lasucursaldelcafe@gmail.com
```

5. Deploy → obtienes URL pública al instante.

### Secrets para GitHub Actions (deploy automático)

En https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/settings/secrets/actions:

| Secret | Dónde obtenerlo |
|--------|-----------------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Vercel → Team Settings → General |
| `VERCEL_PROJECT_ID` | Proyecto → Settings → General |
| `TURSO_DATABASE_URL` | https://turso.tech → tu DB |
| `TURSO_AUTH_TOKEN` | Turso → Create Token |
| `ENCRYPTION_KEY` | `npm run setup` (local) |
| `NEXT_PUBLIC_APP_URL` | URL final de Vercel |

Sin estos secrets, **CI sigue funcionando**; solo se omite el deploy.

## Opción B — Deploy manual local

```bash
npm run setup
npm run db:init
npm run ci:validate
npm run deploy:auto   # requiere VERCEL_TOKEN
```

## Opción C — Turso (base de datos en producción)

```bash
# Instalar Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

turso db create colombia-green-coffee
turso db tokens create colombia-green-coffee
```

Copia URL y token a Vercel y GitHub Secrets.

## Verificar después del deploy

```bash
curl https://TU-URL.vercel.app/api/health
# → {"status":"ok","service":"colombia-green-coffee",...}
```

## Enlaces útiles

- Repo: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2
- Actions: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/actions
- PR: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/pull/1
