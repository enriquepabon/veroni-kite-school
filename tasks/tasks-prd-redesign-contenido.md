# Tasks: PRD Rediseño Visual y Mejora de Contenido — Veroni Kite

> Generado desde: `tasks/prd-redesign-contenido.md`

## Relevant Files

- `src/app/layout.tsx` - Root layout. Agregar preconnect, meta keywords, canonical, og:image, twitter:card, Schema.org JSON-LD.
- `src/app/[locale]/layout.tsx` - Locale layout. Agregar hreflang tags dinámicas.
- `src/app/[locale]/(public)/layout.tsx` - Public layout. Posible punto para Schema.org y meta tags por página.
- `src/app/[locale]/(public)/page.tsx` - Landing page principal. Orquesta Hero, Classes, Testimonials, AboutUs, Footer.
- `src/components/Hero.tsx` - Hero section. Agregar video de fondo, mejorar H1, badge IKO, corregir contraste subtítulo, diferenciar CTAs, reposicionar elemento decorativo.
- `src/components/Classes.tsx` - Tarjetas de cursos. Agregar fotos reales, descripción de contenido, diferenciar CTA de reserva.
- `src/components/Testimonials.tsx` - Testimonios. Agregar fotos reales, fechas, enlaces a Google Reviews/TripAdvisor.
- `src/components/AboutUs.tsx` - Sección "¿Por Qué Veroni Kite?". Agregar micro-CTAs, imágenes de spot e instructores.
- `src/components/Footer.tsx` - Footer. Consolidar íconos sociales, arreglar enlaces Privacidad/Términos.
- `src/components/Header.tsx` - Header/Nav. Diferenciar ruta "Cursos" vs "Reservar".
- `src/app/[locale]/(public)/privacidad/page.tsx` - **[NEW]** Página de Política de Privacidad (Ley 1581/2012).
- `src/app/[locale]/(public)/terminos/page.tsx` - **[NEW]** Página de Términos y Condiciones.
- `src/app/[locale]/(public)/reservar/page.tsx` - **[NEW]** Página/formulario de reserva con integración WhatsApp.
- `src/components/BookingForm.tsx` - **[NEW]** Componente formulario de reserva.
- `src/components/LeadCaptureForm.tsx` - **[NEW]** Componente formulario de captura de leads.
- `src/app/api/booking/route.ts` - **[NEW]** API route para procesar reservas → Supabase.
- `src/app/api/leads/route.ts` - **[NEW]** API route para procesar leads → Supabase.
- `src/styles/globals.css` - Migración de paleta de colores a Brand Guidelines oficiales.
- `tailwind.config.ts` - Actualizar colores, tipografías (Montserrat, Caveat), border-radius según Brand Guidelines.
- `src/messages/es.json` - Traducciones español. Actualizar textos de H1, CTAs, formularios.
- `src/messages/en.json` - Traducciones inglés. Actualizar textos de H1, CTAs, formularios.
- `public/images/` - **[NEW DIR]** Directorio para imágenes y video del hero.
- `public/og-image.jpg` - **[NEW]** Imagen Open Graph 1200×630.
- `public/robots.txt` - Existente. Verificar que no bloquee nuevas páginas.
- `src/app/sitemap.ts` - Existente. Agregar nuevas rutas (privacidad, términos, reservar).

### Notes

- Unit tests should be placed alongside the code files they are testing.
- Use `npx jest [optional/path/to/test/file]` to run tests.
- Las imágenes y video son proporcionados por el usuario; los componentes deben referenciar los paths definidos en el PRD.
- La migración de colores afecta todo el sitio: usar variables CSS / Tailwind para cambio centralizado.
- Seguir proceso `process-task-list.mdc`: una subtarea a la vez, marcar `[x]` al completar, commit al terminar cada parent task.

## Tasks

- [x] 1.0 Migración de Brand Guidelines — Paleta de Colores y Tipografía
  - [x] 1.1 Actualizar `tailwind.config.ts` con la paleta oficial: Ocean Teal (`#2A9D8F`), Deep Marine (`#264653`), Caribbean Aqua (`#76C7C0`), Sand Gold (`#E9C46A`), Salt White (`#FAFDF6`), Night Tide (`#1A1A2E`). Reemplazar colores actuales (naranja → Sand Gold, verde esmeralda → Ocean Teal).
  - [x] 1.2 Agregar fuentes Montserrat (headings) y Caveat (accent) a `tailwind.config.ts` y cargarlas via `next/font/google` en el layout raíz. Mantener Inter como body.
  - [x] 1.3 Agregar gradiente principal como utilidad en Tailwind: `linear-gradient(135deg, #2A9D8F 0%, #76C7C0 100%)`.
  - [x] 1.4 Configurar `border-radius: 16px` como default para tarjetas según Brand Guidelines (elementos gráficos: formas orgánicas redondeadas).
  - [x] 1.5 Hacer un search & replace en todos los componentes para migrar referencias de colores antiguos a los nuevos tokens de Tailwind. Verificar que no queden colores hardcodeados.
  - [x] 1.6 Verificar visualmente que la migración de colores se aplique correctamente en todas las secciones de la landing page.

