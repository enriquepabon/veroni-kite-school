'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ActiveRoadMap from '@/components/dashboard/ActiveRoadMap';

// Mock progress data — will be fetched from Supabase via student_progress table
const mockProgress: Record<string, {
    skill_id: string;
    status: 'completed' | 'in_progress' | 'locked';
    completed_at: string | null;
    validated_by_name: string | null;
}> = {
    'skill-1-1': { skill_id: 'skill-1-1', status: 'completed', completed_at: '2024-12-10', validated_by_name: 'Carlos Veroni' },
    'skill-1-2': { skill_id: 'skill-1-2', status: 'completed', completed_at: '2024-12-10', validated_by_name: 'Carlos Veroni' },
    'skill-1-3': { skill_id: 'skill-1-3', status: 'completed', completed_at: '2024-12-11', validated_by_name: 'Carlos Veroni' },
    'skill-1-4': { skill_id: 'skill-1-4', status: 'completed', completed_at: '2024-12-12', validated_by_name: 'Ana García' },
    'skill-1-5': { skill_id: 'skill-1-5', status: 'completed', completed_at: '2024-12-13', validated_by_name: 'Ana García' },
    'skill-2-1': { skill_id: 'skill-2-1', status: 'completed', completed_at: '2024-12-15', validated_by_name: 'Carlos Veroni' },
    'skill-2-2': { skill_id: 'skill-2-2', status: 'in_progress', completed_at: null, validated_by_name: null },
    'skill-2-3': { skill_id: 'skill-2-3', status: 'locked', completed_at: null, validated_by_name: null },
    'skill-2-4': { skill_id: 'skill-2-4', status: 'locked', completed_at: null, validated_by_name: null },
};

export default function MyRoadmapPage() {
    const t = useTranslations('roadmap');

    return (
        <div className="min-h-screen bg-salt-white pt-24 pb-16">
            <div className="container-main">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-night-tide mb-2">
                        {t('title')}
                    </h1>
                    <p className="text-deep-marine-600">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Active Road Map */}
                <ActiveRoadMap
                    progress={mockProgress}
                    currentLevel={2}
                />
            </div>
        </div>
    );
}
