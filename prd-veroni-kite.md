# 📄 PRD — Veronikites: Plataforma Web para Academia de Kitesurf

> **Versión:** 1.0  
> **Fecha:** 12 de Febrero, 2026  
> **Autor:** Equipo de Producto – Veronikites  
> **Estado:** Borrador para Revisión  
> **Stack Tecnológico:** Next.js (App Router) · Tailwind CSS · Supabase · Wompi · Windy API

---

## 1. Resumen Ejecutivo

### 1.1 Visión

Construir una plataforma web de clase mundial, moderna y bilingüe (ES/EN) que conecte a estudiantes con la experiencia definitiva de kitesurf en **Salinas del Rey, Colombia** — uno de los spots más reconocidos internacionalmente, sede de paradas del **GKA World Championship**.

### 1.2 Propuesta de Valor

Veronikites no es solo una escuela — es una **experiencia completa de progresión**. La plataforma será el eje central donde el estudiante:

- Descubre el deporte y la escuela a través de un storytelling visual premium.
- Se registra, reserva y paga sus clases de forma autónoma.
- Sigue su progresión desde principiante hasta rider avanzado con un **Road Map interactivo**.
- Consulta las condiciones de viento en tiempo real antes de su sesión.
- Accede a contenido exclusivo (videos técnicos, blogs, noticias).

### 1.3 Contexto de Ubicación — Salinas del Rey

| Parámetro | Detalle |
|---|---|
| **Temporada Principal** | Diciembre — Abril |
| **Temporada Secundaria** | Junio — Agosto |
| **Viento Promedio (Peak)** | 20 – 35 nudos |
| **Dirección Predominante** | Noreste (NE) — Side-onshore |
| **Temperatura del Agua** | ~29°C (85°F) — No requiere wetsuit |
| **Condiciones del Agua** | Flat water (bahía interior) + Olas medianas/altas (punto exterior) |
| **Reconocimiento** | Sede GKA Kite World Championship |

---

## 2. Roles de Usuario & Personas

### 2.1 Visitante (No registrado)

| Aspecto | Descripción |
|---|---|
| **Perfil** | Turista internacional (Europa/USA) o nacional interesado en kitesurf |
| **Idioma** | Inglés o Español — requiere toggle de idioma inmediato |
| **Necesidades** | Ver cursos, precios, ubicación. Consultar condiciones de viento. Entender la progresión (Road Map público). Contactar por WhatsApp |
| **Acciones** | Navegar web, ver Road Map simplificado, click-to-chat |

### 2.2 Estudiante Registrado

| Aspecto | Descripción |
|---|---|
| **Perfil** | Alumno activo que ha comprado al menos un curso |
| **Necesidades** | Ver su progreso en el Road Map, reservar clases, acceder a contenido exclusivo, consultar clima |
| **Acciones** | Login, ver dashboard, reservar slot, realizar pagos (Wompi), consultar pronóstico de viento, ver biblioteca de recursos |

### 2.3 Admin / Instructor

| Aspecto | Descripción |
|---|---|
| **Perfil** | Staff de Veronikites (dueño, instructores certificados IKO) |
| **Necesidades** | Gestionar calendario, validar progreso de estudiantes, subir contenido |
| **Acciones** | CRUD de cursos y slots, marcar niveles completados en el Road Map del estudiante, gestionar biblioteca de contenido, ver reservas y pagos |

---

## 3. Módulos Funcionales

### 3.A — Frontend Público (Marketing & Información)

---

#### 3.A.1 — Página de Inicio (Home)

**Objetivo:** Impacto visual inmediato. Transmitir adrenalina, profesionalismo y la belleza de Salinas del Rey.

