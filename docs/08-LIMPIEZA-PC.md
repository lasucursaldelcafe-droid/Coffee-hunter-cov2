# Limpieza del PC — qué ya está en línea

Qué puedes **eliminar del disco local** sin perder funcionalidad, porque ya está desplegado en la nube.

## ✅ Ya en línea — no necesitas copias locales para usar

| Plataforma | URL | Puedes borrar del PC |
|------------|-----|----------------------|
| **Colombia Green Coffee** (sitio estático) | https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | Solo si **no desarrollas** — conserva el repo si editas |
| **Empresario Virtual** | https://empresario-virtual.vercel.app | Igual — producción en Vercel |
| **Más Café** | https://w-eb-mas-cafe.vercel.app | Igual |
| **Feria Café** | Firebase Hosting | HTML estático en la nube |

## ⏸ Aún no en línea — conserva el repo local

| Plataforma | Falta | Acción |
|------------|-------|--------|
| **Coffee Hunter API** (Vercel + Turso) | Deploy Vercel | `npm run setup:all` en Coffee-hunter-cov2 |
| **Programa Operativo** | GitHub Pages sin activar | Settings → Pages → branch `gh-pages` |
| **Programa Operativo** (Vercel) | Secrets | `npm run setup:all` en Programa-de-logistca |

## Carpetas que puedes borrar con seguridad

Si solo usas las apps en producción y **no desarrollas**:

```
C:\Users\LENOVO\Projects\.env.ecosystem.local   ← NO borrar (credenciales)
C:\Users\LENOVO\Projects\*\node_modules\        ← OK borrar (se regenera con npm install)
C:\Users\LENOVO\Projects\*\data\*.db            ← OK si usas Turso en prod
C:\Users\LENOVO\Projects\*\ .next\             ← OK borrar (cache build)
```

## Carpetas que NO debes borrar

| Archivo/carpeta | Por qué |
|-----------------|---------|
| `.env.local` en cada repo | Credenciales locales |
| Repos Git completos | Para desarrollar y hacer push |
| `cursor-secrets*.local.txt` | Cursor Cloud Agents |

## Regla simple

- **Solo navegar / usar** → basta con las URLs en línea
- **Desarrollar o desplegar** → conserva el repo + `.env.local`
- **Tres repos = tres carpetas separadas**, nunca mezclar en uno solo

## Verificar qué funciona

```powershell
# Coffee Hunter Pages
curl -sI https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | findstr HTTP

# Empresario Virtual
curl -s https://empresario-virtual.vercel.app/api/health

# Más Café
curl -sI https://w-eb-mas-cafe.vercel.app/ | findstr HTTP

# Programa Operativo (cuando Pages esté activo)
curl -sI https://lasucursaldelcafe-droid.github.io/Programa-de-logistca/ | findstr HTTP
```
