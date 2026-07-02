# Checklist — Publicar Colombia Green Coffee en la web

## Estado actual

- [x] Código en `main`
- [x] CI automático en cada push
- [x] **Deploy automático a GitHub Pages** (rama `gh-pages` en cada push a `main`)
- [ ] Vercel (opcional, para API + base de datos Turso)

## URL pública (automática)

Tras el push a `main`, GitHub Actions compila y publica en la rama `gh-pages`:

**https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/**

Ver progreso: https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/actions/workflows/deploy-github-pages.yml

## Qué se despliega automáticamente

| Workflow | Trigger | Destino |
|----------|---------|---------|
| `deploy-github-pages.yml` | push `main` | GitHub Pages (URL pública) |
| `ci.yml` | push / PR | Validación |
| `deploy-vercel.yml` | push `main` | Vercel (si hay secrets) |

## Formularios en GitHub Pages

En hosting estático, el formulario de tiendas usa:
1. Google Sheets (`NEXT_PUBLIC_SHEETS_WEB_APP_URL`) si está configurado
2. `localStorage` como respaldo local

Para API completa con base de datos → conectar Vercel + Turso.

## Vercel (opcional, servidor completo)

[![Deploy con Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flasucursaldelcafe-droid%2FCoffee-hunter-cov2&project-name=colombia-green-coffee)

Secrets en GitHub para deploy automático a Vercel:
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Verificar

```bash
curl -sI https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | head -1
```
