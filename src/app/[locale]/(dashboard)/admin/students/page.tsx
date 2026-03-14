'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface Instructor {
    id: string;
    full_name: string;
}

interface AssignmentData {
    id: string;
    instructor_id: string;
    is_active: boolean;
    instructor: Instructor;
}

interface StudentData {
    id: string;
    full_name: string;
    phone: string | null;
    is_approved: boolean;
    created_at: string;
    instructor_assignments: AssignmentData[];
}

export default function AdminStudentsPage() {
    const locale = useLocale();
    const isEn = locale === 'en';

    const [students, setStudents] = useState<StudentData[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    async function fetchData() {
        try {
            const res = await fetch('/api/admin/students');
            if (res.ok) {
                const data = await res.json();
                setStudents(data.students || []);
                setInstructors(data.instructors || []);
            }
        } catch {
            // silently fail
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchData(); }, []);

    async function handleApprove(studentId: string) {
        setActionLoading(studentId);
        try {
            const res = await fetch(`/api/admin/students/${studentId}/approve`, { method: 'POST' });
            if (res.ok) {
                setStudents(prev => prev.map(s =>
                    s.id === studentId ? { ...s, is_approved: true } : s
                ));
            }
        } catch {
            // silently fail
        } finally {
            setActionLoading(null);
        }
    }

    async function handleAssignInstructor(studentId: string, instructorId: string) {
        setActionLoading(`assign-${studentId}`);
        try {
            const res = await fetch(`/api/admin/students/${studentId}/assign-instructor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instructor_id: instructorId }),
            });
            if (res.ok) {
                await fetchData(); // Refresh to get updated assignments
            }
        } catch {
            // silently fail
        } finally {
            setActionLoading(null);
        }
    }

    async function handleRemoveInstructor(studentId: string, instructorId: string) {
        setActionLoading(`remove-${studentId}-${instructorId}`);
        try {
            await fetch(`/api/admin/students/${studentId}/assign-instructor`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instructor_id: instructorId }),
            });
            await fetchData();
        } catch {
            // silently fail
        } finally {
            setActionLoading(null);
        }
    }

    if (loading) {
        return (
            <div className="p-4 md:p-8">
                <div className="mb-8">
                    <div className="h-8 bg-white/10 rounded w-64 mb-2 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-96 animate-pulse" />
                </div>
                {[1, 2, 3].map(i => (
                    <div key={i} className="dark-card p-6 mb-4 animate-pulse">
                        <div className="h-4 bg-white/10 rounded w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    const pendingStudents = students.filter(s => !s.is_approved);
    const approvedStudents = students.filter(s => s.is_approved);

    return (
        <div className="p-4 md:p-8 max-w-5xl">
            {/* Header */}
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white">
                    {isEn ? 'Student Management' : 'Gestión de Estudiantes'}
                </h1>
                <p className="text-caribbean-aqua/60 mt-1">
                    {isEn
                        ? `${students.length} students total · ${pendingStudents.length} pending approval`
                        : `${students.length} estudiantes · ${pendingStudents.length} pendientes de aprobación`
                    }
                </p>
            </motion.div>

            {/* Pending Approval Section */}
            {pendingStudents.length > 0 && (
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                >
                    <h2 className="font-heading font-bold text-sand-gold mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                        {isEn ? 'Pending Approval' : 'Pendientes de Aprobación'} ({pendingStudents.length})
                    </h2>
                    <div className="space-y-3">
                        {pendingStudents.map((student) => (
                            <div
                                key={student.id}
                                className="dark-card p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sand-gold to-ocean-teal flex items-center justify-center text-white font-bold">
                                        {(student.full_name || '?').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-salt-white">
                                            {student.full_name || (isEn ? 'No name' : 'Sin nombre')}
                                        </p>
                                        <p className="text-xs text-caribbean-aqua/50">
                                            {isEn ? 'Registered' : 'Registrado'}: {new Date(student.created_at).toLocaleDateString(locale)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleApprove(student.id)}
                                    disabled={actionLoading === student.id}
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-ocean-teal to-caribbean-aqua text-white font-bold text-sm hover:shadow-glow-ocean-teal transition-all disabled:opacity-50"
                                >
                                    {actionLoading === student.id
                                        ? (isEn ? 'Approving...' : 'Aprobando...')
                                        : (isEn ? 'Approve' : 'Aprobar')
                                    }
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Approved Students */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2 className="font-heading font-bold text-salt-white mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    {isEn ? 'Active Students' : 'Estudiantes Activos'} ({approvedStudents.length})
                </h2>
                <div className="space-y-3">
                    {approvedStudents.map((student) => {
                        const activeAssignments = (student.instructor_assignments || []).filter(a => a.is_active);
                        const assignedIds = activeAssignments.map(a => a.instructor_id);
                        const availableInstructors = instructors.filter(i => !assignedIds.includes(i.id));

                        return (
                            <div key={student.id} className="dark-card p-5">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center text-white font-bold">
                                            {(student.full_name || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-salt-white">
                                                {student.full_name || (isEn ? 'No name' : 'Sin nombre')}
                                            </p>
                                            {student.phone && (
                                                <p className="text-xs text-caribbean-aqua/50">{student.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                                        {isEn ? 'Approved' : 'Aprobado'}
                                    </span>
                                </div>

                                {/* Instructor Assignments */}
                                <div className="pl-13 sm:pl-[52px]">
                                    <p className="text-xs text-caribbean-aqua/40 mb-2 font-medium uppercase tracking-wider">
                                        {isEn ? 'Assigned Instructors' : 'Instructores Asignados'}
                                    </p>

                                    {/* Current assignments */}
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {activeAssignments.map((assignment) => (
                                            <span
                                                key={assignment.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ocean-teal/10 border border-ocean-teal/20 text-ocean-teal text-xs font-medium"
                                            >
                                                {assignment.instructor?.full_name || 'Unknown'}
                                                <button
                                                    onClick={() => handleRemoveInstructor(student.id, assignment.instructor_id)}
                                                    className="hover:text-red-400 transition-colors ml-1"
                                                    title={isEn ? 'Remove' : 'Quitar'}
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </span>
                                        ))}
                                        {activeAssignments.length === 0 && (
                                            <span className="text-xs text-caribbean-aqua/30 italic">
                                                {isEn ? 'No instructors assigned' : 'Sin instructores asignados'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Add instructor dropdown */}
                                    {availableInstructors.length > 0 && (
                                        <select
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    handleAssignInstructor(student.id, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                            disabled={actionLoading === `assign-${student.id}`}
                                            className="dark-input text-xs py-1.5 px-3 w-auto"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                {actionLoading === `assign-${student.id}`
                                                    ? (isEn ? 'Assigning...' : 'Asignando...')
                                                    : (isEn ? '+ Add instructor' : '+ Agregar instructor')
                                                }
                                            </option>
                                            {availableInstructors.map((inst) => (
                                                <option key={inst.id} value={inst.id}>{inst.full_name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {approvedStudents.length === 0 && (
                        <div className="dark-card p-8 text-center text-caribbean-aqua/40">
                            {isEn ? 'No approved students yet' : 'No hay estudiantes aprobados aún'}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
