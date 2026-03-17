import { getTranslations } from 'next-intl/server';
import LocationClient from './LocationClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
        title: t('ubicacionTitle'),
        description: t('ubicacionDescription'),
        openGraph: {
            title: t('ubicacionTitle'),
            description: t('ubicacionDescription'),
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
        },
    };
}

export default function LocationPage() {
    return <LocationClient />;
}
