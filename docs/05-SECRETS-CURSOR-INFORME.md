# Informe completo — Secrets, tokens y automatización

**Proyecto:** Colombia Green Coffee  
**Repositorio:** https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2  
**Rama principal:** `main`  
**Sitio en vivo:** https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/  
**Fecha de referencia:** julio 2026

---

## 1. Resumen ejecutivo

| Área | Estado |
|------|--------|
| Código en `main` | ✅ Actualizado |
| CI en cada push/PR | ✅ Activo |
| Deploy GitHub Pages (push `main`) | ✅ Activo — URL pública en vivo |
| Deploy Vercel (push `main`) | ⏸ Omitido — faltan secrets |
| Cursor Cloud Agent → GitHub | ⚙ Requiere integración + secrets en dashboard |
| Base de datos producción (Turso) | ⏸ Opcional — no configurado en CI |

**Regla de oro:** todo cambio que quieras en producción web debe terminar en **`main`** (merge o push directo). Eso dispara automáticamente CI + publicación en GitHub Pages.

---

## 2. Dónde crear cada credencial (dos lugares distintos)

| Plataforma | URL | Para qué sirve |
|------------|-----|----------------|
| **GitHub → Secrets del repo** | https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/settings/secrets/actions | GitHub Actions (CI/CD, Vercel, Turso en deploy) |
| **Cursor → Cloud Agents → Secrets** | https://cursor.com/dashboard?tab=cloud-agents → Secrets | Agente en la nube: push, PR, deploy, `.env.local` en VM |
| **Vercel → Environment Variables** | Proyecto en Vercel → Settings → Environment Variables | Runtime del servidor Next.js en producción |
| **Turso** | https://turso.tech/app | Base de datos SQLite en la nube |

> **Importante:** el nombre del secret debe ser **exactamente** igual (mayúsculas, guiones bajos). Si cambias una letra, el workflow no lo lee.

---

## 3. Secrets de GitHub Actions (nombre exacto + descripción)

Crear en: **Settings → Secrets and variables → Actions → New repository secret**

### 3.1 Obligatorios para deploy Vercel automático

| Nombre exacto del secret | Descripción | Dónde obtener el valor |
|--------------------------|-------------|------------------------|
| `VERCEL_TOKEN` | Token de API de Vercel para que GitHub Actions despliegue el proyecto en cada push a `main` | https://vercel.com/account/tokens → Create Token (scope: Full Account o al menos deploy del proyecto) |
| `VERCEL_ORG_ID` | ID del equipo/cuenta Vercel (no es un número de teléfono; es un string tipo `team_xxxxxxxx`) | Vercel → Settings → General → **Team ID** (o en `.vercel/project.json` local tras `vercel link`) |
| `VERCEL_PROJECT_ID` | ID del proyecto Vercel (string tipo `prj_xxxxxxxx`) | Vercel → Proyecto → Settings → General → **Project ID** |

### 3.2 Recomendados para producción con base de datos (patrón empresario-virtual)

| Nombre exacto del secret | Descripción | Dónde obtener el valor |
|--------------------------|-------------|------------------------|
| `TURSO_DATABASE_URL` | URL libsql de la base Turso para registros de tiendas y cotizaciones | Turso → tu DB → **Database URL** (ej. `libsql://colombia-green-coffee-xxx.turso.io`) |
| `TURSO_AUTH_TOKEN` | Token JWT para autenticar la app contra Turso | Turso → Database → **Create Token** |
| `ENCRYPTION_KEY` | Clave de 32+ caracteres para cifrar datos sensibles en servidor | Local: `npm run setup` (genera y muestra la clave) |
| `NEXT_PUBLIC_APP_URL` | URL pública final de la app (OAuth, CORS, enlaces en emails) | La URL de Vercel tras el primer deploy (ej. `https://colombia-green-coffee.vercel.app`) |

### 3.3 Opcionales (formularios y Google)

