'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { BlurFade } from '@/components/ui/blur-fade';
import { ShineBorder } from '@/components/ui/shine-border';

export default function RegisterPage() {
    const t = useTranslations('auth');
    const supabase = createClient();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError(t('passwordMismatch'));
            return;
        }

        setLoading(true);

        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    if (success) {
        return (
            <BlurFade delay={0.1} duration={0.5}>
                <div className="relative rounded-2xl bg-white p-8 sm:p-10 shadow-card overflow-hidden text-center">
                    <ShineBorder shineColor={['#2A9D8F', '#E9C46A']} duration={8} />

                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-ocean-teal/10 rounded-full blur-3xl" />

                    <div className="relative w-20 h-20 bg-gradient-to-br from-ocean-teal/10 to-caribbean-aqua/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-ocean-teal to-caribbean-aqua rounded-xl flex items-center justify-center shadow-lg shadow-ocean-teal/20">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-deep-marine-800 mb-3">
                        {t('checkEmailTitle')}
                    </h2>
                    <p className="text-caribbean-aqua text-sm leading-relaxed">
                        {t('confirmationSent')} <strong className="text-deep-marine-600">{email}</strong>
                    </p>
                </div>
            </BlurFade>
        );
    }

    return (
        <BlurFade delay={0.1} duration={0.5}>
            <div className="relative rounded-2xl bg-white p-8 sm:p-10 shadow-card overflow-hidden">
                <ShineBorder shineColor={['#2A9D8F', '#76C7C0', '#E9C46A']} duration={10} />

                {/* Header with decorative accent */}
                <div className="relative mb-8">
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-golden-sand/10 rounded-full blur-2xl" />
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-ocean-teal/5 rounded-full blur-xl" />
                    <div className="w-12 h-12 bg-gradient-to-br from-ocean-teal to-caribbean-aqua rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-ocean-teal/20">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-deep-marine-800 mb-1.5">
                        {t('registerTitle')}
                    </h1>
                    <p className="text-caribbean-aqua">
                        {t('registerSubtitle')}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Google button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-3.5 rounded-xl border-2 border-deep-marine-100 bg-white text-deep-marine-700 font-semibold hover:bg-deep-marine-50 hover:border-ocean-teal/30 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    {t('google')}
                </button>

                {/* Divider */}
                <div className="relative my-7">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-deep-marine-100" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-caribbean-aqua">{t('orContinueWith')}</span>
                    </div>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                            {t('fullName')}
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-caribbean-aqua/50 group-focus-within:text-ocean-teal transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-salt-white border border-deep-marine-100 text-deep-marine-800 placeholder-caribbean-aqua/40 focus:outline-none focus:ring-2 focus:ring-ocean-teal/40 focus:border-ocean-teal/30 focus:bg-white transition-all"
                                placeholder={t('namePlaceholder')}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                            {t('email')}
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-caribbean-aqua/50 group-focus-within:text-ocean-teal transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-salt-white border border-deep-marine-100 text-deep-marine-800 placeholder-caribbean-aqua/40 focus:outline-none focus:ring-2 focus:ring-ocean-teal/40 focus:border-ocean-teal/30 focus:bg-white transition-all"
                                placeholder={t('emailPlaceholder')}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                                {t('password')}
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-caribbean-aqua/50 group-focus-within:text-ocean-teal transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-salt-white border border-deep-marine-100 text-deep-marine-800 placeholder-caribbean-aqua/40 focus:outline-none focus:ring-2 focus:ring-ocean-teal/40 focus:border-ocean-teal/30 focus:bg-white transition-all"
                                    placeholder="••••••"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                                {t('confirmPassword')}
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-caribbean-aqua/50 group-focus-within:text-ocean-teal transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-salt-white border border-deep-marine-100 text-deep-marine-800 placeholder-caribbean-aqua/40 focus:outline-none focus:ring-2 focus:ring-ocean-teal/40 focus:border-ocean-teal/30 focus:bg-white transition-all"
                                    placeholder="••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <>
                                    {t('registerButton')}
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </>
                            )}
                        </span>
                    </button>
                </form>

                <p className="text-center text-caribbean-aqua text-sm mt-8">
                    {t('hasAccount')}{' '}
                    <a href="/login" className="text-ocean-teal hover:text-ocean-teal-600 font-semibold transition-colors underline underline-offset-2 decoration-ocean-teal/30 hover:decoration-ocean-teal">
                        {t('loginButton')}
                    </a>
                </p>
            </div>
        </BlurFade>
    );
}
