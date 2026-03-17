# PRD: Rediseño Visual y Mejora de Contenido — Veronikites

## 1. Introducción / Overview

La landing page de Veronikites (academia de kitesurf en Salinas del Rey, Colombia) tiene una base técnica sólida en Next.js, pero presenta deficiencias críticas en contenido visual, SEO técnico y flujo de conversión que limitan su puntuación actual a **6.2/10**.

Este PRD documenta los **20 hallazgos** de la auditoría 360° y establece los requisitos para llevar la efectividad de la página a **8.5+/10**, enfocándose en tres pilares:

1. **Impacto visual** — Hero con video, imágenes reales en tarjetas y testimonios
2. **SEO técnico completo** — OG tags, canonical, hreflang, Schema.org, meta keywords
3. **Flujo de conversión optimizado** — Diferenciación explorar vs. reservar, formulario de reserva + WhatsApp, captura de leads

**Puntuación objetivo:** 6.2/10 → 8.5+/10

---

## 2. Goals

| # | Objetivo | Métrica de éxito |
|---|----------|-----------------|
| G1 | Aumentar engagement del Hero | Tiempo de permanencia en Hero > 8s (actualmente ~3s estimado) |
| G2 | Mejorar SEO técnico | Implementar 100% de meta tags faltantes (og:image, canonical, hreflang, Schema.org) |
| G3 | Aumentar tasa de conversión | Incrementar clics en CTA de reserva ≥ 25% |
| G4 | Capturar leads no-listos | Obtener ≥ 10 emails/mes de visitantes interesados |
| G5 | Fortalecer prueba social | Integrar reseñas verificadas de Google Reviews y TripAdvisor |
| G6 | Cumplir requisitos legales | Publicar páginas de Privacidad y Términos (Ley 1581/2012) |
| G7 | Mejorar accesibilidad | Cumplir WCAG AA en todos los textos sobre fondo oscuro |

---

## 3. User Stories

| ID | Historia de Usuario |
|----|-------------------|
| US1 | Como visitante nuevo, quiero ver un video impactante de kitesurf al llegar a la página, para sentir la emoción del deporte y motivarme a explorar más. |
| US2 | Como usuario interesado, quiero ver qué incluye cada curso (equipo, contenido, ratio instructor/alumno), para tomar una decisión de compra informada. |
| US3 | Como usuario listo para reservar, quiero un formulario claro de reserva (separado de la exploración de cursos), para completar mi registro sin confusión. |
| US4 | Como usuario no-listo, quiero dejar mi email para recibir información, sin comprometerme a reservar todavía. |
| US5 | Como usuario investigando, quiero ver testimonios con fotos reales y enlaces a Google Reviews/TripAdvisor, para confiar en la academia. |
| US6 | Como usuario que comparte el link por WhatsApp, quiero que se muestre una vista previa atractiva con imagen y descripción, no un bloque genérico vacío. |
| US7 | Como usuario que busca "kitesurf Colombia" en Google, quiero que la academia aparezca en el Local Pack con información verificada (horarios, reseñas, ubicación). |

---

## 4. Requisitos Funcionales

Los requisitos están agrupados por los 20 hallazgos de la auditoría, organizados por prioridad descendente (severidad).

---

### 🔴 CRÍTICOS (Severidad 8-9)

#### RF-01: Hero con Video de Fondo (Auditoría #1 — Sev. 9)

1. El Hero DEBE mostrar un video de fondo en loop, muted, autoplay, de kitesurfistas en Salinas del Rey
2. El video DEBE cubrir el 100% del viewport del Hero (~100vh)
3. DEBE incluir un overlay semitransparente oscuro (≈ 40-50% opacidad) para legibilidad del texto
4. DEBE tener un fallback a imagen estática para conexiones lentas / mobile con `prefers-reduced-motion`
5. El peso del video DEBE ser ≤ 5MB (comprimir a 720p, formato WebM/MP4)

**Placeholder imagen fallback:** `hero-fallback.webp`

#### RF-02: Open Graph Image y URL (Auditoría #2 — Sev. 9)

