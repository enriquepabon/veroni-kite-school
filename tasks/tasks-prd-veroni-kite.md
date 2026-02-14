## Relevant Files

### Configuración & Infraestructura
- `package.json` - Dependencias del proyecto (next, tailwind, supabase, next-intl, framer-motion, etc.)
- `next.config.mjs` - Configuración de Next.js (i18n plugin, image domains, redirects)
- `tailwind.config.ts` - Configuración de Tailwind (paleta de colores Veroni, fuentes, extensiones)
- `tsconfig.json` - Configuración TypeScript (path aliases)
- `postcss.config.mjs` - Configuración PostCSS para Tailwind
- `.env.local` - Variables de entorno (Supabase, Wompi, Windy API keys)
- `.env.example` - Template de variables de entorno para documentación

### Estilos & Fuentes
- `src/styles/globals.css` - Estilos globales + Tailwind directives + custom properties
- `src/app/layout.tsx` - Root layout (fuentes, metadata global, providers)

### Internacionalización
- `src/i18n/request.ts` - Configuración de next-intl
- `src/i18n/routing.ts` - Routing config para locales (es/en)
- `src/messages/es.json` - Traducciones en español
- `src/messages/en.json` - Traducciones en inglés
- `src/middleware.ts` - Middleware de Next.js (i18n routing + auth protection)

### Supabase
- `src/lib/supabase/client.ts` - Supabase browser client
- `src/lib/supabase/server.ts` - Supabase server client (cookies)
- `src/lib/supabase/middleware.ts` - Helper de auth para middleware
- `src/types/database.types.ts` - Tipos auto-generados de Supabase
- `supabase/migrations/*.sql` - Migraciones SQL (tablas, RLS policies)

### Autenticación
- `src/app/[locale]/(auth)/login/page.tsx` - Página de login
- `src/app/[locale]/(auth)/register/page.tsx` - Página de registro
- `src/app/[locale]/(auth)/callback/route.ts` - OAuth callback handler
- `src/components/auth/LoginForm.tsx` - Formulario de login
- `src/components/auth/RegisterForm.tsx` - Formulario de registro
- `src/components/auth/AuthProvider.tsx` - Context provider de autenticación

### Páginas Públicas
- `src/app/[locale]/(public)/page.tsx` - Home page
- `src/app/[locale]/(public)/courses/page.tsx` - Cursos & Precios
- `src/app/[locale]/(public)/roadmap/page.tsx` - Road Map Público
- `src/app/[locale]/(public)/location/page.tsx` - Ubicación / Salinas del Rey
- `src/app/[locale]/(public)/about-kitesurf/page.tsx` - ¿Qué es el Kitesurf?
- `src/app/[locale]/(public)/blog/page.tsx` - Blog público

### Componentes Públicos
- `src/components/public/Hero.tsx` - Hero section con video background
- `src/components/public/Navbar.tsx` - Barra de navegación con toggle de idioma
- `src/components/public/Footer.tsx` - Footer del sitio
- `src/components/public/CourseCard.tsx` - Card de curso
- `src/components/public/PublicRoadMap.tsx` - Road Map visual público (6 niveles)
- `src/components/public/TestimonialCarousel.tsx` - Carousel de testimonios
- `src/components/public/WhatsAppWidget.tsx` - Widget flotante de WhatsApp
- `src/components/public/LanguageToggle.tsx` - Selector de idioma ES/EN

### Dashboard del Estudiante
- `src/app/[locale]/(dashboard)/dashboard/page.tsx` - Panel principal
- `src/app/[locale]/(dashboard)/my-roadmap/page.tsx` - Road Map activo (progreso)
- `src/app/[locale]/(dashboard)/booking/page.tsx` - Sistema de reservas
- `src/app/[locale]/(dashboard)/weather/page.tsx` - Centro meteorológico
- `src/app/[locale]/(dashboard)/resources/page.tsx` - Biblioteca de recursos
- `src/app/[locale]/(dashboard)/profile/page.tsx` - Perfil del estudiante

### Componentes del Dashboard
- `src/components/dashboard/ActiveRoadMap.tsx` - Road Map interactivo con progreso
- `src/components/dashboard/SkillCheckbox.tsx` - Checkbox de sub-habilidad (solo visual, instructor marca)
- `src/components/dashboard/BookingCalendar.tsx` - Calendario de reservas
- `src/components/dashboard/SlotCard.tsx` - Card de slot disponible
- `src/components/dashboard/WeatherWidget.tsx` - Widget de clima / viento
- `src/components/dashboard/WindForecastChart.tsx` - Gráfico de pronóstico horario
- `src/components/dashboard/ResourceCard.tsx` - Card de recurso (video/blog)
- `src/components/dashboard/DashboardLayout.tsx` - Layout del área privada

