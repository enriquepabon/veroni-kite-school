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
            <h3 className="text-2xl font-heading font-bold text-white mb-2">{t('seasonTitle')}</h3>
            <p className="text-caribbean-aqua mb-8">{t('seasonSubtitle')}</p>
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