1. DEBE existir una imagen OG de **1200×630px** con:
   - Logo VERONIKITES (ícono circular con ola + wordmark en Montserrat Bold)
   - Foto de acción de kitesurf (golden hour, agua turquesa)
   - Tagline oficial: *"Ride the Caribbean Soul"*
2. Colores de la composición: Deep Marine (`#264653`) + Ocean Teal (`#2A9D8F`) + Sand Gold (`#E9C46A`) para acentos
3. Agregar en `<head>`:
   ```html
   <meta property="og:image" content="https://veronikites.com/og-image.jpg" />
   <meta property="og:url" content="https://veronikites.com/" />
   <meta property="og:type" content="website" />
   <meta property="og:title" content="VERONIKITES Kite School — Ride the Caribbean Soul" />
   <meta property="og:description" content="Aprende kitesurf con instructores certificados IKO en Salinas del Rey, Caribe Colombiano. Donde el viento te encuentra." />
   ```

**Placeholder:** `og-image.jpg` (1200×630px)

#### RF-03: Canonical URL (Auditoría #3 — Sev. 8)

1. Agregar en `<head>`: `<link rel="canonical" href="https://veronikites.com/" />`
2. Cada subpágina DEBE tener su propio canonical apuntando a sí misma

#### RF-04: Arreglar Enlaces Rotos — Privacidad y Términos (Auditoría #4 — Sev. 8)

1. Crear página `/privacidad` con Política de Privacidad conforme a la **Ley 1581 de 2012** (Protección de Datos Personales de Colombia)
2. Crear página `/terminos` con Términos y Condiciones de uso del servicio
3. Actualizar los links del footer que actualmente apuntan a `#`
4. Las páginas legales DEBEN incluir como mínimo:
   - **Privacidad:** Responsable del tratamiento, finalidad, derechos ARCO, procedimiento para ejercer derechos, vigencia
   - **Términos:** Descripción del servicio, condiciones de reserva/cancelación, limitación de responsabilidad, ley aplicable

---

### 🟠 ALTOS (Severidad 7)

#### RF-05: Diferenciar Rutas de CTA — Explorar vs. Reservar (Auditoría #5 — Sev. 7)

1. Los botones "Ver Cursos" DEBEN llevar a la sección de información detallada de cursos (`/cursos` o scroll a `#cursos`)
2. Los botones "Reserva tu Clase" / "Reservar Ahora" DEBEN llevar al formulario de reserva (`/reservar` o modal)
3. El formulario de reserva DEBE contener:
   - Nombre completo (requerido)
   - Email (requerido)
   - Teléfono / WhatsApp (requerido)
   - Curso de interés (selector: Descubrimiento / Control de Kite / Waterstart)
   - Fecha preferida (date picker)
   - Mensaje adicional (opcional)
4. El formulario DEBE incluir también un **botón de WhatsApp** como canal alternativo de conversión
5. Al enviar el formulario, DEBE mostrar confirmación y enviar notificación al email de la academia

#### RF-06: Contenido Detallado en Tarjetas de Cursos (Auditoría #6 — Sev. 7)

1. Cada tarjeta de curso DEBE mostrar un listado de 3-4 puntos clave, por ejemplo:
   - **Descubrimiento:** "Incluye equipo completo", "Teoría de viento y seguridad", "Setup del kite en playa", "Máx. 2 alumnos por instructor"
   - **Control de Kite:** "Body drag en agua", "Control de barra y potencia", "Relanzamiento del kite", "Equipo incluido"
   - **Waterstart:** "Waterstart con tabla", "Navegación básica", "Técnicas de ceñida", "Video de tu sesión incluido"
2. Las tarjetas DEBEN mostrar fotos reales en lugar de íconos genéricos

**Placeholders:** `curso-descubrimiento.webp`, `curso-control-kite.webp`, `curso-waterstart.webp`

#### RF-07: Implementar Hreflang (Auditoría #7 — Sev. 7)

1. En TODAS las páginas, agregar en `<head>`:
   ```html
   <link rel="alternate" hreflang="es" href="https://veronikites.com/es/..." />
   <link rel="alternate" hreflang="en" href="https://veronikites.com/en/..." />
   <link rel="alternate" hreflang="x-default" href="https://veronikites.com/" />
   ```

#### RF-08: Schema.org JSON-LD (Auditoría #9 — Sev. 7)

