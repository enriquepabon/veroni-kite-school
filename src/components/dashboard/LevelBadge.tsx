'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmapLevels } from '@/lib/roadmap-data';

interface LevelBadgeProps {
    /** The level number (1-6) that was completed */
    levelNumber: number;
    /** Whether to show the celebration animation */
    celebrate?: boolean;
}

/**
 * LevelBadge — Digital badge shown when a student completes an entire roadmap level.
 * Features scale animation + confetti-like burst when first earned.
 */
export default function LevelBadge({ levelNumber, celebrate = false }: LevelBadgeProps) {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [showConfetti, setShowConfetti] = useState(celebrate);

    // Auto-dismiss confetti after 3 seconds
    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    const level = roadmapLevels.find((l) => l.level === levelNumber);
    if (!level) return null;

    const name = isEn ? level.name_en : level.name_es;

    return (
        <div className="relative inline-flex flex-col items-center">
            {/* Confetti burst */}
            <AnimatePresence>
                {showConfetti && (
                    <>
                        {Array.from({ length: 8 }).map((_, i) => {
                            const angle = (i * 45) * (Math.PI / 180);
                            const distance = 50 + Math.random() * 30;
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full"
                                    style={{ backgroundColor: level.color }}
                                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                    animate={{
                                        x: Math.cos(angle) * distance,
                                        y: Math.sin(angle) * distance,
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                                />
                            );
                        })}
                    </>
                )}
            </AnimatePresence>

            {/* Badge circle */}
            <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg relative"
                style={{
                    background: `linear-gradient(135deg, ${level.color}dd, ${level.color})`,
                }}
                initial={celebrate ? { scale: 0 } : { scale: 1 }}
                animate={{ scale: 1 }}
                transition={
                    celebrate
                        ? { type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }
                        : { duration: 0 }
                }
                whileHover={{ scale: 1.08 }}
            >
                {/* Inner border */}
                <div className="absolute inset-1.5 rounded-full border-2 border-white/40" />
                <span className="text-3xl md:text-4xl">{level.icon}</span>
            </motion.div>

            {/* Label */}
            <motion.div
                className="mt-2 text-center"
                initial={celebrate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: celebrate ? 0.5 : 0, duration: 0.3 }}
            >
                <p className="text-xs font-bold text-deep-marine-500 uppercase tracking-wider">
                    {isEn ? 'Level' : 'Nivel'} {level.level}
                </p>
                <p className="text-sm font-heading font-bold text-night-tide mt-0.5">
                    {name}
                </p>
            </motion.div>
        </div>
    );
}

/**
 * BadgeGrid — Displays all earned badges in a grid.
 */
export function BadgeGrid({ completedLevels }: { completedLevels: number[] }) {
    const locale = useLocale();
    const isEn = locale === 'en';

    return (
        <div className="bg-white rounded-2xl p-6 shadow-card">
            <h3 className="font-heading font-bold text-night-tide text-lg mb-4">
                {isEn ? 'My Badges' : 'Mis Insignias'} ({completedLevels.length}/6)
            </h3>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {roadmapLevels.map((level) => {
                    const isCompleted = completedLevels.includes(level.level);
                    return (
                        <div key={level.id} className={`${isCompleted ? '' : 'opacity-20 grayscale'}`}>
                            <LevelBadge levelNumber={level.level} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
