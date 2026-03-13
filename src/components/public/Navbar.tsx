'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { gsap } from 'gsap';
import LanguageToggle from './LanguageToggle';

const navLinks = [
    { href: '/', key: 'home' },
    { href: '/cursos', key: 'courses' },
    { href: '/roadmap', key: 'roadmap' },
    { href: '/ubicacion', key: 'location' },
] as const;

export default function Navbar() {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Entrance animation
    useEffect(() => {
        gsap.fromTo(
            '.nav-item',
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, delay: 0.8, ease: 'power3.out' }
        );
        gsap.fromTo(
            '.nav-logo',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo(
            '.nav-cta',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, delay: 1.1, ease: 'power3.out' }
        );
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className={`transition-all duration-500 ${
                scrolled
                    ? 'bg-deep-marine-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
                    : 'bg-transparent'
            }`}>
                <div className="container-main flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="nav-logo flex items-center gap-2 group" style={{ opacity: 0 }}>
                        <span className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight">
                            Veroni<span className="text-ocean-teal group-hover:text-sand-gold transition-colors duration-500">Kite</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ href, key }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    className={`nav-item relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        isActive
                                            ? 'text-ocean-teal'
                                            : 'text-salt-white/80 hover:text-white'
                                    }`}
                                    style={{ opacity: 0 }}
                                >
                                    {t(key)}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-ocean-teal rounded-full transition-all duration-300 ${
                                        isActive ? 'w-4' : 'w-0'
                                    }`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="nav-item" style={{ opacity: 0 }}>
                            <LanguageToggle />
                        </div>
                        <Link href="/login" className="nav-item text-sm font-medium text-salt-white/80 hover:text-white transition-colors px-3 py-2" style={{ opacity: 0 }}>
                            {t('login')}
                        </Link>
                        <div className="nav-cta" style={{ opacity: 0 }}>
                            <Link href="/reservar" className="btn-primary text-sm px-5 py-2.5 hover:scale-105 transition-transform duration-300">
                                {t('bookNow')}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="container-main py-4 space-y-1 border-t border-white/10 bg-deep-marine-900/95 backdrop-blur-xl">
                        {navLinks.map(({ href, key }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                                        isActive
                                            ? 'text-ocean-teal bg-ocean-teal/10'
                                            : 'text-salt-white/80 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {t(key)}
                                </Link>
                            );
                        })}
                        <div className="pt-3 flex items-center gap-3 px-4">
                            <LanguageToggle />
                            <Link href="/login" className="text-sm text-salt-white/80 hover:text-white transition-colors">
                                {t('login')}
                            </Link>
                        </div>
                        <div className="px-4 pt-2">
                            <Link href="/reservar" className="btn-primary w-full text-center text-sm py-3" onClick={() => setMobileOpen(false)}>
                                {t('bookNow')}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