| Nombre exacto del secret | Descripción | Dónde obtener el valor |
|--------------------------|-------------|------------------------|
| `GOOGLE_CLIENT_ID` | OAuth Google para panel de tiendas (futuro) | Google Cloud Console → APIs → Credentials |
| `GOOGLE_CLIENT_SECRET` | Secreto del cliente OAuth Google | Mismo lugar que Client ID |
| `SHEETS_WEB_APP_URL` | URL `/exec` del Apps Script que recibe inscripciones de tiendas | Google Apps Script desplegado como Web App |
| `NEXT_PUBLIC_SHEETS_WEB_APP_URL` | Misma URL pero expuesta al cliente (GitHub Pages estático) | Igual que arriba; se usa en build estático |

### 3.4 Opcional — permisos extendidos GitHub Pages

| Nombre exacto del secret | Descripción | Dónde obtener el valor |
|--------------------------|-------------|------------------------|
| `GH_PAT` | Personal Access Token del dueño del repo con scope `repo` + `workflow` para habilitar Pages vía API si hace falta | GitHub → Settings → Developer settings → Fine-grained token o Classic PAT |

> **Nota:** GitHub Pages ya está activo con rama `gh-pages`. `GH_PAT` solo hace falta si quieres que Actions pueda cambiar la configuración de Pages sin entrar a Settings.

### 3.5 Secrets que NO debes crear (GitHub los da solo)

| Nombre | Motivo |
|--------|--------|
| `GITHUB_TOKEN` | Lo inyecta GitHub Actions automáticamente en cada workflow |

---

## 4. Secrets en Cursor Cloud Agents (acceso directo del agente)

Configurar en: **https://cursor.com/dashboard** → pestaña **Cloud Agents** → **Secrets**

Usa tipo **Runtime Secret** para credenciales sensibles (se redactan en logs).

### 4.1 Mínimo para que el agente trabaje en el repo y haga push a `main`

| Nombre exacto en Cursor Secrets | Tipo recomendado | Descripción |
|--------------------------------|------------------|-------------|
| *(ninguno obligatorio si GitHub está conectado)* | — | Cursor usa la **GitHub App** con permisos read/write al clonar y pushear |

**Pasos de integración GitHub (una vez):**

1. https://cursor.com/dashboard → **Integrations** → **GitHub**
2. Instalar la app de Cursor en la cuenta `lasucursaldelcafe-droid`
3. Dar acceso al repositorio **Coffee-hunter-cov2** (y otros del ecosistema si quieres)
4. En **Cloud Agents → Default repository** poner: `lasucursaldelcafe-droid/Coffee-hunter-cov2`
5. En **Base branch** poner: `main`

### 4.2 Secrets en Cursor para deploy y desarrollo local en la VM del agente

Copia los **mismos nombres** que en GitHub Actions + variables de `.env.example`:

| Nombre exacto | Tipo | Descripción |
|---------------|------|-------------|
| `VERCEL_TOKEN` | Runtime Secret | Deploy manual `npm run deploy:auto` desde el agente |
| `VERCEL_ORG_ID` | Environment Variable | ID organización Vercel |
| `VERCEL_PROJECT_ID` | Environment Variable | ID proyecto Vercel |
| `TURSO_DATABASE_URL` | Runtime Secret | Conexión BD producción |
| `TURSO_AUTH_TOKEN` | Runtime Secret | Token Turso |
| `ENCRYPTION_KEY` | Runtime Secret | Cifrado servidor |
| `NEXT_PUBLIC_APP_URL` | Environment Variable | URL pública Vercel |
| `MAIN_EMAIL` | Environment Variable | `lasucursaldelcafe@gmail.com` |
| `GOOGLE_CLIENT_ID` | Runtime Secret | OAuth (cuando actives login) |
| `GOOGLE_CLIENT_SECRET` | Runtime Secret | OAuth |
| `SHEETS_WEB_APP_URL` | Runtime Secret | Formularios → Google Sheets |
| `NEXT_PUBLIC_SHEETS_WEB_APP_URL` | Environment Variable | Formularios en sitio estático |
| `CONVEX_AGENT_MODE` | Environment Variable | Si usas Convex: `anonymous` en agentes cloud |

> **No pegues secrets en el chat.** Configúralos solo en el dashboard de Cursor o en GitHub Secrets.

---

## 5. Qué hace cada push a `main` (automático)

```
git push origin main
        │
        ├─► CI — validar código (typecheck, lint, db:init, build)
        ├─► Publicar sitio web → build estático → rama gh-pages → GitHub Pages
        └─► Publicar en Vercel → (solo si VERCEL_TOKEN + ORG_ID + PROJECT_ID existen)
```

