'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
    href: string;
    labelKey: string;
    icon: string;
}

const navItems: NavItem[] = [
    { href: '/dashboard', labelKey: 'overview', icon: '📊' },
    { href: '/my-roadmap', labelKey: 'myRoadmap', icon: '🗺️' },
    { href: '/booking', labelKey: 'bookClass', icon: '📅' },
    { href: '/weather', labelKey: 'weather', icon: '🌊' },
    { href: '/resources', labelKey: 'resources', icon: '📚' },
    { href: '/profile', labelKey: 'profile', icon: '👤' },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = useLocale();
    const t = useTranslations('dashboard');
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function isActive(href: string) {
        const localizedHref = `/${locale}${href}`;
        return pathname === localizedHref || pathname.startsWith(localizedHref + '/');
    }

    return (
        <div className="min-h-screen bg-salt-white flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col fixed inset-y-0 left-0 bg-white border-r border-salt-white z-30">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-salt-white">
                    <Link href={`/${locale}`} className="flex items-center gap-2">
                        <span className="text-2xl">🪁</span>
                        <span className="font-heading font-bold text-night-tide text-lg">
                            Veroni Kite
                        </span>
                    </Link>
                </div>

                {/* Nav links */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={`/${locale}${item.href}`}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                        ? 'bg-gradient-to-r from-deep-marine-50 to-ocean-teal-50 text-deep-marine-600 shadow-sm'
                                        : 'text-deep-marine-500 hover:bg-salt-white hover:text-night-tide'
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {t(item.labelKey)}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info at bottom */}
                <div className="p-4 border-t border-salt-white">
                    <div className="flex items-center gap-3 px-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-deep-marine-400 to-ocean-teal flex items-center justify-center text-white font-bold text-sm">
                            S
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-night-tide truncate">Student</p>
                            <p className="text-xs text-caribbean-aqua truncate">student@veroni.co</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-salt-white flex items-center justify-between px-4 z-40">
                <Link href={`/${locale}`} className="flex items-center gap-2">
                    <span className="text-xl">🪁</span>
                    <span className="font-heading font-bold text-night-tide">Veroni</span>
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-salt-white"
                >
                    <svg className="w-6 h-6 text-night-tide" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 bg-black/50 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.nav
                            className="absolute top-14 left-0 right-0 bg-white border-b border-salt-white p-4 space-y-1 shadow-lg"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navItems.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={`/${locale}${item.href}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                                                ? 'bg-deep-marine-50 text-deep-marine-600'
                                                : 'text-deep-marine-500 hover:bg-salt-white'
                                            }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        {t(item.labelKey)}
                                    </Link>
                                );
                            })}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile bottom navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-salt-white flex items-center justify-around z-40">
                {navItems.slice(0, 5).map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={`/${locale}${item.href}`}
                            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${active ? 'text-deep-marine-500' : 'text-caribbean-aqua'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-[10px] font-medium leading-tight">
                                {t(item.labelKey)}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Main content */}
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 pb-20 lg:pb-0">
                {children}
            </main>
        </div>
    );
}
