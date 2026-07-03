# Ecosistema La Sucursal del Café

Mapa maestro de **todos los proyectos**, cómo se relacionan, qué URL usar y cómo dejarlos funcionales con un solo comando en tu PC.

## Organización

| Recurso | Valor |
|---------|-------|
| **GitHub org** | [lasucursaldelcafe-droid](https://github.com/lasucursaldelcafe-droid) |
| **Correo principal** | lasucursaldelcafe@gmail.com |
| **WhatsApp** | +57 311 669 9638 |
| **Firebase (marca)** | `la-sucursal-del-cafe` |
| **Carpeta local (Windows)** | `C:\Users\LENOVO\Projects\` |

## Mapa de proyectos

```
                    ┌─────────────────────────────┐
                    │   La Sucursal del Café      │
                    │   (marca + Firebase)        │
                    └──────────────┬──────────────┘
                                   │
     ┌─────────────┬───────────────┼───────────────┬─────────────┐
     ▼             ▼               ▼               ▼             ▼
 Empresario    Más Café      Feria Café     Colombia Green   Programa
 Virtual       (web)        (inscripción)   Coffee          Operativo
 (agentes IA)  wallet       formularios     (seguimiento)   (logística)
     │             │               │               │             │
     └─────────────┴───────────────┴───────────────┴─────────────┘
                         Credenciales compartidas
                    (.env.ecosystem.local + gh + Cursor)
```

### 1. La Sucursal del Café — Marca madre

| Campo | Detalle |
|-------|---------|
| **Qué es** | Identidad comercial, contacto, Firebase compartido |
| **Repo** | No tiene repo propio — vive en Firebase + docs de cada app |
| **Firebase** | `la-sucursal-del-cafe` |
| **Estado** | ✅ Activo (usado por Feria, Más Café, EV) |

### 2. Empresario Virtual — Plataforma de agentes IA

| Campo | Detalle |
|-------|---------|
| **Qué es** | 8 agentes IA para microempresas (admin, finanzas, marketing…) |
| **Repo** | [empresario-virtual](https://github.com/lasucursaldelcafe-droid/empresario-virtual) |
| **Stack** | Next.js 16, Turso/SQLite, Drizzle, Google OAuth, Firebase |
| **Deploy** | Vercel + Firebase |
| **Setup local** | `npm run setup` → `npm run db:init` → `npm run dev` |
| **Deploy auto** | `npm run deploy:auto` |
| **Estado** | ✅ Código en main — requiere `.env.local` con Google OAuth + Turso |

### 3. Más Café — Web + wallet de fidelización

| Campo | Detalle |
|-------|---------|
| **Qué es** | Sitio web Más Café, Google Wallet, Supabase/Firebase |
| **Repo** | [WEb-mas-cafe](https://github.com/lasucursaldelcafe-droid/WEb-mas-cafe) |
| **URL live** | https://w-eb-mas-cafe.vercel.app |
| **Stack** | Next.js, Firebase, Supabase wallet, GitHub Pages |
| **Setup local** | `npm run setup:autonomous` o `npm run wallet:setup` |
| **Estado** | ✅ Live en Vercel — wallet requiere credenciales Google/Supabase |

### 4. Feria Café — Inscripciones eventos

| Campo | Detalle |
|-------|---------|
| **Qué es** | Formularios Feria + Switch Championship |
| **Repo** | [feria-cafe-inscripcion](https://github.com/lasucursaldelcafe-droid/feria-cafe-inscripcion) |
| **Stack** | HTML estático + Firebase + Google Sheets + Apps Script |
| **Deploy** | Firebase Hosting / GitHub Pages |
| **Estado** | ✅ Funcional — ver `INTEGRACION-FIREBASE.md` en el repo |

### 5. Colombia Green Coffee — App seguimiento café verde

| Campo | Detalle |
|-------|---------|
| **Qué es** | Marketplace café verde, logística, maquila, registro tiendas |
| **Repo** | [Coffee-hunter-cov2](https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2) (**este repo**) |
| **URL Pages** | https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ |
| **URL Vercel** | https://colombia-green-coffee.vercel.app (tras `setup:all`) |
| **Stack** | Next.js 16, Drizzle, Turso, Zod, GitHub Pages + Vercel |
| **Setup local** | `npm run setup:all` |
| **Estado** | ✅ Pages live — ⏸ Vercel/Turso pendiente secrets en GitHub |

### 6. Programa Operativo — Logística empresarial

| Campo | Detalle |
|-------|---------|
| **Qué es** | Atender solicitudes logísticas de empresas (cotizaciones, rutas) |
| **Repo** | [Programa-de-logistca](https://github.com/lasucursaldelcafe-droid/Programa-de-logistca) |
| **Relación** | Enlazado desde `/logistica` en Colombia Green Coffee |
| **Stack** | Next.js 16 (plantilla bootstrap incluida en este repo) |
| **Setup** | `npm run setup:ecosystem -- --project=programa-operativo` |
| **Estado** | 🟡 Scaffold — bootstrap desde plantilla al clonar |

### 7. Otros repos (secundarios)

| Repo | Rol | Estado |
|------|-----|--------|
| [cotizador-viajes-peludos](https://github.com/lasucursaldelcafe-droid/cotizador-viajes-peludos) | Cotizador clientes | Independiente |
| [elixir-propuesta-bienestar](https://github.com/lasucursaldelcafe-droid/elixir-propuesta-bienestar) | Propuesta comercial Elixir | Independiente |

## Credenciales compartidas

Un solo archivo en tu PC alimenta todos los proyectos:

```
C:\Users\LENOVO\Projects\.env.ecosystem.local
```

Copia desde `.env.ecosystem.example` en este repo. Contiene:

| Variable | Usada en |
|----------|----------|
| `VERCEL_TOKEN` | Todos los deploys Vercel |
| `TURSO_PLATFORM_TOKEN` | EV, Colombia Green Coffee |
| `GOOGLE_CLIENT_ID/SECRET` | EV, OAuth, wallet |
| `GITHUB_ORG` | Scripts de secrets |
| `PROJECTS_ROOT` | Ruta carpeta de proyectos |

Cada proyecto recibe su copia filtrada en `.env.local` al ejecutar `setup:ecosystem`.

## Un comando para todo el ecosistema

### Windows (recomendado)

```powershell
cd C:\Users\LENOVO\Projects\Coffee-hunter-cov2
copy .env.ecosystem.example C:\Users\LENOVO\Projects\.env.ecosystem.local
# Edita .env.ecosystem.local con tus tokens
.\scripts\ecosystem\setup-ecosystem.ps1
```

### Node

```bash
npm run setup:ecosystem
```

### Qué hace

1. Clona/actualiza todos los repos en `PROJECTS_ROOT`
2. Instala dependencias (`npm install`) donde aplique
3. Ejecuta setup por proyecto (`setup:all`, `setup`, `setup:autonomous`…)
4. Sube secrets a GitHub Actions por repo
5. Genera `cursor-secrets-ecosystem.local.txt` para Cursor Cloud Agents
6. Verifica URLs públicas

### Solo un proyecto

```bash
npm run setup:ecosystem -- --project=empresario-virtual
npm run setup:ecosystem -- --project=colombia-green-coffee
npm run setup:ecosystem -- --project=mas-cafe
npm run setup:ecosystem -- --project=programa-operativo
```

### Verificar estado

```bash
npm run verify:ecosystem
```

## Cursor Cloud Agents — Automatizaciones

| Automatización | Cron / trigger | Repo |
|----------------|----------------|------|
| EV — Sesión dev matutina | Lun–vie | empresario-virtual |
| EV — Check credenciales | Lunes | empresario-virtual |
| EV — Revisión PR | Git push | empresario-virtual |
| EV — Pre-commit manual | Webhook | empresario-virtual |

**Secrets en Cursor:** pega `cursor-secrets-ecosystem.local.txt` en  
https://cursor.com/dashboard → Cloud Agents → Secrets

Conecta GitHub Integration para cada repo que uses con agentes.

## Estado funcional (checklist rápido)

| Proyecto | Código | Deploy público | BD/Backend | Acción pendiente |
|----------|--------|----------------|------------|------------------|
| La Sucursal (marca) | N/A | Firebase | Firebase | — |
| Empresario Virtual | ✅ | Vercel | Turso | OAuth + `setup:tokens` |
| Más Café | ✅ | ✅ Vercel | Supabase/Firebase | Wallet creds si aplica |
| Feria Café | ✅ | Firebase | Sheets | — |
| Colombia Green Coffee | ✅ | ✅ Pages | ⏸ Turso | `npm run setup:all` |
| Programa Operativo | 🟡 | — | — | `setup:ecosystem --project=programa-operativo` |

## Documentación por proyecto

| Proyecto | Docs clave |
|----------|------------|
| **Este repo** | `docs/01-VISION.md` … `docs/06-AUTO-SETUP.md` |
| Empresario Virtual | `docs/01-VISION.md`, `docs/05-EMAIL-SETUP.md` |
| Más Café | `docs/`, scripts `wallet:*` |
| Feria Café | `INTEGRACION-FIREBASE.md`, `GITHUB-ACTIONS-SETUP.md` |
| Ecosistema | **Este archivo** + `scripts/ecosystem/manifest.json` |

## Flujo recomendado (primera vez en el equipo)

1. Instalar: Node 22+, Git, `gh auth login`
2. Clonar `Coffee-hunter-cov2` (o cualquier repo del ecosistema)
3. Crear `C:\Users\LENOVO\Projects\.env.ecosystem.local` desde `.env.ecosystem.example`
4. Ejecutar `.\scripts\ecosystem\setup-ecosystem.ps1`
5. Pegar secrets en Cursor Dashboard
6. `npm run verify:ecosystem` — todo en verde

Ver también: [06-AUTO-SETUP.md](./06-AUTO-SETUP.md) para setup de este repo solo.
