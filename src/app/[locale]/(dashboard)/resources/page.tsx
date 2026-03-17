'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MagicCard } from '@/components/ui/magic-card';
import { blogArticles } from '@/lib/blog/articles';
import { roadmapLevels } from '@/lib/roadmap-data';
import Link from 'next/link';

type FilterType = 'all' | 'video' | 'blog' | 'news';

interface ResourceItem {
    id: string;
    type: 'video' | 'blog' | 'news';
    title_es: string;
    title_en: string;
    description_es: string;
    description_en: string;
    thumbnail: string | null;
    youtube_id?: string;
    href: string;
    date: string;
    channel?: string;
}

// Build resources from real data sources
function buildResources(locale: string): ResourceItem[] {
    const resources: ResourceItem[] = [];

    // 1. Blog articles from the public blog
    blogArticles.forEach((article, idx) => {
        resources.push({
            id: `blog-${idx}`,
            type: 'blog',
            title_es: article.title.es,
            title_en: article.title.en,
            description_es: article.description.es,
            description_en: article.description.en,
            thumbnail: article.image,
            href: `/${locale}/blog/${article.slug}`,
            date: article.date,
        });
    });

    // 2. Videos from roadmap levels
    const addedVideoIds = new Set<string>();
    roadmapLevels.forEach((level) => {
        level.videos.forEach((video) => {
            if (addedVideoIds.has(video.youtube_id)) return;
            addedVideoIds.add(video.youtube_id);
            resources.push({
                id: `video-${video.id}`,
                type: 'video',
                title_es: video.title_es,
                title_en: video.title_en,
                description_es: `Nivel ${level.level}: ${level.name_es}`,
                description_en: `Level ${level.level}: ${level.name_en}`,
                thumbnail: null,
                youtube_id: video.youtube_id,
                href: `https://www.youtube.com/watch?v=${video.youtube_id}`,
                date: '2026-01-01',
                channel: video.channel,
            });
        });
    });

    // 3. News items
    const newsItems: ResourceItem[] = [
        {
            id: 'news-1',
            type: 'news',
            title_es: 'Temporada de Vientos 2026: Condiciones Excepcionales en Salinas del Rey',
            title_en: '2026 Wind Season: Exceptional Conditions at Salinas del Rey',
            description_es: 'Este ano los vientos alisios llegaron antes y mas fuertes. Enero y febrero registraron promedios de 25+ nudos.',
            description_en: 'This year the trade winds arrived earlier and stronger. January and February averaged 25+ knots.',
            thumbnail: null,
            href: '#',
            date: '2026-03-15',
        },
        {
            id: 'news-2',
            type: 'news',
            title_es: 'VeroniKites Lanza Nuevo Programa de Certificacion para Estudiantes',
            title_en: 'VeroniKites Launches New Student Certification Program',
            description_es: 'Nuestro roadmap de 6 niveles ahora incluye certificacion digital y badges para cada nivel completado.',
            description_en: 'Our 6-level roadmap now includes digital certification and badges for each completed level.',
            thumbnail: null,
            href: '#',
            date: '2026-03-10',
        },
        {
            id: 'news-3',
            type: 'news',
            title_es: 'GKA Kite World Tour Confirma Fecha en Colombia 2026',
            title_en: 'GKA Kite World Tour Confirms 2026 Colombia Date',
            description_es: 'El campeonato mundial de freestyle vuelve a Salinas del Rey en abril. Ven a ver a los mejores del mundo.',
            description_en: 'The freestyle world championship returns to Salinas del Rey in April. Come watch the best in the world.',
            thumbnail: null,
            href: '#',
            date: '2026-03-05',
        },
        {
            id: 'news-4',
            type: 'news',
            title_es: 'Nuevo Equipo Duotone 2026 Disponible para Alquiler',
            title_en: 'New Duotone 2026 Gear Available for Rental',
            description_es: 'Actualizamos toda nuestra flota de kites y tablas con lo ultimo de Duotone para la nueva temporada.',
            description_en: 'We upgraded our entire kite and board fleet with the latest Duotone gear for the new season.',
            thumbnail: null,
            href: '#',
            date: '2026-02-20',
        },
    ];
    resources.push(...newsItems);

    // Sort by date, newest first
    resources.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return resources;
}

