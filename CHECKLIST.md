# Checklist — Colombia Green Coffee (este repo)

> Empresario Virtual y Programa Operativo tienen **repos propios**. Ver `docs/00-REPOS-INDEPENDIENTES.md`.

## Estado Coffee Hunter

- [x] Código en `main`
- [x] GitHub Pages live
- [ ] Vercel + Turso → `npm run setup:all` en **este repo**

**URL:** https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/

## Setup (solo Coffee Hunter)

```powershell
cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
npm run setup:all
npm run dev
```

## Otras plataformas (repos separados)

| Plataforma | Repo | Setup | Live |
|------------|------|-------|------|
| Empresario Virtual | empresario-virtual | `npm run deploy:auto` | ✅ empresario-virtual.vercel.app |
| Programa Operativo | Programa-de-logistca | `npm run setup:all` | ⏸ Activar Pages |
| Más Café | WEb-mas-cafe | ver README | ✅ w-eb-mas-cafe.vercel.app |

## Verificar

```bash
npm run verify:ecosystem
```

## Limpieza PC

Ver `docs/08-LIMPIEZA-PC.md`