| Elemento | Especificación |
|---|---|
| **Hero Section** | Video de fondo a pantalla completa (Stock Footage – acción de kitesurf) con overlay oscuro sutil. Título animado + CTA principal ("Reserva tu Clase" / "Book Your Class"). |
| **Toggle de Idioma** | Ubicado en el navbar. Banderas (🇪🇸/🇬🇧) o texto (ES/EN). Persistente en toda la navegación. Implementado con `next-intl` o `i18next`. |
| **Value Proposition** | 3 cards con íconos: "Instructores Certificados IKO", "Spot de Clase Mundial", "Progresión Garantizada". |
| **Sección de Cursos** | Preview de 3-4 cursos principales con CTA a la página de detalle. |
| **Testimonios** | Carousel con fotos y reviews de estudiantes. |
| **CTA Final** | Banner de cierre: "Tu aventura comienza aquí" + botón de reserva. |

**Assets requeridos (placeholder):**
- `hero-video.mp4` — Stock footage de kitesurf en acción (mínimo 1080p, loop de ~15s).
- `hero-fallback.webp` — Imagen estática para conexiones lentas.
- Fotos de instructores, spot, y estudiantes (a proveer por el cliente).

---

#### 3.A.2 — Road Map del Kite Surfer (Vista Pública)

**Objetivo:** Mostrar la curva de aprendizaje completa del kitesurf. Inspirar al visitante a iniciar su progresión.

**Lógica de Progresión (basada en estándar IKO):**

```
Nivel 1: DESCUBRIMIENTO
├── Teoría del viento y seguridad
├── Conocimiento del equipo (kite, barra, arnés)
├── Sistemas de seguridad (depower, quick release)
└── Vuelo de trainer kite en tierra

Nivel 2: CONTROL DE KITE
├── Pilotaje del kite por sensación (sin mirar)
├── Lanzamiento y aterrizaje asistido
├── Auto-rescate básico
└── Body drag en agua (downwind)

Nivel 3: WATERSTART
├── Body drag upwind + recuperación de tabla
├── Coordinación kite-tabla-cuerpo
├── Primeras navegaciones cortas (10-50m)
└── Navegación consistente downwind

Nivel 4: RIDER INDEPENDIENTE
├── Navegación en ambas direcciones
├── Riding upwind (regresar al punto de partida)
├── Giros básicos (slide turn, jibe)
├── Elección de equipo según condiciones

Nivel 5: AVANZADO
├── Saltos pequeños y medianos
├── Riding toeside
├── Downloop turns
├── Navegación en condiciones variadas

Nivel 6: PRO / FREESTYLE
├── Saltos con grabs, rotaciones
├── Kiteloops, raileys
├── Wave riding o hydrofoil
└── Especialización de disciplina
```

**Implementación UI (Vista Pública):**
- Representación visual tipo **timeline vertical** o **stepper horizontal** con scroll.
- Cada nivel es un nodo expandible con sus sub-habilidades.
- Estilo visual: íconos personalizados, colores degradados por nivel (azul → naranja → rojo → gold).
- **Sin interactividad de progreso** en vista pública — solo informativo.

---

#### 3.A.3 — Cursos & Precios

**Objetivo:** Presentar la oferta formativa de forma clara y atractiva.

**Estructura por curso:**

| Campo | Tipo |
|---|---|
| Nombre del Curso | `string` — EN/ES |
| Descripción | `text` — EN/ES |
| Duración | `string` (ej: "3 horas", "5 días") |
| Nivel del Road Map abarcado | `enum[]` (Nivel 1-6) |
| Precio | `number` (COP + USD) |
| Incluye | `string[]` (equipo, seguro, fotos, etc.) |
| Imagen del Curso | `image` (Stock/Placeholder) |
| CTA | "Reservar Ahora" → Flujo de booking |

**Diseño UI:**
- Cards responsivas con hover effect (elevación + sombra).
- Filtro por nivel o tipo de experiencia.
- Indicador visual del nivel del Road Map que cubre cada curso.

---

#### 3.A.4 — Ubicación & Sobre el Kitesurf

**Secciones:**

1. **Guía de Salinas del Rey:**
   - Mapa interactivo embebido (Google Maps o Mapbox).
   - Información logística: cómo llegar, alojamiento cercano, qué traer.
   - Galería de fotos del spot (placeholder para assets del cliente).

2. **¿Qué es el Kitesurf?** (Página educativa):
   - Explicación del deporte para principiantes.
   - Video introductorio embebido (YouTube/Vimeo).
   - FAQ con accordion UI.

