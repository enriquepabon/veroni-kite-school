'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import BookingCalendar from '@/components/booking/BookingCalendar';

interface SelectedSlot {
    id: string;
    courseId: string;
    courseName: string;
    instructor: string;
    date: string;
    startTime: string;
    endTime: string;
    maxStudents: number;
    bookedCount: number;
    priceCop: number;
    level: string;
}

export default function BookingPage() {
    const t = useTranslations('booking');
    const locale = useLocale();
    const isEn = locale === 'en';
    const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);

    function handleSlotSelect(slot: SelectedSlot) {
        setSelectedSlot(slot);
    }

    function handleProceedPayment() {
        if (!selectedSlot) return;

        // In production, this would:
        // 1. POST /api/bookings to create a pending booking
        // 2. Initialize Wompi checkout with the booking reference
        // For now, simulate navigation
        setIsConfirming(true);
        setTimeout(() => {
            window.location.href = `/${locale}/booking/confirmation?ref=BOOK-${Date.now()}&status=APPROVED`;
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-salt-white pt-24 pb-16">
            <div className="container-main">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-night-tide mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-deep-marine-600">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Calendar */}
                <BookingCalendar onSlotSelect={handleSlotSelect} />

                {/* Confirmation modal */}
                {selectedSlot && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setSelectedSlot(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-heading font-bold text-night-tide mb-6">
                                {t('confirmTitle')}
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-deep-marine-500">{isEn ? 'Course' : 'Curso'}</span>
                                    <span className="font-medium text-night-tide">{selectedSlot.courseName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-deep-marine-500">{isEn ? 'Date' : 'Fecha'}</span>
                                    <span className="font-medium text-night-tide">
                                        {new Date(selectedSlot.date + 'T12:00:00').toLocaleDateString(locale, {
                                            weekday: 'short',
                                            day: 'numeric',
                                            month: 'long',
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-deep-marine-500">{isEn ? 'Time' : 'Horario'}</span>
                                    <span className="font-medium text-night-tide">
                                        {selectedSlot.startTime} – {selectedSlot.endTime}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-deep-marine-500">{t('instructor')}</span>
                                    <span className="font-medium text-night-tide">{selectedSlot.instructor}</span>
                                </div>
                                <div className="border-t border-salt-white pt-3 flex justify-between">
                                    <span className="text-deep-marine-500 font-medium">Total</span>
                                    <span className="text-xl font-bold text-night-tide">
                                        ${selectedSlot.priceCop.toLocaleString('es-CO')} COP
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedSlot(null)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-salt-white text-deep-marine-600 font-medium hover:bg-salt-white transition-colors"
                                >
                                    {isEn ? 'Cancel' : 'Cancelar'}
                                </button>
                                <button
                                    onClick={handleProceedPayment}
                                    disabled={isConfirming}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold hover:shadow-lg transition-all disabled:opacity-60"
                                >
                                    {isConfirming ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            {isEn ? 'Processing...' : 'Procesando...'}
                                        </span>
                                    ) : (
                                        t('proceedPayment')
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
