import { getTranslations } from 'next-intl/server';
import RoadmapClient from './RoadmapClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
        title: t('roadmapTitle'),
        description: t('roadmapDescription'),
        openGraph: {
            title: t('roadmapTitle'),
            description: t('roadmapDescription'),
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
        },
    };
}

export default function RoadmapPage() {
    return <RoadmapClient />;
}
