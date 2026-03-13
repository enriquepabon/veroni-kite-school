'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '@/components/ui/text-reveal';
import { Reveal } from '@/components/ui/reveal';
import { LineReveal } from '@/components/ui/line-reveal';

gsap.registerPlugin(ScrollTrigger);

const previewCourses = [
    {
        id: '1',
        level: 'discovery',
        levelColor: 'ocean-teal',
        price: 350000,
        duration: 3,
        image: '/images/cursos/curso-descubrimiento.webp',
        slug: 'descubrimiento',
    },
    {
        id: '2',
        level: 'kite_control',
        levelColor: 'deep-marine',
        price: 650000,
        duration: 6,
        image: '/images/cursos/curso-control-kite.webp',
        slug: 'control-de-kite',
    },
    {
        id: '3',
        level: 'waterstart',
        levelColor: 'sand-gold',
        price: 900000,
        duration: 9,
        image: '/images/cursos/curso-waterstart.webp',
        slug: 'waterstart',
    },
];

const levelColors: Record<string, string> = {
    'ocean-teal': 'bg-ocean-teal',
    'deep-marine': 'bg-deep-marine-600',
    'sand-gold': 'bg-sand-gold',
};

const highlightKeys: Record<string, string[]> = {
    discovery: ['discoveryH1', 'discoveryH2', 'discoveryH3', 'discoveryH4'],
    kite_control: ['kiteControlH1', 'kiteControlH2', 'kiteControlH3', 'kiteControlH4'],
    waterstart: ['waterstartH1', 'waterstartH2', 'waterstartH3', 'waterstartH4'],
};

export default function CoursePreview() {
    const t = useTranslations('courses');
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = gridRef.current;
        if (!el) return;

        const cards = el.querySelectorAll('.course-card');
        const tweens: gsap.core.Tween[] = [];

        cards.forEach((card, idx) => {
            // Staggered card entrance
            const tween = gsap.fromTo(card,
                { opacity: 0, y: 60, rotateY: 5 },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    duration: 0.8,
                    delay: idx * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 75%' },
                }
            );
            tweens.push(tween);

            // Image reveal with clip-path
            const img = card.querySelector('.course-img');
            if (img) {
                const imgTween = gsap.fromTo(img,
                    { clipPath: 'inset(0 100% 0 0)' },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        duration: 1.2,
                        delay: idx * 0.15 + 0.2,
                        ease: 'power3.inOut',
                        scrollTrigger: { trigger: el, start: 'top 75%' },
                    }
                );
                tweens.push(imgTween);
            }
        });

        return () => {
            tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill(); });
        };
    }, []);

    return (
        <section id="cursos" className="section-padding bg-white relative overflow-hidden">
            {/* Noise texture */}
            <div className="noise-overlay" />

            <div className="container-main relative">
                <div className="text-center mb-14">
                    <TextReveal
                        as="h2"
                        className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-night-tide mb-4"
                    >
                        {t('title')}
                    </TextReveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-deep-marine-600 max-w-xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </Reveal>
                </div>

                <LineReveal className="bg-deep-marine/10 mb-12" />

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {previewCourses.map((course, idx) => (
                        <div
                            key={course.id}
                            className="course-card group relative bg-salt-white rounded-[16px] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 flex flex-col"
                            style={{ opacity: 0 }}
                        >
                            {/* Course Image */}
                            <div className="course-img relative h-52 overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={t(`${course.level}Name`)}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-marine-900/50 to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <span className={`${levelColors[course.levelColor]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                                        {t(`${course.level}Name`)}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Duration & Level */}
                                <div className="flex items-center gap-4 text-sm text-deep-marine-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {course.duration}h
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                                        </svg>
                                        {t('level')} {idx + 1}
                                    </span>
                                </div>

                                {/* Key Highlights */}
                                <ul className="space-y-2 mb-5 flex-grow">
                                    {highlightKeys[course.level].map((key) => (
                                        <li key={key} className="flex items-start gap-2 text-sm text-deep-marine-600">
                                            <svg
                                                className="w-4 h-4 flex-shrink-0 mt-0.5 text-ocean-teal"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{t(key)}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Price & CTA */}
                                <div className="flex items-end justify-between mt-auto pt-4 border-t border-deep-marine-100">
                                    <div>
                                        <span className="text-2xl font-heading font-bold text-night-tide">
                                            ${(course.price / 1000).toFixed(0)}K
                                        </span>
                                        <span className="text-sm text-caribbean-aqua ml-1">COP</span>
                                    </div>
                                    <Link
                                        href={`/reservar?curso=${course.slug}`}
                                        className="btn-primary text-sm px-4 py-2 hover:scale-105 transition-transform duration-300"
                                    >
                                        {t('bookThis')}
                                    </Link>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean-teal to-caribbean-aqua scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
