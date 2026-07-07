# Pasos finales — Colombia Green Coffee

**Solo este repositorio.** Para Empresario Virtual o Programa Operativo, ve a su repo.

## 1. Credenciales en `.env.local`

```powershell
cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
copy .env.example .env.local
notepad .env.local
```

| Variable | Dónde |
|----------|-------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `TURSO_PLATFORM_TOKEN` | https://turso.tech/app → Settings → Tokens |
| `RESEND_API_KEY` | https://resend.com/api-keys → Create API Key |
| `EMAIL_FROM` | Remitente verificado en Resend, ej. `Colombia Green Coffee <onboarding@tudominio.com>` |

## 1b. Email de bienvenida (Resend)

1. Crea cuenta en [resend.com](https://resend.com) y verifica tu dominio (o usa `onboarding@resend.dev` solo en pruebas).
2. Añade a `.env.local`:

```env
RESEND_API_KEY=re_...
EMAIL_FROM=Colombia Green Coffee <onboarding@tudominio.com>
MAIN_EMAIL=lasucursaldelcafe@gmail.com
```

3. Sincroniza a GitHub y Vercel:

```powershell
npm run setup:tokens
```

O manualmente: GitHub → Settings → Secrets → `RESEND_API_KEY` y `EMAIL_FROM`, luego Actions → **Sincronizar env Vercel** → Run workflow.

## 2. Deploy completo

```powershell
npm run setup:all
```

## 3. Desarrollo local

```powershell
npm run db:init
npm run dev
```

http://localhost:3000/api/health → `{"status":"ok",...}`

## 4. Verificar

```powershell
npm run verify:ecosystem
curl -sI https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | findstr HTTP
curl -s https://colombia-green-coffee.vercel.app/api/health
```

## 5. Si falla el workflow "Publicar en Vercel"

| Error | Solución |
|-------|----------|
| `VERCEL_PROJECT_ID apunta a 'empresario-virtual'` | Los secrets de GitHub son del repo EV, no de Coffee Hunter. Ejecuta `npm run setup:vercel` y luego `npm run setup:github-secrets` **desde este repo**. |
| `Vercel CLI version is outdated` | Ya corregido en el workflow (usa `vercel@latest`). Haz `git pull`. |
| Vercel omitido (notice) | Falta `VERCEL_TOKEN`, `VERCEL_ORG_ID` o `VERCEL_PROJECT_ID` en GitHub Secrets. |

---

## Empresario Virtual (repo aparte)

```powershell
cd C:\Users\LENOVO\Projects\empresario-virtual
npm run deploy:auto
```

Live: https://empresario-virtual.vercel.app

## Programa Operativo (repo aparte)

```powershell
cd C:\Users\LENOVO\Projects\Programa-de-logistca
npm run setup:all
```

Activar Pages: GitHub → Settings → Pages → branch `gh-pages` → root

---

Ver también: [`08-LIMPIEZA-PC.md`](./08-LIMPIEZA-PC.md)