1. Implementar `LocalBusiness` con: nombre, dirección, teléfono, horario, geo-coordenadas, imagen
2. Implementar `Course` para cada curso con: nombre, descripción, precio, proveedor, duración
3. Implementar `AggregateRating` con datos de Google Reviews
4. Implementar `FAQPage` si se agrega sección de preguntas frecuentes

#### RF-09: Formulario de Captura de Leads (Auditoría #19 — Sev. 7)

1. Agregar un formulario simple en la sección pre-footer:
   - Título: "¿Tienes dudas? Déjanos tu email y te contactamos"
   - Campos: Nombre, Email
   - Botón: "Enviar"
2. Opcionalmente, ofrecer un lead magnet: "Descarga nuestra guía: 5 cosas que debes saber antes de tu primera clase de kitesurf"
3. Los leads DEBEN almacenarse en una base de datos (Supabase) para seguimiento

---

### 🟡 MEDIOS (Severidad 5-6)

#### RF-10: Mejorar Prueba Social en Testimonios (Auditoría #8 — Sev. 6)

1. Cada testimonio DEBE incluir foto real del estudiante
2. DEBE mostrar la fecha de la experiencia
3. DEBE incluir enlace a reseña verificada (Google Reviews o TripAdvisor)
4. Agregar un widget o enlace directo a Google Reviews de la academia
5. Considerar badge "Verificado en Google" junto al nombre

**Placeholders:** `testimonio-1.webp`, `testimonio-2.webp`, `testimonio-3.webp`, `testimonio-4.webp`

#### RF-11: Mejorar H1 del Hero (Auditoría #11 — Sev. 6)

1. Reformular H1 para incluir contexto geográfico y propuesta de valor. Opciones basadas en los **taglines oficiales**:
   - **Opción A (Recomendada):** "Ride the Caribbean Soul" (tagline principal EN) — con subtítulo "Aprende kitesurf con una profesional del circuito mundial en Salinas del Rey"
   - **Opción B:** "Donde el Viento Te Encuentra" (tagline ES) — con subtítulo "Academia de kitesurf certificada IKO en el Caribe Colombiano"
   - **Opción C:** "Domina el Viento en el Caribe Colombiano" — subtítulo: "Instrucción personalizada con Veronika · Salinas del Rey"
2. Tipografía del H1: **Montserrat ExtraBold (800)** según Brand Guidelines
3. Agregar un **badge visual IKO** en Sand Gold (`#E9C46A`) junto al H1
4. El subtítulo DEBE usar **Inter Medium (500)** con color `Salt White (#FAFDF6)` o `rgba(255,255,255,0.85)` mínimo

**Placeholder:** `iko-badge.png`

#### RF-12: Reemplazar Imágenes Placeholder en Tarjetas de Cursos (Auditoría #18 — Sev. 6)

1. Reemplazar los fondos oscuros con ícono de diamante por fotos reales:
   - **Nivel 1 (Descubrimiento):** Estudiante con kite en la arena
   - **Nivel 2 (Control de Kite):** Body drag en el agua
   - **Nivel 3 (Waterstart):** Waterstart real sobre el agua
2. Las imágenes DEBEN estar en formato WebP, ≤ 200KB, mínimo 600×400px

*(Los placeholders ya están definidos en RF-06)*

#### RF-13: Micro-CTAs en "¿Por Qué Veronikites?" (Auditoría #12 — Sev. 5)

1. Agregar un enlace/micro-CTA en cada tarjeta de propuesta de valor:
   - "Instructores IKO" → "Conoce a nuestros instructores →"
   - "Spot de Clase Mundial" → "Descubre Salinas del Rey →"
   - "Progresión Garantizada" → "Explora nuestro roadmap →"
2. Estos enlaces DEBEN llevar a secciones relevantes o a `/cursos`

#### RF-14: Mejorar Contraste del Subtítulo del Hero (Auditoría #13 — Sev. 5)

1. Cambiar el color del subtítulo de `rgb(158, 175, 208)` a al menos `rgba(255, 255, 255, 0.85)`
2. Verificar que el ratio de contraste cumpla **WCAG AA** (mínimo 4.5:1 para texto regular)

