'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Add more clips here when Mono sends them:
const VIDEO_CLIPS = [
    { webm: '/images/hero-video.webm', mp4: '/images/hero-video.mp4' },
    // { webm: '/images/hero-video-2.webm', mp4: '/images/hero-video-2.mp4' },
];

export default function Hero() {
    const t = useTranslations('hero');
    const videoRef = useRef<HTMLVideoElement>(null);
    const secondVideoRef = useRef<HTMLVideoElement>(null);
    const [videoFailed, setVideoFailed] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [currentClipIndex, setCurrentClipIndex] = useState(0);
    const [showFirst, setShowFirst] = useState(true);

    useEffect(() => {
        // Check prefers-reduced-motion
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mq.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        // Pause video if user prefers reduced motion
        if (prefersReducedMotion && videoRef.current) {
            videoRef.current.pause();
        }
    }, [prefersReducedMotion]);

    const showVideo = !prefersReducedMotion && !videoFailed;

    return (
        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 2.2 — Video Background */}
            <div className="absolute inset-0 z-0">
                {showVideo ? (
                    VIDEO_CLIPS.length === 1 ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="/images/hero-fallback.jpg"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={() => setVideoFailed(true)}
                        >
                            <source src={VIDEO_CLIPS[0].webm} type="video/webm" />
                            <source src={VIDEO_CLIPS[0].mp4} type="video/mp4" />
                        </video>
                    ) : (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showFirst ? 'opacity-100' : 'opacity-0'}`}
                                onEnded={() => {
                                    const nextIdx = (currentClipIndex + 1) % VIDEO_CLIPS.length;
                                    setCurrentClipIndex(nextIdx);
                                    setShowFirst(false);
                                    if (secondVideoRef.current) {
                                        secondVideoRef.current.src = VIDEO_CLIPS[nextIdx].mp4;
                                        secondVideoRef.current.play();
                                    }
                                }}
                                onError={() => setVideoFailed(true)}
                            >
                                <source src={VIDEO_CLIPS[0].webm} type="video/webm" />
                                <source src={VIDEO_CLIPS[0].mp4} type="video/mp4" />
                            </video>
                            <video
                                ref={secondVideoRef}
                                muted
                                playsInline
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${showFirst ? 'opacity-0' : 'opacity-100'}`}
                                onEnded={() => {
                                    const nextIdx = (currentClipIndex + 1) % VIDEO_CLIPS.length;
                                    setCurrentClipIndex(nextIdx);
                                    setShowFirst(true);
                                    if (videoRef.current) {
                                        videoRef.current.src = VIDEO_CLIPS[nextIdx].mp4;
                                        videoRef.current.play();
                                    }
                                }}
                            />
                        </>
                    )
                ) : (
                    <Image
                        src="/images/hero-fallback.jpg"
                        alt=""
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                )}

                {/* Dark overlay (Deep Marine #264653 at 45% opacity) */}
                <div className="absolute inset-0 bg-[#264653]/45" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-main text-center px-4">
                {/* 2.6 — IKO Badge */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="inline-flex items-center gap-2 bg-sand-gold/20 backdrop-blur-sm border border-sand-gold/40 rounded-full px-4 py-2">
                        <Image
                            src="/images/badges/iko-badge.png"
                            alt="IKO Certified Center"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-sand-gold font-semibold text-sm tracking-wide uppercase">
                            {t('ikoBadge')}
                        </span>
                    </div>
                </motion.div>

                {/* 2.5 — H1 with Montserrat ExtraBold (800) */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 text-balance leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {t('title')}
                </motion.h1>

                {/* 2.7 — Subtitle with corrected contrast (Salt White / high opacity white) */}
                <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-[#FAFDF6] mb-10 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    {t('subtitle')}
                </motion.p>

                {/* 2.8 — Differentiated CTAs */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                    {/* Primary CTA — "Reserva tu Clase" → /reservar (Sand Gold) */}
                    <Link
                        href="/reservar"
                        className="btn-secondary text-lg px-8 py-4 shadow-glow-sand-gold"
                    >
                        {t('cta')}
                    </Link>

                    {/* Secondary CTA — "Ver Cursos" → smooth scroll to #cursos (outline) */}
                    <button
                        onClick={() => {
                            const el = document.getElementById('cursos');
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg gap-2"
                    >
                        {t('ctaSecondary')}
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </motion.div>

                {/* 2.9 — Scroll indicator repositioned BELOW the CTAs */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mx-auto">
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
