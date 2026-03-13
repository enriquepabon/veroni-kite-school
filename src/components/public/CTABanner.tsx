'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '@/components/ui/text-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
    const t = useTranslations('cta');
    const sectionRef = useRef<HTMLElement>(null);
    const orbsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const orbs = orbsRef.current;
        if (!section || !orbs) return;

        const orbEls = orbs.querySelectorAll('.cta-orb');
        const tweens: gsap.core.Tween[] = [];

        orbEls.forEach((orb, i) => {
            const tween = gsap.to(orb, {
                y: i % 2 === 0 ? -60 : 40,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
            tweens.push(tween);
        });

        return () => {
            tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill(); });
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-ocean" />
            <div className="noise-overlay" />

            <div ref={orbsRef} className="absolute inset-0 overflow-hidden">
                <div className="cta-orb absolute top-1/4 left-1/4 w-64 h-64 bg-ocean-teal/10 rounded-full blur-3xl" />
                <div className="cta-orb absolute bottom-1/4 right-1/3 w-48 h-48 bg-sand-gold/10 rounded-full blur-3xl" />
                <div className="cta-orb absolute top-1/2 right-1/4 w-36 h-36 bg-caribbean-aqua/10 rounded-full blur-3xl" />
            </div>

            <div className="container-main relative z-10 text-center">
                <TextReveal
                    as="h2"
                    className="text-3xl md:text-4xl lg:text-display-sm font-heading font-bold text-white mb-4"
                >
                    {t('title')}
                </TextReveal>

                <TextReveal
                    as="p"
                    className="text-lg md:text-xl text-salt-white/80 max-w-xl mx-auto mb-10"
                    stagger={0.03}
                >
                    {t('subtitle')}
                </TextReveal>

                <MagneticButton strength={0.2}>
                    <Link
                        href="/reservar"
                        className="btn-primary text-lg px-10 py-5 shadow-glow-turquoise hover:scale-105 transition-transform duration-300"
                    >
                        {t('button')}
                    </Link>
                </MagneticButton>
            </div>
        </section>
    );
}
