# Veronikites — Post-Presentation Improvements Spec

**Date:** 2026-03-18
**Context:** Feedback from client presentation meeting (~March 17) + competitive analysis of IKO International website.
**Approach:** Incremental by page. Placeholders where client material is pending.

---

## 1. Catálogo Unificado `/cursos`

The current 3-card course page transforms into a full-service catalog with internal navigation (tabs/anchors): **Cursos | Avanzado | Equipos | Downwind**.

### 1.1 Cursos de Aprendizaje (price update)

| Curso            | Duración | Precio COP  | Precio USD |
|------------------|----------|-------------|------------|
| Clase Individual | 1h       | $280,000    | ~$67       |
| Curso Básico     | 5h       | $1,110,000  | ~$264      |
| Curso Completo   | 10h      | $2,500,000  | ~$595      |

Existing card design, add IKO Certified badge per card.

### 1.2 Clases Avanzadas (new)

| Clase              | Precio COP      | Precio USD |
|--------------------|-----------------|------------|
| Kitefoil           | $280,000/sesión | ~$67       |
| Windfoil           | $280,000/sesión | ~$67       |
| Saltos Avanzados   | $200,000/sesión | ~$48       |
| Surf/Wave          | $200,000/sesión | ~$48       |

Tag visual "Avanzado" to differentiate. Placeholder descriptions until client provides detail.

### 1.3 Renta de Equipos (new)

| Servicio              | Precio COP     | Precio USD |
|-----------------------|----------------|------------|
| Equipo Completo (día) | $300,000/día   | ~$71       |
| Equipo Completo (hora)| $150,000/hora  | ~$36       |

Includes: cometa, barra, arnés, tabla. No individual piece breakdown (client decision).

**Asistencia en agua:** $100,000/sesión — acompañamiento en el agua sin instrucción formal (para kiters que necesitan apoyo pero no una clase completa).

### 1.4 Downwind Trips (new)

- Description of coastal route trips with Darwin.
- **Interactive Mapbox map** showing Barranquilla→Cartagena coast (east to west, following prevailing trade winds) with selectable route segments and approximate distances. Exact segments and details pending confirmation from Darwin.
- CTA: "Consultar disponibilidad" → WhatsApp (price on request).

### 1.5 Internal Navigation

Tabs or anchor links at the top of the page: **Cursos | Avanzado | Equipos | Downwind** for quick section jumping. Sticky on scroll for desktop.

All content bilingual (ES/EN) via existing next-intl setup.

---

## 2. Homepage — New Elements & Updates

**Updated homepage section order (top to bottom):**
1. Hero (video loop) — updated
2. **Social Proof Numbers** — NEW
3. ValueProposition ("Por qué Veronikites")
4. **Safety & Protocols** — NEW
5. CoursePreview
6. PublicRoadMap
7. OurHistory (quote updated)
8. **Photo Gallery** — NEW
9. InstructorTeam (enhanced profiles)
10. TestimonialCarousel (real testimonials)
11. **Upcoming Events** — NEW
12. CTABanner
13. LeadCaptureForm / Footer (email added)

### 2.1 Hero Video Loop

Replace single video with a configurable **sequence of video clips** playing in continuous loop with crossfade transitions. Muted, autoplay, cover — same style as current.

**Placeholder:** Keep current video. Infrastructure ready for easy clip swap when Mono sends new footage.

### 2.2 Upcoming Events Section (new)

Positioned after testimonials, before final CTA. Design:
- Title: "Próximos Eventos" / "Upcoming Events"
- Horizontal banner/carousel with 1-3 event cards
- Each card: image, name, date, short description, status badge ("Próximamente" / "En curso")
- Events stored as a config array in a dedicated file (`src/data/events.ts`). Simple structure — no Supabase table needed. Adding/removing events requires a small code change and redeploy, but keeps complexity low. Can migrate to Supabase later if event frequency justifies it.
- **Placeholder:** Generic "Salinas Fest 2026" event with placeholder image.

### 2.3 Social Proof Numbers (new, IKO-inspired)

Animated counter strip positioned between Hero and ValueProposition sections:
- "+X Estudiantes formados"
- "X+ Años de experiencia"
- "Certificados IKO"
- "5★ Google Reviews"

Numbers configurable via i18n or constants. GSAP count-up animation on viewport entry (GSAP already in project).

### 2.4 Photo Gallery (new)

Positioned after OurHistory, before InstructorTeam. Grid section showcasing the spot, sunsets, student groups, nautical center, daily life:
- Responsive grid: 3 cols desktop, 2 tablet, 1 mobile
- Lightbox on click for full-size viewing
- **Placeholder:** 6-8 placeholder images. Ready for real photos from Mono/Angie.

### 2.5 Our Story Quote Update

Replace:
> "El viento nos dio la libertad de vivir haciendo lo que amamos, conectados para siempre con el mar."

With:
> "Quiero hacer este deporte hasta que deje de respirar."

### 2.6 Contact Email

Add school's primary email in footer and contact section.
**Placeholder:** `contacto@veronikites.com` until Mono provides the real address.

---

## 3. Ubicación `/ubicacion` — Enhancements

### 3.1 Barranquilla as Arrival Option

Add second route in "Cómo llegar":
- **Desde Cartagena:** Aeropuerto Rafael Núñez → transporte terrestre ~2h
- **Desde Barranquilla:** Aeropuerto Ernesto Cortissoz → transporte terrestre ~1.5h

Both with note: Veronikites can coordinate transport.

### 3.2 Seasonal Wind Guide (new, IKO-inspired)

