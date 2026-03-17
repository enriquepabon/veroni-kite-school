'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const allCourses = [
    {
        id: '1',
        slug: 'clase-individual',
        nameKey: 'individualName',
        price: 250000,
        priceUSD: 60,
        duration: 1,
        priceUnit: 'hour' as const,
        gradient: 'from-ocean-teal to-ocean-teal-600',
        highlightKeys: ['individualH1', 'individualH2', 'individualH3', 'individualH4'],
    },
    {
        id: '2',
        slug: 'curso-basico',
        nameKey: 'basicName',
        price: 1300000,
        priceUSD: 310,
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

export default function CoursesClient() {
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
                                {/* Course name */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.gradient} text-white flex items-center justify-center font-bold text-sm`}>
                                        {course.id}
                                    </span>
                                    <h3 className="font-heading font-bold text-night-tide text-lg">
                                        {t(course.nameKey)}
                                    </h3>
                                </div>

                                {/* Info chips */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="flex items-center gap-1 text-xs bg-salt-white text-deep-marine-600 px-2.5 py-1 rounded-full">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {course.duration}h
                                    </span>
                                </div>

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
                                            {course.price >= 1000000
                                                ? `$${(course.price / 1000000).toFixed(1).replace('.0', '')}M`
                                                : `$${(course.price / 1000).toFixed(0)}K`}
                                        </span>
                                        <span className="text-sm text-caribbean-aqua ml-1">
                                            COP{course.priceUnit === 'hour' ? `/${t('perHour')}` : ''}
                                        </span>
                                        <p className="text-xs text-caribbean-aqua">(~${course.priceUSD} USD{course.priceUnit === 'hour' ? `/${t('perHour')}` : ''})</p>
                                    </div>
                                    <Link href={`/reservar?curso=${course.slug}`} className="btn-primary text-sm px-5 py-2.5">
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