#### RF-15: Corregir Botón "Ver Cursos" Redundante (Auditoría #16 — Sev. 5)

1. "Ver Cursos" DEBE hacer scroll suave a la sección `#cursos` en la misma página
2. "Reserva tu Clase" DEBE llevar al flujo de reserva (formulario/modal)
3. Ambos botones DEBEN tener estilos diferenciados (primario vs. secundario/outline)

---

### 🟢 BAJOS (Severidad 3-4)

#### RF-16: Meta Keywords (Auditoría #10 — Sev. 4)

1. Agregar:
   ```html
   <meta name="keywords" content="kitesurf Colombia, academia kitesurf Salinas del Rey, clases kitesurf Barranquilla, kitesurf certificación IKO, aprender kitesurf caribe, kiteboarding Colombia" />
   ```

#### RF-17: Preconexiones DNS (Auditoría #14 — Sev. 4)

1. Agregar en `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   ```
2. Agregar preconnect para CDN de imágenes/video si aplica

#### RF-18: Consolidar Íconos Sociales del Footer (Auditoría #15 — Sev. 4)

1. Mantener UNA sola sección de redes sociales en el footer
2. Asegurar que **Instagram, Facebook, YouTube y TikTok** estén presentes
3. Eliminar la duplicación actual

#### RF-19: Twitter Card Large Image (Auditoría #20 — Sev. 4)

1. Cambiar:
   ```html
   <meta name="twitter:card" content="summary_large_image" />
   <meta name="twitter:image" content="https://veronikites.com/og-image.jpg" />
   <meta name="twitter:title" content="Veronikites — Academia de Kitesurf en Salinas del Rey" />
   <meta name="twitter:description" content="Aprende kitesurf con instructores certificados IKO en el Caribe Colombiano." />
   ```

#### RF-20: Reposicionar Elemento Decorativo del Hero (Auditoría #17 — Sev. 3)

1. Mover el ícono/animación de mouse/scroll para que NO se superponga con el área de clic del CTA
2. Posicionarlo debajo de los botones como indicador de scroll-down

---

## 5. Non-Goals (Fuera de Alcance)

| # | Fuera de alcance |
|---|-----------------|
| NG1 | Rediseño completo de la marca o identidad visual (la paleta actual es premium y se mantiene) |
| NG2 | Migración de framework (Next.js se mantiene) |
| NG3 | Sistema de pagos en línea (la reserva es captura de datos, no cobro) |
| NG4 | Blog o sección de contenidos (puede ser fase futura) |
| NG5 | App móvil nativa |
| NG6 | Chat en vivo / chatbot (WhatsApp es el canal principal) |

---

## 6. Consideraciones de Diseño (Brand Guidelines Oficiales)

> Fuente: `Documents/Brand_Guidelines_VERONIKITES.docx`

### Posicionamiento de Marca

**VERONIKITES Kite School** — Fusión del nombre de la fundadora Veronika con 'kites'. Escuela de kitesurf **premium-accesible** en Salinas del Rey, liderada por una profesional del circuito mundial.

**Ventaja competitiva:** Única escuela fundada por una kitesurfista profesional del circuito mundial. Esta credencial debe ser el pilar de toda comunicación.

### Taglines Oficiales

| Uso | Tagline |
|-----|---------|
| **Principal (EN)** | *Ride the Caribbean Soul* |
| **Secundario (ES)** | *Donde el viento te encuentra* |
| **Alternativo** | *Born to Ride. Made in Colombia.* |

### Paleta de Colores Oficial

| Color | Nombre | HEX | Uso y Proporción |
|-------|--------|-----|-----------------|
| 🟢 | **Ocean Teal** | `#2A9D8F` | **Primario (40%).** Logo, headers, CTAs. Confianza, profesionalismo, conexión oceánica |
| 🔵 | **Deep Marine** | `#264653` | **Secundario (25%).** Textos principales, fondos oscuros. Profundidad, expertise |
| ⚪ | **Salt White** | `#FAFDF6` | **Neutro claro (20%).** Fondos, espacios en blanco. Espuma del mar |
| 🩵 | **Caribbean Aqua** | `#76C7C0` | **Acento 1 (10%).** Gradientes, fondos suaves, hover states. Frescura |
| 🟡 | **Sand Gold** | `#E9C46A` | **Acento 2 (5%).** Badges, ofertas, detalles premium. Calidez, aspiración |
| ⚫ | **Night Tide** | `#1A1A2E` | **Neutro oscuro.** Textos sobre fondos claros, modo oscuro |

