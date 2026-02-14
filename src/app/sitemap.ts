import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://veronikiteschool.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ['es', 'en'];
    const now = new Date().toISOString();

    // Public pages with their relative priority
    const publicPages = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/cursos', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/reservar', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/roadmap', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/ubicacion', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/sobre-kitesurf', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/privacidad', priority: 0.3, changeFrequency: 'yearly' as const },
        { path: '/terminos', priority: 0.3, changeFrequency: 'yearly' as const },
    ];

    const entries: MetadataRoute.Sitemap = [];

    for (const page of publicPages) {
        for (const locale of locales) {
            entries.push({
                url: `${BASE_URL}/${locale}${page.path}`,
                lastModified: now,
                changeFrequency: page.changeFrequency,
                priority: page.priority,
            });
        }
    }

    return entries;
}
