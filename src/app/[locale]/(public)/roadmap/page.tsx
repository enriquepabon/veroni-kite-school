'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import PublicRoadMap from '@/components/public/PublicRoadMap';

export default function RoadmapPage() {
    const t = useTranslations('roadmap');

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

            {/* Interactive Roadmap */}
            <section className="container-main py-16">
                <PublicRoadMap />
            </section>
        </div>
    );
}