---

#### 3.A.5 — Click-to-Chat (WhatsApp)

**Implementación:**
- Widget flotante (esquina inferior derecha) con ícono de WhatsApp.
- Link directo: `https://wa.me/57XXXXXXXXXX?text=Hola%20Veroni%20Kite...`
- **Sin API de automatización** en MVP — solo redirección.
- Animación sutil de entrada (bounce + pulse).
- Configurable: número de teléfono y mensaje predeterminado desde el admin.

---

### 3.B — Dashboard del Estudiante (Área Privada)

> ⚠️ **REQUISITO CRÍTICO:** Este es el diferenciador principal de la plataforma.

---

#### 3.B.1 — Autenticación

| Aspecto | Especificación |
|---|---|
| **Proveedor** | Supabase Auth |
| **Métodos** | Email/Password + OAuth (Google) |
| **Flujo** | Registro → Confirmación por email → Login |
| **Protección de Rutas** | Middleware de Next.js + Supabase Session |
| **Roles** | `student` · `instructor` · `admin` (vía claims de Supabase) |
| **Seguridad** | RLS (Row Level Security) en todas las tablas |

---

#### 3.B.2 — Road Map Activo (Progreso del Estudiante)

**Objetivo:** El estudiante visualiza su progresión real, validada por el instructor.

**Especificación:**

| Componente | Detalle |
|---|---|
| **Barra de Progreso** | Visual tipo stepper vertical con 6 niveles. El nivel actual se marca con un indicador animado (glow/pulse). |
| **Sub-habilidades** | Cada nivel tiene checkboxes de sub-skills. Solo el instructor puede marcar como completadas. |
| **Estado Visual** | ✅ Completado (verde) · 🔄 En progreso (azul/animado) · 🔒 Bloqueado (gris, opacity reducida) |
| **Certificado** | Al completar un nivel, el estudiante recibe una insignia/badge digital. |
| **Historial** | Fecha de completación de cada sub-skill, registrada automáticamente. |

**Modelo de Datos (Supabase):**

```sql
-- Tabla de progreso por estudiante
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id),
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 6),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  validated_by UUID REFERENCES auth.users(id), -- instructor
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Catálogo de habilidades
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level INTEGER NOT NULL,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  sort_order INTEGER NOT NULL,
  icon TEXT -- nombre del ícono o URL
);
```

---

#### 3.B.3 — Sistema de Reservas (Booking)

**Flujo del Usuario:**

```
1. Estudiante selecciona curso
2. Ve calendario con slots disponibles
3. Selecciona fecha y hora
4. Confirma reserva
5. Redirige a Wompi Checkout
6. Pago procesado → Webhook confirma
7. Reserva confirmada + Email de confirmación
```

**Componentes:**

| Componente | Especificación |
|---|---|
| **Calendario** | Vista mensual/semanal con slots coloreados por disponibilidad. Librería sugerida: `react-big-calendar` o `@schedule-x/react`. |
| **Slots** | Configurados por el Admin con: fecha, hora inicio/fin, tipo de curso, instructor asignado, capacidad máxima. |
| **Estado del Slot** | `available` · `booked` · `full` · `cancelled` |
| **Confirmación** | Email automático vía Supabase Edge Functions + Resend (o similar). |

**Modelo de Datos:**