| Workflow | Archivo | Trigger |
|----------|---------|---------|
| CI | `.github/workflows/ci.yml` | push `main`, `cursor/**`, PR |
| GitHub Pages | `.github/workflows/deploy-github-pages.yml` | push `main` |
| Vercel prod | `.github/workflows/deploy-vercel.yml` | push `main` |
| Preview Vercel | `.github/workflows/deploy-preview.yml` | PR a `main` |
| Auto-merge | `.github/workflows/auto-merge-cursor-prs.yml` | PR desde rama `cursor/*` |

---

## 6. Estado actual del proyecto (informe técnico)

### 6.1 Repositorio y ramas

- **Org/usuario GitHub:** `lasucursaldelcafe-droid`
- **Repo:** `Coffee-hunter-cov2`
- **Rama activa de desarrollo:** `main`
- **Rama de publicación web:** `gh-pages` (generada por Actions; no editar a mano)
- **Últimos commits relevantes:** deploy Pages, workflow simplificado, checklist actualizado

### 6.2 Sitio web

- **URL:** https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/
- **Estado HTTP:** 200 OK
- **Pages config:** `legacy`, fuente `gh-pages` / `/`
- **Páginas:** `/`, `/catalogo/`, `/tiendas/`, `/crear-tienda/`, `/logistica/`, `/maquila/`, `/nosotros/`

### 6.3 Stack

- Next.js 16 + React 19 + Tailwind 4 + TypeScript strict
- Drizzle ORM (SQLite local / Turso prod)
- Zod validación APIs
- Hosting estático: GitHub Pages | Servidor completo: Vercel (pendiente secrets)

### 6.4 Ecosistema La Sucursal del Café

| Repo | Rol |
|------|-----|
| empresario-virtual | Patrón Drizzle, Turso, Zod, scripts |
| feria-cafe-inscripcion | Formularios + Sheets |
| WEb-mas-cafe | CI/Vercel referencia |
| Coffee-hunter-cov2 | **Este proyecto** — marketplace café verde |

### 6.5 Lo que falta para automatización 100 %

1. **Secrets Vercel** en GitHub (tabla sección 3.1) → deploy servidor + API `/api/tiendas`
2. **Secrets Turso** (sección 3.2) → persistencia real de tiendas en producción
3. **Secrets en Cursor** (sección 4.2) → agente puede hacer `deploy:auto` sin pedirte tokens
4. **Opcional:** `NEXT_PUBLIC_SHEETS_WEB_APP_URL` para formularios en GitHub Pages

---

## 7. Checklist rápido (copiar y marcar)

### GitHub Actions — https://github.com/lasucursaldelcafe-droid/Coffee-hunter-cov2/settings/secrets/actions

- [ ] `VERCEL_TOKEN`
- [ ] `VERCEL_ORG_ID`
- [ ] `VERCEL_PROJECT_ID`
- [ ] `TURSO_DATABASE_URL`
- [ ] `TURSO_AUTH_TOKEN`
- [ ] `ENCRYPTION_KEY`
- [ ] `NEXT_PUBLIC_APP_URL`

### Cursor Cloud Agents — dashboard → Secrets

- [ ] GitHub conectado con acceso a `Coffee-hunter-cov2`
- [ ] Default repository = `lasucursaldelcafe-droid/Coffee-hunter-cov2`
- [ ] Base branch = `main`
- [ ] Mismos secrets de Vercel/Turso (si quieres deploy desde agente)

### Verificación tras configurar

```bash
# Sitio estático (ya funciona)
curl -sI https://lasucursaldelcafe-droid.github.io/Coffee-hunter-cov2/ | head -1

# API Vercel (cuando tengas URL)
curl -s https://TU-URL.vercel.app/api/health
```

---

## 8. Contacto y correo del proyecto

- **Email principal:** lasucursaldelcafe@gmail.com (OAuth Google, nunca contraseñas en repo)
- **WhatsApp público:** 573116699638 (variable `NEXT_PUBLIC_WHATSAPP`)

---

*Documento generado para el ecosistema Empresario Virtual / Colombia Green Coffee.*
