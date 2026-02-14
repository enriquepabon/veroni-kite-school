'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function CTABanner() {
    const t = useTranslations('cta');

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-ocean" />

            {/* Animated orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ocean-teal/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-sand-gold/10 rounded-full blur-3xl animate-float animation-delay-300" />
            </div>

            <div className="container-main relative z-10 text-center">
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {t('title')}
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-salt-white/80 max-w-xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link
                        href="/reservar"
                        className="btn-primary text-lg px-10 py-5 shadow-glow-turquoise hover:scale-105 transition-transform"
                    >
                        {t('button')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
