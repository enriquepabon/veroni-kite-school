'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface SlotForm {
    date: string;
    startTime: string;
    endTime: string;
    courseId: string;
    instructor: string;
    maxStudents: number;
}

const courses = [
    { id: 'c1', name: 'Discovery Kite' },
    { id: 'c2', name: 'Kite Control' },
    { id: 'c3', name: 'Waterstart Intensive' },
    { id: 'c4', name: 'Independent Rider' },
];

const instructors = ['Carlos Veroni', 'Ana García', 'Marco Torres'];

// Mock existing slots
const mockSlots = [
    { id: 's1', date: '2025-02-16', startTime: '07:00', endTime: '09:30', course: 'Discovery Kite', instructor: 'Carlos Veroni', maxStudents: 4, bookedCount: 2 },
    { id: 's2', date: '2025-02-16', startTime: '10:00', endTime: '12:30', course: 'Kite Control', instructor: 'Ana García', maxStudents: 3, bookedCount: 3 },
    { id: 's3', date: '2025-02-17', startTime: '07:00', endTime: '09:30', course: 'Waterstart Intensive', instructor: 'Carlos Veroni', maxStudents: 2, bookedCount: 0 },
];

export default function AdminCalendarPage() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [slots] = useState(mockSlots);
    const [newSlot, setNewSlot] = useState<SlotForm>({
        date: '',
        startTime: '07:00',
        endTime: '09:30',
        courseId: 'c1',
        instructor: 'Carlos Veroni',
        maxStudents: 4,
    });

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide">
                        {isEn ? 'Calendar Management' : 'Gestión de Calendario'}
                    </h1>
                    <p className="text-deep-marine-600 mt-1">
                        {isEn ? 'Create, edit and manage class slots' : 'Crear, editar y gestionar slots de clases'}
                    </p>
                </motion.div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold text-sm hover:shadow-lg transition-all"
                >
                    + {isEn ? 'New Slot' : 'Nuevo Slot'}
                </button>
            </div>

            {/* Slots table */}
            <motion.div
                className="bg-white rounded-2xl shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-salt-white">
                            <tr>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Date' : 'Fecha'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Time' : 'Hora'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Course' : 'Curso'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Instructor' : 'Instructor'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Capacity' : 'Capacidad'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Actions' : 'Acciones'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slots.map((slot) => (
                                <tr key={slot.id} className="border-t border-sand-100 hover:bg-salt-white transition-colors">
                                    <td className="px-5 py-3 text-night-tide font-medium">
                                        {new Date(slot.date + 'T12:00:00').toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })}
                                    </td>
                                    <td className="px-5 py-3 text-deep-marine-500">{slot.startTime} – {slot.endTime}</td>
                                    <td className="px-5 py-3 text-deep-marine-500">{slot.course}</td>
                                    <td className="px-5 py-3 text-deep-marine-500">{slot.instructor}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${slot.bookedCount >= slot.maxStudents
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-green-100 text-green-700'
                                            }`}>
                                            {slot.bookedCount}/{slot.maxStudents}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <button className="text-xs text-deep-marine-500 hover:text-deep-marine-700 font-medium">
                                                {isEn ? 'Edit' : 'Editar'}
                                            </button>
                                            <button className="text-xs text-red-500 hover:text-red-700 font-medium">
                                                {isEn ? 'Cancel' : 'Cancelar'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Create slot modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-heading font-bold text-night-tide mb-6">
                                {isEn ? 'Create New Slot' : 'Crear Nuevo Slot'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">{isEn ? 'Date' : 'Fecha'}</label>
                                    <input
                                        type="date"
                                        value={newSlot.date}
                                        onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-deep-marine-500 mb-1">{isEn ? 'Start' : 'Inicio'}</label>
                                        <input
                                            type="time"
                                            value={newSlot.startTime}
                                            onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-deep-marine-500 mb-1">{isEn ? 'End' : 'Fin'}</label>
                                        <input
                                            type="time"
                                            value={newSlot.endTime}
                                            onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">{isEn ? 'Course' : 'Curso'}</label>
                                    <select
                                        value={newSlot.courseId}
                                        onChange={(e) => setNewSlot({ ...newSlot, courseId: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    >
                                        {courses.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">{isEn ? 'Instructor' : 'Instructor'}</label>
                                    <select
                                        value={newSlot.instructor}
                                        onChange={(e) => setNewSlot({ ...newSlot, instructor: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    >
                                        {instructors.map((i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-deep-marine-500 mb-1">{isEn ? 'Max Students' : 'Máx. Estudiantes'}</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={newSlot.maxStudents}
                                        onChange={(e) => setNewSlot({ ...newSlot, maxStudents: parseInt(e.target.value) })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-salt-white text-deep-marine-600 font-medium hover:bg-salt-white"
                                >
                                    {isEn ? 'Cancel' : 'Cancelar'}
                                </button>
                                <button
                                    onClick={() => {
                                        // Would POST to /api/admin/slots
                                        setShowCreateModal(false);
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold hover:shadow-lg"
                                >
                                    {isEn ? 'Create Slot' : 'Crear Slot'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