**Gradiente Principal:**
```css
background: linear-gradient(135deg, #2A9D8F 0%, #76C7C0 100%);
/* Uso: fondos hero, tarjetas destacadas */
```

> ⚠️ **IMPORTANTE:** La paleta actual del sitio (azul oscuro, verde esmeralda, naranja) DEBE migrarse a la paleta oficial. El naranja se reemplaza por **Sand Gold** (`#E9C46A`). El verde esmeralda se reemplaza por **Ocean Teal** (`#2A9D8F`).

### Tipografía

| Rol | Font | Peso | Uso |
|-----|------|------|-----|
| **Headings** | **Montserrat** | Bold (700) / ExtraBold (800) | Títulos, nombre de marca, H1-H3. Fallback: Poppins, Raleway |
| **Body** | **Inter** | Regular (400) / Medium (500) | Texto corrido, descripciones, UI. Fallback: Open Sans |
| **Accent** | **Caveat** | SemiBold (600) | Handwritten casual. **SOLO 5-10% del diseño.** Notas personales de Veronika, precios especiales, anotaciones. Fallback: Kalam |

### Estilo Fotográfico (Directrices para Imágenes)

**Mood General:**
- Luz natural dorada (golden hour)
- Composiciones limpias con horizonte visible
- Agua cristalina turquesa
- Saturación levemente aumentada en azules/teals
- Contraste medio-alto
- No sobre-editado

**Sujetos Principales:**
- Riders en acción con kites coloridos
- Atardeceres sobre el mar de Salinas del Rey
- Detalle de equipos profesionales
- Veronika enseñando a alumnos
- Momentos de logro (primer waterstart, primer salto)

**❌ Evitar en Fotos:**
- Fotos granuladas de baja calidad
- Filtros vintage pesados
- Fotos de stock genéricas
- Composiciones centradas sin dinamismo

### Elementos Gráficos

| Elemento | Especificación |
|----------|---------------|
| **Patrones** | Ondas lineales sutiles (wave patterns) como fondos o bordes. Líneas fluidas que evocan viento y agua |
| **Iconos** | Line icons con trazo uniforme de **2px**, esquinas redondeadas, monocromáticos en Ocean Teal |
| **Formas** | Orgánicas redondeadas. `border-radius: 16px` en tarjetas. Evitar ángulos agresivos |

### Voz de Marca

**Tono:** Profesional pero cercana. Como una instructora experta que también es tu amiga. Bilingüe natural (español/inglés) con terminología de kite en inglés.

**Personalidad:** Confiable — Experta — Cálida — Apasionada — Clara

| ✅ Hacer | ❌ No Hacer |
|----------|------------|
| Usar datos concretos (nudos de viento, certificaciones IKO) | Usar jerga técnica sin explicar |
| Mostrar resultados reales de alumnos | Sonar corporativa o fría |
| Hablar con autoridad pero sin arrogancia | Prometer sin cumplir |
| Mezclar contenido educativo con lifestyle | Publicar contenido de baja calidad visual |

**Hashtags Core:** `#VeronikitesSchool` `#RideTheCaribbean` `#SalinasDelRey` `#KitesurfColombia` `#KiteLife`

### Principios de Diseño para esta Iteración

1. **Emoción antes que información** — El video/imagen del Hero debe generar deseo visceral (golden hour, agua turquesa)
2. **Claridad de ruta** — El usuario debe saber en todo momento si está explorando o reservando
3. **Prueba social visible** — Los testimonios deben sentirse reales, no genéricos
4. **Mobile-first** — Todas las mejoras deben funcionar impecablemente en mobile
5. **Consistencia de marca** — Todos los elementos deben seguir la paleta, tipografía y estilo fotográfico definidos arriba
6. **Accent con moderación** — Caveat (handwritten) solo en 5-10% del diseño para toques personales de Veronika

---

## 7. Consideraciones Técnicas