```sql
CREATE TABLE booking_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  instructor_id UUID REFERENCES auth.users(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  max_capacity INTEGER DEFAULT 4,
  current_bookings INTEGER DEFAULT 0,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'full', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slot_id UUID REFERENCES booking_slots(id),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'approved', 'declined', 'voided')),
  payment_reference TEXT, -- Referencia de Wompi
  wompi_transaction_id TEXT,
  amount_cop INTEGER NOT NULL,
  amount_usd NUMERIC(10,2),
  booking_status TEXT DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'cancelled', 'completed', 'no_show')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

#### 3.B.4 — Pasarela de Pago: Wompi

**Integración Técnica:**

| Aspecto | Detalle |
|---|---|
| **Método** | Wompi Web Checkout (Widget embebido) |
| **Moneda Primaria** | COP (Pesos Colombianos) |
| **Métodos de Pago** | Tarjeta Crédito/Débito, PSE, Nequi, Bancolombia |
| **Ambiente** | Sandbox (desarrollo) → Producción |
| **Llaves** | `WOMPI_PUBLIC_KEY` (client) · `WOMPI_PRIVATE_KEY` (server — .env.local) |

**Arquitectura de Integración:**

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│   Next.js App   │────▶│  Wompi Widget    │────▶│  Wompi Server  │
│   (Frontend)    │     │  (Client-side)   │     │                │
└─────────────────┘     └──────────────────┘     └───────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│   Supabase DB   │◀────│  API Route       │◀────│  Webhook POST  │
│   (bookings)    │     │  /api/wompi/     │     │  (Confirmación)│
└─────────────────┘     │  webhook         │     └────────────────┘
                        └──────────────────┘
```

**Flujo de Webhook:**

1. Wompi envía POST a `/api/wompi/webhook` con estado de transacción.
2. API Route valida la firma de integridad (`integrity_signature`).
3. Actualiza `bookings.payment_status` en Supabase.
4. Si `APPROVED` → envía email de confirmación al estudiante.
5. Si `DECLINED` → notifica al estudiante y libera el slot.

**Variables de Entorno:**

```env
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_xxxxx
WOMPI_PRIVATE_KEY=prv_test_xxxxx
WOMPI_EVENTS_SECRET=events_secret_xxxxx
WOMPI_INTEGRITY_SECRET=integrity_xxxxx
```

---

#### 3.B.5 — Biblioteca de Recursos

**Contenido:**

| Tipo | Descripción | Acceso |
|---|---|---|
| **Videos Técnicos** | Tutoriales de habilidades específicas del Road Map | Solo estudiantes registrados |
| **Blog / Artículos** | Tips, noticias del mundo kite, guías de viaje | Público (algunos) + Exclusivo |
| **Galería** | Fotos y videos de sesiones en Salinas del Rey | Público |
| **Noticias** | Updates de la escuela, eventos, competencias | Público |

**Implementación:**
- CMS básico integrado en Supabase (tablas `posts`, `media`, `categories`).
- Editor de contenido para el Admin (Rich Text con `tiptap` o similar).
- Reproductor de video embebido (YouTube/Vimeo unlisted o Bunny.net CDN).

---

#### 3.B.6 — Centro Meteorológico (Weather Center)

**Objetivo:** Información de viento en tiempo real y pronóstico para Salinas del Rey.

**Integración con API de Viento:**

| Opción | Pro | Contra | Recomendación |
|---|---|---|---|
| **Windy API** (Point Forecast) | Datos precisos, múltiples modelos (ECMWF, GFS), hasta 10 días | Costo por request | ✅ **MVP** |
| **Windy Embed** (iframe/Widget) | Gratis, visual, interactivo | Menos control, branding de Windy | ✅ **Alternativa rápida** |
| **Open-Meteo** | Gratis, open source | Menos especializado en viento | Backup |

**Datos a mostrar:**

| Parámetro | Unidad | Fuente |
|---|---|---|
| Velocidad del Viento | Nudos (kts) | Windy API |
| Ráfagas | Nudos (kts) | Windy API |
| Dirección del Viento | Grados + Rosa de vientos | Windy API |
| Temperatura | °C | Windy API |
| Pronóstico Horario | 12-48h | Windy API |
| Pronóstico Extendido | 5-10 días | Windy API |
| Marea | Nivel | Fuente secundaria |

**Coordenadas del Spot:**
- Latitud: `10.78° N` (aprox.)
- Longitud: `-75.08° W` (aprox.)

**UI del Weather Center:**

```
┌─────────────────────────────────────────────┐
│  🌊 CONDICIONES ACTUALES — Salinas del Rey  │
├──────────────┬──────────────┬───────────────┤
│  💨 22 kts   │  ↗️ NE       │  🌡️ 31°C     │
│  Ráfaga: 28  │  Side-on     │               │
├──────────────┴──────────────┴───────────────┤
│  🟢 CONDICIONES ÓPTIMAS PARA KITE          │
├─────────────────────────────────────────────┤
│  PRONÓSTICO HORARIO                         │
│  10:00  12:00  14:00  16:00  18:00          │
│  18kts  22kts  25kts  23kts  19kts          │
│  ▃▃▃▃  ▅▅▅▅  ▇▇▇▇  ▆▆▆▆  ▄▄▄▄           │
└─────────────────────────────────────────────┘
```

