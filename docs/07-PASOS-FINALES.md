# Pasos finales — dejar todo funcional

Ejecuta esto **una sola vez** en tu PC con las credenciales que ya tienes guardadas.

## 1. Credenciales compartidas

```powershell
copy C:\Users\LENOVO\Projects\Coffee-hunter-cov2\.env.ecosystem.example C:\Users\LENOVO\Projects\.env.ecosystem.local
notepad C:\Users\LENOVO\Projects\.env.ecosystem.local
```

Completa al menos:

| Variable | Dónde obtenerla |
|----------|-----------------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `TURSO_PLATFORM_TOKEN` | https://turso.tech/app → Settings → Tokens |
| `GOOGLE_CLIENT_ID` | Google Cloud Console (mismo que Empresario Virtual) |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console |

## 2. Setup completo del ecosistema

```powershell
cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
git pull origin main
.\scripts\ecosystem\setup-ecosystem.ps1
```

Esto configura: Empresario Virtual, Más Café, Feria Café, Colombia Green Coffee y Programa Operativo.

## 3. Publicar bootstrap Programa Operativo

Si el script indica push manual:

```powershell
cd C:\Users\LENOVO\Projects\Programa-de-logistca
git push origin main
```

## 4. Deploy Vercel + Turso (Colombia Green Coffee)

```powershell
cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
npm run setup:all
```

## 5. Cursor Cloud Agents

Abre `cursor-secrets-ecosystem.local.txt` y pega cada línea en:  
https://cursor.com/dashboard → Cloud Agents → Secrets

## 6. Verificar

```powershell
npm run verify:ecosystem
```

URLs esperadas:

| Proyecto | URL | Estado esperado |
|----------|-----|-----------------|
| Colombia Green Coffee | https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | 200 |
| Más Café | https://w-eb-mas-cafe.vercel.app | 200 |
| Colombia Green Coffee API | https://colombia-green-coffee.vercel.app/api/health | 200 (tras setup:all) |

## Automatizaciones Cursor (Empresario Virtual)

Ya configuradas con `memoryEnabled: true`:

- EV — Sesión dev matutina (lun–vie)
- EV — Check credenciales semanal (lunes)
- EV — Revisión PR / Post-merge
- EV — Pre-commit manual

Conecta GitHub Integration para cada repo en Cursor Dashboard.
