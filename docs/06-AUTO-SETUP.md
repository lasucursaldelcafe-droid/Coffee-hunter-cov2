# Automatización completa — setup:all y setup:ecosystem

## Ecosistema completo (todos los proyectos)

Para **Más Café**, **Empresario Virtual**, **Colombia Green Coffee**, **Programa Operativo** y más:

```powershell
copy .env.ecosystem.example C:\Users\LENOVO\Projects\.env.ecosystem.local
.\scripts\ecosystem\setup-ecosystem.ps1
```

```bash
npm run setup:ecosystem
npm run verify:ecosystem
```

Mapa de proyectos: [`00-ECOSISTEMA.md`](./00-ECOSISTEMA.md)

---

## Solo este repo — setup:all

Un solo comando configura **Turso**, **Vercel**, **GitHub Secrets**, **deploy** y genera plantilla para **Cursor Cloud Agents** en Colombia Green Coffee.

## Requisitos en tu PC

| Herramienta | Instalación |
|-------------|-------------|
| Node.js 22+ | https://nodejs.org/ |
| GitHub CLI | `winget install GitHub.cli` → `gh auth login` |
| Turso (opcional) | `curl -sSfL https://get.tur.so/install.sh \| bash` |

## Paso 1 — `.env.local` (credenciales ya guardadas)

En la raíz del proyecto, archivo `.env.local` con al menos:

```env
VERCEL_TOKEN=tu_token_vercel
TURSO_PLATFORM_TOKEN=tso_...
GITHUB_REPO=lasucursaldelcafe-droid/Coffee-hunter-cov2
TURSO_DB_NAME=colombia-green-coffee
VERCEL_PROJECT_NAME=colombia-green-coffee
```

Opcional (si ya los tienes de empresario-virtual):

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
SHEETS_WEB_APP_URL=...
```

## Paso 2 — Ejecutar automatización

### Windows (PowerShell) — recomendado

```powershell
cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
.\scripts\setup-all.ps1
```

### Node (cualquier OS)

```bash
npm install
npm run setup:all
```

### Python

```bash
python scripts/setup-all.py
```

## Qué hace `setup:all`

| Paso | Acción |
|------|--------|
| 1 | Verifica Node, npm, gh |
| 2 | Crea/valida `.env.local` + `ENCRYPTION_KEY` |
| 3 | **Turso:** crea DB `colombia-green-coffee` + token → `.env.local` |
| 4 | **Vercel:** crea/enlaza proyecto, sube env vars, guarda ORG_ID + PROJECT_ID |
| 5 | **GitHub:** `gh secret set` para todos los secrets de Actions |
| 6 | `db:init` + `ci:validate` |
| 7 | `deploy:auto` → Vercel producción |
| 8 | Genera `cursor-secrets.local.txt` para pegar en Cursor Dashboard |

## Comandos individuales

```bash
npm run setup:turso          # Solo Turso
npm run setup:vercel         # Solo Vercel
npm run setup:github-secrets # Solo GitHub Actions secrets
npm run setup:tokens         # Re-sync secrets a GitHub
npm run deploy:auto          # Solo deploy Vercel
```

## Cursor Cloud Agents

Tras `setup:all`, abre `cursor-secrets.local.txt` (no se sube a Git) y pega cada línea en:

https://cursor.com/dashboard → **Cloud Agents** → **Secrets**

Conecta GitHub en **Integrations** → repo `Coffee-hunter-cov2`, base branch `main`.

## Verificación

```bash
# GitHub Pages (automático en push main)
curl -sI https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | head -1

# Vercel API
curl -s https://colombia-green-coffee.vercel.app/api/health
```

## Push main = todo actualizado

Cada `git push origin main` dispara:

- CI validate
- GitHub Pages (sitio estático)
- Vercel deploy (si secrets configurados)

Ver: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/actions

## Solución de problemas

| Error | Solución |
|-------|----------|
| `gh auth login` | Inicia sesión como `lasucursaldelcafe-droid` |
| `TURSO_PLATFORM_TOKEN` | https://turso.tech/app → Settings → Create Token |
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| Vercel omitido en Actions | Ejecuta `npm run setup:tokens` de nuevo |
