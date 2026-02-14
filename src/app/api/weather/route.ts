import { NextResponse } from 'next/server';

/**
 * GET /api/weather — Proxy to Windy API with 15-minute cache.
 * Returns wind conditions for Salinas del Rey.
 */

// Salinas del Rey coordinates
const LAT = 10.78;
const LON = -75.08;

interface WindyResponse {
    ts: number[];
    'wind_u-surface': number[];
    'wind_v-surface': number[];
    'temp-surface': number[];
}

function windComponents(u: number, v: number) {
    const speed = Math.sqrt(u * u + v * v) * 1.94384; // m/s to knots
    const direction = (Math.atan2(-u, -v) * 180 / Math.PI + 360) % 360;
    return { speed: Math.round(speed * 10) / 10, direction: Math.round(direction) };
}

function getDirectionLabel(deg: number): string {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
}

function getCondition(speed: number): 'optimal' | 'moderate' | 'notRecommended' {
    if (speed >= 15) return 'optimal';
    if (speed >= 10) return 'moderate';
    return 'notRecommended';
}

export async function GET() {
    try {
        const apiKey = process.env.WINDY_API_KEY;

        if (!apiKey) {
            // Return mock data if no API key
            return NextResponse.json({
                current: {
                    speed: 18,
                    gusts: 24,
                    direction: 45,
                    directionLabel: 'NE',
                    temperature: 28,
                    condition: 'optimal',
                },
                forecast: Array.from({ length: 24 }, (_, i) => ({
                    hour: `${String((6 + i) % 24).padStart(2, '0')}:00`,
                    speed: Math.round(12 + Math.sin(i * 0.3) * 8 + Math.random() * 4),
                    gusts: Math.round(15 + Math.sin(i * 0.3) * 8 + Math.random() * 5),
                    direction: ['N', 'NE', 'NE', 'E', 'NE', 'N'][i % 6],
                })),
                updatedAt: new Date().toISOString(),
            }, {
                headers: {
                    'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=300',
                },
            });
        }

        // Fetch from Windy Point Forecast API
        const response = await fetch('https://api.windy.com/api/point-forecast/v2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat: LAT,
                lon: LON,
                model: 'gfs',
                parameters: ['wind', 'temp'],
                levels: ['surface'],
                key: apiKey,
            }),
            next: { revalidate: 900 }, // Cache for 15 minutes
        });

        if (!response.ok) {
            throw new Error(`Windy API error: ${response.status}`);
        }

        const data: WindyResponse = await response.json();

        // Parse current conditions (first timestamp)
        const currentU = data['wind_u-surface'][0];
        const currentV = data['wind_v-surface'][0];
        const { speed, direction } = windComponents(currentU, currentV);
        const temperature = Math.round(data['temp-surface'][0] - 273.15); // K to °C

        const current = {
            speed,
            gusts: Math.round(speed * 1.3),
            direction,
            directionLabel: getDirectionLabel(direction),
            temperature,
            condition: getCondition(speed),
        };

        // Parse forecast (24 hours)
        const forecast = data.ts.slice(0, 24).map((ts, i) => {
            const u = data['wind_u-surface'][i];
            const v = data['wind_v-surface'][i];
            const { speed: fSpeed, direction: fDir } = windComponents(u, v);
            const hour = new Date(ts).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false });
            return {
                hour,
                speed: fSpeed,
                gusts: Math.round(fSpeed * 1.3),
                direction: getDirectionLabel(fDir),
            };
        });

        return NextResponse.json({
            current,
            forecast,
            updatedAt: new Date().toISOString(),
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=300',
            },
        });
    } catch (error) {
        console.error('Weather API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}
