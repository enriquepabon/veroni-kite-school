import { getLocale } from 'next-intl/server';
import { getAllArticles } from '@/lib/blog/articles';
import BlogListClient from './BlogListClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const isEn = locale === 'en';
    return {
        title: isEn ? 'Blog — Kitesurf Tips & Guides | Veronikites' : 'Blog — Tips y Guías de Kitesurf | Veronikites',
        description: isEn
            ? 'Kitesurf guides, tips for beginners, wind conditions in Salinas del Rey and everything about kitesurfing in Colombia.'
            : 'Guías de kitesurf, consejos para principiantes, condiciones de viento en Salinas del Rey y todo sobre el kitesurf en Colombia.',
        openGraph: {
            title: isEn ? 'Blog — Kitesurf Tips & Guides' : 'Blog — Tips y Guías de Kitesurf',
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
        },
    };
}

export default async function BlogPage() {
    const locale = await getLocale();
    const articles = getAllArticles();

    return <BlogListClient articles={articles} locale={locale} />;
}
