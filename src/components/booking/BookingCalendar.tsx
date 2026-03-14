'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface SlotData {
    id: string;
    start_time: string;
    end_time: string;
    capacity: number;
    booked_count: number;
    location: string;
    course: {
        id: string;
        title_es: string;
        title_en: string;
        price_cop: number;
        level_required: number;
    };
    instructor: {
        id: string;
        full_name: string;
    };
}

export interface SelectedSlot {
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

const WEEKDAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface BookingCalendarProps {
    onSlotSelect?: (slot: SelectedSlot) => void;
    instructorId?: string | null;
}

export default function BookingCalendar({ onSlotSelect, instructorId }: BookingCalendarProps) {
    const locale = useLocale();
    const t = useTranslations('booking');
    const isEn = locale === 'en';
    const weekdays = isEn ? WEEKDAYS_EN : WEEKDAYS_ES;
    const months = isEn ? MONTHS_EN : MONTHS_ES;

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [slots, setSlots] = useState<SlotData[]>([]);
    const [loading, setLoading] = useState(false);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;

    const fetchSlots = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ month: monthStr });
            if (instructorId) params.set('instructor_id', instructorId);

            const res = await fetch(`/api/slots?${params}`);
            if (res.ok) {
                setSlots(await res.json());
            }
        } catch {
            // silently fail
        } finally {
            setLoading(false);
        }
    }, [monthStr, instructorId]);

    useEffect(() => { fetchSlots(); }, [fetchSlots]);

    function prevMonth() {
        setCurrentMonth(new Date(year, month - 1, 1));
        setSelectedDate(null);
    }
    function nextMonth() {
        setCurrentMonth(new Date(year, month + 1, 1));
        setSelectedDate(null);
    }
    function getDateStr(day: number) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    function getSlotsForDate(dateStr: string) {
        return slots.filter((s) => s.start_time.startsWith(dateStr));
    }
    function formatTime(isoStr: string) {
        return new Date(isoStr).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    function slotToSelected(slot: SlotData): SelectedSlot {
        return {
            id: slot.id,
            courseId: slot.course.id,
            courseName: isEn ? slot.course.title_en : slot.course.title_es,
            instructor: slot.instructor.full_name,
            date: slot.start_time.split('T')[0],
            startTime: formatTime(slot.start_time),
            endTime: formatTime(slot.end_time),
            maxStudents: slot.capacity,
            bookedCount: slot.booked_count,
            priceCop: slot.course.price_cop,
            level: `Level ${slot.course.level_required}`,
        };
    }

    const selectedSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2 dark-card p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-xl transition-colors" aria-label="Previous month">
                        <svg className="w-5 h-5 text-caribbean-aqua/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-heading font-bold text-salt-white">
                        {months[month]} {year}
                        {loading && <span className="ml-2 inline-block w-4 h-4 border-2 border-ocean-teal border-t-transparent rounded-full animate-spin align-middle" />}
                    </h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-xl transition-colors" aria-label="Next month">
                        <svg className="w-5 h-5 text-caribbean-aqua/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekdays.map((day) => (
                        <div key={day} className="text-center text-xs font-bold text-ocean-teal uppercase py-2">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startWeekday }).map((_, i) => <div key={`empty-${i}`} className="aspect-square" />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = getDateStr(day);
                        const dayDate = new Date(year, month, day);
                        const isPast = dayDate < today;
                        const daySlots = getSlotsForDate(dateStr);
                        const hasSlots = daySlots.length > 0;
                        const isSelected = selectedDate === dateStr;
                        const availableSlots = daySlots.filter((s) => s.booked_count < s.capacity);
                        const allFull = hasSlots && availableSlots.length === 0;

                        return (
                            <button
                                key={day}
                                onClick={() => { if (!isPast && hasSlots) setSelectedDate(dateStr); }}
                                disabled={isPast || !hasSlots}
                                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all duration-200 ${
                                    isSelected ? 'bg-ocean-teal text-white shadow-glow-ocean-teal scale-105'
                                    : isPast ? 'text-caribbean-aqua/20 cursor-not-allowed'
                                    : allFull ? 'bg-red-500/10 text-red-400/60 cursor-not-allowed'
                                    : hasSlots ? 'bg-ocean-teal/10 text-salt-white hover:bg-ocean-teal/20 cursor-pointer'
                                    : 'text-caribbean-aqua/30'
                                }`}
                            >
                                <span className="font-medium">{day}</span>
                                {hasSlots && !isPast && (
                                    <div className="flex gap-0.5 mt-0.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${availableSlots.length > 0 ? (isSelected ? 'bg-white' : 'bg-ocean-teal') : 'bg-red-400'}`} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-caribbean-aqua/60">
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-ocean-teal" />{isEn ? 'Available' : 'Disponible'}</div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400" />{isEn ? 'Full' : 'Lleno'}</div>
                </div>
            </div>

            {/* Slot list */}
            <div className="dark-card p-4 md:p-6">
                <h3 className="font-heading font-bold text-salt-white mb-4">{t('availableSlots')}</h3>
                <AnimatePresence mode="wait">
                    {selectedDate && selectedSlots.length > 0 ? (
                        <motion.div key={selectedDate} className="space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                            <p className="text-sm text-caribbean-aqua/60 mb-3">
                                {new Date(selectedDate + 'T12:00:00').toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                            {selectedSlots.map((slot) => {
                                const available = slot.capacity - slot.booked_count;
                                const isFull = available <= 0;
                                return (
                                    <div
                                        key={slot.id}
                                        className={`p-4 rounded-xl border transition-all duration-200 ${isFull ? 'border-red-500/20 bg-red-500/5 opacity-60' : 'border-white/5 bg-white/[0.03] hover:border-ocean-teal/30 hover:bg-ocean-teal/5 cursor-pointer'}`}
                                        onClick={() => { if (!isFull && onSlotSelect) onSlotSelect(slotToSelected(slot)); }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-salt-white">{formatTime(slot.start_time)} – {formatTime(slot.end_time)}</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isFull ? 'bg-red-500/20 text-red-400' : available <= 1 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                                {isFull ? (isEn ? 'Full' : 'Lleno') : `${available} ${t('spotsLeft')}`}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-salt-white">{isEn ? slot.course.title_en : slot.course.title_es}</p>
                                        <p className="text-xs text-caribbean-aqua/40 mt-0.5">{t('instructor')}: {slot.instructor.full_name}</p>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-lg font-bold text-sand-gold">${slot.course.price_cop.toLocaleString('es-CO')} COP</span>
                                            {!isFull && <span className="text-xs font-bold text-ocean-teal bg-ocean-teal/10 px-3 py-1 rounded-full">{t('bookSlot')} →</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.p className="text-sm text-caribbean-aqua/40 text-center py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {slots.length === 0 && !loading
                                ? (isEn ? 'No slots available this month' : 'No hay horarios disponibles este mes')
                                : (isEn ? 'Select a highlighted day on the calendar to see available slots' : 'Selecciona un día resaltado en el calendario para ver horarios')
                            }
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
