'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function LocationPage() {
    const t = useTranslations('location');

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
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        className="text-lg text-caribbean-aqua max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Map Section */}
            <section className="container-main py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Map embed */}
                    <motion.div
                        className="rounded-2xl overflow-hidden shadow-card h-[400px] lg:h-[500px]"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15679.4!2d-75.545!3d10.775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSalinas+del+Rey!5e0!3m2!1sen!2sco!4v1700000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Veroni Kite - Salinas del Rey"
                        />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        {/* Wind conditions */}
                        <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
                            <h2 className="text-xl font-heading font-bold text-night-tide mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-ocean-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>
                                {t('windTitle')}
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: t('windSpeed'), value: '15-25 nudos', icon: '💨' },
                                    { label: t('season'), value: 'Dic - Abr', icon: '📅' },
                                    { label: t('waterTemp'), value: '27-29°C', icon: '🌊' },
                                    { label: t('airTemp'), value: '30-34°C', icon: '☀️' },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-salt-white rounded-xl p-4">
                                        <span className="text-2xl mb-1 block">{item.icon}</span>
                                        <p className="text-xs text-deep-marine-500 mb-1">{item.label}</p>
                                        <p className="font-heading font-bold text-night-tide text-sm">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* How to get there */}
                        <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
                            <h2 className="text-xl font-heading font-bold text-night-tide mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6 text-sand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                {t('howToGetTitle')}
                            </h2>
                            <ul className="space-y-3 text-sm text-deep-marine-600">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-ocean-teal-500/10 text-ocean-teal rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                                    {t('step1')}
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-ocean-teal-500/10 text-ocean-teal rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                                    {t('step2')}
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-ocean-teal-500/10 text-ocean-teal rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                                    {t('step3')}
                                </li>
                            </ul>
                        </div>

                        {/* Accommodation */}
                        <div className="bg-white rounded-2xl p-6 shadow-card">
                            <h2 className="text-xl font-heading font-bold text-night-tide mb-3 flex items-center gap-2">
                                <svg className="w-6 h-6 text-deep-marine-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                                </svg>
                                {t('accommodationTitle')}
                            </h2>
                            <p className="text-sm text-deep-marine-600 leading-relaxed">
                                {t('accommodationText')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
