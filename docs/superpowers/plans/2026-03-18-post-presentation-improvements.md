# Post-Presentation Improvements Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all client feedback from March 17 presentation + IKO-inspired trust improvements across the Veronikites website.

**Architecture:** Incremental by page — each page is completed and testable before moving to the next. New components follow existing patterns (client components with `'use client'`, i18n via `useTranslations`, GSAP for scroll animations). All content is bilingual ES/EN.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, GSAP, Framer Motion, next-intl, Mapbox GL JS (new), yet-another-react-lightbox (new)

**Spec:** `docs/superpowers/specs/2026-03-18-post-presentation-improvements-design.md`

---

## Chunk 1: `/cursos` — Unified Service Catalog

### Task 1: Update course prices and add tab navigation i18n keys

**Files:**
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add new i18n keys for tabs, advanced courses, rental, and downwind in `src/messages/es.json`**

Inside the existing `"courses"` object, add these keys after the existing `completeH4` key:

```json
"tabCourses": "Cursos",
"tabAdvanced": "Avanzado",
"tabEquipment": "Equipos",
"tabDownwind": "Downwind",
"advancedSectionTitle": "Clases Avanzadas",
"advancedSectionSubtitle": "Para kiters que buscan dominar nuevas disciplinas",
"kitefoilName": "Kitefoil",
"kitefoilH1": "Aprende a volar sobre el agua con hydrofoil",
"kitefoilH2": "Sesión personalizada con instructor especializado",
"kitefoilH3": "Equipo de foil incluido",
"kitefoilH4": "Nivel requerido: Rider Independiente",
"windfoilName": "Windfoil",
"windfoilH1": "Domina el windfoil con vientos ligeros",
"windfoilH2": "Sesión personalizada con instructor especializado",
"windfoilH3": "Equipo completo incluido",
"windfoilH4": "Nivel requerido: Rider Independiente",
"jumpName": "Saltos Avanzados",
"jumpH1": "Técnica de saltos y maniobras aéreas",
"jumpH2": "Sesión personalizada con instructor especializado",
"jumpH3": "Análisis de video incluido",
"jumpH4": "Nivel requerido: Avanzado",
"surfName": "Surf / Wave",
"surfH1": "Kitesurf en olas y wave riding",
"surfH2": "Sesión personalizada con instructor especializado",
"surfH3": "Equipo de surf incluido",
"surfH4": "Nivel requerido: Avanzado",
"perSession": "sesión",
"advancedTag": "Avanzado",
"rentalSectionTitle": "Renta de Equipos",
"rentalSectionSubtitle": "Equipo completo para kiters independientes",
"rentalDayName": "Equipo Completo — Día",
"rentalDayH1": "Cometa, barra, arnés y tabla",
"rentalDayH2": "Disponible todo el día",
"rentalDayH3": "Seguro básico incluido",
"rentalDayH4": "Nivel requerido: Rider Independiente",
"rentalHourName": "Equipo Completo — Hora",
"rentalHourH1": "Cometa, barra, arnés y tabla",
"rentalHourH2": "Flexibilidad por hora",
"rentalHourH3": "Seguro básico incluido",
"rentalHourH4": "Nivel requerido: Rider Independiente",
"assistanceName": "Asistencia en Agua",
"assistanceH1": "Acompañamiento en el agua sin instrucción formal",
"assistanceH2": "Para kiters que necesitan apoyo adicional",
"assistanceH3": "Comunicación por radio incluida",
"assistanceH4": "Ideal para practicar con respaldo",
"perDay": "día",
"downwindSectionTitle": "Salidas Downwind",
"downwindSectionSubtitle": "Recorre la costa del Caribe colombiano con el viento a favor",
"downwindDescription": "Explora la espectacular costa entre Barranquilla y Cartagena en salidas guiadas de downwind con Darwin. Escoge tu tramo y vive una aventura única navegando con el viento a favor.",
"downwindCta": "Consultar Disponibilidad",
"downwindMapLabel": "Rutas Disponibles"
```

- [ ] **Step 2: Add equivalent English keys in `src/messages/en.json`**

Same structure inside the `"courses"` object:

```json
"tabCourses": "Courses",
"tabAdvanced": "Advanced",
"tabEquipment": "Equipment",
"tabDownwind": "Downwind",
"advancedSectionTitle": "Advanced Classes",
"advancedSectionSubtitle": "For kiters looking to master new disciplines",
"kitefoilName": "Kitefoil",
"kitefoilH1": "Learn to fly above the water with hydrofoil",
"kitefoilH2": "Personalized session with specialized instructor",
"kitefoilH3": "Foil equipment included",
"kitefoilH4": "Required level: Independent Rider",
"windfoilName": "Windfoil",
"windfoilH1": "Master windfoil riding in light winds",
"windfoilH2": "Personalized session with specialized instructor",
"windfoilH3": "Full equipment included",
"windfoilH4": "Required level: Independent Rider",
"jumpName": "Advanced Jumps",
"jumpH1": "Jump technique and aerial maneuvers",
"jumpH2": "Personalized session with specialized instructor",
"jumpH3": "Video analysis included",
"jumpH4": "Required level: Advanced",
"surfName": "Surf / Wave",
"surfH1": "Kitesurfing in waves and wave riding",
"surfH2": "Personalized session with specialized instructor",
"surfH3": "Surf equipment included",
"surfH4": "Required level: Advanced",
"perSession": "session",
"advancedTag": "Advanced",
"rentalSectionTitle": "Equipment Rental",
"rentalSectionSubtitle": "Full gear for independent kiters",
"rentalDayName": "Full Equipment — Day",
"rentalDayH1": "Kite, bar, harness and board",
"rentalDayH2": "Available all day",
"rentalDayH3": "Basic insurance included",
"rentalDayH4": "Required level: Independent Rider",
"rentalHourName": "Full Equipment — Hour",
"rentalHourH1": "Kite, bar, harness and board",
"rentalHourH2": "Flexible hourly rental",
"rentalHourH3": "Basic insurance included",
"rentalHourH4": "Required level: Independent Rider",
"assistanceName": "Water Assistance",
"assistanceH1": "On-water support without formal instruction",
"assistanceH2": "For kiters who need extra backup",
"assistanceH3": "Radio communication included",
"assistanceH4": "Ideal for practice with safety support",
"perDay": "day",
"downwindSectionTitle": "Downwind Trips",
"downwindSectionSubtitle": "Ride the Colombian Caribbean coast with the wind at your back",
"downwindDescription": "Explore the spectacular coast between Barranquilla and Cartagena on guided downwind trips with Darwin. Choose your leg and enjoy a unique adventure sailing downwind.",
"downwindCta": "Check Availability",
"downwindMapLabel": "Available Routes"
```

