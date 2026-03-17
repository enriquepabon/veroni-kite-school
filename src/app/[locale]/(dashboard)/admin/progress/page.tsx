'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { roadmapLevels } from '@/lib/roadmap-data';

interface Student {
    id: string;
    full_name: string;
    avatar_url: string | null;
    is_approved: boolean;
}

interface ProgressRecord {
    id: string;
    user_id: string;
    skill_id: string;
    level: number;
    status: 'locked' | 'in-progress' | 'completed';
    instructor_notes: string | null;
    last_updated: string;
}

export default function AdminProgressPage() {
    const locale = useLocale();
    const isEn = locale === 'en';

    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [progress, setProgress] = useState<Record<string, ProgressRecord>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch approved students
    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/admin/students');
                if (res.ok) {
                    const data = await res.json();
                    const approved = (data.students || []).filter((s: Student) => s.is_approved);
                    setStudents(approved);
                    if (approved.length > 0) {
                        setSelectedStudent(approved[0].id);
                    }
                }
            } catch {
                setError('Error loading students');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Fetch progress when student changes
    useEffect(() => {
        if (!selectedStudent) return;
        async function loadProgress() {
            try {
                const res = await fetch(`/api/progress?studentId=${selectedStudent}`);
                if (res.ok) {
                    const data = await res.json();
                    const mapped: Record<string, ProgressRecord> = {};
                    (data.progress || []).forEach((p: ProgressRecord) => {
                        mapped[p.skill_id] = p;
                    });
                    setProgress(mapped);
                }
            } catch {
                setProgress({});
            }
        }
        loadProgress();
    }, [selectedStudent]);

    async function toggleSkill(skillId: string, level: number) {
        if (!selectedStudent) return;
        const current = progress[skillId];
        const currentStatus = current?.status || 'locked';

        // Cycle: locked → in-progress → completed → locked
        const nextStatus = currentStatus === 'locked' ? 'in-progress'
            : currentStatus === 'in-progress' ? 'completed'
            : 'locked';

        setSaving(skillId);
        setError(null);

        try {
            const res = await fetch('/api/progress', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: selectedStudent,
                    skillId,
                    level,
                    status: nextStatus,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setProgress(prev => ({
                    ...prev,
                    [skillId]: data.data,
                }));
            } else {
                setError(`Error: ${data.error}`);
            }
        } catch {
            setError('Error updating progress');
        } finally {
            setSaving(null);
        }
    }

    function getSkillStatus(skillId: string): string {
        return progress[skillId]?.status || 'locked';
    }

    const selectedStudentData = students.find(s => s.id === selectedStudent);

    if (loading) {
        return (
            <div className="p-4 md:p-8">
                <div className="h-8 bg-white/10 rounded w-64 mb-4 animate-pulse" />
                <div className="h-12 bg-white/5 rounded w-full mb-6 animate-pulse" />
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-white/5 rounded mb-3 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-5xl">
            {/* Header */}
            <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white">
                    {isEn ? 'Student Progress' : 'Progreso de Estudiantes'}
                </h1>
                <p className="text-caribbean-aqua/60 mt-1">
                    {isEn
                        ? 'Click skills to cycle: Locked → In Progress → Completed'
                        : 'Haz clic en las habilidades: Bloqueado → En Progreso → Completado'}
                </p>
            </motion.div>

            {/* Error */}
            {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Student selector */}
            {students.length === 0 ? (
                <div className="dark-card p-8 text-center text-caribbean-aqua/40">
                    {isEn ? 'No approved students yet' : 'No hay estudiantes aprobados aún'}
                </div>
            ) : (
                <>
                    <div className="mb-6 flex flex-wrap gap-2">
                        {students.map(student => (
                            <button
                                key={student.id}
                                onClick={() => setSelectedStudent(student.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                    selectedStudent === student.id
                                        ? 'bg-ocean-teal/20 text-ocean-teal border border-ocean-teal/30'
                                        : 'bg-white/5 text-caribbean-aqua/60 border border-white/5 hover:bg-white/10'
                                }`}
                            >
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-ocean-teal to-caribbean-aqua flex items-center justify-center text-white text-xs font-bold">
                                    {(student.full_name || '?').charAt(0).toUpperCase()}
                                </div>
                                {student.full_name}
                            </button>
                        ))}
                    </div>

                    {/* Roadmap levels */}
                    {selectedStudentData && (
                        <div className="space-y-4">
                            {roadmapLevels.map(level => {
                                const completedCount = level.skills.filter(s => getSkillStatus(s.id) === 'completed').length;
                                const progressPct = Math.round((completedCount / level.skills.length) * 100);
                                const name = isEn ? level.name_en : level.name_es;

                                return (
                                    <motion.div
                                        key={level.id}
                                        className="rounded-2xl border border-white/5 bg-surface-card/80 overflow-hidden"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {/* Level header */}
                                        <div className="p-4 flex items-center gap-3">
                                            <span className="text-xl">{level.icon}</span>
                                            <div className="flex-1">
                                                <h3 className="font-heading font-bold text-salt-white text-sm">
                                                    {name}
                                                </h3>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-500"
                                                            style={{ width: `${progressPct}%`, backgroundColor: level.color }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-caribbean-aqua/60 tabular-nums">
                                                        {completedCount}/{level.skills.length}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="px-4 pb-4 grid gap-2">
                                            {level.skills.map(skill => {
                                                const status = getSkillStatus(skill.id);
                                                const isSaving = saving === skill.id;
                                                const skillName = isEn ? skill.name_en : skill.name_es;

                                                return (
                                                    <button
                                                        key={skill.id}
                                                        onClick={() => toggleSkill(skill.id, level.level)}
                                                        disabled={isSaving}
                                                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 ${
                                                            status === 'completed'
                                                                ? 'bg-green-500/10 border-green-500/20'
                                                                : status === 'in-progress'
                                                                ? 'bg-ocean-teal/10 border-ocean-teal/20'
                                                                : 'bg-white/[0.02] border-white/5 opacity-70 hover:opacity-100'
                                                        }`}
                                                    >
                                                        {/* Status icon */}
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                                                            status === 'completed'
                                                                ? 'border-green-400 bg-green-400'
                                                                : status === 'in-progress'
                                                                ? 'border-ocean-teal bg-ocean-teal/30'
                                                                : 'border-white/20'
                                                        }">
                                                            {isSaving ? (
                                                                <svg className="w-3 h-3 text-white animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                                                                    <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M7.76 7.76L4.93 4.93" />
                                                                </svg>
                                                            ) : status === 'completed' ? (
                                                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                                </svg>
                                                            ) : status === 'in-progress' ? (
                                                                <div className="w-2 h-2 rounded-full bg-ocean-teal" />
                                                            ) : null}
                                                        </span>

                                                        <span className={`flex-1 text-sm font-medium ${
                                                            status === 'completed' ? 'text-green-400' :
                                                            status === 'in-progress' ? 'text-ocean-teal' :
                                                            'text-caribbean-aqua/50'
                                                        }`}>
                                                            {skillName}
                                                        </span>

                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                            status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                            status === 'in-progress' ? 'bg-ocean-teal/20 text-ocean-teal' :
                                                            'bg-white/5 text-caribbean-aqua/30'
                                                        }`}>
                                                            {status === 'completed' ? (isEn ? 'Done' : 'Hecho') :
                                                             status === 'in-progress' ? (isEn ? 'In Progress' : 'En Progreso') :
                                                             (isEn ? 'Locked' : 'Bloqueado')}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
