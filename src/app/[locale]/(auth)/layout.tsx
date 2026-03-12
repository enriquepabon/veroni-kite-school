'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Particles } from '@/components/ui/particles';
import { BlurFade } from '@/components/ui/blur-fade';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = useTranslations('auth');

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Left side — branding + particles */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-deep-marine-900 items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-deep-marine-800 via-deep-marine-900 to-night-tide" />

                {/* Particles background */}
                <Particles
                    className="absolute inset-0 z-0"
                    quantity={60}
                    staticity={40}
                    ease={60}
                    size={0.5}
                    color="#2A9D8F"
                    vx={0.02}
                    vy={-0.01}
                />

                <div className="relative z-10 text-center px-12 max-w-lg">
                    <BlurFade delay={0.1}>
                        <Link href="/" className="inline-block mb-8">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center shadow-glow-ocean-teal">
                                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14 6l-3.75 5.36L7.5 8.5 3 15h18l-7-9z" />
                                    </svg>
                                </div>
                                <span className="text-3xl font-heading font-bold text-white tracking-tight">
                                    Veroni Kite
                                </span>
                            </div>
                        </Link>
                    </BlurFade>

                    <BlurFade delay={0.25}>
                        <p className="text-salt-white/80 text-lg leading-relaxed">
                            {t('heroTagline')}
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.4}>
                        <div className="mt-12 flex items-center justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-caribbean-aqua/80">
                                <svg className="w-5 h-5 text-ocean-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('trustIKO')}
                            </div>
                            <div className="flex items-center gap-2 text-caribbean-aqua/80">
                                <svg className="w-5 h-5 text-ocean-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('trustLevels')}
                            </div>
                            <div className="flex items-center gap-2 text-caribbean-aqua/80">
                                <svg className="w-5 h-5 text-ocean-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('trustStudents')}
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Right side — form */}
            <div className="flex-1 flex items-center justify-center bg-salt-white px-4 py-12 sm:px-8">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14 6l-3.75 5.36L7.5 8.5 3 15h18l-7-9z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-heading font-bold text-deep-marine-800">Veroni Kite</span>
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
