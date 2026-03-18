'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const DownwindMap = dynamic(() => import('@/components/public/DownwindMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] rounded-2xl bg-white/5 animate-pulse" />
    ),
});

type PriceUnit = 'hour' | 'session' | 'day';

interface CourseItem {
    id: string;
    slug: string;
    nameKey: string;
    price: number;
    priceUSD: number;
    duration?: number;
    priceUnit?: PriceUnit;
    gradient: string;
    highlightKeys: string[];
    tag?: string;
}

const learningCourses: CourseItem[] = [
    {
        id: '1',
        slug: 'clase-individual',
        nameKey: 'individualName',
        price: 280000,
        priceUSD: 67,
        duration: 1,
        priceUnit: 'hour',
        gradient: 'from-ocean-teal to-ocean-teal-600',
        highlightKeys: ['individualH1', 'individualH2', 'individualH3', 'individualH4'],
    },
    {
        id: '2',
        slug: 'curso-basico',
        nameKey: 'basicName',
        price: 1110000,
        priceUSD: 264,
        duration: 5,
        gradient: 'from-deep-marine-500 to-deep-marine-600',
        highlightKeys: ['basicH1', 'basicH2', 'basicH3', 'basicH4'],
    },
    {
        id: '3',
        slug: 'curso-completo',
        nameKey: 'completeName',
        price: 2500000,
        priceUSD: 595,
        duration: 10,
        gradient: 'from-sand-gold to-sand-gold-600',
        highlightKeys: ['completeH1', 'completeH2', 'completeH3', 'completeH4'],
    },
];

const advancedCourses: CourseItem[] = [
    {
        id: 'adv-1',
        slug: 'kitefoil',
        nameKey: 'kitefoilName',
        price: 280000,
        priceUSD: 67,
        priceUnit: 'session',
        gradient: 'from-ocean-teal to-deep-marine-500',
        highlightKeys: ['kitefoilH1', 'kitefoilH2', 'kitefoilH3', 'kitefoilH4'],
        tag: 'advancedTag',
    },
    {
        id: 'adv-2',
        slug: 'windfoil',
        nameKey: 'windfoilName',
        price: 280000,
        priceUSD: 67,
        priceUnit: 'session',
        gradient: 'from-ocean-teal to-deep-marine-500',
        highlightKeys: ['windfoilH1', 'windfoilH2', 'windfoilH3', 'windfoilH4'],
        tag: 'advancedTag',
    },
    {
        id: 'adv-3',
        slug: 'saltos-avanzados',
        nameKey: 'jumpName',
        price: 200000,
        priceUSD: 48,
        priceUnit: 'session',
        gradient: 'from-deep-marine-500 to-deep-marine-600',
        highlightKeys: ['jumpH1', 'jumpH2', 'jumpH3', 'jumpH4'],
        tag: 'advancedTag',
    },
    {
        id: 'adv-4',
        slug: 'surf-wave',
        nameKey: 'surfName',
        price: 200000,
        priceUSD: 48,
        priceUnit: 'session',
        gradient: 'from-deep-marine-500 to-deep-marine-600',
        highlightKeys: ['surfH1', 'surfH2', 'surfH3', 'surfH4'],
        tag: 'advancedTag',
    },
];

const rentalServices: CourseItem[] = [
    {
        id: 'rent-1',
        slug: 'equipo-dia',
        nameKey: 'rentalDayName',
        price: 300000,
        priceUSD: 71,
        priceUnit: 'day',
        gradient: 'from-sand-gold to-sand-gold-600',
        highlightKeys: ['rentalDayH1', 'rentalDayH2', 'rentalDayH3', 'rentalDayH4'],
    },
    {
        id: 'rent-2',
        slug: 'equipo-hora',
        nameKey: 'rentalHourName',
        price: 150000,
        priceUSD: 36,
        priceUnit: 'hour',
        gradient: 'from-sand-gold to-sand-gold-600',
        highlightKeys: ['rentalHourH1', 'rentalHourH2', 'rentalHourH3', 'rentalHourH4'],
    },
    {
        id: 'rent-3',
        slug: 'asistencia',
        nameKey: 'assistanceName',
        price: 100000,
        priceUSD: 24,
        priceUnit: 'session',
        gradient: 'from-sand-gold to-sand-gold-600',
        highlightKeys: ['assistanceH1', 'assistanceH2', 'assistanceH3', 'assistanceH4'],
    },
];

const UNIT_KEYS: Record<PriceUnit, string> = {
    hour: 'perHour',
    session: 'perSession',
    day: 'perDay',
};