- [ ] **Step 3: Commit**

```bash
git add src/messages/es.json src/messages/en.json
git commit -m "feat(i18n): add keys for advanced courses, equipment rental, and downwind"
```

---

### Task 2: Update course prices in CoursesClient

**Files:**
- Modify: `src/app/[locale]/(public)/cursos/CoursesClient.tsx`

- [ ] **Step 1: Update prices in the `allCourses` array**

In `CoursesClient.tsx`, update the `allCourses` array (around lines 13-29). Change:
- Course `id: '1'` (Clase Individual): `price: 250000` → `price: 280000`, `priceUSD: 60` → `priceUSD: 67`
- Course `id: '2'` (Curso Básico): `price: 1300000` → `price: 1110000`, `priceUSD: 310` → `priceUSD: 264`
- Course `id: '3'` (Curso Completo): `priceUSD: 595` stays the same, `price: 2500000` stays the same

- [ ] **Step 2: Verify page renders correctly**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/(public)/cursos/CoursesClient.tsx
git commit -m "fix: update course prices — Individual $280K, Basic $1.11M per client feedback"
```

---

### Task 3: Add advanced courses, rental, and assistance sections to CoursesClient

**Files:**
- Modify: `src/app/[locale]/(public)/cursos/CoursesClient.tsx`

- [ ] **Step 1: Add advanced courses data array after `allCourses`**

Add below the existing `allCourses` array:

```typescript
const advancedCourses = [
    {
        id: 'adv-1',
        slug: 'kitefoil',
        nameKey: 'kitefoilName',
        price: 280000,
        priceUSD: 67,
        priceUnit: 'session' as const,
        gradient: 'from-ocean-teal to-deep-marine-500',
        highlightKeys: ['kitefoilH1', 'kitefoilH2', 'kitefoilH3', 'kitefoilH4'],
    },
    {
        id: 'adv-2',
        slug: 'windfoil',
        nameKey: 'windfoilName',
        price: 280000,
        priceUSD: 67,
        priceUnit: 'session' as const,
        gradient: 'from-ocean-teal to-deep-marine-500',
        highlightKeys: ['windfoilH1', 'windfoilH2', 'windfoilH3', 'windfoilH4'],
    },
    {
        id: 'adv-3',
        slug: 'saltos-avanzados',
        nameKey: 'jumpName',
        price: 200000,
        priceUSD: 48,
        priceUnit: 'session' as const,
        gradient: 'from-deep-marine-500 to-deep-marine-600',
        highlightKeys: ['jumpH1', 'jumpH2', 'jumpH3', 'jumpH4'],
    },
    {
        id: 'adv-4',
        slug: 'surf-wave',
        nameKey: 'surfName',
        price: 200000,
        priceUSD: 48,
        priceUnit: 'session' as const,
        gradient: 'from-deep-marine-500 to-deep-marine-600',
        highlightKeys: ['surfH1', 'surfH2', 'surfH3', 'surfH4'],
    },
];

const rentalServices = [
    {
        id: 'rent-1',
        slug: 'equipo-dia',
        nameKey: 'rentalDayName',
        price: 300000,
        priceUSD: 71,
        priceUnit: 'day' as const,
        gradient: 'from-sand-gold to-sand-gold-600',
        highlightKeys: ['rentalDayH1', 'rentalDayH2', 'rentalDayH3', 'rentalDayH4'],
    },
    {
        id: 'rent-2',
        slug: 'equipo-hora',
        nameKey: 'rentalHourName',
        price: 150000,
        priceUSD: 36,
        priceUnit: 'hour' as const,
        gradient: 'from-sand-gold to-sand-gold-600',
        highlightKeys: ['rentalHourH1', 'rentalHourH2', 'rentalHourH3', 'rentalHourH4'],
    },
    {
        id: 'rent-3',
        slug: 'asistencia',
        nameKey: 'assistanceName',
        price: 100000,
        priceUSD: 24,
        priceUnit: 'session' as const,
        gradient: 'from-sand-gold to-sand-gold-600',
        highlightKeys: ['assistanceH1', 'assistanceH2', 'assistanceH3', 'assistanceH4'],
    },
];
```

- [ ] **Step 2: Add tab navigation at the top of the page**

Add tab state and tab UI. At the top of the component function, add:

```typescript
const [activeTab, setActiveTab] = useState('courses');

const tabs = [
    { id: 'courses', labelKey: 'tabCourses' },
    { id: 'advanced', labelKey: 'tabAdvanced' },
    { id: 'equipment', labelKey: 'tabEquipment' },
    { id: 'downwind', labelKey: 'tabDownwind' },
];
```

Add the tab bar JSX before the courses grid. It should be sticky on desktop:

```tsx
<div className="sticky top-16 z-30 bg-deep-marine-900/95 backdrop-blur-sm border-b border-white/10 -mx-4 px-4 py-3 mb-8">
    <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => {
                    setActiveTab(tab.id);
                    document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                        ? 'bg-ocean-teal text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
            >
                {t(tab.labelKey)}
            </button>
        ))}
    </div>
</div>
```

- [ ] **Step 3: Render advanced courses section with `id="advanced"`**

After the existing courses grid, add a new section. Reuse the same card rendering logic but with `advancedCourses` data and an "Avanzado" tag badge on each card. Use the existing card markup pattern from the component — add a small badge:

```tsx
<div id="advanced" className="mt-16 scroll-mt-24">
    <h2 className="text-3xl font-bold text-white mb-2">{t('advancedSectionTitle')}</h2>
    <p className="text-white/70 mb-8">{t('advancedSectionSubtitle')}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advancedCourses.map((course) => (
            /* Same card pattern as existing courses, but add tag badge */
        ))}
    </div>
</div>
```

For the price unit display, map `priceUnit` to the i18n key: `'session'` → `t('perSession')`, `'hour'` → `t('perHour')`, `'day'` → `t('perDay')`.

- [ ] **Step 4: Render rental services section with `id="equipment"`**

```tsx
<div id="equipment" className="mt-16 scroll-mt-24">
    <h2 className="text-3xl font-bold text-white mb-2">{t('rentalSectionTitle')}</h2>
    <p className="text-white/70 mb-8">{t('rentalSectionSubtitle')}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalServices.map((service) => (
            /* Same card pattern */
        ))}
    </div>