### Pagos (Wompi)
- `src/lib/wompi/checkout.ts` - Inicialización de Wompi widget
- `src/lib/wompi/verify.ts` - Verificación de integrity signature
- `src/app/api/wompi/webhook/route.ts` - Webhook endpoint para confirmación de pagos
- `src/app/[locale]/(dashboard)/booking/confirmation/page.tsx` - Página post-pago

### Weather / Windy
- `src/lib/weather/windy.ts` - Cliente/proxy para Windy API
- `src/app/api/weather/route.ts` - API route proxy con cache (15min)

### Panel Admin
- `src/app/[locale]/(admin)/admin/page.tsx` - Dashboard admin
- `src/app/[locale]/(admin)/admin/calendar/page.tsx` - Gestión de calendario/slots
- `src/app/[locale]/(admin)/admin/students/page.tsx` - Gestión de estudiantes y progreso
- `src/app/[locale]/(admin)/admin/content/page.tsx` - Gestión de contenido (blog/media)
- `src/app/[locale]/(admin)/admin/reports/page.tsx` - Reportes y métricas
- `src/components/admin/SlotEditor.tsx` - CRUD de slots
- `src/components/admin/StudentProgressEditor.tsx` - Editor de progreso del estudiante
- `src/components/admin/ContentEditor.tsx` - Editor de contenido (posts)

### Componentes UI Base
- `src/components/ui/Button.tsx` - Botón reutilizable
- `src/components/ui/Card.tsx` - Card reutilizable
- `src/components/ui/Input.tsx` - Input de formulario
- `src/components/ui/Modal.tsx` - Modal/Dialog
- `src/components/ui/Skeleton.tsx` - Skeleton loader
- `src/components/ui/Badge.tsx` - Badge/insignia

### Notes

- Unit tests should be placed alongside the code files they test (e.g., `Hero.tsx` y `Hero.test.tsx`).
- Use `npx jest [optional/path/to/test/file]` to run tests.
- Este proyecto usa **Next.js (App Router)**, **Tailwind CSS**, **Supabase**, **Wompi**, y **Windy API**.
- La internacionalización se implementa con `next-intl` (ES/EN).
- Las páginas públicas usan SSG/ISR; las páginas privadas usan SSR con protección de rutas.
- Las migraciones de Supabase se gestionan en `supabase/migrations/`.
- Las variables sensibles (API keys) NUNCA se exponen en el cliente — solo via API routes.

---

## Tasks

