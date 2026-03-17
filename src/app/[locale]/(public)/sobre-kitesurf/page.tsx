import { getTranslations } from 'next-intl/server';
import AboutKitesurfClient from './AboutKitesurfClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
        title: t('sobreKitesurfTitle'),
        description: t('sobreKitesurfDescription'),
        openGraph: {
            title: t('sobreKitesurfTitle'),
            description: t('sobreKitesurfDescription'),
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
        },
    };
}

export default function AboutKitesurfPage() {
    return <AboutKitesurfClient />;
}