</div>
```

- [ ] **Step 5: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 6: Commit**

```bash
git add src/app/[locale]/(public)/cursos/CoursesClient.tsx
git commit -m "feat(courses): add advanced classes, equipment rental, and tab navigation"
```

---

### Task 4: Install Mapbox and create Downwind map component

**Files:**
- Create: `src/components/public/DownwindMap.tsx`
- Modify: `src/app/[locale]/(public)/cursos/CoursesClient.tsx`
- Modify: `.env.example`

- [ ] **Step 1: Install Mapbox dependencies**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm install mapbox-gl react-map-gl
```

- [ ] **Step 2: Add `@types/mapbox-gl` if needed and add env var to `.env.example`**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm install -D @types/mapbox-gl
```

Add to `.env.example`:
```
# Mapbox (Downwind Map)
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

- [ ] **Step 3: Create `src/components/public/DownwindMap.tsx`**

```tsx
'use client';

import { useCallback, useState } from 'react';
import Map, { Source, Layer, Marker, type MapMouseEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface RouteSegment {
    id: string;
    name: string;
    from: string;
    to: string;
    distanceKm: number;
    coordinates: [number, number][];
}

const ROUTE_SEGMENTS: RouteSegment[] = [
    {
        id: 'segment-1',
        name: 'Puerto Velero → Salinas del Rey',
        from: 'Puerto Velero',
        to: 'Salinas del Rey',
        distanceKm: 15,
        coordinates: [
            [-75.035, 10.945],
            [-75.15, 10.88],
            [-75.28, 10.82],
            [-75.38, 10.79],
        ],
    },
    {
        id: 'segment-2',
        name: 'Salinas del Rey → Galerazamba',
        from: 'Salinas del Rey',
        to: 'Galerazamba',
        distanceKm: 20,
        coordinates: [
            [-75.38, 10.79],
            [-75.45, 10.77],
            [-75.52, 10.75],
            [-75.58, 10.74],
        ],
    },
    {
        id: 'segment-3',
        name: 'Galerazamba → Cartagena',
        from: 'Galerazamba',
        to: 'Cartagena',
        distanceKm: 40,
        coordinates: [
            [-75.58, 10.74],
            [-75.62, 10.68],
            [-75.53, 10.45],
            [-75.51, 10.40],
        ],
    },
];

const ROUTE_GEOJSON = {
    type: 'FeatureCollection' as const,
    features: ROUTE_SEGMENTS.map((seg) => ({
        type: 'Feature' as const,
        properties: { id: seg.id, name: seg.name, distanceKm: seg.distanceKm },
        geometry: {
            type: 'LineString' as const,
            coordinates: seg.coordinates,
        },
    })),
};

interface DownwindMapProps {
    t: (key: string) => string;
    whatsappUrl: string;
}

export default function DownwindMap({ t, whatsappUrl }: DownwindMapProps) {
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

    const handleClick = useCallback((e: MapMouseEvent) => {
        const features = e.features;
        if (features && features.length > 0) {
            setSelectedSegment(features[0].properties?.id || null);
        } else {
            setSelectedSegment(null);
        }
    }, []);

    if (!MAPBOX_TOKEN) {
        return (
            <div className="w-full h-[400px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                Mapa disponible próximamente
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10">
                <Map
                    initialViewState={{
                        longitude: -75.35,
                        latitude: 10.7,
                        zoom: 9,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/dark-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    interactiveLayerIds={['route-lines']}
                    onClick={handleClick}
                >
                    <Source id="routes" type="geojson" data={ROUTE_GEOJSON}>
                        <Layer
                            id="route-lines"
                            type="line"
                            paint={{
                                'line-color': [
                                    'case',
                                    ['==', ['get', 'id'], selectedSegment || ''],
                                    '#E9C46A',
                                    '#2A9D8F',
                                ],
                                'line-width': [
                                    'case',
                                    ['==', ['get', 'id'], selectedSegment || ''],
                                    5,
                                    3,
                                ],
                                'line-opacity': 0.85,
                            }}
                            layout={{
                                'line-cap': 'round',
                                'line-join': 'round',
                            }}
                        />
                    </Source>
                    {ROUTE_SEGMENTS.map((seg) => (
                        <Marker
                            key={seg.id}
                            longitude={seg.coordinates[0][0]}
                            latitude={seg.coordinates[0][1]}
                        >
                            <div className="w-3 h-3 rounded-full bg-ocean-teal border-2 border-white shadow-lg" />
                        </Marker>
                    ))}
                </Map>
            </div>

            {/* Segment list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ROUTE_SEGMENTS.map((seg) => (
                    <button
                        key={seg.id}
                        onClick={() => setSelectedSegment(seg.id === selectedSegment ? null : seg.id)}
                        className={`p-4 rounded-xl text-left transition-all border ${
                            selectedSegment === seg.id
                                ? 'bg-ocean-teal/20 border-ocean-teal text-white'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                    >
                        <p className="font-medium text-sm">{seg.name}</p>
                        <p className="text-xs mt-1 opacity-70">~{seg.distanceKm} km</p>
                    </button>
                ))}
            </div>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.809-6.243-2.162l-.436-.348-2.664.893.893-2.664-.348-.436A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                {t('downwindCta')}
            </a>
        </div>
    );
}
```

- [ ] **Step 4: Add downwind section to CoursesClient**

Import the DownwindMap component and add section with `id="downwind"` after the rental section:

```tsx
import dynamic from 'next/dynamic';

const DownwindMap = dynamic(() => import('@/components/public/DownwindMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] rounded-2xl bg-white/5 animate-pulse" />
    ),
});
```

In the JSX:

```tsx
<div id="downwind" className="mt-16 scroll-mt-24">
    <h2 className="text-3xl font-bold text-white mb-2">{t('downwindSectionTitle')}</h2>
    <p className="text-white/70 mb-4">{t('downwindSectionSubtitle')}</p>
    <p className="text-white/60 mb-8 max-w-2xl">{t('downwindDescription')}</p>
    <DownwindMap
        t={t}
        whatsappUrl={`https://wa.me/573017464927?text=${encodeURIComponent('Hola, me interesa una salida de Downwind con Veronikites!')}`}
    />
