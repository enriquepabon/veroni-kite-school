'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
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

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <nav className="bg-deep-marine-900/80 backdrop-blur-lg border-b border-white/10">
                <div className="container-main flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight">
                            Veroni<span className="text-ocean-teal">Kite</span>
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
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'text-ocean-teal bg-ocean-teal/10'
                                            : 'text-salt-white/80 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {t(key)}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side: Language toggle + CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <LanguageToggle />
                        <Link href="/login" className="text-sm font-medium text-salt-white/80 hover:text-white transition-colors px-3 py-2">
                            {t('login')}
                        </Link>
                        <Link href="/cursos" className="btn-primary text-sm px-5 py-2.5">
                            {t('bookNow')}
                        </Link>
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
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="container-main py-4 space-y-1 border-t border-white/10">
                        {navLinks.map(({ href, key }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
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
                            <Link href="/cursos" className="btn-primary w-full text-center text-sm py-3" onClick={() => setMobileOpen(false)}>
                                {t('bookNow')}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
