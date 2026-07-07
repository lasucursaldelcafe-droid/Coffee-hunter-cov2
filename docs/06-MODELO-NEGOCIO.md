# Informe: Modelo de negocio Colombia Green Coffee

> Inspirado en el análisis de [Trade Coffee](https://www.drinktrade.com/) y adaptado al mercado B2B de café colombiano de especialidad.

**Fecha:** julio 2026  
**Plataforma en vivo:** https://colombia-green-coffee.vercel.app

---

## 1. Resumen ejecutivo

**Colombia Green Coffee (CGC)** es un **marketplace agregador** que conecta:

- **Oferta:** coffee shops independientes (tostadores, exportadores, marcas) que venden café verde, tostado o maquila.
- **Demanda:** compradores B2B y retail (cafeterías, distribuidores, e-commerce, HORECA) que buscan café colombiano de especialidad.
- **Plataforma:** catálogo unificado, tiendas personalizables, logística internacional y maquila de marca.

**Modelo de ingresos principal:** comisión fija del **8% por venta concretada**, sin cuota mensual ni suscripción para vender.

---

## 2. Trade Coffee: cómo funciona su negocio

Trade Coffee (drinktrade.com) es referencia en agregación de café de especialidad en EE.UU.

### 2.1 Propuesta de valor

| Pilar | Descripción |
|-------|-------------|
| **Agregación** | Reúne 55+ tostadores independientes que el consumidor no descubriría solo |
| **Curación** | Catan cada café antes de ofrecerlo; garantía “no te gusta → lo reemplazamos” |
| **Descubrimiento** | Quiz de gustos, 30 colecciones curadas, tienda à la carte con 500+ referencias |
| **Fulfillment** | Suscripción con envío recurrente, tostado bajo pedido |
| **Comunidad** | Contenido (Coffee 101, brewing tips), gifts, corporate gifting |

### 2.2 Tres rutas de compra (demanda)

```
┌─────────────────┐   ┌──────────────────────┐   ┌─────────────────┐
│  Quiz / Match   │   │ Colecciones curadas   │   │  Shop à la carte │
│  Suscripción    │   │ 30 perfiles de taza  │   │  500+ cafés      │
└────────┬────────┘   └──────────┬───────────┘   └────────┬────────┘
         │                       │                          │
         └───────────────────────┴──────────────────────────┘
                                 │
                    Trade = capa de plataforma + logística
                                 │
                    Tostadores independientes (supply)
```

### 2.3 Modelo de ingresos Trade

- **Suscripciones** recurrentes (ingreso predecible)
- **Margen** sobre café vendido (diferencia entre precio al cliente y acuerdo con tostador)
- **Gifts / corporate** (ventas puntuales de alto ticket)
- **No cobran** a los tostadores una “cuota de tienda” visible al consumidor; el valor está en volumen y curación

### 2.4 Rol de Trade vs. tostador

| Trade hace | El tostador hace |
|------------|------------------|
| Marketing y adquisición de clientes | Tuesta y empaqueta |
| Matching / recomendación | Mantiene relación con productores |
| Checkout y suscripción | Calidad y consistencia del producto |
| Envío al consumidor final | Identidad de marca propia |

---

## 3. Adaptación a Colombia Green Coffee

CGC aplica la **misma lógica de agregador + curación + múltiples rutas**, pero en un contexto **B2B / exportación / coffee shops**, no B2C suscripción.

### 3.1 Paralelo directo Trade → CGC

| Trade Coffee | Colombia Green Coffee |
|--------------|----------------------|
| 55+ tostadores EE.UU. | N coffee shops / marcas colombianas |
| Quiz → suscripción | Registro gratis → tienda `/tiendas/{slug}` |
| 30 colecciones | Filtros catálogo: origen, tipo, proceso, puntaje |
| Shop 500+ cafés | Catálogo plataforma + productos de cada tienda |
| Roasted to order + ship | Logística internacional + maquila |
| Suscripción + margen | **8% comisión por venta** (sin mensualidad) |
| “Love it or replace” | Curación SCA 85+, tiendas verificadas |

### 3.2 Tres rutas en CGC (implementadas)

| Ruta | URL | Usuario | Equivalente Trade |
|------|-----|---------|-------------------|
| **Montar coffee shop** | `/crear-tienda` | Vendedor | Onboarding de roaster partner |
| **Explorar catálogo** | `/catalogo` | Comprador | Collections + à la carte |
| **Logística / maquila** | `/logistica`, `/maquila` | Ambos | Fulfillment + white label |

Página explicativa: **`/como-funciona`**

---

## 4. Actores y flujos

### 4.1 Vendedor (coffee shop)

```
Registro (/crear-tienda)
    → Tienda creada (slug único, adminToken)
    → Panel (/panel/{slug})
        ├── Productos (foto, precio, publicar)
        ├── Apariencia (plantilla visual, colores)
        ├── Perfil (logo, ubicación, redes)
        ├── Blog y páginas
        └── Seguridad (contraseña + email)
    → Tienda pública (/tiendas/{slug})
    → Productos en catálogo central (/catalogo)
    → Venta → CGC retiene 8% comisión
```

**Acceso posterior:** `/panel` con correo (+ contraseña si configurada).

### 4.2 Comprador

```
Descubre
    ├── Catálogo unificado (/catalogo) ← API /api/productos
    ├── Directorio tiendas (/tiendas)
    └── Ficha producto (/catalogo/{id})
Acción
    ├── Cotización (formulario por producto)
    └── Visita tienda del vendedor
```

### 4.3 Plataforma CGC

| Función | Implementación |
|---------|----------------|
| Registro tiendas | `POST /api/tiendas` → Turso/SQLite |
| Catálogo agregado | `lib/marketplace/catalog.ts` (plataforma + tiendas) |
| Panel admin | `/api/panel/{slug}` + token `X-Store-Token` |
| Comisión | `commission_rate` default 0.08 en schema |
| Datos retail | `POST /api/retail/report` |
| Cotizaciones | `POST /api/cotizaciones` |

---

## 5. Modelo económico

### 5.1 Para el vendedor

| Concepto | Valor |
|----------|-------|
| Alta de tienda | **$0** |
| Cuota mensual | **$0** |
| Comisión por venta | **8%** fijo |
| Ejemplo venta $1,000 | Recibe **$920** |

### 5.2 Para CGC (ingresos)

| Fuente | Estado |
|--------|--------|
| Comisión 8% ventas marketplace | ✅ Implementado en schema y UI |
| Logística (margen operador) | 🔶 Servicio ofrecido, cotización manual |
| Maquila (proyecto + producción) | 🔶 Servicio ofrecido, onboarding vía tienda |
| Suscripción / planes Pro/Enterprise | ❌ No activo (datos en `storePlans` son referencia UX) |

**Decisión estratégica vs. Trade:** CGC prioriza **comisión por transacción** en lugar de suscripción, alineado con vendedores B2B que venden por lote, no por taza recurrente.

### 5.3 Diagrama de dinero (venta simple)

```
Comprador paga $1,000
        │
        ├── $80 (8%) → Colombia Green Coffee
        │
        └── $920 → Vendedor (coffee shop)
```

---

## 6. Capas de producto (stack)

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Next.js 16)                                       │
│  Home Trade-style · Catálogo · Tiendas · Crear tienda        │
│  Panel vendedor · Tienda pública por slug                    │
├─────────────────────────────────────────────────────────────┤
│  API                                                         │
│  /api/tiendas · /api/productos · /api/panel/* · cotizaciones │
├─────────────────────────────────────────────────────────────┤
│  DATOS (Turso/SQLite + Drizzle)                              │
│  coffee_stores · store_products · blog · pages               │
├─────────────────────────────────────────────────────────────┤
│  SERVICIOS ADJACENTES                                        │
│  Logística internacional · Maquila · Programa Operativo (repo)│
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Diferenciadores vs. Trade

| Aspecto | Trade | CGC |
|---------|-------|-----|
| Mercado | B2C consumidor final EE.UU. | B2B café verde/tostado/maquila global |
| Geografía | Tostadores USA | Origen Colombia + compradores internacionales |
| Recurrencia | Suscripción mensual | Ventas por lote / proyecto |
| Producto físico | Solo tostado retail | Verde, tostado, maquila |
| Tienda propia del partner | No (marca Trade) | Sí (`/tiendas/{slug}` personalizable) |
| Contenido educativo | Coffee 101, blog Trade | Blog por tienda + páginas custom |

---

## 8. Qué está implementado hoy

| Feature | Estado |
|---------|--------|
| Registro tienda gratis | ✅ |
| Panel productos, apariencia, perfil | ✅ |
| Plantillas visuales (6 marcas) | ✅ PR #8 |
| Catálogo unificado API | ✅ |
| Comisión 8% en UI y DB | ✅ |
| Login panel por email | ✅ |
| Blog y páginas por tienda | ✅ |
| Visual estilo Trade | ✅ PR #9 |
| Página `/como-funciona` | ✅ Este sprint |
| Email bienvenida con URLs | ✅ (Resend) |
| Pasarela de pago automática | ❌ Cotización manual |
| Quiz de matching comprador | ✅ `/encuentra-tu-cafe` |
| Colecciones curadas | ✅ `/catalogo/coleccion` |

---

## 9. Recomendaciones (siguiente fase)

Inspiradas en Trade, priorizadas para CGC:

1. **“Quiz” B2B** — ✅ Implementado en `/encuentra-tu-cafe`.
2. **Colecciones curadas** — ✅ Implementado en `/catalogo/coleccion/{slug}`.
3. **Email onboarding** — ✅ Al crear tienda (requiere `RESEND_API_KEY`).
4. **Garantía de calidad** — política explícita tipo “si el lote no cumple SCA prometido, mediación”.
5. **Corporate / gifts B2B** — packs de muestras para distribuidores (equivalente corporate gifting).

---

## 10. URLs clave

| Rol | URL |
|-----|-----|
| Público general | `/` |
| Cómo funciona | `/como-funciona` |
| Quiz B2B | `/encuentra-tu-cafe` |
| Colecciones | `/catalogo/coleccion` |
| Catálogo | `/catalogo` |
| Tiendas | `/tiendas` |
| Crear tienda | `/crear-tienda` |
| Login vendedor | `/panel` |
| Panel tienda | `/panel/{slug}` |
| Tienda pública | `/tiendas/{slug}` |

---

## 11. Conclusión

**Trade Coffee** demostró que un agregador puede escalar sin tostar: cura oferta dispersa, simplifica descubrimiento y monetiza por suscripción + margen.

**Colombia Green Coffee** replica esa arquitectura para el café colombiano B2B:

- **Agrega** coffee shops independientes en un catálogo único.
- **Elimina fricción** de entrada (sin mensualidad).
- **Monetiza** alineado con el valor entregado (8% solo si vendes).
- **Extiende** con logística y maquila como servicios de mayor margen.

El informe visual y la página `/como-funciona` comunican este modelo a vendedores y compradores de forma equivalente a cómo Trade educa a su mercado.