| Área | Detalle |
|------|---------|
| **Framework** | Next.js (mantener). Usar `next/image` para optimización automática de imágenes |
| **Video** | Usar `<video>` nativo con `poster` attribute para fallback. Formatos: MP4 + WebM |
| **Formulario** | Conectar a Supabase para almacenar leads y reservas |
| **Schema.org** | Implementar via `<script type="application/ld+json">` en el layout principal |
| **i18n** | Hreflang tags dinámicas basadas en la configuración existente de `next-intl` |
| **Legal** | Generar templates de Privacidad (Ley 1581/2012) y Términos |
| **OG Image** | Archivo estático en `/public/og-image.jpg` |
| **Imágenes** | Ruta: `/public/images/` — Formato WebP, optimizadas ≤ 200KB |

---

## 8. Success Metrics

| Métrica | Actual (estimado) | Objetivo | Plazo |
|---------|-------------------|----------|-------|
| Puntuación general de página | 6.2/10 | 8.5+/10 | 4 semanas |
| Tiempo en Hero (engagement) | ~3s | >8s | 2 semanas |
| CTR botones de reserva | Bajo (sin diferenciación) | +25% | 4 semanas |
| Leads capturados por email | 0/mes | ≥10/mes | 6 semanas |
| Vista previa en WhatsApp | Genérica (sin imagen) | Con imagen OG + descripción | 1 semana |
| SEO: Meta tags completos | ~40% | 100% | 2 semanas |
| Lighthouse SEO score | Estimado 70-80 | ≥95 | 3 semanas |

---

## 9. Tabla de Imágenes — Placeholders y Archivos Requeridos

> **Instrucciones:** Todas las imágenes deben colocarse en la ruta `/public/images/`. Los formatos recomendados son **WebP** para web y **JPG** para la OG image. A continuación la tabla completa de archivos necesarios.

| # | Nombre del Archivo | Dimensiones | Formato | Ubicación en la Página | Descripción de la Foto |
|---|-------------------|-------------|---------|----------------------|----------------------|
| 1 | `hero-video.mp4` | 1920×1080 | MP4 | Hero Section — Video de fondo | Video en loop (10-20s) de kitesurfistas navegando en Salinas del Rey. **Golden hour** preferido. Acción dinámica: saltos, navegación, olas. Agua turquesa cristalina, saturación levemente aumentada en azules/teals. Sin audio. Contraste medio-alto, NO sobre-editado. |
| 2 | `hero-video.webm` | 1920×1080 | WebM | Hero Section — Video de fondo (fallback) | Mismo video que `hero-video.mp4` en formato WebM para compatibilidad. |
| 3 | `hero-fallback.webp` | 1920×1080 | WebP | Hero Section — Imagen fallback | Frame del video o foto estilo **golden hour**: kitesurfista en acción, horizonte visible, luz natural dorada, agua turquesa de Salinas del Rey. Composición limpia, NO centrada (usar regla de tercios). |
| 4 | `og-image.jpg` | 1200×630 | JPG | Meta tags (Open Graph / Twitter) | Composición con: logo VERONIKITES (ícono circular + wordmark Montserrat Bold) en esquina, foto de acción en el centro, tagline *"Ride the Caribbean Soul"* superpuesto. Colores: Deep Marine (`#264653`) + Ocean Teal (`#2A9D8F`) + Sand Gold (`#E9C46A`) para acentos. |
| 5 | `curso-descubrimiento.webp` | 600×400 (mín.) | WebP | Tarjeta del curso Descubrimiento | Estudiante principiante en la playa con el kite inflado, recibiendo instrucciones del instructor. Arena dorada, kite colorido en primer plano. Ambiente de aprendizaje seguro y divertido. |
| 6 | `curso-control-kite.webp` | 600×400 (mín.) | WebP | Tarjeta del curso Control de Kite | Estudiante realizando body drag en el agua con el kite controlado, instructor cerca supervisando. El agua a la cintura, espuma del movimiento, kite en el cielo. Progresión visible. |
| 7 | `curso-waterstart.webp` | 600×400 (mín.) | WebP | Tarjeta del curso Waterstart | Estudiante levantándose sobre la tabla (waterstart) con expresión de logro. Tabla visible, agua salpicando, kite en posición de potencia. Momento épico de éxito. |
| 8 | `testimonio-1.webp` | 200×200 (mín.) | WebP | Sección Testimonios — Testimonio 1 | Retrato del estudiante (rostro visible, sonriente), idealmente con equipo de kite o playa de fondo. Foto casual y auténtica, no estudio. |
| 9 | `testimonio-2.webp` | 200×200 (mín.) | WebP | Sección Testimonios — Testimonio 2 | Retrato del segundo estudiante. Mismo estilo: sonriente, ambiente de playa/kitesurf, foto real tomada durante o después de la clase. |
| 10 | `testimonio-3.webp` | 200×200 (mín.) | WebP | Sección Testimonios — Testimonio 3 | Retrato del tercer estudiante. Puede ser una pareja o grupo pequeño que tomó clases juntos. Energía positiva y felicidad. |
| 11 | `testimonio-4.webp` | 200×200 (mín.) | WebP | Sección Testimonios — Testimonio 4 | Retrato del cuarto estudiante. Variedad en nacionalidad/género si es posible, para reflejar la diversidad de estudiantes. |
| 12 | `iko-badge.png` | 120×120 | PNG | Hero Section — Badge junto al H1 | Logo oficial de certificación IKO (International Kiteboarding Organization). Fondo transparente. Se mostrará como badge de confianza junto al headline principal. |
| 13 | `spot-salinas.webp` | 800×500 (mín.) | WebP | Sección "¿Por Qué Veronikites?" — Tarjeta Spot | Vista panorámica de la playa/spot de Salinas del Rey. Agua turquesa, playa amplia, condiciones de viento visibles (kites en el cielo a lo lejos). Muestra por qué es un spot de clase mundial. |
| 14 | `instructores.webp` | 800×500 (mín.) | WebP | Sección "¿Por Qué Veronikites?" — Tarjeta Instructores | Foto grupal o individual de los instructores de Veronikites con equipo. Vestidos con branding de la academia, en la playa, actitud profesional pero cercana. |
| 15 | `lead-magnet-preview.webp` | 400×300 | WebP | Sección de captura de leads (opcional) | Mockup visual de la guía "5 cosas que debes saber antes de tu primera clase de kitesurf". Diseño editorial con colores de marca. Solo si se implementa el lead magnet como descarga. |

