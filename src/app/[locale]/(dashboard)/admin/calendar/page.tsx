'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface SlotRow {
    id: string;
    start_time: string;
    end_time: string;
    capacity: number;
    booked_count: number;
    is_cancelled: boolean;
    location: string;
    course: { id: string; title_es: string; title_en: string } | null;
    instructor: { id: string; full_name: string } | null;
}
interface InstructorOption { id: string; full_name: string; }
interface CourseOption { id: string; title_es: string; title_en: string; }

export default function AdminCalendarPage() {
    const locale = useLocale();
    const isEn = locale === 'en';

    const [slots, setSlots] = useState<SlotRow[]>([]);
    const [instructors, setInstructors] = useState<InstructorOption[]>([]);
    const [courses, setCourses] = useState<CourseOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formInstructor, setFormInstructor] = useState('');
    const [formCourse, setFormCourse] = useState('');
    const [formDate, setFormDate] = useState('');
    const [formStartTime, setFormStartTime] = useState('07:00');
    const [formEndTime, setFormEndTime] = useState('09:30');
    const [formCapacity, setFormCapacity] = useState('2');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        try {
            const [slotsRes, studentsRes] = await Promise.all([
                fetch('/api/admin/slots'),
                fetch('/api/admin/students'),
            ]);

            if (slotsRes.ok) setSlots(await slotsRes.json());

            if (studentsRes.ok) {
                const data = await studentsRes.json();
                setInstructors(data.instructors || []);
            }

            // Fetch courses
            // We'll use the supabase client directly since we need courses
            // For now, extract unique courses from slots
        } catch {
            // silently fail
        } finally {
            setLoading(false);
        }
    }

    // Fetch courses separately
    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await fetch('/api/admin/slots');
                if (res.ok) {
                    const data: SlotRow[] = await res.json();
                    const unique = new Map<string, CourseOption>();
                    data.forEach(s => {
                        if (s.course) unique.set(s.course.id, s.course);
                    });
                    if (unique.size > 0) setCourses(Array.from(unique.values()));
                }
            } catch {
                // silently fail
            }
        }
        fetchCourses();
    }, []);

    async function handleCreateSlot(e: React.FormEvent) {
        e.preventDefault();
        if (!formInstructor || !formCourse || !formDate) return;

        setCreating(true);
        try {
            const start_time = `${formDate}T${formStartTime}:00-05:00`;
            const end_time = `${formDate}T${formEndTime}:00-05:00`;

            const res = await fetch('/api/admin/slots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instructor_id: formInstructor,
                    course_id: formCourse,
                    start_time,
                    end_time,
                    capacity: Number(formCapacity) || 2,
                }),
            });

            if (res.ok) {
                const newSlot = await res.json();
                setSlots(prev => [newSlot, ...prev]);
                setShowForm(false);
                // Reset form
                setFormDate('');
                setFormStartTime('07:00');
                setFormEndTime('09:30');
            }
        } catch {
            // silently fail
        } finally {
            setCreating(false);
        }
    }

    async function handleCancelSlot(slotId: string) {
        try {
            const res = await fetch('/api/admin/slots', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: slotId, is_cancelled: true }),
            });
            if (res.ok) {
                setSlots(prev => prev.map(s => s.id === slotId ? { ...s, is_cancelled: true } : s));
            }
        } catch {
            // silently fail
        }
    }

    const activeSlots = slots.filter(s => !s.is_cancelled);
    const cancelledSlots = slots.filter(s => s.is_cancelled);

    if (loading) {
        return (
            <div className="p-4 md:p-8">
                <div className="h-8 bg-white/10 rounded w-64 mb-6 animate-pulse" />
                {[1, 2, 3].map(i => <div key={i} className="dark-card p-6 mb-3 animate-pulse"><div className="h-4 bg-white/10 rounded w-full" /></div>)}
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-5xl">
            {/* Header */}
            <motion.div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div>
                    <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white">
                        {isEn ? 'Class Calendar' : 'Calendario de Clases'}
                    </h1>
                    <p className="text-caribbean-aqua/60 mt-1">
                        {isEn ? `${activeSlots.length} active slots` : `${activeSlots.length} horarios activos`}
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ocean-teal to-caribbean-aqua text-white font-bold text-sm hover:shadow-glow-ocean-teal transition-all"
                >
                    {showForm ? (isEn ? 'Cancel' : 'Cancelar') : (isEn ? '+ New Slot' : '+ Nuevo Horario')}
                </button>
            </motion.div>

            {/* Create Form */}
            {showForm && (
                <motion.form
                    onSubmit={handleCreateSlot}
                    className="dark-card p-6 mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    <h3 className="font-heading font-bold text-salt-white mb-4">
                        {isEn ? 'Create New Slot' : 'Crear Nuevo Horario'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-caribbean-aqua/40 font-medium mb-1">{isEn ? 'Instructor' : 'Instructor'}</label>
                            <select value={formInstructor} onChange={e => setFormInstructor(e.target.value)} required className="dark-input w-full text-sm">
                                <option value="">{isEn ? 'Select...' : 'Seleccionar...'}</option>
                                {instructors.map(i => <option key={i.id} value={i.id}>{i.full_name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-caribbean-aqua/40 font-medium mb-1">{isEn ? 'Course' : 'Curso'}</label>
                            <select value={formCourse} onChange={e => setFormCourse(e.target.value)} required className="dark-input w-full text-sm">
                                <option value="">{isEn ? 'Select...' : 'Seleccionar...'}</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{isEn ? c.title_en : c.title_es}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-caribbean-aqua/40 font-medium mb-1">{isEn ? 'Date' : 'Fecha'}</label>
                            <input type="date" value={formDate} onChange={e => setFormDate(e.target.value)} required className="dark-input w-full text-sm" min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div>
                            <label className="block text-xs text-caribbean-aqua/40 font-medium mb-1">{isEn ? 'Start Time' : 'Hora Inicio'}</label>
                            <input type="time" value={formStartTime} onChange={e => setFormStartTime(e.target.value)} required className="dark-input w-full text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-caribbean-aqua/40 font-medium mb-1">{isEn ? 'End Time' : 'Hora Fin'}</label>
                            <input type="time" value={formEndTime} onChange={e => setFormEndTime(e.target.value)} required className="dark-input w-full text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs text-caribbean-aqua/40 font-medium mb-1">{isEn ? 'Capacity' : 'Capacidad'}</label>
                            <input type="number" value={formCapacity} onChange={e => setFormCapacity(e.target.value)} min="1" max="10" className="dark-input w-full text-sm" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={creating}
                        className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-ocean-teal to-caribbean-aqua text-white font-bold text-sm disabled:opacity-50"
                    >
                        {creating ? (isEn ? 'Creating...' : 'Creando...') : (isEn ? 'Create Slot' : 'Crear Horario')}
                    </button>
                </motion.form>
            )}

            {/* Active Slots */}
            <div className="space-y-2">
                {activeSlots.map((slot) => (
                    <div key={slot.id} className="dark-card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold text-salt-white">
                                    {new Date(slot.start_time).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })}
                                </span>
                                <span className="text-sm text-caribbean-aqua/60">
                                    {new Date(slot.start_time).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    {' – '}
                                    {new Date(slot.end_time).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-caribbean-aqua/40">
                                <span>{isEn ? slot.course?.title_en : slot.course?.title_es}</span>
                                <span>·</span>
                                <span>{slot.instructor?.full_name}</span>
                                <span>·</span>
                                <span className={slot.booked_count >= slot.capacity ? 'text-red-400' : 'text-green-400'}>
                                    {slot.booked_count}/{slot.capacity} {isEn ? 'booked' : 'reservados'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleCancelSlot(slot.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors"
                        >
                            {isEn ? 'Cancel' : 'Cancelar'}
                        </button>
                    </div>
                ))}

                {activeSlots.length === 0 && (
                    <div className="dark-card p-8 text-center text-caribbean-aqua/40">
                        {isEn ? 'No active slots. Create one above.' : 'No hay horarios activos. Crea uno arriba.'}
                    </div>
                )}
            </div>

            {/* Cancelled Slots */}
            {cancelledSlots.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-sm font-medium text-caribbean-aqua/30 mb-3">
                        {isEn ? 'Cancelled' : 'Cancelados'} ({cancelledSlots.length})
                    </h3>
                    <div className="space-y-2 opacity-50">
                        {cancelledSlots.slice(0, 5).map(slot => (
                            <div key={slot.id} className="dark-card p-3 flex items-center gap-3">
                                <span className="text-xs text-caribbean-aqua/30 line-through">
                                    {new Date(slot.start_time).toLocaleDateString(locale, { day: 'numeric', month: 'short' })}
                                    {' '}
                                    {new Date(slot.start_time).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    {' — '}
                                    {slot.instructor?.full_name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
