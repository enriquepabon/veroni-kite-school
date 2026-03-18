'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { labelKey: 'students', countKey: 'studentsCount', prefix: '+', isNumber: true },
    { labelKey: 'years', countKey: 'yearsCount', prefix: '+', isNumber: true },
    { labelKey: 'certified', countKey: 'certifiedCount', prefix: '', isNumber: false },
    { labelKey: 'reviews', countKey: 'reviewsCount', prefix: '', isNumber: false },
];

export default function SocialProof() {
    const t = useTranslations('socialProof');
    const sectionRef = useRef<HTMLDivElement>(null);
    const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            STATS.forEach((stat, i) => {
                const el = numberRefs.current[i];
                if (!el || !stat.isNumber) return;

                const target = parseInt(t(stat.countKey), 10);
                if (isNaN(target)) return;

                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true,
                    },
                    onUpdate: () => {
                        if (el) el.textContent = stat.prefix + Math.round(obj.val).toString();
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [t]);

    return (
        <section ref={sectionRef} className="py-8 bg-deep-marine-800/50 border-y border-white/5">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {STATS.map((stat, i) => (
                        <div key={stat.labelKey} className="space-y-1">
                            <span
                                ref={(el) => { numberRefs.current[i] = el; }}
                                className="text-3xl md:text-4xl font-bold text-ocean-teal"
                            >
                                {stat.isNumber ? '0' : t(stat.countKey)}
                            </span>
                            <p className="text-sm text-white/60 font-medium">{t(stat.labelKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
