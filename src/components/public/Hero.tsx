'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function Hero() {
    const t = useTranslations('hero');

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {/* Placeholder — replace with actual video: <video autoPlay muted loop playsInline poster="/images/hero-poster.jpg"> */}
                <div className="absolute inset-0 bg-gradient-to-b from-deep-marine-900 via-deep-marine-800 to-deep-marine-900" />
                {/* Animated kite shapes for visual interest */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ocean-teal-500/5 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-sand-gold-500/5 rounded-full blur-3xl animate-float animation-delay-300" />
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-ocean-teal-500/3 rounded-full blur-3xl animate-pulse-glow" />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-deep-marine-900/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-main text-center px-4">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-display-xl font-heading font-bold text-white mb-6 text-balance"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {t('title')}
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-salt-white mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                    <Link href="/cursos" className="btn-primary text-lg px-8 py-4 shadow-glow-ocean-teal">
                        {t('cta')}
                    </Link>
                    <Link
                        href="/cursos"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
                    >
                        {t('ctaSecondary')}
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
