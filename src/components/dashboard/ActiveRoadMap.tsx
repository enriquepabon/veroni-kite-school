'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmapLevels } from '@/lib/roadmap-data';
import { BorderBeam } from '@/components/ui/border-beam';

type SkillStatus = 'completed' | 'in_progress' | 'locked';

interface SkillProgress {
    skill_id: string;
    status: SkillStatus;
    completed_at: string | null;
    validated_by_name: string | null;
}

interface ActiveRoadMapProps {
    progress?: Record<string, SkillProgress>;
    currentLevel?: number;
}

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
            badgeClass: 'bg-green-500/20 text-green-400',
            bgClass: 'bg-green-500/5 border-green-500/20',
        },
        in_progress: {
            badge: t('inProgress'),
            badgeClass: 'bg-ocean-teal/20 text-ocean-teal',
            bgClass: 'bg-ocean-teal/5 border-ocean-teal/20',
        },
        locked: {
            badge: t('locked'),
            badgeClass: 'bg-white/5 text-caribbean-aqua/40',
            bgClass: 'bg-white/[0.02] border-white/5 opacity-60',
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
                const isCurrentLevel = levelStatus === 'in_progress';

                return (
                    <motion.div
                        key={level.id}
                        className="rounded-2xl border border-white/5 bg-surface-card/80 backdrop-blur-sm overflow-hidden relative"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isCurrentLevel && <BorderBeam duration={8} colorFrom="#2A9D8F" colorTo="#E9C46A" />}

                        {/* Level header */}
                        <button
                            onClick={() => setExpandedLevel(isExpanded ? null : level.id)}
                            className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-white/[0.03] transition-colors duration-200"
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${levelStatus === 'locked' ? 'grayscale opacity-50' : ''}`}
                                style={{ backgroundColor: level.color + '22' }}
                            >
                                {levelStatus === 'completed' ? (
                                    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                ) : levelStatus === 'in_progress' ? (
                                    <span className="text-xl">{level.icon}</span>
                                ) : (
                                    <svg className="w-6 h-6 text-caribbean-aqua/40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusConfig[levelStatus].badgeClass}`}>
                                        {statusConfig[levelStatus].badge}
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-salt-white truncate">
                                    {level.icon} {name}
                                </h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{
                                                backgroundColor: level.color,
                                                boxShadow: isCurrentLevel ? `0 0 8px ${level.color}60` : 'none',
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPct}%` }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        />
                                    </div>
                                    <span className="text-xs text-caribbean-aqua/60 font-medium tabular-nums">
                                        {completedSkills}/{totalSkills}
                                    </span>
                                </div>
                            </div>

                            <motion.svg
                                className="w-5 h-5 text-caribbean-aqua/40 flex-shrink-0"
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
                                    <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2 border-t border-white/5 pt-3">
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
                                                    <span className="mt-0.5 flex-shrink-0">
                                                        {status === 'completed' && (
                                                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                            </svg>
                                                        )}
                                                        {status === 'in_progress' && (
                                                            <svg className="w-5 h-5 text-ocean-teal animate-spin" style={{ animationDuration: '3s' }} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M21.015 4.356v4.992" />
                                                            </svg>
                                                        )}
                                                        {status === 'locked' && (
                                                            <svg className="w-5 h-5 text-caribbean-aqua/30" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                            </svg>
                                                        )}
                                                    </span>

                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm text-salt-white">
                                                            {skillName}
                                                        </p>
                                                        {status === 'completed' && skillProgress?.completed_at && (
                                                            <p className="text-xs text-green-400/70 mt-0.5">
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