function formatPrice(price: number): string {
    if (price >= 1000000) {
        const m = price / 1000000;
        return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
}

function CourseCard({ course, idx, t }: { course: CourseItem; idx: number; t: (key: string) => string }) {
    const unitKey = course.priceUnit ? UNIT_KEYS[course.priceUnit] : null;

    return (
        <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col relative"
        >
            {/* Header bar */}
            <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />

            {/* Tag badge */}
            {course.tag && (
                <div className="absolute top-5 right-4 bg-ocean-teal/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {t(course.tag)}
                </div>
            )}

            {/* IKO badge */}
            <div className="absolute top-5 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1.5">
                <Image src="/images/badges/iko-badge.png" alt="IKO" width={16} height={16} />
                <span className="text-[9px] text-deep-marine-600 font-medium">IKO</span>
            </div>

            {/* Content */}
            <div className="p-6 pt-10 flex-1 flex flex-col">
                {/* Course name */}
                <div className="flex items-center gap-3 mb-4">
                    <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.gradient} text-white flex items-center justify-center font-bold text-sm`}>
                        {course.id.replace('adv-', '').replace('rent-', '')}
                    </span>
                    <h3 className="font-heading font-bold text-night-tide text-lg">
                        {t(course.nameKey)}
                    </h3>
                </div>

                {/* Info chips */}
                {course.duration && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        <span className="flex items-center gap-1 text-xs bg-salt-white text-deep-marine-600 px-2.5 py-1 rounded-full">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.duration}h
                        </span>
                    </div>
                )}

                {/* Highlights */}
                <ul className="space-y-2 mb-6 flex-1">
                    {course.highlightKeys.map((key) => (
                        <li key={key} className="flex items-start gap-2 text-sm text-deep-marine-600">
                            <svg className="w-4 h-4 text-ocean-teal mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {t(key)}
                        </li>
                    ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-end justify-between pt-4 border-t border-salt-white">
                    <div>
                        <span className="text-2xl font-heading font-bold text-night-tide">
                            {formatPrice(course.price)}
                        </span>
                        <span className="text-sm text-caribbean-aqua ml-1">
                            COP{unitKey ? `/${t(unitKey)}` : ''}
                        </span>
                        <p className="text-xs text-caribbean-aqua">(~${course.priceUSD} USD{unitKey ? `/${t(unitKey)}` : ''})</p>
                    </div>
                    <Link href={`/reservar?curso=${course.slug}`} className="btn-primary text-sm px-5 py-2.5">
                        {t('bookThis')}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

const tabs = [
    { id: 'courses', labelKey: 'tabCourses' },
    { id: 'advanced', labelKey: 'tabAdvanced' },
    { id: 'equipment', labelKey: 'tabEquipment' },
    { id: 'downwind', labelKey: 'tabDownwind' },
];

export default function CoursesClient() {
    const t = useTranslations('courses');
    const [activeTab, setActiveTab] = useState('courses');

    return (
        <div className="pt-24 pb-16">
            {/* Header */}
            <section className="bg-gradient-dark py-16 md:py-24">
                <div className="container-main text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t('pageTitle')}
                    </motion.h1>
                    <motion.p
                        className="text-lg text-caribbean-aqua max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        {t('pageSubtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="sticky top-16 z-30 bg-night-tide/95 backdrop-blur-sm border-b border-white/10">
                <div className="container-main py-3">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-ocean-teal text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                            >
                                {t(tab.labelKey)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Learning Courses */}
            <section id="courses" className="container-main py-16 scroll-mt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {learningCourses.map((course, idx) => (
                        <CourseCard key={course.id} course={course} idx={idx} t={t} />
                    ))}
                </div>
            </section>

            {/* Advanced Classes */}
            <section id="advanced" className="container-main pb-16 scroll-mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-heading font-bold text-night-tide mb-2">{t('advancedSectionTitle')}</h2>
                    <p className="text-caribbean-aqua">{t('advancedSectionSubtitle')}</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {advancedCourses.map((course, idx) => (
                        <CourseCard key={course.id} course={course} idx={idx} t={t} />
                    ))}
                </div>
            </section>

            {/* Equipment Rental */}
            <section id="equipment" className="container-main pb-16 scroll-mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-heading font-bold text-night-tide mb-2">{t('rentalSectionTitle')}</h2>
                    <p className="text-caribbean-aqua">{t('rentalSectionSubtitle')}</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rentalServices.map((service, idx) => (
                        <CourseCard key={service.id} course={service} idx={idx} t={t} />
                    ))}
                </div>
            </section>

            {/* Downwind Trips */}
            <section id="downwind" className="container-main pb-16 scroll-mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-heading font-bold text-night-tide mb-2">{t('downwindSectionTitle')}</h2>
                    <p className="text-caribbean-aqua mb-2">{t('downwindSectionSubtitle')}</p>
                    <p className="text-deep-marine-600 max-w-2xl">{t('downwindDescription')}</p>
                </motion.div>
                <DownwindMap
                    t={t}
                    whatsappUrl={`https://wa.me/573017464927?text=${encodeURIComponent('Hola, me interesa una salida de Downwind con Veronikites!')}`}
                />
            </section>
        </div>
    );
}
