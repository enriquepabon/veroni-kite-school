'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlot {
    id: string;
    courseId: string;
    courseName: string;
    instructor: string;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    maxStudents: number;
    bookedCount: number;
    priceCop: number;
    level: string;
}

// Mock slots — will be fetched from Supabase
const generateMockSlots = (): TimeSlot[] => {
    const today = new Date();
    const slots: TimeSlot[] = [];
    const courses = [
        { id: 'c1', name: 'Discovery Kite', instructor: 'Carlos Veroni', priceCop: 350000, level: 'Descubrimiento', maxStudents: 4 },
        { id: 'c2', name: 'Kite Control', instructor: 'Ana García', priceCop: 650000, level: 'Control de Kite', maxStudents: 3 },
        { id: 'c3', name: 'Waterstart Intensive', instructor: 'Carlos Veroni', priceCop: 950000, level: 'Waterstart', maxStudents: 2 },
    ];

    for (let dayOffset = 1; dayOffset <= 30; dayOffset++) {
        const date = new Date(today);
        date.setDate(date.getDate() + dayOffset);
        const dateStr = date.toISOString().split('T')[0];

        // Add 1-3 slots per day
        const numSlots = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numSlots; i++) {
            const course = courses[i % courses.length];
            const hour = 7 + i * 3; // 7AM, 10AM, 1PM
            slots.push({
                id: `slot-${dateStr}-${i}`,
                courseId: course.id,
                courseName: course.name,
                instructor: course.instructor,
                date: dateStr,
                startTime: `${String(hour).padStart(2, '0')}:00`,
                endTime: `${String(hour + 2).padStart(2, '0')}:30`,
                maxStudents: course.maxStudents,
                bookedCount: Math.floor(Math.random() * course.maxStudents),
                priceCop: course.priceCop,
                level: course.level,
            });
        }
    }
    return slots;
};

const WEEKDAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface BookingCalendarProps {
    onSlotSelect?: (slot: TimeSlot) => void;
}

export default function BookingCalendar({ onSlotSelect }: BookingCalendarProps) {
    const locale = useLocale();
    const t = useTranslations('booking');
    const isEn = locale === 'en';
    const weekdays = isEn ? WEEKDAYS_EN : WEEKDAYS_ES;
    const months = isEn ? MONTHS_EN : MONTHS_ES;

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [slots] = useState<TimeSlot[]>(generateMockSlots);

    // Calendar helpers
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = (firstDay.getDay() + 6) % 7; // Monday=0
    const daysInMonth = lastDay.getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
        return slots.filter((s) => s.date === dateStr);
    }

    const selectedSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-4 md:p-6">
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-salt-white rounded-xl transition-colors"
                        aria-label="Previous month"
                    >
                        <svg className="w-5 h-5 text-deep-marine-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-heading font-bold text-night-tide">
                        {months[month]} {year}
                    </h2>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-salt-white rounded-xl transition-colors"
                        aria-label="Next month"
                    >
                        <svg className="w-5 h-5 text-deep-marine-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekdays.map((day) => (
                        <div key={day} className="text-center text-xs font-bold text-caribbean-aqua uppercase py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for offset */}
                    {Array.from({ length: startWeekday }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {/* Day cells */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = getDateStr(day);
                        const dayDate = new Date(year, month, day);
                        const isPast = dayDate < today;
                        const daySlots = getSlotsForDate(dateStr);
                        const hasSlots = daySlots.length > 0;
                        const isSelected = selectedDate === dateStr;
                        const availableSlots = daySlots.filter(
                            (s) => s.bookedCount < s.maxStudents
                        );
                        const allFull = hasSlots && availableSlots.length === 0;

                        return (
                            <button
                                key={day}
                                onClick={() => {
                                    if (!isPast && hasSlots) setSelectedDate(dateStr);
                                }}
                                disabled={isPast || !hasSlots}
                                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all duration-200 ${isSelected
                                        ? 'bg-deep-marine-500 text-white shadow-lg scale-105'
                                        : isPast
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : allFull
                                                ? 'bg-red-50 text-red-400 cursor-not-allowed'
                                                : hasSlots
                                                    ? 'bg-ocean-teal-50 text-night-tide hover:bg-ocean-teal-100 cursor-pointer'
                                                    : 'text-night-tide/40'
                                    }`}
                            >
                                <span className="font-medium">{day}</span>
                                {hasSlots && !isPast && (
                                    <div className="flex gap-0.5 mt-0.5">
                                        {availableSlots.length > 0 ? (
                                            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-ocean-teal'}`} />
                                        ) : (
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                        )}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-salt-white text-xs text-deep-marine-500">
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-ocean-teal" />
                        {isEn ? 'Available' : 'Disponible'}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400" />
                        {isEn ? 'Full' : 'Lleno'}
                    </div>
                </div>
            </div>

            {/* Slot list (sidebar) */}
            <div className="bg-white rounded-2xl shadow-card p-4 md:p-6">
                <h3 className="font-heading font-bold text-night-tide mb-4">
                    {t('availableSlots')}
                </h3>

                <AnimatePresence mode="wait">
                    {selectedDate && selectedSlots.length > 0 ? (
                        <motion.div
                            key={selectedDate}
                            className="space-y-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="text-sm text-deep-marine-500 mb-3">
                                {new Date(selectedDate + 'T12:00:00').toLocaleDateString(locale, {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                })}
                            </p>

                            {selectedSlots.map((slot) => {
                                const available = slot.maxStudents - slot.bookedCount;
                                const isFull = available <= 0;

                                return (
                                    <div
                                        key={slot.id}
                                        className={`p-4 rounded-xl border transition-all duration-200 ${isFull
                                                ? 'border-red-200 bg-red-50 opacity-60'
                                                : 'border-salt-white hover:border-caribbean-aqua hover:shadow-md cursor-pointer'
                                            }`}
                                        onClick={() => {
                                            if (!isFull && onSlotSelect) onSlotSelect(slot);
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-night-tide">
                                                {slot.startTime} – {slot.endTime}
                                            </span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isFull
                                                    ? 'bg-red-100 text-red-600'
                                                    : available <= 1
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                {isFull
                                                    ? (isEn ? 'Full' : 'Lleno')
                                                    : `${available} ${t('spotsLeft')}`}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-night-tide">{slot.courseName}</p>
                                        <p className="text-xs text-deep-marine-500 mt-0.5">
                                            {t('instructor')}: {slot.instructor}
                                        </p>
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-lg font-bold text-night-tide">
                                                ${(slot.priceCop).toLocaleString('es-CO')} COP
                                            </span>
                                            {!isFull && (
                                                <span className="text-xs font-bold text-deep-marine-500 bg-deep-marine-50 px-3 py-1 rounded-full">
                                                    {t('bookSlot')} →
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.p
                            className="text-sm text-caribbean-aqua text-center py-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {isEn
                                ? 'Select a highlighted day on the calendar to see available slots'
                                : 'Selecciona un día resaltado en el calendario para ver horarios'}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
