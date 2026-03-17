'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ActiveRoadMap from '@/components/dashboard/ActiveRoadMap';

interface ProgressRecord {
    skill_id: string;
    status: 'locked' | 'in-progress' | 'completed';
    last_updated: string | null;
    instructor: { full_name: string } | null;
}

export default function MyRoadmapPage() {
    const t = useTranslations('roadmap');
    const [progress, setProgress] = useState<Record<string, {
        skill_id: string;
        status: 'completed' | 'in_progress' | 'locked';
        completed_at: string | null;
        validated_by_name: string | null;
    }>>({});
    const [currentLevel, setCurrentLevel] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProgress() {
            try {
                const res = await fetch('/api/progress');
                if (res.ok) {
                    const data = await res.json();
                    const mapped: typeof progress = {};
                    let maxLevel = 1;

                    (data.progress || []).forEach((p: ProgressRecord) => {
                        // Map DB status 'in-progress' to component's 'in_progress'
                        const status = p.status === 'in-progress' ? 'in_progress' : p.status as 'completed' | 'locked';
                        mapped[p.skill_id] = {
                            skill_id: p.skill_id,
                            status,
                            completed_at: p.status === 'completed' ? p.last_updated : null,
                            validated_by_name: p.instructor?.full_name || null,
                        };
                        // Track highest level with activity
                        const levelNum = parseInt(p.skill_id.split('-')[1]);
                        if (levelNum > maxLevel) maxLevel = levelNum;
                    });

                    setProgress(mapped);
                    setCurrentLevel(maxLevel);
                }
            } catch {
                // Fall back to empty progress
            } finally {
                setLoading(false);
            }
        }
        fetchProgress();
    }, []);

    return (
        <>
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white mb-2">
                    {t('title')}
                </h1>
                <p className="text-caribbean-aqua/60">
                    {t('subtitle')}
                </p>
            </motion.div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : (
                <ActiveRoadMap
                    progress={progress}
                    currentLevel={currentLevel}
                />
            )}
        </>
    );
}
