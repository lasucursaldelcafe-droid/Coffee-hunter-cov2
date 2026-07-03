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
```

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
