'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmapLevels } from '@/lib/roadmap-data';

type SkillStatus = 'completed' | 'in_progress' | 'locked';

interface SkillProgress {
    skill_id: string;
    status: SkillStatus;
    completed_at: string | null;
    validated_by_name: string | null;
}

interface ActiveRoadMapProps {
    /** Student progress keyed by skill_id */
    progress?: Record<string, SkillProgress>;
    /** Current student level (1-6) */
    currentLevel?: number;
}

/**
 * ActiveRoadMap — Student dashboard view of their kitesurf progression.
 * Skills are read-only (only instructors can mark completions).
 * Shows ✅ Completed, 🔄 In Progress, 🔒 Locked states.
 */
export default function ActiveRoadMap({ progress = {}, currentLevel = 1 }: ActiveRoadMapProps) {
    const locale = useLocale();
    const t = useTranslations('roadmap');
    const isEn = locale === 'en';
    const [expandedLevel, setExpandedLevel] = useState<string | null>(
        roadmapLevels.find((l) => l.level === currentLevel)?.id ?? roadmapLevels[0].id
    );

    function getLevelStatus(level: typeof roadmapLevels[0]): SkillStatus {
        const skillStatuses = level.skills.map(
            (s) => progress[s.id]?.status ?? 'locked'
        );
        if (skillStatuses.every((s) => s === 'completed')) return 'completed';
        if (skillStatuses.some((s) => s === 'in_progress' || s === 'completed')) return 'in_progress';
        return 'locked';
    }

    function getSkillStatus(skillId: string): SkillStatus {
        return progress[skillId]?.status ?? 'locked';
    }

    const statusConfig: Record<SkillStatus, { badge: string; badgeClass: string; bgClass: string }> = {
        completed: {
            badge: t('completed'),
            badgeClass: 'bg-green-100 text-green-700',
            bgClass: 'bg-green-50 border-green-200',
        },
        in_progress: {
            badge: t('inProgress'),
            badgeClass: 'bg-deep-marine-100 text-deep-marine-700',
            bgClass: 'bg-deep-marine-50 border-deep-marine-200',
        },
        locked: {
            badge: t('locked'),
            badgeClass: 'bg-gray-100 text-gray-400',
            bgClass: 'bg-gray-50 border-gray-200 opacity-60',
        },
    };

    return (
        <div className="space-y-4">
            {roadmapLevels.map((level) => {
                const levelStatus = getLevelStatus(level);
                const isExpanded = expandedLevel === level.id;
                const completedSkills = level.skills.filter(
                    (s) => getSkillStatus(s.id) === 'completed'
                ).length;
                const totalSkills = level.skills.length;
                const progressPct = Math.round((completedSkills / totalSkills) * 100);
                const name = isEn ? level.name_en : level.name_es;

                return (
                    <motion.div
                        key={level.id}
                        className="rounded-2xl border border-salt-white bg-white shadow-card overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Level header */}
                        <button
                            onClick={() => setExpandedLevel(isExpanded ? null : level.id)}
                            className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-salt-white transition-colors duration-200"
                        >
                            {/* Icon circle */}
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm ${levelStatus === 'locked' ? 'grayscale opacity-50' : ''
                                    }`}
                                style={{ backgroundColor: level.color + '22' }}
                            >
                                {levelStatus === 'completed' ? '✅' : levelStatus === 'in_progress' ? level.icon : '🔒'}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusConfig[levelStatus].badgeClass}`}>
                                        {statusConfig[levelStatus].badge}
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-night-tide truncate">
                                    {level.icon} {name}
                                </h3>
                                {/* Progress bar */}
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-salt-white rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: level.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPct}%` }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        />
                                    </div>
                                    <span className="text-xs text-deep-marine-500 font-medium tabular-nums">
                                        {completedSkills}/{totalSkills}
                                    </span>
                                </div>
                            </div>

                            {/* Chevron */}
                            <motion.svg
                                className="w-5 h-5 text-caribbean-aqua flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </motion.svg>
                        </button>

                        {/* Skills accordion */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2 border-t border-salt-white pt-3">
                                        {level.skills.map((skill) => {
                                            const status = getSkillStatus(skill.id);
                                            const skillProgress = progress[skill.id];
                                            const config = statusConfig[status];
                                            const skillName = isEn ? skill.name_en : skill.name_es;

                                            return (
                                                <div
                                                    key={skill.id}
                                                    className={`flex items-start gap-3 p-3 rounded-xl border ${config.bgClass} transition-opacity duration-300`}
                                                >
                                                    {/* Status icon */}
                                                    <span className="text-lg mt-0.5 flex-shrink-0">
                                                        {status === 'completed' && '✅'}
                                                        {status === 'in_progress' && '🔄'}
                                                        {status === 'locked' && '🔒'}
                                                    </span>

                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm text-night-tide">
                                                            {skillName}
                                                        </p>
                                                        {status === 'completed' && skillProgress?.completed_at && (
                                                            <p className="text-xs text-green-600 mt-0.5">
                                                                {t('completedOn')} {new Date(skillProgress.completed_at).toLocaleDateString(locale)}
                                                                {skillProgress.validated_by_name && (
                                                                    <> · {t('validatedBy')} {skillProgress.validated_by_name}</>
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badgeClass} flex-shrink-0`}>
                                                        {config.badge}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
