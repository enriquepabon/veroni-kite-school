'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

// Static preview data — will be replaced with Supabase data in Task 2.8
const previewCourses = [
    {
        id: '1',
        level: 'discovery',
        levelColor: 'ocean-teal',
        price: 350000,
        duration: 3,
        image: null,
    },
    {
        id: '2',
        level: 'kite_control',
        levelColor: 'deep-marine',
        price: 650000,
        duration: 6,
        image: null,
    },
    {
        id: '3',
        level: 'waterstart',
        levelColor: 'sand-gold',
        price: 900000,
        duration: 9,
        image: null,
    },
];

const levelNames: Record<string, { es: string; en: string }> = {
    discovery: { es: 'Descubrimiento', en: 'Discovery' },
    kite_control: { es: 'Control de Kite', en: 'Kite Control' },
    waterstart: { es: 'Waterstart', en: 'Waterstart' },
};

const levelColors: Record<string, string> = {
    'ocean-teal': 'bg-ocean-teal',
    'deep-marine': 'bg-deep-marine-600',
    'sand-gold': 'bg-sand-gold',
};

export default function CoursePreview() {
    const t = useTranslations('courses');

    return (
        <section id="cursos" className="section-padding bg-white relative">
            <div className="container-main">
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-night-tide mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-deep-marine-600 max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {previewCourses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative bg-salt-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Image placeholder */}
                            <div className="h-48 bg-gradient-to-br from-deep-marine-800 to-deep-marine-900 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-marine-900/60 to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <span className={`${levelColors[course.levelColor]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                                        {levelNames[course.level]?.es}
                                    </span>
                                </div>
                                {/* Decorative kite icon */}
                                <div className="absolute bottom-4 right-4 text-white/20">
                                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.414L18.586 12 12 18.586 5.414 12 12 5.414z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-deep-marine-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {course.duration}h
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                                        </svg>
                                        {t('level')} {idx + 1}
                                    </span>
                                </div>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="text-2xl font-heading font-bold text-night-tide">
                                            ${(course.price / 1000).toFixed(0)}K
                                        </span>
                                        <span className="text-sm text-caribbean-aqua ml-1">COP</span>
                                    </div>
                                    <Link
                                        href="/cursos"
                                        className="btn-primary text-sm px-4 py-2"
                                    >
                                        {t('bookThis')}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
