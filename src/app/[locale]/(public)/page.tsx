import { getTranslations } from 'next-intl/server';
import Hero from '@/components/public/Hero';
import ValueProposition from '@/components/public/ValueProposition';
import CoursePreview from '@/components/public/CoursePreview';
import TestimonialCarousel from '@/components/public/TestimonialCarousel';
import CTABanner from '@/components/public/CTABanner';
import LeadCaptureForm from '@/components/public/LeadCaptureForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata' });
    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
        },
    };
}

export default function HomePage() {
    return (
        <>
            <Hero />
            <ValueProposition />
            <CoursePreview />
            <TestimonialCarousel />
            <CTABanner />
            <LeadCaptureForm />
        </>
    );
}
