'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
    {
        id: 1,
        name: 'María González',
        country: '🇨🇴 Colombia',
        date: '2026-01',
        text: 'En solo 3 días ya estaba haciendo mi primer waterstart. Los instructores son increíbles y el spot es perfecto para aprender.',
        rating: 5,
        image: '/images/testimonios/testimonio-1.webp',
        reviewPlatform: 'google' as const,
        reviewUrl: 'https://g.page/veronikite/review',
    },
    {
        id: 2,
        name: 'James Mitchell',
        country: '🇺🇸 USA',
        date: '2025-12',
        text: 'Best kitesurf school I have been to. The wind conditions are perfect and the instructors really know how to teach.',
        rating: 5,
        image: '/images/testimonios/testimonio-2.webp',
        reviewPlatform: 'google' as const,
        reviewUrl: 'https://g.page/veronikite/review',
    },
    {
        id: 3,
        name: 'Sophie Dupont',
        country: '🇫🇷 France',
        date: '2025-11',
        text: "L'expérience incroyable! Salinas del Rey est un spot magnifique et l'équipe de Veroni est très professionnelle.",
        rating: 5,
        image: '/images/testimonios/testimonio-3.webp',
        reviewPlatform: 'tripadvisor' as const,
        reviewUrl: 'https://www.tripadvisor.com/veronikite',
    },
    {
        id: 4,
        name: 'Carlos Ruiz',
        country: '🇲🇽 México',
        date: '2025-10',
        text: 'El Road Map de progresión me ayudó mucho a entender en qué nivel estoy y qué me falta por aprender. ¡Muy recomendado!',
        rating: 5,
        image: '/images/testimonios/testimonio-4.webp',
        reviewPlatform: 'google' as const,
        reviewUrl: 'https://g.page/veronikite/review',
    },
];

const platformLabels: Record<string, string> = {
    google: 'Google',
    tripadvisor: 'TripAdvisor',
};

function formatDate(dateStr: string, locale: string) {
    const [year, month] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
        month: 'long',
        year: 'numeric',
    });
}

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

function TripAdvisorIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
    );
}

export default function TestimonialCarousel() {
    const t = useTranslations('testimonials');
    const locale = useLocale();
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="section-padding bg-deep-marine-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-ocean-teal/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sand-gold/5 rounded-full blur-3xl" />

            <div className="container-main relative">
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-caribbean-aqua max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="max-w-2xl mx-auto relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="glass-card p-8 md:p-10 text-center bg-white/5 border-white/10"
                        >
                            {/* Stars */}
                            <div className="flex justify-center gap-1 mb-6">
                                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-sand-gold" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-6 font-light italic">
                                &ldquo;{testimonials[current].text}&rdquo;
                            </blockquote>

                            {/* Author with photo */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-ocean-teal/50">
                                    <Image
                                        src={testimonials[current].image}
                                        alt={testimonials[current].name}
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-heading font-bold text-white text-lg">
                                        {testimonials[current].name}
                                    </p>
                                    <p className="text-caribbean-aqua text-sm mt-0.5">
                                        {testimonials[current].country}
                                    </p>
                                    <p className="text-white/50 text-xs mt-1">
                                        {formatDate(testimonials[current].date, locale)}
                                    </p>
                                </div>

                                {/* Verified review link */}
                                <a
                                    href={testimonials[current].reviewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors mt-1"
                                >
                                    {testimonials[current].reviewPlatform === 'google' ? (
                                        <GoogleIcon className="w-3.5 h-3.5" />
                                    ) : (
                                        <TripAdvisorIcon className="w-3.5 h-3.5 text-green-400" />
                                    )}
                                    <span>
                                        {t('verifiedOn')} {platformLabels[testimonials[current].reviewPlatform]}
                                    </span>
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-ocean-teal transition-all flex items-center justify-center"
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === current ? 'bg-ocean-teal w-8' : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-ocean-teal transition-all flex items-center justify-center"
                            aria-label="Next testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* See all reviews link */}
                <div className="text-center mt-10">
                    <a
                        href="https://g.page/veronikite/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-caribbean-aqua hover:text-white transition-colors"
                    >
                        <GoogleIcon className="w-4 h-4" />
                        {t('seeAllReviews')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
