# Fix pendiente — Programa-de-logistca

El bot no tiene permiso de push en ese repo. Aplica estos cambios **en el repo Programa-de-logistca**:

## 1. Activar GitHub Pages (1 clic)

GitHub → [Programa-de-logistca Settings → Pages](https://github.com/lasucursaldelcafe-droid/Programa-de-logistca/settings/pages)

- Source: **Deploy from a branch**
- Branch: `gh-pages` / `(root)`
- Save

URL resultante: https://lasucursaldelcafe-droid.github.io/Programa-de-logistca/

## 2. Corregir workflows CI

Copia los archivos de `docs/fixes-externos/Programa-de-logistca/.github/workflows/` a tu clone local y push:

```powershell
cd C:\Users\LENOVO\Projects\Programa-de-logistca
# Copiar los 3 yml desde Coffee-hunter-cov2/docs/fixes-externos/...
git add .github/workflows/
git commit -m "fix(ci): workflows válidos sin secrets en job-level if"
git push origin main
```

## 3. Secrets en ese repo (no en Coffee Hunter)

Settings → Secrets → Actions:

- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- `TURSO_PLATFORM_TOKEN`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

Luego: `npm run setup:all` **dentro de Programa-de-logistca**.
