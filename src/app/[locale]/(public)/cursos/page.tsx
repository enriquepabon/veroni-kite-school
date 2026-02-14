'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const allCourses = [
    {
        id: '1',
        slug: 'discovery',
        level: 1,
        price: 350000,
        priceUSD: 85,
        duration: 3,
        students: 4,
        color: 'turquoise',
        gradient: 'from-ocean-teal to-ocean-teal-600',
        includes: ['Teoría de viento y seguridad', 'Manejo de kite en tierra', 'Body drag en agua'],
    },
    {
        id: '2',
        slug: 'kite_control',
        level: 2,
        price: 650000,
        priceUSD: 160,
        duration: 6,
        students: 3,
        color: 'ocean',
        gradient: 'from-deep-marine-500 to-deep-marine-600',
        includes: ['Power zone y ventana de viento', 'Body drag upwind', 'Introducción al board'],
    },
    {
        id: '3',
        slug: 'waterstart',
        level: 3,
        price: 900000,
        priceUSD: 220,
        duration: 9,
        students: 2,
        color: 'sunset',
        gradient: 'from-sand-gold to-sand-gold-600',
        includes: ['Waterstart técnica', 'Primeras navegaciones', 'Control de velocidad'],
    },
    {
        id: '4',
        slug: 'independent',
        level: 4,
        price: 1200000,
        priceUSD: 295,
        duration: 12,
        students: 2,
        color: 'sunset',
        gradient: 'from-sand-gold-600 to-red-500',
        includes: ['Navegación autónoma', 'Upwind riding', 'Transiciones y jibes'],
    },
    {
        id: '5',
        slug: 'advanced',
        level: 5,
        price: 800000,
        priceUSD: 195,
        duration: 6,
        students: 2,
        color: 'ocean',
        gradient: 'from-ocean-700 to-deep-marine-900',
        includes: ['Saltos básicos', 'Backroll', 'Kiteloop introducción'],
    },
];

const levelNames: Record<string, string> = {
    discovery: 'Descubrimiento',
    kite_control: 'Control de Kite',
    waterstart: 'Waterstart',
    independent: 'Navegación Independiente',
    advanced: 'Freestyle Avanzado',
};

export default function CoursesPage() {
    const t = useTranslations('courses');

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

            {/* Course Grid */}
            <section className="container-main py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allCourses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
                        >
                            {/* Header bar */}
                            <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                {/* Level badge */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.gradient} text-white flex items-center justify-center font-bold text-sm`}>
                                        {course.level}
                                    </span>
                                    <div>
                                        <h3 className="font-heading font-bold text-night-tide text-lg">
                                            {levelNames[course.slug]}
                                        </h3>
                                        <p className="text-xs text-deep-marine-500">Road Map — Nivel {course.level}</p>
                                    </div>
                                </div>

                                {/* Info chips */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="flex items-center gap-1 text-xs bg-salt-white text-deep-marine-600 px-2.5 py-1 rounded-full">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {course.duration}h
                                    </span>
                                    <span className="flex items-center gap-1 text-xs bg-salt-white text-deep-marine-600 px-2.5 py-1 rounded-full">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                        Máx. {course.students}
                                    </span>
                                </div>

                                {/* Includes */}
                                <ul className="space-y-2 mb-6 flex-1">
                                    {course.includes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-deep-marine-600">
                                            <svg className="w-4 h-4 text-ocean-teal mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Price + CTA */}
                                <div className="flex items-end justify-between pt-4 border-t border-salt-white">
                                    <div>
                                        <span className="text-2xl font-heading font-bold text-night-tide">
                                            ${(course.price / 1000).toFixed(0)}K
                                        </span>
                                        <span className="text-sm text-caribbean-aqua ml-1">COP</span>
                                        <p className="text-xs text-caribbean-aqua">(~${course.priceUSD} USD)</p>
                                    </div>
                                    <Link href="/cursos" className="btn-primary text-sm px-5 py-2.5">
                                        {t('bookThis')}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
