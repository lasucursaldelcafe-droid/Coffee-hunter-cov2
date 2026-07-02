# Colombia Green Coffee

Plataforma web integral de café colombiano de especialidad, inspirada en [Colombian Coffee Hunter](https://www.colombiancoffeehunter.com/es).

## Características

- **Catálogo de café**: café verde, tostado y servicios de maquila con puntajes SCA
- **Coffee Shop Marketplace**: inscripción para montar tu propia tienda de café
- **Logística internacional**: operadores de envío a más de 15 países
- **Maquila de marca**: desarrollo de marcas premium con perfiles únicos
- **Trazabilidad**: orígenes colombianos (Huila, Cauca, Tolima, Nariño, etc.)

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- API Routes para registro de tiendas

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
├── app/
│   ├── page.tsx              # Landing
│   ├── catalogo/             # Catálogo de café
│   ├── tiendas/              # Marketplace de coffee shops
│   ├── crear-tienda/         # Inscripción de tiendas
│   ├── logistica/            # Servicios logísticos
│   ├── maquila/              # Maquila de marca
│   ├── nosotros/             # Sobre nosotros
│   └── api/tiendas/          # API de registro
├── components/               # Componentes UI
└── lib/data.ts               # Datos de productos y tiendas
```

## Despliegue

Compatible con Vercel, Netlify o cualquier plataforma que soporte Next.js.

```bash
npm run build
npm start
```
