# Repositorios independientes — La Sucursal del Café

**Importante:** cada plataforma es un **proyecto separado** con su **propio repositorio**, credenciales, deploy y base de datos. **No compartir setup ni mezclar código.**

## Las 3 plataformas principales

| Plataforma | Repo | Qué hace | URL live | Setup |
|------------|------|----------|----------|-------|
| **Colombia Green Coffee** (Coffee Hunter) | **este repo** | Marketplace y seguimiento de café verde | [Pages](https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/) | `npm run setup:all` |
| **Programa Operativo** (Logística) | [Programa-de-logistca](https://github.com/lasucursaldelcafe-droid/Programa-de-logistca) | Gestión de envíos empresariales | Pendiente Pages | `npm run setup:all` en **ese repo** |
| **Empresario Virtual** | [empresario-virtual](https://github.com/lasucursaldelcafe-droid/empresario-virtual) | 8 agentes IA microempresas | [Vercel](https://empresario-virtual.vercel.app) | `npm run deploy:auto` en **ese repo** |

### ⚠️ No mezclar

- **Empresario Virtual** ≠ Logística ≠ Coffee Hunter
- Coffee Hunter `/logistica` = página **marketing** de exportación de café (solo contenido web)
- **Programa Operativo** = app **separada** para tracking de envíos (`/api/envios`)
- Cada repo tiene su Turso DB, su Vercel project, sus GitHub Secrets

## Otros repos (marca La Sucursal)

| Repo | Rol | Live |
|------|-----|------|
| [WEb-mas-cafe](https://github.com/lasucursaldelcafe-droid/WEb-mas-cafe) | Web Más Café + wallet | https://w-eb-mas-cafe.vercel.app |
| [feria-cafe-inscripcion](https://github.com/lasucursaldelcafe-droid/feria-cafe-inscripcion) | Formularios eventos | Firebase |

## Contacto compartido (solo marca)

- Email: lasucursaldelcafe@gmail.com
- Firebase marca: `la-sucursal-del-cafe`

## Setup — solo este repo (Coffee Hunter)

```powershell
cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
npm install
npm run setup:all
npm run dev
```

## Setup — otros repos (en su carpeta)

```powershell
# Logística — NO desde Coffee Hunter
cd C:\Users\LENOVO\Projects\Programa-de-logistca
npm run setup:all

# Empresario Virtual — NO desde Coffee Hunter
cd C:\Users\LENOVO\Projects\empresario-virtual
npm run deploy:auto
```

## Qué está en línea (puedes limpiar del PC)

Ver [`08-LIMPIEZA-PC.md`](./08-LIMPIEZA-PC.md)

## Índice de documentación por repo

| Repo | Docs |
|------|------|
| Coffee Hunter | `docs/01-VISION.md` … `docs/07-PASOS-FINALES.md` |
| Programa Operativo | `README.md`, `AGENTS.md` en su repo |
| Empresario Virtual | `docs/01-VISION.md` … `docs/06-DEPLOY.md` en su repo |
