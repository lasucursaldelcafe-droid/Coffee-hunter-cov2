# Checklist — Publicar Colombia Green Coffee en la web

## Estado actual

- [x] Código en `main`: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2
- [x] CI automático (typecheck, lint, build) — **verde**
- [x] Workflows de deploy configurados
- [ ] **URL pública activa** — requiere conectar Vercel (1 paso, ~3 min)

## Paso 1 — Publicar en Vercel (recomendado)

[![Deploy con Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flasucursaldelcafe-droid%2FCoffee-hunter-cov2&project-name=colombia-green-coffee&env=ENCRYPTION_KEY&envDescription=Genera%20con%20npm%20run%20setup)

1. Clic en el botón de arriba (o abre https://vercel.com/new/clone?repository-url=https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2)
2. Autoriza GitHub → Importa el repo
3. Framework: **Next.js** (auto)
4. Variables de entorno mínimas:
   - `ENCRYPTION_KEY` → genera con `npm run setup` localmente
   - `MAIN_EMAIL` → `lasucursaldelcafe@gmail.com`
5. **Deploy** → obtienes URL tipo `colombia-green-coffee.vercel.app`

## Paso 2 — Base de datos Turso (producción)

```bash
turso db create colombia-green-coffee
turso db tokens create colombia-green-coffee
```

Añade en Vercel:
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

## Paso 3 — Deploy automático en cada push (opcional)

En GitHub → Settings → Secrets → Actions:

| Secret | Valor |
|--------|-------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Vercel → Team → Settings |
| `VERCEL_PROJECT_ID` | Proyecto → Settings |

Tras esto, cada `git push` a `main` publica automáticamente.

## Paso 4 — Verificar

```bash
curl https://TU-URL.vercel.app/api/health
```

Respuesta esperada: `{"status":"ok","service":"colombia-green-coffee",...}`

## Enlaces

| Recurso | URL |
|---------|-----|
| Repo | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2 |
| Actions | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/actions |
| Guía completa | [docs/04-GITHUB-AUTOMATION.md](docs/04-GITHUB-AUTOMATION.md) |
