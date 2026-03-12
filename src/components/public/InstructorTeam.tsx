'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Instructor {
    id: string;
    imageKey: string;
    nameKey: string;
    roleKey: string;
    bioKey: string;
    yearsKey: string;
    instagram?: string;
    socialUrl?: string;
}

const instructors: Instructor[] = [
    { id: '1', imageKey: 'instructor-1', nameKey: 'name1', roleKey: 'role1', bioKey: 'bio1', yearsKey: 'years1', instagram: '#' },
    { id: '2', imageKey: 'instructor-2', nameKey: 'name2', roleKey: 'role2', bioKey: 'bio2', yearsKey: 'years2', instagram: '#' },
    { id: '3', imageKey: 'instructor-3', nameKey: 'name3', roleKey: 'role3', bioKey: 'bio3', yearsKey: 'years3', instagram: '#' },
    { id: '4', imageKey: 'instructor-4', nameKey: 'name4', roleKey: 'role4', bioKey: 'bio4', yearsKey: 'years4', instagram: '#' },
    { id: '5', imageKey: 'instructor-5', nameKey: 'name5', roleKey: 'role5', bioKey: 'bio5', yearsKey: 'years5', instagram: '#' },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

export default function InstructorTeam() {
    const t = useTranslations('instructors');

    return (
        <section id="instructores" className="section-padding bg-deep-marine relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-teal/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-sand-gold/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

            <div className="container-main relative">
                {/* Section heading */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-caribbean-aqua max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Instructor cards grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {instructors.map((instructor) => (
                        <motion.div
                            key={instructor.id}
                            variants={cardVariants}
                            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-ocean-teal/30 transition-all duration-300"
                        >
                            {/* Photo */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={`/images/instructors/${instructor.imageKey}.webp`}
                                    alt={t(instructor.nameKey)}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-marine/60 to-transparent" />

                                {/* Years badge */}
                                <div className="absolute top-3 right-3 bg-ocean-teal/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    {t(instructor.yearsKey)}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <h3 className="text-lg font-heading font-bold text-white">
                                    {t(instructor.nameKey)}
                                </h3>
                                <p className="text-ocean-teal text-sm font-semibold mt-1">
                                    {t(instructor.roleKey)}
                                </p>
                                <p className="text-white/70 text-sm mt-3 leading-relaxed">
                                    {t(instructor.bioKey)}
                                </p>

                                {/* Social links */}
                                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                                    {instructor.instagram && (
                                        <a
                                            href={instructor.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-ocean-teal transition-colors duration-300"
                                            aria-label={`Instagram de ${t(instructor.nameKey)}`}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                            </svg>
                                        </a>
                                    )}
                                    {instructor.socialUrl && (
                                        <a
                                            href={instructor.socialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/50 hover:text-ocean-teal transition-colors duration-300"
                                            aria-label={`Perfil de ${t(instructor.nameKey)}`}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
