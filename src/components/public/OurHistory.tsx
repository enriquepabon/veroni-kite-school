'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '@/components/ui/text-reveal';
import { Reveal } from '@/components/ui/reveal';
import { LineReveal } from '@/components/ui/line-reveal';

gsap.registerPlugin(ScrollTrigger);

const YOUTUBE_VIDEO_ID = '8CzrVd_cinc';

export default function OurHistory() {
    const t = useTranslations('ourHistory');
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLQuoteElement>(null);

    // Video clip-path wipe animation
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;

        const tween = gsap.fromTo(el,
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.4,
                ease: 'power3.inOut',
                scrollTrigger: { trigger: el, start: 'top 75%' },
            }
        );

        return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    }, []);

    // Quote border draw animation
    useEffect(() => {
        const el = quoteRef.current;
        if (!el) return;

        const border = el.querySelector('.quote-border');
        if (!border) return;

        const tween = gsap.fromTo(border,
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 0.8,
                ease: 'power2.inOut',
                scrollTrigger: { trigger: el, start: 'top 85%' },
            }
        );

        return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    }, []);

    return (
        <section id="nuestra-historia" className="section-padding bg-salt-white relative overflow-hidden">
            {/* Noise texture */}
            <div className="noise-overlay" />

            {/* Background decoration */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-ocean-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-sand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container-main relative">
                {/* Section heading */}
                <div className="text-center mb-14">
                    <TextReveal
                        as="h2"
                        className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-night-tide mb-4"
                    >
                        {t('title')}
                    </TextReveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-deep-marine-600 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </Reveal>
                </div>

                <LineReveal className="bg-ocean-teal/15 mb-12" />

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Text column */}
                    <div>
                        <Reveal direction="left" distance={50}>
                            <p className="text-deep-marine-600 leading-relaxed mb-5">
                                {t('paragraph1')}
                            </p>
                        </Reveal>
                        <Reveal direction="left" distance={50} delay={0.15}>
                            <p className="text-deep-marine-600 leading-relaxed mb-6">
                                {t('paragraph2')}
                            </p>
                        </Reveal>

                        {/* Pull quote with animated border */}
                        <Reveal delay={0.3}>
                            <blockquote ref={quoteRef} className="relative pl-5 py-2">
                                <div className="quote-border absolute left-0 top-0 bottom-0 w-1 bg-ocean-teal rounded-full origin-top" style={{ transform: 'scaleY(0)' }} />
                                <p className="font-accent text-2xl text-ocean-teal leading-snug">
                                    {t('pullQuote')}
                                </p>
                            </blockquote>
                        </Reveal>
                    </div>

                    {/* Video column with clip-path wipe */}
                    <div ref={videoRef} style={{ clipPath: 'inset(0 100% 0 0)' }}>
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-card">
                            {!isPlaying ? (
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="relative w-full h-full group cursor-pointer"
                                    aria-label={t('watchVideo')}
                                >
                                    <Image
                                        src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                                        alt={t('videoTitle')}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                                    {/* Play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-ocean-teal/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-ocean-teal transition-all duration-500 shadow-glow-ocean-teal">
                                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            {t('watchVideo')}
                                        </span>
                                    </div>
                                </button>
                            ) : (
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
                    </div>
                </div>
            </div>
        </section>
    );
}
