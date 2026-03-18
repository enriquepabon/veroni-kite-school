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
        <section className="py-16 md:py-24 bg-gradient-dark">
            <div className="container-main">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">{t('title')}</h2>
                    <p className="text-caribbean-aqua text-lg">{t('subtitle')}</p>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory justify-center">
                    {visibleEvents.map((event) => (
                        <div
                            key={event.id}
                            className="min-w-[300px] md:min-w-[400px] max-w-[400px] snap-start bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex-shrink-0"
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
                                            : 'bg-sand-gold/90 text-night-tide'
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