**Kite Size Recommender (Feature Sugerida):**

Basado en la velocidad del viento y el peso del rider, sugerir tamaño de kite:

| Viento (kts) | Rider < 65kg | Rider 65-80kg | Rider > 80kg |
|---|---|---|---|
| 12-16 | 12m | 14m | 17m |
| 16-22 | 10m | 12m | 14m |
| 22-28 | 8m | 10m | 12m |
| 28-35 | 6m | 8m | 10m |

---

### 3.C — Panel de Administración

---

#### 3.C.1 — Gestión de Calendario & Slots

- CRUD de slots de clase (fecha, hora, curso, instructor, capacidad).
- Vista de calendario con bookings coloreados por estado.
- Cancelación masiva por condiciones climáticas adversas.
- Asignación de instructores a slots.

#### 3.C.2 — Validación de Progreso

- Lista de estudiantes con su nivel actual.
- Interfaz para marcar sub-habilidades completadas.
- Notas del instructor por sesión.
- Historial de progresión por estudiante.

#### 3.C.3 — Gestión de Contenido

- CRUD de posts (blog, noticias).
- Upload de media (imágenes/videos).
- Categorización y tagging.
- Gestión de visibilidad (público/privado).

#### 3.C.4 — Dashboard de Métricas

- Total de reservas por periodo.
- Ingresos por Wompi (totales, por curso).
- Estudiantes activos vs. nuevos registros.
- Tasa de progresión promedio.

---

## 4. Especificaciones Técnicas

### 4.1 — Arquitectura del Sistema

```
┌──────────────────────────────────────────────────────────┐
│                      CLIENTE (Browser)                    │
│                                                          │
│  Next.js App (App Router)                                │
│  ├── Tailwind CSS + Framer Motion (animaciones)          │
│  ├── next-intl (internacionalización ES/EN)              │
│  ├── React Context/Zustand (estado global)               │
│  ├── Supabase Client SDK (@supabase/ssr)                 │
│  └── Wompi Widget JS                                     │
└─────────────────────┬────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────┐
│                   SERVIDOR (Next.js)                      │
│                                                          │
│  API Routes (/api/*)                                     │
│  ├── /api/wompi/webhook — Confirmación de pagos          │
│  ├── /api/weather — Proxy a Windy API (cache 15min)      │
│  ├── /api/bookings — CRUD de reservas                    │
│  └── /api/progress — Actualización de progreso           │
│                                                          │
│  Server Components                                       │
│  ├── Páginas SSG (Home, Cursos, Road Map público)        │
│  └── Páginas SSR (Dashboard, Booking)                    │
└─────────────────────┬────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────┐
│                   BASE DE DATOS                           │
│                                                          │
│  Supabase (PostgreSQL + Auth + Storage + Edge Functions) │
│  ├── auth.users — Autenticación y perfiles               │
│  ├── public.courses — Catálogo de cursos                 │
│  ├── public.booking_slots — Slots de calendario          │
│  ├── public.bookings — Reservas + estado de pago         │
│  ├── public.skills — Catálogo de habilidades             │
│  ├── public.student_progress — Progreso por estudiante   │
│  ├── public.posts — Blog/Noticias                        │
│  ├── public.media — Archivos multimedia                  │
│  └── storage.objects — Assets (imágenes, videos)         │
└──────────────────────────────────────────────────────────┘
```

### 4.2 — Stack Tecnológico Detallado

