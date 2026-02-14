'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmapLevels } from '@/lib/roadmap-data';

interface Student {
    id: string;
    name: string;
    email: string;
    level: number;
    progress: number; // percentage
    joinedDate: string;
}

const mockStudents: Student[] = [
    { id: 'u1', name: 'María López', email: 'maria@email.com', level: 3, progress: 60, joinedDate: '2024-11-01' },
    { id: 'u2', name: 'Juan Pérez', email: 'juan@email.com', level: 2, progress: 80, joinedDate: '2024-12-15' },
    { id: 'u3', name: 'Ana García', email: 'ana@email.com', level: 1, progress: 40, joinedDate: '2025-01-05' },
    { id: 'u4', name: 'Carlos Ruiz', email: 'carlos@email.com', level: 4, progress: 30, joinedDate: '2024-09-20' },
    { id: 'u5', name: 'Laura Martínez', email: 'laura@email.com', level: 1, progress: 100, joinedDate: '2025-01-20' },
];

export default function AdminStudentsPage() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [students] = useState(mockStudents);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-night-tide">
                    {isEn ? 'Student Management' : 'Gestión de Estudiantes'}
                </h1>
                <p className="text-deep-marine-600 mt-1">
                    {isEn ? 'View and manage student progress' : 'Ver y gestionar el progreso de los estudiantes'}
                </p>
            </motion.div>

            {/* Students table */}
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
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Student' : 'Estudiante'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Level' : 'Nivel'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Progress' : 'Progreso'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Joined' : 'Registro'}</th>
                                <th className="px-5 py-3 text-left text-xs font-bold text-caribbean-aqua uppercase">{isEn ? 'Actions' : 'Acciones'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => {
                                const level = roadmapLevels.find((l) => l.level === student.level);
                                return (
                                    <tr key={student.id} className="border-t border-sand-100 hover:bg-salt-white transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-teal flex items-center justify-center text-white text-xs font-bold">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-night-tide">{student.name}</p>
                                                    <p className="text-xs text-caribbean-aqua">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="inline-flex items-center gap-1.5 text-sm">
                                                <span>{level?.icon}</span>
                                                <span className="text-night-tide font-medium">
                                                    {isEn ? `Level ${student.level}` : `Nivel ${student.level}`}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-salt-white rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-turquoise-500 to-deep-marine-500 rounded-full"
                                                        style={{ width: `${student.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-caribbean-aqua">{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-deep-marine-500 text-xs">
                                            {new Date(student.joinedDate).toLocaleDateString(locale)}
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                onClick={() => setSelectedStudent(student)}
                                                className="text-xs text-deep-marine-500 hover:text-deep-marine-700 font-medium bg-deep-marine-50 px-3 py-1 rounded-full"
                                            >
                                                {isEn ? 'Edit Progress' : 'Editar Progreso'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Student Progress Editor Modal */}
            <AnimatePresence>
                {selectedStudent && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedStudent(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-heading font-bold text-night-tide mb-1">
                                {selectedStudent.name}
                            </h2>
                            <p className="text-sm text-caribbean-aqua mb-6">{selectedStudent.email}</p>

                            {/* Road Map skills checklist */}
                            {roadmapLevels.map((level) => (
                                <div key={level.id} className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span>{level.icon}</span>
                                        <h3 className="font-medium text-night-tide text-sm">
                                            {isEn ? level.name_en : level.name_es}
                                        </h3>
                                    </div>
                                    <div className="space-y-1.5 pl-6">
                                        {level.skills.map((skill) => (
                                            <label key={skill.id} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={selectedStudent.level > level.level}
                                                    className="w-4 h-4 rounded border-salt-white text-deep-marine-500 focus:ring-caribbean-aqua"
                                                />
                                                <span className="text-xs text-deep-marine-500 group-hover:text-night-tide">
                                                    {isEn ? skill.name_en : skill.name_es}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Session notes */}
                            <div className="mt-4 pt-4 border-t border-salt-white">
                                <label className="block text-sm font-medium text-deep-marine-500 mb-1">
                                    {isEn ? 'Session Notes' : 'Notas de Sesión'}
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder={isEn ? 'Add notes about this student...' : 'Agregar notas sobre este estudiante...'}
                                    className="w-full px-4 py-2.5 rounded-xl border border-salt-white focus:ring-2 focus:ring-caribbean-aqua text-night-tide text-sm"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-salt-white text-deep-marine-600 font-medium"
                                >
                                    {isEn ? 'Cancel' : 'Cancelar'}
                                </button>
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-deep-marine-500 to-ocean-teal text-white font-bold"
                                >
                                    {isEn ? 'Save Progress' : 'Guardar Progreso'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
