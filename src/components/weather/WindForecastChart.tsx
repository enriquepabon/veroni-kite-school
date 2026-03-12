'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface ForecastHour {
    hour: string;
    speed: number;
    gusts: number;
    direction: string;
}

const mockForecast: ForecastHour[] = Array.from({ length: 24 }, (_, i) => {
    const h = (6 + i) % 24;
    const baseSpeed = 12 + Math.sin(i * 0.3) * 8 + Math.random() * 4;
    return {
        hour: `${String(h).padStart(2, '0')}:00`,
        speed: Math.round(baseSpeed),
        gusts: Math.round(baseSpeed + 3 + Math.random() * 5),
        direction: ['N', 'NE', 'NE', 'E', 'NE', 'N'][i % 6],
    };
});

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
    const maxSpeed = Math.max(...mockForecast.map((f) => f.gusts));

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
            <div className="overflow-x-auto -mx-6 px-6">
                <div className="flex gap-1 items-end min-w-[700px]" style={{ height: 200 }}>
                    {mockForecast.map((f, idx) => {
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
        </motion.div>
    );
}
