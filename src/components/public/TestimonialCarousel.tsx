'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: 'María González',
        country: '🇨🇴 Colombia',
        text: 'En solo 3 días ya estaba haciendo mi primer waterstart. Los instructores son increíbles y el spot es perfecto para aprender.',
        rating: 5,
    },
    {
        id: 2,
        name: 'James Mitchell',
        country: '🇺🇸 USA',
        text: 'Best kitesurf school I have been to. The wind conditions are perfect and the instructors really know how to teach.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Sophie Dupont',
        country: '🇫🇷 France',
        text: 'L\'expérience incroyable! Salinas del Rey est un spot magnifique et l\'équipe de Veroni est très professionnelle.',
        rating: 5,
    },
    {
        id: 4,
        name: 'Carlos Ruiz',
        country: '🇲🇽 México',
        text: 'El Road Map de progresión me ayudó mucho a entender en qué nivel estoy y qué me falta por aprender. ¡Muy recomendado!',
        rating: 5,
    },
];

export default function TestimonialCarousel() {
    const t = useTranslations('testimonials');
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

                            {/* Author */}
                            <div>
                                <p className="font-heading font-bold text-white text-lg">
                                    {testimonials[current].name}
                                </p>
                                <p className="text-caribbean-aqua text-sm mt-1">
                                    {testimonials[current].country}
                                </p>
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
            </div>
        </section>
    );
}
