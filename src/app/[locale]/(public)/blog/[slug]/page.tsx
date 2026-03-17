import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { getArticleBySlug, getAllArticles } from '@/lib/blog/articles';
import BlogArticleClient from './BlogArticleClient';

interface Props {
    params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: Props) {
    const article = getArticleBySlug(params.slug);
    if (!article) return {};

    const isEn = params.locale === 'en';
    return {
        title: isEn ? article.title.en : article.title.es,
        description: isEn ? article.description.en : article.description.es,
        openGraph: {
            title: isEn ? article.title.en : article.title.es,
            description: isEn ? article.description.en : article.description.es,
            type: 'article',
            publishedTime: article.date,
            authors: [article.author],
            locale: isEn ? 'en_US' : 'es_CO',
        },
    };
}

export function generateStaticParams() {
    return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function BlogArticlePage({ params }: Props) {
    const locale = await getLocale();
    const article = getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    return <BlogArticleClient article={article} locale={locale} />;
}