const typeConfig = {
    video: { icon: '🎬', labelEs: 'Video', labelEn: 'Video', color: 'bg-red-500/20 text-red-400' },
    blog: { icon: '📝', labelEs: 'Blog', labelEn: 'Blog', color: 'bg-blue-500/20 text-blue-400' },
    news: { icon: '📰', labelEs: 'Noticia', labelEn: 'News', color: 'bg-green-500/20 text-green-400' },
};

function VideoThumbnail({ youtubeId, title }: { youtubeId: string; title: string }) {
    return (
        <div className="relative h-full w-full">
            <img
                src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ResourcesPage() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [filter, setFilter] = useState<FilterType>('all');
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);

    const allResources = buildResources(locale);
    const filtered = filter === 'all'
        ? allResources
        : allResources.filter((r) => r.type === filter);

    const counts = {
        all: allResources.length,
        video: allResources.filter((r) => r.type === 'video').length,
        blog: allResources.filter((r) => r.type === 'blog').length,
        news: allResources.filter((r) => r.type === 'news').length,
    };

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
                        : 'Videos, articulos y guias para acelerar tu progresion'}
                </p>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {(['all', 'video', 'blog', 'news'] as FilterType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === type
                                ? 'bg-ocean-teal text-white shadow-glow-ocean-teal/30'
                                : 'bg-surface-card text-caribbean-aqua/60 border border-white/5 hover:text-salt-white hover:bg-surface-elevated'
                            }`}
                    >
                        {type === 'all'
                            ? `${isEn ? 'All' : 'Todos'} (${counts.all})`
                            : `${typeConfig[type].icon} ${isEn ? typeConfig[type].labelEn : typeConfig[type].labelEs} (${counts[type]})`}
                    </button>
                ))}
            </div>

            {/* Resource grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((resource, idx) => {
                    const isVideo = resource.type === 'video' && resource.youtube_id;
                    const isPlaying = playingVideo === resource.id;
                    const title = isEn ? resource.title_en : resource.title_es;

                    const card = (
                        <motion.article
                            key={resource.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.03 }}
                        >
                            <MagicCard className="dark-card dark-card-hover overflow-hidden cursor-pointer group">
                                {/* Thumbnail area */}
                                <div className="h-40 bg-gradient-to-br from-deep-marine-700/50 to-ocean-teal-900/50 flex items-center justify-center overflow-hidden relative">
                                    {isPlaying && resource.youtube_id ? (
                                        <iframe
                                            src={`https://www.youtube-nocookie.com/embed/${resource.youtube_id}?autoplay=1&rel=0`}
                                            title={title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0 w-full h-full"
                                        />
                                    ) : isVideo && resource.youtube_id ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setPlayingVideo(resource.id);
                                            }}
                                            className="w-full h-full"
                                            aria-label={`${isEn ? 'Play' : 'Reproducir'}: ${title}`}
                                        >
                                            <VideoThumbnail youtubeId={resource.youtube_id} title={title} />
                                        </button>
                                    ) : resource.thumbnail && resource.thumbnail !== '/og-image.jpg' ? (
                                        <img
                                            src={resource.thumbnail}
                                            alt={title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                                            {resource.type === 'blog' ? '📝' : resource.type === 'news' ? '📰' : '🎬'}
                                        </span>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeConfig[resource.type].color}`}>
                                            {isEn ? typeConfig[resource.type].labelEn : typeConfig[resource.type].labelEs}
                                        </span>
                                        {resource.channel && (
                                            <span className="text-xs text-caribbean-aqua/40">
                                                {resource.channel}
                                            </span>
                                        )}
                                        <span className="text-xs text-caribbean-aqua/40 ml-auto">
                                            {new Date(resource.date).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <h3 className="font-heading font-bold text-salt-white text-sm mb-1 line-clamp-2">
                                        {title}
                                    </h3>
                                    <p className="text-xs text-caribbean-aqua/50 line-clamp-2">
                                        {isEn ? resource.description_en : resource.description_es}
                                    </p>
                                </div>
                            </MagicCard>
                        </motion.article>
                    );

                    // Blog articles link to the actual blog page
                    if (resource.type === 'blog') {
                        return (
                            <Link key={resource.id} href={resource.href} target="_blank">
                                {card}
                            </Link>
                        );
                    }

                    // Videos play inline, news items are static for now
                    return <div key={resource.id}>{card}</div>;
                })}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-caribbean-aqua/40 text-lg">
                        {isEn ? 'No resources found for this filter.' : 'No se encontraron recursos para este filtro.'}
                    </p>
                </div>
            )}
        </>
    );
}