</div>
```

- [ ] **Step 5: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 6: Commit**

```bash
git add src/components/public/DownwindMap.tsx src/app/[locale]/(public)/cursos/CoursesClient.tsx .env.example package.json package-lock.json
git commit -m "feat(courses): add downwind section with interactive Mapbox map"
```

---

## Chunk 2: Homepage — New Sections & Updates

### Task 5: Update Our Story quote

**Files:**
- Modify: `src/messages/es.json` (line ~143, `ourHistory.pullQuote`)
- Modify: `src/messages/en.json` (line ~143, `ourHistory.pullQuote`)

- [ ] **Step 1: Update pull quote in Spanish**

In `src/messages/es.json`, find the `ourHistory` section and change:
```json
"pullQuote": "El viento nos dio la libertad de vivir haciendo lo que amamos, conectados para siempre con el mar."
```
To:
```json
"pullQuote": "Quiero hacer este deporte hasta que deje de respirar."
```

- [ ] **Step 2: Update pull quote in English**

In `src/messages/en.json`, change the corresponding key to:
```json
"pullQuote": "I want to do this sport until I stop breathing."
```

- [ ] **Step 3: Commit**

```bash
git add src/messages/es.json src/messages/en.json
git commit -m "fix: update Our Story quote per client request"
```

---

### Task 6: Add contact email to footer

**Files:**
- Modify: `src/components/public/Footer.tsx` (~line 94-96)
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Update email in Footer component**

In `src/components/public/Footer.tsx`, find the email display (around line 94-96) and ensure it shows `contacto@veronikites.com` (placeholder until client provides real one). If the current email is `info@veronikites.com`, update it to `contacto@veronikites.com`.

- [ ] **Step 2: Commit**

```bash
git add src/components/public/Footer.tsx
git commit -m "fix: update contact email placeholder in footer"
```

---

### Task 7: Create Social Proof Numbers component

**Files:**
- Create: `src/components/public/SocialProof.tsx`
- Modify: `src/app/[locale]/(public)/page.tsx`
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add i18n keys**

In `src/messages/es.json`, add a new top-level `"socialProof"` section:

```json
"socialProof": {
    "students": "Estudiantes Formados",
    "studentsCount": "500",
    "years": "Años de Experiencia",
    "yearsCount": "6",
    "certified": "Certificados IKO",
    "certifiedCount": "✓",
    "reviews": "Google Reviews",
    "reviewsCount": "5★"
}
```

In `src/messages/en.json`:

```json
"socialProof": {
    "students": "Students Trained",
    "studentsCount": "500",
    "years": "Years of Experience",
    "yearsCount": "6",
    "certified": "IKO Certified",
    "certifiedCount": "✓",
    "reviews": "Google Reviews",
    "reviewsCount": "5★"
}
```

- [ ] **Step 2: Create `src/components/public/SocialProof.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { labelKey: 'students', countKey: 'studentsCount', prefix: '+', isNumber: true },
    { labelKey: 'years', countKey: 'yearsCount', prefix: '+', isNumber: true },
    { labelKey: 'certified', countKey: 'certifiedCount', prefix: '', isNumber: false },
    { labelKey: 'reviews', countKey: 'reviewsCount', prefix: '', isNumber: false },
];

