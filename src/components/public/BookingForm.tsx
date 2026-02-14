'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const WHATSAPP_NUMBER = '573001234567';

export default function BookingForm({ preselectedCourse }: { preselectedCourse?: string }) {
    const t = useTranslations('bookingForm');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: preselectedCourse || '',
        date: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed');
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', course: '', date: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    const getWhatsAppLink = () => {
        const courseName = formData.course || 'kitesurf';
        const msg = encodeURIComponent(
            `¡Hola! Me interesa reservar una clase de ${courseName}. Mi nombre es ${formData.name || 'un visitante'}. ¿Podrían darme más información?`
        );
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    };

    if (status === 'success') {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-ocean-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-ocean-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold text-night-tide mb-2">{t('success')}</h3>
                <p className="text-deep-marine-600">{t('successMessage')}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <label htmlFor="booking-name" className="block text-sm font-medium text-night-tide mb-1.5">
                    {t('name')} *
                </label>
                <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-deep-marine-200 bg-white px-4 py-3 text-night-tide placeholder:text-deep-marine-400 focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20 outline-none transition-colors"
                />
            </div>

            {/* Email */}
            <div>
                <label htmlFor="booking-email" className="block text-sm font-medium text-night-tide mb-1.5">
                    {t('email')} *
                </label>
                <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-deep-marine-200 bg-white px-4 py-3 text-night-tide placeholder:text-deep-marine-400 focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20 outline-none transition-colors"
                />
            </div>

            {/* Phone / WhatsApp */}
            <div>
                <label htmlFor="booking-phone" className="block text-sm font-medium text-night-tide mb-1.5">
                    {t('phone')} *
                </label>
                <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-deep-marine-200 bg-white px-4 py-3 text-night-tide placeholder:text-deep-marine-400 focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20 outline-none transition-colors"
                />
            </div>

            {/* Course select */}
            <div>
                <label htmlFor="booking-course" className="block text-sm font-medium text-night-tide mb-1.5">
                    {t('course')} *
                </label>
                <select
                    id="booking-course"
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-deep-marine-200 bg-white px-4 py-3 text-night-tide focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20 outline-none transition-colors"
                >
                    <option value="">{t('selectCourse')}</option>
                    <option value="descubrimiento">{t('discovery')}</option>
                    <option value="control-de-kite">{t('kiteControl')}</option>
                    <option value="waterstart">{t('waterstart')}</option>
                </select>
            </div>

            {/* Preferred date */}
            <div>
                <label htmlFor="booking-date" className="block text-sm font-medium text-night-tide mb-1.5">
                    {t('date')}
                </label>
                <input
                    id="booking-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-deep-marine-200 bg-white px-4 py-3 text-night-tide focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20 outline-none transition-colors"
                />
            </div>

            {/* Message */}
            <div>
                <label htmlFor="booking-message" className="block text-sm font-medium text-night-tide mb-1.5">
                    {t('message')}
                </label>
                <textarea
                    id="booking-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('messagePlaceholder')}
                    className="w-full rounded-xl border border-deep-marine-200 bg-white px-4 py-3 text-night-tide placeholder:text-deep-marine-400 focus:border-ocean-teal focus:ring-2 focus:ring-ocean-teal/20 outline-none transition-colors resize-none"
                />
            </div>

            {status === 'error' && (
                <p className="text-red-600 text-sm">{t('error')}</p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary flex-1 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t('submit')}
                        </span>
                    ) : (
                        t('submit')
                    )}
                </button>

                <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20bd5a] transition-colors flex-1 text-base"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t('whatsapp')}
                </a>
            </div>
        </form>
    );
}
