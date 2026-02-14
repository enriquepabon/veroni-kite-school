'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { roadmapLevels } from '@/lib/roadmap-data';

export default function PublicRoadMap() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

    return (
        <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-7 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-ocean-teal via-deep-marine-500 via-sand-gold to-yellow-500 rounded-full" />

            {roadmapLevels.map((level, idx) => {
                const isExpanded = expandedLevel === level.id;
                const name = isEn ? level.name_en : level.name_es;
                const desc = isEn ? level.description_en : level.description_es;

                return (
                    <motion.div
                        key={level.id}
                        className="relative pl-20 md:pl-24 mb-8 last:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                    >
                        {/* Level dot */}
                        <div
                            className="absolute left-3.5 md:left-4 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-lg z-10 shadow-lg border-4 border-white"
                            style={{ backgroundColor: level.color }}
                        >
                            {level.icon}
                        </div>

                        {/* Card */}
                        <button
                            onClick={() => setExpandedLevel(isExpanded ? null : level.id)}
                            className="w-full text-left bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
                        >
                            <div className="p-5 md:p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r ${level.gradient} text-white text-xs font-bold mb-2`}>
                                            {isEn ? 'Level' : 'Nivel'} {level.level}
                                        </span>
                                        <h3 className="text-lg md:text-xl font-heading font-bold text-night-tide truncate">
                                            {name}
                                        </h3>
                                        <p className="text-deep-marine-600 text-sm mt-1 line-clamp-2">
                                            {desc}
                                        </p>
                                    </div>
                                    {/* Chevron */}
                                    <motion.svg
                                        className="w-5 h-5 text-caribbean-aqua flex-shrink-0"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </motion.svg>
                                </div>
                            </div>

                            {/* Expanded skills */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-salt-white">
                                            <ul className="mt-4 space-y-3">
                                                {level.skills.map((skill, sIdx) => (
                                                    <li key={skill.id} className="flex items-start gap-3">
                                                        <span
                                                            className="mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                                            style={{ backgroundColor: level.color }}
                                                        >
                                                            {sIdx + 1}
                                                        </span>
                                                        <div>
                                                            <p className="font-medium text-night-tide text-sm">
                                                                {isEn ? skill.name_en : skill.name_es}
                                                            </p>
                                                            <p className="text-deep-marine-500 text-xs mt-0.5">
                                                                {isEn ? skill.description_en : skill.description_es}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>
                );
            })}
        </div>
    );
}