| Capa | Tecnología | Justificación |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG, API routes, SEO nativo |
| **Estilado** | Tailwind CSS v3+ | Utility-first, responsivo, velocidad de desarrollo |
| **Animaciones** | Framer Motion | Animaciones declarativas, gestos, scroll |
| **i18n** | `next-intl` | Integración nativa con App Router, tipado TypeScript |
| **Auth** | Supabase Auth | OAuth, email/password, RLS, session management |
| **Base de Datos** | Supabase (PostgreSQL) | RLS, Realtime, Edge Functions, Storage integrado |
| **ORM** | Supabase Client SDK | Tipado automático con `supabase gen types` |
| **Pagos** | Wompi Web Checkout | Gateway colombiano, PSE, Nequi, tarjetas |
| **Clima** | Windy API o Embed | Datos especializados en viento para deportes |
| **Email** | Resend | API moderna, templates React Email |
| **Hosting** | Vercel | Edge network, CI/CD integrado con GitHub |
| **DNS/CDN** | Vercel + Cloudflare (opcional) | Performance global |
| **Analytics** | Vercel Analytics + Google Analytics 4 | Core Web Vitals + comportamiento |

### 4.3 — Rendimiento & Core Web Vitals

| Métrica | Target | Estrategia |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | SSG para páginas estáticas, Image optimization con `next/image`, preload de hero video |
| **FID/INP** (Interaction to Next Paint) | < 200ms | Minimal client-side JS, React Server Components |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Dimensiones explícitas en imágenes/videos, font loading strategy |
| **TTFB** (Time to First Byte) | < 800ms | Edge runtime, ISR para contenido dinámico |

**Estrategias adicionales de rendimiento:**
- Lazy loading de componentes pesados (calendario, weather widget).
- Compresión de imágenes con `next/image` (WebP/AVIF automático).
- Video hero: poster image + carga diferida del video.
- Bundle analysis y code splitting por ruta.

### 4.4 — Estructura del Proyecto

```
src/
├── app/
│   ├── [locale]/               # Rutas internacionalizadas
│   │   ├── (public)/           # Grupo: páginas públicas
│   │   │   ├── page.tsx        # Home
│   │   │   ├── courses/        # Cursos & Precios
│   │   │   ├── roadmap/        # Road Map Público
│   │   │   ├── location/       # Salinas del Rey
│   │   │   ├── about-kitesurf/ # ¿Qué es el Kitesurf?
│   │   │   └── blog/           # Blog público
│   │   ├── (dashboard)/        # Grupo: área privada
│   │   │   ├── dashboard/      # Panel principal del estudiante
│   │   │   ├── my-roadmap/     # Road Map activo (progreso)
│   │   │   ├── booking/        # Sistema de reservas
│   │   │   ├── weather/        # Centro meteorológico
│   │   │   ├── resources/      # Biblioteca de recursos
│   │   │   └── profile/        # Perfil del estudiante
│   │   └── (admin)/            # Grupo: panel de admin
│   │       ├── admin/          # Dashboard admin
│   │       ├── admin/calendar/ # Gestión de calendario
│   │       ├── admin/students/ # Gestión de estudiantes
│   │       ├── admin/content/  # Gestión de contenido
│   │       └── admin/reports/  # Reportes y métricas
│   ├── api/
│   │   ├── wompi/
│   │   │   └── webhook/route.ts
│   │   ├── weather/route.ts
│   │   ├── bookings/route.ts
│   │   └── progress/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                     # Componentes base (Button, Card, etc.)
│   ├── public/                 # Componentes de páginas públicas
│   │   ├── Hero.tsx
│   │   ├── CourseCard.tsx
│   │   ├── PublicRoadMap.tsx
│   │   └── WhatsAppWidget.tsx
│   ├── dashboard/              # Componentes del dashboard
│   │   ├── ActiveRoadMap.tsx
│   │   ├── BookingCalendar.tsx
│   │   ├── WeatherWidget.tsx
│   │   └── ResourceCard.tsx
│   └── admin/                  # Componentes del panel admin
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Supabase browser client
│   │   ├── server.ts           # Supabase server client
│   │   └── middleware.ts       # Auth middleware
│   ├── wompi/
│   │   ├── checkout.ts         # Inicialización de checkout
│   │   └── verify.ts           # Verificación de webhook
│   ├── weather/
│   │   └── windy.ts            # Cliente de Windy API
│   └── utils/
│       ├── i18n.ts             # Config de internacionalización
│       └── helpers.ts
├── messages/
│   ├── es.json                 # Traducciones español
│   └── en.json                 # Traducciones inglés
├── types/
│   └── database.types.ts       # Tipos auto-generados de Supabase
└── styles/
    └── globals.css             # Estilos globales + Tailwind directives
```

