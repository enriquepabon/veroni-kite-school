'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

const YOUTUBE_VIDEO_ID = '8CzrVd_cinc';

const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

const videoVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
    },
};

export default function OurHistory() {
    const t = useTranslations('ourHistory');
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="nuestra-historia" className="section-padding bg-salt-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-ocean-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-sand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container-main relative">
                {/* Section heading */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-night-tide mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-deep-marine-600 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Text column */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={textVariants}
                    >
                        <p className="text-deep-marine-600 leading-relaxed mb-5">
                            {t('paragraph1')}
                        </p>
                        <p className="text-deep-marine-600 leading-relaxed mb-6">
                            {t('paragraph2')}
                        </p>

                        {/* Pull quote */}
                        <blockquote className="border-l-4 border-ocean-teal pl-5 py-2">
                            <p className="font-accent text-2xl text-ocean-teal leading-snug">
                                {t('pullQuote')}
                            </p>
                        </blockquote>
                    </motion.div>

                    {/* Video column */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={videoVariants}
                    >
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-card">
                            {!isPlaying ? (
                                /* Thumbnail + play button */
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="relative w-full h-full group cursor-pointer"
                                    aria-label={t('watchVideo')}
                                >
                                    <Image
                                        src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                                        alt={t('videoTitle')}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    {/* Dark overlay */}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                                    {/* Play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-ocean-teal/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-ocean-teal transition-all duration-300 shadow-glow-ocean-teal">
                                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Label */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            {t('watchVideo')}
                                        </span>
                                    </div>
                                </button>
                            ) : (
                                /* YouTube iframe */
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                                    title={t('videoTitle')}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
