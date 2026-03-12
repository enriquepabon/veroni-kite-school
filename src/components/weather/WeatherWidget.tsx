'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { NumberTicker } from '@/components/ui/number-ticker';

interface WindData {
    speed: number;
    gusts: number;
    direction: number;
    directionLabel: string;
    temperature: number;
    condition: 'optimal' | 'moderate' | 'notRecommended';
}

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
            return { bg: 'bg-green-500/10', border: 'border-green-500/20', dot: 'bg-green-400', label: isEn ? 'Optimal for Kite' : 'Óptimo para Kite' };
        case 'moderate':
            return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', dot: 'bg-yellow-400', label: isEn ? 'Moderate' : 'Moderado' };
        case 'notRecommended':
            return { bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'bg-red-400', label: isEn ? 'Not Recommended' : 'No Recomendado' };
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
            className="dark-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className="font-heading font-bold text-salt-white text-lg mb-4">
                {t('currentConditions')}
            </h3>

            {/* Condition banner */}
            <div className={`${config.bg} ${config.border} border rounded-xl p-3 mb-5 flex items-center gap-3`}>
                <span className={`w-3 h-3 rounded-full ${config.dot} animate-pulse`} />
                <span className="font-medium text-sm text-salt-white">{config.label}</span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-xs text-ocean-teal uppercase font-bold tracking-wider mb-1">
                        {t('windSpeed')}
                    </p>
                    <NumberTicker value={data.speed} className="text-3xl font-bold text-salt-white" />
                    <p className="text-xs text-caribbean-aqua/40">{isEn ? 'knots' : 'nudos'}</p>
                </div>

                <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-xs text-sand-gold uppercase font-bold tracking-wider mb-1">
                        {t('gusts')}
                    </p>
                    <NumberTicker value={data.gusts} className="text-3xl font-bold text-salt-white" />
                    <p className="text-xs text-caribbean-aqua/40">{isEn ? 'knots' : 'nudos'}</p>
                </div>

                <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-xs text-ocean-teal uppercase font-bold tracking-wider mb-1">
                        {t('direction')}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <svg
                            className="w-8 h-8 text-ocean-teal"
                            style={{ transform: `rotate(${data.direction}deg)` }}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2l3 9h-6l3-9z" />
                            <path d="M12 22l-3-9h6l-3 9z" opacity={0.3} />
                        </svg>
                        <span className="text-lg font-bold text-salt-white">{data.directionLabel}</span>
                    </div>
                </div>

                <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <p className="text-xs text-sand-gold uppercase font-bold tracking-wider mb-1">
                        {t('temperature')}
                    </p>
                    <NumberTicker value={data.temperature} className="text-3xl font-bold text-salt-white" />
                    <span className="text-3xl font-bold text-salt-white">°</span>
                    <p className="text-xs text-caribbean-aqua/40">°C</p>
                </div>
            </div>
        </motion.div>
    );
}
