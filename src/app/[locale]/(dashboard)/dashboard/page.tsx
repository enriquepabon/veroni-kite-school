'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MagicCard } from '@/components/ui/magic-card';
import { NumberTicker } from '@/components/ui/number-ticker';
import { AnimatedList } from '@/components/ui/animated-list';
import { BorderBeam } from '@/components/ui/border-beam';

function getGreeting(t: ReturnType<typeof useTranslations>) {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 18) return t('goodAfternoon');
    return t('goodEvening');
}

const quickActionIcons = {
    roadmap: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
        </svg>
    ),
    booking: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
    ),
    weather: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
        </svg>
    ),
    resources: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
    ),
};

interface ActivityItem {
    id: string;
    icon: string;
    text: string;
    time: string;
    color: string;
}

export default function DashboardPage() {
    const t = useTranslations('dashboard');
    const locale = useLocale();
    const isEn = locale === 'en';

    const quickActions = [
        { href: `/${locale}/my-roadmap`, icon: quickActionIcons.roadmap, label: t('myRoadmap'), gradient: 'from-ocean-teal to-caribbean-aqua' },
        { href: `/${locale}/booking`, icon: quickActionIcons.booking, label: t('bookClass'), gradient: 'from-sand-gold to-sand-gold-600', featured: true },
        { href: `/${locale}/weather`, icon: quickActionIcons.weather, label: t('weather'), gradient: 'from-deep-marine to-deep-marine-600' },
        { href: `/${locale}/resources`, icon: quickActionIcons.resources, label: t('resources'), gradient: 'from-caribbean-aqua to-ocean-teal' },
    ];

    const recentActivity: ActivityItem[] = [
        { id: '1', icon: '🏄', text: isEn ? 'Completed: Kite Relaunch' : 'Completado: Relanzamiento de Kite', time: isEn ? '2h ago' : 'Hace 2h', color: '#2A9D8F' },
        { id: '2', icon: '📅', text: isEn ? 'Booked class: Dec 20' : 'Clase reservada: 20 Dic', time: isEn ? '1d ago' : 'Hace 1d', color: '#E9C46A' },
        { id: '3', icon: '🏆', text: isEn ? 'Badge earned: Level 2' : 'Insignia ganada: Nivel 2', time: isEn ? '3d ago' : 'Hace 3d', color: '#76C7C0' },
        { id: '4', icon: '🌊', text: isEn ? 'First session on water!' : 'Primera sesión en el agua!', time: isEn ? '5d ago' : 'Hace 5d', color: '#264653' },
    ];

    return (
        <>
            {/* Welcome header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white">
                    {getGreeting(t)} <span className="text-ocean-teal">Student</span>
                </h1>
                <p className="text-caribbean-aqua/60 mt-1">
                    {t('dashboardSubtitle')}
                </p>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Current Level */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    <MagicCard className="dark-card p-5">
                        <p className="text-xs font-bold text-ocean-teal uppercase tracking-wider mb-3">
                            {t('currentLevel')}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-heading font-bold text-salt-white">
                                    {isEn ? 'Level 3 — Waterstart' : 'Nivel 3 — Waterstart'}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-ocean-teal to-sand-gold rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: '60%' }}
                                            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                                        />
                                    </div>
                                    <span className="text-xs text-ocean-teal font-bold">
                                        <NumberTicker value={60} className="text-ocean-teal" />%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </MagicCard>
                </motion.div>

                {/* Next Booking */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <MagicCard className="dark-card p-5">
                        <p className="text-xs font-bold text-ocean-teal uppercase tracking-wider mb-3">
                            {t('nextBooking')}
                        </p>
                        <p className="text-sm text-caribbean-aqua/60">{t('noBookings')}</p>
                        <Link
                            href={`/${locale}/booking`}
                            className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-ocean-teal hover:text-ocean-teal-300 transition-colors"
                        >
                            {t('bookClass')}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </MagicCard>
                </motion.div>

                {/* Wind Now */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <MagicCard className="dark-card p-5">
                        <p className="text-xs font-bold text-ocean-teal uppercase tracking-wider mb-3">
                            {t('windNow')}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <NumberTicker value={18} className="text-3xl font-bold text-salt-white" />
                            <span className="text-sm text-caribbean-aqua/60">{t('knots')}</span>
                            <span className="ml-auto flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs text-green-400 font-medium">Optimal</span>
                            </span>
                        </div>
                        <p className="text-xs text-caribbean-aqua/40 mt-1.5">NE · 28°C</p>
                    </MagicCard>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="font-heading font-bold text-salt-white mb-4 text-lg">{t('quickActions')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quickActions.map((action, idx) => (
                        <Link
                            key={action.href}
                            href={action.href}
                            className="group"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.25 + idx * 0.05 }}
                            >
                                <MagicCard className="dark-card dark-card-hover p-4 text-center relative overflow-hidden">
                                    {action.featured && <BorderBeam duration={6} colorFrom="#E9C46A" colorTo="#2A9D8F" />}
                                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:shadow-glow-ocean-teal transition-shadow duration-300`}>
                                        {action.icon}
                                    </div>
                                    <p className="text-sm font-medium text-salt-white">{action.label}</p>
                                </MagicCard>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="font-heading font-bold text-salt-white mb-4 text-lg">{t('recentActivity')}</h2>
                <div className="dark-card p-4 overflow-hidden" style={{ maxHeight: '320px' }}>
                    <AnimatedList delay={800}>
                        {recentActivity.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                            >
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                                    style={{ backgroundColor: `${item.color}20` }}
                                >
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-salt-white truncate">{item.text}</p>
                                    <p className="text-xs text-caribbean-aqua/40">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </AnimatedList>
                </div>
            </motion.div>
        </>
    );
}
