'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface WindData {
    speed: number; // knots
    gusts: number;
    direction: number; // degrees
    directionLabel: string;
    temperature: number; // °C
    condition: 'optimal' | 'moderate' | 'notRecommended';
}

// Mock data — will come from Windy API via /api/weather proxy
const mockWindData: WindData = {
    speed: 18,
    gusts: 24,
    direction: 45,
    directionLabel: 'NE',
    temperature: 28,
    condition: 'optimal',
};

function getConditionConfig(condition: WindData['condition'], isEn: boolean) {
    switch (condition) {
        case 'optimal':
            return { bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500', label: isEn ? 'Optimal for Kite' : 'Óptimo para Kite', emoji: '🟢' };
        case 'moderate':
            return { bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500', label: isEn ? 'Moderate' : 'Moderado', emoji: '🟡' };
        case 'notRecommended':
            return { bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', label: isEn ? 'Not Recommended' : 'No Recomendado', emoji: '🔴' };
    }
}

export default function WeatherWidget() {
    const t = useTranslations('weather');
    const locale = useLocale();
    const isEn = locale === 'en';
    const data = mockWindData;
    const config = getConditionConfig(data.condition, isEn);

    return (
        <motion.div
            className="bg-white rounded-2xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className="font-heading font-bold text-night-tide text-lg mb-4">
                {t('currentConditions')}
            </h3>

            {/* Condition banner */}
            <div className={`${config.bg} ${config.border} border rounded-xl p-3 mb-5 flex items-center gap-3`}>
                <span className="text-xl">{config.emoji}</span>
                <span className="font-medium text-sm">{config.label}</span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Wind speed */}
                <div className="text-center p-4 rounded-xl bg-deep-marine-50">
                    <p className="text-xs text-deep-marine-500 uppercase font-bold tracking-wider mb-1">
                        {t('windSpeed')}
                    </p>
                    <p className="text-3xl font-bold text-night-tide">{data.speed}</p>
                    <p className="text-xs text-caribbean-aqua">{isEn ? 'knots' : 'nudos'}</p>
                </div>

                {/* Gusts */}
                <div className="text-center p-4 rounded-xl bg-sand-gold-50">
                    <p className="text-xs text-deep-marine-500 uppercase font-bold tracking-wider mb-1">
                        {t('gusts')}
                    </p>
                    <p className="text-3xl font-bold text-night-tide">{data.gusts}</p>
                    <p className="text-xs text-caribbean-aqua">{isEn ? 'knots' : 'nudos'}</p>
                </div>

                {/* Direction */}
                <div className="text-center p-4 rounded-xl bg-ocean-teal-50">
                    <p className="text-xs text-deep-marine-500 uppercase font-bold tracking-wider mb-1">
                        {t('direction')}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        {/* Compass arrow */}
                        <svg
                            className="w-8 h-8 text-ocean-teal"
                            style={{ transform: `rotate(${data.direction}deg)` }}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2l3 9h-6l3-9z" />
                            <path d="M12 22l-3-9h6l-3 9z" opacity={0.3} />
                        </svg>
                        <span className="text-lg font-bold text-night-tide">{data.directionLabel}</span>
                    </div>
                </div>

                {/* Temperature */}
                <div className="text-center p-4 rounded-xl bg-yellow-50">
                    <p className="text-xs text-deep-marine-500 uppercase font-bold tracking-wider mb-1">
                        {t('temperature')}
                    </p>
                    <p className="text-3xl font-bold text-night-tide">{data.temperature}°</p>
                    <p className="text-xs text-caribbean-aqua">°C</p>
                </div>
            </div>
        </motion.div>
    );
}
