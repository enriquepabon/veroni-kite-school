'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import WeatherWidget from '@/components/weather/WeatherWidget';
import WindForecastChart from '@/components/weather/WindForecastChart';

export default function WeatherPage() {
    const t = useTranslations('weather');

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide">
                    {t('title')}
                </h1>
                <p className="text-deep-marine-600 mt-1">{t('subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <WeatherWidget />
                <WindForecastChart />
            </div>

            {/* Windy Map embed */}
            <motion.div
                className="bg-white rounded-2xl shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <div className="p-4 border-b border-salt-white">
                    <h3 className="font-heading font-bold text-night-tide">
                        {t('windMap')}
                    </h3>
                    <p className="text-xs text-caribbean-aqua mt-0.5">
                        Salinas del Rey — 10.78°N, 75.08°W
                    </p>
                </div>
                <div className="aspect-[16/9] md:aspect-[21/9] bg-deep-marine-100">
                    <iframe
                        src="https://embed.windy.com/embed2.html?lat=10.78&lon=-75.08&detailLat=10.78&detailLon=-75.08&width=650&height=450&zoom=10&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=kt&metricTemp=°C"
                        className="w-full h-full border-0"
                        title="Windy weather map — Salinas del Rey"
                        loading="lazy"
                    />
                </div>
            </motion.div>
        </div>
    );
}
