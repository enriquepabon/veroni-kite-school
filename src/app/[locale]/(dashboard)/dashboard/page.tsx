'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
    const t = useTranslations('dashboard');
    const locale = useLocale();
    const isEn = locale === 'en';

    const quickActions = [
        { href: `/${locale}/my-roadmap`, icon: '🗺️', label: t('myRoadmap'), color: 'from-turquoise-500 to-deep-marine-500' },
        { href: `/${locale}/booking`, icon: '📅', label: t('bookClass'), color: 'from-sand-gold to-red-500' },
        { href: `/${locale}/weather`, icon: '🌊', label: t('weather'), color: 'from-deep-marine-500 to-blue-600' },
        { href: `/${locale}/resources`, icon: '📚', label: t('resources'), color: 'from-yellow-500 to-sand-gold' },
    ];

    return (
        <div className="p-4 md:p-8">
            {/* Welcome header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide">
                    {t('welcome')} 🪁
                </h1>
                <p className="text-deep-marine-600 mt-1">
                    {isEn ? 'Here\'s your kitesurfing dashboard' : 'Aquí está tu panel de kitesurf'}
                </p>
            </motion.div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Current Level */}
                <motion.div
                    className="bg-white rounded-2xl shadow-card p-5"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    <p className="text-xs font-bold text-caribbean-aqua uppercase tracking-wider mb-2">
                        {t('currentLevel')}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-turquoise-400 to-deep-marine-500 flex items-center justify-center text-white text-lg">
                            🏄
                        </div>
                        <div>
                            <p className="font-heading font-bold text-night-tide">
                                {isEn ? 'Level 3 — Waterstart' : 'Nivel 3 — Waterstart'}
                            </p>
                            <p className="text-xs text-deep-marine-500">60% {isEn ? 'complete' : 'completado'}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Next Booking */}
                <motion.div
                    className="bg-white rounded-2xl shadow-card p-5"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <p className="text-xs font-bold text-caribbean-aqua uppercase tracking-wider mb-2">
                        {t('nextBooking')}
                    </p>
                    <p className="text-sm text-deep-marine-500">{t('noBookings')}</p>
                    <Link
                        href={`/${locale}/booking`}
                        className="inline-block mt-2 text-xs font-bold text-deep-marine-500 hover:text-deep-marine-600"
                    >
                        {t('bookClass')} →
                    </Link>
                </motion.div>

                {/* Wind Now */}
                <motion.div
                    className="bg-white rounded-2xl shadow-card p-5"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <p className="text-xs font-bold text-caribbean-aqua uppercase tracking-wider mb-2">
                        {t('windNow')}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-night-tide">18</span>
                        <span className="text-sm text-caribbean-aqua">{isEn ? 'knots' : 'nudos'}</span>
                        <span className="ml-auto text-xl">🟢</span>
                    </div>
                    <p className="text-xs text-deep-marine-500 mt-1">NE · 28°C</p>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="font-heading font-bold text-night-tide mb-4">{t('quickActions')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quickActions.map((action, idx) => (
                        <Link
                            key={action.href}
                            href={action.href}
                            className="group"
                        >
                            <motion.div
                                className="bg-white rounded-2xl shadow-card p-4 text-center hover:shadow-card-hover transition-all"
                                whileHover={{ y: -2 }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.25 + idx * 0.05 }}
                            >
                                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-2xl mb-3`}>
                                    {action.icon}
                                </div>
                                <p className="text-sm font-medium text-night-tide">{action.label}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
