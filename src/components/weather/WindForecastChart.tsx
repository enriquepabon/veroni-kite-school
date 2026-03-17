'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface ForecastHour {
    hour: string;
    speed: number;
    gusts: number;
    direction: string;
}

function getBarColor(speed: number): string {
    if (speed >= 20) return 'bg-green-400';
    if (speed >= 15) return 'bg-ocean-teal';
    if (speed >= 10) return 'bg-yellow-400';
    return 'bg-caribbean-aqua/30';
}

export default function WindForecastChart() {
    const t = useTranslations('weather');
    const locale = useLocale();
    const isEn = locale === 'en';
    const [forecast, setForecast] = useState<ForecastHour[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchForecast() {
            try {
                const res = await fetch('/api/weather');
                if (!res.ok) throw new Error('Failed to fetch');
                const json = await res.json();
                setForecast(json.forecast ?? []);
            } catch {
                // Keep empty on error
            } finally {
                setLoading(false);
            }
        }
        fetchForecast();
        const interval = setInterval(fetchForecast, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const maxSpeed = forecast.length > 0 ? Math.max(...forecast.map((f) => f.gusts)) : 1;

    return (
        <motion.div
            className="dark-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <h3 className="font-heading font-bold text-salt-white text-lg mb-2">
                {t('forecast')}
            </h3>
            <p className="text-sm text-caribbean-aqua/60 mb-6">
                {isEn ? 'Next 24 hours — Salinas del Rey' : 'Próximas 24 horas — Salinas del Rey'}
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs text-caribbean-aqua/60">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-green-400" />
                    {isEn ? 'Excellent (20+ kt)' : 'Excelente (20+ kt)'}
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-ocean-teal" />
                    {isEn ? 'Good (15-19 kt)' : 'Bueno (15-19 kt)'}
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-yellow-400" />
                    {isEn ? 'Light (10-14 kt)' : 'Ligero (10-14 kt)'}
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-caribbean-aqua/30" />
                    {isEn ? 'Calm (<10 kt)' : 'Calma (<10 kt)'}
                </div>
            </div>

            {/* Chart */}
            {loading && (
                <div className="flex items-center justify-center h-[200px]">
                    <div className="w-6 h-6 border-2 border-ocean-teal/30 border-t-ocean-teal rounded-full animate-spin" />
                </div>
            )}
            {!loading && forecast.length === 0 && (
                <div className="flex items-center justify-center h-[200px] text-sm text-caribbean-aqua/40">
                    {isEn ? 'No forecast data available' : 'Sin datos de pronóstico disponibles'}
                </div>
            )}
            {!loading && forecast.length > 0 && (
            <div className="overflow-x-auto -mx-6 px-6">
                <div className="flex gap-1 items-end min-w-[700px]" style={{ height: 200 }}>
                    {forecast.map((f, idx) => {
                        const height = (f.speed / maxSpeed) * 100;
                        const gustHeight = (f.gusts / maxSpeed) * 100;

                        return (
                            <div
                                key={idx}
                                className="flex-1 flex flex-col items-center gap-1 group relative"
                            >
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    <div className="bg-surface-elevated text-salt-white text-[10px] rounded-lg px-2 py-1 whitespace-nowrap shadow-lg border border-white/10">
                                        <p className="font-bold">{f.hour}</p>
                                        <p>{isEn ? 'Wind' : 'Viento'}: {f.speed} kt</p>
                                        <p>{isEn ? 'Gusts' : 'Ráfaga'}: {f.gusts} kt</p>
                                        <p>{f.direction}</p>
                                    </div>
                                </div>

                                {/* Gust indicator */}
                                <div className="w-full flex justify-center relative" style={{ height: `${gustHeight}%` }}>
                                    <div className="w-0.5 bg-red-400/40 rounded-full absolute bottom-0" style={{ height: `${((f.gusts - f.speed) / maxSpeed) * 100}%` }} />
                                </div>

                                {/* Speed bar */}
                                <motion.div
                                    className={`w-full rounded-t-sm ${getBarColor(f.speed)} min-h-[4px]`}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 0.4, delay: idx * 0.02 }}
                                />

                                {/* Time label */}
                                <span className={`text-[9px] text-caribbean-aqua/40 mt-1 ${idx % 3 === 0 ? '' : 'hidden md:block'}`}>
                                    {f.hour.split(':')[0]}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            )}
        </motion.div>
    );
}
