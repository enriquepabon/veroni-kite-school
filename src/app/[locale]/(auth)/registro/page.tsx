'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

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
            setError('Las contraseñas no coinciden');
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
            <div className="text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-ocean-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-ocean-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
                <h2 className="text-2xl font-heading font-bold text-deep-marine-800 mb-3">
                    {t('checkEmail')}
                </h2>
                <p className="text-caribbean-aqua text-sm">
                    Enviamos un enlace de confirmación a <strong className="text-deep-marine-600">{email}</strong>
                </p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-heading font-bold text-deep-marine-800 mb-2">
                {t('registerTitle')}
            </h1>
            <p className="text-caribbean-aqua mb-8">
                Crea tu cuenta y comienza tu aventura en el kitesurf.
            </p>

            {error && (
                <div className="bg-sand-gold/10 border border-sand-gold/30 text-sand-gold-600 px-4 py-3 rounded-xl mb-6 text-sm">
                    {error}
                </div>
            )}

            {/* Google button first */}
            <button
                onClick={handleGoogleLogin}
                className="w-full py-3.5 rounded-xl border-2 border-deep-marine-200 bg-white text-deep-marine-700 font-semibold hover:bg-deep-marine-50 hover:border-caribbean-aqua transition-all flex items-center justify-center gap-3 shadow-sm"
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
                    <div className="w-full border-t border-deep-marine-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-salt-white px-4 text-caribbean-aqua">{t('orContinueWith')}</span>
                </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                        {t('fullName')}
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-deep-marine-200 text-deep-marine-800 placeholder-caribbean-aqua focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:border-transparent transition-all"
                        placeholder="Tu nombre completo"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                        {t('email')}
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-deep-marine-200 text-deep-marine-800 placeholder-caribbean-aqua focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:border-transparent transition-all"
                        placeholder="correo@ejemplo.com"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                            {t('password')}
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-deep-marine-200 text-deep-marine-800 placeholder-caribbean-aqua focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:border-transparent transition-all"
                            placeholder="••••••"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-deep-marine-600 mb-1.5">
                            {t('confirmPassword')}
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-deep-marine-200 text-deep-marine-800 placeholder-caribbean-aqua focus:outline-none focus:ring-2 focus:ring-ocean-teal focus:border-transparent transition-all"
                            placeholder="••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '...' : t('registerButton')}
                </button>
            </form>

            <p className="text-center text-caribbean-aqua text-sm mt-8">
                {t('hasAccount')}{' '}
                <a href="/login" className="text-ocean-teal-600 hover:text-ocean-teal font-semibold">
                    {t('loginButton')}
                </a>
            </p>
        </div>
    );
}