- [x] 2.0 Hero Section — Video de Fondo, H1, CTA diferenciados y Accesibilidad
  - [x] 2.1 Crear estructura de directorios `public/images/` con subdirectorios `cursos/`, `testimonios/`, `badges/`, `about/` para recibir las imágenes del usuario.
  - [x] 2.2 Implementar `<video>` de fondo en `Hero.tsx`: autoplay, muted, loop, playsInline. Usar `hero-video.mp4` como source principal y `hero-video.webm` como fallback. Agregar atributo `poster` apuntando a `hero-fallback.webp`.
  - [x] 2.3 Agregar overlay semitransparente oscuro (Deep Marine `#264653` al 40-50% opacidad) sobre el video para legibilidad del texto.
  - [x] 2.4 Implementar fallback a imagen estática para `prefers-reduced-motion: reduce` y conexiones lentas (cuando el video no carga).
  - [x] 2.5 Cambiar tipografía del H1 a Montserrat ExtraBold (800). Actualizar contenido del H1 al tagline oficial seleccionado (ej: "Ride the Caribbean Soul" o "Donde el Viento Te Encuentra"). Actualizar `es.json` y `en.json`.
  - [x] 2.6 Agregar badge visual IKO (`iko-badge.png`) junto al H1 con estilo Sand Gold (`#E9C46A`).
  - [x] 2.7 Corregir contraste del subtítulo: cambiar color de `rgb(158, 175, 208)` a `Salt White (#FAFDF6)` o `rgba(255,255,255,0.85)` mínimo. Verificar ratio WCAG AA ≥ 4.5:1.
  - [x] 2.8 Diferenciar CTAs del Hero: "Reserva tu Clase" → enlaza a `/reservar` (CTA primario, Sand Gold). "Ver Cursos" → scroll suave a `#cursos` en la misma página (CTA secundario, outline).
  - [x] 2.9 Reposicionar elemento decorativo (mouse/scroll indicator) para que NO se superponga con el área de clic del CTA. Colocarlo debajo de los botones.

- [x] 3.0 SEO Técnico — Meta Tags, Canonical, Hreflang, Schema.org y Open Graph
  - [x] 3.1 Agregar `<link rel="canonical" href="https://veronikite.com/">` en el layout raíz. Cada subpágina debe generar su propio canonical dinámicamente.
  - [x] 3.2 Agregar meta tags de Open Graph en `layout.tsx` o metadata export de Next.js: `og:image`, `og:url`, `og:type`, `og:title`, `og:description` con contenido del Brand Guidelines.
  - [x] 3.3 Cambiar Twitter card a `summary_large_image` y agregar `twitter:image`, `twitter:title`, `twitter:description`.
  - [x] 3.4 Agregar `<meta name="keywords" content="kitesurf Colombia, academia kitesurf Salinas del Rey, clases kitesurf Barranquilla, kitesurf certificación IKO, aprender kitesurf caribe, kiteboarding Colombia">`.
  - [x] 3.5 Implementar hreflang tags dinámicas en `layout.tsx` basadas en la configuración de locales existente (`next-intl`): `hreflang="es"`, `hreflang="en"`, `hreflang="x-default"`.
  - [x] 3.6 Agregar `<link rel="preconnect">` para Google Fonts y CDN de imágenes/video si aplica.
  - [x] 3.7 Implementar Schema.org JSON-LD como `<script type="application/ld+json">`: `LocalBusiness` (nombre, dirección, teléfono, horario, geo, imagen) + `Course` (uno por cada curso con precio y duración) + `AggregateRating`.
  - [x] 3.8 Actualizar `src/app/sitemap.ts` para incluir nuevas rutas: `/privacidad`, `/terminos`, `/reservar`.
  - [x] 3.9 Colocar placeholder `og-image.jpg` (1200×630) en `public/` — verificar que la ruta en meta tags es correcta.

- [x] 4.0 Tarjetas de Cursos — Imágenes Reales y Contenido Detallado
  - [x] 4.1 Reemplazar fondos oscuros/íconos genéricos de diamante en `CoursePreview.tsx` por componentes `<Image>` de Next.js apuntando a `curso-descubrimiento.webp`, `curso-control-kite.webp`, `curso-waterstart.webp`.
  - [x] 4.2 Agregar listado de 3-4 puntos clave por curso debajo de duración/nivel/precio. Contenido según PRD RF-06 (ej: "Incluye equipo completo", "Body drag en agua", etc.). Actualizar `es.json` y `en.json`.
  - [x] 4.3 Cambiar el botón "Reservar" de cada tarjeta para que apunte a `/reservar?curso=<nombre-curso>` en lugar de `/cursos`.
  - [x] 4.4 Aplicar `border-radius: 16px` a las tarjetas según Brand Guidelines. Verificar que las imágenes tengan aspect ratio correcto y no se deformen.

