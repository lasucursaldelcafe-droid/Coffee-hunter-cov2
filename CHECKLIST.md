# Checklist — Ecosistema La Sucursal del Café

## Mapa rápido

Ver [`docs/00-ECOSISTEMA.md`](docs/00-ECOSISTEMA.md) para el inventario completo.

| Proyecto | Deploy público | Setup |
|----------|----------------|-------|
| Colombia Green Coffee | ✅ [Pages](https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/) | `npm run setup:all` |
| Más Café | ✅ [Vercel](https://w-eb-mas-cafe.vercel.app) | `setup:ecosystem --project=mas-cafe` |
| Empresario Virtual | Vercel | `setup:ecosystem --project=empresario-virtual` |
| Feria Café | Firebase | Manual — ver repo |
| Programa Operativo | Pendiente | `setup:ecosystem --project=programa-operativo` |

## Un comando — todo el ecosistema

```powershell
copy .env.ecosystem.example C:\Users\LENOVO\Projects\.env.ecosystem.local
# Editar tokens: VERCEL_TOKEN, TURSO_PLATFORM_TOKEN, GOOGLE_*
.\scripts\ecosystem\setup-ecosystem.ps1
```

```bash
npm run setup:ecosystem
npm run verify:ecosystem
```

## Colombia Green Coffee (este repo)

- [x] Código en `main`
- [x] CI automático
- [x] **GitHub Pages live**
- [ ] Vercel + Turso (ejecutar `npm run setup:all` en PC con `.env.local`)

### URL pública

**https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/**

### Workflows

| Workflow | Trigger | Destino |
|----------|---------|---------|
| `deploy-github-pages.yml` | push `main` | GitHub Pages |
| `ci.yml` | push / PR | Validación |
| `deploy-vercel.yml` | push `main` | Vercel (si secrets) |

## Cursor Cloud Agents

1. Ejecutar `setup:ecosystem` o `setup:all`
2. Pegar `cursor-secrets-ecosystem.local.txt` en Cursor Dashboard
3. Conectar GitHub Integration por repo

## Verificar

```bash
npm run verify:ecosystem
curl -sI https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | head -1
```