---

## 10. Ruta de Archivos de Imágenes

```
/public/images/
├── hero-video.mp4
├── hero-video.webm
├── hero-fallback.webp
├── og-image.jpg
├── cursos/
│   ├── curso-descubrimiento.webp
│   ├── curso-control-kite.webp
│   └── curso-waterstart.webp
├── testimonios/
│   ├── testimonio-1.webp
│   ├── testimonio-2.webp
│   ├── testimonio-3.webp
│   └── testimonio-4.webp
├── badges/
│   └── iko-badge.png
├── about/
│   ├── spot-salinas.webp
│   └── instructores.webp
└── lead-magnet-preview.webp (opcional)
```

> **Acción requerida del usuario:** Preparar y colocar cada archivo en la ruta indicada. Los nombres DEBEN coincidir exactamente con los listados arriba para que los componentes los encuentren correctamente.

---

## 11. Open Questions

| # | Pregunta |
|---|---------|
| OQ1 | ¿El video del Hero ya está editado/cortado o necesita post-producción? ¿Cuál es la duración ideal del loop? |
| OQ2 | ¿Cuáles son los nombres reales de los estudiantes para los testimonios? ¿Se tiene su consentimiento para usar su foto y nombre? |
| OQ3 | ¿Cuál es el enlace exacto al perfil de Google Reviews de Veronikites? |
| OQ4 | ¿Cuál es el enlace exacto al perfil de TripAdvisor de Veronikites? |
| OQ5 | ¿Los puntos clave de cada curso (RF-06) son correctos o hay que ajustar el contenido? |
| OQ6 | ¿El lead magnet (guía descargable) se incluye en esta fase o se pospone? |
| OQ7 | ¿Las coordenadas geográficas exactas del spot para Schema.org LocalBusiness? |
| OQ8 | ¿La dirección oficial y horarios de operación de la academia para Schema.org? |