- [x] 5.0 Testimonios — Fotos Reales y Prueba Social Verificada
  - [x] 5.1 Agregar componente de imagen circular (`<Image>`, 200×200) para la foto de cada testimonio en `TestimonialCarousel.tsx`. Apuntar a `testimonio-1.webp` hasta `testimonio-4.webp`.
  - [x] 5.2 Agregar campo de fecha de la experiencia debajo del nombre del estudiante (ej: "Enero 2026").
  - [x] 5.3 Agregar enlace "Ver reseña en Google" / "Ver en TripAdvisor" con ícono, apuntando a la reseña verificada correspondiente.
  - [x] 5.4 Agregar un enlace/botón "Ver todas las reseñas en Google" al final de la sección de testimonios.
  - [x] 5.5 Actualizar `es.json` y `en.json` con los textos de testimonios (nombres, fechas, plataforma).

- [x] 6.0 Flujo de Conversión — Formulario de Reserva, Captura de Leads y Diferenciación de CTAs
  - [x] 6.1 Crear componente `BookingForm.tsx` con campos: nombre (required), email (required), teléfono/WhatsApp (required), curso de interés (select: Descubrimiento/Control/Waterstart), fecha preferida (date picker), mensaje (optional). Incluir botón de envío + botón alternativo "Contactar por WhatsApp".
  - [x] 6.2 Crear página `/reservar` (`src/app/[locale]/(public)/reservar/page.tsx`) que renderice `BookingForm` con diseño acorde a Brand Guidelines.
  - [x] 6.3 Crear API route `src/app/api/booking/route.ts` que reciba datos del formulario y lo almacene en Supabase. Enviar email de notificación a la academia.
  - [x] 6.4 Crear componente `LeadCaptureForm.tsx` con campos: nombre, email. Título: "¿Tienes dudas? Déjanos tu email y te contactamos". Estilo: sección pre-footer con gradiente Ocean Teal → Caribbean Aqua.
  - [x] 6.5 Crear API route `src/app/api/leads/route.ts` que almacene leads en Supabase.
  - [x] 6.6 Integrar `LeadCaptureForm` en la landing page (`page.tsx`) antes del footer.
  - [x] 6.7 Crear tablas en Supabase (`bookings` y `leads`) con los campos necesarios. Agregar migration SQL.
  - [x] 6.8 Revisar TODOS los CTAs de la página y reasignar rutas: botones de "Reservar" → `/reservar`, botones de "Ver Cursos" → scroll `#cursos` o `/cursos`.

- [x] 7.0 Páginas Legales — Privacidad y Términos (Ley 1581/2012)
  - [x] 7.1 Crear página `/privacidad` (`src/app/[locale]/(public)/privacidad/page.tsx`) con template de Política de Privacidad conforme a la Ley 1581 de 2012. Contenido: responsable del tratamiento (VERONIKITES), finalidad, derechos ARCO, procedimiento, vigencia.
  - [x] 7.2 Crear página `/terminos` (`src/app/[locale]/(public)/terminos/page.tsx`) con template de Términos y Condiciones. Contenido: descripción del servicio, condiciones de reserva/cancelación, limitación de responsabilidad, ley aplicable.
  - [x] 7.3 Actualizar `Footer.tsx`: cambiar los `href="#"` de "Privacidad" y "Términos" a las rutas reales (`/privacidad`, `/terminos`).
  - [x] 7.4 Agregar traducciones de las páginas legales en `es.json` y `en.json`.

- [x] 8.0 Footer y Navegación — Consolidación de Redes Sociales y Enlaces
  - [x] 8.1 En `Footer.tsx`, eliminar la duplicación de íconos de redes sociales. Consolidar en UNA sola ubicación con Instagram, Facebook, YouTube y TikTok.
  - [x] 8.2 En `Header.tsx`, agregar enlace "Reservar" en la navegación que apunte a `/reservar`, diferenciado visualmente del enlace "Cursos".
  - [x] 8.3 Verificar que el menú hamburguesa en mobile incluya el nuevo enlace "Reservar" y funcione correctamente.

- [x] 9.0 Sección "¿Por Qué Veroni Kite?" — Micro-CTAs e Imágenes
  - [x] 9.1 Agregar micro-CTA debajo de cada tarjeta de propuesta de valor en `AboutUs.tsx`: "Conoce a nuestros instructores →", "Descubre Salinas del Rey →", "Explora nuestro roadmap →". Actualizar `es.json` y `en.json`.
  - [x] 9.2 Agregar imágenes de apoyo a las tarjetas: `instructores.webp` para la tarjeta de instructores, `spot-salinas.webp` para la tarjeta de spot. Usar `<Image>` de Next.js.
  - [x] 9.3 Los micro-CTAs deben enlazar a secciones relevantes: instructores → ancla en la misma página o `/sobre-kitesurf`, spot → `/ubicacion`, roadmap → `/roadmap`.
