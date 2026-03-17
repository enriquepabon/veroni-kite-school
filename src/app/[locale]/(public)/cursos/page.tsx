import { getTranslations } from 'next-intl/server';
import CoursesClient from './CoursesClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
        title: t('cursosTitle'),
        description: t('cursosDescription'),
        openGraph: {
            title: t('cursosTitle'),
            description: t('cursosDescription'),
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
        },
    };
}

export default function CoursesPage() {
    return <CoursesClient />;
}