---

## 5. Directrices UI/UX

### 5.1 — Identidad Visual

| Aspecto | Directriz |
|---|---|
| **Estilo General** | Premium · Adrenalina · Limpio |
| **Paleta de Colores** | Azul oceánico profundo (#0A1628) · Turquesa eléctrico (#00D4AA) · Blanco arena (#F5F0EB) · Naranja atardecer (#FF6B35) · Negro noche (#0D0D0D) |
| **Tipografía Primaria** | `Inter` o `Outfit` — Sans-serif moderna, geométrica |
| **Tipografía Secundaria** | `Space Grotesk` — Para headings con personalidad |
| **Iconografía** | Lucide Icons o Heroicons — Línea fina, consistente |
| **Bordes** | Redondeados suaves (8px-16px) — nunca cuadrados |
| **Sombras** | Sutiles, tipo glassmorphism en cards elevadas |

### 5.2 — Principios de Diseño

1. **Mobile-First:** 70%+ del tráfico será móvil (turistas en destino).
2. **Visual Storytelling:** Cada sección debe tener un componente visual dominante (foto/video/animación).
3. **Accesibilidad:** WCAG 2.1 AA mínimo. Contraste, focus states, alt text.
4. **Micro-interacciones:** Hover effects, transiciones suaves, loading states con skeleton screens.
5. **Whitespace:** Generoso uso de espacio en blanco para sensación premium.
6. **Dark Mode (Futuro):** Preparar la paleta para soporte de tema oscuro en Phase 2.

### 5.3 — Estructura de Assets (Carpeta `public/`)

```
public/
├── images/
│   ├── hero/
│   │   ├── hero-fallback.webp      # [PLACEHOLDER - Cliente sube]
│   │   └── hero-mobile.webp        # [PLACEHOLDER - Cliente sube]
│   ├── courses/
│   │   ├── course-beginner.webp    # [PLACEHOLDER]
│   │   ├── course-intermediate.webp
│   │   └── course-advanced.webp
│   ├── instructors/
│   │   ├── instructor-1.webp       # [PLACEHOLDER]
│   │   └── instructor-2.webp
│   ├── location/
│   │   ├── salinas-aerial.webp     # [PLACEHOLDER]
│   │   ├── salinas-beach.webp
│   │   └── salinas-sunset.webp
│   ├── testimonials/
│   │   └── student-*.webp          # [PLACEHOLDER]
│   └── roadmap/
│       ├── icon-level-1.svg
│       ├── icon-level-2.svg
│       └── ...
├── videos/
│   └── hero-loop.mp4              # [PLACEHOLDER - Stock footage 15s loop]
├── icons/
│   ├── logo-full.svg
│   ├── logo-icon.svg
│   └── favicon.ico
└── fonts/                         # Si se usa self-hosting
    ├── Inter-*.woff2
    └── SpaceGrotesk-*.woff2
```

---

## 6. Roadmap de Desarrollo

### 6.1 — Tabla Comparativa: MVP vs. Futuro

| # | Feature | MVP (Phase 1) | Phase 2 | Phase 3 |
|---|---|---|---|---|
| 1 | **Home + Hero Video** | ✅ | — | — |
| 2 | **Bilingüe (ES/EN)** | ✅ | — | — |
| 3 | **Road Map Público** | ✅ | — | — |
| 4 | **Cursos & Precios** | ✅ | — | — |
| 5 | **Ubicación + Info** | ✅ | — | — |
| 6 | **WhatsApp Widget** | ✅ | — | — |
| 7 | **Auth (Registro/Login)** | ✅ | — | — |
| 8 | **Road Map Activo (Progreso)** | ✅ | — | — |
| 9 | **Sistema de Reservas (Calendario)** | ✅ | — | — |
| 10 | **Pago con Wompi** | ✅ | — | — |
| 11 | **Weather Center (Embed Windy)** | ✅ (embed) | API propia | — |
| 12 | **Panel Admin Básico** | ✅ | — | — |
| 13 | **Biblioteca de Recursos** | — | ✅ | — |
| 14 | **Blog CMS** | — | ✅ | — |
| 15 | **Kite Size Recommender** | — | ✅ | — |
| 16 | **Notificaciones Email** | — | ✅ | — |
| 17 | **Digital Waivers** | — | ✅ | — |
| 18 | **Dashboard de Métricas** | — | ✅ | — |
| 19 | **Dark Mode** | — | — | ✅ |
| 20 | **App Móvil (PWA)** | — | — | ✅ |
| 21 | **WhatsApp Bot (API)** | — | — | ✅ |
| 22 | **Integración OTA (Viator, etc.)** | — | — | ✅ |
| 23 | **Multi-instructor Scheduling** | — | — | ✅ |
| 24 | **Loyalty / Referral Program** | — | — | ✅ |
| 25 | **Live Session Tracking (GPS)** | — | — | ✅ |

### 6.2 — Estimación de Tiempos (MVP)

| Módulo | Estimación |
|---|---|
| Setup proyecto + Auth + i18n | 1 semana |
| Home + Páginas públicas | 1.5 semanas |
| Road Map (Público + Activo) | 1.5 semanas |
| Sistema de Reservas + Calendario | 2 semanas |
| Integración Wompi | 1 semana |
| Weather Center (Embed) | 0.5 semanas |
| Panel Admin Básico | 1.5 semanas |
| QA, Testing, Polish | 1 semana |
| **Total MVP estimado** | **~10 semanas** |

---

## 7. Riesgos & Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Wompi sandbox/producción discrepancias | Media | Alto | Testing exhaustivo en sandbox, webhook logging |
| Assets del cliente no entregados a tiempo | Alta | Medio | Diseñar con placeholders sólidos, mockups con stock footage |
| Windy API rate limiting o costos | Media | Medio | Implementar cache server-side (15min), fallback a embed |
| Disponibilidad de internet en Salinas del Rey | Media | Alto | Progressive enhancement, offline-capable PWA en Phase 3 |
| SEO competitivo (escuelas de kite en Colombia) | Alta | Medio | SSG, meta tags optimizados, blog con contenido orgánico |

---

## 8. Métricas de Éxito (KPIs)

| KPI | Target (6 meses post-launch) |
|---|---|
| **Reservas online mensuales** | 30+ |
| **Tasa de conversión visitante → registro** | > 5% |
| **Tasa de conversión registro → reserva** | > 25% |
| **Core Web Vitals** | Todos en verde (Google PageSpeed) |
| **Tiempo promedio en sitio** | > 3 minutos |
| **NPS (Net Promoter Score)** | > 50 |
| **Bounce rate** | < 40% |

---

## 9. Apéndices

### Apéndice A — APIs Externas

| API | Uso | Documentación |
|---|---|---|
| **Wompi** | Pagos | [docs.wompi.co](https://docs.wompi.co) |
| **Windy API** | Pronóstico de viento | [api.windy.com](https://api.windy.com) |
| **Supabase** | Auth + DB + Storage | [supabase.com/docs](https://supabase.com/docs) |
| **Resend** | Emails transaccionales | [resend.com/docs](https://resend.com/docs) |
| **Google Maps** | Mapa embebido | [developers.google.com/maps](https://developers.google.com/maps) |

### Apéndice B — Referencia de Competencia

| Escuela | URL | Fortaleza Observada |
|---|---|---|
| Kitesurfing Academy | kitesurfingacademy.com | Road Map de progresión visual |
| IKO | ikointl.com | Estándar internacional de niveles |
| Salinas del Rey Kite | salinasdelrey.com | Info local, temporadas |

---

> **Próximos pasos:** Revisión del PRD por stakeholders → Aprobación → Inicio de Phase 1 (MVP).  
> **Documento vivo:** Este PRD será actualizado conforme avancen las decisiones de diseño y desarrollo.
