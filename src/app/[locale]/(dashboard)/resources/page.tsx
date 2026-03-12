'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MagicCard } from '@/components/ui/magic-card';

type ResourceType = 'all' | 'video' | 'blog' | 'news';

interface Resource {
    id: string;
    type: 'video' | 'blog' | 'news';
    title_es: string;
    title_en: string;
    description_es: string;
    description_en: string;
    thumbnail: string;
    url: string;
    date: string;
}

const mockResources: Resource[] = [
    {
        id: 'r1', type: 'video',
        title_es: 'Tu Primer Waterstart — Guía Paso a Paso',
        title_en: 'Your First Waterstart — Step by Step Guide',
        description_es: 'Aprende la técnica fundamental para levantarte del agua con el kite.',
        description_en: 'Learn the fundamental technique to get up from the water with the kite.',
        thumbnail: '🎬', url: '#', date: '2025-01-15',
    },
    {
        id: 'r2', type: 'blog',
        title_es: 'Cómo Elegir Tu Primer Kite: Guía Completa',
        title_en: 'How to Choose Your First Kite: Complete Guide',
        description_es: 'Todo lo que necesitas saber para elegir el equipo correcto.',
        description_en: 'Everything you need to know to choose the right gear.',
        thumbnail: '📝', url: '#', date: '2025-01-10',
    },
    {
        id: 'r3', type: 'video',
        title_es: 'Seguridad en el Kitesurf: Los 10 Mandamientos',
        title_en: 'Kitesurfing Safety: The 10 Commandments',
        description_es: 'Reglas esenciales para practicar kitesurf de forma segura.',
        description_en: 'Essential rules for practicing kitesurfing safely.',
        thumbnail: '🎬', url: '#', date: '2025-01-05',
    },
    {
        id: 'r4', type: 'news',
        title_es: 'Temporada de Vientos 2025: Pronóstico para Salinas del Rey',
        title_en: '2025 Wind Season: Forecast for Salinas del Rey',
        description_es: 'Análisis de las condiciones de viento para la próxima temporada.',
        description_en: 'Wind condition analysis for the upcoming season.',
        thumbnail: '📰', url: '#', date: '2024-12-20',
    },
    {
        id: 'r5', type: 'blog',
        title_es: 'Body Drag: La Habilidad Que Salva Vidas',
        title_en: 'Body Drag: The Life-Saving Skill',
        description_es: 'Domina el body drag upwind y nunca pierdas tu tabla.',
        description_en: 'Master the upwind body drag and never lose your board.',
        thumbnail: '📝', url: '#', date: '2024-12-15',
    },
    {
        id: 'r6', type: 'video',
        title_es: 'Riding & Transitions para Principiantes',
        title_en: 'Riding & Transitions for Beginners',
        description_es: 'Después del waterstart, aprende a navegar y cambiar de dirección.',
        description_en: 'After the waterstart, learn to ride and change direction.',
        thumbnail: '🎬', url: '#', date: '2024-12-10',
    },
];

const typeConfig = {
    video: { icon: '🎬', labelEs: 'Videos', labelEn: 'Videos', color: 'bg-red-500/20 text-red-400' },
    blog: { icon: '📝', labelEs: 'Blog', labelEn: 'Blog', color: 'bg-blue-500/20 text-blue-400' },
    news: { icon: '📰', labelEs: 'Noticias', labelEn: 'News', color: 'bg-green-500/20 text-green-400' },
};

export default function ResourcesPage() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [filter, setFilter] = useState<ResourceType>('all');

    const filtered = filter === 'all'
        ? mockResources
        : mockResources.filter((r) => r.type === filter);

    return (
        <>
            {/* Header */}
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-salt-white">
                    {isEn ? 'Learning Resources' : 'Recursos de Aprendizaje'}
                </h1>
                <p className="text-caribbean-aqua/60 mt-1">
                    {isEn
                        ? 'Videos, articles, and guides to accelerate your progression'
                        : 'Videos, artículos y guías para acelerar tu progresión'}
                </p>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {(['all', 'video', 'blog', 'news'] as ResourceType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === type
                                ? 'bg-ocean-teal text-white shadow-glow-ocean-teal/30'
                                : 'bg-surface-card text-caribbean-aqua/60 border border-white/5 hover:text-salt-white hover:bg-surface-elevated'
                            }`}
                    >
                        {type === 'all'
                            ? (isEn ? 'All' : 'Todos')
                            : `${typeConfig[type].icon} ${isEn ? typeConfig[type].labelEn : typeConfig[type].labelEs}`}
                    </button>
                ))}
            </div>

            {/* Resource grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((resource, idx) => (
                    <motion.article
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                        <MagicCard className="dark-card dark-card-hover overflow-hidden cursor-pointer group">
                            {/* Thumbnail area */}
                            <div className="h-36 bg-gradient-to-br from-deep-marine-700/50 to-ocean-teal-900/50 flex items-center justify-center">
                                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                                    {resource.thumbnail}
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeConfig[resource.type].color}`}>
                                        {isEn ? typeConfig[resource.type].labelEn : typeConfig[resource.type].labelEs}
                                    </span>
                                    <span className="text-xs text-caribbean-aqua/40">
                                        {new Date(resource.date).toLocaleDateString(locale)}
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-salt-white text-sm mb-1 line-clamp-2">
                                    {isEn ? resource.title_en : resource.title_es}
                                </h3>
                                <p className="text-xs text-caribbean-aqua/50 line-clamp-2">
                                    {isEn ? resource.description_en : resource.description_es}
                                </p>
                            </div>
                        </MagicCard>
                    </motion.article>
                ))}
            </div>
        </>
    );
}
