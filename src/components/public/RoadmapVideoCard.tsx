'use client';

import { useState } from 'react';
import { RoadMapVideo } from '@/types';

interface RoadmapVideoCardProps {
    video: RoadMapVideo;
    isEn: boolean;
    accentColor: string;
}

export default function RoadmapVideoCard({ video, isEn, accentColor }: RoadmapVideoCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const title = isEn ? video.title_en : video.title_es;
    const thumbnailUrl = `https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`;

    return (
        <div className="group flex-shrink-0 w-64 sm:w-72">
            <div className="relative rounded-xl overflow-hidden shadow-md bg-deep-marine-900 aspect-video">
                {isPlaying ? (
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                ) : (
                    <button
                        onClick={() => setIsPlaying(true)}
                        className="relative w-full h-full cursor-pointer"
                        aria-label={`${isEn ? 'Play' : 'Reproducir'}: ${title}`}
                    >
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                                style={{ backgroundColor: accentColor }}
                            >
                                <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </div>
                        </div>
                    </button>
                )}
            </div>
            <div className="mt-2 px-1">
                <p className="text-sm font-medium text-night-tide line-clamp-2 leading-snug">
                    {title}
                </p>
                <p className="text-xs text-deep-marine-500 mt-0.5">
                    {video.channel}
                </p>
            </div>
        </div>
    );
}