- [x] 1.0 Configuración del Proyecto, Infraestructura Base y Autenticación
  - [x] 1.1 Instalar dependencias core: `next`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `@types/react`, `@types/node`. Configurar `tsconfig.json` con path aliases (`@/`).
  - [x] 1.2 Configurar Tailwind CSS: extender `tailwind.config.ts` con la paleta de colores Veroni (azul oceánico `#0A1628`, turquesa `#00D4AA`, arena `#F5F0EB`, naranja `#FF6B35`, negro `#0D0D0D`), fuentes (`Inter`, `Space Grotesk`), y extensiones de animación.
  - [x] 1.3 Crear `src/styles/globals.css` con Tailwind directives, custom CSS properties para la paleta, y estilos base (tipografía, scrollbar, selección).
  - [x] 1.4 Instalar y configurar `next-intl` para internacionalización: crear `src/i18n/request.ts`, `src/i18n/routing.ts`, y archivos de mensajes base (`src/messages/es.json`, `src/messages/en.json`) con estructura de keys inicial.
  - [x] 1.5 Configurar `src/middleware.ts` con routing de `next-intl` (locales `es`, `en`, default `es`) y placeholder para protección de rutas auth.
  - [x] 1.6 Crear estructura de carpetas del proyecto: `src/app/[locale]/(public)/`, `src/app/[locale]/(dashboard)/`, `src/app/[locale]/(admin)/`, `src/app/[locale]/(auth)/`, `src/components/`, `src/lib/`, `src/types/`.
  - [x] 1.7 Crear `src/app/layout.tsx` (root layout) y `src/app/[locale]/layout.tsx` (locale layout) con providers de `next-intl`, carga de fuentes Google (`Inter`, `Space Grotesk`), y metadata SEO base.
  - [x] 1.8 Instalar y configurar Supabase: `@supabase/supabase-js`, `@supabase/ssr`. Crear `src/lib/supabase/client.ts` (browser client) y `src/lib/supabase/server.ts` (server client con cookies).
  - [x] 1.9 Crear `.env.local` y `.env.example` con variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`, `WOMPI_PRIVATE_KEY`, `WINDY_API_KEY`.
  - [x] 1.10 Crear migración SQL inicial en `supabase/migrations/` para tablas: `profiles` (extensión de auth.users), `courses`, `skills`, `student_progress`, `booking_slots`, `bookings`, `posts`, `media`. Incluir RLS policies básicas.
  - [x] 1.11 Generar tipos TypeScript desde Supabase: `src/types/database.types.ts` usando `supabase gen types typescript`.
  - [x] 1.12 Implementar autenticación: crear páginas `login/page.tsx` y `register/page.tsx`, componentes `LoginForm.tsx` y `RegisterForm.tsx`, y route handler `callback/route.ts` para OAuth (Google).
  - [x] 1.13 Crear `AuthProvider.tsx` (React Context) para gestionar sesión del usuario en el cliente. Integrar con middleware para proteger rutas `/dashboard/*` y `/admin/*`.
  - [x] 1.14 Crear componentes UI base reutilizables: `Button.tsx`, `Card.tsx`, `Input.tsx`, `Modal.tsx`, `Skeleton.tsx`, `Badge.tsx` con variantes (primary, secondary, outline, ghost) y soporte de Tailwind.

- [x] 2.0 Frontend Público — Páginas de Marketing y Contenido Informativo
  - [x] 2.1 Crear `Navbar.tsx`: logo, links de navegación (Home, Cursos, Road Map, Ubicación, Blog), `LanguageToggle.tsx` (ES/EN con banderas), botón CTA "Reservar", menú hamburguesa en mobile. Sticky con blur backdrop.
  - [x] 2.2 Crear `Footer.tsx`: logo, links de navegación, redes sociales, info de contacto, copyright. Layout de 4 columnas (desktop) → stack (mobile).
  - [x] 2.3 Implementar Home page (`(public)/page.tsx`): `Hero.tsx` con video de fondo (placeholder `hero-loop.mp4`), overlay oscuro, título animado con Framer Motion, CTA "Reserva tu Clase". Fallback a imagen estática para conexiones lentas.
  - [x] 2.4 Sección de Value Proposition en Home: 3 cards con íconos animados ("Instructores Certificados IKO", "Spot de Clase Mundial", "Progresión Garantizada") usando Framer Motion para entrada escalonada (stagger).
  - [x] 2.5 Sección de preview de Cursos en Home: 3-4 `CourseCard.tsx` con imagen, título, precio, nivel del Road Map, y CTA. Hover effect con elevación y sombra.
  - [x] 2.6 Sección de Testimonios en Home: `TestimonialCarousel.tsx` con fotos de estudiantes (placeholders), nombre, nacionalidad, y review. Auto-play con pausa en hover.
  - [x] 2.7 Sección CTA final en Home: banner de cierre "Tu aventura comienza aquí" con gradiente, botón "Reservar Ahora", fondo con imagen de parallax sutil.
  - [x] 2.8 Implementar página de Cursos & Precios (`courses/page.tsx`): grid de `CourseCard.tsx` con datos desde Supabase (SSG/ISR). Filtro por nivel del Road Map. Mostrar precios en COP y USD. CTA por curso que redirige al flujo de booking.
  - [x] 2.9 Implementar página de Ubicación (`location/page.tsx`): mapa embebido (Google Maps o Mapbox) centrado en Salinas del Rey, info logística (cómo llegar, alojamiento), galería de fotos del spot (placeholders).
  - [x] 2.10 Implementar página "¿Qué es el Kitesurf?" (`about-kitesurf/page.tsx`): explicación del deporte, video introductorio embebido (YouTube), sección FAQ con accordion UI animado.
  - [x] 2.11 Crear `WhatsAppWidget.tsx`: botón flotante (bottom-right), ícono de WhatsApp, animación bounce + pulse al entrar, link `wa.me/57XXXXXXXXXX` con mensaje predeterminado. Z-index alto para estar sobre todo el contenido.
  - [x] 2.12 Asegurar que todas las páginas públicas tengan SEO correcto: title tags descriptivos, meta descriptions, Open Graph tags, heading hierarchy (un solo `<h1>` por página), semantic HTML5.

- [x] 3.0 Road Map del Kite Surfer — Vista Pública e Interactiva del Estudiante
  - [x] 3.1 Crear seed data de habilidades: tabla `skills` con los 6 niveles y todas sus sub-habilidades (como se define en el PRD sección 3.A.2). Datos bilingües (`name_es`, `name_en`, `description_es`, `description_en`).
  - [x] 3.2 Implementar `PublicRoadMap.tsx`: componente visual tipo timeline vertical con 6 nodos/niveles. Cada nivel es expandible para ver sub-habilidades. Colores degradados por nivel (azul → turquesa → naranja → rojo → gold). Íconos SVG personalizados por nivel.
  - [x] 3.3 Implementar página pública del Road Map (`roadmap/page.tsx`): renderiza `PublicRoadMap.tsx` con datos de Supabase (SSG). Sección introductoria explicando la progresión. Solo informativo — sin interactividad de progreso.
  - [x] 3.4 Implementar `ActiveRoadMap.tsx` (componente del dashboard): stepper vertical con 6 niveles y sub-skills. Estados visuales: ✅ Completado (verde) · 🔄 En progreso (azul/pulse) · 🔒 Bloqueado (gris/opacidad). Los checkboxes son read-only para el estudiante (solo el instructor puede marcar).
  - [x] 3.5 Implementar página del Road Map activo (`my-roadmap/page.tsx`): renderiza `ActiveRoadMap.tsx` con datos de progreso del estudiante autenticado. Query a `student_progress` JOIN `skills`. Mostrar fecha de completación por skill y nombre del instructor que validó.
  - [x] 3.6 Agregar sistema de badges/insignias: al completar un nivel completo, mostrar una insignia digital animada (Framer Motion scale + confetti effect). Almacenar badges en tabla `student_badges` o campo JSON en `profiles`.

- [x] 4.0 Sistema de Reservas, Calendario y Pasarela de Pagos (Wompi)
  - [x] 4.1 Implementar `BookingCalendar.tsx`
  - [x] 4.2 Implementar `SlotCard.tsx`
  - [x] 4.3 Implementar página de booking (`booking/page.tsx`)
  - [x] 4.4 Crear API route `/api/bookings/route.ts`
  - [x] 4.5 Integrar Wompi Web Checkout
  - [x] 4.6 Crear API route `/api/wompi/webhook/route.ts`
  - [x] 4.7 Implementar página de confirmación post-pago (`booking/confirmation/page.tsx`)
  - [x] 4.8 Implementar lógica de email de confirmación

- [x] 5.0 Dashboard del Estudiante — Weather Center, Biblioteca de Recursos y Perfil
  - [ ] 5.1 Crear `DashboardLayout.tsx`: layout con sidebar (desktop) o bottom navigation (mobile). Links: Dashboard, Mi Road Map, Reservar, Clima, Recursos, Perfil. Mostrar nombre y avatar del usuario. Responsive.
  - [ ] 5.2 Implementar dashboard principal (`dashboard/page.tsx`): resumen del estudiante — nivel actual en el Road Map (mini-preview), próxima reserva, condiciones de viento actuales (mini widget), accesos directos a secciones clave.
  - [ ] 5.3 Implementar Weather Center: crear `src/lib/weather/windy.ts` (cliente para Windy API) y `src/app/api/weather/route.ts` (proxy con cache de 15 minutos). Coordenadas de Salinas del Rey (~10.78°N, ~-75.08°W).
  - [ ] 5.4 Implementar `WeatherWidget.tsx`: mostrar velocidad del viento (nudos), dirección (rosa de vientos), ráfagas, temperatura. Indicador de condiciones (🟢 Óptimas / 🟡 Moderadas / 🔴 No recomendadas) basado en rangos de kitesurf.
  - [ ] 5.5 Implementar `WindForecastChart.tsx`: gráfico de barras horizontales con pronóstico horario (12-48h). Colores por intensidad. Tooltip con detalles. Librería sugerida: `recharts` o custom con SVG.
  - [ ] 5.6 Implementar página Weather (`weather/page.tsx`): renderiza `WeatherWidget.tsx` + `WindForecastChart.tsx` + iframe de Windy Maps embebido centrado en Salinas del Rey (como fallback visual).
  - [ ] 5.7 Implementar página de Biblioteca de Recursos (`resources/page.tsx`): grid de `ResourceCard.tsx` con filtro por tipo (Video, Blog, Noticia). Contenido desde Supabase. Videos embebidos (YouTube/Vimeo). Solo accesible para estudiantes registrados.
  - [ ] 5.8 Implementar página de Perfil (`profile/page.tsx`): información personal del estudiante (nombre, email, foto), cambio de contraseña, preferencias de idioma, peso del rider (para Kite Size Recommender futuro), historial de reservas.

- [x] 6.0 Panel de Administración — Gestión de Calendario, Estudiantes y Contenido
  - [ ] 6.1 Proteger rutas `/admin/*` con verificación de rol `admin` o `instructor` en middleware. Redirect a dashboard si el usuario no tiene permisos. Implementar RLS policies en Supabase para roles de admin.
  - [ ] 6.2 Implementar dashboard admin (`admin/page.tsx`): métricas resumidas — total reservas del mes, ingresos, estudiantes activos, nuevos registros. Cards con números grandes y sparkline mini-charts.
  - [ ] 6.3 Implementar gestión de calendario (`admin/calendar/page.tsx`): CRUD de slots con `SlotEditor.tsx` — crear, editar, eliminar slots. Campos: fecha, hora inicio/fin, curso, instructor, capacidad. Vista de calendario con bookings existentes por slot.
  - [ ] 6.4 Implementar cancelación masiva de slots: seleccionar múltiples slots y cancelar (útil para clima adverso). Notificación automática a estudiantes afectados.
  - [ ] 6.5 Implementar gestión de estudiantes (`admin/students/page.tsx`): lista de todos los estudiantes registrados con su nivel actual. Click en estudiante → `StudentProgressEditor.tsx` para marcar sub-habilidades completadas, agregar notas de sesión, y ver historial.
  - [ ] 6.6 Implementar CRUD de progreso del instructor: API route `/api/progress/route.ts` — PATCH para actualizar `student_progress` (marcar skill como completada, agregar nota, registrar instructor). Solo accesible por roles `instructor`/`admin`.
  - [ ] 6.7 Implementar gestión de contenido (`admin/content/page.tsx`): CRUD de posts (blog/noticias) con `ContentEditor.tsx`. Editor rich text básico con `tiptap`. Upload de imágenes a Supabase Storage. Toggle de visibilidad (público/privado).
  - [ ] 6.8 Implementar CRUD de cursos en admin: crear, editar, eliminar cursos. Campos bilingües (nombre, descripción en ES/EN). Asignación de niveles del Road Map. Upload de imagen del curso.

- [ ] 7.0 Integración Final, QA, Performance y Despliegue
  - [ ] 7.1 Revisar y completar todas las traducciones en `es.json` y `en.json`. Verificar que no hay keys faltantes. Probar toggle de idioma en todas las páginas y componentes.
  - [ ] 7.2 Optimización de performance: lazy loading de componentes pesados (calendario, weather widget), `next/image` para todas las imágenes (WebP/AVIF auto), poster image para hero video, font loading con `display: swap`.
  - [ ] 7.3 Validar Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1. Usar Lighthouse y Vercel Analytics. Corregir cualquier métrica en rojo.
  - [ ] 7.4 Testing: escribir tests unitarios para componentes críticos (auth, booking flow, wompi verification, weather data parsing). Escribir tests de integración para API routes (webhook, bookings, progress).
  - [ ] 7.5 SEO final: verificar el/robots.txt, sitemap.xml (auto-generado por Next.js), meta tags en todas las páginas, structured data (LocalBusiness schema para la academia), canonical URLs por idioma.
  - [ ] 7.6 Accesibilidad: audit WCAG 2.1 AA — contraste de colores, focus states en todos los interactivos, alt text en imágenes, navegación por teclado, screen reader compatibility.
  - [ ] 7.7 Configurar deploy en Vercel: conectar repositorio GitHub, configurar variables de entorno en Vercel dashboard, verificar build exitoso, configurar dominio custom (si aplica).
  - [ ] 7.8 Configurar Wompi en modo producción: cambiar keys de sandbox a producción, verificar webhook URL con dominio final, test de transacción real.
  - [ ] 7.9 Documentación final: actualizar `README.md` con instrucciones de setup, estructura del proyecto, variables de entorno requeridas, y guía de contribución. Actualizar `progress.txt`.
