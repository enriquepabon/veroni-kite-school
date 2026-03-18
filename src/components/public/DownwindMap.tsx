'use client';

import { useCallback, useState } from 'react';
import Map, { Source, Layer, Marker, type MapMouseEvent } from 'react-map-gl/mapbox';
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
            <div className="space-y-4">
                <div className="w-full h-[400px] rounded-2xl bg-salt-white border border-deep-marine-600/10 flex items-center justify-center text-deep-marine-600/50">
                    Mapa disponible próximamente
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {ROUTE_SEGMENTS.map((seg) => (
                        <div key={seg.id} className="p-4 rounded-xl bg-salt-white border border-deep-marine-600/10">
                            <p className="font-medium text-sm text-night-tide">{seg.name}</p>
                            <p className="text-xs mt-1 text-caribbean-aqua">~{seg.distanceKm} km</p>
                        </div>
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
                    </svg>
                    {t('downwindCta')}
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-deep-marine-600/10">
                <Map
                    initialViewState={{
                        longitude: -75.35,
                        latitude: 10.7,
                        zoom: 9,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
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
                                ? 'bg-ocean-teal/10 border-ocean-teal text-night-tide'
                                : 'bg-salt-white border-deep-marine-600/10 text-deep-marine-600 hover:bg-ocean-teal/5'
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
                </svg>
                {t('downwindCta')}
            </a>
        </div>
    );
}
