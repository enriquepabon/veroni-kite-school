'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface UserData {
    email: string;
    fullName: string;
    avatarUrl: string | null;
    role: string;
    isApproved: boolean;
}

interface NavItem {
    href: string;
    labelKey: string;
    icon: React.ReactNode;
}

const iconClass = "w-5 h-5";

const navItems: NavItem[] = [
    {
        href: '/dashboard',
        labelKey: 'overview',
        icon: (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
        ),
    },
    {
        href: '/my-roadmap',
        labelKey: 'myRoadmap',
        icon: (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>
        ),
    },
    {
        href: '/booking',
        labelKey: 'bookClass',
        icon: (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
        ),
    },
    {
        href: '/weather',
        labelKey: 'weather',
        icon: (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
            </svg>
        ),
    },
    {
        href: '/resources',
        labelKey: 'resources',
        icon: (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
        ),
    },
    {
        href: '/profile',
        labelKey: 'profile',
        icon: (
            <svg className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        ),
    },
];

export default function DashboardLayout({
    children,
    user,
}: {
    children: React.ReactNode;
    user: UserData;
}) {
    const locale = useLocale();
    const t = useTranslations('dashboard');
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const displayName = user.fullName || user.email.split('@')[0];
    const avatarInitial = displayName.charAt(0).toUpperCase();

    function isActive(href: string) {
        const localizedHref = `/${locale}${href}`;
        return pathname === localizedHref || pathname.startsWith(localizedHref + '/');
    }

    async function handleSignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push(`/${locale}/login`);
    }

    return (
        <div className="min-h-screen bg-surface-dark dashboard-dark flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:w-64 lg:flex-col fixed inset-y-0 left-0 bg-deep-marine-900/95 backdrop-blur-xl border-r border-white/5 z-30">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <Link href={`/${locale}`} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 6l-3.75 5.36L7.5 8.5 3 15h18l-7-9z" />
                            </svg>
                        </div>
                        <span className="font-heading font-bold text-salt-white text-lg tracking-tight">
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
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                        ? 'bg-ocean-teal/10 text-ocean-teal shadow-sm shadow-ocean-teal/5'
                                        : 'text-caribbean-aqua/60 hover:text-salt-white hover:bg-white/5'
                                    }`}
                            >
                                {item.icon}
                                {t(item.labelKey)}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info + sign out */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-3 mb-3">
                        {user.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={displayName}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center text-white font-bold text-sm shadow-glow-ocean-teal/30">
                                {avatarInitial}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-salt-white truncate">{displayName}</p>
                            <p className="text-xs text-caribbean-aqua/50 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-caribbean-aqua/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        {locale === 'en' ? 'Sign out' : 'Cerrar sesión'}
                    </button>
                </div>
            </aside>

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-deep-marine-900/95 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-40">
                <Link href={`/${locale}`} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 6l-3.75 5.36L7.5 8.5 3 15h18l-7-9z" />
                        </svg>
                    </div>
                    <span className="font-heading font-bold text-salt-white">Veroni</span>
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <svg className="w-6 h-6 text-salt-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.nav
                            className="absolute top-14 left-0 right-0 bg-deep-marine-900/98 backdrop-blur-xl border-b border-white/5 p-4 space-y-1 shadow-2xl"
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
                                                ? 'bg-ocean-teal/10 text-ocean-teal'
                                                : 'text-caribbean-aqua/60 hover:text-salt-white hover:bg-white/5'
                                            }`}
                                    >
                                        {item.icon}
                                        {t(item.labelKey)}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-caribbean-aqua/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                                {locale === 'en' ? 'Sign out' : 'Cerrar sesión'}
                            </button>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile bottom navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-deep-marine-900/95 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-40">
                {navItems.slice(0, 5).map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={`/${locale}${item.href}`}
                            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${active
                                    ? 'text-ocean-teal'
                                    : 'text-caribbean-aqua/40 hover:text-caribbean-aqua/70'
                                }`}
                        >
                            {item.icon}
                            <span className="text-[10px] font-medium leading-tight">
                                {t(item.labelKey)}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Main content */}
            <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 pb-20 lg:pb-0">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
