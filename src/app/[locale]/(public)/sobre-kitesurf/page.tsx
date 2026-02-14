'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5'] as const;

function AccordionItem({ questionKey, isOpen, onToggle }: { questionKey: string; isOpen: boolean; onToggle: () => void }) {
    const t = useTranslations('aboutKite');

    return (
        <div className="border-b border-salt-white last:border-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-5 text-left group"
            >
                <span className="font-heading font-semibold text-night-tide group-hover:text-ocean-teal transition-colors pr-4">
                    {t(`${questionKey}Q`)}
                </span>
                <motion.svg
                    className="w-5 h-5 text-caribbean-aqua flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-deep-marine-600 leading-relaxed">
                            {t(`${questionKey}A`)}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AboutKitesurfPage() {
    const t = useTranslations('aboutKite');
    const [openFaq, setOpenFaq] = useState<string | null>('faq1');

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

            {/* What is Kitesurf */}
            <section className="container-main py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-heading font-bold text-night-tide mb-6">
                            {t('whatIsTitle')}
                        </h2>
                        <div className="space-y-4 text-deep-marine-600 leading-relaxed">
                            <p>{t('whatIsP1')}</p>
                            <p>{t('whatIsP2')}</p>
                        </div>

                        {/* Benefits */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {[
                                { icon: '🌊', label: t('benefit1') },
                                { icon: '💪', label: t('benefit2') },
                                { icon: '🌍', label: t('benefit3') },
                                { icon: '🧘', label: t('benefit4') },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-salt-white rounded-xl p-3">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-sm font-medium text-night-tide">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Video embed */}
                    <motion.div
                        className="rounded-2xl overflow-hidden shadow-card aspect-video bg-deep-marine-800"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="What is Kitesurfing?"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="container-main py-16">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-heading font-bold text-night-tide mb-3">
                        {t('faqTitle')}
                    </h2>
                </motion.div>

                <motion.div
                    className="max-w-2xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {faqKeys.map((key) => (
                        <AccordionItem
                            key={key}
                            questionKey={key}
                            isOpen={openFaq === key}
                            onToggle={() => setOpenFaq(openFaq === key ? null : key)}
                        />
                    ))}
                </motion.div>
            </section>
        </div>
    );
}
