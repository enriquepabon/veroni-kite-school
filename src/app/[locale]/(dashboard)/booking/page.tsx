'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import BookingCalendar, { type SelectedSlot } from '@/components/booking/BookingCalendar';

interface InstructorOption {
    id: string;
    full_name: string;
    avatar_url: string | null;
}

export default function BookingPage() {
    const t = useTranslations('booking');
    const locale = useLocale();
    const isEn = locale === 'en';

    const [instructors, setInstructors] = useState<InstructorOption[]>([]);
    const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
    const [loadingInstructors, setLoadingInstructors] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [bookingError, setBookingError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchInstructors() {
            try {
                const res = await fetch('/api/my-instructors');
                if (res.ok) {
                    const data = await res.json();
                    setInstructors(data);
                    // Auto-select if only one instructor
                    if (data.length === 1) {
                        setSelectedInstructor(data[0].id);
                    }
                }
            } catch {
                // silently fail
            } finally {
                setLoadingInstructors(false);
            }
        }
        fetchInstructors();
    }, []);

    function handleSlotSelect(slot: SelectedSlot) {
        setSelectedSlot(slot);
        setBookingError(null);
    }

    async function handleProceedPayment() {
        if (!selectedSlot) return;
        setIsConfirming(true);
        setBookingError(null);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slot_id: selectedSlot.id }),
            });

            if (res.ok) {
                const booking = await res.json();
                window.location.href = `/${locale}/booking/confirmation?ref=${booking.data?.id || 'BOOK-' + Date.now()}&status=APPROVED`;
            } else {
                const err = await res.json();
                setBookingError(err.error || (isEn ? 'Booking failed' : 'Error al reservar'));
                setIsConfirming(false);
            }
        } catch {
            setBookingError(isEn ? 'Connection error' : 'Error de conexión');
            setIsConfirming(false);
        }
    }

    return (
        <>
            {/* Header */}
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white">
                    {t('title')}
                </h1>
                <p className="text-caribbean-aqua/60 mt-1">
                    {t('subtitle')}
                </p>
            </motion.div>

            {/* Instructor Selector */}
            {loadingInstructors ? (
                <div className="dark-card p-6 mb-6 animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-48 mb-3" />
                    <div className="flex gap-3">
                        <div className="h-12 bg-white/5 rounded-xl w-32" />
                        <div className="h-12 bg-white/5 rounded-xl w-32" />
                    </div>
                </div>
            ) : instructors.length === 0 ? (
                <motion.div
                    className="dark-card p-8 text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <svg className="w-12 h-12 text-caribbean-aqua/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <p className="text-salt-white font-medium mb-1">
                        {isEn ? 'No instructors assigned yet' : 'Aún no tienes instructores asignados'}
                    </p>
                    <p className="text-caribbean-aqua/40 text-sm">
                        {isEn
                            ? 'Contact the administration to get an instructor assigned to your account.'
                            : 'Contacta a la administración para que te asignen un instructor.'}
                    </p>
                </motion.div>
            ) : instructors.length > 1 ? (
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <p className="text-xs text-caribbean-aqua/40 font-medium uppercase tracking-wider mb-3">
                        {isEn ? 'Select Instructor' : 'Seleccionar Instructor'}
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {instructors.map((inst) => (
                            <button
                                key={inst.id}
                                onClick={() => setSelectedInstructor(inst.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 flex-shrink-0 ${
                                    selectedInstructor === inst.id
                                        ? 'border-ocean-teal bg-ocean-teal/10 shadow-glow-ocean-teal/20'
                                        : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                                }`}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center text-white font-bold text-sm">
                                    {inst.full_name.charAt(0)}
                                </div>
                                <span className={`text-sm font-medium ${selectedInstructor === inst.id ? 'text-ocean-teal' : 'text-salt-white'}`}>
                                    {inst.full_name}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            ) : null}

            {/* Calendar — only show if instructor is selected or no instructors needed */}
            {(selectedInstructor || instructors.length === 0) && instructors.length > 0 && (
                <BookingCalendar onSlotSelect={handleSlotSelect} instructorId={selectedInstructor} />
            )}

            {/* Confirmation modal */}
            {selectedSlot && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => { setSelectedSlot(null); setBookingError(null); }}
                >
                    <motion.div
                        className="dark-card p-6 md:p-8 max-w-md w-full"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-heading font-bold text-salt-white mb-6">
                            {t('confirmTitle')}
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-caribbean-aqua/60">{isEn ? 'Course' : 'Curso'}</span>
                                <span className="font-medium text-salt-white">{selectedSlot.courseName}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caribbean-aqua/60">{isEn ? 'Date' : 'Fecha'}</span>
                                <span className="font-medium text-salt-white">
                                    {new Date(selectedSlot.date + 'T12:00:00').toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'long' })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caribbean-aqua/60">{isEn ? 'Time' : 'Horario'}</span>
                                <span className="font-medium text-salt-white">{selectedSlot.startTime} – {selectedSlot.endTime}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caribbean-aqua/60">{t('instructor')}</span>
                                <span className="font-medium text-salt-white">{selectedSlot.instructor}</span>
                            </div>
                            <div className="border-t border-white/10 pt-3 flex justify-between">
                                <span className="text-caribbean-aqua/60 font-medium">Total</span>
                                <span className="text-xl font-bold text-sand-gold">
                                    ${selectedSlot.priceCop.toLocaleString('es-CO')} COP
                                </span>
                            </div>
                        </div>

                        {bookingError && (
                            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {bookingError}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setSelectedSlot(null); setBookingError(null); }}
                                className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-caribbean-aqua/60 font-medium hover:bg-white/5 transition-colors"
                            >
                                {isEn ? 'Cancel' : 'Cancelar'}
                            </button>
                            <button
                                onClick={handleProceedPayment}
                                disabled={isConfirming}
                                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-ocean-teal to-caribbean-aqua text-white font-bold hover:shadow-glow-ocean-teal transition-all disabled:opacity-60"
                            >
                                {isConfirming ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        {isEn ? 'Processing...' : 'Procesando...'}
                                    </span>
                                ) : t('proceedPayment')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