New subsection:
- Best months to kite (high season: Dec-Apr, Jun-Aug)
- Typical conditions by season: average wind speed, direction, water temperature
- Visual indicator (semaphore or bar): "Temporada Alta / Media / Baja"
- Complements the Windy dashboard widget — this is static planning info for visitors.

### 3.3 Accommodation

Existing section with generic text. Improve placeholders for when client adds specific lodging options with names and contact info.

---

## 4. Trust & Credibility (cross-cutting, IKO-inspired)

### 4.1 IKO Certification Badges

- IKO logo/badge visible on: homepage hero, courses page, instructor cards
- Accompanying text: "Escuela certificada IKO — estándar internacional de enseñanza"
- **Placeholder** until official logo asset is confirmed.

### 4.2 Safety & Protocols Section (new)

New standalone component rendered on the homepage after ValueProposition (implemented in step 2 alongside other homepage work, but the component is reusable cross-page). Content:
- **Safety protocols:** emergency system, student-instructor communication, delimited zones
- **Equipment standards:** maintenance and quality of gear used
- **Insurance:** liability coverage (placeholder until confirmed with client)
- **IKO Methodology:** brief explanation of standardized progressive system

Design: icons + short text per point. Clean, professional visual.

### 4.3 Enhanced Instructor Profiles

Expand current name+photo cards with:
- IKO certification level (e.g., "IKO Level 2 Instructor")
- Languages spoken
- Years of experience
- Specialty (e.g., "Freestyle", "Hydrofoil")
- Instagram link (optional)
- **Placeholders** for Cris, Lucho Frías, and others until Angie provides info.

### 4.4 Real Testimonials

Replace current placeholder testimonials:
- Structure ready for real reviews: name, photo, nationality, text
- Google Reviews badge/link for credibility
- **Placeholders** with internal note that Mono/Angie need to collect student reviews.

### 4.5 Google Reviews Integration

- Link to Google Business profile from testimonials section
- "Ver en Google" badge linking to the listing
- Note for client: link domain veronikites.com to Google Business profile (instructions provided separately).

---

## 5. Formulario de Reserva `/reservar` — Update

### 5.1 Expanded Course Options

The "Curso de interés" select field expands to include full catalog:

**Cursos de Aprendizaje:**
- Clase Individual (1h)
- Curso Básico (5h)
- Curso Completo (10h)

**Clases Avanzadas:**
- Kitefoil
- Windfoil
- Saltos Avanzados
- Surf/Wave

**Otros Servicios:**
- Renta de Equipos
- Asistencia (acompañamiento en el agua sin instrucción — $100,000/sesión)
- Salida Downwind

### 5.2 Google Sheets Sync

No structural changes — the course field is already free text. The new options flow through automatically.

### 5.3 WhatsApp Notification

No logic changes — already sends selected course in the notification message.

---

## Implementation Approach

**Incremental by page**, in this order:

1. **`/cursos`** — Prices, advanced classes, equipment rental, downwind with Mapbox map
2. **Homepage** — Hero video loop, events section, social proof, gallery, Our Story quote, email
3. **`/ubicacion`** — Barranquilla route, seasonal wind guide, accommodation placeholders
4. **Cross-cutting** — IKO badges, safety section, instructor profiles, testimonials, Google Reviews
5. **`/reservar`** — Expanded course options in form

Each page is completed and testable before moving to the next.

---

## Placeholders Awaiting Client Material

| Item | Who Provides | Status |
|------|-------------|--------|
| Hero video clips | Mono | Pending — send via WhatsApp |
| Instructor photos & info | Angie | Pending — coordinating |
| Real student testimonials | Mono/Angie | Pending — collect from students |
| Gallery photos (spot, sunsets, groups) | Mono/Angie | Pending |
| School email address | Mono | Pending |
| IKO logo/badge | Mono (from IKO affiliation) | Pending |
| Downwind route details & pricing | Mono/Darwin | Pending |
| Advanced class descriptions | Mono | Pending |
| Specific accommodation partners | Mono/Angie | Pending |
| Google Business profile link | Mono | Pending — verify listing |

---

## i18n Impact

All new content requires entries in both `src/messages/es.json` and `src/messages/en.json`. New keys needed for:
- `courses.advanced.*` — advanced class names, descriptions, prices
- `courses.rental.*` — equipment rental info
- `courses.downwind.*` — downwind trip info
- `courses.tabs.*` — tab navigation labels
- `home.events.*` — events section
- `home.socialProof.*` — counter labels
- `home.gallery.*` — gallery section
- `location.barranquilla.*` — second arrival route
- `location.seasonalGuide.*` — wind season info
- `trust.safety.*` — safety protocols (new top-level namespace)
- `trust.iko.*` — IKO certification text (new top-level namespace)
- `bookingForm.courseOptions.*` — expanded form options (extends existing `bookingForm` namespace)

## Dependencies

- **Mapbox GL JS** (`mapbox-gl` + `react-map-gl`) — new dependency for the interactive downwind map. Requires a Mapbox access token stored in `NEXT_PUBLIC_MAPBOX_TOKEN` env var. Free tier (50K map loads/month) is sufficient for expected traffic. Add token to `.env.example` and `.env.local`.
- **Lightbox library** — for photo gallery (e.g., `yet-another-react-lightbox` or similar lightweight option)
- No other new external dependencies expected. GSAP, Framer Motion, next-intl already in the project.

## Animation Library Guidance

The project uses both GSAP and Framer Motion. For new work in this spec:
- **GSAP** for scroll-triggered animations (counters, reveals) — consistent with existing `CoursePreview`, `TextReveal`, etc.
- **Framer Motion** for layout animations and simple transitions — consistent with existing dashboard components.
- Do not mix both in the same component.
