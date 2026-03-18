'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GALLERY_IMAGES = [
    { src: '/images/gallery/gallery-1.webp', alt: 'Kitesurf en Salinas del Rey' },
    { src: '/images/gallery/gallery-2.webp', alt: 'Atardecer en el spot' },
    { src: '/images/gallery/gallery-3.webp', alt: 'Grupo de estudiantes' },
    { src: '/images/gallery/gallery-4.webp', alt: 'Centro náutico' },
    { src: '/images/gallery/gallery-5.webp', alt: 'Sesión de kitesurf' },
    { src: '/images/gallery/gallery-6.webp', alt: 'Vista aérea del spot' },
];

export default function PhotoGallery() {
    const t = useTranslations('gallery');
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    return (
        <section className="py-16 md:py-24 bg-gradient-dark">
            <div className="container-main">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">{t('title')}</h2>
                    <p className="text-caribbean-aqua text-lg">{t('subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {GALLERY_IMAGES.map((img, i) => (
                        <button
                            key={img.src}
                            onClick={() => setLightboxIndex(i)}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                        </button>
                    ))}
                </div>
            </div>

            <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={GALLERY_IMAGES.map((img) => ({ src: img.src, alt: img.alt }))}
            />
        </section>
    );
}
