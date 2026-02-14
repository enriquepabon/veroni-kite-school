'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function LeadCaptureForm() {
    const t = useTranslations('leadCapture');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed');
            setStatus('success');
            setFormData({ name: '', email: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="relative py-16 md:py-20 overflow-hidden">
            {/* Gradient background: Ocean Teal → Caribbean Aqua */}
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-teal to-caribbean-aqua" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-deep-marine/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

            <div className="container-main relative z-10">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-white/80 mb-8">
                        {t('subtitle')}
                    </p>

                    {status === 'success' ? (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-white font-semibold">{t('success')}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('name')}
                                className="flex-1 rounded-xl px-4 py-3 bg-white/90 text-night-tide placeholder:text-deep-marine-400 border-0 outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('email')}
                                className="flex-1 rounded-xl px-4 py-3 bg-white/90 text-night-tide placeholder:text-deep-marine-400 border-0 outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="px-6 py-3 bg-sand-gold text-night-tide font-bold rounded-xl hover:bg-sand-gold-600 transition-colors disabled:opacity-60 whitespace-nowrap"
                            >
                                {t('submit')}
                            </button>
                        </form>
                    )}

                    {status === 'error' && (
                        <p className="text-white/90 text-sm mt-3">{t('error')}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