export default function SocialProof() {
    const t = useTranslations('socialProof');
    const sectionRef = useRef<HTMLDivElement>(null);
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            STATS.forEach((stat, i) => {
                const el = numberRefs.current[i];
                if (!el || !stat.isNumber) return;

                const target = parseInt(t(stat.countKey), 10);
                if (isNaN(target)) return;

                gsap.fromTo(
                    { val: 0 },
                    { val: target },
                    {
                        duration: 2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            once: true,
                        },
                        onUpdate: function () {
                            if (el) el.textContent = stat.prefix + Math.round(this.targets()[0].val).toString();
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [t]);

    return (
        <section ref={sectionRef} className="py-8 bg-deep-marine-800/50 border-y border-white/5">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {STATS.map((stat, i) => (
                        <div key={stat.labelKey} className="space-y-1">
                            <span
                                ref={(el) => { numberRefs.current[i] = el; }}
                                className="text-3xl md:text-4xl font-bold text-ocean-teal"
                            >
                                {stat.isNumber ? '0' : t(stat.countKey)}
                            </span>
                            <p className="text-sm text-white/60 font-medium">{t(stat.labelKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 3: Add SocialProof to homepage between Hero and ValueProposition**

In `src/app/[locale]/(public)/page.tsx`, add import:

```tsx
import SocialProof from '@/components/public/SocialProof';
```

In the render, place it after `<Hero />` and before `<ValueProposition />`:

```tsx
<Hero />
<SocialProof />
<ValueProposition />
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/components/public/SocialProof.tsx src/app/[locale]/(public)/page.tsx src/messages/es.json src/messages/en.json
git commit -m "feat(home): add social proof numbers strip with GSAP count-up animation"
```

---

### Task 8: Create Safety & Protocols component

**Files:**
- Create: `src/components/public/SafetyProtocols.tsx`
- Modify: `src/app/[locale]/(public)/page.tsx`
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add i18n keys**

In `src/messages/es.json`, add new top-level `"trust"` section:

```json
"trust": {
    "safetyTitle": "Tu Seguridad es Nuestra Prioridad",
    "safetySubtitle": "Protocolos internacionales IKO en cada clase",
    "protocol1Title": "Protocolos de Emergencia",
    "protocol1Text": "Sistema de comunicación instructor-alumno, zonas delimitadas y procedimientos de rescate.",
    "protocol2Title": "Equipos Certificados",
    "protocol2Text": "Mantenimiento riguroso y equipos de última generación revisados antes de cada sesión.",
    "protocol3Title": "Cobertura de Seguro",
    "protocol3Text": "Seguro de responsabilidad civil para todas nuestras actividades en el agua.",
    "protocol4Title": "Metodología IKO",
    "protocol4Text": "Sistema progresivo estandarizado internacionalmente que garantiza un aprendizaje seguro y efectivo.",
    "ikoBadgeText": "Escuela Certificada IKO",
    "ikoBadgeSubtext": "Estándar internacional de enseñanza"
}
```

In `src/messages/en.json`:

```json
"trust": {
    "safetyTitle": "Your Safety is Our Priority",
    "safetySubtitle": "International IKO protocols in every class",
    "protocol1Title": "Emergency Protocols",
    "protocol1Text": "Instructor-student communication system, delimited zones, and rescue procedures.",
    "protocol2Title": "Certified Equipment",
    "protocol2Text": "Rigorous maintenance and state-of-the-art gear inspected before every session.",
    "protocol3Title": "Insurance Coverage",
    "protocol3Text": "Liability insurance covering all our water activities.",
    "protocol4Title": "IKO Methodology",
    "protocol4Text": "Internationally standardized progressive system ensuring safe and effective learning.",
    "ikoBadgeText": "IKO Certified School",
    "ikoBadgeSubtext": "International teaching standard"
}
```

- [ ] **Step 2: Create `src/components/public/SafetyProtocols.tsx`**

```tsx
'use client';

import { useTranslations } from 'next-intl';

const PROTOCOLS = [
    {
        titleKey: 'protocol1Title',
        textKey: 'protocol1Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
    },
    {
        titleKey: 'protocol2Title',
        textKey: 'protocol2Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06a.75.75 0 010-1.28l5.1-3.06a.75.75 0 011.08.57v6.26a.75.75 0 01-1.08.57z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15" />
            </svg>
        ),
    },
    {
        titleKey: 'protocol3Title',
        textKey: 'protocol3Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        titleKey: 'protocol4Title',
        textKey: 'protocol4Text',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
        ),
    },
];

export default function SafetyProtocols() {
    const t = useTranslations('trust');

    return (
        <section className="py-16 md:py-24 bg-deep-marine-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('safetyTitle')}</h2>
                    <p className="text-white/60 text-lg">{t('safetySubtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROTOCOLS.map((p) => (
                        <div
                            key={p.titleKey}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="text-ocean-teal mb-4">{p.icon}</div>
                            <h3 className="text-white font-semibold mb-2">{t(p.titleKey)}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{t(p.textKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 3: Add SafetyProtocols to homepage after ValueProposition**

In `src/app/[locale]/(public)/page.tsx`:

```tsx
import SafetyProtocols from '@/components/public/SafetyProtocols';
```

Render order:
```tsx
<Hero />
<SocialProof />
<ValueProposition />
<SafetyProtocols />
<CoursePreview />
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/components/public/SafetyProtocols.tsx src/app/[locale]/(public)/page.tsx src/messages/es.json src/messages/en.json
git commit -m "feat(home): add safety protocols section with IKO methodology"
```

---

### Task 9: Create Photo Gallery component

**Files:**
- Create: `src/components/public/PhotoGallery.tsx`
- Modify: `src/app/[locale]/(public)/page.tsx`
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Install lightbox library**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm install yet-another-react-lightbox
```

- [ ] **Step 2: Add i18n keys**

In `src/messages/es.json`, add top-level `"gallery"` section:

```json
"gallery": {
    "title": "Nuestro Spot",
    "subtitle": "La vida en Salinas del Rey"
}
```

In `src/messages/en.json`:

```json
"gallery": {
    "title": "Our Spot",
    "subtitle": "Life in Salinas del Rey"
}
```

- [ ] **Step 3: Create `src/components/public/PhotoGallery.tsx`**

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GALLERY_IMAGES = [
    { src: '/images/gallery/gallery-1.webp', alt: 'Kitesurf en Salinas del Rey' },
    { src: '/images/gallery/gallery-2.webp', alt: 'Atardecer en el spot' },
    { src: '/images/gallery/gallery-3.webp', alt: 'Grupo de estudiantes' },
    { src: '/images/gallery/gallery-4.webp', alt: 'Centro náutico' },
    { src: '/images/gallery/gallery-5.webp', alt: 'Sesión de kitesurf' },
    { src: '/images/gallery/gallery-6.webp', alt: 'Vista aérea del spot' },
];

export default function PhotoGallery() {
    const t = useTranslations('gallery');
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    return (
        <section className="py-16 md:py-24 bg-deep-marine-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('title')}</h2>
                    <p className="text-white/60 text-lg">{t('subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {GALLERY_IMAGES.map((img, i) => (
                        <button
                            key={img.src}
                            onClick={() => setLightboxIndex(i)}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                        </button>
                    ))}
                </div>
            </div>

            <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={GALLERY_IMAGES.map((img) => ({ src: img.src, alt: img.alt }))}
            />
        </section>
    );
}
```

- [ ] **Step 4: Add placeholder images directory**

```bash
mkdir -p "/Users/enriquepabon/Documents/Veroni Kite Website/public/images/gallery"
```

Create 6 placeholder images — or for now, note that the gallery will show broken images until real photos are provided. The component handles this gracefully.

- [ ] **Step 5: Add PhotoGallery to homepage after OurHistory**

In `src/app/[locale]/(public)/page.tsx`:

```tsx
import PhotoGallery from '@/components/public/PhotoGallery';
```

Render order:
```tsx
<OurHistory />
<PhotoGallery />
<InstructorTeam />
```

- [ ] **Step 6: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 7: Commit**

```bash
git add src/components/public/PhotoGallery.tsx src/app/[locale]/(public)/page.tsx src/messages/es.json src/messages/en.json package.json package-lock.json
git commit -m "feat(home): add photo gallery with lightbox for spot showcase"
```

---

### Task 10: Create Upcoming Events component

**Files:**
- Create: `src/data/events.ts`
- Create: `src/components/public/UpcomingEvents.tsx`
- Modify: `src/app/[locale]/(public)/page.tsx`
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add i18n keys**

In `src/messages/es.json`:

```json
"events": {
    "title": "Próximos Eventos",
    "subtitle": "No te pierdas lo que viene en Salinas del Rey",
    "upcoming": "Próximamente",
    "active": "En curso",
    "past": "Finalizado"
}
```

In `src/messages/en.json`:

```json
"events": {
    "title": "Upcoming Events",
    "subtitle": "Don't miss what's coming to Salinas del Rey",
    "upcoming": "Upcoming",
    "active": "In Progress",
    "past": "Past"
}
```

- [ ] **Step 2: Create `src/data/events.ts`**

```typescript
export interface SiteEvent {
    id: string;
    nameEs: string;
    nameEn: string;
    descriptionEs: string;
    descriptionEn: string;
    date: string; // ISO date string
    endDate?: string;
    image: string;
    status: 'upcoming' | 'active' | 'past';
}

export const siteEvents: SiteEvent[] = [
    {
        id: 'salinas-fest-2026',
        nameEs: 'Salinas Fest 2026',
        nameEn: 'Salinas Fest 2026',
        descriptionEs: 'El festival de kitesurf más grande del Caribe colombiano. Competencias, música y la mejor vibra.',
        descriptionEn: 'The biggest kitesurf festival in the Colombian Caribbean. Competitions, music, and the best vibes.',
        date: '2026-03-20',
        endDate: '2026-03-22',
        image: '/images/events/salinas-fest.webp',
        status: 'upcoming',
    },
];
```

- [ ] **Step 3: Create `src/components/public/UpcomingEvents.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { siteEvents } from '@/data/events';

export default function UpcomingEvents() {
    const t = useTranslations('events');
    const locale = useLocale();

    const visibleEvents = siteEvents.filter((e) => e.status !== 'past');

    if (visibleEvents.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-deep-marine-800/50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('title')}</h2>
                    <p className="text-white/60 text-lg">{t('subtitle')}</p>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {visibleEvents.map((event) => (
                        <div
                            key={event.id}
                            className="min-w-[300px] md:min-w-[400px] snap-start bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex-shrink-0"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={event.image}
                                    alt={locale === 'es' ? event.nameEs : event.nameEn}
                                    fill
                                    className="object-cover"
                                />
                                <span
                                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                                        event.status === 'active'
                                            ? 'bg-green-500/90 text-white'
                                            : 'bg-sand-gold/90 text-deep-marine-900'
                                    }`}
                                >
                                    {t(event.status)}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="text-white font-bold text-lg mb-1">
                                    {locale === 'es' ? event.nameEs : event.nameEn}
                                </h3>
                                <p className="text-ocean-teal text-sm font-medium mb-2">
                                    {new Date(event.date).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                    {event.endDate && ` — ${new Date(event.endDate).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                    })}`}
                                </p>
                                <p className="text-white/60 text-sm">
                                    {locale === 'es' ? event.descriptionEs : event.descriptionEn}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 4: Add UpcomingEvents to homepage after TestimonialCarousel**

In `src/app/[locale]/(public)/page.tsx`:

```tsx
import UpcomingEvents from '@/components/public/UpcomingEvents';
```

Render order:
```tsx
<TestimonialCarousel />
<UpcomingEvents />
<CTABanner />
```

- [ ] **Step 5: Create placeholder events image directory**

```bash
mkdir -p "/Users/enriquepabon/Documents/Veroni Kite Website/public/images/events"
```

- [ ] **Step 6: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 7: Commit**

```bash
git add src/data/events.ts src/components/public/UpcomingEvents.tsx src/app/[locale]/(public)/page.tsx src/messages/es.json src/messages/en.json
git commit -m "feat(home): add upcoming events section with config-driven data"
```

---

### Task 11: Hero video loop infrastructure

**Files:**
- Modify: `src/components/public/Hero.tsx`

- [ ] **Step 1: Update Hero to support multiple video sources in a loop**

In `src/components/public/Hero.tsx`, update the video implementation to support an array of video clips with crossfade. The key change is:

1. Define a video clips array at the top of the component:

```typescript
const VIDEO_CLIPS = [
    { webm: '/images/hero-video.webm', mp4: '/images/hero-video.mp4' },
    // Add more clips here when Mono sends them:
    // { webm: '/images/hero-video-2.webm', mp4: '/images/hero-video-2.mp4' },
];
```

2. If there's only 1 clip, keep the current behavior (single looping video).

3. If there are multiple clips, use two `<video>` elements stacked with absolute positioning. Alternate between them using `onEnded` event to trigger crossfade (opacity transition). Track `currentClipIndex` in state, toggle which video element is visible using CSS opacity transition (`transition-opacity duration-1000`).

4. Each `<video>` element keeps: `autoPlay`, `muted`, `playsInline` but removes `loop` when multiple clips exist.

- [ ] **Step 2: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/public/Hero.tsx
git commit -m "feat(hero): add multi-clip video loop infrastructure with crossfade"
```

---

## Chunk 3: `/ubicacion` — Location Enhancements

### Task 12: Add Barranquilla arrival route

**Files:**
- Modify: `src/messages/es.json` (location section)
- Modify: `src/messages/en.json` (location section)
- Modify: `src/app/[locale]/(public)/ubicacion/LocationClient.tsx`

- [ ] **Step 1: Add i18n keys for Barranquilla route**

In `src/messages/es.json`, inside the `"location"` object, add:

```json
"howToGetSubtitle": "Dos rutas principales para llegar a Salinas del Rey",
"fromCartagena": "Desde Cartagena",
"step1Cartagena": "Vuela al Aeropuerto Rafael Núñez (CTG) en Cartagena de Indias.",
"step2Cartagena": "Toma transporte terrestre hacia el sur, rumbo a Salinas del Rey (~2h).",
"fromBarranquilla": "Desde Barranquilla",
"step1Barranquilla": "Vuela al Aeropuerto Ernesto Cortissoz (BAQ) en Barranquilla.",
"step2Barranquilla": "Toma transporte terrestre hacia el sur, rumbo a Salinas del Rey (~1.5h).",
"transportNote": "Nosotros podemos coordinar tu transporte desde cualquier ciudad. ¡Contáctanos!"
```

In `src/messages/en.json`:

```json
"howToGetSubtitle": "Two main routes to reach Salinas del Rey",
"fromCartagena": "From Cartagena",
"step1Cartagena": "Fly to Rafael Núñez Airport (CTG) in Cartagena de Indias.",
"step2Cartagena": "Take ground transportation south towards Salinas del Rey (~2h).",
"fromBarranquilla": "From Barranquilla",
"step1Barranquilla": "Fly to Ernesto Cortissoz Airport (BAQ) in Barranquilla.",
"step2Barranquilla": "Take ground transportation south towards Salinas del Rey (~1.5h).",
"transportNote": "We can coordinate your transportation from either city. Contact us!"
```

- [ ] **Step 2: Update LocationClient to show two routes side by side**

In `src/app/[locale]/(public)/ubicacion/LocationClient.tsx`, find the "How to Get There" section (around lines 62-76). Replace the single 3-step flow with two columns:

Left column: "Desde Cartagena" with steps 1-2.
Right column: "Desde Barranquilla" with steps 1-2.
Below both: transport coordination note.

Use a `grid grid-cols-1 md:grid-cols-2 gap-6` layout.

- [ ] **Step 3: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 4: Commit**

```bash
git add src/messages/es.json src/messages/en.json src/app/[locale]/(public)/ubicacion/LocationClient.tsx
git commit -m "feat(location): add Barranquilla as second arrival route"
```

---

### Task 13: Add Seasonal Wind Guide

**Files:**
- Create: `src/components/public/SeasonalWindGuide.tsx`
- Modify: `src/app/[locale]/(public)/ubicacion/LocationClient.tsx`
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add i18n keys**

In `src/messages/es.json`, inside `"location"`, add:

```json
"seasonTitle": "Guía de Temporadas",
"seasonSubtitle": "Planifica tu viaje según las condiciones de viento",
"seasonHigh": "Temporada Alta",
"seasonMedium": "Temporada Media",
"seasonLow": "Temporada Baja",
"seasonDecApr": "Diciembre — Abril",
"seasonDecAprWind": "15-25 nudos",
"seasonDecAprTemp": "27°C agua · 32°C aire",
"seasonDecAprDesc": "Vientos alisios constantes del noreste. Condiciones óptimas para todos los niveles.",
"seasonJunAug": "Junio — Agosto",
"seasonJunAugWind": "12-20 nudos",
"seasonJunAugTemp": "28°C agua · 33°C aire",
"seasonJunAugDesc": "Segunda temporada de vientos. Buenas condiciones, ideal para intermedios y avanzados.",
"seasonSepNov": "Septiembre — Noviembre",
"seasonSepNovWind": "8-15 nudos",
"seasonSepNovTemp": "29°C agua · 31°C aire",
"seasonSepNovDesc": "Vientos variables. Bueno para foil y sesiones relajadas. Menos turismo."
```

In `src/messages/en.json`, equivalent:

```json
"seasonTitle": "Season Guide",
"seasonSubtitle": "Plan your trip based on wind conditions",
"seasonHigh": "High Season",
"seasonMedium": "Mid Season",
"seasonLow": "Low Season",
"seasonDecApr": "December — April",
"seasonDecAprWind": "15-25 knots",
"seasonDecAprTemp": "27°C water · 32°C air",
"seasonDecAprDesc": "Consistent northeast trade winds. Optimal conditions for all levels.",
"seasonJunAug": "June — August",
"seasonJunAugWind": "12-20 knots",
"seasonJunAugTemp": "28°C water · 33°C air",
"seasonJunAugDesc": "Second wind season. Good conditions, ideal for intermediate and advanced riders.",
"seasonSepNov": "September — November",
"seasonSepNovWind": "8-15 knots",
"seasonSepNovTemp": "29°C water · 31°C air",
"seasonSepNovDesc": "Variable winds. Good for foil and relaxed sessions. Less tourism."
```

- [ ] **Step 2: Create `src/components/public/SeasonalWindGuide.tsx`**

```tsx
'use client';

import { useTranslations } from 'next-intl';

const SEASONS = [
    {
        periodKey: 'seasonDecApr',
        windKey: 'seasonDecAprWind',
        tempKey: 'seasonDecAprTemp',
        descKey: 'seasonDecAprDesc',
        levelKey: 'seasonHigh',
        color: 'bg-green-500',
        barWidth: 'w-full',
    },
    {
        periodKey: 'seasonJunAug',
        windKey: 'seasonJunAugWind',
        tempKey: 'seasonJunAugTemp',
        descKey: 'seasonJunAugDesc',
        levelKey: 'seasonMedium',
        color: 'bg-sand-gold',
        barWidth: 'w-2/3',
    },
    {
        periodKey: 'seasonSepNov',
        windKey: 'seasonSepNovWind',
        tempKey: 'seasonSepNovTemp',
        descKey: 'seasonSepNovDesc',
        levelKey: 'seasonLow',
        color: 'bg-white/30',
        barWidth: 'w-1/3',
    },
];

export default function SeasonalWindGuide() {
    const t = useTranslations('location');

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-white mb-2">{t('seasonTitle')}</h3>
            <p className="text-white/60 mb-8">{t('seasonSubtitle')}</p>
            <div className="space-y-6">
                {SEASONS.map((season) => (
                    <div key={season.periodKey} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-semibold">{t(season.periodKey)}</h4>
                                <span className="text-xs text-ocean-teal font-medium">{t(season.levelKey)}</span>
                            </div>
                            <div className="text-right text-sm">
                                <p className="text-white/80">{t(season.windKey)}</p>
                                <p className="text-white/50 text-xs">{t(season.tempKey)}</p>
                            </div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${season.color} ${season.barWidth} rounded-full transition-all`} />
                        </div>
                        <p className="text-white/50 text-sm">{t(season.descKey)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 3: Add SeasonalWindGuide to LocationClient**

Import and render it after the existing wind conditions card:

```tsx
import SeasonalWindGuide from '@/components/public/SeasonalWindGuide';
```

Place it in the location page layout, as a new card/section after the wind conditions display.

- [ ] **Step 4: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/components/public/SeasonalWindGuide.tsx src/app/[locale]/(public)/ubicacion/LocationClient.tsx src/messages/es.json src/messages/en.json
git commit -m "feat(location): add seasonal wind guide with visual indicators"
```

---

## Chunk 4: Cross-Cutting — Trust & Credibility

### Task 14: Enhance Instructor profiles

**Files:**
- Modify: `src/components/public/InstructorTeam.tsx`
- Modify: `src/messages/es.json` (instructors section)
- Modify: `src/messages/en.json` (instructors section)

- [ ] **Step 1: Add new i18n keys for enhanced instructor fields**

In the `"instructors"` section of `src/messages/es.json`, add to each instructor (for existing instructors that have real data — update with placeholders for now):

```json
"cert1": "IKO Nivel 2",
"languages1": "Español, Inglés",
"specialty1": "Freestyle, Hidrofoil",
"experience1": "5+ años"
```

Repeat pattern for `cert2`...`cert7`, `languages2`...`languages7`, `specialty2`...`specialty7`, `experience2`...`experience7`.

Same in `src/messages/en.json` with English translations (e.g., `"cert1": "IKO Level 2"`, `"languages1": "Spanish, English"`).

- [ ] **Step 2: Update InstructorTeam component to display new fields**

In `src/components/public/InstructorTeam.tsx`, update the `Instructor` interface to include:

```typescript
interface Instructor {
    id: string;
    imageKey: string;
    nameKey: string;
    roleKey: string;
    bioKey: string;
    yearsKey: string;
    certKey: string;
    languagesKey: string;
    specialtyKey: string;
    experienceKey: string;
    instagram?: string;
    socialUrl?: string;
}
```

Update the instructors array with the new keys (`certKey: 'cert1'`, etc.).

In the card JSX, add below the bio:
- A small badge for IKO certification level (e.g., teal pill with shield icon)
- Languages as text with globe icon
- Specialty tags as small pills
- Instagram link if present

- [ ] **Step 3: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 4: Commit**

```bash
git add src/components/public/InstructorTeam.tsx src/messages/es.json src/messages/en.json
git commit -m "feat(instructors): enhance profiles with IKO cert, languages, and specialty"
```

---

### Task 15: Update Testimonials with real structure and Google Reviews link

**Files:**
- Modify: `src/components/public/TestimonialCarousel.tsx`
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add i18n keys for Google Reviews CTA**

In `src/messages/es.json`, add to a new `"testimonials"` top-level section (or find existing):

```json
"testimonials": {
    "title": "Lo que Dicen Nuestros Estudiantes",
    "subtitle": "Experiencias reales de quienes aprendieron con nosotros",
    "googleReviewsCta": "Ver todas las reseñas en Google",
    "googleReviewsUrl": "https://g.page/veronikites/review"
}
```

Same in English.

- [ ] **Step 2: Add Google Reviews link button below the carousel**

In `src/components/public/TestimonialCarousel.tsx`, after the carousel, add:

```tsx
<div className="text-center mt-8">
    <a
        href={t('googleReviewsUrl')}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-sm font-medium transition-colors"
    >
        {/* Google icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        {t('googleReviewsCta')}
    </a>
</div>
```

- [ ] **Step 3: Add nationality field to testimonial display**

The current structure already has `country` and `flag` fields. Ensure these display prominently below the name.

- [ ] **Step 4: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/components/public/TestimonialCarousel.tsx src/messages/es.json src/messages/en.json
git commit -m "feat(testimonials): add Google Reviews link and enhance display"
```

---

### Task 16: Add IKO badge to courses page

**Files:**
- Modify: `src/app/[locale]/(public)/cursos/CoursesClient.tsx`

- [ ] **Step 1: Add IKO badge to each course card**

The Hero component already has an IKO badge at `src/components/public/Hero.tsx` (lines 73-92) with image `/images/badges/iko-badge.png`. Reuse the same badge image.

Add a small IKO badge in the top-right corner of each course card:

```tsx
<div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5">
    <Image src="/images/badges/iko-badge.png" alt="IKO" width={20} height={20} />
    <span className="text-[10px] text-white/80 font-medium">IKO</span>
</div>
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/(public)/cursos/CoursesClient.tsx
git commit -m "feat(courses): add IKO certification badge to course cards"
```

---

## Chunk 5: `/reservar` — Booking Form Update

### Task 17: Expand booking form course options

**Files:**
- Modify: `src/components/public/BookingForm.tsx`
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Add new course option i18n keys**

In `src/messages/es.json`, inside `"bookingForm"`, replace the old course keys and add:

```json
"courseGroupLearning": "— Cursos de Aprendizaje —",
"individual": "Clase Individual (1h) — $280.000",
"basic": "Curso Básico (5h) — $1.110.000",
"complete": "Curso Completo (10h) — $2.500.000",
"courseGroupAdvanced": "— Clases Avanzadas —",
"kitefoil": "Kitefoil — $280.000/sesión",
"windfoil": "Windfoil — $280.000/sesión",
"jumps": "Saltos Avanzados — $200.000/sesión",
"surfWave": "Surf / Wave — $200.000/sesión",
"courseGroupServices": "— Otros Servicios —",
"rentalEquipment": "Renta de Equipos",
"assistance": "Asistencia en Agua — $100.000/sesión",
"downwindTrip": "Salida Downwind"
```

In `src/messages/en.json`:

```json
"courseGroupLearning": "— Learning Courses —",
"individual": "Individual Class (1h) — $280,000 COP",
"basic": "Basic Course (5h) — $1,110,000 COP",
"complete": "Complete Course (10h) — $2,500,000 COP",
"courseGroupAdvanced": "— Advanced Classes —",
"kitefoil": "Kitefoil — $280,000 COP/session",
"windfoil": "Windfoil — $280,000 COP/session",
"jumps": "Advanced Jumps — $200,000 COP/session",
"surfWave": "Surf / Wave — $200,000 COP/session",
"courseGroupServices": "— Other Services —",
"rentalEquipment": "Equipment Rental",
"assistance": "Water Assistance — $100,000 COP/session",
"downwindTrip": "Downwind Trip"
```

- [ ] **Step 2: Update the select dropdown in BookingForm**

In `src/components/public/BookingForm.tsx`, replace the current course options (around lines 129-133) with optgroups:

```tsx
<select ...>
    <option value="">{t('selectCourse')}</option>
    <optgroup label={t('courseGroupLearning')}>
        <option value="clase-individual">{t('individual')}</option>
        <option value="curso-basico">{t('basic')}</option>
        <option value="curso-completo">{t('complete')}</option>
    </optgroup>
    <optgroup label={t('courseGroupAdvanced')}>
        <option value="kitefoil">{t('kitefoil')}</option>
        <option value="windfoil">{t('windfoil')}</option>
        <option value="saltos-avanzados">{t('jumps')}</option>
        <option value="surf-wave">{t('surfWave')}</option>
    </optgroup>
    <optgroup label={t('courseGroupServices')}>
        <option value="renta-equipos">{t('rentalEquipment')}</option>
        <option value="asistencia">{t('assistance')}</option>
        <option value="downwind">{t('downwindTrip')}</option>
    </optgroup>
</select>
```

- [ ] **Step 3: Remove old course i18n keys**

Clean up the old keys (`discovery`, `kiteControl`, `waterstart`) from both `es.json` and `en.json` in the `bookingForm` section — but first verify they're not used elsewhere.

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && grep -r "bookingForm.*discovery\|bookingForm.*kiteControl\|bookingForm.*waterstart" src/ --include="*.tsx" --include="*.ts"
```

If only used in BookingForm, remove them.

- [ ] **Step 4: Verify build**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build 2>&1 | tail -20
```

- [ ] **Step 5: Commit**

```bash
git add src/components/public/BookingForm.tsx src/messages/es.json src/messages/en.json
git commit -m "feat(booking): expand course options with advanced classes and services"
```

---

### Task 18: Final verification and cleanup

**Files:**
- All modified files

- [ ] **Step 1: Full build verification**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Check for any TypeScript errors**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npx tsc --noEmit 2>&1 | tail -30
```

- [ ] **Step 3: Verify i18n completeness — ensure both files have matching keys**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && node -e "
const es = require('./src/messages/es.json');
const en = require('./src/messages/en.json');
const diff = (a, b, path='') => {
    for (const k of Object.keys(a)) {
        const p = path ? path+'.'+k : k;
        if (!(k in b)) console.log('Missing in EN:', p);
        else if (typeof a[k]==='object') diff(a[k], b[k], p);
    }
    for (const k of Object.keys(b)) {
        const p = path ? path+'.'+k : k;
        if (!(k in a)) console.log('Missing in ES:', p);
    }
};
diff(es, en);
"
```

Expected: No missing keys output.

- [ ] **Step 4: Dev server smoke test**

```bash
cd "/Users/enriquepabon/Documents/Veroni Kite Website" && npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
curl -s http://localhost:3000/es/cursos | head -20
kill %1
```

Verify pages load without 500 errors.

- [ ] **Step 5: Commit any remaining fixes**

If any fixes were needed, commit them:

```bash
git add -A
git commit -m "fix: resolve remaining build issues from post-presentation improvements"
```
